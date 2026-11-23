import { createServer } from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { submissionFiles } from './submission-files.mjs';

const root = fileURLToPath(new URL('./docs/', import.meta.url));
const port = Number(process.argv[2] || 4173);
const gzipEnabled = process.argv.includes('--gzip');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.woff2':'font/woff2','.pdf':'application/pdf','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8'};
if (!existsSync(join(root,'index.html'))) throw new Error('먼저 npm run build 를 실행하세요.');
createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  let file = resolve(root, '.'+pathname);
  const dir = resolve(root);
  const source = join(dir,'source');
  if ((file!==dir && !file.startsWith(dir+sep)) || file===source || file.startsWith(source+sep)) { res.writeHead(404).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) { res.writeHead(301,{ Location:pathname+'/' }).end(); return; }
    file = join(file,'index.html');
  }
  const served = file.slice(dir.length+1).split(sep).join('/');
  const status = submissionFiles.has(served) && existsSync(file) && statSync(file).isFile() ? 200 : 404;
  if (status === 404) file = join(dir,'404.html');
  const size = statSync(file).size;
  const headers = { 'Content-Type':mime[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'Accept-Ranges':'bytes' };
  const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  const compressible = /^(text\/|application\/(json|xml)|image\/svg\+xml)/.test(headers['Content-Type']);
  if (gzipEnabled && compressible) {
    headers.Vary = 'Accept-Encoding';
    const acceptsGzip = (req.headers['accept-encoding'] || '').split(',').some(entry => {
      const [encoding, parameter] = entry.trim().toLowerCase().split(';');
      return encoding === 'gzip' && (!parameter || Number(parameter.trim().replace(/^q=/, '')) > 0);
    });
    if (!range && acceptsGzip) {
      const compressed = gzipSync(readFileSync(file));
      res.writeHead(status, { ...headers, 'Content-Encoding':'gzip', 'Content-Length':compressed.length });
      res.end(req.method === 'HEAD' ? undefined : compressed);
      return;
    }
  }
  let start=0, end=size-1;
  if (range && status===200) {
    start=Number(range[1]); end=range[2] ? Math.min(end,Number(range[2])) : end;
    if (start>end) { res.writeHead(416,{'Content-Range':'bytes */'+size}).end(); return; }
    headers['Content-Range']=`bytes ${start}-${end}/${size}`;
  }
  res.writeHead(range && status===200 ? 206 : status,{ ...headers,'Content-Length':end-start+1 });
  if (req.method==='HEAD' || !size) { res.end(); return; }
  const stream=createReadStream(file,{start,end});
  res.on('close',()=>stream.destroy());
  stream.on('error',()=>res.destroy());
  stream.pipe(res);
}).listen(port,'127.0.0.1',()=>console.log('http://127.0.0.1:'+port+'/'));
