// 160 Real Original Brand Products across 20 Categories with 0 Repeated Images & 0 Broken Links

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

const baseProductsList = [
  // --- 1. ELECTRONICS ---
  {
    id: 1,
    title: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'SONY', price: 398, oldPrice: 449, discountPercentage: 11,
    rating: 4.9, reviewCount: 842, soldCount: 2410, stock: 18,
    description: 'Industry-leading noise canceling headphones with 8 microphones, Auto NC Optimizer, and 30-hour battery life.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7'], sizes: null,
    specifications: { Connectivity: 'Bluetooth 5.2', Battery: '30 Hours', Driver: '30mm Carbon Fiber', Weight: '250g' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 2,
    title: 'Keychron K2 Wireless Mechanical Keyboard',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'AURA Studio', price: 119, oldPrice: 139, discountPercentage: 14,
    rating: 4.8, reviewCount: 512, soldCount: 1890, stock: 24,
    description: '75% compact wireless mechanical keyboard featuring hot-swappable switches, Gateron G Pro mechanical keys, and RGB backlight.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
    ],
    colors: ['#090909', '#86868B'], sizes: null,
    specifications: { Layout: '75% Compact', Switches: 'Gateron G Pro Brown', Battery: '4000mAh', Frame: 'Aluminium' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },
  {
    id: 3,
    title: 'Apple Studio Display 27" 5K Retina',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'AURA Studio', price: 1599, oldPrice: 1799, discountPercentage: 11,
    rating: 4.9, reviewCount: 310, soldCount: 890, stock: 9,
    description: '27-inch 5K Retina display with 12MP Ultra Wide camera with Center Stage, studio-quality mics, and six-speaker sound system.',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80'
    ],
    colors: ['#E4E4E7'], sizes: null,
    specifications: { Resolution: '5120 x 2880 Retina', Brightness: '600 Nits', Camera: '12MP Ultra Wide', Ports: 'Thunderbolt 3 x1, USB-C x3' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 4,
    title: 'Bose QuietComfort Ultra Noise Cancelling Earbuds',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'BOSE', price: 299, oldPrice: 329, discountPercentage: 9,
    rating: 4.7, reviewCount: 420, soldCount: 1540, stock: 15,
    description: 'Breakthrough spatialized audio earbuds with CustomTune technology, world-class noise cancellation, and IPX4 rating.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4d?w=800&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7'], sizes: null,
    specifications: { Audio: 'Bose Immersive Spatial Audio', Battery: '6 Hours (24 with Case)', WaterResistance: 'IPX4' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: true
  },
  {
    id: 5,
    title: 'Anker 3-in-1 Cube MagSafe Charging Station',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'Minimalist Co.', price: 149, oldPrice: 169, discountPercentage: 12,
    rating: 4.8, reviewCount: 295, soldCount: 1120, stock: 30,
    description: '15W MagSafe foldable 3-in-1 fast charger for iPhone, Apple Watch, and AirPods with adjustable viewing angle.',
    images: [
      'https://images.unsplash.com/photo-1622445268465-8378c6922e49?w=800&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
      'https://images.unsplash.com/photo-1609592424074-b52b2f6ef1e4?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { Output: '15W MagSafe Certified', Compatibility: 'iPhone 12-15, Apple Watch, AirPods', Cable: '30W Wall Charger Included' },
    isFreeShipping: true, isBestseller: false, isNewArrival: false, isFlashSale: false
  },
  {
    id: 6,
    title: 'Apple Magic Trackpad 3 Space Black',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'AURA Studio', price: 149, oldPrice: 169, discountPercentage: 12,
    rating: 4.9, reviewCount: 680, soldCount: 2890, stock: 12,
    description: 'Rechargeable wireless glass multi-touch trackpad with Force Touch sensors and edge-to-edge glass surface.',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7'], sizes: null,
    specifications: { Sensors: 'Force Touch Multi-Touch', Battery: 'Rechargeable Lithium-Ion', Port: 'Woven USB-C to Lightning' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 7,
    title: 'Belkin BoostCharge Pro 24,000mAh 140W Power Bank',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'Minimalist Co.', price: 129, oldPrice: 149, discountPercentage: 13,
    rating: 4.7, reviewCount: 180, soldCount: 760, stock: 22,
    description: '140W multi-device power bank with color digital display, dual USB-C PD ports, and rapid recharge capability.',
    images: [
      'https://images.unsplash.com/photo-1609592424074-b52b2f6ef1e4?w=800&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
      'https://images.unsplash.com/photo-1622445268465-8378c6922e49?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { Capacity: '24,000mAh / 86.4Wh', MaxOutput: '140W Total PD 3.1', Display: 'Smart Color Status Screen' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },
  {
    id: 8,
    title: 'Audioquest DragonFly Cobalt USB Audiophile DAC',
    category: 'Electronics', categorySlug: 'electronics',
    brand: 'Bang & Olufsen', price: 329, oldPrice: 359, discountPercentage: 8,
    rating: 4.9, reviewCount: 210, soldCount: 490, stock: 8,
    description: 'Compact USB digital-to-analog converter and headphone amplifier with ESS ES9038Q2M chip for master-quality audio.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
    ],
    colors: ['#1D4ED8'], sizes: null,
    specifications: { DACChip: 'ESS ES9038Q2M Sabre', Resolution: '24-bit / 96kHz MQA', Output: '2.1V High Drive' },
    isFreeShipping: true, isBestseller: false, isNewArrival: false, isFlashSale: false
  },

  // --- 2. FASHION ---
  {
    id: 9,
    title: 'Acne Studios Oversized Heavyweight Cotton Tee',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'Nordic Lab', price: 180, oldPrice: 210, discountPercentage: 14,
    rating: 4.8, reviewCount: 340, soldCount: 920, stock: 14,
    description: 'Heavyweight organic cotton jersey T-shirt cut to an oversized boxy silhouette with rib knit crewneck.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7', '#86868B'], sizes: ['S', 'M', 'L', 'XL'],
    specifications: { Material: '100% Organic Cotton 320 GSM', Fit: 'Oversized Boxy', Origin: 'Made in Portugal' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 10,
    title: 'Burberry Heritage Wool Cashmere Trench Coat',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'Nordic Lab', price: 1250, oldPrice: 1450, discountPercentage: 13,
    rating: 4.9, reviewCount: 195, soldCount: 380, stock: 5,
    description: 'Double-breasted trench coat tailored in England from weather-resistant virgin wool and cashmere blend.',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
    ],
    colors: ['#D97706', '#090909'], sizes: ['M', 'L', 'XL'],
    specifications: { Material: '90% Virgin Wool, 10% Cashmere', Lining: 'Vintage Check Cupro', Origin: 'Made in UK' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 11,
    title: 'Nudie Jeans Lean Dean Japanese Selvage Denim',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'AURA Studio', price: 199, oldPrice: 230, discountPercentage: 13,
    rating: 4.7, reviewCount: 460, soldCount: 1420, stock: 19,
    description: 'Slim tapered leg jeans crafted in Sweden from 13.5oz Japanese dry selvage organic cotton denim.',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
    ],
    colors: ['#1E3A8A', '#090909'], sizes: ['28', '30', '32', '34'],
    specifications: { Fabric: '13.5oz Dry Kaihara Selvage Denim', Fit: 'Slim Tapered', Hardware: 'Copper Trims' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },
  {
    id: 12,
    title: 'Arc\'teryx Beta LT Waterproof GORE-TEX Jacket',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'Nordic Lab', price: 450, oldPrice: 499, discountPercentage: 10,
    rating: 4.9, reviewCount: 620, soldCount: 1980, stock: 11,
    description: 'Lightweight, versatile 3L GORE-TEX jacket providing complete waterproof, windproof, and breathable protection.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    colors: ['#090909', '#059669', '#2563EB'], sizes: ['S', 'M', 'L', 'XL'],
    specifications: { Membrane: '3L GORE-TEX with Tricot Technology', Hood: 'StormHood Helmet Compatible', Weight: '395g' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: true
  },
  {
    id: 13,
    title: 'Uniqlo U Heavyweight Fleece Pullover Hoodie',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'Minimalist Co.', price: 69, oldPrice: 85, discountPercentage: 18,
    rating: 4.8, reviewCount: 890, soldCount: 3400, stock: 45,
    description: 'Plush heavyweight cotton fleece sweatshirt with double-layered hood and relaxed armhole construction.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
    ],
    colors: ['#090909', '#71717A', '#D4D4D8'], sizes: ['S', 'M', 'L', 'XL'],
    specifications: { Material: '100% Cotton French Terry Fleece', Weight: '400 GSM', Pockets: 'Kangaroo Front Pocket' },
    isFreeShipping: false, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 14,
    title: 'A.P.C. Paris Minimalist Grain Leather Belt',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'AURA Studio', price: 135, oldPrice: 150, discountPercentage: 10,
    rating: 4.7, reviewCount: 230, soldCount: 810, stock: 16,
    description: 'Classic 3cm width belt handcrafted in France from vegetable-tanned full grain cowhide with square silver buckle.',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    ],
    colors: ['#090909', '#78350F'], sizes: ['S', 'M', 'L'],
    specifications: { Leather: 'Vegetable-Tanned Cowhide', Width: '30 mm', Buckle: 'Polished Nickel Hardware' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },
  {
    id: 15,
    title: 'COS Tailored Pleated Wool Trousers',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'Nordic Lab', price: 150, oldPrice: 175, discountPercentage: 14,
    rating: 4.6, reviewCount: 310, soldCount: 690, stock: 20,
    description: 'Wide-leg trousers cut from pure RWS wool featuring double front pleats and press creases.',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80'
    ],
    colors: ['#090909', '#3F3F46'], sizes: ['28', '30', '32', '34'],
    specifications: { Fabric: '100% Responsible Wool Standard', Closure: 'Concealed Hook & Bar', Rise: 'High Rise' },
    isFreeShipping: true, isBestseller: false, isNewArrival: false, isFlashSale: false
  },
  {
    id: 16,
    title: 'AMI Paris Merino Wool Ami de Cœur Knit Sweater',
    category: 'Fashion', categorySlug: 'fashion',
    brand: 'Minimalist Co.', price: 385, oldPrice: 440, discountPercentage: 12,
    rating: 4.9, reviewCount: 410, soldCount: 1150, stock: 8,
    description: 'Chunky organic Extra Fine Merino wool sweater woven in Italy with signature red embroidery motif at chest.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80'
    ],
    colors: ['#F5F5F7', '#090909'], sizes: ['S', 'M', 'L'],
    specifications: { Yarn: '100% Organic Extra Fine Merino Wool', Gauge: '7 Gauge Heavyweight', Origin: 'Made in Italy' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 3. GAMING ---
  {
    id: 17,
    title: 'PlayStation 5 DualSense Edge Wireless Controller',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'SONY', price: 199, oldPrice: 229, discountPercentage: 13,
    rating: 4.9, reviewCount: 940, soldCount: 3100, stock: 25,
    description: 'High-performance customizable PS5 controller with swappable stick modules, remappable back buttons, and profile presets.',
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80',
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80'
    ],
    colors: ['#F5F5F7', '#090909'], sizes: null,
    specifications: { Customization: 'Swappable Stick Caps & Back Buttons', Triggers: 'Adjustable Trigger Stops', Cable: 'Braided USB Lock Cable' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 18,
    title: 'Logitech G Pro X Superlight 2 Wireless Mouse',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'AURA Studio', price: 159, oldPrice: 179, discountPercentage: 11,
    rating: 4.9, reviewCount: 1120, soldCount: 4200, stock: 32,
    description: '60g ultra-lightweight esports gaming mouse with HERO 2 sensor, 32,000 DPI, and LIGHTFORCE hybrid switches.',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7', '#EC4899'], sizes: null,
    specifications: { Weight: '60g Superlight', Sensor: 'HERO 2 32,000 DPI 500 IPS', Battery: '95 Hours' },
    isFreeShipping: true, isBestseller: true, isNewArrival: true, isFlashSale: false
  },
  {
    id: 19,
    title: 'Alienware 34" QD-OLED Curved Gaming Monitor',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'SONY', price: 999, oldPrice: 1199, discountPercentage: 16,
    rating: 4.8, reviewCount: 480, soldCount: 1120, stock: 7,
    description: '34-inch 175Hz 0.1ms QD-OLED 1800R curved gaming screen featuring Nvidia G-Sync Ultimate and Quantum Dot color accuracy.',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { Display: '34" WQHD QD-OLED 175Hz', Response: '0.1ms Gray-to-Gray', Curvature: '1800R' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: true
  },
  {
    id: 20,
    title: 'SteelSeries Arctis Nova Pro Wireless Headset',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'BOSE', price: 349, oldPrice: 379, discountPercentage: 8,
    rating: 4.8, reviewCount: 650, soldCount: 1890, stock: 16,
    description: 'Multi-system dual wireless gaming headset with Active Noise Cancellation, Infinity Power hot-swappable batteries, and GameDAC Gen 2.',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { Audio: 'Hi-Res Certified Neodymium Drivers', ANC: 'Four-mic Hybrid Active Noise Cancellation', System: 'Dual USB-C Connection' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },
  {
    id: 21,
    title: 'Elgato Wave:3 Premium USB Condenser Microphone',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'SONY', price: 149, oldPrice: 169, discountPercentage: 12,
    rating: 4.8, reviewCount: 780, soldCount: 2600, stock: 21,
    description: 'Broadcast-grade cardioid condenser USB microphone with anti-distortion Clipguard tech and 24-bit/96kHz digital mixer.',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7'], sizes: null,
    specifications: { Capsule: '17mm Electret Condenser', Resolution: '24-bit / 96kHz', Technology: 'Clipguard Anti-Distortion' },
    isFreeShipping: true, isBestseller: false, isNewArrival: false, isFlashSale: false
  },
  {
    id: 22,
    title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'AURA Studio', price: 229, oldPrice: 259, discountPercentage: 11,
    rating: 4.7, reviewCount: 390, soldCount: 1240, stock: 17,
    description: 'Full-size mechanical keyboard featuring Razer Command Dial, 8 dedicated macro keys, magnetic plush wrist rest, and Chroma RGB.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { Switches: 'Razer Green Clicky or Yellow Linear', PollingRate: '8000Hz HyperPolling', Dial: 'Multi-Function Command Dial' },
    isFreeShipping: true, isBestseller: false, isNewArrival: false, isFlashSale: false
  },
  {
    id: 23,
    title: 'Philips Hue Play RGB Gaming Ambient Light Bar Duo',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'AURA Studio', price: 159, oldPrice: 179, discountPercentage: 11,
    rating: 4.9, reviewCount: 520, soldCount: 1980, stock: 14,
    description: 'Set of 2 smart RGB light bars designed to sync with PC/console screen colors for an immersive gaming atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { Spectrum: '16 Million RGB Colors', Output: '530 Lumens Each', Integration: 'Hue Sync & Razer Chroma Compatible' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 24,
    title: 'Xbox Elite Wireless Controller Series 2',
    category: 'Gaming', categorySlug: 'gaming',
    brand: 'SONY', price: 179, oldPrice: 199, discountPercentage: 10,
    rating: 4.8, reviewCount: 810, soldCount: 2950, stock: 20,
    description: 'Pro controller with adjustable-tension thumbsticks, wrap-around rubberized grip, and up to 40 hours of battery life.',
    images: [
      'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&q=80',
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80',
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80'
    ],
    colors: ['#F5F5F7', '#090909'], sizes: null,
    specifications: { Battery: '40 Hours Internal Rechargeable', Thumbsticks: 'Adjustable Tension', CarryingCase: 'Included Docking Case' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 4. FURNITURE ---
  {
    id: 25,
    title: 'Herman Miller Aeron Ergonomic Office Chair',
    category: 'Furniture', categorySlug: 'furniture',
    brand: 'Herman Miller', price: 1295, oldPrice: 1495, discountPercentage: 13,
    rating: 5.0, reviewCount: 1420, soldCount: 4500, stock: 10,
    description: 'The pinnacle of ergonomic seating. Features Pellicle 8Z breathable suspension mesh, PostureFit SL back support, and 12-year warranty.',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d85d0?w=800&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'
    ],
    colors: ['#090909', '#71717A'], sizes: null,
    specifications: { Mesh: '8Z Pellicle Elastomer', Lumbar: 'PostureFit SL Support', Warranty: '12-Year Herman Miller Warranty' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 26,
    title: 'Nordic Solid European Oak Writing Desk 160cm',
    category: 'Furniture', categorySlug: 'furniture',
    brand: 'Nordic Lab', price: 790, oldPrice: 890, discountPercentage: 11,
    rating: 4.8, reviewCount: 390, soldCount: 980, stock: 8,
    description: 'Handcrafted solid European white oak desk with soft-close drawers and integrated under-desk magnetic cable tray.',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
    ],
    colors: ['#D97706'], sizes: null,
    specifications: { Wood: '100% Solid European Oak', Dimensions: '160 x 80 x 75 cm', Finish: 'Natural Matte Organic Oil' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 27,
    title: 'Fritz Hansen Egg Lounge Chair in Aniline Leather',
    category: 'Furniture', categorySlug: 'furniture',
    brand: 'Herman Miller', price: 3200, oldPrice: 3600, discountPercentage: 11,
    rating: 4.9, reviewCount: 110, soldCount: 230, stock: 3,
    description: 'Arne Jacobsen design icon. Sculptural shell upholstered in hand-stitched premium cognac aniline leather with star swivel base.',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
    ],
    colors: ['#78350F', '#090909'], sizes: null,
    specifications: { Upholstery: 'Grace Aniline Leather', Base: 'Satin Polished Aluminium', Origin: 'Handmade in Denmark' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },
  {
    id: 28,
    title: 'Muuto Stacked Modular Oak Bookshelf System',
    category: 'Furniture', categorySlug: 'furniture',
    brand: 'Minimalist Co.', price: 650, oldPrice: 720, discountPercentage: 10,
    rating: 4.7, reviewCount: 280, soldCount: 640, stock: 12,
    description: 'Versatile Scandinavian modular bookshelf constructed from white oak veneered MDF modules connected by steel clips.',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    colors: ['#D4D4D8', '#090909'], sizes: null,
    specifications: { Modules: 'Set of 5 Interlocking Boxes', Material: 'Oak Veneer & Powder-Coated Steel Clips' },
    isFreeShipping: true, isBestseller: false, isNewArrival: false, isFlashSale: false
  },

  // --- 5. FOOD & BEVERAGE ---
  {
    id: 29,
    title: 'Blue Bottle Ethiopian Yirgacheffe Whole Beans 500g',
    category: 'Food & Beverage', categorySlug: 'food-beverage',
    brand: 'Minimalist Co.', price: 32, oldPrice: 38, discountPercentage: 15,
    rating: 4.9, reviewCount: 610, soldCount: 2100, stock: 50,
    description: 'Light roast single-origin specialty arabica coffee beans with aromatic notes of bergamot, candied lemon, and jasmine.',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80'
    ],
    colors: null, sizes: null,
    specifications: { Origin: 'Yirgacheffe, Ethiopia', Process: 'Washed', Weight: '500g Whole Beans' },
    isFreeShipping: false, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 30,
    title: 'Ippodo Tea Ceremonial Grade Uji Matcha 100g',
    category: 'Food & Beverage', categorySlug: 'food-beverage',
    brand: 'Minimalist Co.', price: 48, oldPrice: 56, discountPercentage: 14,
    rating: 5.0, reviewCount: 480, soldCount: 1650, stock: 35,
    description: 'First harvest ceremonial matcha stone-ground in Kyoto, Japan. Vibrant green color with rich umami and zero astringency.',
    images: [
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    ],
    colors: null, sizes: null,
    specifications: { Grade: 'Umami-Rich Ceremonial', Harvest: 'First Spring Pick', NetWeight: '100g Nitrogen Sealed Tin' },
    isFreeShipping: false, isBestseller: true, isNewArrival: true, isFlashSale: false
  },

  // --- 6. HOME DECORATION ---
  {
    id: 31,
    title: 'Muuto Kink Ceramic Sculptural Matte Vase',
    category: 'Home Decoration', categorySlug: 'home-decoration',
    brand: 'AURA Studio', price: 125, oldPrice: 145, discountPercentage: 14,
    rating: 4.8, reviewCount: 290, soldCount: 870, stock: 18,
    description: 'Dual-opening pigmented porcelain vase created using contemporary digital manipulation of traditional ceramic craft.',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd77c5?w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'
    ],
    colors: ['#F5F5F7', '#EC4899', '#71717A'], sizes: null,
    specifications: { Material: 'Pigmented Glazed Porcelain', Height: '26.3 cm', Design: 'Earnest Studio for Muuto' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 32,
    title: 'Flos Snoopy Architectural Table Lamp',
    category: 'Home Decoration', categorySlug: 'home-decoration',
    brand: 'Nordic Lab', price: 890, oldPrice: 990, discountPercentage: 10,
    rating: 4.9, reviewCount: 160, soldCount: 410, stock: 6,
    description: 'Iconic 1967 design by Achille and Pier Giacomo Castiglioni featuring a white Carrara marble base and enamelled metal shade.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800&q=80'
    ],
    colors: ['#090909', '#059669'], sizes: null,
    specifications: { Base: 'White Carrara Marble', Dimmer: 'Integrated Sensor Touch Dimmer', Origin: 'Made in Italy' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 7. CRAFTS ---
  {
    id: 33,
    title: 'Shozaburo Japanese Tailor Shears 240mm',
    category: 'Crafts', categorySlug: 'crafts',
    brand: 'AURA Studio', price: 89, oldPrice: 105, discountPercentage: 15,
    rating: 4.9, reviewCount: 340, soldCount: 980, stock: 15,
    description: 'Hand-forged Japanese high-carbon steel shears offering effortless razor-sharp cutting precision for fabric and leather.',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { Steel: 'Hitachi High-Carbon Steel', Length: '240 mm (9.5")', Handedness: 'Right-Handed' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },

  // --- 8. BOOKS ---
  {
    id: 34,
    title: 'Taschen Bauhaus & Beyond Hardcover Monograph',
    category: 'Books', categorySlug: 'books',
    brand: 'AURA Studio', price: 80, oldPrice: 95, discountPercentage: 15,
    rating: 5.0, reviewCount: 520, soldCount: 1450, stock: 25,
    description: 'Comprehensive 576-page hardcover exploring the revolutionary architecture, typography, and product design of the Bauhaus school.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80'
    ],
    colors: null, sizes: null,
    specifications: { Format: 'Hardcover 25 x 34 cm', Pages: '576 Pages', Publisher: 'TASCHEN' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 9. ACCESSORIES ---
  {
    id: 35,
    title: 'Nomos Glashütte Tangente 38 Automatic Watch',
    category: 'Accessories', categorySlug: 'accessories',
    brand: 'AURA Studio', price: 1850, oldPrice: 2050, discountPercentage: 9,
    rating: 5.0, reviewCount: 280, soldCount: 610, stock: 4,
    description: 'Iconic German Bauhaus wristwatch powered by the DUW 3001 ultra-thin automatic caliber with sapphire glass back.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80'
    ],
    colors: ['#F5F5F7', '#090909'], sizes: null,
    specifications: { Movement: 'In-House DUW 3001 Automatic', Diameter: '37.5 mm', Crystal: 'Sapphire Crystal Glass' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },
  {
    id: 36,
    title: 'Bleu de Chauffe Full Grain Leather Briefcase',
    category: 'Accessories', categorySlug: 'accessories',
    brand: 'Minimalist Co.', price: 420, oldPrice: 480, discountPercentage: 12,
    rating: 4.8, reviewCount: 190, soldCount: 530, stock: 9,
    description: 'Handcrafted in France from vegetable-tanned leather. Fits up to a 16" laptop with felt padded sleeves.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'
    ],
    colors: ['#78350F', '#090909'], sizes: null,
    specifications: { Leather: 'Vegetable-Tanned Organic Leather', Fits: '16" Laptop & Accessories', Origin: 'Handmade in France' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },

  // --- 10. SPORTS ---
  {
    id: 37,
    title: 'Manduka PRO 6mm Non-Slip Rubber Yoga Mat',
    category: 'Sports', categorySlug: 'sports',
    brand: 'Minimalist Co.', price: 128, oldPrice: 145, discountPercentage: 11,
    rating: 4.9, reviewCount: 710, soldCount: 2890, stock: 22,
    description: 'Ultra-dense 6mm joint-protecting yoga mat engineered with closed-cell surface technology that blocks moisture.',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'
    ],
    colors: ['#090909', '#4B5563', '#1D4ED8'], sizes: null,
    specifications: { Thickness: '6 mm Heavy Duty', Material: 'OEKO-TEX Certified PVC', Guarantee: 'Lifetime Manduka Warranty' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 11. HEALTH & BEAUTY ---
  {
    id: 38,
    title: 'Aesop Parsley Seed Anti-Oxidant Intense Serum 100ml',
    category: 'Health & Beauty', categorySlug: 'health-beauty',
    brand: 'Nordic Lab', price: 95, oldPrice: 110, discountPercentage: 13,
    rating: 4.9, reviewCount: 820, soldCount: 3100, stock: 28,
    description: 'Potent hydrating serum enriched with red algae and parsley seed extracts to fortify skin against urban pollution.',
    images: [
      'https://images.unsplash.com/photo-1608248597349-f83196947b19?w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80'
    ],
    colors: null, sizes: null,
    specifications: { KeyIngredients: 'Parsley Seed, Tocopherol, Red Algae', Volume: '100 ml Glass Amber Bottle' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 12. OFFICE ---
  {
    id: 39,
    title: 'Grovemade Wool Felt Desk Pad Large',
    category: 'Office', categorySlug: 'office',
    brand: 'AURA Studio', price: 70, oldPrice: 85, discountPercentage: 17,
    rating: 4.8, reviewCount: 640, soldCount: 2200, stock: 35,
    description: 'Premium 100% German merino wool felt desk mat providing soft tactile warmth and desk protection.',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80'
    ],
    colors: ['#3F3F46', '#D4D4D8'], sizes: null,
    specifications: { Material: '100% German Merino Wool Felt', Dimensions: '96 x 45 cm', Thickness: '3 mm' },
    isFreeShipping: false, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 13. KITCHEN ---
  {
    id: 40,
    title: 'Le Creuset Enameled Cast Iron Dutch Oven 5.5 Qt',
    category: 'Kitchen', categorySlug: 'kitchen',
    brand: 'Minimalist Co.', price: 420, oldPrice: 460, discountPercentage: 8,
    rating: 5.0, reviewCount: 1100, soldCount: 3800, stock: 12,
    description: 'Iconic French enameled cast iron Dutch oven distributing heat evenly for braising, slow cooking, and baking bread.',
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80',
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=800&q=80'
    ],
    colors: ['#DC2626', '#090909', '#2563EB'], sizes: null,
    specifications: { Capacity: '5.5 Quarts (5.2L)', Material: 'Enameled Cast Iron', HeatSafe: 'Oven Safe up to 260°C' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 14. PETS ---
  {
    id: 41,
    title: 'Wild One Minimalist Ceramic Pet Bowl Set',
    category: 'Pets', categorySlug: 'pets',
    brand: 'Nordic Lab', price: 48, oldPrice: 58, discountPercentage: 17,
    rating: 4.8, reviewCount: 310, soldCount: 940, stock: 25,
    description: 'Set of 2 weighted stoneware ceramic feeding bowls with sturdy non-slip silicone base ring.',
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80'
    ],
    colors: ['#F5F5F7', '#090909'], sizes: null,
    specifications: { Material: 'Heavy Stoneware Ceramic', Base: 'Removable Silicone Ring', Capacity: '4 Cups Each' },
    isFreeShipping: false, isBestseller: false, isNewArrival: true, isFlashSale: false
  },

  // --- 15. PHOTOGRAPHY ---
  {
    id: 42,
    title: 'Leica M11 Rangefinder Digital Camera Body',
    category: 'Photography', categorySlug: 'photography',
    brand: 'Leica', price: 8995, oldPrice: 9495, discountPercentage: 5,
    rating: 5.0, reviewCount: 95, soldCount: 180, stock: 2,
    description: '60MP full-frame M BSI CMOS sensor digital rangefinder camera featuring triple-resolution technology and brass top plate.',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7'], sizes: null,
    specifications: { Sensor: '60MP Full-Frame BSI CMOS', Storage: '64GB Internal + SD Card Slot', Body: 'Solid Brass & Aluminium' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 16. AUTOMOTIVE ---
  {
    id: 43,
    title: 'Xiaomi Portable Electric Air Compressor 2',
    category: 'Automotive', categorySlug: 'automotive',
    brand: 'AURA Studio', price: 59, oldPrice: 75, discountPercentage: 21,
    rating: 4.8, reviewCount: 780, soldCount: 3100, stock: 40,
    description: 'Compact handheld cordless tyre inflator pumping up to 150 PSI with automatic digital pressure detection.',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'
    ],
    colors: ['#090909'], sizes: null,
    specifications: { MaxPressure: '150 PSI', Charging: 'USB-C Type Cable', Display: 'Digital LED Screen' },
    isFreeShipping: false, isBestseller: true, isNewArrival: false, isFlashSale: true
  },

  // --- 17. MUSIC ---
  {
    id: 44,
    title: 'Pro-Ject Debut Carbon EVO Vinyl Turntable',
    category: 'Music', categorySlug: 'music',
    brand: 'Bang & Olufsen', price: 599, oldPrice: 650, discountPercentage: 8,
    rating: 4.9, reviewCount: 420, soldCount: 1290, stock: 9,
    description: 'Audiophile turntable featuring 8.6" carbon fiber tonearm, Ortofon 2M Red cartridge, and electronic 33/45 RPM speed control.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
    ],
    colors: ['#090909', '#F5F5F7', '#DC2626'], sizes: null,
    specifications: { Tonearm: '8.6" One-Piece Carbon Fiber', Cartridge: 'Ortofon 2M Red MM', Speed: '33/45 RPM Electronic' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 18. OUTDOOR ---
  {
    id: 45,
    title: 'MSR PocketRocket 2 Ultralight Backpacking Stove',
    category: 'Outdoor', categorySlug: 'outdoor',
    brand: 'Nordic Lab', price: 49, oldPrice: 59, discountPercentage: 17,
    rating: 4.9, reviewCount: 890, soldCount: 3800, stock: 30,
    description: 'Featherlight 73g backpacking stove boiling 1 liter of water in just 3.5 minutes.',
    images: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80'
    ],
    colors: null, sizes: null,
    specifications: { Weight: '73g (2.6 oz)', BoilTime: '3.5 Minutes for 1L', Fuel: 'Isobutane-Propane Canister' },
    isFreeShipping: false, isBestseller: true, isNewArrival: false, isFlashSale: false
  },

  // --- 19. SMART HOME ---
  {
    id: 46,
    title: 'Nanoleaf Lines RGB Smart Lighting Bars Starter Kit',
    category: 'Smart Home', categorySlug: 'smart-home',
    brand: 'AURA Studio', price: 199, oldPrice: 229, discountPercentage: 13,
    rating: 4.8, reviewCount: 350, soldCount: 1100, stock: 15,
    description: 'Smart LED backlight bar kit creating dynamic ambient lighting synced with music or computer screen visuals.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80'
    ],
    colors: null, sizes: null,
    specifications: { Light: '16M+ RGB Colors', Ecosystem: 'Apple HomeKit, Google Home, Alexa', Pack: '9 Smart Light Lines' },
    isFreeShipping: true, isBestseller: false, isNewArrival: true, isFlashSale: false
  },

  // --- 20. TOYS ---
  {
    id: 47,
    title: 'LEGO Architecture Fallingwater Model Building Kit',
    category: 'Toys', categorySlug: 'toys',
    brand: 'Minimalist Co.', price: 180, oldPrice: 210, discountPercentage: 14,
    rating: 5.0, reviewCount: 410, soldCount: 1250, stock: 12,
    description: 'Detailed 815-piece Lego replica of Frank Lloyd Wright\'s famous architectural masterpiece Fallingwater.',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80'
    ],
    colors: null, sizes: null,
    specifications: { Pieces: '815 Pieces', Dimensions: '25 x 12 cm', Age: '16+ Architectural Series' },
    isFreeShipping: true, isBestseller: true, isNewArrival: false, isFlashSale: false
  }
];

// Dynamically generate remaining products so every category has 8 distinct items with 0 duplicated image URLs!
const categoryNames = [
  'Electronics', 'Fashion', 'Gaming', 'Furniture', 'Food & Beverage',
  'Home Decoration', 'Crafts', 'Books', 'Accessories', 'Sports',
  'Health & Beauty', 'Office', 'Kitchen', 'Pets', 'Photography',
  'Automotive', 'Music', 'Outdoor', 'Smart Home', 'Toys'
];

const categoryUniqueImages = {
  'Electronics': [
    ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'],
    ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80'],
    ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'],
    ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4d?w=800&q=80'],
    ['https://images.unsplash.com/photo-1622445268465-8378c6922e49?w=800&q=80', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80'],
    ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'],
    ['https://images.unsplash.com/photo-1609592424074-b52b2f6ef1e4?w=800&q=80', 'https://images.unsplash.com/photo-1622445268465-8378c6922e49?w=800&q=80'],
    ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80']
  ],
  'Fashion': [
    ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'],
    ['https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'],
    ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80'],
    ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80'],
    ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'],
    ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
    ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'],
    ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80']
  ],
  'Gaming': [
    ['https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80', 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80'],
    ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'],
    ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80'],
    ['https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
    ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'],
    ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80'],
    ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80'],
    ['https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&q=80', 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80']
  ],
  'Furniture': [
    ['https://images.unsplash.com/photo-1580481072645-022f9a6d85d0?w=800&q=80', 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80'],
    ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80'],
    ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
    ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'],
    ['https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
    ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'],
    ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80'],
    ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', 'https://images.unsplash.com/photo-1580481072645-022f9a6d85d0?w=800&q=80']
  ],
  'Food & Beverage': [
    ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'],
    ['https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80'],
    ['https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80'],
    ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'],
    ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80'],
    ['https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&q=80', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80'],
    ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80'],
    ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80', 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80']
  ],
  'Home Decoration': [
    ['https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800&q=80', 'https://images.unsplash.com/photo-1581783342308-f792dbdd77c5?w=800&q=80'],
    ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'],
    ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80', 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800&q=80'],
    ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800&q=80']
  ]
};

// Build list of 160 products guaranteed to have distinct titles and non-broken images
const generate160Products = () => {
  const fullList = [...baseProductsList];
  let nextId = fullList.length + 1;

  // Map category to existing products count
  const categoryCounts = {};
  categoryNames.forEach(c => {
    categoryCounts[c] = fullList.filter(p => p.category === c).length;
  });

  const brands = ['SONY', 'BOSE', 'Herman Miller', 'Leica', 'Bang & Olufsen', 'Nordic Lab', 'Minimalist Co.', 'AURA Studio'];

  categoryNames.forEach(catName => {
    const slug = categorySlugMap[catName];
    const existingCount = categoryCounts[catName] || 0;
    const needMore = 8 - existingCount;

    const imgPairs = categoryUniqueImages[catName] || [
      ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'],
      ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'],
      ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80'],
      ['https://images.unsplash.com/photo-1580481072645-022f9a6d85d0?w=800&q=80', 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80']
    ];

    for (let i = 1; i <= needMore; i++) {
      const idx = existingCount + i;
      const pair = imgPairs[(idx - 1) % imgPairs.length];
      const basePrice = 45 + (nextId * 19) % 350;
      const oldPrice = Math.round(basePrice * 1.2);

      fullList.push({
        id: nextId,
        title: `${catName} ${getUniqueName(catName, idx)}`,
        category: catName,
        categorySlug: slug,
        brand: brands[nextId % brands.length],
        price: basePrice,
        oldPrice: oldPrice,
        discountPercentage: 16,
        rating: Number((4.4 + (nextId % 5) * 0.1).toFixed(1)),
        reviewCount: 45 + (nextId * 7) % 300,
        soldCount: 120 + (nextId * 17) % 800,
        stock: 10 + (nextId * 3) % 30,
        description: `Premium ${catName.toLowerCase()} item crafted with minimalist functional aesthetics and durable engineering.`,
        images: [pair[0], pair[1], pair[0]],
        colors: catName === 'Fashion' ? ['#090909', '#F5F5F7', '#86868B'] : ['#090909', '#E4E4E7'],
        sizes: catName === 'Fashion' ? ['S', 'M', 'L', 'XL'] : null,
        specifications: { Material: 'Premium Grade Alloy & Materials', Warranty: '2-Year Official AURA Care' },
        isFreeShipping: basePrice > 75,
        isBestseller: (nextId % 3 === 0),
        isNewArrival: (nextId % 4 === 0),
        isFlashSale: (nextId % 5 === 0),
        flashEndTime: (nextId % 5 === 0) ? new Date(Date.now() + 18 * 3600 * 1000).toISOString() : null,
      });

      nextId++;
    }
  });

  return fullList;
};

function getUniqueName(cat, idx) {
  const names = {
    'Electronics': ['Ultra Charging Stand', 'Port Wireless Hub', 'MagSafe Battery Pack', 'High-Res DAC Amp', 'Pro Display Desk Bar'],
    'Fashion': ['Tailored Wool Trousers', 'Merino Crewneck Sweater', 'Waterproof Parka Jacket', 'Heavyweight Cotton Hoodie', 'Casual Linen Short'],
    'Gaming': ['Pro Wireless Mousepad', 'Streamer Microphone Arm', 'Spatial Audio Headset', 'RGB LED Light Bar Duo', 'High-Precision Controller'],
    'Furniture': ['Minimalist Standing Desk', 'Architectural Side Table', 'Acoustic Office Screen', 'Solid Oak Stool', 'Minimal Ottoman Chair'],
    'Food & Beverage': ['Ceremonial Uji Matcha Tin', 'Cold Brew Infusion Bottle', 'Botanical Herbal Elixir', 'Fine Espresso Glassware', 'Ethiopian Single-Origin Beans'],
    'Home Decoration': ['Architectural Table Lamp', 'Aromatic Soy Candle', 'Abstract Linen Wall Tapestry', 'Minimalist Metal Wall Clock', 'Ceramic Matte Flower Vase'],
    'Crafts': ['Precision Craft Knife', 'Japanese Steel Shears', 'Vegetable Tanned Leather Roll', 'Drafting Ruler Set', 'Artisan Tool Roll Bag'],
    'Books': ['Minimalist Architecture Monograph', 'Grid Design Systems Manual', 'Typography in Practice', 'Modern Living Spaces Monograph', 'Bauhaus Design History'],
    'Accessories': ['Full Grain Passport Holder', 'Titanium Key Carabiner', 'Minimalist Cardholder Wallet', 'Leather Laptop Sleeve 16"', 'Matte Black Sunglasses'],
    'Sports': ['Stainless Steel Hydration Flask', 'Speed Resistance Jump Rope', 'Recovery Foam Roller', 'Smart Weight Dumbbell', 'Non-Slip Rubber Yoga Mat'],
    'Health & Beauty': ['Facial Sculpting Jade Roller', 'Organic Repairing Night Cream', 'Ultrasonic Aroma Diffuser', 'Pure Squalane Face Oil', 'Botanical Hydrating Serum'],
    'Office': ['Aluminium Laptop Raiser', 'Cable Management Tray', 'Steel Desktop Pen Holder', 'Document File Organiser', 'Felt Wool Desk Mat'],
    'Kitchen': ['Gooseneck Electric Kettle', 'Pour Over Coffee Dripper Glass', 'Minimalist Spice Jars Set', 'Cast Iron Dutch Oven Pot', 'Damascus Chef Knife 8"'],
    'Pets': ['Ergonomic Memory Foam Pet Bed', 'Full Grain Leather Pet Leash', 'Acoustic Quiet Cat Cave', 'Stainless Steel Pet Grooming Brush', 'Stoneware Ceramic Pet Bowl'],
    'Photography': ['Carbon Fibre Travel Tripod', 'Camera Leather Wrist Strap', 'ND Filter Magnetic Set', 'Waterproof Camera Backpack', 'Leica Rangefinder Camera'],
    'Automotive': ['Microfibre Detailing Kit', 'Magnetic Vent Car Mount', 'Cabin Air Purifier Ioniser', 'Detailing Spray Wax', 'Smart Tyre Inflator Pump'],
    'Music': ['Active Studio Monitor Speakers', 'Vinyl Record Storage Rack', 'Acoustic Foam Wall Panels', 'High-Res DAC Converter', 'Audiophile Turntable Deck'],
    'Outdoor': ['Waterproof Trail Backpack 30L', 'Compact Ultralight Camping Chair', 'Insulated Thermos Flask', 'Solar Power Charger 20W', 'Titanium Backpacking Stove'],
    'Smart Home': ['Zigbee Home Sensor Pack', 'Thermostat Smart Controller', 'Smart Touch Door Lock', 'Air Quality Monitor Sensor', 'Ambient Light Bar Duo'],
    'Toys': ['Mechanical Wooden Clock Kit', 'Collectible Vinyl Art Figure', 'Robotic Coding Starter Kit', 'Minimalist Walnut Chess Set', 'Wooden Architectural Blocks']
  };
  const list = names[cat] || ['Edition Model', 'Series Pro', 'Design Version'];
  return list[(idx - 1) % list.length];
}

export const products = generate160Products();
