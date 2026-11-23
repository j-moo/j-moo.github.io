import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {skillGroups} from './skills.mjs';

export const submissionFiles = new Set([
  '.nojekyll','index.html','404.html','robots.txt','sitemap.xml',
  ...['base','home','motion','glass','case-reader','application'].map(n=>'css/'+n+'.css'),
  ...['app','libraries','glass','motion','player'].map(n=>'js/'+n+'.js'),
  ...['gsap-3.12.5.min.js','ScrollTrigger-3.12.5.min.js','lenis-1.3.17.min.js',
    'split-type-0.3.4.min.js','lenis-LICENSE.txt','split-type-LICENSE.txt'].map(n=>'js/vendor/'+n),
  ...['exhibit-head','exhibit-ko','exhibit-sans'].flatMap(n=>['assets/fonts/'+n+'.woff2','assets/fonts/'+n+'-OFL.txt']),
  ...['portrait.webp','portrait-120.webp','portrait-384.webp','paper-fibre.svg','music-mark.svg',
    'case-flex.svg','case-melly.svg','case-ddubi.svg','case-tingle.svg','kim-jongmu-portfolio.pdf'].map(n=>'assets/'+n),
  ...['desk-reference-clean.webp','desk-reference-mobile.webp','matte-fibres.webp',
    'flex-landing.webp','melly-home.webp','ddubi-home.webp','tingle-landing.webp',
    'melly-demo.mp4','ddubi-sequence.mp4','tingle-demo.mp4'].map(name=>'assets/'+name),
  ...['flex','melly','ddubi','tingle'].flatMap(id=>['','-384'].map(size=>'assets/'+id+'-cover-art'+size+'.webp')),
  ...skillGroups.flatMap(group=>group.skills.map(skill=>'assets/tech/'+skill.icon)),
  ...['Devicon-LICENSE.txt','Simple-Icons-LICENSE.txt','Zephyr-LICENSE.txt','README.md'].map(name=>'assets/tech/'+name)
]);

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!process.argv[2]) throw Error('내보낼 새 폴더 경로를 지정하세요.');
  const out=resolve(process.argv[2]);
  const site=fileURLToPath(new URL('./docs/',import.meta.url));
  if (existsSync(out) && readdirSync(out).length) throw Error('배포본은 빈 폴더에 생성합니다.');
  for (const file of submissionFiles) {
    const dest=join(out,file);
    mkdirSync(dirname(dest),{recursive:true});
    copyFileSync(join(site,file),dest);
  }
  console.log('채용 제출용 정적 파일 '+submissionFiles.size+'개를 내보냈습니다.');
}
