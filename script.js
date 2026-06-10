/* ============================================
   REETHIK V — Premium Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Intro Animation ---
  const introOverlay = document.getElementById('intro-overlay');
  const introText = document.getElementById('intro-text');
  const fullName = 'REETHIK V';
  let charIndex = 0;

  function typeIntro() {
    if (charIndex <= fullName.length) {
      introText.textContent = fullName.substring(0, charIndex);
      charIndex++;
      const delay = charIndex <= 1 ? 200 : 100;
      setTimeout(typeIntro, delay);
    } else {
      setTimeout(() => {
        introOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        // Start reveal animations after intro
        setTimeout(initRevealAnimations, 300);
      }, 400);
    }
  }

  // Prevent scrolling during intro
  document.body.style.overflow = 'hidden';
  setTimeout(typeIntro, 300);

  // --- Sticky Navigation ---
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Nav background
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Menu ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  // --- Scroll Reveal Animations ---
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after reveal
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      // Build mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:vreethik.12@gmail.com?subject=${subject}&body=${body}`;

      contactForm.reset();
    });
  }

  // --- Parallax Effect for Hero (subtle) ---
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          const opacity = 1 - scrollY / (window.innerHeight * 0.8);
          const translateY = scrollY * 0.3;
          heroContent.style.opacity = Math.max(opacity, 0);
          heroContent.style.transform = `translateY(${translateY}px)`;
        }
      },
      { passive: true }
    );
  }
});
