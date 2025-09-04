export function initCarousel() {
  const carouselSlides = document.querySelector('.carousel-slides');
  const slides = document.querySelectorAll('.carousel-slide');
  const leftArrow = document.querySelector('.carousel-nav-left');
  const rightArrow = document.querySelector('.carousel-nav-right');
  const paginationDotsContainer = document.querySelector('.carousel-pagination');

  let currentSlide = 0;
  let autoPlayInterval;

  // Create pagination dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => showSlide(index));
    paginationDotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.carousel-pagination .dot');

  function showSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    carouselSlides.style.transform = \`translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Cambia de diapositiva cada 5 segundos
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event Listeners
  rightArrow.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  leftArrow.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  // Initial setup
  showSlide(currentSlide);
  startAutoPlay();
}