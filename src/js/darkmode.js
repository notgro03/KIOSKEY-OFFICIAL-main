document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle') || document.querySelector('#darkModeToggle');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

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
    // Rewritten dark mode script: simple, robust, compatible with .dark-mode-toggle and #darkModeToggle
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.dark-mode-toggle') || document.getElementById('darkModeToggle');
        const root = document.documentElement;
        const body = document.body;

        if (!toggle) {
            // No toggle on this page; nothing to do.
            return;
        }

        // Read saved preference
        const saved = localStorage.getItem('darkMode');
        const prefersDark = saved === 'enabled';

        function setDark(on, save = false) {
            if (on) {
                root.classList.add('dark-mode');
                body.classList.add('dark-mode');
            } else {
                root.classList.remove('dark-mode');
                body.classList.remove('dark-mode');
            }
            updateIcon(on);
            if (save) localStorage.setItem('darkMode', on ? 'enabled' : 'disabled');
            // Emit event
            document.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: on } }));
        }

        function updateIcon(isDark) {
            const icon = toggle.querySelector('i');
            if (!icon) return;
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
            icon.style.transition = 'transform 220ms ease, color 220ms ease';
            icon.style.transform = isDark ? 'rotate(180deg)' : 'rotate(0deg)';
        }

        // Initialize state
        setDark(prefersDark, false);

        // Make toggle keyboard and pointer accessible
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.style.cursor = 'pointer';

        // Toggle handlers
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isNowDark = root.classList.toggle('dark-mode');
            body.classList.toggle('dark-mode');
            setDark(isNowDark, true);
        });

        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    });