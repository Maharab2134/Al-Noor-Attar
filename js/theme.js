/**
 * theme.js - Al Noor Attar Dark/Light Theme Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const body = document.body;

  // Initialize Theme from localStorage or System Preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Default to dark mode for luxury Arabic vibe, or check system
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(systemPrefersLight ? 'light' : 'dark');
  }

  // Toggle Action Bindings
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(targetTheme);
    });
  });

  // Apply Theme Function
  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      updateThemeIcons('light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      updateThemeIcons('dark');
    }
  }

  // Swap Icon inside toggle button
  function updateThemeIcons(theme) {
    themeToggleBtns.forEach(btn => {
      if (theme === 'light') {
        // Show Moon Icon (ready for dark toggle)
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        `;
      } else {
        // Show Sun Icon (ready for light toggle)
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        `;
      }
    });
  }
});
