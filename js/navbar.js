/**
 * navbar.js - Al Noor Attar Navigation Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header-nav');
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.backdrop');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  // Trigger scroll shrink
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle drawer open State
  function toggleDrawer() {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
    backdrop.classList.toggle('show');
    
    // Toggle body scrolling when drawer is open
    if (drawer.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Bind Actions
  if (hamburger) {
    hamburger.addEventListener('click', toggleDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', toggleDrawer);
  }

  // Close drawer when mobile items are clicked
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleDrawer();
      }
    });
  });
});
