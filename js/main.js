/* main.js - site behavior */
(() => {
  'use strict';

  // App State
  const App = {
    isLoaded: false,
    isSubmitting: false,
    currentSection: 'hero'
  };

  // Utility Functions
  const Utils = {
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    showNotification(title, message, type = 'success') {
      const notification = document.getElementById('notification');
      if (!notification) return;

      const titleEl = document.getElementById('notificationTitle');
      const messageEl = document.getElementById('notificationMessage');
      const icon = notification.querySelector('i');

      titleEl.textContent = title;
      messageEl.textContent = message;

      icon.className = type === 'success'
        ? 'fas fa-check-circle text-green-400 text-2xl mr-3'
        : 'fas fa-exclamation-circle text-red-400 text-2xl mr-3';

      notification.classList.add('show');

      window.setTimeout(() => {
        notification.classList.remove('show');
      }, 5000);
    },

    animateSkills() {
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        window.setTimeout(() => {
          bar.style.width = `${width}%`;
        }, 200);
      });
    },

    applyBrandText() {
      document.querySelectorAll('.brand-text').forEach((el) => {
        el.textContent = '<cpnnabin/>';
      });
    }
  };

  // DOM Elements
  const Elements = {
    loading: null,
    navbar: null,
    menuBtn: null,
    mobileMenu: null,
    backToTop: null,
    contactForm: null,
    currentYear: null
  };

  const Handlers = {
    init() {
      Elements.loading = document.getElementById('loading');
      Elements.navbar = document.getElementById('navbar');
      Elements.menuBtn = document.getElementById('menuBtn');
      Elements.mobileMenu = document.getElementById('mobileMenu');
      Elements.backToTop = document.getElementById('backToTop');
      Elements.contactForm = document.getElementById('contactForm');
      Elements.currentYear = document.getElementById('currentYear');

      // Brand
      Utils.applyBrandText();

      // Year
      if (Elements.currentYear) {
        Elements.currentYear.textContent = new Date().getFullYear();
      }

      // Loading screen
      window.addEventListener('load', Handlers.onLoad);

      // Mobile menu
      if (Elements.menuBtn) {
        Elements.menuBtn.addEventListener('click', Handlers.toggleMobileMenu);
      }

      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', Handlers.smoothScroll);
      });

      // Back to top
      if (Elements.backToTop) {
        Elements.backToTop.addEventListener('click', Handlers.scrollToTop);
      }

      // Scroll events
      window.addEventListener('scroll', Utils.debounce(Handlers.onScroll, 100));

      // Form submission
      if (Elements.contactForm) {
        Elements.contactForm.addEventListener('submit', Handlers.handleFormSubmit);
      }

      // Skill animation on scroll
      const skillsSection = document.getElementById('skills');
      if (skillsSection && 'IntersectionObserver' in window) {
        const skillsObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) Utils.animateSkills();
          });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
      }

      // Fade in animation for sections
      const sections = document.querySelectorAll('section');
      if (sections.length && 'IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
          });
        }, { threshold: 0.1 });

        sections.forEach((section) => fadeObserver.observe(section));
      }
    },

    onLoad() {
      if (!Elements.loading) return;
      window.setTimeout(() => {
        Elements.loading.style.opacity = '0';
        window.setTimeout(() => {
          Elements.loading.style.display = 'none';
          App.isLoaded = true;
        }, 500);
      }, 900);
    },

    toggleMobileMenu() {
      if (!Elements.mobileMenu || !Elements.menuBtn) return;

      const isHidden = Elements.mobileMenu.classList.contains('hidden');
      Elements.mobileMenu.classList.toggle('hidden');
      Elements.menuBtn.setAttribute('aria-expanded', String(isHidden));

      const icon = Elements.menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    },

    smoothScroll(e) {
      const targetId = e.currentTarget.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      if (Elements.mobileMenu && !Elements.mobileMenu.classList.contains('hidden')) {
        Handlers.toggleMobileMenu();
      }

      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    },

    onScroll() {
      const scrollY = window.scrollY;

      if (Elements.backToTop) {
        if (scrollY > 300) Elements.backToTop.classList.remove('hidden');
        else Elements.backToTop.classList.add('hidden');
      }

      if (Elements.navbar) {
        if (scrollY > 50) Elements.navbar.classList.add('bg-gray-900/90');
        else Elements.navbar.classList.remove('bg-gray-900/90');
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async handleFormSubmit(e) {
      e.preventDefault();
      if (App.isSubmitting) return;

      const formData = new FormData(Elements.contactForm);
      const data = Object.fromEntries(formData);

      let isValid = true;
      const errors = [];

      if (!data.name || data.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
        isValid = false;
      }

      if (!data.email || !Utils.validateEmail(data.email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
        isValid = false;
      }

      if (!data.subject || data.subject.trim().length < 5) {
        errors.push({ field: 'subject', message: 'Subject must be at least 5 characters' });
        isValid = false;
      }

      if (!data.message || data.message.trim().length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
        isValid = false;
      }

      document.querySelectorAll('.error-message').forEach((el) => {
        el.textContent = '';
        el.classList.add('hidden');
      });

      if (!isValid) {
        errors.forEach((error) => {
          const field = document.getElementById(error.field);
          if (!field) return;
          const errorEl = field.parentNode.querySelector('.error-message');
          if (!errorEl) return;
          errorEl.textContent = error.message;
          errorEl.classList.remove('hidden');
        });
        return;
      }

      App.isSubmitting = true;
      const submitBtn = Elements.contactForm.querySelector('button[type="submit"]');
      const submitText = submitBtn?.querySelector('.submit-text');
      const submitLoading = submitBtn?.querySelector('.submit-loading');

      if (submitBtn) submitBtn.disabled = true;
      submitText?.classList.add('hidden');
      submitLoading?.classList.remove('hidden');

      try {
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
        Utils.showNotification('Success!', "Your message has been sent. I'll get back to you soon.", 'success');
        Elements.contactForm.reset();
      } catch {
        Utils.showNotification('Error!', 'Something went wrong. Please try again later.', 'error');
      } finally {
        App.isSubmitting = false;
        if (submitBtn) submitBtn.disabled = false;
        submitText?.classList.remove('hidden');
        submitLoading?.classList.add('hidden');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', Handlers.init);
})();
