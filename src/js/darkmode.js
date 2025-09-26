document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const htmlElement = document.documentElement;

    if (!darkModeToggle) {
        console.error('Dark mode toggle button not found');
        return;
    }

    // Check saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        htmlElement.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    // Ensure button is clickable and has proper styles
    darkModeToggle.style.pointerEvents = 'auto';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.backgroundColor = 'transparent';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.padding = '8px';
    darkModeToggle.style.fontSize = '20px';
    darkModeToggle.style.color = 'var(--text-color)';
    darkModeToggle.style.transition = 'all 0.3s ease';
    
    darkModeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isDarkModeEnabled = htmlElement.classList.toggle('dark-mode');
        updateDarkModeIcon(isDarkModeEnabled);
        
        // Save preference
        localStorage.setItem('darkMode', isDarkModeEnabled ? 'enabled' : 'disabled');
        
        // Trigger a custom event for other scripts that might need to know about the change
        document.dispatchEvent(new CustomEvent('darkModeChange', { 
            detail: { isDarkMode: isDarkModeEnabled }
        }));

        // Apply transition to body background
        document.body.style.transition = 'background-color 0.3s ease';
    });

    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            icon.style.transition = 'all 0.3s ease';
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
        }
    }

    // Make sure the initial icon state is correct
    updateDarkModeIcon(isDarkMode);

    // Add hover effect
    darkModeToggle.addEventListener('mouseenter', () => {
        darkModeToggle.style.transform = 'scale(1.1)';
    });

    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.style.transform = 'scale(1)';
    });
});