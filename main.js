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
      
      // Update ARIA attributes
      const isExpanded = navLinks.classList.contains('active')
      menuButton.setAttribute('aria-expanded', isExpanded)
    })

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuButton.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active')
        menuButton.classList.remove('active')
        menuButton.setAttribute('aria-expanded', 'false')
      }
    })
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active')
        menuButton.classList.remove('active')
        menuButton.setAttribute('aria-expanded', 'false')
        menuButton.focus()
      }
    })
  }

  // Initialize dropdown menus
  const dropdowns = document.querySelectorAll('.nav-dropdown')
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a[aria-haspopup]')
    const content = dropdown.querySelector('.nav-dropdown-content')
    
    if (trigger && content) {
      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
          trigger.setAttribute('aria-expanded', !isExpanded)
          
          if (!isExpanded) {
            const firstLink = content.querySelector('a')
            if (firstLink) firstLink.focus()
          }
        }
      })
      
      // Mouse events
      dropdown.addEventListener('mouseenter', () => {
        trigger.setAttribute('aria-expanded', 'true')
      })
      
      dropdown.addEventListener('mouseleave', () => {
        trigger.setAttribute('aria-expanded', 'false')
      })
      
      // Handle dropdown item navigation
      const dropdownLinks = content.querySelectorAll('a')
      dropdownLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            const nextLink = dropdownLinks[index + 1] || dropdownLinks[0]
            nextLink.focus()
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const prevLink = dropdownLinks[index - 1] || dropdownLinks[dropdownLinks.length - 1]
            prevLink.focus()
          } else if (e.key === 'Escape') {
            e.preventDefault()
            trigger.setAttribute('aria-expanded', 'false')
            trigger.focus()
          }
        })
      })
    }
  })

  // Set active navigation state
  setActiveNavigation()

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

// Function to set active navigation state
function setActiveNavigation() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-dropdown a)')
  
  navLinks.forEach(link => {
    link.classList.remove('active')
    link.removeAttribute('aria-current')
    
    const linkPath = new URL(link.href).pathname
    if (currentPath === linkPath || (currentPath === '/' && linkPath === '/')) {
      link.classList.add('active')
      link.setAttribute('aria-current', 'page')
    }
  })
  
  // Handle dropdown active states
  const dropdownLinks = document.querySelectorAll('.nav-dropdown-content a')
  dropdownLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname
    if (currentPath === linkPath) {
      const dropdown = link.closest('.nav-dropdown')
      const trigger = dropdown.querySelector('a[aria-haspopup]')
      if (trigger) {
        trigger.classList.add('active')
        trigger.setAttribute('aria-current', 'page')
      }
    }
  })
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