import './modules/index.js'
import { getPrefix } from './helpers.js'
import { t } from './translations.js'

customElements.define(
  getPrefix('footer'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    #data = {
      template: `
    <footer class="page-footer">
      <p>${t('footer')}</p>
      <time datetime="2025/05/03">2025.05.05</time>
    </footer>
  `,
    }

    connectedCallback() {
      this.innerHTML = this.#data.template
    }
  }
)
