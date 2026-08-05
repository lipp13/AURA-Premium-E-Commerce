// src/services/ProductService.js

const CACHE_KEY = 'aura_products_cache_v2';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const slugify = (text) => {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const targetCategories = [
  'Electronics', 'Fashion', 'Gaming', 'Furniture', 'Food & Beverage',
  'Home Decoration', 'Crafts', 'Books', 'Accessories', 'Sports',
  'Health & Beauty', 'Office', 'Kitchen', 'Pets', 'Photography',
  'Automotive', 'Music', 'Outdoor', 'Smart Home', 'Toys'
];

export const categorySlugMap = {
  'Electronics': 'electronics',
  'Fashion': 'fashion',
  'Gaming': 'gaming',
  'Furniture': 'furniture',
  'Food & Beverage': 'food-beverage',
  'Home Decoration': 'home-decoration',
  'Crafts': 'crafts',
  'Books': 'books',
  'Accessories': 'accessories',
  'Sports': 'sports',
  'Health & Beauty': 'health-beauty',
  'Office': 'office',
  'Kitchen': 'kitchen',
  'Pets': 'pets',
  'Photography': 'photography',
  'Automotive': 'automotive',
  'Music': 'music',
  'Outdoor': 'outdoor',
  'Smart Home': 'smart-home',
  'Toys': 'toys'
};

// High-resolution verified non-placeholder CDN image pools per category
const categoryCdnImages = {
  'Electronics': [
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/1.png',
    'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png',
    'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png'
  ],
  'Fashion': [
    'https://i.imgur.com/QkIa5tT.jpeg',
    'https://i.imgur.com/ZANVnHE.jpeg',
    'https://i.imgur.com/qNOjA3b.jpeg',
    'https://i.imgur.com/FDw9w9h.jpeg'
  ],
  'Gaming': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/PlayStation_5_and_DualSense_with_transparent_background.png/800px-PlayStation_5_and_DualSense_with_transparent_background.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Xbox-Series-X-Set.png/800px-Xbox-Series-X-Set.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nintendo-Switch-wJoyCons-Blk-Set.jpg/800px-Nintendo-Switch-wJoyCons-Blk-Set.jpg',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Dot%205th%20Gen/1.png'
  ],
  'Furniture': [
    'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png',
    'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png',
    'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20Nightstand/1.png',
    'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png'
  ],
  'Food & Beverage': [
    'https://cdn.dummyjson.com/products/images/groceries/Apple/1.png',
    'https://cdn.dummyjson.com/products/images/groceries/Nescafe%20Coffee/1.png',
    'https://cdn.dummyjson.com/products/images/groceries/Juice/1.png',
    'https://cdn.dummyjson.com/products/images/groceries/Tea/1.png'
  ],
  'Home Decoration': [
    'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/1.png',
    'https://cdn.dummyjson.com/products/images/home-decoration/Family%20Tree%20Photo%20Frame/1.png',
    'https://cdn.dummyjson.com/products/images/home-decoration/House%20Plant/1.png'
  ],
  'Crafts': [
    'https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Stickers/1.png',
    'https://i.imgur.com/1GFiWs0.jpeg',
    'https://i.imgur.com/7H7J2Tf.jpeg'
  ],
  'Books': [
    'https://i.imgur.com/QkIa5tT.jpeg',
    'https://i.imgur.com/ZANVnHE.jpeg',
    'https://i.imgur.com/qNOjA3b.jpeg'
  ],
  'Accessories': [
    'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png',
    'https://cdn.dummyjson.com/products/images/mens-watches/Longines%20Master%20Collection/1.png',
    'https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sunglasses/1.png'
  ],
  'Sports': [
    'https://cdn.dummyjson.com/products/images/sports-accessories/Garmin%20Venu%20Smartwatch/1.png',
    'https://cdn.dummyjson.com/products/images/sports-accessories/Tennis%20Racket/1.png',
    'https://cdn.dummyjson.com/products/images/sports-accessories/Golf%20Balls/1.png'
  ],
  'Health & Beauty': [
    'https://cdn.dummyjson.com/products/images/beauty/essence-mascara-lash-princess/1.webp',
    'https://cdn.dummyjson.com/products/images/beauty/eyeshadow-palette-with-mirror/1.webp',
    'https://cdn.dummyjson.com/products/images/beauty/powder-canister/1.webp'
  ],
  'Office': [
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/1.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Logitech_MX_Master_3.jpg/800px-Logitech_MX_Master_3.jpg',
    'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20Nightstand/1.png'
  ],
  'Kitchen': [
    'https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/1.png',
    'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/1.png',
    'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Cookware/1.png'
  ],
  'Pets': [
    'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/1.png',
    'https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/1.png',
    'https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/1.png'
  ],
  'Photography': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Leica_M11.jpg/800px-Leica_M11.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canon_EOS_5D_Mark_IV_01.jpg/800px-Canon_EOS_5D_Mark_IV_01.jpg',
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/1.png'
  ],
  'Automotive': [
    'https://cdn.dummyjson.com/products/images/vehicle/Amphibious%20Vehicle/1.png',
    'https://cdn.dummyjson.com/products/images/vehicle/Go%20Kart/1.png',
    'https://cdn.dummyjson.com/products/images/vehicle/Standard%20Motorcycle/1.png'
  ],
  'Music': [
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Sony_WH-1000XM4.jpg/800px-Sony_WH-1000XM4.jpg',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Dot%205th%20Gen/1.png'
  ],
  'Outdoor': [
    'https://cdn.dummyjson.com/products/images/sports-accessories/Garmin%20Venu%20Smartwatch/1.png',
    'https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sunglasses/1.png',
    'https://i.imgur.com/1GFiWs0.jpeg'
  ],
  'Smart Home': [
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Dot%205th%20Gen/1.png',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirTag/1.png',
    'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/1.png'
  ],
  'Toys': [
    'https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Stickers/1.png',
    'https://i.imgur.com/3N8b58F.jpeg',
    'https://i.imgur.com/5m8xTVW.jpeg'
  ]
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

  const lower = cleaned.toLowerCase();
  // Strictly filter out 600x400 / placeimg / via.placeholder dummy images
  if (
    lower.includes('600x400') ||
    lower.includes('600/400') ||
    lower.includes('640/480') ||
    lower.includes('placeimg.com') ||
    lower.includes('via.placeholder') ||
    lower.includes('placeholder.com') ||
    lower.includes('dummyimage') ||
    lower.includes('placebear')
  ) {
    return null;
  }

  return cleaned;
};

// Retry helper
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

  normalizeProducts(rawList) {
    const seenTitles = new Set();
    const rawNormalized = [];

    for (const item of rawList) {
      if (!item || !item.title || typeof item.price !== 'number' || item.price <= 0) continue;

      const title = String(item.title).trim();
      const titleKey = title.toLowerCase();
      if (seenTitles.has(titleKey)) continue;

      let rawImages = Array.isArray(item.images) ? item.images : item.image ? [item.image] : [item.thumbnail];
      let validImages = rawImages.map(img => cleanImageURL(img)).filter(Boolean);

      seenTitles.add(titleKey);

      const apiCatName = typeof item.category === 'object' ? (item.category.name || '') : String(item.category || '');
      const combined = `${apiCatName} ${title} ${item.description || ''}`.toLowerCase();

      let category = 'Electronics';
      if (combined.includes('game') || combined.includes('gaming') || combined.includes('ps5') || combined.includes('xbox') || combined.includes('nintendo') || combined.includes('controller') || combined.includes('rtx') || combined.includes('razer') || combined.includes('steelseries')) {
        category = 'Gaming';
      } else if (combined.includes('camera') || combined.includes('lens') || combined.includes('tripod') || combined.includes('nikon') || combined.includes('canon') || combined.includes('leica') || combined.includes('fujifilm') || combined.includes('gopro')) {
        category = 'Photography';
      } else if (combined.includes('speaker') || combined.includes('headphone') || combined.includes('earbud') || combined.includes('audio') || combined.includes('sound') || combined.includes('turntable') || combined.includes('bose') || combined.includes('marshall') || combined.includes('sennheiser')) {
        category = 'Music';
      } else if (combined.includes('smart') || combined.includes('hue') || combined.includes('nest') || combined.includes('echo') || combined.includes('alexa') || combined.includes('ring') || combined.includes('thermostat')) {
        category = 'Smart Home';
      } else if (combined.includes('backpack') || combined.includes('camping') || combined.includes('tent') || combined.includes('hiking') || combined.includes('outdoor') || combined.includes('flask') || combined.includes('yeti') || combined.includes('stanley')) {
        category = 'Outdoor';
      } else if (combined.includes('desk') || combined.includes('office') || combined.includes('chair') || combined.includes('monitor') || combined.includes('keyboard') || combined.includes('mouse') || combined.includes('logitech')) {
        category = 'Office';
      } else if (combined.includes('toy') || combined.includes('puzzle') || combined.includes('figure') || combined.includes('lego') || combined.includes('robot')) {
        category = 'Toys';
      } else if (combined.includes('book') || combined.includes('monograph') || combined.includes('novel') || combined.includes('guide')) {
        category = 'Books';
      } else if (combined.includes('scissors') || combined.includes('craft') || combined.includes('pencil') || combined.includes('pen') || combined.includes('paint') || combined.includes('marker')) {
        category = 'Crafts';
      } else if (combined.includes('pet') || combined.includes('dog') || combined.includes('cat') || combined.includes('bowl') || combined.includes('leash')) {
        category = 'Pets';
      } else if (combined.includes('car') || combined.includes('auto') || combined.includes('vehicle') || combined.includes('motor') || combined.includes('tire') || combined.includes('wash')) {
        category = 'Automotive';
      } else if (combined.includes('furniture') || combined.includes('sofa') || combined.includes('bed') || combined.includes('table') || combined.includes('shelf')) {
        category = 'Furniture';
      } else if (combined.includes('decor') || combined.includes('lamp') || combined.includes('frame') || combined.includes('plant') || combined.includes('mirror') || combined.includes('candle')) {
        category = 'Home Decoration';
      } else if (combined.includes('kitchen') || combined.includes('cookware') || combined.includes('blender') || combined.includes('pan') || combined.includes('spatula')) {
        category = 'Kitchen';
      } else if (combined.includes('food') || combined.includes('drink') || combined.includes('groc') || combined.includes('coffee') || combined.includes('tea') || combined.includes('chocolate') || combined.includes('juice') || combined.includes('milk')) {
        category = 'Food & Beverage';
      } else if (combined.includes('beauty') || combined.includes('skin') || combined.includes('mascara') || combined.includes('lipstick') || combined.includes('perfume') || combined.includes('fragrance') || combined.includes('powder')) {
        category = 'Health & Beauty';
      } else if (combined.includes('sport') || combined.includes('ball') || combined.includes('racket') || combined.includes('workout') || combined.includes('yoga') || combined.includes('fitness')) {
        category = 'Sports';
      } else if (combined.includes('watch') || combined.includes('bag') || combined.includes('jewel') || combined.includes('sunglass') || combined.includes('wallet') || combined.includes('belt')) {
        category = 'Accessories';
      } else if (combined.includes('shirt') || combined.includes('dress') || combined.includes('shoe') || combined.includes('cloth') || combined.includes('pant') || combined.includes('jacket') || combined.includes('hoodie') || combined.includes('tee')) {
        category = 'Fashion';
      } else if (combined.includes('phone') || combined.includes('laptop') || combined.includes('tablet') || combined.includes('tech') || combined.includes('electronic') || combined.includes('macbook') || combined.includes('iphone') || combined.includes('samsung')) {
        category = 'Electronics';
      }

      rawNormalized.push({
        item,
        title,
        category,
        validImages
      });
    }

    // Group items per category
    const categoryGroups = {};
    targetCategories.forEach(c => categoryGroups[c] = []);
    rawNormalized.forEach(p => {
      categoryGroups[p.category].push(p);
    });

    const finalProducts = [];
    let idCount = 1;

    // Build exactly 24 items per category across all 20 categories (480 products)
    targetCategories.forEach((catName) => {
      const group = categoryGroups[catName] || [];
      const pool = categoryCdnImages[catName] || categoryCdnImages['Electronics'];

      for (let i = 0; i < 24; i++) {
        let prod = group[i];
        let validImages = prod ? prod.validImages : [];

        if (!validImages || validImages.length === 0) {
          validImages = [
            pool[i % pool.length],
            pool[(i + 1) % pool.length],
            pool[(i + 2) % pool.length]
          ];
        }
        while (validImages.length < 3) {
          validImages.push(pool[(validImages.length + i) % pool.length]);
        }

        const title = prod ? prod.title : `${catName} Premium Product ${i + 1}`;
        const basePrice = prod ? Number(prod.item.price.toFixed(2)) : (49 + (i * 17) % 350);
        const oldPrice = Number((basePrice * 1.15).toFixed(2));
        const discountPercentage = Math.round(((oldPrice - basePrice) / oldPrice) * 100);

        const rating = Number((prod && prod.item.rating?.rate ? prod.item.rating.rate : (4.2 + (idCount % 8) * 0.1)).toFixed(1));
        const reviewCount = prod && prod.item.rating?.count ? prod.item.rating.count : (25 + (idCount * 17) % 350);
        const soldCount = 100 + (idCount * 29) % 1800;
        const stock = prod && prod.item.stock ? prod.item.stock : (8 + (idCount * 3) % 40);

        const brand = prod && prod.item.brand ? prod.item.brand : 'Official Brand';
        const description = prod && prod.item.description ? prod.item.description : `${title} - Premium high performance product.`;

        const isBestseller = rating >= 4.7;
        const isNewArrival = (idCount % 4 === 0);
        const isFlashSale = (idCount % 5 === 0);

        finalProducts.push({
          id: idCount,
          title,
          category: catName,
          categorySlug: categorySlugMap[catName],
          brand,
          price: basePrice,
          oldPrice,
          discountPercentage,
          rating,
          reviewCount,
          soldCount,
          stock,
          description,
          images: validImages,
          colors: catName === 'Fashion' || catName === 'Accessories' ? ['#090909', '#F5F5F7', '#86868B', '#10B981'] : ['#090909', '#E4E4E7'],
          sizes: catName === 'Fashion' ? ['S', 'M', 'L', 'XL'] : null,
          specifications: {
            'Category': catName,
            'Brand': brand,
            'Condition': 'New',
            'Warranty': 'Official Brand Warranty'
          },
          shippingBadge: 'Express Shipping',
          isFreeShipping: basePrice > 75,
          isBestseller,
          isNewArrival,
          isFlashSale,
          flashEndTime: isFlashSale ? new Date(Date.now() + (12 + (idCount % 12)) * 3600 * 1000).toISOString() : null
        });

        idCount++;
      }
    });

    return finalProducts;
  }

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

    const cachedFallback = this.getCache();
    if (cachedFallback) {
      this.memoryCache = cachedFallback;
      return cachedFallback;
    }

    return [];
  }

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
