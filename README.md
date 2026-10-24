# Kings Biryani's and Family Restaurant – Multi-Page Website
**Location:** Tuni, Andhra Pradesh, India  
**Tagline:** Royal Taste. Authentic Flavours. Unforgettable Moments.  
**Confirmed Google Maps Location:** [https://maps.app.goo.gl/UXG6T495wVCukNiG6](https://maps.app.goo.gl/UXG6T495wVCukNiG6)  
**Live Local Preview:** [http://localhost:8080](http://localhost:8080)

---

## 👑 Website Architecture (Clean Separate Pages)

The website is organized into clean, dedicated, modular pages with persistent shared navigation, synchronized shopping cart, and royal branding:

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | [`index.html`](./index.html) | Royal hero section, story snippet, responsive food photo gallery with lightbox, and footer |
| **About Us** | [`about.html`](./about.html) | Dedicated story of Kings Biryani in Tuni, slow-dum cooking secrets, aged basmati rice, farm-fresh ingredients, and family AC dining |
| **Food Menu** | [`menu.html`](./menu.html) | Complete interactive digital menu with 10 categories, live search, 3-way dietary filter (All / Pure Veg / Non-Veg), on-card quantity steppers, and WhatsApp ordering |
| **Photo Gallery** | [`gallery.html`](./gallery.html) | Categorized photo showcase (Biryani, Starters, Dining Ambiance) with interactive full-screen Lightbox modal preview |
| **Contact** | [`contact.html`](./contact.html) | Embedded Google Maps, verified opening hours (11:30 AM – 11:00 PM), live "Open Now" status, Call & WhatsApp buttons, and table/catering enquiry form |

---

## 🍽️ 10 Food Menu Categories

The menu now includes full authentic offerings across 10 dedicated categories:
1. **Biryani** (Royal Paneer Tikka, Veg Dum, Kaju Paneer, Chicken Dum, Andhra Fry Piece, Hyderabadi Dum, Boneless, Lollipop, Mutton Dum, Andhra Mutton Fry, Kheema, Coastal Prawns)
2. **Starters** (Paneer 65, Baby Corn & Mushroom, Veg Manchurian, Crispy Corn Pepper Fry, Chicken Majestic, Andhra Chicken 65, Tandoori Chicken, Chicken Lollipop, Dragon Chicken, Chilli Chicken, Apollo Fish)
3. **Soups** (Veg Sweet Corn, Veg Hot & Sour, Royal Chicken Corn, Chicken Hot & Sour, Hyderabadi Mutton Marag)
4. **Drinks & Beverages** (Fresh Lime Soda, Royal Badam Milk, Masala Buttermilk, Mint Virgin Mojito, Thums Up, Mineral Water)
5. **Veg Main Course** (Paneer Butter Masala, Kadai Paneer, Kaju Mushroom Curry, Mixed Veg Curry, Dal Tadka)
6. **Non-Veg Main Course** (Royal Butter Chicken, Andhra Country Chicken, Mughlai Chicken Gravy, Mutton Rogan Josh, Andhra Mutton Pepper Curry)
7. **Rice & Noodles** (Veg Fried Rice, Schezwan Veg Fried Rice, Veg Hakka Noodles, Chicken Fried Rice, Schezwan Chicken Noodles, Egg Fried Rice, Chicken Hakka Noodles)
8. **Breads** (Butter Naan, Garlic Butter Naan, Tandoori Roti, Rumali Roti, Malabar Parotta)
9. **Desserts** (Shahi Tukda, Gulab Jamun with Rabri, Royal Matka Kulfi, Apricot Delight)
10. **Combos & Family Packs** (Chicken Biryani Family Pack, Jumbo Chicken Feast, Mutton Biryani Family Pack, Veg Celebration Combo, Royal Non-Veg Feast Combo)

---

## 🛒 Unified Shopping Cart & WhatsApp Ordering

The shopping cart state is seamlessly synchronized across **all pages** using browser `localStorage`:
- Customers can add items to their cart on `menu.html` or from featured dishes on `index.html`.
- **On-Card Quantity Controls**: When an item is added, the card transforms into an interactive quantity stepper (`-` / `count` / `+`), allowing quick quantity adjustments directly on the menu card.
- Synchronized cart: Modifying quantity in the cart drawer or on the dish card instantly synchronizes across both views in real-time.
- The floating cart pill and navbar cart counter automatically update dynamically.
- Opening the cart drawer displays **Delivery** as the sole order method across Tuni.
- **No Minimum Order Restriction**: Customers can order any dish regardless of the subtotal (orders below ₹300 are fully supported).
- Standard delivery fee is ₹30, and orders of ₹600 or above receive **Free Delivery**.
- Enter customer name, phone number (validated 10-digit Indian mobile), complete delivery address, and cooking notes.
- Clicking **"Review & Send Order on WhatsApp"** generates a clean, formatted pre-filled order message sent to WhatsApp (`9391461106`).

---

## 📁 File Structure

```
kings/
├── index.html            # Home Page
├── about.html            # About Us Page
├── menu.html             # Food Menu & WhatsApp Ordering Page
├── gallery.html          # Photo Gallery & Lightbox Page
├── contact.html          # Contact, Directions, Table & Catering Page
├── css/
│   ├── main.css          # Theme variables, typography, layouts, hero, banners, footer
│   ├── components.css    # Lightbox, modal windows, floating pills, toasts
│   └── responsive.css    # Responsive mobile-first breakpoints (phones, tablets, desktops)
├── js/
│   ├── config.js         # Restaurant metadata (Editable: WhatsApp number, phone, hours, address)
│   ├── menu-data.js      # Menu items catalog (Editable: dishes, categories, prices, images, veg tags)
│   └── app.js            # Menu renderer, filters, search, gallery lightbox, reviews, mobile drawer
└── README.md             # Project documentation and customization guide
```

---

## 🛠️ How the Restaurant Owner Customizes Content

### 1. Update Contact & WhatsApp Number
Open [`js/config.js`](./js/config.js):
```javascript
whatsappNumber: "919391461106",  // 10 digits with country code (91)
displayPhone: "+91 93914 61106",  // Display format
```

### 2. Update Menu Items & Pricing
Open [`js/menu-data.js`](./js/menu-data.js):
```javascript
{
  id: "cb-1",
  name: "Kings Special Chicken Dum Biryani",
  category: "chicken-biryani",
  price: 260,
  isVeg: false,               // true for Veg 🟢, false for Non-Veg 🔴
  isSignature: true,          // true to display on Special Dishes page
  badge: "Chef Special",
  description: "Aged basmati rice cooked on slow dum with tender marinated chicken..."
}
```

---

## 🚀 How to Run Locally

Run in PowerShell:
```powershell
python -m http.server 8080
```
Then visit:
`http://localhost:8080`
