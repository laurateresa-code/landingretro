(() => {
  const root = document.getElementById('agenda');
  if (!root) return;
  const month = Number(root.dataset.month || 4); // abril
  const year = Number(root.dataset.year || 2026);
  const grid = root.querySelector('.calendar__grid');
  const title = root.querySelector('#calTitle');
  if (!grid || !title) return;

  title.textContent = `Abril ${year}`;

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);
  const dayHeaderCount = 7;
  grid.innerHTML = '';

  for (let i = 0; i < start.getDay(); i++) {
    const pad = document.createElement('div');
    grid.appendChild(pad);
  }

  let rangeStart = null;
  let rangeEnd = null;
  const reserveBtn = document.getElementById('reserveBtn');
  const setReserveEnabled = (enabled) => {
    if (!reserveBtn) return;
    reserveBtn.disabled = !enabled;
    reserveBtn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
    reserveBtn.classList.toggle('is-disabled', !enabled);
  };
  setReserveEnabled(false);

  const renderRange = () => {
    const days = Array.from(grid.querySelectorAll('.day'));
    days.forEach(d => d.classList.remove('is-selected','in-range','range-start','range-end'));
    if (rangeStart && !rangeEnd) {
      rangeStart.classList.add('is-selected','range-start','range-end');
      setReserveEnabled(true);
      return;
    }
    if (rangeStart && rangeEnd) {
      const s = Number(rangeStart.dataset.day);
      const e = Number(rangeEnd.dataset.day);
      days.forEach(d => {
        const val = Number(d.dataset.day);
        if (val >= s && val <= e) {
          d.classList.add('in-range');
          if (val === s) d.classList.add('range-start');
          if (val === e) d.classList.add('range-end');
        }
      });
      setReserveEnabled(true);
      return;
    }
    setReserveEnabled(false);
  };

  for (let day = 1; day <= end.getDate(); day++) {
    const el = document.createElement('button');
    el.className = 'day';
    el.textContent = String(day);
    el.dataset.day = String(day);
    el.setAttribute('aria-label', `Selecionar dia ${day}`);
    el.addEventListener('click', () => {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        rangeStart = el; rangeEnd = null;
      } else {
        const startDay = Number(rangeStart.dataset.day);
        const curr = Number(el.dataset.day);
        if (curr < startDay) {
          rangeEnd = rangeStart;
          rangeStart = el;
        } else {
          rangeEnd = el;
        }
      }
      renderRange();
    });
    grid.appendChild(el);
  }

  // Quantidade de adultos/crianças
  const adultsEl = document.getElementById('qty-adults');
  const kidsEl = document.getElementById('qty-kids');
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  root.querySelectorAll('.qty__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      const inc = btn.classList.contains('qty--inc') ? 1 : -1;
      if (target === 'adults') {
        const val = clamp(Number(adultsEl.textContent) + inc, 1, 10);
        adultsEl.textContent = String(val);
      } else if (target === 'kids') {
        const val = clamp(Number(kidsEl.textContent) + inc, 0, 10);
        kidsEl.textContent = String(val);
      }
    });
  });

  reserveBtn?.addEventListener('click', () => {
    const adults = Number(adultsEl.textContent);
    const kids = Number(kidsEl.textContent);
    const startDay = rangeStart ? Number(rangeStart.dataset.day) : null;
    const endDay = rangeEnd ? Number(rangeEnd.dataset.day) : startDay;
    const from = startDay ? new Date(year, month - 1, startDay) : null;
    const to = endDay ? new Date(year, month - 1, endDay) : null;
    if (!from || !to) {
      alert('Selecione pelo menos um dia no calendário (Day Use ou período).');
      return;
    }
    if (adults < 1) {
      alert('É obrigatório pelo menos 1 adulto para confirmar a reserva.');
      return;
    }
    const info = {
      periodo: from && to ? `${from.toLocaleDateString('pt-BR')} - ${to.toLocaleDateString('pt-BR')}` : 'não selecionado',
      adultos: adults,
      criancas: kids
    };
    alert(`Reserva:\nPeríodo: ${info.periodo}\nAdultos: ${info.adultos}\nCrianças: ${info.criancas}\n(Adultos a partir de 11 anos)`);
  });
})();
