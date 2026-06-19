/**
 * product.js - Al Noor Attar Dynamic Product Details Engine
 */

import { getLocalizedPrice, getLocalizedNumber } from './language.js';

document.addEventListener('DOMContentLoaded', async () => {
  let products = [];
  let selectedSizeMultiplier = 1.0; // 12ml (Full Price)
  let selectedSizeLabel = '12ml (1 Tola)';
  let selectedQuantity = 1;
  let activeProduct = null;
  let selectedGalleryIndex = 0;

  // 1. Parse Product Query Parameter
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  // Dismiss global loader screen elegantly after a short delay
  const loader = document.querySelector('.loader-screen');
  setTimeout(() => {
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.style.display = 'none', 600);
    }
  }, 400);

  // 2. Fetch products registry
  try {
    const res = await fetch('/data/products.json');
    products = await res.json();
  } catch (error) {
    console.error('Error fetching Al Noor products catalog:', error);
  }

  // 3. Find target product
  activeProduct = products.find(p => p.id === productId);

  // 4. Render Layout
  renderDetails();

  // 5. Track Language translation triggers
  document.addEventListener('languageChanged', (e) => {
    renderDetails();
  });

  function renderDetails() {
    const root = document.getElementById('product-detail-root');
    if (!root) return;

    const lang = document.documentElement.lang || 'en';

    // Update Back Navigation Text dynamically
    const backText = document.getElementById('back-text-node');
    if (backText) {
      backText.textContent = lang === 'bn' ? 'স্বাক্ষর সংগ্রহে ফিরে যান' : 'Back to Signature Collection';
    }

    if (!activeProduct) {
      root.innerHTML = `
        <div class="not-found-card text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="gold-text"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h2 class="section-title mt-4">${lang === 'bn' ? 'আতরটি পাওয়া যায়নি' : 'Scent Selection Unresolved'}</h2>
          <p class="section-desc">${lang === 'bn' ? 'দুঃখিত, অনুরোধকৃত বিলাসবহুল সুবাসটি খুঁজে পাওয়া যায়নি বা নিঃশেষ হয়ে গেছে।' : 'The specific artisanal blend you are seeking could not be resolved in our private vaults.'}</p>
          <a href="/index.html#signature-collection" class="lux-btn mt-4 inline-block">${lang === 'bn' ? 'সংগ্রহশালা দেখুন' : 'View Collection'}</a>
        </div>
      `;
      return;
    }

    const t = activeProduct[lang] || activeProduct['en'];

    // Scent journey breakdown parsing (Top, Heart, Base) from notes string:
    // e.g. "Top: Wild Saffron, Warm Honey | Heart: Pure Cambodian Oud | Base: Tobacco..."
    const notesParts = t.notes.split('|');
    let topNotes = '';
    let heartNotes = '';
    let baseNotes = '';

    notesParts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.toLowerCase().startsWith('top:') || trimmed.toLowerCase().startsWith('টপ:')) {
        topNotes = trimmed.substring(trimmed.indexOf(':') + 1).trim();
      } else if (trimmed.toLowerCase().startsWith('heart:') || trimmed.toLowerCase().startsWith('হার্ট:')) {
        heartNotes = trimmed.substring(trimmed.indexOf(':') + 1).trim();
      } else if (trimmed.toLowerCase().startsWith('base:') || trimmed.toLowerCase().startsWith('বেস:')) {
        baseNotes = trimmed.substring(trimmed.indexOf(':') + 1).trim();
      }
    });

    // Fallbacks if formatting is different
    if (!topNotes && notesParts[0]) topNotes = notesParts[0];
    if (!heartNotes && notesParts[1]) heartNotes = notesParts[1];
    if (!baseNotes && notesParts[2]) baseNotes = notesParts[2];

    const currentBasePrice = Math.round(activeProduct.price * selectedSizeMultiplier);
    const calculatedTotalPrice = currentBasePrice * selectedQuantity;

    // Localize size labels for display
    let localizedSizeLabelString = selectedSizeLabel;
    if (lang === 'bn') {
      if (selectedSizeLabel.includes('3ml')) {
        localizedSizeLabelString = '৩ মিলি মিনিয়েচার';
      } else if (selectedSizeLabel.includes('6ml')) {
        localizedSizeLabelString = '৬ মিলি হাফ-তোলা';
      } else if (selectedSizeLabel.includes('12ml')) {
        localizedSizeLabelString = '১২ মিলি ফুল-তোলা';
      }
    }

    // Gather all images (main + gallery, deduplicated)
    const allImages = [];
    if (activeProduct.image) {
      allImages.push(activeProduct.image);
    }
    if (activeProduct.gallery && Array.isArray(activeProduct.gallery)) {
      activeProduct.gallery.forEach(imgUrl => {
        if (!allImages.includes(imgUrl)) {
          allImages.push(imgUrl);
        }
      });
    }
    if (selectedGalleryIndex >= allImages.length) {
      selectedGalleryIndex = 0;
    }

    // Build visual details layout
    root.innerHTML = `
      <div class="product-grid">
        <!-- Main Product Image Frame (Double golden outline) -->
        <div class="product-gallery">
          ${activeProduct.is_bestseller ? `<span class="prod-badge-gold">${lang === 'bn' ? 'বেস্ট সেলার' : 'Best Seller'}</span>` : ''}
          <div class="main-image-frame">
            <div class="main-image-frame-inner">
              <img src="${allImages.length > 0 ? allImages[selectedGalleryIndex] : activeProduct.image}" alt="${t.title}" id="main-product-image" referrerpolicy="no-referrer">
            </div>
          </div>
          
          ${allImages.length > 1 ? `
            <div class="product-thumbnails">
              ${allImages.map((imgUrl, idx) => `
                <div class="thumb-item ${selectedGalleryIndex === idx ? 'active' : ''}" data-index="${idx}">
                  <img src="${imgUrl}" alt="${t.title} View ${idx + 1}" referrerpolicy="no-referrer">
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="gallery-decor-line"></div>
        </div>

        <!-- Product Specs Panel -->
        <div class="product-specs">
          <div class="specs-header">
            <span class="specs-category">${activeProduct.category}</span>
            <div class="rating-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${getLocalizedNumber(activeProduct.rating.toFixed(1), lang)} / ${getLocalizedNumber('5.0', lang)}</span>
            </div>
          </div>

          <h1 class="product-main-title">
            ${t.title} 
            <span class="product-arabic-name">${activeProduct.arabic_name}</span>
          </h1>
          <p class="product-subtitle">${t.subtitle}</p>

          <div class="price-display">
            <span class="price-val" id="dynamic-price-field">${getLocalizedPrice(calculatedTotalPrice, lang)}</span>
            <span class="size-tax-label">/ ${localizedSizeLabelString}</span>
          </div>

          <div class="divider"></div>

          <!-- Product Story / Description -->
          <div class="product-story-box">
            <h3 class="meta-label-title">${lang === 'bn' ? 'সুগন্ধির ইতিহাস ও আখ্যান' : 'Olfactory Biography'}</h3>
            <p class="story-paragraph">${t.description}</p>
          </div>

          <!-- Interactive Sizing Selectors -->
          <div class="selector-section">
            <h3 class="meta-label-title">${lang === 'bn' ? 'বোতলের আকার নির্বাচন করুন' : 'Select Curated Sizing'}</h3>
            <div class="size-options-grid">
              <button class="size-opt-btn ${selectedSizeLabel.startsWith('3ml') ? 'active' : ''}" data-multiplier="0.3" data-label="3ml Sample vial">
                <span class="opt-size">${lang === 'bn' ? '৩ মিলি' : '3ml'}</span>
                <span class="opt-price-tag">${getLocalizedPrice(Math.round(activeProduct.price * 0.3), lang)}</span>
              </button>
              <button class="size-opt-btn ${selectedSizeLabel.startsWith('6ml') ? 'active' : ''}" data-multiplier="0.6" data-label="6ml Half-Tola">
                <span class="opt-size">${lang === 'bn' ? '৬ মিলি' : '6ml'}</span>
                <span class="opt-price-tag">${getLocalizedPrice(Math.round(activeProduct.price * 0.6), lang)}</span>
              </button>
              <button class="size-opt-btn ${selectedSizeLabel.startsWith('12ml') ? 'active' : ''}" data-multiplier="1.0" data-label="12ml Full-Tola">
                <span class="opt-size">${lang === 'bn' ? '১২ মিলি' : '12ml'}</span>
                <span class="opt-price-tag">${getLocalizedPrice(activeProduct.price, lang)}</span>
              </button>
            </div>
          </div>

          <!-- Quantity Selector & Action Button Row -->
          <div class="purchase-row">
            <div class="qty-stepper">
              <button class="qty-btn" id="qty-minus" aria-label="Reduce quantity">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="qty-num" id="qty-val">${getLocalizedNumber(selectedQuantity, lang)}</span>
              <button class="qty-btn" id="qty-plus" aria-label="Increase quantity">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>

            <button class="acquire-btn" id="curate-bottle-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>${lang === 'bn' ? 'বোতলটি অর্ডার করুন' : 'Acquire Royal Decant'}</span>
            </button>
          </div>

          <div class="divider"></div>

          <!-- Scent Accords Map -->
          <div class="scent-flow-block">
            <h3 class="meta-label-title text-center mb-3">${lang === 'bn' ? 'সুগন্ধির বিবর্তনের ধাপসমূহ' : 'Fragrance Evolution Sequence'}</h3>
            <div class="scent-steps">
              <div class="scent-step">
                <div class="step-badge">${lang === 'bn' ? 'টপ নোট' : 'Top Accord'}</div>
                <div class="step-content">
                  <h4 class="step-title">${lang === 'bn' ? 'প্রথম স্পর্শ (১-৩০ মিনিট)' : 'Immediate Impressions (1-30 mins)'}</h4>
                  <p class="step-desc">${topNotes}</p>
                </div>
              </div>
              <div class="scent-step">
                <div class="step-badge heart">${lang === 'bn' ? 'হার্ট নোট' : 'Heart Accord'}</div>
                <div class="step-content">
                  <h4 class="step-title">${lang === 'bn' ? 'মূল আবেদন (৩০ মিনিট - ৩ ঘণ্টা)' : 'Core Identity (30 mins - 3 hours)'}</h4>
                  <p class="step-desc">${heartNotes}</p>
                </div>
              </div>
              <div class="scent-step">
                <div class="step-badge base">${lang === 'bn' ? 'বেস নোট' : 'Base Accord'}</div>
                <div class="step-content">
                  <h4 class="step-title">${lang === 'bn' ? 'দীর্ঘস্থায়ী আভা (৩-৬০+ ঘণ্টা)' : 'Enduring Legacy (3-60+ hours)'}</h4>
                  <p class="step-desc">${baseNotes}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Pure Royal Certification Panel -->
          <div class="royal-specs-table">
            <h3 class="meta-label-title">${lang === 'bn' ? 'রাজকীয় গুনগত মান ও সারণী' : 'Royal Specifications Table'}</h3>
            <div class="specs-table-grid">
              <div class="specs-table-row">
                <span class="specs-table-label">${lang === 'bn' ? 'দ্রাবক ঘনত্ব / উপাদান' : 'Solvent Type'}</span>
                <span class="specs-table-value">${lang === 'bn' ? '১০০% অ্যালকোহল মুক্ত খাঁটি আতর তেল' : '100% Alcohol-Free Pure Oil'}</span>
              </div>
              <div class="specs-table-row">
                <span class="specs-table-label">${lang === 'bn' ? 'পাতন পদ্ধতি' : 'Distillation System'}</span>
                <span class="specs-table-value">${lang === 'bn' ? 'ঐতিহ্যবাহী ডাবল-পাতন (চারকোল উনুন)' : 'Traditional Double-Fired Charcoal Distillation'}</span>
              </div>
              <div class="specs-table-row">
                <span class="specs-table-label">${lang === 'bn' ? 'স্থায়িত্ব কাল' : 'Olfactory Longevity'}</span>
                <span class="specs-table-value">${lang === 'bn' ? '৬০+ ঘণ্টার আভিজাত্যময় দীর্ঘস্থায়ী সুবাস' : '60+ Hours of Enduring Sillage'}</span>
              </div>
              <div class="specs-table-row">
                <span class="specs-table-label">${lang === 'bn' ? 'সঞ্চয় গ্লাস পাত্র' : 'Glass Vessel Type'}</span>
                <span class="specs-table-value">${lang === 'bn' ? 'সোনার কাঠি বিশিষ্ট আলংকারিক ও ওরিয়েন্টাল গ্লাস' : 'Hand-carved Ornate Glass with Gold Wand'}</span>
              </div>
            </div>
          </div>

          <!-- Authenticity Guarantee Card -->
          <div class="guarantee-foil-card">
            <div class="guarantee-info-block">
              <div class="guarantee-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="gold-text"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <h4 class="guarantee-title">${lang === 'bn' ? 'বিশুদ্ধতার রাজকীয় নিশ্চয়তা' : 'Al Noor Authenticity Guarantee'}</h4>
              </div>
              <p class="guarantee-desc">
                ${lang === 'bn' ? 'এই আতরটি ১০০% খাঁটি, অ্যালকোহল মুক্ত এবং প্রাকৃতিক বাষ্প পাতন প্রক্রিয়ায় নিষ্কাশিত। এতে কোনো কৃত্রিম সুগন্ধি, কেমিক্যাল কেরিয়ার বা দ্রাবক ব্যবহার করা হয়নি।' : 'We warrant that this bottle holds 100% pure botanical essential oils. Hand-bottled, completely solvent-free, and guaranteed authentic Grade-A Arabian grade raw materials.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    `;

    // 5.5 Set up thumbnail clicks interactive events
    const thumbnails = root.querySelectorAll('.thumb-item');
    const mainImg = root.querySelector('#main-product-image');
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.getAttribute('data-index'));
        selectedGalleryIndex = index;
        
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        const selectedImgUrl = allImages[index];
        if (mainImg && selectedImgUrl) {
          mainImg.style.opacity = '0.3';
          mainImg.style.transform = 'scale(0.98)';
          setTimeout(() => {
            mainImg.src = selectedImgUrl;
            mainImg.style.opacity = '1';
            mainImg.style.transform = '';
          }, 150);
        }
      });
    });

    // 6. Set up size changes interactive events
    const options = root.querySelectorAll('.size-opt-btn');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        selectedSizeMultiplier = parseFloat(opt.getAttribute('data-multiplier'));
        selectedSizeLabel = opt.getAttribute('data-label');
        
        // Gentle price-change CSS animation trigger
        const priceField = document.getElementById('dynamic-price-field');
        if (priceField) {
          priceField.style.opacity = '0.3';
          setTimeout(() => {
            renderDetails(); // Re-render state
          }, 150);
        } else {
          renderDetails();
        }
      });
    });

    // 7. Stepper Events
    const btnMinus = document.getElementById('qty-minus');
    const btnPlus = document.getElementById('qty-plus');

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        if (selectedQuantity > 1) {
          selectedQuantity--;
          renderDetails();
        }
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        if (selectedQuantity < 10) {
          selectedQuantity++;
          renderDetails();
        }
      });
    }

    // 8. Order Button Action
    const curateBtn = document.getElementById('curate-bottle-btn');
    if (curateBtn) {
      curateBtn.addEventListener('click', () => {
        const titleText = t.title;
        const msg = lang === 'bn' 
          ? `আল নূর আতর পরিবারে আপনাকে ধন্যবাদ!\n\nআপনি চমৎকারভাবে নিশ্চিত করেছেন:\n- আতর: ${titleText}\n- আকার: ${localizedSizeLabelString}\n- পরিমাণ: ${getLocalizedNumber(selectedQuantity, 'bn')} বোতল\n- মোট মূল্য: ${getLocalizedPrice(calculatedTotalPrice, 'bn')}\n\nআপনার রাজকীয় কুরিয়ার খুব শীঘ্রই আপনার ঠিকানায় পৌঁছাবে!`
          : `Dearest Connoisseur, your selection has been registered in the Royal Ledger.\n\nSummary of creation:\n- Blend: ${titleText}\n- Decant size: ${selectedSizeLabel}\n- Quantity: ${selectedQuantity} bottle(s)\n- Sum Total: $${calculatedTotalPrice}\n\nOur private courier will dispatch this legacy directly to your residence shortly.`;
        alert(msg);
      });
    }
  }
});
