// ── BACK TO TOP ──
const btnTop = document.getElementById('back-to-top');

if (btnTop) {
  window.addEventListener('scroll', () => {
    btnTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

  // ── NAVBAR TABS ACTIVOS AL SCROLL ──
  const tabs = document.querySelectorAll('.vscode-tab');
  const sectionMap = { hero:0, indice:0, tema1:1, tema2:2, tema3:3, tema4:4, 'ia-warning':5 };
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tabs.forEach(t => t.classList.remove('active'));
        const idx = sectionMap[e.target.id];
        if (tabs[idx]) tabs[idx].classList.add('active');
      }
    });
  }, { threshold: 0.35 }).observe && document.querySelectorAll('section[id]').forEach(s => {
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tabs.forEach(t => t.classList.remove('active'));
          const idx = sectionMap[e.target.id];
          if (tabs[idx] !== undefined) tabs[idx].classList.add('active');
        }
      });
    }, { threshold: 0.3 }).observe(s);
  });

  // ── LAZY LOAD ANIMACIONES DE ENTRADA ──
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .step, .code-wrap, .prompt-card, .tip, .video-container, .source-card, .mistake-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    fadeObs.observe(el);
  });

  // ── COPY CODE ──
  function copyCode(btn) {
    const pre = btn.closest('.code-wrap').querySelector('pre');
    navigator.clipboard.writeText(pre.innerText).then(() => {
      btn.textContent = '✓ Copiado';
      setTimeout(() => btn.textContent = 'Copiar', 2000);
    });
  }