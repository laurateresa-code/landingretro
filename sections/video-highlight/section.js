(() => {
  const carousel = document.querySelector('.mini-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('.carousel-nav.prev');
  const next = carousel.querySelector('.carousel-nav.next');
  if (!track || !prev || !next) return;

  // Cleanup: Remove any leftover clones from previous sessions
  const clones = track.querySelectorAll('.clone');
  clones.forEach(c => c.remove());

  const scrollNext = () => {
    // Stride = (ImageWidth 256 + Gap 16) * 3 = 816
    const stride = 816;
    
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: stride, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    const stride = 816;
    
    if (track.scrollLeft <= 10) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -stride, behavior: 'smooth' });
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

/* --- NEW: Icons Mobile Carousel & Animation --- */
(() => {
  const iconsGrid = document.querySelector('.icons-grid');
  if (!iconsGrid) return;

  // Auto Scroll
  let iconTimer;
  const startIconScroll = () => {
    if (iconTimer) clearInterval(iconTimer);
    
    iconTimer = setInterval(() => {
       // Check if scroll enabled (mainly for mobile)
       if (iconsGrid.scrollWidth <= iconsGrid.clientWidth) return;

       // Calculate scroll amount: item width + gap
       const icon = iconsGrid.querySelector('.icon-badge');
       if (!icon) return;
       
       const itemWidth = icon.offsetWidth;
       // We can just scroll by itemWidth if there's no gap logic in offsetWidth
       // The CSS gap is 15px.
       // However, scrollBy works well.
       
       // Check if at end
       if (iconsGrid.scrollLeft + iconsGrid.clientWidth >= iconsGrid.scrollWidth - 10) {
         iconsGrid.scrollTo({ left: 0, behavior: 'smooth' });
       } else {
         // Scroll to next snap point roughly
         iconsGrid.scrollBy({ left: iconsGrid.clientWidth, behavior: 'smooth' });
       }
    }, 3000);
  };

  // Start logic
  startIconScroll();

  // Click Animation Logic
  const icons = iconsGrid.querySelectorAll('.icon-badge');
  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      // Remove class if exists to restart animation
      icon.classList.remove('shimmer-effect');
      void icon.offsetWidth; // trigger reflow
      icon.classList.add('shimmer-effect');
    });
  });
})();
