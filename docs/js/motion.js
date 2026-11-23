(() => {
  'use strict';

  const root = document.documentElement;
  const all = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const query = selector => document.querySelector(selector);
  const normal = 'screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)';
  const wide = '(min-width: 1024px) and (min-height: 610px)';
  const paperSelector = '[data-paper], [data-paper-cut], [data-paper-edge]';
  let media, printing = false;
  let paperObserver;


  // The tear stays the same physical depth when text wraps or the panel grows.
  function paperShape(width, height) {
    const count = Math.max(5, Math.round(width / 35));
    const sides = Math.max(3, Math.round(height / 44));
    const depth = Math.min(5, height / 26);
    const x = i => (i * 100 / count).toFixed(2) + '%';
    const tooth = i => ((i * 17 + i * i * 3) % 19) * depth / 19;
    const top = [], right = [], bottom = [], left = [];
    for (let i = 0; i <= count; i++) {
      top.push(x(i) + ' ' + tooth(i).toFixed(1) + 'px');
      bottom.unshift(x(i) + ' calc(100% - ' + tooth(i + 4).toFixed(1) + 'px)');
    }
    for (let i = 1; i < sides; i++) {
      const y = (i * 100 / sides).toFixed(2) + '%';
      right.push('calc(100% - ' + (tooth(i + 2) * .55).toFixed(1) + 'px) ' + y);
      left.unshift((tooth(i + 5) * .55).toFixed(1) + 'px ' + y);
    }
    return 'polygon(' + top.concat(right, bottom, left).join(', ') + ')';
  }

  function sizePaper() {
    const sheets = all(paperSelector);
    if (!sheets.length || paperObserver) return;
    const sizes = new WeakMap();
    function cut(el) {
      const width = el.clientWidth, height = el.clientHeight;
      const dimensions = width + ':' + height;
      if (sizes.get(el) === dimensions || !width || !height) return;
      sizes.set(el, dimensions);
      el.style.setProperty('--paper-cut', el.hasAttribute('data-cut-stock') ? 'polygon(0 0,100% 0,100% 100%,0 100%)' : paperShape(width, height));
    }
    sheets.forEach(cut);
    if (!window.ResizeObserver) return;
    paperObserver = new ResizeObserver(entries => entries.forEach(({target}) => cut(target)));
    sheets.forEach(el => paperObserver.observe(el));
  }


  function enterPage({hero, run, signal, gsap, SplitType, refresh}) {
    if (!hero) return;
    function ready(animate) {
      if (root.dataset.heroReady) return;
      root.dataset.heroReady = animate ? 'animate' : 'settled';
      document.dispatchEvent(new CustomEvent('portfolio-hero-ready', {detail:{animate}}));
    }
    if (history.state?.portfolio?.scene === 'glass' || scrollY > 8 || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') { ready(false); return; }
    const loader = query('[data-loader]');
    const title = hero.querySelector('[data-hero-title]');
    const splitTitles = [];
    let animation, counting, exit, timeout, hold, stopped = false;
    function restoreTitle() {
      for (const {split, el, label} of splitTitles.splice(0)) {
        split.revert();
        if (label === null) el.removeAttribute('aria-label');
        else el.setAttribute('aria-label', label);
      }
    }
    function close() {
      clearTimeout(timeout);
      clearTimeout(hold);
      counting?.kill();
      exit?.kill();
      if (loader) {
        loader.hidden = true;
        loader.classList.remove('is-loading');
        loader.style.removeProperty('transform');
      }
      root.classList.remove('is-loading');
    }
    function stop() {
      if (stopped) return;
      stopped = true;
      close();
      animation?.progress(1).kill();
      restoreTitle();
      ready(false);
    }
    signal.addEventListener('abort', stop, {once: true});
    for (const event of ['pointerdown', 'wheel', 'keydown', 'touchstart']) {
      window.addEventListener(event, stop, {once: true, passive: true, signal});
    }
    function playHero() {
      if (signal.aborted || stopped || scrollY > 8 || document.hidden) { ready(false); return; }
      ready(true);
      run(() => {
        animation = gsap.timeline({defaults: {ease: 'power2.out'}, onComplete: restoreTitle});
        const names = title ? all('.jm-mark, h1, p[lang]', title) : [];
        if (!names.length && title) names.push(title);
        const words = [];
        for (const el of names) {
          const accessible = el.textContent.trim();
          const label = el.getAttribute('aria-label');
          const split = new SplitType(el, {types: 'words', tagName: 'span'});
          splitTitles.push({split, el, label});
          if (!el.hasAttribute('aria-hidden')) el.setAttribute('aria-label', accessible);
          for (const word of split.words) {
            const mask = document.createElement('span');
            mask.className = 'motion-word-mask';
            mask.setAttribute('aria-hidden', 'true');
            word.replaceWith(mask);
            mask.append(word);
            words.push(word);
          }
        }
        if (words.length) animation.from(words, {yPercent: 104, duration: .72, stagger: .06}, 0);
        const follow = all('[data-hero-sub], [data-hero-action]', hero)
          .filter(el => !el.matches('img,picture,video') && !el.querySelector('img,picture,video'));
        if (follow.length) animation.from(follow, {y: '.6rem', opacity: 0, duration: .72, stagger: .06}, .12);
      });
    }
    const key = 'jongmu-music-card-intro-v1';
    try { sessionStorage.setItem(key, '1'); } catch {}
    const assets = window.portfolioHeroAssetsReady;
    assets.then(refresh, refresh);
    const booted = loader?.dataset.boot === '1';
    if (!booted || document.hidden || performance.now() >= 1490) {
      if (booted) { delete loader.dataset.boot; close(); }
      if (loader?.dataset.boot === 'cancelled') ready(false);
      else playHero();
      return;
    }
    delete loader.dataset.boot;

    const start = performance.now();
    const deadline = 1880; // relative to navigation start, including the upward uncover
    const output = loader.querySelector('[data-load-count]');
    const model = {value: 0};
    function counter() { if (output) output.textContent = Math.round(model.value) + '%'; }
    counter();
    loader.hidden = false;
    loader.classList.add('is-loading');
    root.classList.add('is-loading');
    run(() => {
      counting = gsap.to(model, {value: 88, duration: .72, ease: 'power2.out', onUpdate: counter});
      const name = loader.querySelector('[data-loader-name]');
      if (name) gsap.from(name, {y: '.4em', opacity: .4, duration: .26, ease: 'power2.out'});
    });
    timeout = setTimeout(stop, Math.max(0, deadline - performance.now()));
    assets.then(loaded => {
      if (!loaded) { stop(); return; }
      if (signal.aborted || stopped) return;
      const remaining = deadline - performance.now() - 370;
      if (remaining <= 0) { stop(); return; }
      hold = setTimeout(() => {
        if (signal.aborted || stopped || document.hidden || deadline - performance.now() < 330) { stop(); return; }
        counting?.kill();
        run(() => {
          exit = gsap.timeline({onComplete: () => { close(); playHero(); }});
          exit.to(model, {value: 100, duration: .085, ease: 'none', onUpdate: counter})
            .to(loader, {yPercent: -102, duration: .26, ease: 'power3.inOut'});
        });
      }, Math.min(remaining, Math.max(0, start + 430 - performance.now())));
    }, stop);
  }

  function observeReader(stage, reader, signal) {
    if (!Element.prototype.animate) return;
    const targets = [
      '.cr-picker > h2', '.cr-app', '.cr-return', '.cr-intro', '.cr-section > :is(h3,h4,p,ol,dl,figure,table)',
      '.cr-gallery > figure', '.cr-cad-charts > figure', '.cr-note > summary', '.cr-note-body > :is(p,h4)',
      '.cr-adjacent', '[data-glass-pane] > h2', '.profile-liner > *', '.skill-group',
      '.education-item > :is(h3,p)', '.semesters > section'
    ].join(',');
    const playing = new Set();
    const pending = new Set();
    const seen = new WeakSet();
    let previousTop = reader.scrollTop;
    function stopEffects() {
      for (const effect of playing) effect.cancel();
      playing.clear();
    }
    function readViewport(delta) {
      if (!pending.size) return;
      const bounds = reader.getBoundingClientRect();
      const entering = [];
      for (const el of pending) {
        const rect = el.getBoundingClientRect();
        if (!rect.height || rect.bottom <= bounds.top || rect.top >= bounds.bottom) continue;
        pending.delete(el);
        seen.add(el);
        // Only elements that actually crossed the bottom edge during this scroll reveal.
        if (delta > 0 && rect.top + delta >= bounds.bottom - 1) entering.push(el);
      }
      for (const [i, el] of entering.entries()) {
        const effect = el.animate([{opacity:.24, translate:'0 .55rem'}, {opacity:1, translate:'0 0'}],
          {duration:920, delay:Math.min(i,3)*85, easing:'cubic-bezier(.35,.08,.25,1)', fill:'backwards'});
        playing.add(effect);
        effect.finished.then(() => playing.delete(effect), () => playing.delete(effect));
      }
    }
    function watch() {
      stopEffects();
      pending.clear();
      // Navigation restores the reader's scroll position synchronously after rendering.
      queueMicrotask(() => {
        if (signal.aborted || stage.dataset.stageActive !== 'glass') return;
        previousTop = reader.scrollTop;
        for (const el of reader.querySelectorAll(targets)) {
          if (!seen.has(el) && !el.closest('[hidden]')) pending.add(el);
        }
        readViewport(0);
      });
    }
    reader.addEventListener('scroll', () => {
      const top = Math.max(0,reader.scrollTop);
      const delta = top - previousTop;
      previousTop = top;
      if (delta < 0) stopEffects();
      if (delta) readViewport(delta);
    }, {passive:true,signal});
    window.addEventListener('portfolio-glass-change',watch,{signal});
    window.addEventListener('portfolio-stage-change',watch,{signal});
    signal.addEventListener('abort',stopEffects,{once:true});
    watch();
  }

  function pinHomeStage(gsap, ScrollTrigger, lenis) {
    const stage = query('#stage');
    const desk = stage?.querySelector('[data-stage-scene="desk"]');
    const glass = stage?.querySelector('[data-stage-scene="glass"]');
    const reader = glass?.querySelector('[data-stage-reader]');
    const shell = glass?.querySelector('[data-glass-shell]');
    if (!desk || !reader || !shell) return null;
    const scenes = [desk, glass];
    const [contact, albums] = ['[data-desk-contact]', '[data-desk-album]'].map(selector => desk.querySelector(selector));
    if (!contact || !albums) return null;

    // Labels and holds share a 100-unit timeline. ScrollTrigger alone owns the page's travel.
    let master, refreshState;
    const context = gsap.context(() => {}, stage);
    const originalStyles = new Map();
    const motionProperties = ['transform', 'translate', 'rotate', 'scale', 'opacity', 'visibility'];
    // A ScrollTrigger refresh can reapply fromTo start values while the pin is reverted.
    // Save only the properties this timeline owns so the reader can return to static flow.
    function rememberStyles(elements) {
      for (const el of elements) originalStyles.set(el, motionProperties.map(key => el.style.getPropertyValue(key)));
    }
    const announce = () => window.dispatchEvent(new Event('portfolio-stage-change'));
    function inputAt(time) {
      if (refreshState) return;
      const active = time < 38 ? 'desk' : time >= 78 ? 'glass' : 'transition';
      if (active === stage.dataset.stageActive) return;
      const focused = document.activeElement;
      for (const scene of scenes) {
        const inactive = scene.dataset.stageScene !== active;
        if (inactive && scene.contains(focused)) stage.focus({preventScroll:true});
        scene.inert = inactive;
      }
      stage.dataset.stageActive = active;
      announce();
    }
    // ScrollTrigger temporarily detaches its pin spacer when it measures the stage.
    // Keep a long answer's reading position and keyboard focus through that DOM change.
    function beforeMeasure() {
      if (!master || refreshState) return;
      const focus = document.activeElement;
      refreshState = {top:reader.scrollTop, focus:stage.contains(focus) ? focus : null};
    }
    function afterMeasure() {
      if (!refreshState) return;
      const {top, focus} = refreshState;
      refreshState = null;
      inputAt(master.time());
      reader.scrollTop = top;
      if (focus && !focus.closest('[hidden],[inert]') && document.activeElement === document.body) focus.focus({preventScroll:true});
    }
    function stop() {
      ScrollTrigger.removeEventListener('refreshInit', beforeMeasure);
      ScrollTrigger.removeEventListener('refresh', afterMeasure);
      context.revert();
      for (const [el, values] of originalStyles) {
        motionProperties.forEach((key, i) => {
          if (values[i]) el.style.setProperty(key, values[i]);
          else el.style.removeProperty(key);
        });
      }
      for (const scene of scenes) scene.inert = false;
      delete stage.dataset.stageReady;
      delete stage.dataset.stageActive;
      announce();
    }
    try {
      stage.dataset.stageReady = '';
      context.add(() => {
        master = gsap.timeline({
          defaults:{ease:'power2.inOut'},
          onUpdate() { inputAt(this.time()); },
          scrollTrigger:{
            id:'portfolio-stage', trigger:stage, start:'top top',
            end:() => '+=' + scenes.length * window.innerHeight * 1.2,
            pin:true, pinSpacing:true, scrub:1, anticipatePin:1, invalidateOnRefresh:true
          }
        });
        const smallText = all('.identity-heading, .identity-contact, .track-heading, .track-title, .album-credit', desk);
        const links = all('.desk-shortcuts button', desk);
        const controls = all('[data-glass-tab]', shell);
        const hint = desk.querySelector('[data-desk-guide]');
        rememberStyles([desk, glass, shell, reader, contact, albums, ...links, ...smallText, ...controls, ...(hint ? [hint] : [])]);
        master.addLabel('desk', 0)
          .addLabel('clear', 16)
          .to(links, {opacity:0, yPercent:-28, duration:13, stagger:1}, 'clear')
          .to(hint, {opacity:0, yPercent:-24, duration:10}, 17)
          .to(smallText, {opacity:0, yPercent:-23, duration:15, stagger:{amount:4}}, 20)
          .to(contact, {xPercent:() => matchMedia(wide).matches ? -13 : -5, yPercent:-94, rotation:-3, duration:31}, 25)
          .to(albums, {xPercent:() => matchMedia(wide).matches ? 19 : 7, yPercent:-107, rotation:5, duration:32}, 27)
          .to([contact, albums], {opacity:0, duration:22, stagger:2, ease:'power1.in'}, 35)
          .to(desk, {autoAlpha:0, duration:9}, 50)
          .addLabel('glassIn', 44)
          .fromTo(glass, {autoAlpha:0}, {autoAlpha:1, duration:22, ease:'power2.out'}, 'glassIn')
          .fromTo(shell, {scale:() => matchMedia(wide).matches ? .84 : .91, opacity:0},
            {scale:1, opacity:1, duration:27, ease:'power2.out'}, 'glassIn')
          .fromTo(reader, {opacity:0}, {opacity:1, duration:24, ease:'sine.inOut'}, 53)
          .fromTo(controls, {opacity:0}, {opacity:1, duration:16, stagger:1.5, ease:'sine.inOut'}, 57)
          .addLabel('glass', 78)
          .to({}, {duration:22}, 'glass');
      });
      // Apply both ends before handling any restored deep link.
      master.scrollTrigger.refresh();
      lenis.resize();
      inputAt(master.time());
      ScrollTrigger.addEventListener('refreshInit', beforeMeasure);
      ScrollTrigger.addEventListener('refresh', afterMeasure);
    } catch (err) {
      stop();
      throw err;
    }
    function go({element, scene, smooth, y, readerTop}) {
      const trigger = master.scrollTrigger;
      const isDesk = scene === 'desk';
      const label = master.labels.glass / master.duration();
      const current = trigger.progress;
      const savedProgress = Number.isFinite(y) ? Math.max(0, Math.min(1, (y-trigger.start)/(trigger.end-trigger.start))) : null;
      let destination = savedProgress ?? 0;
      if (scene === 'glass' && destination < label) destination = Math.max(label + .02, current);
      const top = trigger.start + destination * (trigger.end-trigger.start);
      if (!isDesk) {
        const offset = reader.contains(element) && element !== reader
          ? (element.getBoundingClientRect().top - reader.getBoundingClientRect().top) * (reader.offsetHeight / reader.getBoundingClientRect().height || 1)
             + reader.scrollTop - 12 : 0;
        reader.scrollTop = Number.isFinite(readerTop) ? readerTop : Math.max(0, offset);
      }
      const enteringGlass = smooth && scene === 'glass' && current < label;
      const duration = enteringGlass ? .75 + 1.25 * (1 - current / label) : .7;
      lenis.scrollTo(top, {immediate:!smooth, duration, easing:gsap.parseEase(enteringGlass ? 'sine.inOut' : 'power2.out')});
      if (!smooth) {
        ScrollTrigger.update();
        trigger.getTween()?.progress(1);
        master.progress(destination);
        inputAt(master.time());
      }
    }
    return {go, stop, syncInput:() => inputAt(master.time())};
  }

  function mount(gsap, ScrollTrigger, SplitType, Lenis) {
    const controller = new AbortController();
    const signal = controller.signal;
    const ctx = gsap.context(() => {});
    const hero = query('[data-hero]');
    const bar = query('[data-progress]');
    let frame = 0, stage;
    const lenis = new Lenis({autoRaf:false, smoothWheel:true, syncTouch:false, anchors:false,
      prevent: el => root.hasAttribute('data-tour-locked') || !!el.closest('dialog, [data-stage-reader]') ||
        (el.matches('[data-stage-scene="desk"]') && el.scrollHeight > el.clientHeight + 1)});
    const tick = seconds => lenis.raf(seconds * 1000);
    function progress() {
      const distance = root.scrollHeight - root.clientHeight;
      bar?.style.setProperty('--progress', String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0));
    }
    function refresh() {
      if (frame || signal.aborted) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        ScrollTrigger.refresh();
        lenis.resize();
        progress();
      });
    }
    function cleanup() {
      if (signal.aborted) return;
      controller.abort();
      cancelAnimationFrame(frame);
      gsap.ticker.remove(tick);
      lenis.off('scroll', ScrollTrigger.update);
      stage?.stop();
      lenis.destroy();
      ctx.revert();
      bar?.style.removeProperty('--progress');
      root.classList.remove('motion-ready', 'is-loading');
    }
    try {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      stage = pinHomeStage(gsap, ScrollTrigger, lenis);
      if (!stage) { cleanup(); return; }
      observeReader(query('#stage'), query('[data-stage-reader]'), signal);
      root.classList.add('motion-ready');
      window.addEventListener('scroll', progress, {passive:true, signal});
      window.addEventListener('resize', refresh, {passive:true, signal});
      window.addEventListener('load', refresh, {once:true, signal});
      document.fonts?.addEventListener('loadingdone', refresh, {signal});
      document.fonts?.ready.then(refresh);
      window.addEventListener('portfolio-glass-scroll', event => {
        event.preventDefault();
        stage.go(event.detail);
      }, {signal});
      window.dispatchEvent(new Event('portfolio-stage-mounted'));
      enterPage({hero, gsap, SplitType, signal, run:fn => ctx.add(fn), refresh});
      progress();
      refresh();
    } catch {
      cleanup();
    }
    return cleanup;
  }

  function start() {
    sizePaper();
    if (media || printing || !window.gsap || !window.ScrollTrigger || !window.SplitType || !window.Lenis) return;
    const {gsap, ScrollTrigger, SplitType, Lenis} = window;
    gsap.registerPlugin(ScrollTrigger);
    media = gsap.matchMedia();
    media.add({normal}, ({conditions}) => {
      if (conditions.normal) return mount(gsap, ScrollTrigger, SplitType, Lenis);
    });
  }
  function suspend() { media?.revert(); media = null; }
  window.addEventListener('portfolio-motion-ready', start);
  window.addEventListener('beforeprint', () => { printing = true; suspend(); });
  window.addEventListener('afterprint', () => { printing = false; start(); });
  window.addEventListener('pagehide', () => {
    suspend();
    paperObserver?.disconnect();
    paperObserver = null;
  });
  window.addEventListener('pageshow', start);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
})();
