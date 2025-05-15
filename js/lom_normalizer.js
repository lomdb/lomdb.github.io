import './modules/index.js'
import { getPrefix } from './helpers.js'
import './component_navbar.js'
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
      input: `1526	←	[1530,1531]
1537	←	[1538,1539]
1549	←	[1550,1551]
1561	←	[1562]
1563	←	[1565]
1573	←	[1574,1578]
30218	←	[42121,42124]
30272	←	[30273,30276,39134,39135]
30274	←	[30277,39136,39137,42225]
30275	←	[42226,42227,42228]
30314	←	[42265]
30315	←	[30316]
30317	←	[30318]
30319	←	[42256]
30320	←	[42260]`,
      template: `
      <nn-caja padding="4" class="base">
        <lom-navbar></lom-navbar>

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
        .replace(/	←	/g, ': ')
        .replace(/\d+/g, num => {
          if (num.length <= 3) return num

          const serverId = num.slice(-3)
          const regionCode = parseInt(num.slice(0, -3), 10)
          const region = this.#countryCodes[regionCode]

          return region ? `"${region}_${serverId}"` : num
        })
        .replace(/^.+$/gm, '$&,')
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
