import './modules/index.js'
import { spreadServers } from './db_merges.js'
import { getPrefix, createNode } from './helpers.js'
import './component_users.js'
import './component_filters.js'
import './component_navbar.js'
import './component_footer.js'

class Gaps extends HTMLElement {
  constructor() {
    super()
  }

  #data = {
    language: 'all',
    spreadServers,
    template: `
      <nn-caja padding="1rem" class="base">
        <div class="nav-controls">
          <lom-navbar></lom-navbar>
          <lom-filters></lom-filters>
        </div>
        <div id="all-servers" class="base"></div>
      </nn-caja>
      <lom-footer></lom-footer>
    `,
  }

  #serverConfigs = [
    { title: 'AMEN (1)', filter: 'amen', starts: 1 },
    { title: 'ES (6)', filter: 'es', starts: 1 },
    {
      title: 'ESPT (11)',
      filter: 'espt',
      internalfilter: 'pt',
      starts: 248,
    },
    { title: 'PT (11)', filter: 'pt', starts: 1, ends: 247 },
    { title: 'EUEN (30)', filter: 'euen', starts: 1, ends: 261 },
    {
      title: 'MUSH (30)',
      filter: 'mush',
      internalfilter: 'euen',
      starts: 262,
    },
    { title: 'DE (33)', filter: 'de', starts: 1 },
    { title: 'FR (36)', filter: 'fr', starts: 1 },
    { title: 'ME (39)', filter: 'me', starts: 1, ends: 90 },
    {
      title: 'TR (39)',
      filter: 'tr',
      internalfilter: 'me',
      starts: 91,
      ends: 200,
    },
    { title: 'RU (42)', filter: 'ru', starts: 1 },
    { title: 'CN (1)', filter: 'cn', starts: 1 },
    { title: 'VN (4)', filter: 'vn', starts: 1 },
    { title: 'ID (7)', filter: 'id', starts: 1 },
    { title: 'EN (10)', filter: 'en', starts: 1 },
    { title: 'TH (13)', filter: 'th', starts: 1 },
    { title: 'KR', filter: 'kr', starts: 0 },
    { title: 'JP', filter: 'jp', starts: 0 },
    { title: 'TW', filter: 'tw', starts: 1001 },
  ]

  #servers = []

  #generateRange(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start)
  }

  #normalizeServers() {
    this.#servers = this.#serverConfigs.map(config => {
      const internal = config.internalfilter || config.filter
      const merged = this.#data.spreadServers
        .filter(s => s.startsWith(internal.toUpperCase() + '_'))
        .map(s => +s.split('_')[1])
      const mergedSet = new Set(merged)

      const ends =
        typeof config.ends === 'number'
          ? config.ends
          : merged.length > 0
          ? Math.max(...merged)
          : 0

      const range = this.#generateRange(config.starts, ends)

      return {
        title: config.title,
        filter: config.filter,
        servers: range.map(id => ({
          id,
          found: mergedSet.has(id),
        })),
      }
    })
  }

  #generateListeners() {
    const filterContainer = this.querySelector('.filters')
    if (!filterContainer) return

    filterContainer.addEventListener('click', e => {
      const button = e.target.closest('button')
      if (!button || !filterContainer.contains(button)) return

      const lang = button.classList[0]
      if (lang === this.#data.language) return

      this.#data.language = lang

      this.querySelectorAll('.filters button').forEach(btn =>
        btn.classList.remove('active')
      )
      button.classList.add('active')

      this.#generateGapsList()
    })
  }

  #generateGapsList() {
    const container = this.querySelector('#all-servers')
    container.innerHTML = ''

    this.#servers
      .filter(item =>
        this.#data.language === 'all'
          ? true
          : item.filter === this.#data.language
      )
      .forEach(serv => {
        createNode({
          type: 'h2',
          parent: container,
          innerHTML: serv.title,
        })

        const fila = createNode({
          type: 'nn-fila',
          parent: container,
          attrs: { class: 'table-body' },
        })

        serv.servers.forEach(server => {
          createNode({
            type: 'nn-pilar',
            parent: fila,
            attrs: {
              class: [server.found ? '' : 'missing', serv.filter].join(' '),
              title: server.found ? '' : 'not merge / missing',
            },
            innerHTML: server.id,
          })
        })
      })

    const activeBtn = this.querySelector(
      `.filters button.${this.#data.language}`
    )
    activeBtn?.classList.add('active')
  }

  connectedCallback() {
    this.innerHTML = this.#data.template
    this.#normalizeServers()
    this.#generateGapsList()
    this.#generateListeners()
  }
}

customElements.define(getPrefix('gaps'), Gaps)
