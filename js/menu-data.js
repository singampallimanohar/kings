/**
 * Kings Biryani's and Family Restaurant - Menu Data
 * =================================================
 * Expanded Food Menu with 10 authentic categories:
 * 1. Biryani
 * 2. Starters
 * 3. Soups
 * 4. Drinks & Beverages
 * 5. Veg Main Course
 * 6. Non-Veg Main Course
 * 7. Rice & Noodles
 * 8. Breads
 * 9. Desserts
 * 10. Combos & Family Packs
 *
 * All items include authentic descriptions, veg/non-veg indicator,
 * portion sizing, spicy level, serving guide, and placeholder prices.
 */

// 10 Menu Categories as required
const MENU_CATEGORIES = [
  { id: "biryani", name: "Biryani", icon: "fire-burner", count: 13 },
  { id: "starters", name: "Starters", icon: "fire", count: 11 },
  { id: "soups", name: "Soups", icon: "mug-hot", count: 5 },
  { id: "drinks-beverages", name: "Drinks & Beverages", icon: "glass-water", count: 6 },
  { id: "veg-main-course", name: "Veg Main Course", icon: "seedling", count: 5 },
  { id: "non-veg-main-course", name: "Non-Veg Main Course", icon: "drumstick-bite", count: 5 },
  { id: "rice-noodles", name: "Rice & Noodles", icon: "bowl-rice", count: 7 },
  { id: "breads", name: "Breads", icon: "bread-slice", count: 5 },
  { id: "desserts", name: "Desserts", icon: "ice-cream", count: 4 },
  { id: "combos-family-packs", name: "Combos & Family Packs", icon: "users", count: 5 }
];

// Sections for backwards-compatibility
const MENU_SECTIONS = [
  {
    id: "all",
    name: "All Dishes",
    icon: "utensils",
    categories: MENU_CATEGORIES
  },
  {
    id: "pure-veg",
    name: "Pure Veg",
    icon: "leaf",
    isVeg: true,
    categories: MENU_CATEGORIES.filter(c => c.id !== "non-veg-main-course")
  },
  {
    id: "non-veg",
    name: "Non-Veg",
    icon: "drumstick-bite",
    isVeg: false,
    categories: MENU_CATEGORIES.filter(c => c.id !== "veg-main-course")
  }
];

const MENU_ITEMS = [
  // =========================================================================
  // 1. BIRYANI (Pure Veg & Non-Veg Dum Biryanis)
  // =========================================================================
  {
    id: "vb-1",
    name: "Royal Paneer Tikka Dum Biryani",
    category: "biryani",
    section: "pure-veg",
    price: 240,
    isVeg: true,
    isSignature: true,
    badge: "Bestseller",
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Tandoor-charred malai paneer cubes tossed in rich makhani masala, layered with saffron basmati rice, fried cashews, and fresh mint.",
    image: "images/menu/paneer-tikka-biryani.webp"
  },
  {
    id: "vb-2",
    name: "Kings Special Veg Dum Biryani",
    category: "biryani",
    section: "pure-veg",
    price: 210,
    isVeg: true,
    isSignature: false,
    badge: "Pure Veg",
    spicyLevel: 1,
    serves: "1-2 Persons",
    description: "Assorted garden fresh vegetables (carrots, beans, peas, potatoes) dum-cooked with long grain basmati rice, shahi jeera, and kewra water.",
    image: "images/menu/veg-dum-biryani.webp"
  },
  {
    id: "vb-3",
    name: "Kaju (Cashew) Paneer Biryani",
    category: "biryani",
    section: "pure-veg",
    price: 270,
    isVeg: true,
    isSignature: false,
    badge: "Royal Veg",
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Generous helping of roasted whole cashews and fresh soft cottage cheese cubes simmered in royal spices and layered with fragrant basmati.",
    image: "images/menu/kaju-paneer-biryani.webp"
  },
  {
    id: "vb-4",
    name: "Mushroom Masala Dum Biryani",
    category: "biryani",
    section: "pure-veg",
    price: 230,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Plump button mushrooms cooked in a pepper-onion-tomato reduction, folded into fragrant dum rice.",
    image: "images/menu/mushroom-dum-biryani.webp"
  },
  {
    id: "cb-1",
    name: "Kings Special Chicken Dum Biryani",
    category: "biryani",
    section: "non-veg",
    price: 260,
    halfPrice: 170,
    isVeg: false,
    isSignature: true,
    badge: "Chef Special",
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Long-grain aged basmati rice cooked on slow dum with tender marinated chicken pieces, hand-pounded royal spices, saffron, served with mirchi ka salan and dahi raita.",
    image: "images/menu/chicken-dum-biryani.webp"
  },
  {
    id: "cb-2",
    name: "Andhra Chicken Fry Piece Biryani",
    category: "biryani",
    section: "non-veg",
    price: 280,
    isVeg: false,
    isSignature: true,
    badge: "Bestseller",
    spicyLevel: 3,
    serves: "1-2 Persons",
    description: "Signature Andhra-style spicy shallow-fried chicken pieces layered over flavorful aromatic biryani rice. Rich, crispy, and spicy.",
    image: "images/menu/andhra-chicken-fry-biryani.webp"
  },
  {
    id: "cb-3",
    name: "Hyderabadi Chicken Dum Biryani",
    category: "biryani",
    section: "non-veg",
    price: 250,
    halfPrice: 160,
    isVeg: false,
    isSignature: false,
    badge: "Popular",
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Traditional kacchi dum biryani layered with succulent marinated chicken, fresh mint, coriander, brown onions, and a boiled egg.",
    image: "images/menu/hyderabadi-chicken-biryani.webp"
  },
  {
    id: "cb-4",
    name: "Kings Boneless Chicken Biryani",
    category: "biryani",
    section: "non-veg",
    price: 290,
    isVeg: false,
    isSignature: false,
    badge: "Must Try",
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Tender boneless chicken cubes sauteed in rich house gravy, layered over aromatic saffron basmati rice with cashews and ghee.",
    image: "images/menu/boneless-chicken-biryani.webp"
  },
  {
    id: "cb-5",
    name: "Chicken Lollipop Biryani",
    category: "biryani",
    section: "non-veg",
    price: 310,
    isVeg: false,
    isSignature: false,
    badge: null,
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Golden fried juicy chicken lollipops seasoned with spicy house seasoning, served atop fragrant dum rice with tangy mint chutney.",
    image: "images/menu/chicken-lollipop-biryani.webp"
  },
  {
    id: "mb-1",
    name: "Royal Mutton Dum Biryani",
    category: "biryani",
    section: "non-veg",
    price: 380,
    halfPrice: 240,
    isVeg: false,
    isSignature: true,
    badge: "Royal Favorite",
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Prime cuts of fresh tender mutton marinated overnight in royal whole spices, layered with fragrant basmati and slow-cooked to melt-in-mouth perfection.",
    image: "images/menu/mutton-dum-biryani.webp"
  },
  {
    id: "mb-2",
    name: "Andhra Mutton Fry Biryani",
    category: "biryani",
    section: "non-veg",
    price: 410,
    isVeg: false,
    isSignature: false,
    badge: "Spicy Special",
    spicyLevel: 3,
    serves: "1-2 Persons",
    description: "Rich tender mutton pieces roasted in Andhra pepper masala, served over ghee-tempered dum rice with roasted cashews and curry leaves.",
    image: "images/menu/andhra-mutton-fry-biryani.webp"
  },
  {
    id: "mb-3",
    name: "Special Mutton Kheema Biryani",
    category: "biryani",
    section: "non-veg",
    price: 390,
    isVeg: false,
    isSignature: false,
    badge: null,
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Spiced minced mutton cooked with peas and caramelized onions, infused into delicate basmati grains for an extraordinarily flavorful bite.",
    image: "images/menu/mutton-kheema-biryani.webp"
  },
  {
    id: "pb-1",
    name: "Kings Coastal Prawns Biryani",
    category: "biryani",
    section: "non-veg",
    price: 340,
    isVeg: false,
    isSignature: false,
    badge: "Seafood Special",
    spicyLevel: 2,
    serves: "1-2 Persons",
    description: "Fresh coastal prawns marinated in aromatic spices and tossed with ghee-roasted aromatics, layered over saffron-infused dum basmati rice.",
    image: "images/menu/coastal-prawns-biryani.webp"
  },

  // =========================================================================
  // 2. STARTERS (Veg & Non-Veg Appetizers)
  // =========================================================================
  {
    id: "vs-1",
    name: "Crispy Paneer 65",
    category: "starters",
    section: "pure-veg",
    price: 210,
    isVeg: true,
    isSignature: false,
    badge: "Pure Veg",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Fresh cottage cheese cubes fried till crisp, tempered with South Indian spices, curd, garlic, and fresh curry leaves.",
    image: "images/menu/paneer-65.webp"
  },
  {
    id: "vs-2",
    name: "Chilli Baby Corn & Mushroom",
    category: "starters",
    section: "pure-veg",
    price: 200,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Tender baby corn spears and mushrooms wok-tossed with capsicum, onions, and spicy Indo-Chinese sauces.",
    image: "images/menu/chilli-baby-corn-mushroom.webp"
  },
  {
    id: "vs-3",
    name: "Veg Manchurian Dry",
    category: "starters",
    section: "pure-veg",
    price: 180,
    isVeg: true,
    isSignature: false,
    badge: "Popular",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Crispy minced vegetable balls sauteed in garlic ginger sauce with spring onions.",
    image: "images/menu/veg-manchurian.webp"
  },
  {
    id: "vs-4",
    name: "Crispy Corn Pepper Fry",
    category: "starters",
    section: "pure-veg",
    price: 190,
    isVeg: true,
    isSignature: false,
    badge: "Crunchy",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Golden sweet corn kernels tossed with crushed black pepper, fresh curry leaves, and crunchy spring onions.",
    image: "images/menu/crispy-corn-pepper-fry.webp"
  },
  {
    id: "cs-1",
    name: "Kings Special Chicken Majestic",
    category: "starters",
    section: "non-veg",
    price: 260,
    isVeg: false,
    isSignature: true,
    badge: "Chef Special",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Strips of tender chicken tossed in a creamy spiced curd mixture, fresh green chilies, garlic, and tempered curry leaves.",
    image: "images/menu/chicken-majestic.webp"
  },
  {
    id: "cs-2",
    name: "Andhra Style Chicken 65",
    category: "starters",
    section: "non-veg",
    price: 240,
    isVeg: false,
    isSignature: false,
    badge: "Crispy & Spicy",
    spicyLevel: 3,
    serves: "2 Persons",
    description: "Crispy fried boneless chicken tossed with slit green chillies, crushed garlic, and curry leaves in classic spicy South Indian style.",
    image: "images/menu/chicken-65.webp"
  },
  {
    id: "cs-3",
    name: "Royal Tandoori Chicken",
    category: "starters",
    section: "non-veg",
    price: 480,
    halfPrice: 260,
    isVeg: false,
    isSignature: false,
    badge: "Charcoal Grilled",
    spicyLevel: 2,
    serves: "2-3 Persons",
    description: "Whole chicken pieces marinated in thick spiced yoghurt and Kashmiri red chili, roasted in charcoal tandoor with lemon and onion rings (Full: 4 pcs, Half: 2 pcs).",
    image: "images/menu/tandoori-chicken.webp"
  },
  {
    id: "cs-4",
    name: "Chicken Lollipop (Saucy / Dry)",
    category: "starters",
    section: "non-veg",
    price: 250,
    isVeg: false,
    isSignature: false,
    badge: "Customer Favorite",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Winglets shaped into lollipops, batter-fried to golden crunch and tossed in hot garlic pepper sauce with spring onions (6 pcs).",
    image: "images/menu/chicken-lollipop.webp"
  },
  {
    id: "cs-5",
    name: "Dragon Chicken",
    category: "starters",
    section: "non-veg",
    price: 270,
    isVeg: false,
    isSignature: false,
    badge: null,
    spicyLevel: 3,
    serves: "2 Persons",
    description: "Crispy chicken strips tossed in spicy red chilli paste, soy glaze, cashews, and bell peppers.",
    image: "images/menu/dragon-chicken.webp"
  },
  {
    id: "cs-6",
    name: "Andhra Chilli Chicken",
    category: "starters",
    section: "non-veg",
    price: 250,
    isVeg: false,
    isSignature: false,
    badge: "Spicy",
    spicyLevel: 3,
    serves: "2 Persons",
    description: "Tender chicken cubes wok-tossed with slit green chillies, garlic, crushed pepper, and aromatic Andhra curry spices.",
    image: "images/menu/chilli-chicken.webp"
  },
  {
    id: "cs-7",
    name: "Apollo Fish Special",
    category: "starters",
    section: "non-veg",
    price: 290,
    isVeg: false,
    isSignature: false,
    badge: "Coastal Delight",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Boneless fish fillets marinated with spices, deep fried to golden crispness and tossed with curd, curry leaves, and green chillies.",
    image: "images/menu/apollo-fish.webp"
  },

  // =========================================================================
  // 3. SOUPS (Warm Comforting Broths)
  // =========================================================================
  {
    id: "sp-1",
    name: "Veg Sweet Corn Soup",
    category: "soups",
    section: "pure-veg",
    price: 120,
    isVeg: true,
    isSignature: false,
    badge: "Pure Veg",
    spicyLevel: 1,
    serves: "1 Person",
    description: "Comforting golden broth simmered with tender sweet corn kernels, finely diced garden carrots, beans, and light white pepper.",
    image: "images/menu/veg-sweet-corn-soup.webp"
  },
  {
    id: "sp-2",
    name: "Veg Hot & Sour Soup",
    category: "soups",
    section: "pure-veg",
    price: 130,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 2,
    serves: "1 Person",
    description: "Classic Indo-Chinese peppery broth packed with shredded vegetables, mushrooms, dark soy, vinegar, and fresh chili paste.",
    image: "images/menu/veg-hot-sour-soup.webp"
  },
  {
    id: "sp-3",
    name: "Royal Chicken Corn Soup",
    category: "soups",
    section: "non-veg",
    price: 150,
    isVeg: false,
    isSignature: true,
    badge: "Bestseller",
    spicyLevel: 1,
    serves: "1 Person",
    description: "Hearty chicken broth enriched with finely shredded tender chicken, sweet corn kernels, and silky drop egg ribbons.",
    image: "images/menu/chicken-corn-soup.webp"
  },
  {
    id: "sp-4",
    name: "Chicken Hot & Sour Soup",
    category: "soups",
    section: "non-veg",
    price: 160,
    isVeg: false,
    isSignature: false,
    badge: "Spicy",
    spicyLevel: 3,
    serves: "1 Person",
    description: "Fiery and tangy chicken soup loaded with shredded chicken strips, wood-ear mushrooms, garlic, and fresh red chilies.",
    image: "images/menu/chicken-hot-sour-soup.webp"
  },
  {
    id: "sp-5",
    name: "Royal Mutton Marag (Bone Soup)",
    category: "soups",
    section: "non-veg",
    price: 190,
    isVeg: false,
    isSignature: true,
    badge: "Royal Delicacy",
    spicyLevel: 2,
    serves: "1 Person",
    description: "Authentic Hyderabadi mutton bone soup slow-cooked for hours with aromatic cardamom, cinnamon, black pepper, cashews, and rich bone marrow.",
    image: "images/menu/mutton-marag-soup.webp"
  },

  // =========================================================================
  // 4. DRINKS & BEVERAGES (Coolers & Refreshments)
  // =========================================================================
  {
    id: "dr-1",
    name: "Fresh Lime Soda (Sweet / Salt)",
    category: "drinks-beverages",
    section: "pure-veg",
    price: 60,
    isVeg: true,
    isSignature: false,
    badge: "Popular",
    spicyLevel: 0,
    serves: "1 Glass",
    description: "Freshly squeezed lemon juice topped with sparkling club soda, fresh mint leaves, and your choice of rock salt or sweet cane sugar.",
    image: "images/menu/fresh-lime-soda.webp"
  },
  {
    id: "dr-2",
    name: "Royal Badam Milk (Chilled)",
    category: "drinks-beverages",
    section: "pure-veg",
    price: 80,
    isVeg: true,
    isSignature: true,
    badge: "House Special",
    spicyLevel: 0,
    serves: "1 Bottle / Glass",
    description: "Creamy whole milk simmered with crushed almonds, Kashmiri saffron strands, and green cardamom, served chilled.",
    image: "images/menu/royal-badam-milk.webp"
  },
  {
    id: "dr-3",
    name: "Masala Buttermilk (Chaas)",
    category: "drinks-beverages",
    section: "pure-veg",
    price: 50,
    isVeg: true,
    isSignature: false,
    badge: "Cooling",
    spicyLevel: 1,
    serves: "1 Glass",
    description: "Refreshing churned yogurt cooler tempered with roasted cumin, crushed ginger, green chili, and fresh coriander.",
    image: "images/menu/masala-buttermilk.webp"
  },
  {
    id: "dr-4",
    name: "Mint Virgin Mojito",
    category: "drinks-beverages",
    section: "pure-veg",
    price: 90,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 0,
    serves: "1 Tall Glass",
    description: "Muddled fresh garden mint and juicy lime wedges shaken with crushed ice and chilled lemon fizz.",
    image: "images/menu/mint-virgin-mojito.webp"
  },
  {
    id: "dr-5",
    name: "Thums Up / Soft Drink (750ml)",
    category: "drinks-beverages",
    section: "pure-veg",
    price: 50,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 0,
    serves: "750ml Bottle",
    description: "Chilled effervescent cold drink — the classic fiery companion to Andhra dum biryani.",
    image: "images/menu/soft-drinks.webp"
  },
  {
    id: "dr-6",
    name: "Packaged Mineral Water (1L)",
    category: "drinks-beverages",
    section: "pure-veg",
    price: 25,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 0,
    serves: "1 Litre Bottle",
    description: "Sealed, purified and chilled premium drinking water bottle.",
    image: "images/menu/packaged-mineral-water.webp"
  },

  // =========================================================================
  // 5. VEG MAIN COURSE (Curries & Gravies)
  // =========================================================================
  {
    id: "vm-1",
    name: "Royal Paneer Butter Masala",
    category: "veg-main-course",
    section: "pure-veg",
    price: 230,
    isVeg: true,
    isSignature: true,
    badge: "Bestseller",
    spicyLevel: 1,
    serves: "2 Persons",
    description: "Soft fresh cottage cheese cubes cooked in an aromatic rich tomato, cashew nut, and butter gravy with kasoori methi.",
    image: "images/menu/paneer-butter-masala.webp"
  },
  {
    id: "vm-2",
    name: "Kadai Paneer Special",
    category: "veg-main-course",
    section: "pure-veg",
    price: 240,
    isVeg: true,
    isSignature: false,
    badge: "Spicy Gravy",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Paneer chunks, crunchy bell peppers, and diced onions sauteed in freshly pounded kadai spices and tomato masala.",
    image: "images/menu/kadai-paneer.webp"
  },
  {
    id: "vm-3",
    name: "Kaju Mushroom Curry",
    category: "veg-main-course",
    section: "pure-veg",
    price: 260,
    isVeg: true,
    isSignature: false,
    badge: "Chef Special",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Golden roasted whole cashews and fresh button mushrooms simmered in a mildly spiced royal onion-cream gravy.",
    image: "images/menu/kaju-mushroom-curry.webp"
  },
  {
    id: "vm-4",
    name: "Kings Mixed Vegetable Curry",
    category: "veg-main-course",
    section: "pure-veg",
    price: 200,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Garden fresh carrots, beans, peas, cauliflower, and potatoes simmered in a traditional home-style onion-tomato masala.",
    image: "images/menu/mixed-vegetable-curry.webp"
  },
  {
    id: "vm-5",
    name: "Dal Tadka (Double Jeera)",
    category: "veg-main-course",
    section: "pure-veg",
    price: 170,
    isVeg: true,
    isSignature: false,
    badge: "Pure Veg",
    spicyLevel: 1,
    serves: "2 Persons",
    description: "Yellow toor dal slow-cooked to creaminess and tempered with pure desi ghee, cumin seeds, minced garlic, and dry red chillies.",
    image: "images/menu/dal-tadka.webp"
  },

  // =========================================================================
  // 6. NON-VEG MAIN COURSE (Chicken & Mutton Gravies)
  // =========================================================================
  {
    id: "nm-1",
    name: "Royal Butter Chicken (Murgh Makhani)",
    category: "non-veg-main-course",
    section: "non-veg",
    price: 280,
    isVeg: false,
    isSignature: true,
    badge: "Bestseller",
    spicyLevel: 1,
    serves: "2 Persons",
    description: "Tandoor-roasted boneless chicken tikka pieces simmered in an indulgent silky smooth buttery tomato and cashew gravy.",
    image: "images/menu/butter-chicken.webp"
  },
  {
    id: "nm-2",
    name: "Andhra Country Chicken Curry",
    category: "non-veg-main-course",
    section: "non-veg",
    price: 260,
    isVeg: false,
    isSignature: true,
    badge: "Spicy Special",
    spicyLevel: 3,
    serves: "2 Persons",
    description: "Traditional Godavari-style spicy chicken curry simmered with poppy seeds, roasted coriander, cloves, and fiery red chili paste.",
    image: "images/menu/andhra-country-chicken-curry.webp"
  },
  {
    id: "nm-3",
    name: "Mughlai Chicken Gravy",
    category: "non-veg-main-course",
    section: "non-veg",
    price: 290,
    isVeg: false,
    isSignature: false,
    badge: "Royal Taste",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Tender chicken simmered in an aromatic rich almond and cashew paste gravy, enriched with saffron and delicate spices.",
    image: "images/menu/mughlai-chicken-gravy.webp"
  },
  {
    id: "nm-4",
    name: "Royal Mutton Rogan Josh",
    category: "non-veg-main-course",
    section: "non-veg",
    price: 380,
    isVeg: false,
    isSignature: true,
    badge: "Chef Special",
    spicyLevel: 2,
    serves: "2 Persons",
    description: "Succulent mutton pieces slow-cooked in a robust Kashmiri chili and aromatic yogurt gravy seasoned with fennel and ginger.",
    image: "images/menu/mutton-rogan-josh.webp"
  },
  {
    id: "nm-5",
    name: "Andhra Mutton Pepper Curry",
    category: "non-veg-main-course",
    section: "non-veg",
    price: 390,
    isVeg: false,
    isSignature: false,
    badge: "Hot & Spicy",
    spicyLevel: 3,
    serves: "2 Persons",
    description: "Tender chunks of mutton braised in freshly crushed black pepper, caramelized onions, curry leaves, and spicy tomato reduction.",
    image: "images/menu/mutton-pepper-curry.webp"
  },

  // =========================================================================
  // 7. RICE & NOODLES (Fried Rice & Hakka Noodles)
  // =========================================================================
  {
    id: "fr-4",
    name: "Royal Veg Fried Rice",
    category: "rice-noodles",
    section: "pure-veg",
    price: 170,
    isVeg: true,
    isSignature: false,
    badge: "Pure Veg",
    spicyLevel: 1,
    serves: "1-2 Persons",
    description: "Classic vegetable fried rice loaded with finely diced carrots, beans, and cabbage with light soy.",
    image: "images/menu/veg-fried-rice.webp"
  },
  {
    id: "rn-1",
    name: "Schezwan Veg Fried Rice",
    category: "rice-noodles",
    section: "pure-veg",
    price: 180,
    isVeg: true,
    isSignature: false,
    badge: "Spicy",
    spicyLevel: 3,
    serves: "1-2 Persons",
    description: "High-flame wok tossed basmati rice with crunchy vegetables and fiery house-made red Schezwan chili paste.",
    image: "images/menu/schezwan-veg-fried-rice.webp"
  },
  {
    id: "rn-2",
    name: "Veg Hakka Noodles",
    category: "rice-noodles",
    section: "pure-veg",
    price: 180,
    isVeg: true,
    isSignature: false,
    badge: "Popular",
    spicyLevel: 1,
    serves: "1-2 Persons",
    description: "Soft noodles tossed with julienned bell peppers, carrots, shredded cabbage, and scallions in light soy seasoning.",
    image: "images/menu/veg-hakka-noodles.webp"
  },
  {
    id: "fr-1",
    name: "Kings Special Chicken Fried Rice",
    category: "rice-noodles",
    section: "non-veg",
    price: 220,
    isVeg: false,
    isSignature: false,
    badge: "Popular",
    spicyLevel: 1,
    serves: "1-2 Persons",
    description: "Aromatic basmati rice tossed on high flame wok with shredded chicken, scrambled eggs, and fresh veggies.",
    image: "images/menu/chicken-fried-rice.webp"
  },
  {
    id: "fr-2",
    name: "Schezwan Chicken Noodles",
    category: "rice-noodles",
    section: "non-veg",
    price: 230,
    isVeg: false,
    isSignature: false,
    badge: "Spicy",
    spicyLevel: 3,
    serves: "1-2 Persons",
    description: "Hakka noodles tossed with shredded chicken, crunchy vegetables, and in-house fiery red Schezwan sauce.",
    image: "images/menu/schezwan-chicken-noodles.webp"
  },
  {
    id: "fr-3",
    name: "Egg Fried Rice",
    category: "rice-noodles",
    section: "non-veg",
    price: 190,
    isVeg: false,
    isSignature: false,
    badge: null,
    spicyLevel: 1,
    serves: "1-2 Persons",
    description: "Fluffy rice wok-fried with farm fresh eggs, spring onions, and white pepper.",
    image: "images/menu/egg-fried-rice.webp"
  },
  {
    id: "rn-3",
    name: "Chicken Hakka Noodles",
    category: "rice-noodles",
    section: "non-veg",
    price: 210,
    isVeg: false,
    isSignature: false,
    badge: null,
    spicyLevel: 1,
    serves: "1-2 Persons",
    description: "Silky noodles wok-tossed with tender shredded chicken pieces, scrambled egg, and crisp vegetables in light savory soy.",
    image: "images/menu/chicken-hakka-noodles.webp"
  },

  // =========================================================================
  // 8. BREADS (Tandoor Naan, Roti & Parotta)
  // =========================================================================
  {
    id: "br-1",
    name: "Butter Naan",
    category: "breads",
    section: "pure-veg",
    price: 50,
    isVeg: true,
    isSignature: false,
    badge: "Bestseller",
    spicyLevel: 0,
    serves: "1 Person",
    description: "Traditional leavened oven bread baked in a high-heat charcoal tandoor, brushed with melting butter.",
    image: "images/menu/butter-naan.webp"
  },
  {
    id: "br-2",
    name: "Garlic Butter Naan",
    category: "breads",
    section: "pure-veg",
    price: 60,
    isVeg: true,
    isSignature: true,
    badge: "Must Try",
    spicyLevel: 0,
    serves: "1 Person",
    description: "Soft tandoori naan studded with freshly minced charred garlic and coriander leaves, lavishly brushed with butter.",
    image: "images/menu/garlic-butter-naan.webp"
  },
  {
    id: "br-3",
    name: "Tandoori Roti (Butter / Plain)",
    category: "breads",
    section: "pure-veg",
    price: 35,
    isVeg: true,
    isSignature: false,
    badge: null,
    spicyLevel: 0,
    serves: "1 Person",
    description: "Wholesome stone-ground wheat flatbread roasted inside the clay tandoor until crisp and lightly charred.",
    image: "images/menu/tandoori-roti.webp"
  },
  {
    id: "br-4",
    name: "Rumali Roti",
    category: "breads",
    section: "pure-veg",
    price: 30,
    isVeg: true,
    isSignature: false,
    badge: "Thin & Soft",
    spicyLevel: 0,
    serves: "1 Person",
    description: "Handkerchief-thin delicate soft flatbread stretched and cooked over an inverted wok dome.",
    image: "images/menu/rumali-roti.webp"
  },
  {
    id: "br-5",
    name: "Malabar Parotta",
    category: "breads",
    section: "pure-veg",
    price: 40,
    isVeg: true,
    isSignature: false,
    badge: "Flaky",
    spicyLevel: 0,
    serves: "1 Person",
    description: "Flaky, spiral layered Kerala-style flatbread toasted on hot griddle with pure ghee till golden and crisp.",
    image: "images/menu/malabar-parotta.webp"
  },

  // =========================================================================
  // 9. DESSERTS (Royal Sweets & Treats)
  // =========================================================================
  {
    id: "ds-1",
    name: "Shahi Tukda (Double Ka Meetha)",
    category: "desserts",
    section: "pure-veg",
    price: 110,
    isVeg: true,
    isSignature: true,
    badge: "Royal Special",
    spicyLevel: 0,
    serves: "1-2 Persons",
    description: "Crispy ghee-fried bread triangles drenched in saffron-cardamom syrup and layered with velvety condensed rabri, cashews, and almonds.",
    image: "images/menu/shahi-tukda.webp"
  },
  {
    id: "ds-2",
    name: "Gulab Jamun (with Rabri)",
    category: "desserts",
    section: "pure-veg",
    price: 90,
    isVeg: true,
    isSignature: false,
    badge: "Bestseller",
    spicyLevel: 0,
    serves: "2 Pieces",
    description: "Warm melt-in-mouth mawa dumplings soaked in fragrant rose and green cardamom syrup, paired with thick chilled rabri.",
    image: "images/menu/gulab-jamun.webp"
  },
  {
    id: "ds-3",
    name: "Royal Matka Kulfi",
    category: "desserts",
    section: "pure-veg",
    price: 80,
    isVeg: true,
    isSignature: false,
    badge: "Traditional",
    spicyLevel: 0,
    serves: "1 Matka Pot",
    description: "Slow-reduced dense malai kulfi richly infused with crushed pistachios, cashews, and real saffron in an authentic clay pot.",
    image: "images/menu/royal-matka-kulfi.webp"
  },
  {
    id: "ds-4",
    name: "Apricot Delight (Qubani Ka Meetha)",
    category: "desserts",
    section: "pure-veg",
    price: 120,
    isVeg: true,
    isSignature: false,
    badge: "Hyderabadi Classic",
    spicyLevel: 0,
    serves: "1 Person",
    description: "Classic Nizam-era stewed dry apricot delicacy served with rich dairy cream and roasted apricot kernels.",
    image: "images/menu/apricot-delight.webp"
  },

  // =========================================================================
  // 10. COMBOS & FAMILY PACKS (Feasts & Party Packs)
  // =========================================================================
  {
    id: "fp-1",
    name: "Kings Chicken Biryani Family Pack",
    category: "combos-family-packs",
    section: "non-veg",
    price: 699,
    isVeg: false,
    isSignature: true,
    badge: "Family Favorite",
    spicyLevel: 2,
    serves: "3-4 Persons",
    description: "Generous family pack with fragrant basmati dum biryani rice, 4 juicy marinated chicken pieces, 2 boiled eggs, large mirchi ka salan, raita, and 2 gulab jamuns.",
    image: "images/menu/chicken-biryani-family-pack.webp"
  },
  {
    id: "fp-2",
    name: "Kings Jumbo Chicken Biryani Feast",
    category: "combos-family-packs",
    section: "non-veg",
    price: 1199,
    isVeg: false,
    isSignature: true,
    badge: "Jumbo Feast",
    spicyLevel: 2,
    serves: "5-6 Persons",
    description: "Mega celebration pack! Extra large dum biryani rice, 8 tender chicken pieces, 4 boiled eggs, 1 plate Chicken Lollipop (6 pcs), extra salan, dahi raita, and 4 gulab jamuns.",
    image: "images/menu/jumbo-chicken-biryani-feast.webp"
  },
  {
    id: "fp-3",
    name: "Royal Mutton Biryani Family Pack",
    category: "combos-family-packs",
    section: "non-veg",
    price: 999,
    isVeg: false,
    isSignature: true,
    badge: "Royal Feast",
    spicyLevel: 2,
    serves: "3-4 Persons",
    description: "Tender prime mutton cuts slow dum-cooked with aged basmati rice, accompanied by spicy salan gravy, cooling raita, onion rings, and 2 sweet desserts.",
    image: "images/menu/mutton-biryani-family-pack.webp"
  },
  {
    id: "fp-4",
    name: "Kings Veg Celebration Combo",
    category: "combos-family-packs",
    section: "pure-veg",
    price: 649,
    isVeg: true,
    isSignature: false,
    badge: "Pure Veg Feast",
    spicyLevel: 1,
    serves: "2-3 Persons",
    description: "Complete vegetarian dinner: 1 Veg Dum Biryani, 1 Crispy Paneer 65 starter, 1 Paneer Butter Masala curry, 3 Butter Naans, Raita, and 2 Gulab Jamuns.",
    image: "images/menu/veg-celebration-combo.webp"
  },
  {
    id: "fp-5",
    name: "Royal Non-Veg Feast Combo",
    category: "combos-family-packs",
    section: "non-veg",
    price: 789,
    isVeg: false,
    isSignature: false,
    badge: "Must Try Combo",
    spicyLevel: 2,
    serves: "2-3 Persons",
    description: "Rich party combo: 1 Chicken Dum Biryani, 1 Andhra Chicken 65, 1 Butter Chicken curry, 3 Butter Naans, Raita, Salan, and 2 Shahi Tukda sweets.",
    image: "images/menu/royal-non-veg-feast-combo.webp"
  }
];

// Gallery Images Data
const GALLERY_ITEMS = [
  {
    id: "g1",
    category: "biryani",
    title: "Kings Special Dum Biryani",
    desc: "Aromatic slow-dum basmati rice with tender spiced chicken",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "g2",
    category: "starters",
    title: "Charcoal Tandoori Chicken",
    desc: "Smoky tandoor perfection with mint chutney and lemon",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "g3",
    category: "interior",
    title: "Family Dining Hall",
    desc: "Spacious air-conditioned royal dining hall for family gatherings",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "g4",
    category: "biryani",
    title: "Royal Mutton Dum Biryani",
    desc: "Cooked with traditional whole spices and pure ghee",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "g5",
    category: "starters",
    title: "Crispy Chicken Majestic",
    desc: "A crowd favorite starter seasoned with green chilies and curry leaves",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "g6",
    category: "interior",
    title: "Royal Table Setting",
    desc: "Welcoming ambiance for comfortable and memorable celebrations",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "g7",
    category: "biryani",
    title: "Andhra Fry Piece Biryani",
    desc: "Spicy roasted chicken over fragrant yellow saffron rice",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "g8",
    category: "interior",
    title: "Warm Evening Atmosphere",
    desc: "Comfortable seating designed for families and friends in Tuni",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
  }
];

// Customer Reviews Data
const CUSTOMER_REVIEWS = [
  {
    id: "r1",
    name: "Suresh Varma",
    location: "Tuni Local Resident",
    rating: 5,
    date: "1 week ago",
    badge: "Dine-in Guest",
    comment: "Undoubtedly the best biryani spot in Tuni! The Chicken Dum Biryani has that authentic royal aroma with tender, juicy pieces. The family AC section is very clean and comfortable."
  },
  {
    id: "r2",
    name: "Dr. K. Srinivas Rao",
    location: "Kakinada (Highway Traveler)",
    rating: 5,
    date: "2 weeks ago",
    badge: "Family Dining",
    comment: "Stopped here while traveling on the highway with family. The Mutton Biryani and Chicken Majestic were extraordinary. Fast service, polite staff, and clean washrooms. Highly recommended!"
  },
  {
    id: "r3",
    name: "Pooja Reddy",
    location: "Payakaraopeta / Tuni",
    rating: 5,
    date: "A month ago",
    badge: "Takeaway Order",
    comment: "We ordered the Kings Jumbo Family Pack for a Sunday get-together. The quantity was super generous, packing was leak-proof, and everyone praised the taste. Will order again!"
  },
  {
    id: "r4",
    name: "M. Ramesh Kumar",
    location: "Foodie & Regular Patron",
    rating: 4.8,
    date: "Recent Visit",
    badge: "Regular Diner",
    comment: "The Andhra Fry Piece Biryani has that perfect spicy punch that lovers of Andhra food crave. Great value for money and consistent quality every time."
  }
];

// Make data globally accessible
if (typeof window !== 'undefined') {
  window.MENU_SECTIONS = MENU_SECTIONS;
  window.MENU_CATEGORIES = MENU_CATEGORIES;
  window.MENU_ITEMS = MENU_ITEMS;
  window.GALLERY_ITEMS = GALLERY_ITEMS;
  window.CUSTOMER_REVIEWS = CUSTOMER_REVIEWS;
}
