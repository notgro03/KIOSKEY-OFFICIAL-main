class Carousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    
    this.initializeElements();

    if (this.totalSlides < 1) {
      return;
    }

    this.bindEvents();
    this.startAutoPlay();
    this.showSlide(0);
  }

  initializeElements() {
    this.slidesContainer = document.querySelector('.carousel-slides');
    this.slides = document.querySelectorAll('.carousel-slide');
    this.totalSlides = this.slides.length;
    this.prevButton = document.querySelector('.carousel-button.prev');
    this.nextButton = document.querySelector('.carousel-button.next');
    this.indicators = document.querySelectorAll('.indicator');
    
    if (!this.slidesContainer || !this.slides.length) {
      console.error('Carousel elements not found');
      return;
    }
  }

  bindEvents() {
    // Navigation buttons
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => {
        this.stopAutoPlay();
        this.previousSlide();
        this.startAutoPlay();
      });
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.stopAutoPlay();
        this.nextSlide();
        this.startAutoPlay();
      });
    }

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.stopAutoPlay();
        this.goToSlide(index);
        this.startAutoPlay();
      });
    });

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        this.stopAutoPlay();
      });

      carouselContainer.addEventListener('mouseleave', () => {
        this.startAutoPlay();
      });
    }

    // Touch/swipe support for mobile
    this.addTouchSupport();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.stopAutoPlay();
        this.previousSlide();
        this.startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.stopAutoPlay();
        this.nextSlide();
        this.startAutoPlay();
      }
    });
  }

  addTouchSupport() {
    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;

    if (this.slidesContainer) {
      this.slidesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      this.slidesContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const swipeDistance = startX - endX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
          this.stopAutoPlay();
          
          if (swipeDistance > 0) {
            // Swipe left - next slide
            this.nextSlide();
          } else {
            // Swipe right - previous slide
            this.previousSlide();
          }
          
          this.startAutoPlay();
        }
      }, { passive: true });
    }
  }

  showSlide(index) {
    if (!this.slidesContainer) return;

    // Ensure index is within bounds
    if (index < 0) {
      this.currentSlide = this.totalSlides - 1;
    } else if (index >= this.totalSlides) {
      this.currentSlide = 0;
    } else {
      this.currentSlide = index;
    }

    // Move slides
    const translateX = -this.currentSlide * 100;
    this.slidesContainer.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    this.updateIndicators();

    // Update button states
    this.updateButtonStates();
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  updateButtonStates() {
    // Optional: Add disabled state for first/last slides if you don't want infinite loop
    // For now, we'll keep infinite loop behavior
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  previousSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // Public method to update slides (for when you add real flyer images)
  updateSlides(imageUrls) {
    if (!Array.isArray(imageUrls) || imageUrls.length !== this.totalSlides) {
      console.error('Invalid image URLs array');
      return;
    }

    this.slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      if (img && imageUrls[index]) {
        img.src = imageUrls[index];
        img.alt = `Flyer ${index + 1}`;
      }
    });
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.carousel = new Carousel();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Carousel;
}