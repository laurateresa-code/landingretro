(() => {
  const carousel = document.querySelector('.mini-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('.carousel-nav.prev');
  const next = carousel.querySelector('.carousel-nav.next');
  if (!track || !prev || !next) return;

  const getItemWidth = () => {
    // Scroll by the width of the container (one group of 3 images)
    // Or scroll by one item width? User said "cada grupo de imagens fique visível", so scroll by container width.
    return track.clientWidth + 10; // +10 for gap correction if needed, but smooth scroll handles it
  };

  const scrollNext = () => {
    // Check if we are at the end
    // Use a small buffer for float precision
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: track.clientWidth + 10, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (track.scrollLeft <= 10) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -(track.clientWidth + 10), behavior: 'smooth' });
    }
  };

  prev.addEventListener('click', () => {
    scrollPrev();
    resetTimer();
  });

  next.addEventListener('click', () => {
    scrollNext();
    resetTimer();
  });

  let timer = setInterval(scrollNext, 5000);

  const resetTimer = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(scrollNext, 5000);
  };

  carousel.addEventListener('mouseenter', () => {
    if (timer) clearInterval(timer);
  });

  carousel.addEventListener('mouseleave', () => {
    resetTimer();
  });
})();
