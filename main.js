// Import styles
import './style.css'

// Import components
import { Navigation } from './src/js/components/Navigation'
import { Carousel } from './src/js/components/Carousel'

// Initialize app
const initApp = () => {
  // Initialize navigation
  new Navigation()

  // Initialize carousels if present
  const carouselElements = document.querySelectorAll('.carousel-container')
  carouselElements.forEach(element => {
    new Carousel(element, {
      autoplay: true,
      autoplayDelay: 5000,
      loop: true
    })
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