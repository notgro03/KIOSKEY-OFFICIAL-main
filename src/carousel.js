export function initCarousel() {
  const carouselSlides = document.querySelector('.carousel-slides');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const indicators = document.querySelectorAll('.indicator');

  if (!carouselSlides || !slides.length) return;

  let currentSlide = 0;
  let autoPlayInterval;

  function showSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    carouselSlides.style.transform = `translateX(-${currentSlide * 20}%)`;

    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add('active');
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event Listeners
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoPlay();
      showSlide(index);
      startAutoPlay();
    });
  });

  // Touch/swipe support
  let startX = 0;
  let endX = 0;

  carouselSlides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carouselSlides.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      stopAutoPlay();
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoPlay();
    }
  }

  // Initialize
  showSlide(0);
  startAutoPlay();

  // Pause on hover
  carouselSlides.addEventListener('mouseenter', stopAutoPlay);
  carouselSlides.addEventListener('mouseleave', startAutoPlay);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCarousel);