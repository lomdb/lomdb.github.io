import './modules/index.js'
import { getTooltip, getCountryCode } from './utils.js'
import { getPrefix } from './helpers.js'
import { langs } from './component_filters.js'
import './component_users.js'
import mergesGlobal from './db_merges_global.js'
import mergesSea from './db_merges_sea.js'
import mergesTW from './db_merges_tw.js'
import './component_navbar.js'

class Merges extends HTMLElement {
  #data = {
    language: 'all',
    langs,
    mergesArray: this.#mapToTableRows([mergesGlobal, mergesSea, mergesTW]),
  }

  #template = `
    <nn-caja padding="4" class="base">
      <lom-navbar></lom-navbar>
      <lom-filters></lom-filters>
      <div id="merged-list" class="merged-list"></div>
    </nn-caja>
  `

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = this.#template
    this.#generateTable()
    this.#generateListeners()
  }

  #mapToTableRows(inputs) {
    const merged = {}
    for (const input of inputs) {
      for (const [date, entries] of Object.entries(input)) {
        merged[date] ??= {}
        Object.assign(merged[date], entries)
      }
    }

    const rows = Object.entries(merged).map(([date, servers]) => ({
      date,
      servers: Object.entries(servers).map(([key, values]) => ({
        key: getCountryCode(key),
        values: values.map(getCountryCode),
      })),
    }))

    rows.sort((a, b) => new Date(b.date) - new Date(a.date))

    for (const row of rows) {
      row.servers.sort((a, b) => a.key.numericId - b.key.numericId)
    }

    return rows
  }

  #generateListeners() {
    const filterContainer = this.querySelector('.filters')
    if (!filterContainer) return

    filterContainer.addEventListener('click', e => {
      const button = e.target.closest('button')
      if (!button || !filterContainer.contains(button)) return

      const lang = button.classList[0]
      this.#data.language = lang

      this.querySelectorAll('.filters button').forEach(btn =>
        btn.classList.remove('active')
      )
      button.classList.add('active')

      this.#generateTable()
    })
  }

  #generateTable() {
    const body = this.querySelector('#merged-list')
    if (!body) return

    body.innerHTML = ''

    const activeButton = this.querySelector(
      '.filters button.' + this.#data.language
    )
    if (activeButton) activeButton.classList.add('active')

    const fragment = document.createDocumentFragment()

    this.#data.mergesArray.forEach(merge => {
      const mergeTable = document.createElement('div')
      mergeTable.classList.add('merge-table')

      mergeTable.innerHTML = `
        <h2>${merge.date}</h2>
        <div class="table">
          <nn-fila break="sm" class="table-header" gap="1">
            <nn-pilar size="25%">LEADING SERVER</nn-pilar>
            <nn-pilar size="75% - 0.25rem">MERGED</nn-pilar>
          </nn-fila>
          <div class="table-body"></div>
        </div>
      `

      const table = mergeTable.querySelector('.table-body')

      const localServers =
        this.#data.language === 'all'
          ? merge.servers
          : merge.servers.filter(
              server =>
                server.key.code === this.#data.language ||
                server.values.some(val => val.id === this.#data.language)
            )

      if (localServers.length > 0) {
        localServers.forEach(serv => {
          const key = serv.key
          const group = serv.values

          const groups = group
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

          const row = document.createElement('nn-fila')
          row.setAttribute('break', 'md')
          row.setAttribute('gap', '1')
          row.classList.add('row')
          row.innerHTML = `
            <nn-pilar size="25%" class="leading-server flex-column ${key.id}">
              <span class="pill ${key.id}">${key.label}</span>
              <span class="pill white">Length: ${group.length}</span>
            </nn-pilar>
            <nn-pilar size="75% - 0.25rem">
              <nn-fila break="md" class="merge-group">
                ${groups}
              </nn-fila>
            </nn-pilar>
          `

          table.appendChild(row)
        })
      } else {
        const row = document.createElement('nn-fila')
        row.setAttribute('break', 'md')
        row.setAttribute('gap', '1')
        row.classList.add('row')
        row.innerHTML = `
          <nn-pilar size="100%" class="empty">Empty</nn-pilar>
        `
        table.appendChild(row)
      }

      fragment.appendChild(mergeTable)
    })

    body.appendChild(fragment)
  }
}

window.customElements.define(getPrefix('merges'), Merges)
