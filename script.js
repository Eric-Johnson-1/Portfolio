/**
 * Eric Johnson — Web3 Full-Stack Engineer Portfolio
 * @fileoverview Main JavaScript entry point. Unified single-file architecture
 * maintaining functional modularity, strict JSDoc typing, and error boundaries.
 */

/* ==========================================================================
   #THEME TOGGLE
   ========================================================================== */

/**
 * Initializes the Light/Dark mode theme toggle button and applies saved preferences.
 * Dynamically toggles `aria-pressed` for accessibility parity.
 *
 * @throws {Error} Safely swallows localStorage quota/access exceptions without halting execution.
 * @returns {void}
 */
function initThemeToggle() {
  const toggle = document.createElement('button');
  toggle.className = 'theme-toggle';
  toggle.setAttribute('aria-label', 'Toggle dark mode');
  
  // Default UI setup
  toggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
  document.body.appendChild(toggle);

  let savedTheme = 'dark'; // Fallback default
  try {
    savedTheme = localStorage.getItem('theme') ?? 'dark';
  } catch (error) {
    console.warn('[Theme Setup]: localStorage access denied or unavailable.', error);
  }

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    toggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    toggle.setAttribute('aria-pressed', 'true');
  } else {
    toggle.setAttribute('aria-pressed', 'false');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    toggle.innerHTML = isDark
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-fill"></i>';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('[Theme Save]: Unable to save theme to localStorage.', error);
    }
  });
}

/* ==========================================================================
   #MOBILE NAVIGATION & FOCUS TRAP
   ========================================================================== */

/**
 * Injects and manages the mobile navigation menu overlay and focus states.
 * Embeds an aggressive focus trap to ensure WCAG keyboard parity.
 * 
 * @returns {void}
 */
function initMobileNav() {
  const burger = document.createElement('button');
  burger.className = 'mobile-nav-toggle';
  burger.setAttribute('aria-label', 'Toggle navigation');
  burger.innerHTML = '<i class="bi bi-list"></i>';
  burger.setAttribute('aria-expanded', 'false');
  document.body.appendChild(burger);

  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99;display:none;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)';
  document.body.appendChild(overlay);

  const openNav = () => {
    nav.classList.add('mobile-active');
    overlay.style.display = 'block';
    burger.innerHTML = '<i class="bi bi-x-lg"></i>';
    burger.setAttribute('aria-expanded', 'true');
    // Set focus to first menu item for a11y
    const firstLink = nav.querySelector('a');
    if (firstLink) firstLink.focus();
  };

  const closeNav = () => {
    nav.classList.remove('mobile-active');
    overlay.style.display = 'none';
    burger.innerHTML = '<i class="bi bi-list"></i>';
    burger.setAttribute('aria-expanded', 'false');
    burger.focus(); // Return focus to button intelligently
  };

  burger.addEventListener('click', () => {
    nav.classList.contains('mobile-active') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // A11y Focus Trap Definition
  document.addEventListener('keydown', (e) => {
    if (!nav.classList.contains('mobile-active')) return;
    
    if (e.key === 'Escape') {
      closeNav();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = nav.querySelectorAll('a[href]');
      if (!focusable.length) return;
      
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) { /* Shift + Tab */
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else { /* Tab */
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });
}

/* ==========================================================================
   #ANIMATION / INTERSECTION OBSERVERS
   ========================================================================== */

/**
 * Attaches IntersectionObserver to page sections to dynamically update active navigation links.
 * Employs modern Intersection Observer API over expensive native 'scroll' events.
 * 
 * @returns {void}
 */
function initNavScrollSpy() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const links = nav.querySelectorAll('a[href^="#"]');
  const sections = [];

  links.forEach((link) => {
    const targetId = link.getAttribute('href')?.slice(1);
    if (!targetId) return;
    
    const section = document.getElementById(targetId);
    if (section) {
      sections.push({ link, section });
    }

    // Smooth scroll bypass
    link.addEventListener('click', (e) => {
      e.preventDefault();
      section?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // IntersectionObserver for scroll spy
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = sections.find((s) => s.section === entry.target);
          if (match) {
            links.forEach((l) => l.classList.remove('active'));
            match.link.classList.add('active');
          }
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' },
  );

  sections.forEach(({ section }) => observer.observe(section));
}

/**
 * Initializes fade-in animations for section cards using IntersectionObserver.
 * Triggers hardware-accelerated CSS transitions once elements enter viewport.
 * 
 * @returns {void}
 */
function initSectionAnimations() {
  const allCards = Array.from(document.querySelectorAll('.section-card'));
  const cards = allCards.filter((card) => !['about', 'experience'].includes(card.id));

  if (!cards.length) return;

  // Progressively hide them via JS mapping
  cards.forEach((card) => card.classList.add('fade-hidden'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('fade-hidden');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate exactly once
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px 150px 0px' },
  );

  cards.forEach((card) => observer.observe(card));
}

/* ==========================================================================
   #DECORATIVE EFFECTS & PARTICLES
   ========================================================================== */

/**
 * Implements a lightweight 3D perspective mouse-tracking tilt effect for cards.
 * Uses high-performance CSS transforms to limit browser repaints.
 * 
 * @returns {void}
 */
function initGlassTiltEffect() {
  const cards = document.querySelectorAll('.project-card, .community-item, .stat-item');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      // Note: Use 'const' for strictly non-mutating variables
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/**
 * Generates and animates floating ambient particles in the background.
 * Uses a DocumentFragment for optimal DOM insertion speed, drastically reducing reflows.
 * 
 * @returns {void}
 */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const PARTICLE_COUNT = 30;

  // Use document fragment for bulk DOM insertion performance optimization
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Applying randomized structural properties
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;
    
    const size = `${2 + Math.random() * 3}px`;
    particle.style.width = size;
    particle.style.height = size;

    // Toggle varying color
    const isAccent = Math.random() > 0.5;
    particle.style.background = isAccent ? 'var(--accent-light)' : 'var(--primary-light)';

    fragment.appendChild(particle);
  }
  
  // Single reflow operation
  container.appendChild(fragment);
}

/* ==========================================================================
   #CORE INITIALIZATION BOUNDARY
   ========================================================================== */

/**
 * Primary DOM initialization.
 * Enclosed in an error boundary to guarantee UI renders even if a sub-module crashes.
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    // 1. Core UX
    initThemeToggle();
    initMobileNav();
    
    // 2. Performant Intersections
    initNavScrollSpy();
    initSectionAnimations();
    
    // 3. Desktop Effects (Gracefully skips on smaller viewports via CSS)
    initGlassTiltEffect();
    initParticles();
    
  } catch (error) {
    console.warn('[Portfolio Execution Error]: Module initialization boundary caught an exception.', error);
  }
});
