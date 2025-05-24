import './modules/index.js'
import { getPrefix } from './helpers.js'
import './component_navbar.js'
import './component_footer.js'
import { t } from './translations.js'

customElements.define(
  getPrefix('normalizer'),
  class extends HTMLElement {
    constructor() {
      super()
      this.handleChange = this.handleChange.bind(this)
    }

    #data = {
      attrs: [],
      input: `1526	←	[1530,11131]
1537	←	[1538,1539]
1549	←	[1550,6551]
30218	←	[42121,42124]
30274	←	[30277,39136,39137,42225]
30275	←	[42226,42227,42228]
30314	←	[42265]
CN-389	 ←	[VN-460]
EN389	 ←	[EN390,VN658,VN659,VN660]`,
      template: `
      <nn-caja padding="1rem" class="base">
        <div class="nav-controls">
          <lom-navbar></lom-navbar>
        </div>
        <h2>${t('Normalizer')}</h2>

        <div>
          <h3>${t('Paste your merge raw data here:')}</h3>
          <textarea class="input"></textarea>
        </div>
        
        <div>
          <h3>${t('Output:')}</h3>
          <pre class="output"></pre>
        </div>
      </nn-caja>
      <lom-footer></lom-footer>
    `,
    }

    #countryCodes = {
      1: 'AMEN',
      6: 'ES',
      11: 'PT',
      30: 'EUEN',
      33: 'DE',
      36: 'FR',
      39: 'ME',
      42: 'RU',

      4: 'VN',
      7: 'ID',
      10: 'EN',
      13: 'TH',
    }

    #normalize(merges) {
      return merges
        .replace(/[^\S\r\n]+/g, ' ') // Collapse spaces/tabs but preserve line breaks
        .replace(/←/g, ':') // Replace arrow with colon
        .replace(/ : /g, ': ') // Remove the space before the semicolon and keep the one after
        .replace(/-/g, '_') // Replace dashes by underscore
        .replace(/\[(.*?)\]/g, this.#quoteServersInBrackets)
        .replace(/\d+/g, this.#normalizeNumericIds.bind(this))
        .replace(/\b([A-Z]+)(\d+)\b/g, '$1_$2') // Add underscore between region and number
        .replace(/^.+$/gm, '$&,') // Add trailing comma to each line
    }

    #quoteServersInBrackets(_, servers) {
      return (
        '[' +
        servers
          .split(',')
          .map(s => `"${s.trim()}"`)
          .join(',') +
        ']'
      )
    }

    #normalizeNumericIds(num) {
      if (num.length <= 3) return num

      const serverId = num.slice(-3)
      const regionCode = parseInt(num.slice(0, -3), 10)
      const region = this.#countryCodes[regionCode]

      return region ? `${region}_${serverId}` : num
    }

    handleChange(e, text) {
      const output = this.querySelector('.output')
      output.innerHTML = this.#normalize(text || e?.target?.value)
    }

    connectedCallback() {
      this.innerHTML = this.#data.template

      const input = this.querySelector('.input')
      input.addEventListener('input', this.handleChange)

      input.innerHTML = this.#data.input
      this.handleChange(null, this.#data.input)
    }
  }
)
