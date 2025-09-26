document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  const applyTheme = (isDark) => {
    body.classList.toggle('dark-mode', isDark);
    if (darkModeToggle) {
      const icon = darkModeToggle.querySelector('i');
      icon.classList.toggle('fa-sun', isDark);
      icon.classList.toggle('fa-moon', !isDark);
      darkModeToggle.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
    }
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;

  applyTheme(isDarkMode);

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      isDarkMode = !body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      applyTheme(isDarkMode);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDarkMode = e.matches;
      applyTheme(isDarkMode);
    }
  });
});