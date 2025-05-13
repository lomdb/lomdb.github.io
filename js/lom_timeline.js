import './modules/index.js'
import { servers } from './db_merges.js'
import { getTooltip } from './utils.js'
import { getPrefix } from './helpers.js'
import { createFilters, langs } from './component_filters.js'
import './component_navbar.js'
import './component_users.js'

class Timeline extends HTMLElement {
  constructor() {
    super()
  }

  static data = {
    attrs: [],
    language: 'all',
    langs,
    servers,
  }

  static template = `
  <nn-caja padding="4" class="base">
    <lom-navbar></lom-navbar>
		${createFilters()}

    <h2>Merged Servers</h2>

    <div class="table">
      <nn-fila break="sm" class="table-header" gap="1">
        <nn-pilar size="25%">LEADING SERVER</nn-pilar>
        <nn-pilar size="75% - 0.25rem">MERGED</nn-pilar>
      </nn-fila>
      <div class="table-body"></div>
    </div>
  </nn-caja>
  `

  generateListeners() {
    const filterContainer = this.querySelector('.filters')
    if (!filterContainer) return

    filterContainer.addEventListener('click', e => {
      const button = e.target.closest('button')
      if (!button || !filterContainer.contains(button)) return

      const lang = button.classList[0]
      Timeline.data.language = lang

      this.querySelectorAll('.filters button').forEach(btn =>
        btn.classList.remove('active')
      )
      button.classList.add('active')

      this.generateTable()
    })
  }

  generateTable() {
    const tableBody = this.querySelector('.table-body')

    this.querySelector(
      '.filters button.' + Timeline.data.language
    ).classList.add('active')

    let localServers

    if (Timeline.data.language !== 'all') {
      localServers = Timeline.data.servers.filter(
        server =>
          server.key.id === Timeline.data.language ||
          server.values.some(val => val.id === Timeline.data.language)
      )
    } else {
      localServers = Timeline.data.servers
    }

    const fragment = document.createDocumentFragment()
    if (localServers.length) {
      localServers.forEach(serv => {
        const key = { ...serv.key }
        const group = serv.values

        const tooltipMap = group
          .map(cell => {
            const tooltip = getTooltip(cell)
            return `
        <nn-pilar
          class="fusion ${[cell.id, ...tooltip.classes].join(' ')}"
          style="order:${cell.numericId}"
        >
          ${tooltip.msg || cell.label}
        </nn-pilar>
      `
          })
          .join('')

        const wrapper = document.createElement('div')
        wrapper.innerHTML = `
      <nn-fila break="md" class="row" gap="1">
        <nn-pilar size="25%" class="leading-server flex-column">
          <span class="index">${key.index}</span>
          <span class="pill ${key.id}">${key.label}</span>
          <span class="pill white">Length: ${group.length}</span>
        </nn-pilar>
        <nn-pilar size="75% - 0.25rem">
          <nn-fila break="md" class="merge-group">
            ${tooltipMap}
          </nn-fila>
        </nn-pilar>
      </nn-fila>
    `
        fragment.appendChild(wrapper.firstElementChild)
      })
    } else {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = `
      <nn-fila break="md" class="row" gap="1">
        <nn-pilar size="100%" class="empty">
         Empty
        </nn-pilar>
      </nn-fila>
    `
      fragment.appendChild(wrapper.firstElementChild)
    }

    tableBody.innerHTML = ''
    tableBody.appendChild(fragment)
  }

  connectedCallback() {
    this.innerHTML = Timeline.template
    this.generateTable()
    this.generateListeners()
  }
}

window.customElements.define(getPrefix('timeline'), Timeline)

export { Timeline }
