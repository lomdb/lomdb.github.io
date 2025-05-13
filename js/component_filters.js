export let langs = [
  'all',
  'amen',
  'es',
  'espt',
  'pt',
  'euen',
  'mush',
  'de',
  'fr',
  'me',
  'tr',
  'ru',
  
  'cn',
  'vn',
  'id',
  'en',
  'th',
  
  'kr',
  'jp',
  'tw',
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
