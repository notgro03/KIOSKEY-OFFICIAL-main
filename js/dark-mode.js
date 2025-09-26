document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const icon = darkModeToggle.querySelector('i');

  // Function to apply the correct theme and icon
  const applyTheme = (isDark) => {
    if (isDark) {
      body.classList.add('dark-mode');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      darkModeToggle.setAttribute('aria-label', 'Activar modo claro');
    } else {
      body.classList.remove('dark-mode');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      darkModeToggle.setAttribute('aria-label', 'Activar modo oscuro');
    }
  };

  // Check for saved user preference in localStorage
  const savedTheme = localStorage.getItem('theme');

  // Use saved theme, or system preference if no theme is saved
  if (savedTheme) {
    applyTheme(savedTheme === 'dark');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme(true);
  }

  // Event listener for the toggle button
  darkModeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    if (isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      darkModeToggle.setAttribute('aria-label', 'Activar modo claro');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      darkModeToggle.setAttribute('aria-label', 'Activar modo oscuro');
    }
  });

  // Listen for changes in system color scheme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only apply if no theme is manually set in localStorage
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });
});