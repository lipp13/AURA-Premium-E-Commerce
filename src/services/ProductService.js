// src/services/ProductService.js
// Fetches real products from public APIs and maps them to the correct categories.
// Categories that APIs don't cover are filled with accurate, category-specific fallback products.

const CACHE_KEY = 'aura_products_cache_v3';
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

// STRICT mapping from API category strings to our categories
// Only map when we are 100% sure the products belong there
const strictApiCategoryMap = {
  // DummyJSON categories
  'smartphones': 'Electronics',
  'laptops': 'Electronics',
  'tablets': 'Electronics',
  'mobile-accessories': 'Electronics',
  'mens-shirts': 'Fashion',
  'mens-shoes': 'Fashion',
  'womens-dresses': 'Fashion',
  'womens-shoes': 'Fashion',
  'tops': 'Fashion',
  'furniture': 'Furniture',
  'groceries': 'Food & Beverage',
  'home-decoration': 'Home Decoration',
  'mens-watches': 'Accessories',
  'womens-watches': 'Accessories',
  'womens-bags': 'Accessories',
  'womens-jewellery': 'Accessories',
  'sunglasses': 'Accessories',
  'sports-accessories': 'Sports',
  'beauty': 'Health & Beauty',
  'skin-care': 'Health & Beauty',
  'fragrances': 'Health & Beauty',
  'kitchen-accessories': 'Kitchen',
  'vehicle': 'Automotive',
  'motorcycle': 'Automotive',
  // FakeStoreAPI categories
  "men's clothing": 'Fashion',
  "women's clothing": 'Fashion',
  'jewelery': 'Accessories',
  'electronics': 'Electronics',
  // Escuelajs / Platzi categories
  'clothes': 'Fashion',
  'shoes': 'Fashion',
  'furniture': 'Furniture',
  'miscellaneous': null, // skip - don't force into any category
  'others': null,
};

// CDN image pools per category for fallback products
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
    'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png',
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/1.png',
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
    'https://cdn.dummyjson.com/products/images/home-decoration/House%20Plant/1.png',
    'https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Stickers/1.png'
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
    'https://cdn.dummyjson.com/products/images/sports-accessories/Tennis%20Racket/1.png',
    'https://cdn.dummyjson.com/products/images/sports-accessories/Golf%20Balls/1.png',
    'https://cdn.dummyjson.com/products/images/sports-accessories/Basketball/1.png'
  ],
  'Health & Beauty': [
    'https://cdn.dummyjson.com/products/images/beauty/essence-mascara-lash-princess/1.webp',
    'https://cdn.dummyjson.com/products/images/beauty/eyeshadow-palette-with-mirror/1.webp',
    'https://cdn.dummyjson.com/products/images/beauty/powder-canister/1.webp'
  ],
  'Office': [
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/1.png',
    'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20Nightstand/1.png',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirTag/1.png'
  ],
  'Kitchen': [
    'https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/1.png',
    'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/1.png',
    'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Cookware/1.png'
  ],
  'Pets': [
    'https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/1.png',
    'https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/1.png',
    'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/1.png'
  ],
  'Photography': [
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/1.png',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirTag/1.png',
    'https://i.imgur.com/FDw9w9h.jpeg'
  ],
  'Automotive': [
    'https://cdn.dummyjson.com/products/images/vehicle/Amphibious%20Vehicle/1.png',
    'https://cdn.dummyjson.com/products/images/vehicle/Go%20Kart/1.png',
    'https://cdn.dummyjson.com/products/images/vehicle/Standard%20Motorcycle/1.png'
  ],
  'Music': [
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png',
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Dot%205th%20Gen/1.png',
    'https://i.imgur.com/ZANVnHE.jpeg'
  ],
  'Outdoor': [
    'https://cdn.dummyjson.com/products/images/sports-accessories/Tennis%20Racket/1.png',
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

// Fallback products for categories that public APIs do NOT cover.
// Each product has a title, brand, price, and description that ACTUALLY matches its category.
const categoryFallbackProducts = {
  'Gaming': [
    { title: 'ASUS ROG Strix G16 Gaming Laptop RTX 4070', brand: 'ASUS', price: 1499, desc: '16-inch 165Hz display, Intel Core i9-13980HX, NVIDIA RTX 4070, 16GB DDR5 RAM, 1TB SSD gaming laptop.' },
    { title: 'Razer DeathAdder V3 HyperSpeed Wireless Gaming Mouse', brand: 'Razer', price: 99, desc: '63g ultra-lightweight wireless gaming mouse with Focus Pro 35K optical sensor and HyperSpeed technology.' },
    { title: 'SteelSeries Apex Pro TKL Mechanical Gaming Keyboard', brand: 'SteelSeries', price: 189, desc: 'Tenkeyless mechanical keyboard with OmniPoint 2.0 adjustable switches and OLED smart display.' },
    { title: 'Logitech G Pro X 2 LIGHTSPEED Gaming Headset', brand: 'Logitech', price: 249, desc: 'Pro-grade wireless gaming headset with 50mm graphene drivers and DTS Headphone:X 2.0 surround.' },
    { title: 'ASUS ROG Swift OLED PG27AQDM 27" Gaming Monitor', brand: 'ASUS', price: 899, desc: '27-inch QHD OLED 240Hz gaming monitor with 0.03ms response time and custom heatsink.' },
    { title: 'PlayStation 5 Slim Console Digital Edition', brand: 'PlayStation', price: 449, desc: 'Next-gen gaming console with custom SSD, Ray Tracing, 4K 120Hz output, and DualSense haptic controller.' },
    { title: 'Xbox Series X 1TB Console', brand: 'Xbox', price: 499, desc: '12 TFLOPS GPU, 4K gaming at up to 120 FPS, Quick Resume, and Xbox Velocity Architecture SSD.' },
    { title: 'Nintendo Switch OLED Model White Set', brand: 'Nintendo', price: 349, desc: '7-inch OLED screen, wide adjustable stand, 64GB internal storage, and enhanced audio speakers.' },
    { title: 'Razer BlackWidow V4 Pro RGB Gaming Keyboard', brand: 'Razer', price: 229, desc: 'Full-size gaming keyboard with Razer Green mechanical switches, Command Dial, and Chroma RGB.' },
    { title: 'SteelSeries Arctis Nova Pro Wireless Gaming Headset', brand: 'SteelSeries', price: 349, desc: 'Premium wireless gaming headset with Active Noise Cancellation, hot-swap batteries, and Hi-Res audio.' },
    { title: 'Corsair K70 MAX RGB Magnetic Gaming Keyboard', brand: 'Corsair', price: 229, desc: 'Magnetic Hall Effect analog switches with adjustable actuation, per-key RGB lighting, and PBT keycaps.' },
    { title: 'Logitech G502 X PLUS LIGHTSPEED Wireless Mouse', brand: 'Logitech', price: 159, desc: 'HERO 25K sensor, LIGHTFORCE hybrid switches, and LIGHTSYNC RGB wireless gaming mouse.' },
    { title: 'HyperX Cloud III Wireless Gaming Headset', brand: 'HyperX', price: 149, desc: 'Angled 53mm drivers, DTS Headphone:X spatial audio, and 120-hour battery life gaming headset.' },
    { title: 'BenQ ZOWIE XL2546K 240Hz Esports Monitor', brand: 'BenQ', price: 499, desc: '24.5-inch 240Hz TN panel esports monitor with DyAc+ dynamic accuracy technology.' },
    { title: 'PlayStation DualSense Edge Wireless Controller', brand: 'PlayStation', price: 199, desc: 'Customizable PS5 pro controller with remappable buttons, swappable stick caps, and adjustable triggers.' },
    { title: 'Xbox Elite Wireless Controller Series 2', brand: 'Xbox', price: 179, desc: 'Premium controller with adjustable-tension thumbsticks, rubberized grip, and hair trigger locks.' },
    { title: 'Secretlab TITAN Evo Ergonomic Gaming Chair', brand: 'Secretlab', price: 519, desc: 'Premium gaming chair with 4-way L-ADAPT lumbar support, CloudSwap armrests, and cold-cure foam.' },
    { title: 'Elgato Stream Deck MK.2 Studio Controller', brand: 'Elgato', price: 149, desc: '15 customizable LCD keys for live streaming, content creation, and productivity workflows.' },
    { title: 'NVIDIA GeForce RTX 4070 Super Founders Edition', brand: 'NVIDIA', price: 599, desc: '12GB GDDR6X, Ada Lovelace architecture, DLSS 3.5 Frame Generation, and Ray Tracing GPU.' },
    { title: 'Razer Viper V3 Pro Wireless Esports Mouse', brand: 'Razer', price: 159, desc: '54g ultra-lightweight esports mouse with Focus Pro 35K sensor and gen-3 optical switches.' },
    { title: 'Samsung Odyssey OLED G8 34" Gaming Monitor', brand: 'Samsung', price: 1299, desc: '34-inch WQHD OLED 175Hz ultra-wide curved gaming monitor with 0.1ms response time.' },
    { title: 'Valve Steam Deck OLED 1TB Handheld Console', brand: 'Valve', price: 649, desc: '7.4-inch HDR OLED display, 6nm AMD APU, 1TB NVMe SSD portable PC gaming handheld.' },
    { title: 'ASUS ROG Ally Z1 Extreme Handheld Console', brand: 'ASUS', price: 699, desc: 'Windows 11 handheld with AMD Ryzen Z1 Extreme, 120Hz FHD screen, and 512GB SSD.' },
    { title: 'Corsair Virtuoso RGB Wireless XT Gaming Headset', brand: 'Corsair', price: 269, desc: 'Hi-Res audio certified wireless headset with Dolby Atmos, 50mm neodymium drivers, and Bluetooth.' }
  ],
  'Photography': [
    { title: 'Canon EOS R6 Mark II Mirrorless Camera Body', brand: 'Canon', price: 2499, desc: '24.2MP full-frame CMOS sensor, 4K 60p video, 40fps burst shooting, and Dual Pixel CMOS AF II.' },
    { title: 'Nikon Z8 Full Frame Mirrorless Camera Body', brand: 'Nikon', price: 3999, desc: '45.7MP stacked CMOS sensor, 8K 30p video, 120fps shooting, and EXPEED 7 processor.' },
    { title: 'Sony A7 IV Full Frame Mirrorless Camera', brand: 'Sony', price: 2498, desc: '33MP Exmor R BSI sensor, 4K 60p, real-time Eye AF, and 759-point phase-detection AF.' },
    { title: 'Fujifilm X100VI Compact Digital Camera', brand: 'Fujifilm', price: 1599, desc: '40.2MP X-Trans CMOS 5 HR sensor, fixed 23mm f/2 lens, 6.2K video, and film simulation modes.' },
    { title: 'Sony FE 24-70mm f/2.8 GM II Lens', brand: 'Sony', price: 2299, desc: 'Premium G Master zoom lens with XD Linear motors, nano AR II coating, and weather-sealed design.' },
    { title: 'Canon RF 50mm f/1.2L USM Prime Lens', brand: 'Canon', price: 2299, desc: 'Ultra-fast f/1.2 prime lens with 3 aspherical elements, Air Sphere Coating, and USM focusing.' },
    { title: 'Peak Design Travel Tripod Carbon Fiber', brand: 'Peak Design', price: 649, desc: 'Ultra-compact carbon fiber tripod that packs to 15.4", holds 20lbs, and weighs 2.81lbs.' },
    { title: 'Manfrotto Befree Advanced Carbon Travel Tripod', brand: 'Manfrotto', price: 349, desc: 'Carbon fiber travel tripod with ball head, 4-section twist locks, and 8kg payload capacity.' },
    { title: 'Peak Design Everyday Backpack V2 20L', brand: 'Peak Design', price: 279, desc: 'Versatile camera backpack with FlexFold dividers, dual side access, and weatherproof 400D nylon.' },
    { title: 'GoPro HERO12 Black Action Camera', brand: 'GoPro', price: 399, desc: '5.3K 60fps video, HDR photo and video, HyperSmooth 6.0, and improved thermal performance.' },
    { title: 'DJI RS 3 Pro Gimbal Stabilizer Combo', brand: 'DJI', price: 1099, desc: '3-axis camera gimbal with LiDAR focusing, automated axis locks, and 4.5kg payload capacity.' },
    { title: 'SanDisk Extreme Pro 256GB SDXC UHS-II Card', brand: 'SanDisk', price: 89, desc: 'V90 UHS-II SD card with 300MB/s read speed for 8K, 4K, and Full HD video capture.' },
    { title: 'Profoto A2 AirTTL Studio Flash', brand: 'Profoto', price: 1095, desc: 'On/off-camera TTL flash with AirX connectivity, 76Ws power, and 1.2-second recycle time.' },
    { title: 'Rode VideoMic NTG Shotgun Microphone', brand: 'Rode', price: 249, desc: 'Broadcast-quality shotgun microphone with auto power, safety channel, and USB-C audio output.' },
    { title: 'Sigma 35mm f/1.4 DG DN Art Lens Sony E', brand: 'Sigma', price: 899, desc: 'Premium wide-angle prime lens with 13 elements, HLA motor, and dust/splash-resistant mount.' },
    { title: 'Nikon Z 50mm f/1.2 S Prime Lens', brand: 'Nikon', price: 2099, desc: 'Ultra-fast f/1.2 S-Line prime lens with 17 elements, Nano Crystal Coat, and STM motor.' },
    { title: 'Canon EOS R5 Mirrorless Camera Body', brand: 'Canon', price: 3899, desc: '45MP full-frame sensor, 8K 30p RAW video, 20fps electronic shutter, and Dual Pixel CMOS AF II.' },
    { title: 'Gitzo Systematic Series 3 Carbon Tripod', brand: 'Gitzo', price: 1150, desc: 'Professional carbon fiber tripod with G-lock Ultra twist locks, 25kg payload, and modular center.' },
    { title: 'Leica M11 Rangefinder Digital Camera Body', brand: 'Leica', price: 8995, desc: '60MP BSI CMOS full-frame sensor, triple resolution technology, ISO 64-50000, and brass top plate.' },
    { title: 'Hasselblad X2D 100C Medium Format Camera', brand: 'Hasselblad', price: 8199, desc: '100MP medium format CMOS sensor, PDAF, 1TB internal storage, and OLED EVF.' },
    { title: 'Billingham Hadley Pro Camera Bag Canvas', brand: 'Billingham', price: 349, desc: 'Handcrafted canvas camera bag with waterproof FibreNyte fabric, brass fittings, and padded inserts.' },
    { title: 'Sony A7C II Full Frame Compact Camera', brand: 'Sony', price: 2198, desc: '33MP full-frame sensor in compact body, 4K 60p, AI-based AF recognition, and 5-axis IBIS.' },
    { title: 'Tamron 28-75mm f/2.8 Di III VXD G2 Sony', brand: 'Tamron', price: 899, desc: 'Fast standard zoom with VXD linear motor, moisture-resistant design, and 0.18m minimum focus.' },
    { title: 'DJI Mini 4 Pro Fly More Combo Drone', brand: 'DJI', price: 1099, desc: 'Sub-249g drone with 4K 100fps video, omnidirectional obstacle sensing, and 34-min flight time.' }
  ],
  'Music': [
    { title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', brand: 'Sony', price: 398, desc: 'Industry-leading ANC with two processors, 8 microphones, 30-hour battery, and LDAC Hi-Res audio.' },
    { title: 'Bose QuietComfort Ultra Wireless Headphones', brand: 'Bose', price: 429, desc: 'Immersive spatial audio, world-class noise cancellation, and CustomTune sound calibration.' },
    { title: 'Sennheiser Momentum 4 Wireless Headphones', brand: 'Sennheiser', price: 349, desc: '60-hour battery, audiophile-grade 42mm transducers, and adaptive noise cancellation.' },
    { title: 'Marshall Stanmore III Bluetooth Speaker', brand: 'Marshall', price: 379, desc: 'Iconic rock-inspired design with Placement Compensation, wider stereo, and dynamic loudness.' },
    { title: 'JBL Flip 6 Portable Waterproof Speaker', brand: 'JBL', price: 129, desc: 'IP67 waterproof and dustproof, JBL Pro Sound with tweeter, and 12-hour battery life.' },
    { title: 'Bose SoundLink Flex Portable Speaker', brand: 'Bose', price: 149, desc: 'IP67 waterproof, PositionIQ technology, 12-hour battery, and deep bass for its size.' },
    { title: 'Apple AirPods Pro 2nd Generation USB-C', brand: 'Apple', price: 249, desc: 'Active Noise Cancellation with H2 chip, Adaptive Transparency, and Conversation Awareness.' },
    { title: 'Sony WF-1000XM5 True Wireless Earbuds', brand: 'Sony', price: 299, desc: 'World smallest ANC earbuds with LDAC, Integrated Processor V2, and 24-hour total battery.' },
    { title: 'Yamaha HS8 Powered Studio Monitor Speaker', brand: 'Yamaha', price: 399, desc: '8-inch woofer studio monitor with bi-amp design, 120W total, and room control switch.' },
    { title: 'Audio-Technica AT-LP120XUSB Direct-Drive Turntable', brand: 'Audio-Technica', price: 349, desc: 'Professional direct-drive turntable with AT-VM95E cartridge, USB output, and anti-resonance chassis.' },
    { title: 'Focusrite Scarlett 2i2 4th Gen Audio Interface', brand: 'Focusrite', price: 179, desc: 'USB-C audio interface with 2 mic preamps, Air mode, auto gain, and 192kHz/24-bit conversion.' },
    { title: 'Shure SM7B Vocal Dynamic Microphone', brand: 'Shure', price: 399, desc: 'Professional dynamic studio microphone with bass rolloff and mid-range emphasis controls.' },
    { title: 'JBL Charge 5 Portable Bluetooth Speaker', brand: 'JBL', price: 179, desc: 'IP67 waterproof, 20-hour battery, dual passive bass radiators, and built-in power bank.' },
    { title: 'Samsung Galaxy Buds3 Pro Wireless Earbuds', brand: 'Samsung', price: 249, desc: '2-way speaker, Adaptive ANC, 360 Audio, and Galaxy AI interpreter mode.' },
    { title: 'Sonos Era 100 Smart Speaker', brand: 'Sonos', price: 249, desc: 'Dual tweeter stereo sound, Trueplay tuning, Bluetooth and Wi-Fi, and AirPlay 2 support.' },
    { title: 'KEF LS50 Wireless II Active Speakers', brand: 'KEF', price: 2799, desc: 'Uni-Q driver array, W2 wireless platform, HDMI eARC, and streaming from Tidal/Spotify.' },
    { title: 'Bang & Olufsen Beoplay H95 Headphones', brand: 'Bang & Olufsen', price: 899, desc: 'Premium titanium headphones with Adaptive ANC, 40mm drivers, and 38-hour battery.' },
    { title: 'Beyerdynamic DT 1990 Pro Open Studio Headphones', brand: 'Beyerdynamic', price: 599, desc: '250 Ohm open-back headphones with Tesla neodymium drivers and velour ear pads.' },
    { title: 'Universal Audio Volt 276 Studio Interface', brand: 'Universal Audio', price: 299, desc: '2-in/2-out USB audio interface with built-in 76 compressor, vintage mic preamp, and 24-bit/192kHz.' },
    { title: 'Technics SL-1200MK7 Direct Drive Turntable', brand: 'Technics', price: 1099, desc: 'Legendary DJ turntable with coreless direct drive motor, S-shaped tonearm, and 78 RPM support.' },
    { title: 'Rode NT1 5th Generation Studio Condenser Mic', brand: 'Rode', price: 269, desc: '32-bit float digital output, ultra-low noise floor, gold-sputtered capsule, and USB/XLR connectivity.' },
    { title: 'Denon PMA-600NE Integrated Stereo Amplifier', brand: 'Denon', price: 499, desc: '70W per channel amplifier with Advanced High Current power, Bluetooth, and digital optical/coax inputs.' },
    { title: 'JBL PartyBox Encore Essential Speaker', brand: 'JBL', price: 279, desc: '100W output portable party speaker with light show, microphone input, and splash-proof design.' },
    { title: 'Sennheiser HD 660S2 Open-Back Headphones', brand: 'Sennheiser', price: 499, desc: 'Audiophile open-back headphones with 300 Ohm transducers and 2-year warranty.' }
  ],
  'Smart Home': [
    { title: 'Google Nest Learning Thermostat 4th Gen', brand: 'Google', price: 279, desc: 'Smart thermostat with auto-schedule, energy savings, HVAC monitoring, and Matter compatibility.' },
    { title: 'Philips Hue Starter Kit 4-Bulb E26 Color', brand: 'Philips', price: 199, desc: 'Smart LED color bulbs with Hue Bridge, 16 million colors, and voice control via Alexa/Google.' },
    { title: 'Amazon Echo Show 10 3rd Gen Smart Display', brand: 'Amazon', price: 249, desc: '10.1-inch HD display that auto-rotates to face you, Alexa, 13MP camera, and Zigbee hub.' },
    { title: 'Ring Video Doorbell Pro 2 Hardwired', brand: 'Ring', price: 249, desc: '1536p HD video doorbell with 3D Motion Detection, Bird\'s Eye View, and advanced night vision.' },
    { title: 'Apple HomePod 2nd Generation', brand: 'Apple', price: 299, desc: 'High-fidelity smart speaker with S7 chip, spatial audio, room sensing, and Matter support.' },
    { title: 'Nanoleaf Shapes Hexagons Starter Kit 9-Pack', brand: 'Nanoleaf', price: 249, desc: 'Modular smart light panels with 16M+ colors, music sync, and Thread border router.' },
    { title: 'Aqara Smart Lock U200 Fingerprint', brand: 'Aqara', price: 229, desc: 'Wi-Fi smart lock with fingerprint, Apple Home Key, passcode, NFC, and auto-lock features.' },
    { title: 'Ecobee SmartThermostat Premium', brand: 'Ecobee', price: 249, desc: 'Smart thermostat with Siri/Alexa built-in, air quality monitor, and SmartSensor compatibility.' },
    { title: 'Eufy Security Video Doorbell S330 2K', brand: 'Eufy', price: 179, desc: '2K resolution doorbell with dual cameras, 180° field of view, and local storage homebase.' },
    { title: 'Sonos One SL Wireless Smart Speaker', brand: 'Sonos', price: 199, desc: 'Compact smart speaker with Trueplay tuning, AirPlay 2, and multi-room audio support.' },
    { title: 'Philips Hue Play HDMI Sync Box', brand: 'Philips', price: 249, desc: 'Sync Hue lights to movies, games, and music from up to 4 HDMI sources in real-time.' },
    { title: 'iRobot Roomba j7+ Self-Emptying Robot Vacuum', brand: 'iRobot', price: 799, desc: 'PrecisionVision navigation, avoids pet waste and cords, auto-empty Clean Base, and smart mapping.' },
    { title: 'Roborock S8 MaxV Ultra Robot Vacuum & Mop', brand: 'Roborock', price: 1599, desc: '10,000Pa suction, dual spinning mop, hot water washing, self-emptying, and LiDAR navigation.' },
    { title: 'August Wi-Fi Smart Lock 4th Gen', brand: 'August', price: 229, desc: 'Retrofit smart deadbolt with auto-lock/unlock, remote access, and voice control compatibility.' },
    { title: 'Arlo Pro 5S 2K Spotlight Security Camera', brand: 'Arlo', price: 249, desc: 'Wire-free 2K HDR camera with color night vision, 160° view, integrated spotlight, and 2-way audio.' },
    { title: 'Amazon Echo Dot 5th Gen with Clock', brand: 'Amazon', price: 59, desc: 'Compact smart speaker with LED clock display, improved bass, Alexa, and eero mesh Wi-Fi.' },
    { title: 'Google Nest Hub Max 10" Smart Display', brand: 'Google', price: 229, desc: '10-inch smart display with 6.5MP Nest Cam, stereo speakers, Google Photos, and gesture control.' },
    { title: 'Lutron Caseta Smart Dimmer Switch Kit', brand: 'Lutron', price: 99, desc: 'Wireless smart dimmer with Pico remote, Smart Bridge, and compatible with 600+ smart devices.' },
    { title: 'Yale Assure Lock 2 Touch Fingerprint', brand: 'Yale', price: 279, desc: 'Touchscreen deadbolt with fingerprint, DoorSense auto-lock, Wi-Fi module, and Apple Home Key.' },
    { title: 'TP-Link Kasa Smart Power Strip KP303', brand: 'TP-Link', price: 34, desc: '3 smart outlets with independent control, energy monitoring, scheduling, and voice control.' },
    { title: 'Dyson Pure Cool TP07 Smart Air Purifier', brand: 'Dyson', price: 549, desc: 'HEPA H13 filter, captures 99.97% particles, real-time air quality display, and app control.' },
    { title: 'SwitchBot Curtain 3 Smart Motor', brand: 'SwitchBot', price: 89, desc: 'Motorized curtain opener with solar panel, Matter support, and sunrise/sunset automation.' },
    { title: 'Netatmo Smart Indoor Weather Station', brand: 'Netatmo', price: 179, desc: 'Indoor/outdoor sensors for temperature, humidity, CO2, noise, and air pressure with app alerts.' },
    { title: 'Eve Energy Smart Plug with Thread', brand: 'Eve', price: 49, desc: 'HomeKit-compatible smart plug with energy monitoring, Thread mesh, and no bridge required.' }
  ],
  'Outdoor': [
    { title: 'Osprey Atmos AG 65L Hiking Backpack', brand: 'Osprey', price: 320, desc: 'Anti-Gravity suspension system, adjustable hip belt, Stow-on-the-Go trekking pole attachment.' },
    { title: 'YETI Tundra 45 Hard Cooler', brand: 'YETI', price: 325, desc: 'Rotomolded construction, 2+ inches PermaFrost insulation, Bear-resistant certified cooler.' },
    { title: 'Stanley Classic Legendary Thermos 1.4L', brand: 'Stanley', price: 45, desc: 'Vacuum insulated stainless steel bottle keeps drinks hot 40 hours or cold 35 hours.' },
    { title: 'Hydro Flask Wide Mouth 32oz Water Bottle', brand: 'Hydro Flask', price: 49, desc: 'TempShield double-wall vacuum insulation, BPA-free, and powder-coated color finish.' },
    { title: 'MSR PocketRocket 2 Ultralight Stove', brand: 'MSR', price: 54, desc: 'Award-winning ultralight backpacking stove weighing 2.6oz, boils 1L water in 3.5 minutes.' },
    { title: 'Helinox Chair Zero Ultralight Camp Chair', brand: 'Helinox', price: 149, desc: 'Ultra-compact 510g backpacking chair with DAC alloy frame supporting up to 120kg.' },
    { title: 'Leatherman Wave Plus Multi-Tool', brand: 'Leatherman', price: 119, desc: '18 tools including pliers, wire cutters, knives, saws, and screwdrivers in stainless steel.' },
    { title: 'Goal Zero Nomad 20 Solar Panel Charger', brand: 'Goal Zero', price: 149, desc: '20W foldable monocrystalline solar panel with USB output for phones and power stations.' },
    { title: 'Black Diamond Spot 400 Headlamp', brand: 'Black Diamond', price: 49, desc: '400 lumens, 8 lighting modes, waterproof IPX8 rated, and PowerTap dimming technology.' },
    { title: 'Patagonia Nano Puff Insulated Jacket', brand: 'Patagonia', price: 239, desc: '60g PrimaLoft Gold insulation, Fair Trade Certified, DWR finish, and 100% recycled polyester.' },
    { title: 'Big Agnes Copper Spur HV UL2 Tent', brand: 'Big Agnes', price: 549, desc: '2-person ultralight 3-season tent weighing 2lbs 11oz with 2 doors, 2 vestibules, and DAC poles.' },
    { title: 'Nemo Disco 15 Down Sleeping Bag', brand: 'Nemo', price: 349, desc: '15°F down sleeping bag with spoon shape, Thermo Gills ventilation, and waterproof footbox.' },
    { title: 'Therm-a-Rest NeoAir XTherm MAX Sleeping Pad', brand: 'Therm-a-Rest', price: 269, desc: 'R-value 7.3 ultralight insulated pad with Triangular Core Matrix and WingLock valve.' },
    { title: 'Salomon X Ultra 4 GTX Hiking Shoes', brand: 'Salomon', price: 165, desc: 'GORE-TEX waterproof hiking shoes with Advanced Chassis, Contagrip MA outsole, and OrthoLite sockliner.' },
    { title: 'Jetboil Flash Camping Stove System', brand: 'Jetboil', price: 129, desc: '1L cooking cup with insulating cozy, boils 500mL in 100 seconds, and push-button ignition.' },
    { title: 'Garmin inReach Mini 2 Satellite Communicator', brand: 'Garmin', price: 399, desc: 'GPS satellite messenger with 2-way texting, SOS, tracking, and weather forecasts via Iridium.' },
    { title: 'Arc\'teryx Beta LT GORE-TEX Jacket', brand: 'Arc\'teryx', price: 550, desc: 'Lightweight 3-layer GORE-TEX hardshell jacket with WaterTight zippers and StormHood.' },
    { title: 'BioLite CampStove 2+ Wood Burning Stove', brand: 'BioLite', price: 149, desc: 'Smokeless wood-burning camp stove that generates 3W USB electricity from fire.' },
    { title: 'Snow Peak Titanium Trek 900 Cookset', brand: 'Snow Peak', price: 58, desc: 'Ultralight titanium pot and lid set, 900mL capacity, weighing just 175g with foldable handle.' },
    { title: 'Katadyn BeFree 1.0L Water Filter', brand: 'Katadyn', price: 44, desc: 'Compact 0.1 micron hollow fiber filter, flow rate 2L/min, and collapsible soft flask.' },
    { title: 'Benchmade Bugout 535 Folding Knife', brand: 'Benchmade', price: 195, desc: 'S30V blade, AXIS lock mechanism, carbon fiber scales, and weighs only 1.85oz.' },
    { title: 'MSR Hubba Hubba NX 2-Person Tent', brand: 'MSR', price: 479, desc: 'Freestanding 3-season tent with Xtreme Shield waterproof coating and unified hub pole design.' },
    { title: 'Petzl Actik Core Rechargeable Headlamp', brand: 'Petzl', price: 79, desc: '600 lumens, CORE rechargeable battery, red lighting mode, and multi-beam for trail running.' },
    { title: 'YETI Rambler 36oz Bottle with Chug Cap', brand: 'YETI', price: 50, desc: 'Double-wall vacuum insulated stainless steel bottle with no-sweat design and Chug Cap.' }
  ],
  'Toys': [
    { title: 'LEGO Architecture Fallingwater 21005', brand: 'LEGO', price: 180, desc: 'Recreate Frank Lloyd Wright\'s Fallingwater masterpiece with 811 architectural LEGO pieces.' },
    { title: 'LEGO Creator Expert Bonsai Tree 10281', brand: 'LEGO', price: 49, desc: 'Botanical building set with interchangeable cherry blossom and green leaves, 878 pieces.' },
    { title: 'LEGO Star Wars Millennium Falcon 75257', brand: 'LEGO', price: 169, desc: '1353-piece starship with rotating turrets, lowering ramp, opening cockpit, and 7 minifigures.' },
    { title: 'LEGO Technic Lamborghini Sián FKP 37', brand: 'LEGO', price: 449, desc: '3696-piece 1:8 scale supercar with V12 engine, sequential gearbox, and adjustable rear wing.' },
    { title: 'LEGO Icons Orchid 10311 Plant Set', brand: 'LEGO', price: 49, desc: 'Botanical collection orchid with 608 pieces, blue fluted vase, and posable stems.' },
    { title: 'Hot Wheels Ultimate Garage Super Track', brand: 'Hot Wheels', price: 110, desc: 'Multi-level car garage playset with side-by-side race track, shark attack, and parking for 100+ cars.' },
    { title: 'Ravensburger GraviTrax PRO Starter Set', brand: 'Ravensburger', price: 79, desc: 'Interactive marble run STEM building system with over 150 components and vertical starters.' },
    { title: 'Magna-Tiles 100-Piece Clear Colors Set', brand: 'Magna-Tiles', price: 119, desc: 'Magnetic building tiles for creative STEM play, compatible with all Magna-Tiles sets.' },
    { title: 'LEGO City Space Station 60433', brand: 'LEGO', price: 79, desc: 'Space exploration set with modular space station, shuttle, astronaut minifigures, and robot.' },
    { title: 'Sphero BOLT App-Enabled Robotic Ball', brand: 'Sphero', price: 149, desc: 'Programmable robot ball with LED matrix, infrared sensors, compass, and light sensor for STEM coding.' },
    { title: 'DJI Tello EDU Mini Drone STEM Kit', brand: 'DJI', price: 129, desc: 'Programmable mini drone with 5MP camera, Scratch/Python/Swift coding support, and 13-minute flight.' },
    { title: 'Snap Circuits Extreme SC-750 Electronics Kit', brand: 'Snap Circuits', price: 89, desc: '750+ STEM projects with 80+ components including FM radio, voice recorder, and burglar alarm.' },
    { title: 'Osmo Genius Starter Kit for iPad', brand: 'Osmo', price: 99, desc: '5 interactive STEM games combining physical pieces with digital gameplay for kids 6-10.' },
    { title: 'LEGO Duplo Steam Train 10874', brand: 'LEGO', price: 59, desc: 'Push-and-go motorized train with lights, sounds, color-coded action bricks, and 59 pieces.' },
    { title: 'Makeblock mBot Neo Robot Coding Kit', brand: 'Makeblock', price: 129, desc: 'STEM robot kit with CyberPi mainboard, block/Python coding, and ultrasonic/line-following sensors.' },
    { title: 'UGears V-Express Wooden Mechanical Train', brand: 'UGears', price: 89, desc: '538-piece wooden 3D mechanical puzzle train powered by rubber band engine, no glue needed.' },
    { title: 'Wonder Workshop Dash Robot Coding Toy', brand: 'Wonder Workshop', price: 149, desc: 'Interactive coding robot for ages 6+ with Blockly, Swift, and Wonder app programming.' },
    { title: 'LEGO Architecture Guggenheim Museum 21035', brand: 'LEGO', price: 89, desc: 'Recreate Frank Lloyd Wright\'s iconic spiraling museum design with 744 architectural pieces.' },
    { title: 'Robotime 3D Wooden Globe Puzzle', brand: 'Robotime', price: 59, desc: '180-piece wooden mechanical globe model with hand-crank rotation and laser-cut plywood.' },
    { title: 'National Geographic Mega Fossil Dig Kit', brand: 'National Geographic', price: 35, desc: '15 real fossils to excavate including dinosaur bones, shark teeth, and amber specimens.' },
    { title: 'Cubetto Wooden Screenless Coding Robot', brand: 'Primo Toys', price: 225, desc: 'Montessori-approved tangible coding toy for ages 3+, no screens needed, 16 coding blocks.' },
    { title: 'LEGO Harry Potter Hogwarts Castle 71043', brand: 'LEGO', price: 469, desc: 'Micro-scale castle with 6020 pieces, 27 minifigures, and 5 boats, and all iconic details.' },
    { title: 'Gravitrax POWER Elevator Expansion Set', brand: 'Ravensburger', price: 59, desc: 'Electronic elevator add-on for GraviTrax marble run system with motorized vertical lift.' },
    { title: 'Kano Harry Potter Coding Wand Kit', brand: 'Kano', price: 79, desc: 'Build a wand and learn to code 70+ creative challenges with motion sensor and Bluetooth.' }
  ],
  'Crafts': [
    { title: 'Fiskars 8" Softgrip Titanium Scissors', brand: 'Fiskars', price: 14, desc: 'Titanium-coated stainless steel blades with Softgrip handles for fabric and paper cutting.' },
    { title: 'Tombow Dual Brush Pens 10-Color Set', brand: 'Tombow', price: 29, desc: 'Flexible brush tip and fine tip markers for calligraphy, lettering, and illustration.' },
    { title: 'Faber-Castell Polychromos 36 Colored Pencils', brand: 'Faber-Castell', price: 85, desc: 'Artist-grade oil-based colored pencils with high pigmentation and lightfast ratings.' },
    { title: 'Prismacolor Premier 48 Colored Pencils', brand: 'Prismacolor', price: 65, desc: 'Soft core colored pencils with thick wax-based leads for smooth laydown and blending.' },
    { title: 'Copic Sketch Markers 12-Piece Basic Set', brand: 'Copic', price: 79, desc: 'Refillable dual-tip alcohol markers with Super Brush and Medium Broad nibs.' },
    { title: 'Winsor & Newton Cotman Watercolor Field Set', brand: 'Winsor & Newton', price: 42, desc: '12 half-pan watercolor set with mixing palette, brush, and compact field box.' },
    { title: 'Rotring 600 Mechanical Pencil 0.5mm', brand: 'Rotring', price: 38, desc: 'Full-metal hexagonal body drafting pencil with fixed lead guidance sleeve.' },
    { title: 'Staedtler Pigment Liner Fineliner Set 6-Pack', brand: 'Staedtler', price: 19, desc: 'Pigment ink fineliner pens in graduated widths from 0.05mm to 0.8mm for technical drawing.' },
    { title: 'Sakura Pigma Micron Black Pens 8-Set', brand: 'Sakura', price: 16, desc: 'Archival-quality pigment ink pens for illustration, journaling, and manga in various point sizes.' },
    { title: 'Arches 100% Cotton Watercolor Pad 9x12"', brand: 'Arches', price: 36, desc: '300gsm cold-pressed 100% cotton watercolor paper, acid-free, 12 sheets per pad.' },
    { title: 'Posca Acrylic Paint Markers 8-Pack', brand: 'Posca', price: 32, desc: 'Water-based acrylic paint markers for canvas, wood, glass, fabric, and mixed media.' },
    { title: 'Daniel Smith Extra Fine Watercolors 6-Tube Set', brand: 'Daniel Smith', price: 58, desc: 'Professional-grade watercolor paints with high pigment load and excellent granulation.' },
    { title: 'Schmincke Horadam Half Pan Watercolors 12', brand: 'Schmincke', price: 115, desc: 'Artist-grade watercolors with finest pigments, honey-based binder, and metal travel tin.' },
    { title: 'Olfa Heavy-Duty Utility Cutter 18mm', brand: 'Olfa', price: 12, desc: 'Professional snap-off blade utility knife with auto-lock slider and anti-slip rubber grip.' },
    { title: 'Fiskars Self-Healing Cutting Mat A3', brand: 'Fiskars', price: 28, desc: '3-ply PVC self-healing cutting mat with printed grid lines for precise craft cutting.' },
    { title: 'Derwent Graphic Sketching Pencils 12-Set', brand: 'Derwent', price: 24, desc: 'Graduated graphite pencils from 9B to H for sketching, shading, and technical drawing.' },
    { title: 'Holbein Heavy Body Acrylic Paints 12 Set', brand: 'Holbein', price: 74, desc: 'Buttery heavy-body acrylic paints with maximum pigment concentration and slow drying time.' },
    { title: 'Hahnemühle Nostalgie Sketchbook A4', brand: 'Hahnemühle', price: 26, desc: '190gsm natural white sketch paper, acid-free, 40 sheets with linen-bound hardcover.' },
    { title: 'Caran d\'Ache Neocolor II 15 Watersoluble Pastels', brand: 'Caran d\'Ache', price: 39, desc: 'Water-soluble wax oil pastels with high pigment load for mixed-media art techniques.' },
    { title: 'Escoda Reserva Kolinsky Sable Brush Size 8', brand: 'Escoda', price: 48, desc: 'Professional Kolinsky sable watercolor brush with sharp point and excellent spring.' },
    { title: 'Cricut Joy Compact Smart Cutting Machine', brand: 'Cricut', price: 179, desc: 'Portable cutting machine for custom cards, labels, vinyl decals, and iron-on transfers.' },
    { title: 'Brother SE630 Sewing & Embroidery Machine', brand: 'Brother', price: 449, desc: '103 built-in stitches, 80 embroidery designs, 4x4 embroidery area, and color LCD touchscreen.' },
    { title: 'Silhouette Cameo 4 Vinyl Cutting Machine', brand: 'Silhouette', price: 299, desc: 'Desktop cutting machine for vinyl, cardstock, fabric, and more with Bluetooth and auto-blade.' },
    { title: 'Speedball Screen Printing Kit Starter', brand: 'Speedball', price: 49, desc: 'Complete screen printing starter kit with frame, squeegee, photo emulsion, and ink.' }
  ],
  'Books': [
    { title: 'Taschen Bauhaus Updated Edition Hardcover', brand: 'Taschen', price: 25, desc: 'Comprehensive overview of the Bauhaus movement covering architecture, design, and art 1919-1933.' },
    { title: 'Phaidon Atlas of 21st Century Architecture', brand: 'Phaidon', price: 79, desc: '1000 contemporary buildings worldwide organized by region with plans, photos, and analysis.' },
    { title: 'The Design of Everyday Things by Don Norman', brand: 'Basic Books', price: 18, desc: 'Classic design thinking book on usability, human-centered design, and cognitive psychology.' },
    { title: 'Thinking, Fast and Slow by Daniel Kahneman', brand: 'FSG', price: 17, desc: 'Nobel Prize winner\'s exploration of two systems of thinking and cognitive biases.' },
    { title: 'Atomic Habits by James Clear', brand: 'Avery', price: 16, desc: 'Proven framework for building good habits and breaking bad ones with compound improvement.' },
    { title: 'Sapiens: A Brief History of Humankind', brand: 'Harper', price: 18, desc: 'Yuval Noah Harari\'s sweeping narrative of 70,000 years of human history and civilization.' },
    { title: 'Dune by Frank Herbert Anniversary Edition', brand: 'Ace', price: 22, desc: 'The greatest science fiction novel of all time, set on the desert planet Arrakis.' },
    { title: 'Taschen 1000 Chairs Revised Edition', brand: 'Taschen', price: 30, desc: 'Comprehensive catalog of the most important chairs designed from 1807 to the present.' },
    { title: 'Steve Jobs by Walter Isaacson Hardcover', brand: 'Simon & Schuster', price: 24, desc: 'Definitive biography based on 40+ exclusive interviews with Steve Jobs and 100+ associates.' },
    { title: 'Clean Code by Robert C. Martin', brand: 'Prentice Hall', price: 40, desc: 'A handbook of agile software craftsmanship with principles, patterns, and practices.' },
    { title: 'The Pragmatic Programmer 20th Anniversary', brand: 'Addison-Wesley', price: 49, desc: 'Updated classic on software development craft covering new technologies and methodologies.' },
    { title: 'Designing Data-Intensive Applications', brand: 'O\'Reilly', price: 44, desc: 'Martin Kleppmann\'s guide to distributed systems, databases, and data processing architectures.' },
    { title: 'Rizzoli Tom Ford Hardcover Fashion Monograph', brand: 'Rizzoli', price: 135, desc: 'Over 300 images chronicling Tom Ford\'s career in fashion design and filmmaking.' },
    { title: 'Gestalten The Monocle Book of Japan', brand: 'Gestalten', price: 65, desc: 'Monocle magazine\'s comprehensive guide to Japanese culture, design, food, and travel.' },
    { title: 'Eloquent JavaScript 4th Edition', brand: 'No Starch Press', price: 39, desc: 'Modern introduction to programming with JavaScript, covering ES2023 and Node.js.' },
    { title: 'The Art of Looking Sideways by Alan Fletcher', brand: 'Phaidon', price: 49, desc: 'Visual encyclopedia of creative thinking with typography, imagery, and lateral puzzles.' },
    { title: 'System Design Interview Vol 1 by Alex Xu', brand: 'ByteByteGo', price: 45, desc: 'Step-by-step guide for system design interview preparation with real-world case studies.' },
    { title: 'Refactoring by Martin Fowler 2nd Edition', brand: 'Addison-Wesley', price: 47, desc: 'Definitive guide to improving the design of existing code with JavaScript examples.' },
    { title: 'Taschen Frank Lloyd Wright Complete Works', brand: 'Taschen', price: 200, desc: 'Monumental 3-volume overview of Frank Lloyd Wright\'s 500+ built works 1885-1959.' },
    { title: 'Don\'t Make Me Think by Steve Krug', brand: 'New Riders', price: 28, desc: 'Common sense approach to web and mobile usability with practical design guidelines.' },
    { title: 'Creativity, Inc. by Ed Catmull', brand: 'Random House', price: 17, desc: 'Pixar co-founder\'s insights on building a creative culture and overcoming obstacles.' },
    { title: 'The Mom Test by Rob Fitzpatrick', brand: 'CreateSpace', price: 15, desc: 'How to talk to customers and learn if your business idea is good when everyone is lying to you.' },
    { title: 'Zero to One by Peter Thiel', brand: 'Crown', price: 18, desc: 'Notes on startups and how to build the future from PayPal co-founder Peter Thiel.' },
    { title: 'Show Your Work by Austin Kleon', brand: 'Workman', price: 13, desc: '10 ways to share your creativity and get discovered in the digital age.' }
  ],
  'Pets': [
    { title: 'Furbo 360° Dog Camera Treat Tosser', brand: 'Furbo', price: 209, desc: '360° rotating camera with treat tossing, 2-way audio, barking alerts, and night vision.' },
    { title: 'Litter-Robot 4 Automatic Self-Cleaning', brand: 'Litter-Robot', price: 699, desc: 'WiFi-enabled automatic self-cleaning litter box with OmniSense weight detection and app control.' },
    { title: 'KONG Classic Dog Toy Large Red', brand: 'KONG', price: 16, desc: 'Ultra-durable natural rubber toy for aggressive chewers, stuffable with treats and kibble.' },
    { title: 'Ruffwear Front Range All-Day Dog Harness', brand: 'Ruffwear', price: 49, desc: 'Padded everyday harness with 2 leash attachment points, 4 adjustment points, and ID pocket.' },
    { title: 'Royal Canin Size Health Nutrition Medium 30lb', brand: 'Royal Canin', price: 75, desc: 'Breed-size specific dry dog food for medium dogs 23-55 lbs with balanced nutrition.' },
    { title: 'Petkit Eversweet 3 Pro Smart Water Fountain', brand: 'Petkit', price: 59, desc: 'Smart pet water fountain with stainless steel tray, triple filtration, and app-controlled.' },
    { title: 'Orijen Original Grain-Free Dry Dog Food 25lb', brand: 'Orijen', price: 89, desc: 'Biologically appropriate dog food with 85% quality animal ingredients and WholePrey ratios.' },
    { title: 'Fi Smart Dog Collar Series 3 GPS Tracker', brand: 'Fi', price: 149, desc: 'GPS dog collar with LTE-M, 3-month battery life, live tracking, and escape alerts.' },
    { title: 'Wild One Harness Walk Kit Spruce', brand: 'Wild One', price: 88, desc: 'Modern dog walking set with comfort harness, poop bag carrier, leash, and treat pouch.' },
    { title: 'PetSafe ScoopFree Self-Cleaning Litter Box', brand: 'PetSafe', price: 169, desc: 'Automatic rake system with disposable crystal trays, health counter, and privacy hood.' },
    { title: 'Outward Hound Fun Feeder Slow Bowl', brand: 'Outward Hound', price: 15, desc: 'Slow feeder dog bowl that extends meal time 10x to prevent bloat and improve digestion.' },
    { title: 'Whisker City 5-Tier Cat Tree Tower', brand: 'Whisker City', price: 165, desc: '5-level cat tree with sisal scratching posts, plush perches, cave hideaway, and dangling toys.' },
    { title: 'Earth Rated Dog Poop Bags 270 Count', brand: 'Earth Rated', price: 12, desc: 'Extra-thick leak-proof lavender-scented dog waste bags on easy-tear 15-bag rolls.' },
    { title: 'Sherpa Original Deluxe Airline Pet Carrier', brand: 'Sherpa', price: 58, desc: 'Airline-approved pet carrier with spring wire frame, mesh ventilation, and machine-washable liner.' },
    { title: 'Blue Buffalo Life Protection Chicken 30lb', brand: 'Blue Buffalo', price: 59, desc: 'Natural dog food with real deboned chicken, whole grains, and LifeSource Bits antioxidants.' },
    { title: 'Zee.Dog Neopro Adjustable Dog Collar', brand: 'Zee.Dog', price: 24, desc: 'Waterproof neoprene-padded collar with quick-release aluminum buckle and D-ring leash attach.' },
    { title: 'Snoozer Luxury Cozy Cave Pet Bed', brand: 'Snoozer', price: 119, desc: 'Hooded pet bed with micro-suede and sherpa interior for burrowing dogs and cats.' },
    { title: 'Kurgo Tru-Fit Enhanced Smart Dog Harness', brand: 'Kurgo', price: 39, desc: 'Crash-tested car safety harness with 5 adjustment points and steel nesting buckles.' },
    { title: 'West Paw Zogoflex Toppl Tough Treat Toy', brand: 'West Paw', price: 22, desc: 'Durable, bouncy, floatable treat-dispensing toy made from FDA-compliant Zogoflex material.' },
    { title: 'Purina Pro Plan Adult Sensitive Skin 30lb', brand: 'Purina', price: 62, desc: 'Salmon and rice formula for adult dogs with sensitive skin and stomachs, fortified with oat meal.' },
    { title: 'Catit Pixi Smart Automatic Dry Food Feeder', brand: 'Catit', price: 79, desc: 'App-controlled 12-meal automatic feeder with stainless steel dish and freshness seal.' },
    { title: 'Chuckit Ultra Ball Launcher 26-inch', brand: 'Chuckit', price: 14, desc: 'Extended-reach ball launcher that triples throwing distance for fetch play.' },
    { title: 'PetSafe Drinkwell Platinum Water Fountain', brand: 'PetSafe', price: 39, desc: '168oz capacity pet water fountain with free-falling stream, carbon filter, and adjustable flow.' },
    { title: 'Barkbox Monthly Subscription Box Starter', brand: 'BarkBox', price: 35, desc: 'Themed monthly dog subscription box with 2 toys, 2 treats, and 1 chew, tailored to size.' }
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
  if (
    lower.includes('placeimg.com') ||
    lower.includes('via.placeholder') ||
    lower.includes('placeholder.com') ||
    lower.includes('dummyimage') ||
    lower.includes('placebear') ||
    /\/\d{3,4}\/\d{3,4}/.test(lower) // catches 600/400, 640/480 etc
  ) {
    return null;
  }

  return cleaned;
};

async function fetchWithRetry(url, options = {}, maxRetries = 1) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return await res.json();
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
    } catch (e) {}
    return null;
  }

  setCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
    } catch (e) {}
  }

  async fetchProductsFromAPIs() {
    const results = await Promise.allSettled([
      fetchWithRetry('https://dummyjson.com/products?limit=200', {}, 1),
      fetchWithRetry('https://fakestoreapi.com/products', {}, 1),
      fetchWithRetry('https://api.escuelajs.co/api/v1/products', {}, 1)
    ]);

    const mergedRaw = [];
    results.forEach((res) => {
      if (res.status === 'fulfilled' && res.value) {
        if (res.value.products) mergedRaw.push(...res.value.products);
        else if (Array.isArray(res.value)) mergedRaw.push(...res.value);
      }
    });

    return this.normalizeProducts(mergedRaw);
  }

  // STRICT category resolution: only use API's own category, never keyword-guess
  resolveCategory(item) {
    const catRaw = typeof item.category === 'object' ? (item.category?.name || '') : String(item.category || '');
    const catLower = catRaw.toLowerCase().trim();
    if (strictApiCategoryMap.hasOwnProperty(catLower)) {
      return strictApiCategoryMap[catLower]; // may be null for 'miscellaneous'
    }
    // For unknown API categories, try basic match
    if (catLower.includes('electron') || catLower.includes('phone') || catLower.includes('laptop') || catLower.includes('computer')) return 'Electronics';
    if (catLower.includes('cloth') || catLower.includes('shirt') || catLower.includes('shoe') || catLower.includes('fashion')) return 'Fashion';
    if (catLower.includes('furnitur')) return 'Furniture';
    if (catLower.includes('grocer') || catLower.includes('food')) return 'Food & Beverage';
    if (catLower.includes('beauty') || catLower.includes('fragranc') || catLower.includes('skin')) return 'Health & Beauty';
    if (catLower.includes('kitchen')) return 'Kitchen';
    if (catLower.includes('sport')) return 'Sports';
    if (catLower.includes('watch') || catLower.includes('jewel') || catLower.includes('sunglass') || catLower.includes('bag')) return 'Accessories';
    if (catLower.includes('vehicle') || catLower.includes('auto') || catLower.includes('motor')) return 'Automotive';
    if (catLower.includes('home') || catLower.includes('decor')) return 'Home Decoration';
    return null; // don't force — skip it
  }

  normalizeProducts(rawList) {
    const seenTitles = new Set();
    const categoryGroups = {};
    targetCategories.forEach(c => categoryGroups[c] = []);

    // Phase 1: Place API products STRICTLY into their correct categories
    for (const item of rawList) {
      if (!item || !item.title || typeof item.price !== 'number' || item.price <= 0) continue;

      const title = String(item.title).trim();
      const titleKey = title.toLowerCase();
      if (seenTitles.has(titleKey)) continue;

      let rawImages = Array.isArray(item.images) ? item.images : item.image ? [item.image] : [item.thumbnail];
      let validImages = rawImages.map(img => cleanImageURL(img)).filter(Boolean);
      if (validImages.length === 0) continue;

      seenTitles.add(titleKey);

      const category = this.resolveCategory(item);
      if (!category) continue; // skip items we can't confidently categorize

      categoryGroups[category].push({
        item,
        title,
        validImages
      });
    }

    // Phase 2: Build final 480 products (24 per category)
    const finalProducts = [];
    let idCount = 1;

    targetCategories.forEach((catName) => {
      const apiGroup = categoryGroups[catName] || [];
      const fallbackList = categoryFallbackProducts[catName] || [];
      const pool = categoryCdnImages[catName] || categoryCdnImages['Electronics'];

      for (let i = 0; i < 24; i++) {
        const apiProd = apiGroup[i]; // may be undefined if not enough API products

        let title, brand, basePrice, description, validImages;

        if (apiProd) {
          // Use real API product
          title = apiProd.title;
          brand = apiProd.item.brand || 'Official Brand';
          basePrice = Number(apiProd.item.price.toFixed(2));
          description = apiProd.item.description || `${title} - Premium product.`;
          validImages = apiProd.validImages;
        } else {
          // Use category-specific fallback (NOT random products from other categories)
          const fallbackIdx = i - apiGroup.length;
          const fb = fallbackList[fallbackIdx % fallbackList.length];
          if (fb) {
            title = fb.title;
            brand = fb.brand;
            basePrice = fb.price;
            description = fb.desc;
          } else {
            title = `${catName} Premium Item ${i + 1}`;
            brand = 'Official Brand';
            basePrice = 99 + (i * 23) % 300;
            description = `${title} - High quality ${catName.toLowerCase()} product.`;
          }
          validImages = [
            pool[i % pool.length],
            pool[(i + 1) % pool.length],
            pool[(i + 2) % pool.length]
          ];
        }

        while (validImages.length < 3) {
          validImages.push(pool[(validImages.length + i) % pool.length]);
        }

        const oldPrice = Number((basePrice * 1.15).toFixed(2));
        const discountPercentage = Math.round(((oldPrice - basePrice) / oldPrice) * 100);
        const rating = Number((apiProd && (apiProd.item.rating?.rate || apiProd.item.rating) ? (apiProd.item.rating?.rate || apiProd.item.rating) : (4.2 + (idCount % 8) * 0.1)).toFixed(1));
        const reviewCount = (apiProd && apiProd.item.rating?.count) ? apiProd.item.rating.count : (25 + (idCount * 17) % 350);
        const soldCount = 100 + (idCount * 29) % 1800;
        const stock = (apiProd && apiProd.item.stock) ? apiProd.item.stock : (8 + (idCount * 3) % 40);
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
          specifications: { 'Category': catName, 'Brand': brand, 'Condition': 'New', 'Warranty': 'Official Brand Warranty' },
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
      if (this.memoryCache && this.memoryCache.length > 0) return this.memoryCache;
      const cached = this.getCache();
      if (cached && cached.length > 0) { this.memoryCache = cached; return cached; }
    }
    const fresh = await this.fetchProductsFromAPIs();
    if (fresh && fresh.length > 0) { this.memoryCache = fresh; this.setCache(fresh); return fresh; }
    const fallback = this.getCache();
    if (fallback) { this.memoryCache = fallback; return fallback; }
    return [];
  }

  getInitialProducts() {
    if (this.memoryCache) return this.memoryCache;
    const cached = this.getCache();
    if (cached) { this.memoryCache = cached; return cached; }
    return [];
  }
}

export const ProductService = new ProductServiceClass();
