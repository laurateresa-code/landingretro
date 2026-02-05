(() => {
  const feedback = document.querySelector('.feedback');
  if (!feedback) return;
  const track = feedback.querySelector('.feedback__track');
  const viewport = feedback.querySelector('.feedback__viewport');
  const dots = [...feedback.querySelectorAll('.feedback__dots .dot')];
  if (!track || !viewport || dots.length === 0) return;

  let index = 0;
  let slideW = viewport.clientWidth;
  const goTo = (i) => {
    index = (i + dots.length) % dots.length;
    const x = index * slideW;
    track.scrollTo({ left: x, behavior: 'smooth' });
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
  };

  dots.forEach((d, di) => d.addEventListener('click', () => {
    goTo(di);
    pauseAuto();
    scheduleResume();
  }));

  let auto = setInterval(() => goTo(index + 1), 4000);
  const pauseAuto = () => { if (auto) { clearInterval(auto); auto = null; } };
  const scheduleResume = () => {
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      if (!auto) auto = setInterval(() => goTo(index + 1), 4000);
    }, 8000);
  };
  let resumeTimeout = null;

  feedback.addEventListener('mouseenter', pauseAuto);
  feedback.addEventListener('mouseleave', () => {
    if (!auto) auto = setInterval(() => goTo(index + 1), 4000);
  });

  window.addEventListener('resize', () => {
    slideW = viewport.clientWidth;
    goTo(index);
  });
})();
