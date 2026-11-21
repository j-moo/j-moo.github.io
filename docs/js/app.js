(() => {
  'use strict';
  // Both the intro and its guided tour depend on the first screen's actual images and fonts.
  const hero = document.querySelector('[data-hero]');
  const images = [...hero.querySelectorAll('img:not([loading="lazy"])'),document.querySelector('.desk-light img')];
  if (hero.dataset.stockSrc) {
    const paper = new Image();
    paper.src = hero.dataset.stockSrc;
    images.push(paper);
  }
  const decoded = images.filter(Boolean).map(img => {
    if (img.decode) return img.decode();
    if (img.complete) return img.naturalWidth ? Promise.resolve() : Promise.reject();
    return new Promise((resolve,reject) => {
      img.addEventListener('load',resolve,{once:true});
      img.addEventListener('error',reject,{once:true});
    });
  });
  window.portfolioHeroAssetsReady = Promise.allSettled([...decoded,document.fonts?.ready])
    .then(results => results.every(result => result.status === 'fulfilled'));
  const buttons = [...document.querySelectorAll('[data-skill]')];
  function selectSkill(active) {
    for (const el of buttons) el.setAttribute('aria-expanded', String(el === active));
  }
  for (const button of buttons) {
    button.addEventListener('focus', () => selectSkill(button));
    button.addEventListener('blur', () => selectSkill(null));
    button.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') selectSkill(button); });
    button.addEventListener('pointerleave', e => {
      if (e.pointerType === 'mouse' && document.activeElement !== button) selectSkill(null);
    });
    button.addEventListener('click', () => selectSkill(button));
  }
  document.addEventListener('pointerdown', e => { if (!e.target.closest('[data-skill]')) selectSkill(null); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') selectSkill(null); });
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

  const dialog = document.getElementById('image-dialog');
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let caller;
  document.addEventListener('click', e => {
    const button = e.target.closest('[data-image-open][data-image-src]');
    if (!button || !dialog.showModal) return;
    caller = button;
    image.alt = button.querySelector('img')?.alt || button.dataset.caption || '';
    image.src = button.dataset.imageSrc;
    caption.textContent = button.dataset.caption || image.alt;
    dialog.showModal();
  });
  dialog.querySelector('[data-close-image]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    if (caller?.isConnected && !caller.closest('[hidden],[inert]')) caller.focus({preventScroll:true});
  });
  document.documentElement.classList.add('js');
})();
