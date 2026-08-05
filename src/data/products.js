// 120+ High Quality Dummy Products across 20 Categories

const unsplashImages = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
  ],
  gaming: [
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
  ],
  furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'https://images.unsplash.com/photo-1580481072645-022f9a6d85d0?w=800&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80',
  ],
  food: [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
  ],
  decor: [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
  ],
  photography: [
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
  ],
  music: [
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  ]
};

const categoryNames = [
  'Electronics', 'Fashion', 'Gaming', 'Furniture', 'Food & Beverage',
  'Home Decoration', 'Crafts', 'Books', 'Accessories', 'Sports',
  'Health & Beauty', 'Office', 'Kitchen', 'Pets', 'Photography',
  'Automotive', 'Music', 'Outdoor', 'Smart Home', 'Toys'
];

const categorySlugMap = {
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

const brandsList = ['AURA Studio', 'SONY', 'BOSE', 'Herman Miller', 'Leica', 'Bang & Olufsen', 'Nordic Lab', 'Minimalist Co.'];

const generateProducts = () => {
  const items = [];
  let currentId = 1;

  const productTemplates = [
    // Electronics & Tech
    { title: 'AURA Sound Studio Pro Headphones', category: 'Electronics', price: 349, oldPrice: 399, brand: 'AURA Studio', img: unsplashImages.electronics[0], specs: { Connectivity: 'Bluetooth 5.3 & Lossless Wired', Battery: '50 Hours', ANC: 'Active Hybrid Noise Cancellation' } },
    { title: 'AURA Minimal Wireless Keyboard', category: 'Electronics', price: 179, oldPrice: 199, brand: 'AURA Studio', img: unsplashImages.electronics[2], specs: { Switches: 'Custom Lubricated Linear', Material: 'Anodized Aluminium', Backlight: 'Monochrome LED' } },
    { title: 'AURA Precision Trackpad Touch', category: 'Electronics', price: 129, oldPrice: 149, brand: 'AURA Studio', img: unsplashImages.electronics[4], specs: { Surface: 'Matte Frosted Glass', Battery: '3 Months', Charge: 'USB-C Fast Charge' } },
    { title: 'Ultra HD OLED Studio Display 27"', category: 'Electronics', price: 1299, oldPrice: 1499, brand: 'SONY', img: unsplashImages.electronics[3], specs: { Resolution: '4K OLED 144Hz', Color: '99% DCI-P3', Ports: 'Thunderbolt 4 x2' } },
    { title: 'Wireless Charging Dock Duo', category: 'Electronics', price: 89, oldPrice: 110, brand: 'Minimalist Co.', img: unsplashImages.electronics[1], specs: { Output: '15W MagSafe Fast Charge', Body: 'Solid Walnut & Aluminium' } },
    { title: 'Noise Cancelling Earbuds Gen II', category: 'Electronics', price: 249, oldPrice: 279, brand: 'BOSE', img: unsplashImages.electronics[1], specs: { ANC: 'QuietModes AI', Waterproof: 'IPX7 Water Resistant' } },

    // Fashion
    { title: 'Minimalist Heavyweight Cotton Tee', category: 'Fashion', price: 58, oldPrice: 75, brand: 'AURA Studio', img: unsplashImages.fashion[0], sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Charcoal'] },
    { title: 'Overcoat Wool Cashmere Blend', category: 'Fashion', price: 420, oldPrice: 495, brand: 'Nordic Lab', img: unsplashImages.fashion[1], sizes: ['M', 'L', 'XL'], colors: ['Camel', 'Onyx'] },
    { title: 'Structured Linen Overshirt', category: 'Fashion', price: 110, oldPrice: 135, brand: 'Minimalist Co.', img: unsplashImages.fashion[2], sizes: ['S', 'M', 'L'], colors: ['Sage', 'Sand', 'Black'] },
    { title: 'Architectural Slim Denim Pants', category: 'Fashion', price: 145, oldPrice: 165, brand: 'AURA Studio', img: unsplashImages.fashion[3], sizes: ['28', '30', '32', '34'], colors: ['Indigo', 'Washed Grey'] },
    { title: 'Waterproof Commuter Trench Jacket', category: 'Fashion', price: 290, oldPrice: 340, brand: 'Nordic Lab', img: unsplashImages.fashion[4], sizes: ['S', 'M', 'L', 'XL'], colors: ['Matte Black', 'Olive'] },

    // Gaming
    { title: 'Haptic Pro Gaming Controller', category: 'Gaming', price: 169, oldPrice: 199, brand: 'SONY', img: unsplashImages.gaming[0], specs: { Triggers: 'Adaptive Force Feedback', Polling: '1000Hz Ultra Low Latency' } },
    { title: 'Ultra Wide Curved Gaming Monitor 34"', category: 'Gaming', price: 899, oldPrice: 999, brand: 'SONY', img: unsplashImages.gaming[1], specs: { Panel: 'QD-OLED 240Hz 0.03ms', Curve: '1800R' } },
    { title: 'Titanium Mechanical Gaming Mouse', category: 'Gaming', price: 119, oldPrice: 139, brand: 'AURA Studio', img: unsplashImages.gaming[2], specs: { Weight: '48g Superlight', Sensor: '30,000 DPI Optical' } },
    { title: 'Acoustic Surround Gaming Headset', category: 'Gaming', price: 229, oldPrice: 259, brand: 'BOSE', img: unsplashImages.gaming[3], specs: { Audio: 'Spatial 3D Audio', Mic: 'Broadcast Quality Boom Mic' } },

    // Furniture
    { title: 'AURA Ergonomic Task Chair', category: 'Furniture', price: 850, oldPrice: 990, brand: 'Herman Miller', img: unsplashImages.furniture[0], specs: { Material: 'Breathable Elastomer Mesh', Warranty: '12 Years' } },
    { title: 'Solid Oak Minimal Desk 160cm', category: 'Furniture', price: 740, oldPrice: 850, brand: 'Nordic Lab', img: unsplashImages.furniture[1], specs: { Wood: 'Sustainably Sourced European Oak', Cable: 'Hidden Magnetic Tray' } },
    { title: 'Sculptural Lounge Armchair', category: 'Furniture', price: 920, oldPrice: 1100, brand: 'Herman Miller', img: unsplashImages.furniture[2], specs: { Upholstery: 'Bouclé Wool', Base: 'Matte Powder-Coated Steel' } },
    { title: 'Modular Bookshelf Unit', category: 'Furniture', price: 490, oldPrice: 560, brand: 'Minimalist Co.', img: unsplashImages.furniture[3], specs: { Configuration: 'Toolless Interlocking System' } },

    // Accessories
    { title: 'AURA Automatic Chronograph Watch', category: 'Accessories', price: 590, oldPrice: 680, brand: 'AURA Studio', img: unsplashImages.accessories[0], specs: { Movement: 'Swiss Automatic 28,800 vph', Crystal: 'Sapphire Scratchproof' } },
    { title: 'Full Grain Leather Briefcase', category: 'Accessories', price: 340, oldPrice: 390, brand: 'Minimalist Co.', img: unsplashImages.accessories[1], specs: { Leather: 'Vegetable Tanned Tuscan Leather', Hardware: 'Solid Brass' } },
    { title: 'Minimalist Titanium Wallet', category: 'Accessories', price: 85, oldPrice: 99, brand: 'AURA Studio', img: unsplashImages.accessories[2], specs: { Protection: 'RFID Shielding', Capacity: '1-12 Cards' } },

    // Photography & Music
    { title: 'Leica Minimalist Rangefinder M-Style', category: 'Photography', price: 3400, oldPrice: 3800, brand: 'Leica', img: unsplashImages.photography[0], specs: { Sensor: '60MP Full Frame BSI CMOS', Body: 'Magnesium & Brass Body' } },
    { title: 'Bang & Olufsen Hi-Fi Speaker Soundbar', category: 'Music', price: 1490, oldPrice: 1690, brand: 'Bang & Olufsen', img: unsplashImages.music[0], specs: { Drivers: '11 Custom Audio Drivers', AirPlay: 'AirPlay 2 & Spotify Connect' } },
  ];

  // Populate 120+ products systematically across all 20 categories
  categoryNames.forEach((catName) => {
    const slug = categorySlugMap[catName];
    // Each category gets 6 distinct items (20 x 6 = 120 products total)
    for (let i = 1; i <= 6; i++) {
      const template = productTemplates[(currentId - 1) % productTemplates.length];
      const priceVariation = Math.floor((i * 15 + currentId * 7) % 180);
      const basePrice = Math.max(35, template.price + (i % 2 === 0 ? priceVariation : -priceVariation * 0.4));
      const oldPrice = Math.round(basePrice * (1 + (0.15 + (i % 3) * 0.08)));
      const discount = Math.round(((oldPrice - basePrice) / oldPrice) * 100);
      
      const isFlashSale = (currentId % 7 === 0 || currentId % 11 === 0);
      const isBestseller = (currentId % 4 === 0);
      const isNewArrival = (currentId % 3 === 0);

      items.push({
        id: currentId,
        title: i === 1 ? template.title : `${catName} ${getCategoryItemName(catName, i)}`,
        category: catName,
        categorySlug: slug,
        price: Math.round(basePrice),
        oldPrice: oldPrice,
        discountPercentage: discount,
        rating: Number((4.2 + (currentId % 8) * 0.1).toFixed(1)),
        reviewCount: 14 + (currentId * 11) % 230,
        soldCount: 80 + (currentId * 19) % 1400,
        stock: 5 + (currentId * 3) % 45,
        brand: brandsList[(currentId + i) % brandsList.length],
        description: `Designed with pure aesthetic precision. The ${catName.toLowerCase()} series embodies clean lines, premium materials, and uncompromised durability for everyday modern living.`,
        images: [
          template.img,
          unsplashImages.electronics[(i + 1) % unsplashImages.electronics.length],
          unsplashImages.furniture[(i + 2) % unsplashImages.furniture.length],
        ],
        colors: catName === 'Fashion' || catName === 'Accessories' ? ['#090909', '#F5F5F7', '#86868B', '#10B981'] : ['#090909', '#E4E4E7'],
        sizes: catName === 'Fashion' ? ['S', 'M', 'L', 'XL'] : null,
        specifications: template.specs || {
          'Material': 'Aircraft-grade Aluminium & Glass',
          'Finish': 'Anodized Matte Coating',
          'Warranty': '2-Year Official AURA Warranty',
          'Origin': 'Designed in Stockholm'
        },
        shippingBadge: 'Express Dispatch',
        isFreeShipping: basePrice > 75,
        isBestseller: isBestseller,
        isNewArrival: isNewArrival,
        isFlashSale: isFlashSale,
        flashEndTime: isFlashSale ? new Date(Date.now() + 18 * 3600 * 1000).toISOString() : null,
      });

      currentId++;
    }
  });

  return items;
};

function getCategoryItemName(cat, index) {
  const suffixes = {
    'Electronics': ['Ultra Power Bank', 'MagSafe Charging Stand', 'Smart Desk Hub', 'Portable DAC Amp', 'Thunderbolt Dock'],
    'Fashion': ['Tailored Linen Trousers', 'Merino Wool Hoodie', 'Minimalist Leather Belt', 'Seamless Crew Sweater', 'Waterproof Parka'],
    'Gaming': ['Pro Wireless Mousepad', 'Streamer Boom Arm', 'Ultra Low Latency Mic', 'RGB Light Bar', 'Flight Simulator Stick'],
    'Furniture': ['Minimalist Standing Desk', 'Architectural Side Table', 'Acoustic Office Screen', 'Solid Oak Stool', 'Minimal Ottoman'],
    'Food & Beverage': ['Artisanal Single-Origin Coffee Beans', 'Organic Ceremonial Matcha', 'Cold Brew Infusion Bottle', 'Botanical Herbal Elixir', 'Fine Espresso Glass Set'],
    'Home Decoration': ['Ceramic Matte Vase Set', 'Architectural Table Lamp', 'Aromatic Soy Candle', 'Abstract Linen Wall Tapestry', 'Minimalist Metal Wall Clock'],
    'Crafts': ['Precision Precision Craft Knife', 'Japanese Steel Scissors', 'Vegetable Tanned Leather Sheet', 'Drafting Ruler Set', 'Artisan Tool Wrap'],
    'Books': ['Bauhaus & Beyond Hardcover Book', 'Minimalist Architecture Monograph', 'Grid Design Systems Manual', 'Typography in Practice', 'Modern Living Spaces'],
    'Accessories': ['Full Grain Passport Holder', 'Titanium Key Carabiner', 'Minimalist Cardholder', 'Leather Laptop Sleeve', 'Matte Sunglasses'],
    'Sports': ['Ergonomic Yoga Mat', 'Matte Stainless Steel Flask', 'Speed Resistance Rope', 'Recovery Foam Roller', 'Smart Weight Dumbbell'],
    'Health & Beauty': ['Hydrating Botanical Serum', 'Facial Sculpting Roller', 'Organic Night Cream', 'Ultrasonic Aroma Diffuser', 'Pure Squalane Oil'],
    'Office': ['Desk Mat Felt Wool', 'Aluminium Laptop Stand', 'Cable Management Tray', 'Pen Holder Solid Steel', 'Document Organiser'],
    'Kitchen': ['Cast Iron Dutch Oven', 'Japanese Damascus Chef Knife', 'Electric Gooseneck Kettle', 'Pour Over Coffee Maker', 'Minimalist Spice Jars'],
    'Pets': ['Minimalist Ceramic Pet Bowl', 'Ergonomic Pet Bed', 'Full Leather Leash Set', 'Acoustic Quiet Cat Cave', 'Stainless Grooming Brush'],
    'Photography': ['Carbon Fibre Travel Tripod', 'Camera Leather Wrist Strap', 'ND Filter Magnetic Set', 'Waterproof Camera Bag', 'LED Studio Panel'],
    'Automotive': ['Smart Tyre Inflator', 'Microfibre Polish Kit', 'Magnetic Car Mount', 'Cabin Air Purifier', 'Detailing Spray Wax'],
    'Music': ['Audiophile Turntable Deck', 'Studio Monitor Speakers', 'Vinyl Storage Rack', 'Acoustic Wall Panels', 'High-Res DAC Converter'],
    'Outdoor': ['Ultra-Light Titanium Stove', 'Waterproof Trail Pack 30L', 'Compact Camping Chair', 'Insulated Thermos Flask', 'Solar Power Charger'],
    'Smart Home': ['Smart Ambient Light Bar', 'Zigbee Home Sensor Pack', 'Thermostat Controller', 'Smart Door Lock Touch', 'Air Quality Monitor'],
    'Toys': ['Architectural Building Blocks', 'Mechanical Wooden Clock Kit', 'Collectible Vinyl Art Figure', 'Robotic Coding Kit', 'Minimalist Chess Set']
  };

  const list = suffixes[cat] || ['Edition Item', 'Studio Series', 'Pro Model', 'Minimal Version'];
  return list[(index - 1) % list.length];
}

export const products = generateProducts();
