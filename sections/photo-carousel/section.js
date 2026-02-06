(function() {
  const track = document.querySelector('.photo-carousel__track');
  if (!track) return;

  // Lista de imagens (reutilizando assets existentes para simular 15+ fotos)
  const images = [
    'assets/img/Imagens Village/village01.png',
    'assets/img/Imagens Village/village02.png',
    'assets/img/Imagens Village/village03.png',
    'assets/img/Imagens Village/village04.png',
    'assets/img/Imagens Village/village05.png',
    'assets/img/Imagens Village/village06.png',
    'assets/img/Imagens Village/village07.png',
    'assets/img/Imagens Village/village08.png',
    'assets/img/Imagens Village/village09.png',
    'assets/img/Imagens Village/village10.png',
    'assets/img/Imagens Village/village11.png',
    'assets/img/Imagens Village/village12.png'
  ];

  // Preencher o carrossel
  images.forEach(src => {
    const slide = document.createElement('div');
    slide.classList.add('photo-carousel__slide');
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Foto do Village Retrô';
    img.loading = 'lazy'; // Performance
    slide.appendChild(img);
    track.appendChild(slide);
  });

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.photo-carousel__btn--next');
  const prevButton = document.querySelector('.photo-carousel__btn--prev');
  let currentIndex = 0;
  let interval;

  const updateCarousel = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    interval = setInterval(nextSlide, 4000); // 4 segundos por slide
  };

  const stopAutoScroll = () => {
    clearInterval(interval);
  };

  // Event Listeners
  nextButton.addEventListener('click', () => {
    nextSlide();
    startAutoScroll(); // Reinicia o timer ao interagir
  });

  prevButton.addEventListener('click', () => {
    prevSlide();
    startAutoScroll();
  });

  // Pausar no hover (opcional, mas boa prática de UX)
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);

  // Resize handling
  window.addEventListener('resize', updateCarousel);

  // Iniciar
  startAutoScroll();
})();
