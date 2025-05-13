import './modules/index.js'
import { getTooltip, getCountryCode } from './utils.js'
import { getPrefix } from './helpers.js'
import { createFilters, langs } from './component_filters.js'
import './component_users.js'
import mergesGlobal from './db_merges_global.js'
import mergesSea from './db_merges_sea.js'
import mergesTW from './db_merges_tw.js'
import './component_navbar.js'

function mapToTableRows(inputs) {
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

const mergesArray = mapToTableRows([mergesGlobal, mergesSea, mergesTW])

const template = `
  <nn-caja padding="4" class="base">
    <lom-navbar></lom-navbar>
    ${createFilters()}
    <div id="merged-list" class="base"></div>
  </nn-caja>
`

const data = {
  attrs: [],
  language: 'all',
  langs,
  mergesArray,
}

class Simple extends HTMLElement {
  constructor() {
    super()
  }

  generateListeners() {
    const filterContainer = this.querySelector('.filters')
    if (!filterContainer) return

    filterContainer.addEventListener('click', e => {
      const button = e.target.closest('button')
      if (!button || !filterContainer.contains(button)) return

      const lang = button.classList[0]
      data.language = lang

      this.querySelectorAll('.filters button').forEach(btn =>
        btn.classList.remove('active')
      )
      button.classList.add('active')

      this.generateTable()
    })
  }

  generateTable() {
    const body = this.querySelector('#merged-list')
    body.innerHTML = ''

    this.querySelector(
      '.filters button.' + data.language
    ).classList.add('active')

    const fragment = document.createDocumentFragment()

    data.mergesArray.forEach(merge => {
      const title = document.createElement('h2')
      title.textContent = merge.date
      fragment.appendChild(title)

      const localServers =
        data.language === 'all'
          ? merge.servers
          : merge.servers.filter(
              server =>
                server.key.code === data.language ||
                server.values.some(val => val.id === data.language)
            )

      if (localServers.length > 0) {
        localServers.forEach(serv => {
          const key = serv.key
          const group = serv.values

          const row = document.createElement('nn-fila')
          row.setAttribute('break', 'md')
          row.setAttribute('gap', '1')
          row.classList.add('row')

          const leading = document.createElement('nn-pilar')
          leading.setAttribute('size', '25%')
          leading.className = `${key.id} leading-server`
          leading.innerHTML = `
            <span>${key.label}</span>
            <span>Index: ${key.index}</span>
            <span>Length: ${group.length}</span>
          `
          row.appendChild(leading)

          const mergedPilar = document.createElement('nn-pilar')
          mergedPilar.setAttribute('size', '75% - 0.25rem')

          const innerFila = document.createElement('nn-fila')
          innerFila.setAttribute('break', 'md')
          innerFila.classList.add('merge-group')

          group.forEach(cell => {
            const tooltip = getTooltip(cell)
            const pilar = document.createElement('nn-pilar')
            pilar.className = `fusion ${[cell.id, ...tooltip.classes].join(' ')}`
            pilar.style.order = cell.numericId
            pilar.innerHTML = tooltip.msg || cell.label
            innerFila.appendChild(pilar)
          })

          mergedPilar.appendChild(innerFila)
          row.appendChild(mergedPilar)
          fragment.appendChild(row)
        })
      } else {
        const empty = document.createElement('div')
        empty.classList.add('no-merge')
        empty.innerHTML = `<strong>No Merges Found</strong>`
        fragment.appendChild(empty)
      }
    })

    body.appendChild(fragment)
  }

  connectedCallback() {
    this.innerHTML = template
    this.generateTable()
    this.generateListeners()
  }
}

window.customElements.define(getPrefix('simple'), Simple)
export { data }
