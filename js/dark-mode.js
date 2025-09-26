// Función para aplicar el tema al body
function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
}

// Función para actualizar el ícono del botón
function updateButton(button, isDark) {
  if (button) {
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('fa-moon', !isDark);
    button.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  }
}

// Determinar el tema inicial (antes de que cargue el DOM)
let isDarkMode = localStorage.getItem('theme') === 'dark';
if (localStorage.getItem('theme') === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  isDarkMode = true;
}

// Aplicar el tema inmediatamente para evitar el parpadeo
applyTheme(isDarkMode);

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Actualizar el estado del botón en cuanto esté disponible
  if (darkModeToggle) {
    updateButton(darkModeToggle, document.body.classList.contains('dark-mode'));

    // Añadir el evento de clic solo si el botón existe
    darkModeToggle.addEventListener('click', () => {
      const newIsDarkMode = !document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
      applyTheme(newIsDarkMode);
      updateButton(darkModeToggle, newIsDarkMode);
    });
  }

  // Escuchar cambios en la preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Solo aplicar si el usuario no ha elegido un tema manualmente
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
      updateButton(darkModeToggle, e.matches);
    }
  });
});