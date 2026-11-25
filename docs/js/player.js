(() => {
  'use strict';
  const player = document.querySelector('[data-player]');
  if (!player) return;
  const slides = [...player.querySelectorAll('[data-player-slide]')];
  if (!slides.length) return;
  const status = player.querySelector('[data-player-status]');
  const hero = player.closest('[data-hero]');
  const tour = hero.querySelector('[data-desk-tour]');
  const tourMessages = [...tour.querySelectorAll('[data-tour-message]')];
  const advanceTour = tour.querySelector('[data-tour-next]');
  const skipTour = tour.querySelector('[data-tour-skip]');
  const tourVideo = tour.querySelector('[data-tour-video]');
  const tourImage = tour.querySelector('[data-tour-image]');
  const stage = hero.closest('#stage');
  const tourEvents = new AbortController();
  const tourStorageKey = 'jongmu-desk-tour-v1';
  let tourIndex = 0;
  const motion = matchMedia('(prefers-reduced-motion: no-preference) and (forced-colors: none)');
  const deck = [...slides].sort((a, b) => Number(a.dataset.depth) - Number(b.dataset.depth));
  const front = () => deck[0];
  const action = (slide, key) => slide.querySelector('[data-deck-action="' + key + '"]');
  const plain = event => !(event.altKey || event.ctrlKey || event.shiftKey || event.metaKey);
  const entrance = new Set();
  let settleCards;
  const cardsReady = new Promise(resolve => { settleCards = resolve; });
  const swapping = new Set();
  let transition = 0, dealTimeout, lastArrowClick, entranceEvents;

  // The mask reveals the real controls, so focus, video playback and deck gestures stay on the originals.
  const shade = hero.querySelector('.tour-shade');
  const cutouts = [...shade.querySelectorAll('[data-light-target]')];
  let lightFrame = 0, followUntil = 0;
  function placeLights(now) {
    lightFrame = 0;
    const origin = shade.getBoundingClientRect();
    const rects = cutouts.map(hole => {
      const target = hero.querySelector(hole.dataset.lightTarget);
      const box = target.getBoundingClientRect();
      if (!box.width || !box.height) return [0,0,0,0];
      const pad = target === tour ? 1 : 5;
      let x = box.left, y = box.top, width = box.width, height = box.height;
      if (target.hasAttribute('data-deck-action')) {
        const arrow = parseFloat(getComputedStyle(target,'::after').height);
        width = Math.min(width,target.querySelector('.deck-control-face').offsetWidth + 8);
        x += (box.width - width) / 2;
        y -= arrow;
        height += arrow;
      }
      return [x-origin.left-pad,y-origin.top-pad,width+pad*2,height+pad*2];
    });
    const attrs = ['x','y','width','height'];
    cutouts.forEach((hole,i) => rects[i].forEach((value,j) => {
      const next = value.toFixed(1);
      if (hole.getAttribute(attrs[j]) !== next) hole.setAttribute(attrs[j],next);
    }));
    if (now < followUntil) lightFrame = requestAnimationFrame(placeLights);
  }
  function trackLights(duration = 0) {
    if (!hero.dataset.tourStep) return;
    followUntil = Math.max(followUntil,performance.now() + duration);
    if (!lightFrame) lightFrame = requestAnimationFrame(placeLights);
  }
  const lightResize = new ResizeObserver(() => trackLights());
  for (const element of [hero,player,tour,hero.querySelector('.desk-shortcuts')]) lightResize.observe(element);
  hero.addEventListener('transitionrun', event => {
    if (event.propertyName === 'scale') trackLights(300);
  }, {signal:tourEvents.signal});
  window.addEventListener('scroll', () => trackLights(1000), {capture:true,passive:true,signal:tourEvents.signal});
  window.visualViewport?.addEventListener('resize', () => trackLights(), {signal:tourEvents.signal});

  function clearAnimations(collection) {
    for (const animation of collection) animation.cancel();
    collection.clear();
  }
  function finishEntrance() {
    clearTimeout(dealTimeout);
    entranceEvents?.abort();
    clearAnimations(entrance);
    hero.dataset.dealState = 'done';
    settleCards();
    trackLights();
  }
  function beginEntrance(animate) {
    if (hero.dataset.dealState !== 'waiting') return;
    if (!animate || !motion.matches || scrollY > 8 || document.hidden) {
      finishEntrance();
      return;
    }
    clearTimeout(dealTimeout);
    const sheets = [hero.querySelector('.contact-card'), ...[...deck].reverse()];
    hero.dataset.dealState = 'running';
    trackLights(1900);
    for (const [index, sheet] of sheets.entries()) {
      const final = getComputedStyle(sheet).transform.replace('none', '');
      const first = 'translate(' + (index ? '5%' : '-3%') + ', -9%) rotate(' + (index % 2 ? 2 : -1.5) + 'deg) ' + final;
      const animation = sheet.animate([
        {transform:first, opacity:0},
        {transform:'translate(0,-.7%) ' + final, opacity:1, offset:.82},
        {transform:final || 'none', opacity:1}
      ], {duration:860, delay:index*255, easing:'cubic-bezier(.23,.67,.23,1)', fill:'backwards'});
      entrance.add(animation);
    }
    const last = [...entrance].at(-1);
    last.finished.then(finishEntrance, () => {});
  }

  function progress(slide,video) {
    if (!slide?.dataset.film) return;
    const seconds = Math.floor(video.currentTime || 0);
    const duration = Number.isFinite(video.duration) ? video.duration : Number(slide.dataset.duration);
    slide.style.setProperty('--track-position', duration ? Math.min(1,seconds/duration) : 0);
    slide.querySelector('[data-elapsed]').textContent = '00:' + String(seconds).padStart(2,'0');
  }
  function finishTour(focusScrollButton) {
    delete hero.dataset.tourStep;
    tour.hidden = true;
    tour.inert = true;
    try { sessionStorage.setItem(tourStorageKey, '1'); } catch {}
    tourEvents.abort();
    lightResize.disconnect();
    cancelAnimationFrame(lightFrame);
    if (focusScrollButton) hero.querySelector('[data-desk-next]').focus({preventScroll:true});
  }
  function showTourStep() {
    const current = tourMessages[tourIndex];
    if (!current) {
      finishTour(true);
      return;
    }
    const last = tourIndex === tourMessages.length - 1;
    hero.dataset.tourStep = current.dataset.tourMessage;
    for (const note of tourMessages) note.hidden = note !== current;
    tour.querySelector('[data-tour-count]').textContent = (tourIndex + 1) + ' / ' + tourMessages.length;
    tour.querySelector('[data-tour-label]').textContent = last ? '마침' : '다음';
    tour.querySelector('[data-tour-arrow]').textContent = last ? '✓' : '→';
    advanceTour.setAttribute('aria-label', last ? '안내 마침' : '안내 다음 단계');
    tour.hidden = false;
    trackLights(400);
  }
  advanceTour.addEventListener('click', () => {
    tourIndex++;
    showTourStep();
  });
  skipTour?.addEventListener('click', () => finishTour(true));
  // Any direct navigation, scroll into the reader, or Escape dismisses the non-blocking guide.
  document.addEventListener('click', event => {
    if (!hero.dataset.tourStep || event.button || event.defaultPrevented) return;
    const button = event.target.closest('[data-open-pane],[data-open-project],.identity-mail,.skip-link');
    if (button && !button.closest('[inert],:disabled')) finishTour(false);
  }, {capture:true, signal:tourEvents.signal});
  window.addEventListener('keydown', event => {
    if (hero.dataset.tourStep && event.key === 'Escape' && !event.isComposing && !watching) finishTour(false);
  }, {signal:tourEvents.signal});
  function finishOnGlass() {
    if (!hero.dataset.tourStep) return;
    const glassShell = document.querySelector('[data-glass-shell]');
    const reached = stage.hasAttribute('data-stage-ready') ? stage.dataset.stageActive === 'glass'
      : glassShell.getBoundingClientRect().top < innerHeight * .55;
    if (reached) finishTour(false);
  }
  window.addEventListener('scroll', finishOnGlass, {passive:true, signal:tourEvents.signal});
  window.addEventListener('portfolio-stage-change', finishOnGlass, {signal:tourEvents.signal});
  window.addEventListener('popstate', () => finishTour(false), {signal:tourEvents.signal});
  function applyOrder() {
    tourVideo.hidden = !front().dataset.film;
    tourImage.hidden = !tourVideo.hidden;
    for (const [index, sheet] of deck.entries()) {
      const active = index === 0;
      sheet.dataset.depth = index;
      sheet.inert = !active;
      if (active) sheet.removeAttribute('aria-hidden');
      else sheet.setAttribute('aria-hidden','true');
      sheet.querySelector('[data-deck-credit]').toggleAttribute('data-player-credit',active);
      for (const button of sheet.querySelectorAll('[data-deck-action]')) {
        button.toggleAttribute('data-player-'+button.dataset.deckAction,active);
      }
    }
  }
  function counterpart(old, next) {
    const target = document.activeElement;
    if (!old.contains(target)) return null;
    if (target.closest('.card-open')) return next.querySelector('.card-open');
    return action(next,target.closest('[data-deck-action]')?.dataset.deckAction || 'play');
  }
  function shuffle(key, direction) {
    const next = slides.find(sheet => sheet.dataset.key === key);
    const old = front();
    if (!next || next === old) return;
    finishEntrance();
    const focus = counterpart(old,next);
    const before = new Map(slides.map(sheet => [sheet,getComputedStyle(sheet).transform]));
    clearAnimations(swapping);
    const cycle = ++transition;
    deck.splice(deck.indexOf(next),1);
    if (direction > 0) deck.push(deck.shift());
    deck.unshift(next);
    applyOrder();
    trackLights(600);
    focus?.focus({preventScroll:true});
    status.textContent = next.dataset.name + ' · ' + next.querySelector('.track-title').textContent;
    delete player.dataset.shuffling;
    if (!motion.matches || typeof old.animate !== 'function') return;

    // On narrow tables the open space is on the left of the stack.
    const rect = player.getBoundingClientRect();
    const side = direction > 0 && document.documentElement.clientWidth - rect.right >= rect.width * .58 ? 1 : -1;
    const outX = side * Math.min(rect.width * .82, side < 0 ? rect.left * .87 : (innerWidth-rect.right) * .88);
    const excursion = 'translate(' + outX + 'px,-5%) rotate(' + (side*8) + 'deg)';
    player.dataset.shuffling = '';
    const traveler = direction > 0 ? old : next;
    for (const sheet of slides) {
      const end = getComputedStyle(sheet).transform;
      const startsAbove = direction > 0;
      const positions = sheet === traveler ? [
        {transform:before.get(sheet),zIndex:startsAbove ? 6 : 0},
        {transform:excursion,zIndex:startsAbove ? 6 : 0,offset:.47},
        {transform:excursion,zIndex:startsAbove ? 0 : 6,offset:.48},
        {transform:end,zIndex:startsAbove ? 0 : 6}
      ] : [{transform:before.get(sheet)},{transform:end}];
      const animation = sheet.animate(positions, {
        duration:sheet === traveler ? 570 : 410, easing:'cubic-bezier(.28,.65,.24,1)'
      });
      swapping.add(animation);
    }
    Promise.allSettled([...swapping].map(animation => animation.finished)).then(() => {
      if (cycle === transition) { swapping.clear(); delete player.dataset.shuffling; }
    });
  }
  function directional(step) {
    if (action(front(),step > 0 ? 'next' : 'prev').disabled) return;
    const next = step > 0 ? deck[1] : deck.at(-1);
    shuffle(next.dataset.key,step);
  }
  const dialog = hero.querySelector('[data-viewer-template]').content.firstElementChild.cloneNode(true);
  hero.append(dialog);
  const video = dialog.querySelector('[data-viewer-video]');
  const screen = dialog.querySelector('[data-viewer-screen]');
  const poster = dialog.querySelector('[data-viewer-poster]');
  const message = dialog.querySelector('[data-viewer-error]');
  const dismissal = dialog.querySelector('[data-viewer-close]');
  const flips = new Set();
  let watching = null, invoker = null;

  function fitViewer() {
    const shell = document.querySelector('[data-glass-shell]');
    const width = document.documentElement.clientWidth, height = window.visualViewport?.height || innerHeight;
    const fixedGlass = shell?.closest('[data-stage-ready]');
    const h = fixedGlass && shell.offsetHeight ? shell.offsetHeight : Math.min(848,height * .9);
    dialog.style.setProperty('--viewer-w', Math.min(shell?.offsetWidth || width*.92,width) + 'px');
    dialog.style.setProperty('--viewer-h', Math.min(h,height) + 'px');
  }
  function resetViewer() {
    if (!watching) return;
    const trigger = invoker;
    const previous = watching;
    watching = null; invoker = null;
    clearAnimations(flips);
    video.pause();
    if (video.hasAttribute('src')) { video.removeAttribute('src'); video.load(); }
    video.hidden = true;
    video.style.removeProperty('--viewer-ratio');
    video.removeAttribute('poster');
    screen.hidden = true;
    screen.removeAttribute('src');
    poster.hidden = true;
    message.hidden = true;
    delete dialog.dataset.viewerPhase;
    previous.style.removeProperty('--track-position');
    const elapsed = previous.querySelector('[data-elapsed]');
    if (elapsed) elapsed.textContent = '00:00';
    if (!document.hidden && trigger?.isConnected && !trigger.closest('[inert]')) trigger.focus({preventScroll:true});
  }
  function endFlip(opening) {
    clearAnimations(flips);
    if (opening) { poster.hidden = true; dialog.dataset.viewerPhase = 'open'; }
    else {
      if (dialog.open) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      }
      resetViewer();
    }
  }
  function flipViewer(opening, startBox) {
    const previousTransform = opening ? '' : getComputedStyle(dialog).transform;
    const previousOpacity = poster.hidden ? 0 : Number(getComputedStyle(poster).opacity);
    clearAnimations(flips);
    dialog.dataset.viewerPhase = opening ? 'opening' : 'closing';
    if (!motion.matches || typeof dialog.animate !== 'function') { endFlip(opening); return; }
    const from = startBox || watching.querySelector('.album-art').getBoundingClientRect();
    const to = dialog.getBoundingClientRect();
    if (!from.width || !to.width) { endFlip(opening); return; }
    const pose = 'translate('+(from.left-to.left)+'px,'+(from.top-to.top)+'px) scale('+(from.width/to.width)+','+(from.height/to.height)+')';
    const options = {duration:opening ? 490 : 365,easing:'cubic-bezier(.23,.72,.23,1)',fill:'both'};
    poster.hidden = false;
    const movement = dialog.animate([{transform:opening ? pose : previousTransform},{transform:opening ? 'none' : pose}],options);
    const imageFade = poster.animate(opening
      ? [{opacity:1},{opacity:1,offset:.36},{opacity:0}]
      : [{opacity:previousOpacity},{opacity:1,offset:.55},{opacity:1}],options);
    flips.add(movement); flips.add(imageFade);
    movement.finished.then(() => { if (flips.has(movement)) endFlip(opening); }, () => {});
  }
  function showScreen(failed) {
    if (!watching) return;
    video.hidden = true;
    screen.src = watching.dataset.screen;
    screen.alt = watching.dataset.screenAlt;
    screen.hidden = false;
    if (failed) {
      message.textContent = '시연 파일을 열 수 없어 서비스 화면을 표시합니다.';
      message.hidden = false;
    }
  }
  function openViewer(trigger) {
    if (watching) return;
    finishEntrance(); clearAnimations(swapping); delete player.dataset.shuffling;
    watching = front(); invoker = trigger;
    const data = watching.dataset, art = watching.querySelector('.album-art'), src = art.querySelector('img');
    const bounds = art.getBoundingClientRect();
    dialog.querySelector('#viewer-title').textContent = data.name + ' · ' + data.release;
    dialog.querySelector('#viewer-caption').textContent = data.caption;
    poster.querySelector('img').src = src.currentSrc || src.src;
    poster.querySelector('.cover-imprint').textContent = data.name;
    poster.hidden = false;
    message.hidden = true;
    fitViewer();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
    dismissal.focus({preventScroll:true});
    if (data.film) {
      video.setAttribute('aria-label',data.name+' '+data.caption);
      video.poster = data.screen;
      video.src = data.film;
      video.hidden = false;
      const project = watching;
      video.play().catch(error => {
        if (watching === project && dialog.dataset.viewerPhase !== 'closing' && error.name !== 'AbortError' && error.name !== 'NotAllowedError') showScreen(true);
      });
    } else showScreen(false);
    flipViewer(true,bounds);
  }
  function closeViewer() {
    if (!watching || dialog.dataset.viewerPhase === 'closing') return;
    video.pause();
    flipViewer(false);
  }
  dismissal.addEventListener('click',closeViewer);
  dialog.addEventListener('cancel',event => {event.preventDefault();closeViewer();});
  dialog.addEventListener('keydown',event => {
    if (event.key === 'Escape' && !event.isComposing) {event.preventDefault();event.stopPropagation();closeViewer();}
  });
  dialog.addEventListener('click',event => {
    if (event.target !== dialog) return;
    const r=dialog.getBoundingClientRect();
    if (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) closeViewer();
  });
  dialog.addEventListener('wheel',event => {if (!event.ctrlKey) event.preventDefault();},{passive:false});
  dialog.addEventListener('close',() => {if (!dialog.open) resetViewer();});
  video.addEventListener('timeupdate',() => progress(watching,video));
  video.addEventListener('loadedmetadata', () => {
    if (video.videoHeight) video.style.setProperty('--viewer-ratio',video.videoWidth / video.videoHeight);
  });
  video.addEventListener('error',() => {if (watching?.dataset.film && video.getAttribute('src') && dialog.dataset.viewerPhase !== 'closing') showScreen(true);});
  window.addEventListener('resize',() => {if (watching) fitViewer();});
  player.addEventListener('click',event => {
    if (!plain(event) || event.button !== 0) return;
    // The next sleeve travels under the pointer. A second tap on the same arrow
    // can land on its printed time instead while it is settling.
    if (player.hasAttribute('data-shuffling') && event.detail > 0 && lastArrowClick &&
        Math.hypot(event.clientX-lastArrowClick.x,event.clientY-lastArrowClick.y) <= 9) {
      event.preventDefault();
      action(front(),lastArrowClick.direction > 0 ? 'next' : 'prev').focus({preventScroll:true});
      directional(lastArrowClick.direction);
      return;
    }
    const target = event.target.closest('[data-deck-action]');
    if (!target || target.disabled || !front().contains(target)) return;
    lastArrowClick = null;
    if (target.dataset.deckAction === 'play') {event.preventDefault();openViewer(target);}
    else {
      const direction = target.dataset.deckAction === 'prev' ? -1 : 1;
      if (event.detail > 0) lastArrowClick = {x:event.clientX,y:event.clientY,direction};
      directional(direction);
    }
  });
  player.addEventListener('keydown',event => {
    lastArrowClick = null;
    if (!plain(event) || event.target.closest('video')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();directional(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  const stopMotion = () => {
    finishEntrance();
    clearAnimations(swapping);
    delete player.dataset.shuffling;
  };
  motion.addEventListener('change', () => {
    if (!motion.matches) {
      stopMotion();
      if (watching) endFlip(dialog.dataset.viewerPhase !== 'closing');
    }
  });
  addEventListener('pagehide',() => {if (watching) endFlip(false);stopMotion();});
  applyOrder();
  const restored = history.state?.portfolio;
  const deepGlass = /^#(?:ai|artist|stack|education|projects\/(?:flex|melly|ddubi|tingle))$/.test(location.hash);
  let tourSeen = false;
  try { tourSeen = sessionStorage.getItem(tourStorageKey) === '1'; } catch {}
  if (deepGlass || tourSeen || restored?.scene === 'glass' || restored?.y > 8) finishTour(false);
  else {
    Promise.all([cardsReady, window.portfolioHeroAssetsReady]).then(() => {
      // Leave one painted frame with the settled cards before showing the glass and dimmer together.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!tourEvents.signal.aborted) showTourStep();
      }));
    });
  }
  player.dataset.playerReady = '';
  if (motion.matches && typeof player.animate === 'function' && scrollY <= 8 &&
      performance.getEntriesByType('navigation')[0]?.type !== 'back_forward') {
    hero.dataset.dealState = 'waiting';
    entranceEvents = new AbortController();
    const listeners = {passive:true,signal:entranceEvents.signal};
    const control = target => target.closest?.('a, button, video, input, select, textarea, [role="button"]');
    hero.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch' && control(event.target)) finishEntrance();
    },listeners);
    hero.addEventListener('click', event => {if (control(event.target)) finishEntrance();},listeners);
    hero.addEventListener('focusin', event => {
      if (control(event.target)) finishEntrance();
    },listeners);
    window.addEventListener('keydown', event => {
      if (event.key === 'Tab' || event.key === 'Escape' || control(event.target)) finishEntrance();
    },listeners);
    window.addEventListener('portfolio-stage-change', () => {
      const scene = hero.closest('#stage')?.dataset.stageActive;
      if (scene && scene !== 'desk') finishEntrance();
    },listeners);
    const ready = document.documentElement.dataset.heroReady;
    if (ready) beginEntrance(ready === 'animate');
    else {
      document.addEventListener('portfolio-hero-ready',event => beginEntrance(event.detail?.animate === true),{once:true});
      dealTimeout = setTimeout(() => beginEntrance(!document.documentElement.classList.contains('is-loading')),2100);
    }
  } else finishEntrance();
})();
