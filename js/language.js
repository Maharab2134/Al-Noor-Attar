/**
 * language.js - Al Noor Attar Language Manager (EN/BN)
 */

let translations = null;

async function loadTranslations() {
  if (translations) return translations;
  try {
    const response = await fetch('/data/translations.json');
    translations = await response.json();
    return translations;
  } catch (error) {
    console.error('Error loading translation asset:', error);
    return null;
  }
}

async function applyLanguage(lang) {
  const dicts = await loadTranslations();
  if (!dicts || !dicts[lang]) return;

  // Set html lang attribute
  document.documentElement.lang = lang;

  // Update localStorage
  localStorage.setItem('language', lang);

  // Sync Dropdown Select elements
  const langSelects = document.querySelectorAll('.lang-select');
  langSelects.forEach(select => {
    select.value = lang;
  });

  // Sync Luxury Pill Toggle buttons
  const luxuryContainers = document.querySelectorAll('.lang-switch-luxury');
  luxuryContainers.forEach(container => {
    const buttons = container.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  });

  // Translate elements with [data-i18n]
  const i18nElements = document.querySelectorAll('[data-i18n]');
  i18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dicts[lang][key]) {
      // Check if it's an input field needing placeholder translation
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', dicts[lang][key]);
      } else {
        el.textContent = dicts[lang][key];
      }
    }
  });

  // Dispatch custom event for secondary listeners (e.g., dynamic product lists)
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Utility to convert an English number string or integer into Bengali digits
 * and prepends/appends the correct localized price indicator ($ / ৳ / টাকা).
 */
function getLocalizedPrice(amount, lang = 'en') {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const formattedString = String(amount);
  
  if (lang === 'bn') {
    const convertedDigits = formattedString.split('').map(char => {
      return banglaDigits[char] || char;
    }).join('');
    // Use Taka symbol ৳ for Bengali
    return `৳${convertedDigits}`;
  }
  return `$${amount}`;
}

/**
 * Utility to localize raw English numbers to Bengali digits (e.g. quantity, size labels)
 */
function getLocalizedNumber(num, lang = 'en') {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  if (lang === 'bn') {
    return String(num).split('').map(d => banglaDigits[d] || d).join('');
  }
  return num;
}

// Global initialization
document.addEventListener('DOMContentLoaded', async () => {
  const langSelects = document.querySelectorAll('.lang-select');

  // Load language from storage or default
  const savedLang = localStorage.getItem('language') || 'en';
  await applyLanguage(savedLang);

  // Bind change events to selects
  langSelects.forEach(select => {
    select.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  });

  // Bind click events to luxury pill toggle buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-switch-luxury .lang-btn');
    if (btn) {
      const selectedLang = btn.getAttribute('data-lang');
      applyLanguage(selectedLang);
    }
  });
});

export { applyLanguage, loadTranslations, getLocalizedPrice, getLocalizedNumber };
