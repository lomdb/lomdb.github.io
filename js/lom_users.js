import './modules/index.js'
import { getPrefix, createNode } from './helpers.js'
import { usersDB as users } from './db_users.js'
import { createFilters, langs } from './component_filters.js'

class Users extends HTMLElement {
  static template = /*html*/ `
<nn-caja padding="4" class="base">
  ${createFilters()}

  <div class="title-disclaimer">
    <h2>Users</h2>
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

  <div class="table">
    <nn-fila break="sm" class="table-header">
      <nn-pilar size="20%">Server</nn-pilar>
      <nn-pilar size="20%">UID</nn-pilar>
      <nn-pilar size="35%">Nick</nn-pilar>
      <nn-pilar size="25%">Rank :: Position :: Date</nn-pilar>
    </nn-fila>
    <div id="table-body"></div>
  </div>
</nn-caja>
`

  static data = {
    attrs: [],
    language: 'all',
    langs,
    users,
  }

  constructor() {
    super()
  }

  generateListeners() {
    Users.data.langs.forEach(lang => {
      document
        .querySelector('.nav button.' + lang)
        .addEventListener('click', () => {
          Users.data.language = lang
          document
            .querySelectorAll('.nav button')
            .forEach(btn => btn.classList.remove('active'))
          this.generateTable()
        })
    })
  }

  generateTable() {
    const tableBody = this.querySelector('#table-body')
    tableBody.innerHTML = ''

    document
      .querySelector('.nav button.' + Users.data.language)
      ?.classList.add('active')

    let table = Users.data.users
    if (Users.data.language !== 'all') {
      table = Users.data.users.filter(user => user.lang === Users.data.language)
    }

    if (table.length) {
      table.forEach(user => {
        const tr = createNode({
          type: 'nn-fila',
          parent: tableBody,
          attrs: {
            title: user.names[0],
            break: 'md',
          },
        })

        createNode({
          type: 'nn-pilar',
          parent: tr,
          attrs: {
            size: '20%',
          },
          innerHTML: `<span class="pill ${user.lang}">${user.server}</span>`,
        })

        createNode({
          type: 'nn-pilar',
          parent: tr,
          attrs: {
            size: '20%',
          },
          innerHTML: user.id,
        })

        const names = createNode({
          type: 'nn-pilar',
          parent: tr,
          attrs: {
            size: '35%',
          },
        })

        const namesGroup = createNode({
          type: 'div',
          parent: names,
          attrs: {
            class: 'names-group',
          },
        })

        user.names.forEach(n => {
          createNode({
            type: 'span',
            parent: namesGroup,
            innerHTML: n,
            attrs: {
              class: ['pill', user.lang].join(' '),
            },
          })
        })

        const ranks = createNode({
          type: 'nn-pilar',
          parent: tr,
          attrs: {
            class: 'date-rank-group',
            size: '25%',
          },
        })

        user.ranks.forEach(rank => {
          createNode({
            type: 'span',
            parent: ranks,
            innerHTML: [
              rank?.rank,
              rank?.rank === 'top' && user?.maxPosition,
              rank?.date,
            ]
              .filter(Boolean)
              .join(' :: '),
            attrs: {
              class: ['pill', rank?.rank].join(' '),
            },
          })
        })

        if (user.maxPower && user.maxLevel) {
          createNode({
            type: 'span',
            parent: ranks,
            innerHTML: `lv${user.maxLevel} :: ${user.maxPower / 1000000}M`,
            attrs: {
              class: ['pill', user.lang].join(' '),
            },
          })
        }
      })
    } else {
      const tr = createNode({
        type: 'tr',
        parent: tableBody,
      })

      createNode({
        type: 'nn-pilar',
        parent: tr,
        text: 'No users found',
        attrs: {
          colspan: 4,
        },
      })
    }
  }

  connectedCallback() {
    this.innerHTML = Users.template
    this.generateTable()
    this.generateListeners()
  }
}

window.customElements.define(getPrefix('users'), Users)

export { Users }
