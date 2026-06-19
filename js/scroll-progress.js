/**
 * scroll-progress.js - Al Noor Attar Scroll Progress Barber indicator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Create the progress indicator element dynamically on page load
  const progressBar = document.createElement('div');
  
  // Apply luxury alignment styling
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.width = '0%';
  progressBar.style.height = '3px';
  progressBar.style.backgroundColor = 'var(--gold-primary)';
  progressBar.style.zIndex = '99999'; // Highest priority overlay
  progressBar.style.transition = 'width 0.1s ease-out';
  progressBar.id = 'scroll-progress';

  document.body.appendChild(progressBar);

  // Scroll event binding
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    } else {
      progressBar.style.width = '0%';
    }
  });
});
