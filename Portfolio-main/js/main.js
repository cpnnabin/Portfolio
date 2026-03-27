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

  document.addEventListener('DOMContentLoaded', () => {
    Handlers.init();
    renderEducationTimeline();
    renderSkills();
    renderProjects();
    renderExperience();
    renderSocialLinks();
  });

  // Fetch and render social links
  async function renderSocialLinks() {
    const container = document.getElementById('social-links-dynamic');
    if (!container) return;
    container.innerHTML = '';
    try {
      const res = await fetch('/api/social');
      if (!res.ok) throw new Error('Failed to fetch social links');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="text-gray-400">No social links found.</div>';
        return;
      }
      container.innerHTML = data.map(link => renderSocialLink(link)).join('');
    } catch (err) {
      container.innerHTML = `<div class="text-red-400">Error loading social links: ${err.message}</div>`;
    }
  }

  function renderSocialLink(link) {
    // link: { url, icon, color, label, ariaLabel }
    const color = link.color || 'gray';
    const icon = link.icon || 'fa-link';
    const aria = link.ariaLabel ? `aria-label="${link.ariaLabel}"` : '';
    return `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer"
         class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-${color}-400 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-${color}-500"
         ${aria}>
        <i class="${icon.includes('fab') || icon.includes('fas') ? icon : 'fab ' + icon} text-lg"></i>
      </a>
    `;
  }

  // Fetch and render skills
  async function renderSkills() {
    const container = document.getElementById('skills-dynamic');
    if (!container) return;
    container.innerHTML = '<div class="text-gray-400">Loading skills...</div>';
    try {
      const res = await fetch('/api/skills');
      if (!res.ok) throw new Error('Failed to fetch skills');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="text-gray-400">No skills found.</div>';
        return;
      }
      container.innerHTML = `
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${data.map(skillGroup => renderSkillGroup(skillGroup)).join('')}
        </div>
      `;
      Utils.animateSkills();
    } catch (err) {
      container.innerHTML = `<div class="text-red-400">Error loading skills: ${err.message}</div>`;
    }
  }

  function renderSkillGroup(group) {
    // group: { category, icon, color, skills: [{ name, percent }] }
    const color = group.color || 'blue';
    const icon = group.icon || 'fa-cogs';
    return `
      <div class="glass-effect p-8 rounded-2xl card-hover skill-card">
        <div class="w-16 h-16 bg-${color}-600/10 rounded-xl flex items-center justify-center mb-6">
          <i class="fas ${icon} text-${color}-400 text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-4">${group.category || ''}</h3>
        <div class="space-y-4">
          ${Array.isArray(group.skills) ? group.skills.map(skill => `
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-400">${skill.name}</span>
                <span class="text-${color}-400 font-medium">${skill.percent}%</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div class="bg-${color}-400 h-2 rounded-full skill-progress" style="--skill-width: ${skill.percent}%; width: 0%;" data-width="${skill.percent}"></div>
              </div>
            </div>
          `).join('') : ''}
        </div>
      </div>
    `;
  }

  // Fetch and render projects
  async function renderProjects() {
    const container = document.getElementById('projects-dynamic');
    if (!container) return;
    container.innerHTML = '<div class="text-gray-400">Loading projects...</div>';
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="text-gray-400">No projects found.</div>';
        return;
      }
      container.innerHTML = `
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${data.map(project => renderProjectCard(project)).join('')}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="text-red-400">Error loading projects: ${err.message}</div>`;
    }
  }

  function renderProjectCard(project) {
    // project: { title, description, tags, icon, color, link }
    const color = project.color || 'blue';
    const icon = project.icon || 'fa-cube';
    return `
      <article class="glass-effect rounded-2xl overflow-hidden card-hover">
        <div class="p-6">
          <div class="w-12 h-12 bg-${color}-600/10 rounded-lg flex items-center justify-center mb-4">
            <i class="fas ${icon} text-${color}-400 text-xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">${project.title || ''}</h3>
          <p class="text-gray-400 mb-4 leading-relaxed">${project.description || ''}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${Array.isArray(project.tags) ? project.tags.map(tag => `<span class="px-3 py-1 bg-${color}-600/10 text-${color}-400 rounded-full text-sm font-medium">${tag}</span>`).join('') : ''}
          </div>
          ${project.link ? `<a href="${project.link}" class="text-${color}-400 font-medium hover:text-${color}-300 inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-${color}-500 rounded px-1" target="_blank" rel="noopener">View Details <i class="fas fa-arrow-right ml-2"></i></a>` : ''}
        </div>
      </article>
    `;
  }

  // Fetch and render experience
  async function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;
    container.innerHTML = '<div class="text-gray-400">Loading experience...</div>';
    try {
      const res = await fetch('/api/experience');
      if (!res.ok) throw new Error('Failed to fetch experience');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="text-gray-400">No experience found.</div>';
        return;
      }
      container.innerHTML = `
        <div class="space-y-12">
          ${data.map((exp, i) => renderExperienceItem(exp, i)).join('')}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="text-red-400">Error loading experience: ${err.message}</div>`;
    }
  }

  function renderExperienceItem(exp, idx) {
    // exp: { title, company, description, period, tags, color, icon }
    const color = exp.color || 'blue';
    const icon = exp.icon || 'fa-briefcase';
    const leftSide = idx % 2 === 0;
    return `
      <div class="relative flex items-center">
        <div class="flex-1 pr-8 text-right">
          ${leftSide ? `<div class="text-gray-400 font-medium">${exp.period || ''}</div>` : experienceCard(exp, color, icon)}
        </div>
        <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-${color}-500 rounded-full border-4 border-gray-900"></div>
        <div class="flex-1 pl-8">
          ${leftSide ? experienceCard(exp, color, icon) : `<div class="text-gray-400 font-medium">${exp.period || ''}</div>`}
        </div>
      </div>
    `;
  }

  function experienceCard(exp, color, icon) {
    return `
      <div class="glass-effect p-6 rounded-2xl inline-block max-w-md">
        <div class="flex items-center mb-2">
          <div class="w-10 h-10 bg-${color}-600/10 rounded-lg flex items-center justify-center mr-3">
            <i class="fas ${icon} text-${color}-400"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold">${exp.title || ''}</h3>
            <p class="text-${color}-400">${exp.company || ''}</p>
          </div>
        </div>
        <p class="text-gray-400 mt-2 leading-relaxed">${exp.description || ''}</p>
        ${Array.isArray(exp.tags) && exp.tags.length ? `<div class="mt-3 flex flex-wrap gap-2 justify-end">${exp.tags.map(tag => `<span class="px-3 py-1 bg-${color}-600/10 text-${color}-400 rounded-full text-sm">${tag}</span>`).join('')}</div>` : ''}
      </div>
    `;
  }

  // Fetch and render education timeline
  async function renderEducationTimeline() {
    const container = document.getElementById('education-timeline');
    if (!container) return;
    container.innerHTML = '<div class="text-gray-400">Loading education...</div>';
    try {
      const res = await fetch('/api/education');
      if (!res.ok) throw new Error('Failed to fetch education');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="text-gray-400">No education data found.</div>';
        return;
      }
      // Render timeline
      container.innerHTML = `
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></div>
          <div class="space-y-12">
            ${data.map((edu, i) => renderEducationItem(edu, i)).join('')}
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="text-red-400">Error loading education: ${err.message}</div>`;
    }
  }

  // Helper to render a single education item
  function renderEducationItem(edu, idx) {
    // Color and icon logic based on type/level
    const colorMap = {
      'Pre-Primary': 'blue',
      'Early': 'purple',
      'Primary': 'green',
      'Secondary': 'green',
      'Science': 'blue',
      'Intern': 'purple',
      'BSc': 'green',
      'Bachelor': 'green',
      'default': 'blue'
    };
    const iconMap = {
      'Pre-Primary': 'fa-child',
      'Early': 'fa-book-open',
      'Primary': 'fa-school',
      'Secondary': 'fa-school',
      'Science': 'fa-atom',
      'Intern': 'fa-code-branch',
      'BSc': 'fa-graduation-cap',
      'Bachelor': 'fa-graduation-cap',
      'default': 'fa-graduation-cap'
    };
    // Guess color/icon from title/type
    let color = 'blue', icon = 'fa-graduation-cap';
    for (const key in colorMap) {
      if (edu.title && edu.title.includes(key)) {
        color = colorMap[key];
        icon = iconMap[key];
        break;
      }
    }
    // Timeline dot color
    const dotColor = `bg-${color}-500`;
    const borderColor = 'border-4 border-gray-900';
    // Side alternation
    const leftSide = idx % 2 === 0;
    return `
      <div class="relative flex items-center">
        <div class="flex-1 pr-8 text-right">
          ${leftSide ? `<div class="text-gray-400 font-medium">${edu.period || ''}</div>` : eduCard(edu, color, icon)}
        </div>
        <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${dotColor} rounded-full ${borderColor}"></div>
        <div class="flex-1 pl-8">
          ${leftSide ? eduCard(edu, color, icon) : `<div class="text-gray-400 font-medium">${edu.period || ''}</div>`}
        </div>
      </div>
    `;
  }

  function eduCard(edu, color, icon) {
    return `
      <div class="glass-effect p-6 rounded-2xl inline-block max-w-md">
        <div class="flex items-center mb-2">
          <div class="w-10 h-10 bg-${color}-600/10 rounded-lg flex items-center justify-center mr-3">
            <i class="fas ${icon} text-${color}-400"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold">${edu.title || ''}</h3>
            <p class="text-${color}-400">${edu.institution || ''}</p>
          </div>
        </div>
        <p class="text-gray-400 mt-2 leading-relaxed">${edu.location || ''}</p>
        <p class="text-gray-300 mt-1">${edu.description || ''}</p>
        ${Array.isArray(edu.tags) && edu.tags.length ? `<div class="mt-3 flex flex-wrap gap-2">${edu.tags.map(tag => `<span class="px-3 py-1 bg-${color}-600/10 text-${color}-400 rounded-full text-sm">${tag}</span>`).join('')}</div>` : ''}
      </div>
    `;
  }
})();
