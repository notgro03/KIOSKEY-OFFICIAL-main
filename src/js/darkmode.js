// Robust dark mode toggle supporting multiple toggles, FontAwesome/SVG, keyboard access, aria attributes, and persistence
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const htmlElement = document.documentElement; // Usamos htmlElement para la clase dark-mode

    // Si el botón no se encuentra, salimos y registramos un error
    if (!darkModeToggle) {
        console.error('Dark mode toggle button not found. Ensure an element with class "dark-mode-toggle" exists.');
        return;
    }

    // Función para aplicar/remover la clase dark-mode y actualizar el icono
    const applyDarkMode = (isDark) => {
        if (isDark) {
            htmlElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode'); // También aplicamos al body por si acaso
        } else {
            htmlElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
        }
        updateDarkModeIcon(isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        document.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: isDark } }));
    };

    // Función para actualizar el icono (luna/sol)
    const updateDarkModeIcon = (isDark) => {
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
            darkModeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        }
    };

    // Verificar la preferencia guardada al cargar la página
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    applyDarkMode(isDarkModeEnabled); // Aplicar el modo inicial y actualizar el icono

    // Asegurarse de que el botón sea clickeable (por si algún CSS lo deshabilita)
    darkModeToggle.style.pointerEvents = 'auto';
    darkModeToggle.style.cursor = 'pointer'; // Añadir cursor para feedback visual

    // Añadir el event listener para el clic
    darkModeToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir cualquier comportamiento por defecto del botón
        const currentModeIsDark = htmlElement.classList.contains('dark-mode');
        applyDarkMode(!currentModeIsDark); // Invertir el modo actual
    });

    // Soporte para teclado (Enter/Space)
    darkModeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            darkModeToggle.click(); // Simular un clic
        }
    });
});