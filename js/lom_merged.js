import './modules/index.js'
import { getTooltip, getCountryCode } from './utils.js'
import { getPrefix, createNode } from './helpers.js'
import { createFilters, langs } from './component_filters.js'
import './component_users.js'
import mergesGlobal from './db_merges_global.js'
import mergesSea from './db_merges_sea.js'
import mergesTW from './db_merges_tw.js'

function mapToTableRows(inputs) {
  const merged = {}

  // Step 1: Merge all inputs by date
  for (const input of inputs) {
    for (const [date, entries] of Object.entries(input)) {
      merged[date] ??= {}
      Object.assign(merged[date], entries)
    }
  }

  // Step 2: Convert to desired output format
  const rows = Object.entries(merged).map(([date, servers]) => ({
    date,
    servers: Object.entries(servers).map(([key, values]) => ({
      key: getCountryCode(key),
      values: values.map(getCountryCode),
    })),
  }))

  // Step 3: Sort the rows by date descending
  rows.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Step 4: Sort servers inside each row by numericId
  for (const row of rows) {
    row.servers.sort((a, b) => a.key.numericId - b.key.numericId)
  }

  return rows
}

const mergesArray = mapToTableRows([mergesGlobal, mergesSea, mergesTW])

const template = `
  <nn-caja padding="4" class="base">
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
    data.langs.forEach(lang => {
      document
        .querySelector('.nav button.' + lang)
        .addEventListener('click', () => {
          data.language = lang
          document
            .querySelectorAll('.nav button')
            .forEach(btn => btn.classList.remove('active'))
          this.generateTable()
        })
    })
  }

  generateTable() {
    const body = this.querySelector('#merged-list')
    body.innerHTML = ''

    document
      .querySelector('.nav button.' + data.language)
      .classList.add('active')

    data.mergesArray.forEach(merge => {
      createNode({
        type: 'h2',
        parent: body,
        innerHTML: `${merge.date}`,
      })

      const table = createNode({
        type: 'table',
        parent: body,
        innerHTML: `
          <thead>
            <tr>
              <th>NEW</th>
              <th>MERGED</th>
            </tr>
          </thead>
          <tbody id="table-body"></tbody>
		    `,
      })

      const tableBody = table.querySelector('#table-body')

      let localServers

      if (data.language !== 'all') {
        localServers = merge.servers.filter(
          server =>
            server.key.code === data.language ||
            server.values.some(val => val.id === data.language)
        )
      } else {
        localServers = merge.servers
      }

      if (localServers.length > 0) {
        localServers.forEach(serv => {
          const key = serv.key
          const group = serv.values

          const tr = createNode({
            type: 'tr',
            parent: tableBody,
          })

          createNode({
            type: 'td',
            parent: tr,
            attrs: {
              class: [key.id, ...getTooltip(key).classes].join(' '),
            },
            innerHTML: getTooltip(key).msg ? getTooltip(key).msg : key.label,
          })

          const tdGroup = createNode({
            type: 'td',
            parent: tr,
            attrs: { class: 'merged' },
          })

          const groupCell = createNode({
            type: 'div',
            parent: tdGroup,
          })

          group.forEach(cell => {
            createNode({
              type: 'span',
              parent: groupCell,
              attrs: {
                class: ['fusion', cell.id, ...getTooltip(cell).classes].join(
                  ' '
                ),
                style: `order:${cell.numericId}`,
              },
              innerHTML: getTooltip(cell).msg
                ? getTooltip(cell).msg
                : cell.label,
            })
          })
        })
      } else {
        const tr = createNode({
          type: 'tr',
          parent: tableBody,
        })

        createNode({
          type: 'td',
          parent: tr,
          attrs: {
            colspan: 2,
          },
          innerHTML: 'No Merges Found',
        })
      }
    })
  }

  connectedCallback() {
    this.innerHTML = template
    this.generateTable('all')
    this.generateListeners()
  }
}

window.customElements.define(getPrefix('simple'), Simple)

export { data }
