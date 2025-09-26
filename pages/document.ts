document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const htmlElement = document.documentElement;

    // Check saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        htmlElement.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkModeEnabled = htmlElement.classList.toggle('dark-mode');
        updateDarkModeIcon(isDarkModeEnabled);
        
        // Save preference
        localStorage.setItem('darkMode', isDarkModeEnabled ? 'enabled' : 'disabled');
    });

    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove('fa-moon', 'fa-sun');
        icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    }
});