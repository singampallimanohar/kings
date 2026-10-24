/**
 * Kings Biryani's and Family Restaurant - Configuration File
 * ==========================================================
 * Restaurant owners and managers can easily edit this file to update:
 * - Restaurant phone numbers and WhatsApp number
 * - Address and directions
 * - Opening hours
 * - Social media links
 */

const RESTAURANT_CONFIG = {
  // Restaurant Identity
  name: "Kings Biryani's and Family Restaurant",
  shortName: "Kings Biryani",
  tagline: "Royal Taste. Authentic Flavours. Unforgettable Moments.",
  description: "Experience delicious biryani and flavorful meals in a welcoming family restaurant.",
  
  // Location & Address (Tuni, Andhra Pradesh)
  city: "Tuni",
  district: "Kakinada District",
  state: "Andhra Pradesh",
  country: "India",
  pincode: "533401",
  fullAddress: "Kings Biryani's and Family Restaurant, Near Highway Junction / Main Road, Tuni, Andhra Pradesh 533401, India",
  
  // Confirmed Google Maps Location
  googleMapsUrl: "https://maps.app.goo.gl/UXG6T495wVCukNiG6",
  googleMapsEmbedQuery: "Tuni, Andhra Pradesh, India",

  // Contact Information (Easily editable by restaurant owner)
  // WhatsApp number MUST include country code without '+' or special characters for wa.me link
  whatsappNumber: "919391461106", // Official Restaurant WhatsApp Number
  displayPhone: "+91 93914 61106", // Display format
  alternatePhone: "+91 93914 61106",
  email: "kingsbiryanituni@gmail.com",

  // Operating Hours (11:30 AM to 11:00 PM IST)
  openingHours: {
    display: "11:30 AM – 11:00 PM (All 7 Days)",
    days: "Monday – Sunday",
    openMinutes: 690,   // 11:30 AM (11 * 60 + 30)
    closeMinutes: 1380, // 11:00 PM (23 * 60)
    timeZone: "Asia/Kolkata",
    lunchTime: "11:30 AM – 4:00 PM",
    dinnerTime: "6:30 PM – 11:00 PM"
  },

  // Ordering & Delivery Settings
  currency: "₹",
  deliveryAvailable: true,
  minDeliveryOrder: 0, // No minimum order requirement
  freeDeliveryAbove: 600,
  packagingCharge: 20, // ₹20 standard hygienic packaging per order
  deliveryFee: 30, // For delivery below freeDeliveryAbove threshold
  deliveryRadius: "Within Tuni City limits & up to 6 km",

  // Features & Facilities
  features: [
    { icon: "crown", title: "Royal Recipe", text: "Traditional slow-dum aromatic biryani" },
    { icon: "users", title: "Family Dining", text: "Spacious AC & non-AC family seating" },
    { icon: "shield-check", title: "100% Fresh & Halal", text: "Finest quality meat & farm-fresh produce" },
    { icon: "clock", title: "Quick Takeaway", text: "Fresh piping hot parcels ready in minutes" }
  ],

  // Social Links
  socialLinks: {
    whatsapp: "https://wa.me/919391461106",
    googleMaps: "https://maps.app.goo.gl/UXG6T495wVCukNiG6",
    instagram: "https://instagram.com/kingsbiryani_tuni",
    facebook: "https://facebook.com/kingsbiryanituni"
  }
};

// Make config globally accessible
if (typeof window !== 'undefined') {
  window.RESTAURANT_CONFIG = RESTAURANT_CONFIG;
}
