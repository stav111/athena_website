/* ============================================================
   Athena — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll reveal animation ──────────────────────────────
  // Animate hero elements immediately on page load
  document.querySelectorAll('.hero .anim, .hero-card-wrap.anim').forEach(el => {
    el.classList.add('on');
  });

  // Reveal remaining elements as they scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -32px 0px',
  });

  document.querySelectorAll('.anim:not(.on)').forEach(el => observer.observe(el));


  // ── Mobile nav toggle ────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('nav-open');

      if (isOpen) {
        navLinks.classList.remove('nav-open');
      } else {
        navLinks.classList.add('nav-open');
      }
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('nav-open');
      }
    });
  }

});
