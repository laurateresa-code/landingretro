(() => {
  const feedback = document.querySelector('.feedback');
  if (!feedback) return;
  const track = feedback.querySelector('.feedback__track');
  const viewport = feedback.querySelector('.feedback__viewport');
  const dots = [...feedback.querySelectorAll('.feedback__dots .dot')];
  if (!track || !viewport || dots.length === 0) return;

  const slides = [...track.querySelectorAll('.feedback__item')];
  let index = 0;
  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    const x = index * viewport.clientWidth;
    track.style.transform = `translateX(-${x}px)`;
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
  };

  dots.forEach((d, di) => d.addEventListener('click', () => {
    goTo(di);
    resetAuto();
  }));

  let auto = setInterval(() => goTo(index + 1), 5000);
  const resetAuto = () => {
    if (auto) clearInterval(auto);
    auto = setInterval(() => goTo(index + 1), 5000);
  };

  window.addEventListener('resize', () => {
    goTo(index);
  });

  goTo(0);
})();
