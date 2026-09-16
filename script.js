// Portfolio JavaScript - Full Functionality
// Handles loader, scroll reveal animations, mobile menu, cursor effects, and CRT background

(function() {
  'use strict';

  // ==================== CONFIGURATION ====================
  const config = {
    loaderDuration: 2400,
    revealDelay: 100,
    revealDistance: 26,
    revealDuration: 800,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isMobile: window.innerWidth <= 768,
    supportsWebGL: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    })()
  };

  // ==================== LOADER ====================
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    if (config.prefersReducedMotion) {
      loader.style.display = 'none';
      return;
    }

    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, config.loaderDuration);
  }

  // ==================== SCROLL REVEAL ====================
  function initScrollReveal() {
    if (config.prefersReducedMotion) {
      // Show all reveal elements immediately
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve to prevent re-triggering
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      observer.observe(el);
    });
  }

  // ==================== MOBILE MENU ====================
  function initMobileMenu() {
    const menuBtn = document.querySelector('.menu');
    const nav = document.querySelector('nav');
    
    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  }

  // ==================== CURSOR EFFECT ====================
  function initCursorEffect() {
    if (config.isMobile || config.prefersReducedMotion) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (!cursorDot || !cursorRing) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function updateRing() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';

      requestAnimationFrame(updateRing);
    }

    updateRing();

    // Hide custom cursor on mobile or when interacting
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
  }

  // ==================== CRT BACKGROUND (CANVAS) ====================
  function initCRTBackground() {
    const canvas = document.getElementById('crt-canvas');
    if (!canvas) return;

    // Don't run expensive canvas animation if reduced motion is preferred
    if (config.prefersReducedMotion) {
      canvas.style.display = 'none';
      return;
    }

    // Only run on desktop
    if (config.isMobile) {
      canvas.style.display = 'none';
      return;
    }

    // Fallback if WebGL not supported
    if (!config.supportsWebGL) {
      canvas.style.display = 'none';
      return;
    }

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        canvas.style.display = 'none';
        return;
      }

      // Set canvas size
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      let animationFrameId;
      let isPageHidden = false;

      // Pause animation when tab is hidden
      document.addEventListener('visibilitychange', () => {
        isPageHidden = document.hidden;
      });

      // Simple CRT effect: animated noise/scanlines
      function drawCRTEffect() {
        if (isPageHidden) {
          animationFrameId = requestAnimationFrame(drawCRTEffect);
          return;
        }

        // Clear canvas with dark background
        ctx.fillStyle = 'rgba(3, 8, 19, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw subtle noise
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 10;
          data[i] += noise;     // R
          data[i + 1] += noise; // G
          data[i + 2] += noise; // B
          // Keep alpha unchanged
        }

        ctx.putImageData(imageData, 0, 0);

        // Draw horizontal scanlines
        ctx.strokeStyle = 'rgba(114, 231, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        animationFrameId = requestAnimationFrame(drawCRTEffect);
      }

      // Handle window resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }, 250);
      });

      drawCRTEffect();
    } catch (e) {
      // Silently fail if canvas operations fail
      canvas.style.display = 'none';
    }
  }

  // ==================== SMOOTH SCROLL ====================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ==================== ACCESSIBILITY ====================
  function initAccessibility() {
    // Ensure all interactive elements are keyboard accessible
    document.querySelectorAll('a, button').forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });

    // Add visible focus states via CSS (done via style.css)
  }

  // ==================== INITIALIZATION ====================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }

  function run() {
    try {
      initLoader();
      initScrollReveal();
      initMobileMenu();
      initCursorEffect();
      initCRTBackground();
      initSmoothScroll();
      initAccessibility();
    } catch (e) {
      // Fail silently - don't break the page
      console.error('Portfolio initialization error:', e);
    }
  }

  // Start initialization
  init();
})();
