// Import styles
import './style.css'

// Initialize modules
const initApp = () => {
  // Navigation menu
  const menuButton = document.querySelector('.menu-button')
  const navLinks = document.querySelector('.nav-links')

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active')
      menuButton.classList.toggle('active')
    })

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuButton.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active')
        menuButton.classList.remove('active')
      }
    })
  }

  // Scroll effects
  const hero = document.querySelector('.hero')
  if (hero) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        hero.classList.add('scrolled')
      } else {
        hero.classList.remove('scrolled')
      }
    })
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

// Export for use in other modules
export { initApp }

// Dark Mode Toggle
const initDarkMode = () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

  const enableDarkMode = () => {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    if (darkModeToggle) {
      darkModeToggle.querySelector('i').classList.remove('fa-moon');
      darkModeToggle.querySelector('i').classList.add('fa-sun');
    }
  };

  const disableDarkMode = () => {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    if (darkModeToggle) {
      darkModeToggle.querySelector('i').classList.remove('fa-sun');
      darkModeToggle.querySelector('i').classList.add('fa-moon');
    }
  };

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode.matches)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  // Event listener for the toggle button
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }

  // Listen for system theme changes
  prefersDarkMode.addEventListener('change', (event) => {
    if (localStorage.getItem('theme') === null) {
      if (event.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
};

// Initialize dark mode when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
  initDarkMode();
}
// Initialize dark mode for all pages
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dark mode on every page load
  initDarkMode();
  
  // Also initialize the main app functionality
  initApp();
});

// Make sure dark mode works on all pages by adding the script to each page
if (typeof window !== 'undefined') {
  // Auto-initialize dark mode
  const autoInitDarkMode = () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    const enableDarkMode = () => {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      if (darkModeToggle) {
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
      }
    };

    const disableDarkMode = () => {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      if (darkModeToggle) {
        darkModeToggle.querySelector('i').classList.remove('fa-sun');
        darkModeToggle.querySelector('i').classList.add('fa-moon');
      }
    };

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode.matches)) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

    // Event listener for the toggle button
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
          disableDarkMode();
        } else {
          enableDarkMode();
        }
      });
    }

    // Listen for system theme changes
    prefersDarkMode.addEventListener('change', (event) => {
      if (localStorage.getItem('theme') === null) {
        if (event.matches) {
          enableDarkMode();
        } else {
          disableDarkMode();
        }
      }
    });
  };

  // Initialize immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitDarkMode);
  } else {
    autoInitDarkMode();
  }
}