import './modules/index.js'
import { servers } from './db_merges.js'
import { getTooltip } from './utils.js'
import { getPrefix, createNode } from './helpers.js'
import { createFilters, langs } from './component_filters.js'
import './component_users.js'

const template = `
  <nn-caja padding="4" class="base">
		${createFilters()}

    <div class="title-disclaimer">
      <h2>Merged Servers</h2>
      <blockquote>
        If you believe your user should be listed here or that any data needs correction, feel free to send an email to 
        <a href="mailto:pombo.9g7ku@simplelogin.fr">pombo.9g7ku@simplelogin.fr</a> with the following:
        <ul>
          <li>A screenshot of your user profile, ideally showing your original server.</li>
          <li>Screenshots showing your presence in the Elite Champion or above.</li>
          <li>The date when you were ranked in one of these tiers.</li>
        </ul>
      </blockquote>
    </div>

    <table>
			<thead>
				<tr>
					<th>NEW</th>
					<th>MERGED</th>
				</tr>
			</thead>
			<tbody id="merged-list"></tbody>
		</table>
  </nn-caja>
`

const data = {
  attrs: [],
  language: 'all',
  langs,
  servers,
}

class Timeline extends HTMLElement {
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
    const tableBody = this.querySelector('#merged-list')
    tableBody.innerHTML = ''

    document
      .querySelector('.nav button.' + data.language)
      .classList.add('active')

    let localServers

    if (data.language !== 'all') {
      localServers = data.servers.filter(
        server =>
          server.key.id === data.language ||
          server.values.some(val => val.id === data.language)
      )
    } else {
      localServers = data.servers
    }

    localServers.forEach(serv => {
      const key = { ...serv.key }
      const group = serv.values

      const tr = createNode({
        type: 'tr',
        parent: tableBody,
      })

      const td = createNode({
        type: 'td',
        parent: tr,
        attrs: {
          class: [key.id, 'leading-server'].join(' '),
        },
      })

      createNode({
        type: 'span',
        parent: td,
        attrs: {
          // class: ['pill', 'charcoal'].join(' '),
        },
        text: key.label,
      })

      const div = createNode({
        type: 'div',
        parent: td,
        attrs: {
          class: ['user-details'].join(' '),
        },
      })

      createNode({
        type: 'span',
        parent: div,
        // attrs: {
        //   class: ['pill', 'white'].join(' '),
        // },
        text: 'Index: ' + key.index,
      })

      createNode({
        type: 'span',
        parent: div,
        // attrs: {
        //   class: ['pill', 'white'].join(' '),
        // },
        text: 'Length: ' + group.length,
      })

      const tdGroup = createNode({
        type: 'td',
        parent: tr,
        attrs: { class: ['merged', !group.length && key.id].join(' ') },
      })

      const groupCell = createNode({
        type: 'div',
        parent: tdGroup,
      })

      group.forEach(cell => {
        const span = createNode({
          type: 'span',
          parent: groupCell,
          attrs: {
            class: ['fusion', cell.id, ...getTooltip(cell).classes].join(' '),
            style: `order:${cell.numericId}`,
          },
          innerHTML: getTooltip(cell).msg ? getTooltip(cell).msg : cell.label,
        })
      })
    })
  }

  connectedCallback() {
    this.innerHTML = template
    this.generateTable()
    this.generateListeners()
  }
}

window.customElements.define(getPrefix('timeline'), Timeline)

export { data }
