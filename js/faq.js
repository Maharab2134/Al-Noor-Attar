/**
 * faq.js - Al Noor Attar FAQ Collapsible Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const inner = item.querySelector('.faq-inner');

    if (!trigger || !content || !inner) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other elements for accordion exclusive behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = '0';
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        // Set dynamic height from child inner element height
        content.style.maxHeight = inner.offsetHeight + 'px';
      }
    });
  });
});
