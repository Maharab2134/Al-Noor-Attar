/**
 * back-to-top.js - Al Noor Attar Back To Top Bubble controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Create circular top button dynamically
  const bttBtn = document.createElement('button');
  bttBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m18 15-6-6-6 6"/></svg>
  `;
  bttBtn.id = 'back-to-top-btn';
  bttBtn.title = 'Back to top / উপরে যান';

  // Apply visual layout values
  bttBtn.style.position = 'fixed';
  bttBtn.style.bottom = '2rem';
  bttBtn.style.right = '2rem';
  bttBtn.style.width = '42px';
  bttBtn.style.height = '42px';
  bttBtn.style.borderRadius = 'var(--radius-full)';
  bttBtn.style.background = 'var(--bg-glass)';
  bttBtn.style.color = 'var(--gold-primary)';
  bttBtn.style.border = '1px solid var(--border-color)';
  bttBtn.style.backdropFilter = 'blur(10px)';
  bttBtn.style.webkitBackdropFilter = 'blur(10px)';
  bttBtn.style.display = 'flex';
  bttBtn.style.alignItems = 'center';
  bttBtn.style.justifyContent = 'center';
  bttBtn.style.cursor = 'pointer';
  bttBtn.style.zIndex = '999';
  bttBtn.style.opacity = '0';
  bttBtn.style.visibility = 'hidden';
  bttBtn.style.transition = 'opacity 0.4s, visibility 0.4s, background-color 0.4s, border-color 0.4s, transform 0.4s';

  document.body.appendChild(bttBtn);

  // Scroll reveal visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      bttBtn.style.opacity = '1';
      bttBtn.style.visibility = 'visible';
    } else {
      bttBtn.style.opacity = '0';
      bttBtn.style.visibility = 'hidden';
    }
  });

  // Hover animations
  bttBtn.addEventListener('mouseenter', () => {
    bttBtn.style.background = 'var(--gold-primary)';
    bttBtn.style.color = '#121212';
    bttBtn.style.borderColor = 'var(--gold-primary)';
    bttBtn.style.transform = 'translateY(-3px)';
    bttBtn.style.boxShadow = 'var(--shadow-gold)';
  });

  bttBtn.addEventListener('mouseleave', () => {
    bttBtn.style.background = 'var(--bg-glass)';
    bttBtn.style.color = 'var(--gold-primary)';
    bttBtn.style.borderColor = 'var(--border-color)';
    bttBtn.style.transform = '';
    bttBtn.style.boxShadow = '';
  });

  // Scroll trigger
  bttBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
