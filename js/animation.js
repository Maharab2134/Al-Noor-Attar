/**
 * animation.js - Al Noor Attar Scroll entrance animations & Loader screen
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Manage Loading Screen Fade Out
  const loaderSec = document.querySelector('.loader-screen');
  if (loaderSec) {
    window.addEventListener('load', () => {
      // Small buffer for natural transition
      setTimeout(() => {
        loaderSec.classList.add('fade-out');
      }, 600);
    });

    // Fallback if load event fires too slowly or is cached
    setTimeout(() => {
      if (!loaderSec.classList.contains('fade-out')) {
        loaderSec.classList.add('fade-out');
      }
    }, 2500);
  }

  // 2. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once verified and active, stop observing to save processing cycles
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null, // viewport
      threshold: 0.15, // trigger when 15% is visible
      rootMargin: '0px 0px -50px 0px' // offset bottom trigger point
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for extremely archaic browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
});
