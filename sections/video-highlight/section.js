(() => {
  const gallery = document.querySelector('.video-gallery');
  if (!gallery) return;
  const track = gallery.querySelector('.vg__track');
  const prev = gallery.querySelector('.vg__control.prev');
  const next = gallery.querySelector('.vg__control.next');
  if (!track || !prev || !next) return;
  const scrollBy = () => {
    const firstSlide = track.querySelector('.vg__slide');
    const w = firstSlide ? firstSlide.getBoundingClientRect().width + 14 : 300;
    return w;
  };
  prev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollBy(), behavior: 'smooth' });
    if (timer) { clearInterval(timer); timer = null; }
    scheduleResume();
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: scrollBy(), behavior: 'smooth' });
    if (timer) { clearInterval(timer); timer = null; }
    scheduleResume();
  });
  let timer = setInterval(() => {
    track.scrollBy({ left: scrollBy(), behavior: 'smooth' });
  }, 3500);
  let resumeTimeout = null;
  const scheduleResume = () => {
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      if (!timer) {
        timer = setInterval(() => {
          track.scrollBy({ left: scrollBy(), behavior: 'smooth' });
        }, 3500);
      }
    }, 8000);
  };
  gallery.addEventListener('mouseenter', () => clearInterval(timer));
  gallery.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
      track.scrollBy({ left: scrollBy(), behavior: 'smooth' });
    }, 3500);
  });
})();
