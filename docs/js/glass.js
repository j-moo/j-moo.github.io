(() => {
  'use strict';
  const stage = document.getElementById('stage');
  const host = stage?.querySelector('[data-glass-host]');
  const rail = host?.querySelector('[data-glass-nav]');
  const reader = host?.querySelector('[data-stage-reader]');
  const picker = reader?.querySelector('[data-project-picker]');
  if (!rail || !picker) return;
  const by = (selector, key) => new Map([...reader.querySelectorAll(selector)].map(el => [el.dataset[key], el]));
  const panes = by('[data-glass-pane]', 'glassPane');
  const projects = by('[data-project-detail]', 'projectDetail');
  const tabs = [...rail.querySelectorAll('[data-glass-tab]')];
  const url = '/#projects';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const tabMotion = matchMedia('screen and (prefers-reduced-motion: no-preference) and (forced-colors: none)');
  let tabTransition;
  let pane, project, focusNext, saveTimer, printing = false, printFocus, printScroll;
  let restoring = false, stageMounted = false;
  const initial = history.state?.portfolio;
  history.scrollRestoration = 'manual';
  const hasPin = () => stage.hasAttribute('data-stage-ready');
  const active = () => hasPin() ? stage.dataset.stageActive === 'glass' :
    host.getBoundingClientRect().top < innerHeight * .55;
  const currentView = () => pane === 'projects' ? projects.get(project) || picker : panes.get(pane);

  rail.setAttribute('role','navigation');
  const tabGroup = document.createElement('div');
  tabGroup.className = 'rail-tabs';
  tabGroup.setAttribute('role','tablist');
  tabGroup.setAttribute('aria-label','포트폴리오');
  tabGroup.setAttribute('aria-orientation','vertical');
  rail.prepend(tabGroup);
  for (const tab of tabs) {
    tabGroup.append(tab);
    const panel = panes.get(tab.dataset.glassTab);
    tab.setAttribute('role','tab');
    tab.setAttribute('aria-controls',panel.id);
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-labelledby',tab.id);
  }
  function render(key, id) {
    pane = panes.has(key) ? key : 'projects';
    project = pane === 'projects' && projects.has(id) ? id : null;
    host.dataset.glassActive = pane;
    for (const [key, el] of panes) el.hidden = key !== pane;
    for (const tab of tabs) {
      const selected = tab.dataset.glassTab === pane;
      tab.tabIndex = selected ? 0 : -1;
      tab.setAttribute('aria-selected', String(selected));
    }
    picker.hidden = !!project;
    for (const [id, el] of projects) {
      el.hidden = id !== project;
      if (el.hidden || pane !== 'projects') el.querySelectorAll('video').forEach(video => video.pause());
    }
    window.dispatchEvent(new Event('portfolio-glass-change'));
  }
  function checkpoint() {
    clearTimeout(saveTimer);
    if (printing || restoring || hasPin() && !stageMounted) return;
    const records = [...reader.querySelectorAll('details[data-note-id][open]')].map(el => el.dataset.noteId);
    history.replaceState({...history.state, portfolio:{pane, project, scene:active() ? 'glass' : 'desk', y:scrollY, readerTop:reader.scrollTop, records}}, '', url);
  }
  function queueSave() {
    if (restoring || printing) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(checkpoint, 140);
  }
  function focusReady() {
    if (!focusNext || printing || focusNext.closest('[hidden],[inert]')) return;
    if (hasPin() && host.contains(focusNext) && !active()) return;
    if (hasPin() && !host.contains(focusNext) && stage.dataset.stageActive !== 'desk') return;
    const el = focusNext;
    focusNext = null;
    if (!el.matches('button,a[href],[tabindex],summary')) el.tabIndex = -1;
    el.focus({preventScroll:true});
  }
  function move(scene, smooth, saved, dest) {
    const detail = {scene,smooth,y:saved?.y,readerTop:saved?.readerTop ?? 0,element:reader};
    if (window.dispatchEvent(new CustomEvent('portfolio-glass-scroll',{cancelable:true,detail}))) {
      const target = scene === 'desk' || scene === 'restore' && saved?.scene === 'desk' ? stage : dest || currentView();
      if (scene === 'restore' && Number.isFinite(saved?.y)) window.scrollTo({top:saved.y,behavior:'instant'});
      else target.scrollIntoView({behavior:smooth && !reduced.matches ? 'smooth' : 'instant',block:'start'});
    }
    focusReady();
  }
  function stopTabTransition() {
    if (!tabTransition) return;
    // Replacing a selection before its first frame rejects the snapshot's ready promise.
    tabTransition.ready.catch(() => {});
    tabTransition.skipTransition();
    tabTransition = null;
    delete document.documentElement.dataset.readerSwitch;
  }
  function open(key, id, button) {
    stopTabTransition();
    const fromGlass = active();
    const tab = button?.matches('[data-glass-tab]');
    const sameView = pane === key && project === id;
    if (fromGlass && tab && sameView) return;
    function select() {
      checkpoint();
      if (!sameView || !fromGlass) history.pushState({portfolio:{pane:key,project:id,scene:'glass'}}, '', url);
      render(key,id);
      const view = currentView();
      focusNext = tab ? button : view.querySelector('h2,h3') || view;
      reader.scrollTop = 0;
      if (tab && fromGlass && hasPin()) focusReady();
      else move('glass',true,null,view);
      queueSave();
    }
    if (!tab || !fromGlass || !hasPin() || !tabMotion.matches || !document.startViewTransition) {
      select();
      return;
    }
    document.documentElement.dataset.readerSwitch = '';
    const transition = document.startViewTransition(() => {
      if (tabTransition === transition) select();
    });
    tabTransition = transition;
    transition.finished.then(() => {
      if (tabTransition !== transition) return;
      tabTransition = null;
      delete document.documentElement.dataset.readerSwitch;
    });
  }
  function desk() {
    stopTabTransition();
    checkpoint();
    history.pushState({portfolio:{pane:'projects',project:null,scene:'desk',y:0,readerTop:0}},'',url);
    render('projects',null);
    focusNext = stage.querySelector('[data-hero] [data-open-pane="artist"]') || stage;
    move('desk',true);
  }
  function restore(saved, focus) {
    stopTabTransition();
    clearTimeout(saveTimer);
    restoring = true;
    render(saved?.pane, saved?.project);
    if (saved) {
      if (Array.isArray(saved.records)) for (const el of reader.querySelectorAll('details[data-note-id]')) el.open = saved.records.includes(el.dataset.noteId);
      const deskScene = saved.scene === 'desk';
      focusNext = focus ? deskScene ? stage : currentView().querySelector('h2,h3') || currentView() : null;
      // WebKit can move the viewport to the focused icon before the pinned scene catches up.
      // Restore a reader entry inside the interactive part of the timeline.
      const scene = hasPin() && saved.scene === 'glass' ? 'glass' :
        Number.isFinite(saved.y) ? 'restore' : deskScene ? 'desk' : 'glass';
      move(scene,false,saved);
    } else if (focus) {
      focusNext = stage;
      move('desk',false);
    }
    restoring = false;
  }

  host.dataset.glassReady = '';
  render(initial?.pane,initial?.project);
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-open-project],[data-open-pane],[data-open-desk]');
    if (!button || event.defaultPrevented || event.button || button.closest('[inert],[hidden],:disabled')) return;
    event.preventDefault();
    if (button.hasAttribute('data-open-desk')) { desk(); return; }
    if (button.hasAttribute('data-open-project')) {
      if (projects.has(button.dataset.openProject)) open('projects',button.dataset.openProject,button);
    } else if (panes.has(button.dataset.openPane)) open(button.dataset.openPane,null,button);
  });
  tabGroup.addEventListener('keydown', event => {
    const i = tabs.indexOf(event.target);
    if (i < 0) return;
    const indices = {ArrowDown:(i+1)%tabs.length,ArrowUp:(i+tabs.length-1)%tabs.length, Home:0, End:tabs.length-1};
    const next = tabs[indices[event.key]];
    if (!next) return;
    event.preventDefault();
    next.focus({preventScroll:true});
    next.click();
  });
  for (const type of ['pointerdown','keydown','wheel']) document.addEventListener(type, () => { focusNext = null; }, {capture:true, passive:true});
  window.addEventListener('popstate', () => restore(history.state?.portfolio,true));
  window.addEventListener('hashchange', () => {
    if (location.hash !== '#projects') history.replaceState(history.state,'',url);
  });
  reader.addEventListener('scroll',queueSave,{passive:true});
  reader.addEventListener('toggle',queueSave,true);
  window.addEventListener('scroll',queueSave,{passive:true});
  window.addEventListener('pagehide',checkpoint);
  window.addEventListener('portfolio-stage-change',focusReady);
  let firstMount = true;
  window.addEventListener('portfolio-stage-mounted', () => {
    stageMounted = true;
    const saved = firstMount ? initial : history.state?.portfolio;
    firstMount = false;
    if (saved) restore(saved,false);
  });
  if (initial && Number.isFinite(initial.y)) requestAnimationFrame(() => { if (!stageMounted) restore(initial,false); });
  window.addEventListener('beforeprint', () => {
    if (printing) return;
    stopTabTransition();
    checkpoint();
    printing = true;
    printFocus = document.activeElement;
    printScroll = reader.scrollTop;
    for (const el of [...panes.values(),...projects.values()]) el.hidden = false;
  });
  window.addEventListener('afterprint', () => {
    if (!printing) return;
    printing = false;
    render(pane,project);
    requestAnimationFrame(() => {
      reader.scrollTop = printScroll;
      if (printFocus?.isConnected && !printFocus.closest('[hidden],[inert]')) printFocus.focus({preventScroll:true});
    });
  });
})();
