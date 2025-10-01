// Carousel component with TypeScript-like JSDocs for better type checking

/**
 * @typedef {Object} CarouselOptions
 * @property {number} [autoplayDelay=5000] - Delay between slides in milliseconds
 * @property {boolean} [autoplay=true] - Whether to autoplay the carousel
 * @property {boolean} [loop=true] - Whether to loop the carousel
 * @property {boolean} [indicators=true] - Whether to show indicators
 * @property {boolean} [navigation=true] - Whether to show navigation buttons
 */

export class Carousel {
  /**
   * @param {string | HTMLElement} selector - CSS selector or element for carousel
   * @param {CarouselOptions} [options={}] - Carousel configuration options
   */
  constructor(selector, options = {}) {
    this.element = typeof selector === 'string' 
      ? document.querySelector(selector)
      : selector
      
    if (!this.element) {
      throw new Error('Carousel element not found')
    }

    this.options = {
      autoplayDelay: 5000,
      autoplay: true,
      loop: true,
      indicators: true,
      navigation: true,
      ...options
    }

    this.slides = this.element.querySelectorAll('.carousel-slide')
    this.currentIndex = 0
    this.isPlaying = this.options.autoplay
    this.autoplayTimer = null
    
    this.init()
  }

  init() {
    // Add necessary classes and wrappers
    this.element.classList.add('carousel')
    
    // Set up navigation if enabled
    if (this.options.navigation) {
      this.setupNavigation()
    }

    // Set up indicators if enabled
    if (this.options.indicators) {
      this.setupIndicators()
    }

    // Add event listeners
    this.setupEventListeners()

    // Start autoplay if enabled
    if (this.options.autoplay) {
      this.startAutoplay()
    }

    // Show initial slide
    this.showSlide(this.currentIndex)
  }

  setupNavigation() {
    const prevBtn = this.element.querySelector('.carousel-button.prev')
    const nextBtn = this.element.querySelector('.carousel-button.next')

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev())
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next())
    }
  }

  setupIndicators() {
    const indicators = this.element.querySelector('.carousel-indicators')
    if (!indicators) return

    Array.from(this.slides).forEach((_, index) => {
      const indicator = indicators.children[index]
      if (indicator) {
        indicator.addEventListener('click', () => this.goToSlide(index))
      }
    })
  }

  setupEventListeners() {
    // Pause on hover
    this.element.addEventListener('mouseenter', () => this.pause())
    this.element.addEventListener('mouseleave', () => {
      if (this.options.autoplay) {
        this.startAutoplay()
      }
    })

    // Touch support
    let touchStartX = 0
    let touchEndX = 0

    this.element.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    this.element.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX
      this.handleSwipe(touchStartX, touchEndX)
    })

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.element.matches(':hover')) {
        if (e.key === 'ArrowLeft') {
          this.prev()
        } else if (e.key === 'ArrowRight') {
          this.next()
        }
      }
    })

    // Update indicator states
    this.element.addEventListener('slide-change', () => {
      const indicators = this.element.querySelectorAll('.carousel-indicators .indicator')
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentIndex)
      })
    })
  }

  handleSwipe(startX, endX) {
    const threshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next()
      } else {
        this.prev()
      }
    }
  }

  showSlide(index) {
    // Handle looping
    if (index >= this.slides.length) {
      index = this.options.loop ? 0 : this.slides.length - 1
    } else if (index < 0) {
      index = this.options.loop ? this.slides.length - 1 : 0
    }

    // Update slides
    Array.from(this.slides).forEach((slide, i) => {
      slide.classList.toggle('active', i === index)
    })

    // Update indicators
    const indicators = this.element.querySelectorAll('.carousel-indicators .indicator')
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index)
    })

    // Update current index
    this.currentIndex = index

    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('slide-change', {
      detail: { index: this.currentIndex }
    }))
  }

  startAutoplay() {
    if (!this.options.autoplay) return
    this.isPlaying = true
    this.autoplayTimer = setInterval(() => {
      this.next()
    }, this.options.autoplayDelay)
  }

  stopAutoplay() {
    this.isPlaying = false
    clearInterval(this.autoplayTimer)
  }

  pause() {
    this.stopAutoplay()
  }

  resume() {
    if (this.options.autoplay) {
      this.startAutoplay()
    }
  }

  next() {
    this.goToSlide(this.currentIndex + 1)
  }

  prev() {
    this.goToSlide(this.currentIndex - 1)
  }

  goToSlide(index) {
    // Reset autoplay timer
    if (this.isPlaying) {
      this.stopAutoplay()
      this.showSlide(index)
      this.startAutoplay()
    } else {
      this.showSlide(index)
    }
  }

  // Public methods for external control
  play() {
    this.startAutoplay()
  }

  stop() {
    this.stopAutoplay()
  }

  destroy() {
    this.stopAutoplay()
    // Remove event listeners
    this.element.querySelectorAll('.carousel-button').forEach(button => {
      button.removeEventListener('click', () => {})
    })
    this.element.querySelectorAll('.carousel-indicators .indicator').forEach(indicator => {
      indicator.removeEventListener('click', () => {})
    })
    this.element.removeEventListener('mouseenter', () => {})
    this.element.removeEventListener('mouseleave', () => {})
    document.removeEventListener('keydown', () => {})
  }
}