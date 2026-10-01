/**
 * AI Horizon - Primary Frontend Interactive Controller
 * Native ES6+ JavaScript - Lightweight, fast, zero heavy frameworks.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check global configuration
  const config = window.AIH_CONFIG;
  if (!config) {
    console.error('AIH_CONFIG not loaded properly.');
    return;
  }

  /* --------------------------------------------------------------------------
     1. TOP SCROLL PROGRESS BAR & HEADER SCROLLED EFFECT
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('.header');
  const heroSection = document.getElementById('hero');
  const contactSection = document.getElementById('contact');
  const mobileStickyCta = document.getElementById('mobile-sticky-cta');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 1. Scroll Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    // 2. Header Backdrop Class
    if (header) {
      if (scrollTop > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // 3. Mobile Sticky CTA Visibility
    if (mobileStickyCta && heroSection && contactSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const contactTop = contactSection.offsetTop - 300;
      
      if (scrollTop > heroBottom && scrollTop < contactTop) {
        mobileStickyCta.classList.add('is-visible');
      } else {
        mobileStickyCta.classList.remove('is-visible');
      }
    }

    // 4. Process Timeline Horizontal Line Fill
    updateProcessProgress();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* --------------------------------------------------------------------------
     2. MOBILE MENU DRAWER TOGGLE
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileOverlay.classList.toggle('is-open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. INTERSECTION OBSERVER FOR FADE & RISE ANIMATIONS
     -------------------------------------------------------------------------- */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     4. DEMO SHOWCASE CAROUSEL (SECTION 3)
     -------------------------------------------------------------------------- */
  const carouselTrack = document.getElementById('carousel-track');
  const carouselIndicators = document.getElementById('carousel-indicators');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  let currentSlideIndex = 0;
  let carouselAutoplayTimer = null;
  const slidesData = config.demoSlides || [];

  function renderCarousel() {
    if (!carouselTrack || slidesData.length === 0) return;

    carouselTrack.innerHTML = '';
    if (carouselIndicators) carouselIndicators.innerHTML = '';

    slidesData.forEach((slide, index) => {
      // 1. Slide DOM
      const slideEl = document.createElement('div');
      slideEl.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      slideEl.setAttribute('data-index', index);

      // Media element (Video if available, fallback to Poster SVG/Image)
      let mediaHtml = '';
      if (slide.videoSrc && slide.videoSrc.trim() !== '') {
        mediaHtml = `
          <video class="slide-media" poster="${slide.posterImage}" autoplay muted loop playsinline preload="none">
            <source src="${slide.videoSrc}" type="video/mp4">
            <img src="${slide.posterImage}" alt="${slide.title} mockup" class="slide-media">
          </video>
        `;
      } else {
        mediaHtml = `<img src="${slide.posterImage}" alt="${slide.title} mockup" class="slide-media">`;
      }

      slideEl.innerHTML = `
        ${mediaHtml}
        <div class="slide-info-overlay">
          <div class="slide-info-content">
            <div class="slide-badge">${slide.businessType}</div>
            <h3 class="slide-title">${slide.title}</h3>
            <p class="slide-desc">${slide.description}</p>
          </div>
          <div class="slide-actions">
            <a href="${slide.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <span>View Live Site</span>
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
            <span class="tab-notice-pill">Opens in a new tab, close it to come back to AI Horizon</span>
            ${slide.allowIframe ? `<button class="btn btn-secondary btn-sm preview-overlay-btn" data-url="${slide.liveUrl}" data-title="${slide.title}">Preview in Overlay</button>` : ''}
          </div>
        </div>
      `;

      carouselTrack.appendChild(slideEl);

      // 2. Dot Indicator DOM
      if (carouselIndicators) {
        const dot = document.createElement('button');
        dot.className = `indicator-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}: ${slide.title}`);
        dot.addEventListener('click', () => goToSlide(index));
        carouselIndicators.appendChild(dot);
      }
    });

    startCarouselAutoplay();
  }

  function goToSlide(index) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const dots = carouselIndicators ? carouselIndicators.querySelectorAll('.indicator-dot') : [];

    if (slides.length === 0) return;

    // Handle wrap-around
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlideIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
        // Play video if present
        const video = slide.querySelector('video');
        if (video) video.play().catch(() => {});
      } else {
        slide.classList.remove('active');
        // Pause inactive videos
        const video = slide.querySelector('video');
        if (video) video.pause();
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update URL bar in mockup
    const browserUrlBar = document.getElementById('browser-url-display');
    if (browserUrlBar && slidesData[currentSlideIndex]) {
      browserUrlBar.textContent = slidesData[currentSlideIndex].liveUrl;
    }
  }

  function nextSlide() {
    goToSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentSlideIndex - 1);
  }

  function startCarouselAutoplay() {
    stopCarouselAutoplay();
    carouselAutoplayTimer = setInterval(nextSlide, 6000);
  }

  function stopCarouselAutoplay() {
    if (carouselAutoplayTimer) clearInterval(carouselAutoplayTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startCarouselAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startCarouselAutoplay(); });

  // Hover & Touch pause
  if (carouselTrack) {
    carouselTrack.addEventListener('mouseenter', stopCarouselAutoplay);
    carouselTrack.addEventListener('mouseleave', startCarouselAutoplay);

    // Touch Swipe Gesture support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopCarouselAutoplay();
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextSlide();
      if (touchEndX - touchStartX > 50) prevSlide();
      startCarouselAutoplay();
    }, { passive: true });
  }

  renderCarousel();

  /* Fullscreen Overlay Modal Handler */
  const demoOverlayModal = document.getElementById('demo-overlay-modal');
  const demoOverlayIframe = document.getElementById('demo-overlay-iframe');
  const demoOverlayTitle = document.getElementById('demo-overlay-title');
  const closeDemoOverlayBtn = document.getElementById('close-demo-overlay');

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('preview-overlay-btn')) {
      const url = e.target.getAttribute('data-url');
      const title = e.target.getAttribute('data-title');
      if (demoOverlayModal && demoOverlayIframe) {
        demoOverlayIframe.src = url;
        if (demoOverlayTitle) demoOverlayTitle.textContent = title;
        demoOverlayModal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  if (closeDemoOverlayBtn && demoOverlayModal) {
    closeDemoOverlayBtn.addEventListener('click', () => {
      demoOverlayModal.classList.remove('is-active');
      if (demoOverlayIframe) demoOverlayIframe.src = '';
      document.body.style.overflow = '';
    });
  }

  /* --------------------------------------------------------------------------
     5. AUTOMATION WORKFLOW PLAYGROUND (SECTION 4)
     -------------------------------------------------------------------------- */
  const scenarioTabsContainer = document.getElementById('scenario-tabs');
  const workflowNodesContainer = document.getElementById('workflow-nodes');
  const scenarioBadge = document.getElementById('playground-scenario-badge');
  const stepStatusText = document.getElementById('playground-step-status');

  let activeScenarioIndex = 0;
  let activeStepIndex = 0;
  let stepTimer = null;
  const scenarios = config.workflowScenarios || [];

  function renderScenarioTabs() {
    if (!scenarioTabsContainer || scenarios.length === 0) return;

    scenarioTabsContainer.innerHTML = '';
    scenarios.forEach((sc, index) => {
      const tab = document.createElement('button');
      tab.className = `scenario-tab-btn ${index === 0 ? 'active' : ''}`;
      tab.innerHTML = `<span>${sc.icon}</span> <span>${sc.title}</span>`;
      tab.addEventListener('click', () => selectScenario(index));
      scenarioTabsContainer.appendChild(tab);
    });

    renderWorkflowNodes(0);
  }

  function selectScenario(index) {
    if (index < 0 || index >= scenarios.length) return;
    activeScenarioIndex = index;

    const tabs = scenarioTabsContainer.querySelectorAll('.scenario-tab-btn');
    tabs.forEach((tab, i) => {
      if (i === activeScenarioIndex) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    renderWorkflowNodes(activeScenarioIndex);
  }

  function renderWorkflowNodes(scIndex) {
    if (!workflowNodesContainer || !scenarios[scIndex]) return;
    const currentSc = scenarios[scIndex];

    if (scenarioBadge) scenarioBadge.textContent = currentSc.badge;
    workflowNodesContainer.innerHTML = '';

    currentSc.steps.forEach((step, i) => {
      const card = document.createElement('div');
      card.className = `node-card ${i === 0 ? 'active-step' : ''}`;
      card.setAttribute('data-step', i);
      card.innerHTML = `
        <div class="node-step-tag">Step ${i + 1}: ${step.label}</div>
        <h4 class="node-title">${step.title}</h4>
        <p class="node-detail">${step.detail}</p>
      `;
      workflowNodesContainer.appendChild(card);
    });

    activeStepIndex = 0;
    updateStepHighlighting();
    startStepAnimation();
  }

  function updateStepHighlighting() {
    const nodeCards = workflowNodesContainer.querySelectorAll('.node-card');
    nodeCards.forEach((card, i) => {
      if (i === activeStepIndex) {
        card.classList.add('active-step');
      } else {
        card.classList.remove('active-step');
      }
    });

    const currentSc = scenarios[activeScenarioIndex];
    if (stepStatusText && currentSc && currentSc.steps[activeStepIndex]) {
      stepStatusText.textContent = `Active Step: ${currentSc.steps[activeStepIndex].title}`;
    }
  }

  function startStepAnimation() {
    if (stepTimer) clearInterval(stepTimer);
    stepTimer = setInterval(() => {
      const currentSc = scenarios[activeScenarioIndex];
      if (!currentSc) return;
      activeStepIndex = (activeStepIndex + 1) % currentSc.steps.length;
      updateStepHighlighting();
    }, 3000);
  }

  renderScenarioTabs();

  /* Capability Cloud Grid Renderer */
  const capabilityGrid = document.getElementById('capability-grid');
  if (capabilityGrid && config.capabilityCategories) {
    capabilityGrid.innerHTML = '';
    config.capabilityCategories.forEach(cap => {
      const tile = document.createElement('div');
      tile.className = 'capability-tile';
      tile.innerHTML = `
        <span class="capability-icon">${cap.icon}</span>
        <span class="capability-text">${cap.title}</span>
      `;
      capabilityGrid.appendChild(tile);
    });

    // Append final open-ended tile
    const openTile = document.createElement('div');
    openTile.className = 'capability-tile capability-tile-open';
    openTile.innerHTML = `
      <span class="capability-icon">✨</span>
      <span class="capability-text">…and anything else you can describe</span>
    `;
    capabilityGrid.appendChild(openTile);
  }

  /* --------------------------------------------------------------------------
     6. PROCESS SECTION SCROLL PROGRESS LINE (SECTION 5)
     -------------------------------------------------------------------------- */
  const processSection = document.getElementById('process');
  const processProgressFill = document.getElementById('process-progress-fill');

  function updateProcessProgress() {
    if (!processSection || !processProgressFill) return;

    const rect = processSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const percent = Math.min(Math.max((currentScroll / totalScrollable) * 100, 0), 100);
      processProgressFill.style.width = `${percent}%`;
    }
  }

  /* --------------------------------------------------------------------------
     7. FAQ ACCORDION (SECTION 8)
     -------------------------------------------------------------------------- */
  const faqContainer = document.getElementById('faq-accordion');
  if (faqContainer && config.faqs) {
    faqContainer.innerHTML = '';
    config.faqs.forEach((item, index) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
      faqItem.innerHTML = `
        <button class="faq-question-btn" aria-expanded="false" aria-controls="faq-ans-${index}">
          <span>${item.q}</span>
          <svg class="faq-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div id="faq-ans-${index}" class="faq-answer-panel" role="region">
          <p class="faq-answer-text">${item.a}</p>
        </div>
      `;

      const btn = faqItem.querySelector('.faq-question-btn');
      const panel = faqItem.querySelector('.faq-answer-panel');

      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Close other open accordions for clean accordion UX
        document.querySelectorAll('.faq-question-btn').forEach(otherBtn => {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherPanel = otherBtn.nextElementSibling;
          if (otherPanel) otherPanel.style.maxHeight = null;
          otherBtn.closest('.faq-item').classList.remove('is-active');
        });

        if (!isExpanded) {
          btn.setAttribute('aria-expanded', 'true');
          faqItem.classList.add('is-active');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });

      faqContainer.appendChild(faqItem);
    });
  }

  /* --------------------------------------------------------------------------
     8. BOOKING FORM & CALENDLY TOGGLE (SECTION 9)
     -------------------------------------------------------------------------- */
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccessMsg = document.getElementById('form-success-message');
  const modeFormBtn = document.getElementById('mode-form-btn');
  const modeCalendlyBtn = document.getElementById('mode-calendly-btn');
  const formContainer = document.getElementById('booking-form-container');
  const calendlyContainer = document.getElementById('calendly-embed-container');

  if (modeFormBtn && modeCalendlyBtn && formContainer && calendlyContainer) {
    modeFormBtn.addEventListener('click', () => {
      modeFormBtn.classList.add('active');
      modeCalendlyBtn.classList.remove('active');
      formContainer.style.display = 'block';
      calendlyContainer.classList.remove('active');
    });

    modeCalendlyBtn.addEventListener('click', () => {
      modeCalendlyBtn.classList.add('active');
      modeFormBtn.classList.remove('active');
      formContainer.style.display = 'none';
      calendlyContainer.classList.add('active');
    });
  }

  if (bookingForm) {
    // Set form endpoint from config
    if (config.business.formEndpoint) {
      bookingForm.action = config.business.formEndpoint;
    }

    bookingForm.addEventListener('submit', (e) => {
      // Prevent default for smooth inline experience if using Formspree AJAX or instant confirmation mock
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }

      // Simulate network dispatch / Formspree AJAX
      const formData = new FormData(bookingForm);
      fetch(bookingForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(() => {
        showSuccessState();
      }).catch(() => {
        // Fallback success state for user demo
        showSuccessState();
      });
    });
  }

  function showSuccessState() {
    if (bookingForm && bookingSuccessMsg) {
      bookingForm.style.display = 'none';
      bookingSuccessMsg.classList.add('active');
    }
  }

  /* --------------------------------------------------------------------------
     9. PRIVACY CONSENT TOAST
     -------------------------------------------------------------------------- */
  const privacyToast = document.getElementById('privacy-toast');
  const acceptPrivacyBtn = document.getElementById('accept-privacy-btn');

  if (privacyToast && acceptPrivacyBtn) {
    if (localStorage.getItem('aih_cookie_consent') === 'accepted') {
      privacyToast.style.display = 'none';
    }

    acceptPrivacyBtn.addEventListener('click', () => {
      localStorage.setItem('aih_cookie_consent', 'accepted');
      privacyToast.style.display = 'none';
    });
  }
});
