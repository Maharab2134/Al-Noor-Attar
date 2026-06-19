/**
 * counter.js - Al Noor Attar Statistical Numbers Counter
 */

document.addEventListener('DOMContentLoaded', () => {
  const statSection = document.querySelector('.stats-grid');
  const statNumbers = document.querySelectorAll('.stat-num');

  if (!statSection || statNumbers.length === 0) return;

  let animationStarted = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds total animation
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let count = 0;

    const timer = setInterval(() => {
      count += Math.ceil(target / (duration / stepTime));
      if (count >= target) {
        el.textContent = target + (el.getAttribute('data-suffix') || '');
        clearInterval(timer);
      } else {
        el.textContent = count + (el.getAttribute('data-suffix') || '');
      }
    }, stepTime);
  }

  // Observe when counter section comes on screen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          statNumbers.forEach(numEl => countUp(numEl));
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25 // Trigger when 25% of grid is shown
    });

    observer.observe(statSection);
  } else {
    // Fallback if no observer
    statNumbers.forEach(numEl => {
      numEl.textContent = numEl.getAttribute('data-target') + (numEl.getAttribute('data-suffix') || '');
    });
  }
});
