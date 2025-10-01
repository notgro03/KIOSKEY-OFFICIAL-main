export class Navigation {
  constructor() {
    this.menuButton = document.querySelector('.menu-button')
    this.navLinks = document.querySelector('.nav-links')
    this.darkModeToggle = document.querySelector('.dark-mode-toggle')
    this.dropdowns = document.querySelectorAll('.nav-dropdown')
    this.init()
  }

  init() {
    this.setupMobileMenu()
    this.setupDropdowns()
    this.setupScrollBehavior()
  }

  setupMobileMenu() {
    if (this.menuButton && this.navLinks) {
      this.menuButton.addEventListener('click', () => {
        this.navLinks.classList.toggle('active')
        this.menuButton.classList.toggle('active')
      })

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.menuButton.contains(e.target) && !this.navLinks.contains(e.target)) {
          this.navLinks.classList.remove('active')
          this.menuButton.classList.remove('active')
        }
      })
    }
  }

  setupDropdowns() {
    this.dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('[aria-haspopup]')
      const content = dropdown.querySelector('.nav-dropdown-content')

      if (trigger && content) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault()
          const expanded = trigger.getAttribute('aria-expanded') === 'true'
          trigger.setAttribute('aria-expanded', !expanded)
        })

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target)) {
            trigger.setAttribute('aria-expanded', 'false')
          }
        })
      }
    })
  }

  setupScrollBehavior() {
    const nav = document.querySelector('nav')
    let lastScroll = window.scrollY

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY
      if (currentScroll <= 0) {
        nav.classList.remove('nav-hidden')
        return
      }
      
      if (currentScroll > lastScroll && !nav.classList.contains('nav-hidden')) {
        nav.classList.add('nav-hidden')
      } else if (currentScroll < lastScroll && nav.classList.contains('nav-hidden')) {
        nav.classList.remove('nav-hidden')
      }
      lastScroll = currentScroll
    })
  }
}