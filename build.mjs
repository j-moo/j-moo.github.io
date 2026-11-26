import { readFileSync, accessSync } from 'node:fs';

// GitHub Pages publishes the static source in docs/ directly.
const root = new URL('./docs/', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
for (const [, file] of html.matchAll(/(?:href|src)="((?:components|assets)\/[^"]+)"/g)) {
  accessSync(new URL(file, root));
}
console.log('GitHub Pages entry point verified.');
