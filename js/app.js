/**
 * app.js - Al Noor Attar Main App Engine
 */

import { getLocalizedPrice } from './language.js';

document.addEventListener('DOMContentLoaded', async () => {
  let products = [];
  let testimonials = [];
  let activeFilter = 'all';

  // 1. Fetch JSON repositories
  try {
    const prodRes = await fetch('/data/products.json');
    products = await prodRes.json();
  } catch (error) {
    console.error('Error fetching Products catalogue:', error);
  }

  try {
    const testRes = await fetch('/data/testimonials.json');
    testimonials = await testRes.json();
  } catch (error) {
    console.error('Error fetching Testimonials registry:', error);
  }

  // 2. Initialize Views
  initProductsDisplay();
  initTestimonialsDisplay();

  // 3. Listen to language changes to re-render dynamic items
  document.addEventListener('languageChanged', () => {
    renderProducts();
    renderTestimonials();
  });

  /* --- Products Render Engine --- */
  function initProductsDisplay() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Toggle Active
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeFilter = btn.getAttribute('data-filter');
        renderProducts();
      });
    });

    renderProducts();
  }

  function renderProducts() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const lang = document.documentElement.lang || 'en';

    // Filter Items
    const filtered = products.filter(p => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'bestseller') return p.is_bestseller;
      return p.category.toLowerCase().includes(activeFilter);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light); font-family: var(--font-display);">
          No items found in this section.
        </div>
      `;
      return;
    }

    filtered.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'prod-card reveal active';
      card.style.animationDelay = `${index * 100}ms`;

      const t = p[lang] || p['en'];

      card.innerHTML = `
        ${p.is_bestseller ? `<span class="prod-badge">${lang === 'bn' ? 'বেস্ট সেলার' : 'Best Seller'}</span>` : ''}
        <div class="prod-img-box">
          <img src="${p.image}" alt="${t.title}" referrerpolicy="no-referrer">
        </div>
        <div class="prod-info">
          <div class="prod-meta">
            <span>${p.size}</span>
            <span class="prod-rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${p.rating.toFixed(1)}
            </span>
          </div>
          <h3 class="prod-title">${t.title} <span class="prod-arabic">${p.arabic_name}</span></h3>
          <p class="prod-descr">${t.description}</p>
          <div class="prod-notes">
            <strong>${lang === 'bn' ? 'সুবাস প্রোফাইল:' : 'Scent Journey:'}</strong> ${t.notes}
          </div>
          <div class="prod-footer">
            <span class="prod-price">${getLocalizedPrice(p.price, lang)}</span>
            <button class="prod-btn" aria-label="Acquire bottle" onclick="event.stopPropagation(); alert('${lang === 'bn' ? 'রাজকীয় কার্ট সংহতকরণ কার্যক্রম সফল হয়েছে!' : 'Royal cart acquisition success! Bottle curated.'}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
          </div>
        </div>
      `;

      // Navigate to product details page on card click (excluding the buy button)
      card.addEventListener('click', (e) => {
        if (e.target.closest('.prod-btn')) {
          return;
        }
        window.location.href = `/product.html?id=${p.id}`;
      });

      grid.appendChild(card);
    });
  }

  /* --- Testimonials Render Engine --- */
  function initTestimonialsDisplay() {
    renderTestimonials();
  }

  function renderTestimonials() {
    const grid = document.querySelector('.testi-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const lang = document.documentElement.lang || 'en';

    testimonials.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'testi-card reveal active';
      card.style.animationDelay = `${index * 150}ms`;

      const t = item[lang] || item['en'];

      // Build stars UI
      let starsHtml = '';
      for (let s = 0; s < item.rating; s++) {
        starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      }

      card.innerHTML = `
        <div class="testi-stars">${starsHtml}</div>
        <p class="testi-comment">"${t.testimonial}"</p>
        <div class="testi-author">
          <div class="testi-avatar">
            <img src="${item.image}" alt="${t.avatar_alt}" referrerpolicy="no-referrer">
          </div>
          <div class="testi-info">
            <span class="testi-name">${item.name}</span>
            <span class="testi-role">${item.role}, ${item.location}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
});
