// ==========================================================================
// SPLASH SCREEN CONTROLLER
// Minimal JS: waits for full page load + 3s minimum, then exits gracefully.
// ==========================================================================
(function() {
    const SPLASH_MIN_MS = 3000;
    const splashStart = Date.now();

    window.addEventListener('load', function() {
        const elapsed = Date.now() - splashStart;
        const remaining = Math.max(0, SPLASH_MIN_MS - elapsed);

        setTimeout(function() {
            const splash = document.getElementById('splash-screen');
            if (!splash) return;

            // Trigger CSS exit transition
            splash.classList.add('splash-exit');

            // After transition ends, remove from DOM and unlock scroll
            splash.addEventListener('transitionend', function handler() {
                splash.removeEventListener('transitionend', handler);
                splash.remove();
                document.body.classList.remove('overflow-hidden');
            });
        }, remaining);
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    // 1. STICKY NAVBAR ON SCROLL
    // Toggles the 'scrolled' class on the navbar for visual feedback and padding changes
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        // Use passive listener for scroll event to improve frame-rates (non-blocking)
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run once on load to catch correct state
        handleScroll();
    }

    // 1b. LOGO CLICK → SCROLL TO TOP (HERO)
    const navLogo = document.querySelector('.navbar a[href="#hero"]');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. MOBILE MENU TOGGLE WITH ACCESSIBILITY
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        const toggleMenu = () => {
            const isActive = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        };

        menuToggle.addEventListener('click', toggleMenu);

        // Close mobile drawer when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu if user clicks outside of it on mobile
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
    // Animates elements gracefully as they enter the viewport
    const revealElements = document.querySelectorAll('.reveal, .reveal-blur, .image-expand-container');
    if (revealElements.length > 0) {
        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once the animation has been triggered to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealOnScroll.observe(element);
        });
    }

    // 4. ANIMATE STEP BADGES ON TIMELINE HOVER
    const steps = document.querySelectorAll('.process-step');
    if (steps.length > 0) {
        steps.forEach(step => {
            step.addEventListener('mouseenter', () => {
                // Remove active class from all steps
                steps.forEach(s => s.classList.remove('active'));
                // Set hover target as the active step
                step.classList.add('active');
            });
        });
    }

    // 5. HERO HIGH-TECH CAROUSEL SLIDESHOW
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        let currentSlide = 0;
        const totalSlides = slides.length;
        const slideInterval = 4000; // 4 seconds

        const labelText = carousel.querySelector('#carousel-label-text');
        const showSlide = (index) => {
            slides.forEach((slide, idx) => {
                if (idx === index) {
                    slide.classList.add('opacity-100', 'scale-100', 'z-10');
                    slide.classList.remove('opacity-0', 'scale-95', 'z-0');
                    slide.style.clipPath = 'circle(150% at 50% 50%)';

                    // Update fixed label text dynamically with a fade animation
                    if (labelText) {
                        const projectName = slide.getAttribute('data-project');
                        labelText.classList.add('opacity-0');
                        setTimeout(() => {
                            labelText.textContent = projectName;
                            labelText.classList.remove('opacity-0');
                        }, 200);
                    }
                } else {
                    slide.classList.remove('opacity-100', 'scale-100', 'z-10');
                    slide.classList.add('opacity-0', 'scale-95', 'z-0');
                    slide.style.clipPath = 'circle(0% at 50% 50%)';
                }
            });

            // Update dots
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.add('bg-brand-turquoise', 'w-4');
                    dot.classList.remove('bg-white/40');
                } else {
                    dot.classList.remove('bg-brand-turquoise', 'w-4');
                    dot.classList.add('bg-white/40');
                }
            });
            currentSlide = index;
        };

        // Initialize first slide transition
        showSlide(0);

        const nextSlide = () => {
            let next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        };

        let intervalId = setInterval(nextSlide, slideInterval);

        // Click on dots to navigate directly
        dots.forEach((dot, idx) => {
            dot.classList.add('cursor-pointer');
            dot.addEventListener('click', () => {
                clearInterval(intervalId);
                showSlide(idx);
                intervalId = setInterval(nextSlide, slideInterval);
            });
        });
    }

    // 6. PREMIUM CUSTOM CURSOR INTERACTIVE DRAG WITH LERP
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorRing = document.getElementById('custom-cursor-ring');
    
    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0; // Mouse absolute coordinates
        let dotX = 0, dotY = 0;     // Dot current coordinates
        let ringX = 0, ringY = 0;   // Ring current coordinates
        let hasMoved = false;
        
        // Listen to mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!hasMoved) {
                // Fade in on first movement
                cursorDot.classList.remove('opacity-0');
                cursorRing.classList.remove('opacity-0');
                document.body.classList.add('custom-cursor-active');
                hasMoved = true;
            }
        });
        
        // Butter-smooth lerp (linear interpolation) animation loop
        const animateCursor = () => {
            // Dot follows mouse directly
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            
            // Ring follows with a high inertia/smooth lag (lerp ratio: 0.15)
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        
        // Hide custom cursor when mouse leaves document viewport (e.g. window borders)
        document.addEventListener('mouseleave', () => {
            cursorDot.classList.add('opacity-0');
            cursorRing.classList.add('opacity-0');
            document.body.classList.remove('custom-cursor-active');
            hasMoved = false;
        });

        // Add hovering feedback for all interactive elements
        const updateHoverables = () => {
            const hoverables = document.querySelectorAll('a, button, .btn, .carousel-dot, .process-step, [role="button"], input, textarea');
            hoverables.forEach(el => {
                // Avoid duplicating listeners
                if (el.dataset.cursorBound) return;
                el.dataset.cursorBound = "true";
                
                el.addEventListener('mouseenter', () => {
                    cursorRing.classList.add('hovering');
                    cursorDot.classList.add('hovering');
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorRing.classList.remove('hovering');
                    cursorDot.classList.remove('hovering');
                });
            });
        };
        
        // Initial binding
        updateHoverables();
        
        // Add dark section feedback for cursor
        const updateDarkSections = () => {
            const darkSections = document.querySelectorAll('.bg-brand-charcoal, .bg-brand-charcoal-light, .bg-black');
            darkSections.forEach(el => {
                if (el.dataset.cursorDarkBound) return;
                el.dataset.cursorDarkBound = "true";
                
                el.addEventListener('mouseenter', () => {
                    cursorDot.classList.remove('bg-brand-charcoal');
                    cursorDot.classList.add('bg-brand-turquoise');
                    cursorRing.classList.remove('border-brand-charcoal/20');
                    cursorRing.classList.add('border-brand-turquoise/50');
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorDot.classList.remove('bg-brand-turquoise');
                    cursorDot.classList.add('bg-brand-charcoal');
                    cursorRing.classList.remove('border-brand-turquoise/50');
                    cursorRing.classList.add('border-brand-charcoal/20');
                });
            });
        };
        updateDarkSections();
        
        // Re-bind in case elements are added dynamically
        const observer = new MutationObserver(() => {
            updateHoverables();
            updateDarkSections();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // 7. INITIALIZE VANILLA-TILT.JS FOR 3D PARALLAX EFFECT ON COLLECTION CARDS
    if (typeof VanillaTilt !== 'undefined') {
        const tiltCards = document.querySelectorAll('.tilt-card');
        if (tiltCards.length > 0) {
            VanillaTilt.init(tiltCards, {
                max: 6,               // Very gentle tilt angle (was 12)
                speed: 1000,          // Slower, smoother speed transition (was 600)
                perspective: 2000,    // Flatter 3D perspective depth (was 1000)
                scale: 1.01,          // Micro scale up on hover (was 1.02)
                glare: true,          // Enable glare reflection
                "max-glare": 0.08,    // Subtle glare opacity limit (was 0.15)
                axis: null,           // Enable both X and Y axis tilt
                reset: true,          // Reset tilt on mouse leave
                easing: "cubic-bezier(.03,.98,.52,.99)" // Premium fluid transition curve
            });
        }
    }

    // 8. STAGGERED WORD ENTRANCE ANIMATION FOR HERO H1
    const wordSpans = document.querySelectorAll('.hero-title .word-span, .hero-title .word-span-special');
    if (wordSpans.length > 0) {
        wordSpans.forEach((span, idx) => {
            // Calculate a clean, subtle 70ms staggered delay starting from 100ms
            span.style.animationDelay = `${(idx * 70) + 100}ms`;
        });
    }
});

// 9. CAL.COM EMBED WIDGET INITIALIZATION AND AUTO-BINDING
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

// Initialize Cal.com with 'diagnostico' namespace
Cal("init", "diagnostico", { origin: "https://cal.com" });

// Configure UI styling for the 'diagnostico' namespace
Cal("ns.diagnostico", "ui", {
  styles: {
    branding: {
      brandColor: "#02D4D5"
    }
  },
  hideEventTypeDetails: false,
  layout: "month_view"
});

// Explicit click listener binding to guarantee popups open on all buttons/links
const initCalTriggers = () => {
    document.querySelectorAll('[data-cal-link]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const link = btn.getAttribute('data-cal-link');
            const ns = btn.getAttribute('data-cal-namespace') || 'diagnostico';
            
            if (ns) {
                Cal(`ns.${ns}`, "show", {
                    type: "popup",
                    calLink: link
                });
            } else {
                Cal("show", {
                    type: "popup",
                    calLink: link
                });
            }
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalTriggers);
} else {
    initCalTriggers();
}


// ==========================================================================
// LETRERÍA ILUMINADA MINI CAROUSEL
// Auto-rotates 3 images with a fade effect every 3 seconds
// ==========================================================================
(function() {
    function initLetreriaCarousel() {
        const slides = document.querySelectorAll('.letreria-slide');
        if (slides.length < 2) return;
        
        let current = 0;
        
        setInterval(() => {
            slides[current].style.opacity = '0';
            current = (current + 1) % slides.length;
            slides[current].style.opacity = '1';
        }, 3000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLetreriaCarousel);
    } else {
        initLetreriaCarousel();
    }
})();

// ==========================================================================
// VISITAS A OBRA MINI CAROUSEL
// Auto-rotates 2 images with a fade effect every 3 seconds
// ==========================================================================
(function() {
    function initVisitaCarousel() {
        const slides = document.querySelectorAll('.visita-slide');
        if (slides.length < 2) return;
        
        let current = 0;
        
        setInterval(() => {
            slides[current].style.opacity = '0';
            current = (current + 1) % slides.length;
            slides[current].style.opacity = '1';
        }, 3000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVisitaCarousel);
    } else {
        initVisitaCarousel();
    }
})();

// ==========================================================================
// MUEBLES CORPORATIVOS MINI CAROUSEL
// Auto-rotates 4 images with a fade effect every 3 seconds
// ==========================================================================
(function() {
    function initMueblesCarousel() {
        const slides = document.querySelectorAll('.muebles-slide');
        if (slides.length < 2) return;
        
        let current = 0;
        
        setInterval(() => {
            slides[current].style.opacity = '0';
            current = (current + 1) % slides.length;
            slides[current].style.opacity = '1';
        }, 3000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMueblesCarousel);
    } else {
        initMueblesCarousel();
    }
})();

// ==========================================================================
// BOOKING SUCCESS MODAL CONTROLLER & CAL.COM EVENT LISTENER
// Opens a modal asking for wire transfer proof once Cal.com emits a successful booking event.
// ==========================================================================
(function() {
    function showBookingSuccessModal() {
        const modal = document.getElementById('booking-success-modal');
        const content = document.getElementById('booking-success-content');
        if (!modal || !content) return;
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95');
    }

    function hideBookingSuccessModal() {
        const modal = document.getElementById('booking-success-modal');
        const content = document.getElementById('booking-success-content');
        if (!modal || !content) return;
        
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.add('scale-95');
    }

    // Bind UI actions
    function initModalTriggers() {
        const closeBtn = document.getElementById('close-booking-modal');
        const confirmBtn = document.getElementById('confirm-booking-modal');
        
        if (closeBtn) closeBtn.addEventListener('click', hideBookingSuccessModal);
        if (confirmBtn) confirmBtn.addEventListener('click', hideBookingSuccessModal);
    }

    // Listen to Cal.com events
    window.addEventListener("message", (event) => {
        if (event.data && typeof event.data === 'object') {
            const type = event.data.type || event.data.action;
            if (type === 'cal:bookingSuccessful' || type === 'bookingSuccessful') {
                showBookingSuccessModal();
            }
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModalTriggers);
    } else {
        initModalTriggers();
    }
})();

// ==========================================================================
// MAMPARAS METÁLICAS MINI CAROUSEL
// Auto-rotates 2 images with a fade effect every 3 seconds
// ==========================================================================
(function() {
    function initMamparaCarousel() {
        const slides = document.querySelectorAll('.mampara-slide');
        if (slides.length < 2) return;
        
        let current = 0;
        
        setInterval(() => {
            slides[current].style.opacity = '0';
            current = (current + 1) % slides.length;
            slides[current].style.opacity = '1';
        }, 3000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMamparaCarousel);
    } else {
        initMamparaCarousel();
    }
})();

// ==========================================================================
// MAROZ LAB MINI CAROUSEL
// Auto-rotates 5 images with a fade effect every 3 seconds
// ==========================================================================
(function() {
    function initLabCarousel() {
        const slides = document.querySelectorAll('.lab-slide');
        if (slides.length < 2) return;
        
        let current = 0;
        
        setInterval(() => {
            slides[current].style.opacity = '0';
            current = (current + 1) % slides.length;
            slides[current].style.opacity = '1';
        }, 3000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLabCarousel);
    } else {
        initLabCarousel();
    }
})();

// ==========================================================================
// QUIÉNES SOMOS MINI CAROUSEL
// Auto-rotates 2 images with a fade effect every 3 seconds
// ==========================================================================
(function() {
    function initQuienesCarousel() {
        const slides = document.querySelectorAll('.quienes-slide');
        if (slides.length < 2) return;
        
        let current = 0;
        
        setInterval(() => {
            slides[current].style.opacity = '0';
            current = (current + 1) % slides.length;
            slides[current].style.opacity = '1';
        }, 3000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuienesCarousel);
    } else {
        initQuienesCarousel();
    }
})();

// ==========================================================================
// WHATSAPP OPTIONS MODAL TRIGGER
// Intercepts all clicks on the old WhatsApp number and provides two contact options
// ==========================================================================
(function() {
    const modal = document.getElementById('whatsapp-modal');
    const content = document.getElementById('whatsapp-modal-content');
    const link1 = document.getElementById('whatsapp-link-1');
    const link2 = document.getElementById('whatsapp-link-2');
    const closeBtn = document.getElementById('close-whatsapp-modal');
    
    if (!modal || !content || !link1 || !link2) return;

    function showWhatsappModal(textParam) {
        const decodedText = textParam ? decodeURIComponent(textParam) : '';
        const encodedText = decodedText ? `?text=${encodeURIComponent(decodedText)}` : '';
        link1.href = `https://wa.me/56957728882${encodedText}`;
        link2.href = `https://wa.me/56942877216${encodedText}`;
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95');
    }

    function hideWhatsappModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.add('scale-95');
    }

    // Intercept clicks on all links going to the old WhatsApp number
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a');
        if (anchor && anchor.href && anchor.href.includes('wa.me/56982281464')) {
            e.preventDefault();
            
            // Extract the query text parameter
            let textParam = '';
            try {
                const url = new URL(anchor.href);
                textParam = url.searchParams.get('text') || '';
            } catch (err) {
                const match = anchor.href.match(/[?&]text=([^&#]*)/);
                if (match) {
                    textParam = match[1];
                }
            }
            
            showWhatsappModal(textParam);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', hideWhatsappModal);
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideWhatsappModal();
        }
    });
})();
