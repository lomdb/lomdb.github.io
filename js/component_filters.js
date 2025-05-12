export let langs = [
  'all',
  'cn',
  'tw',
  'amen',
  'vn',
  'es',
  'id',
  'en',
  'espt',
  'pt',
  'th',
  'euen',
  'mush',
  'de',
  'fr',
  'me',
  'tr',
  'kr',
  'jp',
  'ru',
]

export function createFilters(remove = []) {
  langs = langs.filter(item => !remove.includes(item))
  const filters = langs
    .map(item => `<button class="${item}">${item.toLocaleUpperCase()}</button>`)
    .join('')

  return `
<div class="filters">
  <div class="controllers">
    ${filters}
  </div>
</div>
    `
}
