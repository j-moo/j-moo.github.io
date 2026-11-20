const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function labelTheme() {
  themeButton.setAttribute('aria-label', root.dataset.theme === 'dark' ? '밝은 테마로 전환' : '어두운 테마로 전환');
}
labelTheme();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('jm-theme', root.dataset.theme); } catch {}
  labelTheme();
});

for (const button of document.querySelectorAll('[data-print]')) {
  button.addEventListener('click', () => window.print());
}

const noteInput = document.querySelector('#notes-filter');
if (noteInput) {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const rows = [...document.querySelectorAll('#filtered-notes .note-row')];
  let category = '전체';
  function filterNotes() {
    const term = noteInput.value.trim().toLowerCase();
    for (const row of rows) {
      row.hidden = (category !== '전체' && row.dataset.tag !== category) ||
        !row.dataset.filterText.toLowerCase().includes(term);
    }
    document.querySelector('#no-notes').hidden = rows.some(row => !row.hidden);
  }
  for (const button of buttons) {
    button.addEventListener('click', () => {
      category = button.dataset.filter;
      for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
      filterNotes();
    });
  }
  noteInput.addEventListener('input', filterNotes);
}

const dialog = document.querySelector('#search-dialog');
const searchInput = document.querySelector('#search-input');
const results = document.querySelector('#search-results');
let searchIndex;
let trigger;
function renderResults() {
  if (!searchIndex) return;
  const term = searchInput.value.trim().toLowerCase();
  const matches = searchIndex.filter(item => [item.title, item.summary, item.tag].join(' ').toLowerCase().includes(term));
  results.replaceChildren();
  for (const item of matches) {
    const anchor = document.createElement('a');
    anchor.href = item.url;
    const field = document.createElement('small');
    field.textContent = item.tag;
    const title = document.createElement('strong');
    title.textContent = item.title;
    const summary = document.createElement('p');
    summary.textContent = item.summary;
    anchor.append(field, title, summary);
    results.append(anchor);
  }
  if (!matches.length) results.textContent = '일치하는 글이 없습니다. 다른 단어로 검색해 보세요.';
}
async function openSearch() {
  trigger = document.activeElement;
  dialog.showModal();
  searchInput.focus();
  if (!searchIndex) {
    results.textContent = '검색 자료를 불러오는 중입니다.';
    try {
      const response = await fetch('/search-index.json');
      if (!response.ok) throw new Error('search index unavailable');
      searchIndex = await response.json();
    } catch {
      results.textContent = '검색 자료를 열 수 없습니다. 작업 모음과 개발 기록에서 전체 글을 볼 수 있습니다.';
      return;
    }
  }
  renderResults();
}
document.querySelector('[data-search]').addEventListener('click', openSearch);
document.querySelector('[data-close-search]').addEventListener('click', () => dialog.close());
searchInput.addEventListener('input', renderResults);
results.addEventListener('click', event => {
  if (event.target.closest('a')) dialog.close();
});
dialog.addEventListener('close', () => trigger?.focus());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
document.addEventListener('keydown', event => {
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
  event.preventDefault();
  if (dialog.open) dialog.close();
  else openSearch();
});
