(() => {
  'use strict';
  const prefix = 'https://cdn.jsdelivr.net/npm/';
  const packageFiles = {
    gsap: ['gsap@3.12.5/dist/gsap.min.js', 'gsap-3.12.5.min.js', 'sha384-g4NTh/Iv5PPU4xPyhEWqPcwtNXOvdaDI8LLnyYfyNZOjKJeYQyjzQ9X5275eBjpt'],
    scroll: ['gsap@3.12.5/dist/ScrollTrigger.min.js', 'ScrollTrigger-3.12.5.min.js', 'sha384-Z3REaz79l2IaAZqJsSABtTbhjgOUYyV3p90XNnAPCSHg3EMTz1fouunq9WZRtj3d'],
    lenis: ['lenis@1.3.17/dist/lenis.min.js', 'lenis-1.3.17.min.js', 'sha384-4EgXbGZLDwcPHcRGrHOxm1OvumWUqhr/ts6eapdZnak6ORZAsSE3fMd0niykaSkw'],
    split: ['split-type@0.3.4/umd/index.min.js', 'split-type-0.3.4.min.js', 'sha384-wQImCCD/id1jPTwSloatzKlEpnEAQ5aH8H2Ud27FnNcJ1lf2+hB75ctoWnWxyD8X']
  };
  function script(src, integrity) {
    return new Promise((resolve, reject) => {
      const tag = document.createElement('script');
      tag.src = src;
      if (integrity) { tag.integrity = integrity; tag.crossOrigin = 'anonymous'; }
      tag.onload = resolve;
      tag.onerror = reject;
      document.head.append(tag);
    });
  }
  // Fetch in parallel, then execute the plugin after its GSAP dependency.
  // Aborting a slow fetch prevents the CDN and the local copy from both executing.
  async function prepare([path, local, integrity]) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 700);
    try {
      const res = await fetch(prefix + path, {integrity, mode:'cors', credentials:'omit', signal:controller.signal});
      if (!res.ok) throw Error('CDN');
      const blob = new Blob([await res.arrayBuffer()], {type:'text/javascript'});
      return {url:URL.createObjectURL(blob), local, integrity};
    } catch {
      return {local, integrity};
    } finally {
      clearTimeout(timer);
    }
  }
  async function run(source) {
    const {url, local, integrity} = await source;
    if (url) {
      try { await script(url); return; }
      catch { /* Some browsers prohibit blob scripts. Use the same local bytes. */ }
      finally { URL.revokeObjectURL(url); }
    }
    await script('/js/vendor/' + local, integrity);
  }
  const ready = Object.fromEntries(Object.entries(packageFiles).map(([name, value]) => [name,prepare(value)]));
  Promise.all([run(ready.gsap).then(() => run(ready.scroll)),run(ready.lenis),run(ready.split)])
    .then(() => window.dispatchEvent(new Event('portfolio-motion-ready')))
    .catch(() => window.dispatchEvent(new Event('portfolio-motion-unavailable')));
})();
