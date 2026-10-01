/**
 * AI Horizon - Global Configuration & Data Source
 * Easily edit contact info, demo showcase slides, automation scenarios, FAQs, and booking links here.
 */

const AIH_CONFIG = {
  business: {
    name: "AI Horizon",
    tagline: "Custom Websites & AI Automation for Pretoria Businesses",
    city: "Pretoria",
    country: "South Africa",
    email: "hello@aihorizon.co.za",
    websiteUrl: "https://aihorizon.co.za",
    whatsappNumber: "+27 82 000 0000", // Update with your actual WhatsApp number
    whatsappLink: "https://wa.me/278200000000?text=Hi%20AI%20Horizon,%20I'd%20like%20to%20book%20a%20free%20discovery%20meeting.",
    socials: {
      instagram: "https://instagram.com/aihorizon_za",
      linkedin: "https://linkedin.com/company/aihorizon",
      facebook: "#"
    },
    // Booking link (Calendly, Cal.com, Google Calendar, or custom form handler)
    bookingUrl: "https://calendly.com/aihorizon/discovery-meeting",
    // Formspree or Netlify endpoint fallback for form submissions
    formEndpoint: "https://formspree.io/f/hello@aihorizon.co.za" 
  },

  // Section 3: Demo Website Showcase Slides
  // Replace poster images or add videoSrc (.mp4/.webm) whenever ready!
  demoSlides: [
    {
      id: "con-leche-cafe",
      title: "Con Leche Cafe",
      businessType: "Coffee Shop & Artisanal Bakery",
      description: "A fast, vibrant website designed to boost local foot traffic and online table bookings.",
      videoSrc: "", // Place video path here when uploaded, e.g. "assets/demos/con-leche.mp4"
      posterImage: "assets/demos/poster-con-leche.svg",
      liveUrl: "https://conlechecafe.co.za",
      allowIframe: false,
      themeColor: "#D97706"
    },
    {
      id: "impact-nest",
      title: "Impact Nest",
      businessType: "Events & Adventure Community",
      description: "High-conversion link landing page and event registration portal with instant ticket generation.",
      videoSrc: "", 
      posterImage: "assets/demos/poster-impact-nest.svg",
      liveUrl: "https://impactnest.co.za",
      allowIframe: false,
      themeColor: "#059669"
    },
    {
      id: "obg-spa-beauty",
      title: "OBG Spa & Beauty",
      businessType: "Boutique Wellness Spa",
      description: "Serene digital showcase integrated with automated WhatsApp appointment scheduling.",
      videoSrc: "",
      posterImage: "assets/demos/poster-obg-spa.svg",
      liveUrl: "https://obgspa.co.za",
      allowIframe: false,
      themeColor: "#9333EA"
    },
    {
      id: "apex-real-estate",
      title: "Apex Property Group",
      businessType: "Real Estate & Property Agency",
      description: "Custom property catalog with instant lead capture and automated viewing reminders.",
      videoSrc: "",
      posterImage: "assets/demos/poster-apex-realty.svg",
      liveUrl: "https://apexproperty.co.za",
      allowIframe: false,
      themeColor: "#2563EB"
    }
  ],

  // Section 4: Workflow Playground Scenarios
  workflowScenarios: [
    {
      id: "lead-arrives",
      title: "A new lead arrives",
      icon: "⚡",
      badge: "Lead Capture & Response",
      steps: [
        { label: "Trigger", title: "Form or WhatsApp Enquiry", detail: "Visitor fills website contact form or sends a WhatsApp message." },
        { label: "Instant Action", title: "Automated Personal Reply", detail: "System immediately replies with your business intro and meeting calendar." },
        { label: "CRM Sync", title: "Contact Created in CRM", detail: "Lead info and conversation history stored cleanly in your CRM pipeline." },
        { label: "Outcome", title: "Meeting Booked & Notified", detail: "Client picks a slot; your team gets an instant push notification on phone." }
      ]
    },
    {
      id: "client-books",
      title: "A client books a meeting",
      icon: "📅",
      badge: "Scheduling & Prep",
      steps: [
        { label: "Trigger", title: "Time Slot Selected", detail: "Client picks an available time slot on your live calendar." },
        { label: "Confirmation", title: "Instant Calendar Invite", detail: "Meeting details, Google Meet/Zoom link, and WhatsApp confirmation sent." },
        { label: "Preparation", title: "Intake Questionnaire", detail: "Pre-meeting questions emailed automatically to gather project details." },
        { label: "Outcome", title: "Automated Reminders", detail: "Reminder sent 24 hours and 1 hour before meeting to ensure zero no-shows." }
      ]
    },
    {
      id: "invoice-overdue",
      title: "An invoice is overdue",
      icon: "💳",
      badge: "Finance & Accounts",
      steps: [
        { label: "Trigger", title: "Payment Past Due Date", detail: "Accounting system detects unpaid invoice past agreed terms." },
        { label: "Reminder 1", title: "Friendly WhatsApp Notice", detail: "Polite automated reminder sent with direct payment link attached." },
        { label: "Follow-up", title: "Statement Emailed", detail: "Detailed PDF statement automatically generated and sent to finance contact." },
        { label: "Outcome", title: "Payment Recorded", detail: "Upon payment, status updates automatically and receipt is dispatched." }
      ]
    },
    {
      id: "property-listed",
      title: "A new property is listed",
      icon: "🏡",
      badge: "Real Estate Workflow",
      steps: [
        { label: "Trigger", title: "Listing Added to System", detail: "Agent uploads new property photos, specs, and asking price once." },
        { label: "Multi-Sync", title: "Website & Social Update", detail: "Website catalog, social posts, and PDF brochure generated automatically." },
        { label: "Buyer Match", title: "Instant Buyer Broadcast", detail: "Matching VIP buyers in your database get WhatsApp alerts automatically." },
        { label: "Outcome", title: "Viewing Requests Bot", detail: "Interested buyers can instantly request private viewing slots 24/7." }
      ]
    },
    {
      id: "customer-question",
      title: "A customer asks a question",
      icon: "💬",
      badge: "24/7 Customer Service",
      steps: [
        { label: "Trigger", title: "Enquiry via Web or WhatsApp", detail: "Customer asks about pricing, services, operating hours, or location." },
        { label: "AI Analysis", title: "Knowledge Base Scan", detail: "System analyzes exact business rules, services, and FAQ documentation." },
        { label: "Instant Reply", title: "Human-Quality Answer", detail: "Clear, helpful response delivered in seconds, day or night." },
        { label: "Outcome", title: "Seamless Escalation", detail: "If complex or high-value, conversation flags your team with full context." }
      ]
    },
    {
      id: "review-received",
      title: "A client completes a job",
      icon: "⭐",
      badge: "Reputation & Growth",
      steps: [
        { label: "Trigger", title: "Project Status Marked Done", detail: "Service or delivery confirmed complete in your system." },
        { label: "Feedback Check", title: "1-Click Rating Request", detail: "Friendly WhatsApp message sent asking client for quick rating." },
        { label: "Smart Routing", title: "Google Review Prompt", detail: "5-star ratings get direct link to post public Google Review." },
        { label: "Outcome", title: "Private Feedback Route", detail: "Constructive feedback routed directly to manager for instant care." }
      ]
    }
  ],

  // Capability Cloud Pills
  capabilityCategories: [
    { title: "Lead capture & follow-up", icon: "🎯" },
    { title: "Booking & scheduling", icon: "📆" },
    { title: "Customer support & chat", icon: "💬" },
    { title: "Email & WhatsApp messaging", icon: "📱" },
    { title: "CRM & pipeline management", icon: "📊" },
    { title: "Invoicing & payment links", icon: "🧾" },
    { title: "Reporting & live dashboards", icon: "📈" },
    { title: "Content & social media scheduling", icon: "✍️" },
    { title: "Data entry & document handling", icon: "📄" },
    { title: "Internal team notifications", icon: "🔔" },
    { title: "Property listings & buyer enquiries", icon: "🏢" },
    { title: "Tool integrations (Zapier, Make, APIs)", icon: "🔗" }
  ],

  // FAQs Accordion
  faqs: [
    {
      q: "How long does a typical website or automation project take?",
      a: "Most custom websites are designed and launched within 2 to 4 weeks. Automation setups typically take 1 to 3 weeks depending on the complexity of your current tools and workflows."
    },
    {
      q: "What do you need from my business before we start?",
      a: "Very little heavy lifting on your end. In our first meeting, we learn how your business operates today, what software you currently use, and where your daily bottlenecks are. We handle the technical design, copywriting, and connections for you."
    },
    {
      q: "Do I own my website and automations?",
      a: "100% yes. Everything we build belongs completely to your business. You get full administrative access to your website domain, code base, and automation accounts."
    },
    {
      q: "Do you provide ongoing support after launch?",
      a: "Yes. Every project includes post-launch testing, team training, and support to ensure everything runs smoothly. We also offer monthly care plans if you prefer us to manage updates, hosting, and ongoing improvements."
    },
    {
      q: "What happens in our first free meeting?",
      a: "It's a relaxed, 30-minute conversation. We look at your current website (or lack of one) and your daily business tasks. We spot where you are losing leads or spending unnecessary hours, and show you exactly what we would build to solve it. No pressure, no tech jargon."
    },
    {
      q: "Do you work with clients outside Pretoria?",
      a: "Yes. While our headquarters are in Pretoria, South Africa, we build websites and automations for clients across South Africa and internationally via remote video calls."
    },
    {
      q: "How much does a website or automation system cost?",
      a: "Every project is different, so we scope it with you in a free meeting and give you a clear, custom proposal. We do not use generic templates or charge hidden fees."
    }
  ]
};

// Export to window object for browser access
window.AIH_CONFIG = AIH_CONFIG;
