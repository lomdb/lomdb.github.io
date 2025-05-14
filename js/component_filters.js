import './modules/index.js'
import { getPrefix } from './helpers.js'

class Filters extends HTMLElement {
  constructor() {
    super()
  }

  #data = {
    template: `
    <div class="filters">
      <div class="controllers"></div>
    </div>
  `,
  }

  static langs = [
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

  #createFilters(remove = []) {
    const buttons = Filters.langs
      .map(item => `<button class="${item}">${item.toUpperCase()}</button>`)
      .join('')
    return buttons
  }

  connectedCallback() {
    this.innerHTML = this.#data.template
    const container = this.querySelector('.controllers')
    container.innerHTML = this.#createFilters()
  }
}

window.customElements.define(getPrefix('filters'), Filters)

export const langs = Filters.langs
