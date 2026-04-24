  // ── NAVBAR SCROLL
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── TYPEWRITER
  const phrases = [
    'Desarrollador Web Full Stack',
    'Técnico en Infraestructura',
    'Automatización con Python',
    'Streaming & Broadcast Tech',
    'Sistemas Linux en producción'
  ];
  let pi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typewriter');

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();

  // ── COUNTER ANIMATION
  function animateCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '+';
    let count = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(interval);
    }, 40);
  }

  // ── SCROLL REVEAL
  const revealEls = document.querySelectorAll('.reveal');
  const counterEls = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      counterEls.forEach(el => animateCounter(el));
    }
  }, { threshold: 0.5 });
  counterObserver.observe(document.querySelector('.hero-stats'));

  // ── FOOTER YEAR
  document.getElementById('year').textContent = new Date().getFullYear();

  // ── FORM SUBMIT (Formspree)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        document.getElementById('form-success').style.display = 'block';
        btn.textContent = '✓ Enviado';
      } else {
        btn.textContent = 'Error. Intentá de nuevo.';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error de red.';
      btn.disabled = false;
    }
  });