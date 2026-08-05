// src/services/ProductService.js

const CACHE_KEY = 'aura_products_cache';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const slugify = (text) => {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const categoryMap = {
  // Electronics
  'smartphones': 'Electronics',
  'laptops': 'Electronics',
  'tablets': 'Electronics',
  'mobile-accessories': 'Electronics',
  'electronics': 'Electronics',
  // Fashion
  'mens-shirts': 'Fashion',
  'mens-shoes': 'Fashion',
  'womens-dresses': 'Fashion',
  'womens-shoes': 'Fashion',
  'tops': 'Fashion',
  'clothes': 'Fashion',
  'clothing': 'Fashion',
  "men's clothing": 'Fashion',
  "women's clothing": 'Fashion',
  // Gaming
  'gaming': 'Gaming',
  // Furniture
  'furniture': 'Furniture',
  // Food & Beverage
  'groceries': 'Food & Beverage',
  'food': 'Food & Beverage',
  // Home Decoration
  'home-decoration': 'Home Decoration',
  'lighting': 'Home Decoration',
  'decoration': 'Home Decoration',
  // Accessories
  'mens-watches': 'Accessories',
  'womens-watches': 'Accessories',
  'womens-bags': 'Accessories',
  'womens-jewellery': 'Accessories',
  'jewelery': 'Accessories',
  'jewelry': 'Accessories',
  'sunglasses': 'Accessories',
  'accessories': 'Accessories',
  // Sports
  'sports-accessories': 'Sports',
  'sports': 'Sports',
  // Health & Beauty
  'beauty': 'Health & Beauty',
  'skin-care': 'Health & Beauty',
  'fragrances': 'Health & Beauty',
  // Kitchen
  'kitchen-accessories': 'Kitchen',
  'kitchen': 'Kitchen',
  // Automotive
  'vehicle': 'Automotive',
  'motorcycle': 'Automotive',
  'automotive': 'Automotive'
};

export const normalizeCategory = (apiCategory) => {
  if (!apiCategory) return 'Electronics';
  const name = typeof apiCategory === 'object' ? apiCategory.name : String(apiCategory);
  const lower = name.toLowerCase().trim();
  if (categoryMap[lower]) return categoryMap[lower];

  if (lower.includes('phone') || lower.includes('laptop') || lower.includes('tech') || lower.includes('electronic')) return 'Electronics';
  if (lower.includes('shirt') || lower.includes('dress') || lower.includes('shoe') || lower.includes('cloth')) return 'Fashion';
  if (lower.includes('watch') || lower.includes('bag') || lower.includes('jewel') || lower.includes('sunglass')) return 'Accessories';
  if (lower.includes('beauty') || lower.includes('skin') || lower.includes('perfume')) return 'Health & Beauty';
  if (lower.includes('furniture') || lower.includes('chair') || lower.includes('bed')) return 'Furniture';
  if (lower.includes('home') || lower.includes('decor') || lower.includes('light')) return 'Home Decoration';
  if (lower.includes('food') || lower.includes('drink') || lower.includes('groc')) return 'Food & Beverage';
  if (lower.includes('sport')) return 'Sports';
  if (lower.includes('toy') || lower.includes('game')) return 'Gaming';
  if (lower.includes('kitchen')) return 'Kitchen';
  if (lower.includes('car') || lower.includes('auto') || lower.includes('motor')) return 'Automotive';

  return 'Electronics';
};

export const cleanImageURL = (imgStr) => {
  if (!imgStr || typeof imgStr !== 'string') return null;
  let cleaned = imgStr.trim();
  cleaned = cleaned.replace(/^[\["'\s]+|[\]"'\s]+$/g, '');
  cleaned = cleaned.replace(/\\"/g, '"');
  if (cleaned.startsWith('["') || cleaned.startsWith("['")) {
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) cleaned = parsed[0];
    } catch (e) {}
  }
  cleaned = cleaned.replace(/^[\["'\s]+|[\]"'\s]+$/g, '');
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) return null;
  return cleaned;
};

// Retry helper: attempts a fetch call up to maxRetries times
async function fetchWithRetry(url, options = {}, maxRetries = 1) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      if (attempt === maxRetries) throw err;
    }
    attempt++;
  }
  throw new Error(`Failed to fetch ${url}`);
}

class ProductServiceClass {
  constructor() {
    this.memoryCache = null;
  }

  // Get cached products from localStorage if valid
  getCache() {
    try {
      const cachedStr = localStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const cachedObj = JSON.parse(cachedStr);
        if (cachedObj && cachedObj.data && Array.isArray(cachedObj.data) && cachedObj.data.length > 0) {
          if (Date.now() - (cachedObj.timestamp || 0) < CACHE_EXPIRY_MS) {
            return cachedObj.data;
          }
        }
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
    return null;
  }

  // Save products to localStorage cache
  setCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }

  // Fetch all public APIs in parallel using Promise.all
  async fetchProductsFromAPIs() {
    const apiEndpoints = [
      { url: 'https://dummyjson.com/products?limit=200', type: 'dummyjson' },
      { url: 'https://fakestoreapi.com/products', type: 'fakestore' },
      { url: 'https://api.escuelajs.co/api/v1/products', type: 'escuelajs' }
    ];

    const results = await Promise.allSettled(
      apiEndpoints.map(endpoint => fetchWithRetry(endpoint.url, {}, 1))
    );

    const mergedRaw = [];

    results.forEach((res, index) => {
      if (res.status === 'fulfilled' && res.value) {
        const type = apiEndpoints[index].type;
        if (type === 'dummyjson' && res.value.products) {
          mergedRaw.push(...res.value.products);
        } else if (Array.isArray(res.value)) {
          mergedRaw.push(...res.value);
        }
      }
    });

    return this.normalizeProducts(mergedRaw);
  }

  // Deduplicate, filter invalid items, and normalize schema
  normalizeProducts(rawList) {
    const seenTitles = new Set();
    const normalized = [];
    let idCount = 1;

    for (const item of rawList) {
      if (!item || !item.title || typeof item.price !== 'number' || item.price <= 0) continue;

      const title = String(item.title).trim();
      const titleKey = title.toLowerCase();
      if (seenTitles.has(titleKey)) continue;

      let rawImages = Array.isArray(item.images) ? item.images : item.image ? [item.image] : [item.thumbnail];
      let validImages = rawImages.map(cleanImageURL).filter(Boolean);

      if (validImages.length === 0) continue;

      while (validImages.length < 3) {
        validImages.push(validImages[0]);
      }

      seenTitles.add(titleKey);

      const category = normalizeCategory(item.category);
      const categorySlug = slugify(category);

      const price = Number(item.price.toFixed(2));
      const markupFactor = 1 + (0.10 + (idCount % 15) * 0.01);
      const oldPrice = Number((price * markupFactor).toFixed(2));
      const discountPercentage = Math.round(((oldPrice - price) / oldPrice) * 100);

      const rating = Number((item.rating?.rate || item.rating || (4.1 + (idCount % 9) * 0.1)).toFixed(1));
      const reviewCount = item.rating?.count || (25 + (idCount * 17) % 350);
      const soldCount = 100 + (idCount * 29) % 1800;
      const stock = item.stock || (8 + (idCount * 3) % 40);

      const brand = item.brand || (typeof item.category === 'string' ? item.category.toUpperCase() : 'Official Brand');
      const description = item.description || `${title} - Premium high performance product.`;

      const isBestseller = rating >= 4.7;
      const isNewArrival = (idCount % 4 === 0);
      const isFlashSale = (idCount % 5 === 0);

      normalized.push({
        id: idCount,
        title,
        category,
        categorySlug,
        brand,
        price,
        oldPrice,
        discountPercentage,
        rating,
        reviewCount,
        soldCount,
        stock,
        description,
        images: validImages,
        colors: category === 'Fashion' || category === 'Accessories' ? ['#090909', '#F5F5F7', '#86868B', '#10B981'] : ['#090909', '#E4E4E7'],
        sizes: category === 'Fashion' ? ['S', 'M', 'L', 'XL'] : null,
        specifications: {
          'Category': category,
          'Brand': brand,
          'Condition': 'New',
          'Warranty': 'Official Brand Warranty'
        },
        shippingBadge: 'Express Shipping',
        isFreeShipping: price > 75,
        isBestseller,
        isNewArrival,
        isFlashSale,
        flashEndTime: isFlashSale ? new Date(Date.now() + (12 + (idCount % 12)) * 3600 * 1000).toISOString() : null
      });

      idCount++;
    }

    return normalized;
  }

  // Get products with caching support
  async getProducts(forceRefresh = false) {
    if (!forceRefresh) {
      if (this.memoryCache && this.memoryCache.length > 0) {
        return this.memoryCache;
      }
      const cached = this.getCache();
      if (cached && cached.length > 0) {
        this.memoryCache = cached;
        return cached;
      }
    }

    const freshProducts = await this.fetchProductsFromAPIs();
    if (freshProducts && freshProducts.length > 0) {
      this.memoryCache = freshProducts;
      this.setCache(freshProducts);
      return freshProducts;
    }

    // Return cached if available even on error
    const cachedFallback = this.getCache();
    if (cachedFallback) {
      this.memoryCache = cachedFallback;
      return cachedFallback;
    }

    return [];
  }

  // Synchronous initial product reader (reads memory or localStorage)
  getInitialProducts() {
    if (this.memoryCache) return this.memoryCache;
    const cached = this.getCache();
    if (cached) {
      this.memoryCache = cached;
      return cached;
    }
    return [];
  }
}

export const ProductService = new ProductServiceClass();
