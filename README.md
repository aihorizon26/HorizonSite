# AI Horizon - Production Marketing Website

A high-converting, single-page marketing website built specifically for **AI Horizon**, an AI automation and digital agency based in Pretoria, South Africa.

Designed to turn visitors into booked discovery meetings with zero fluff, no jargon, and maximum performance.

---

## 🚀 Quick Setup & Configuration

All customizable content and settings are centralized in a single configuration file:
📍 [`js/config.js`](file:///c:/Users/cc/Desktop/Ai%20horizon/AntiGravity/AiHorizon%20Site/js/config.js)

### 1. How to Update Contact Info & Booking Link
Open `js/config.js` and edit the `business` object:
```javascript
business: {
  name: "AI Horizon",
  city: "Pretoria",
  country: "South Africa",
  email: "hello@aihorizon.co.za",
  websiteUrl: "https://aihorizon.co.za",
  whatsappNumber: "+27 82 000 0000", // Your actual WhatsApp number
  whatsappLink: "https://wa.me/278200000000?text=Hi%20AI%20Horizon...",
  bookingUrl: "https://calendly.com/your-username/discovery-meeting", // Calendly / Cal.com link
  formEndpoint: "https://formspree.io/f/your-form-id" // Formspree / Netlify form endpoint
}
```

### 2. How to Add MP4 Video Clips to the Demo Showcase
When your `.mp4` or `.webm` screen recording clips are ready:
1. Save your compressed video files to the `assets/demos/` directory (e.g., `assets/demos/con-leche.mp4`).
2. Open `js/config.js` and update the `demoSlides` array:
```javascript
{
  id: "con-leche-cafe",
  title: "Con Leche Cafe",
  businessType: "Coffee Shop & Artisanal Bakery",
  description: "A fast, vibrant website designed to boost local foot traffic and online table bookings.",
  videoSrc: "assets/demos/con-leche.mp4", // <-- Add video path here
  posterImage: "assets/demos/poster-con-leche.svg", // Poster image fallback
  liveUrl: "https://conlechecafe.co.za",
  allowIframe: false
}
```

### 3. How to Customize Brand Colors & Fonts
Open [`styles.css`](file:///c:/Users/cc/Desktop/Ai%20horizon/AntiGravity/AiHorizon%20Site/styles.css) and update the `:root` variables:
```css
:root {
  --color-ink: #0E0E10;            /* Near-black background */
  --color-charcoal: #1C1C1F;       /* Surface cards */
  --color-brand-grey: #737373;     /* Logo background hex */
  --color-light-surface: #F4F4F2;  /* Off-white sections */
  --color-accent: #F2A33A;         /* Horizon warm amber CTA color */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## 🌐 Deploying to Cloud Hosts

### Netlify (1-Click Deployment)
1. Drag & drop the project folder into your Netlify dashboard, or connect to GitHub.
2. The included [`netlify.toml`](file:///c:/Users/cc/Desktop/Ai%20horizon/AntiGravity/AiHorizon%20Site/netlify.toml) automatically configures asset caching and security headers.

### Vercel
1. Run `vercel` in your terminal or link the repository to Vercel.
2. The included [`vercel.json`](file:///c:/Users/cc/Desktop/Ai%20horizon/AntiGravity/AiHorizon%20Site/vercel.json) configures clean URLs and asset caching headers.

### Traditional Host / cPanel
Upload all files in the root folder (`index.html`, `styles.css`, `js/`, `assets/`) directly to your `public_html` directory via FTP.

---

## 🔒 Hard Rules & Principles Enforced
- **Zero Pricing Listed:** Pricing is strictly omitted everywhere (including metadata and FAQs) to focus on custom discovery meetings.
- **Conversion Focused:** Consistent "Book a Free Meeting" CTAs placed at regular intervals.
- **No Neon AI Stereotypes:** Clean, monochrome foundation with a single warm amber accent.
- **Mobile First:** Optimized layout and touch targets for mobile devices (360px+).
- **Reduced Motion Support:** Respects `prefers-reduced-motion` settings.
