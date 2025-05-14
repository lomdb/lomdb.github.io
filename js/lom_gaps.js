import './modules/index.js'
import { spreadServers } from './db_merges.js'
import { getPrefix, createNode } from './helpers.js'
import { getCountryCode } from './utils.js'
import './component_users.js'
import { langs } from './component_filters.js'
import { countryCodes } from './enum_country-codes.js'
import './component_navbar.js'

class Gaps extends HTMLElement {
  constructor() {
    super()
  }

  #data = {
    attrs: [],
    language: 'all',
    spreadServers,
    template: `
    <nn-caja padding="4" class="base">
      <lom-navbar></lom-navbar>
      <lom-filters></lom-filters>
      <div id="all-servers" class="base"></div>
    </nn-caja>
    `
  }

  #generateRange(id, start, end) {
    const range = Array.from(
      { length: end - start + 1 },
      (_, i) => i + start
    ).map(server => {
      const number = `${server}`.replace(countryCodes[id], '')

      return [id, number].join('_')
    })
    return range
  }

  #generateListeners() {
    langs.forEach(lang => {
      document
        .querySelector('.filters button.' + lang)
        .addEventListener('click', () => {
          this.#data.language = lang
          document
            .querySelectorAll('.filters button')
            .forEach(btn => btn.classList.remove('active'))
          this.generateGapsList()
        })
    })
  }

  #generateGapsList() {
    const container = this.querySelector('#all-servers')
    container.innerHTML = ''

    document
      .querySelector('.filters button.' + this.#data.language)
      .classList.add('active')

    const servers = [
      {
        title: 'CN (1)',
        filter: 'cn',
        servers: this.#generateRange('CN', 1001, 1999),
      },
      {
        title: 'AMEN (1)',
        filter: 'amen',
        servers: this.#generateRange('AMEN', 1001, 1999),
      },
      {
        title: 'VN (4)',
        filter: 'vn',
        servers: this.#generateRange('VN', 4001, 4999),
      },
      {
        title: 'ES (6)',
        filter: 'es',
        servers: this.#generateRange('ES', 6001, 6999),
      },
      {
        title: 'ID (7)',
        filter: 'id',
        servers: this.#generateRange('ID', 7001, 7999),
      },
      {
        title: 'EN (10)',
        filter: 'en',
        servers: this.#generateRange('EN', 10001, 10999),
      },
      {
        title: 'PT/ESPT (11)',
        filter: 'pt',
        servers: this.#generateRange('PT', 11001, 11999),
      },
      {
        title: 'TH (13)',
        filter: 'th',
        servers: this.#generateRange('TH', 13001, 13999),
      },
      {
        title: 'EUEN/MUSH (30)',
        filter: 'euen',
        servers: this.#generateRange('EUEN', 30001, 30999),
      },
      {
        title: 'DE (33)',
        filter: 'de',
        servers: this.#generateRange('DE', 33001, 33999),
      },
      {
        title: 'FR (36)',
        filter: 'fr',
        servers: this.#generateRange('FR', 36001, 36999),
      },
      {
        title: 'ME/TR (39)',
        filter: 'me',
        servers: this.#generateRange('ME', 39001, 39999),
      },
      {
        title: 'RU (42)',
        filter: 'ru',
        servers: this.#generateRange('RU', 42001, 42999),
      },
      {
        title: 'TW',
        filter: 'tw',
        servers: this.#generateRange('TW', 54001, 54999),
      },
      {
        title: 'KR',
        filter: 'kr',
        servers: this.#generateRange('KR', 641001, 642999),
      },
      {
        title: 'JP',
        filter: 'jp',
        servers: this.#generateRange('JP', 74001, 74999),
      },
    ].filter(item => {
      if (this.#data.language === 'all') return true
      return this.#data.language === item.filter
    })

    servers.forEach(serv => {
      createNode({
        type: 'h2',
        parent: container,
        innerHTML: serv.title,
      })

      const ul = createNode({
        type: 'ul',
        parent: container,
        attrs: {
          class: 'table-pill-container',
        },
      })

      serv.servers.forEach(server => {
        const isMissing = !this.#data.spreadServers.includes(server)

        const serverDetails = getCountryCode(server)

        createNode({
          type: 'li',
          parent: ul,
          attrs: {
            class: [isMissing ? 'missing' : '', serverDetails.id].join(' '),
            title: isMissing ? 'not merge / missing' : '',
          },
          innerHTML: serverDetails.label,
        })
      })
    })
  }

  connectedCallback() {
    this.innerHTML = this.#data.template
    this.#generateGapsList()
    this.#generateListeners()
  }
}

window.customElements.define(getPrefix('gaps'), Gaps)