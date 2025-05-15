import './modules/index.js'
import { getPrefix } from './helpers.js'
import { usersDB as users } from './db_users.js'
import { langs } from './component_filters.js'
import './component_navbar.js'
import { t } from './translations.js'

class Players extends HTMLElement {
  constructor() {
    super()
  }

  #data = {
    attrs: [],
    language: 'all',
    langs,
    users,
    template: `
<nn-caja padding="4" class="base">
  <lom-navbar></lom-navbar>
  <lom-filters></lom-filters>

  <h2>${t('Players')}</h2>

  <div class="table">
    <nn-fila break="sm" class="table-header" gap="1">
      <nn-pilar size="20%">${t('Server')}</nn-pilar>
      <nn-pilar size="20%">${t('UID')}</nn-pilar>
      <nn-pilar size="35% - 0.25rem * 3">${t('Nick')}</nn-pilar>
      <nn-pilar size="25%">${t('Rank')} :: ${t('Position')} :: ${t(
      'Date'
    )}</nn-pilar>
    </nn-fila>
    <div class="table-body"></div>
  </div>
</nn-caja>
`,
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
    const tableBody = this.querySelector('.table-body')
    tableBody.innerHTML = ''

    document
      .querySelector('.nav button.' + this.#data.language)
      ?.classList.add('active')

    let table = this.#data.users
    if (this.#data.language !== 'all') {
      table = this.#data.users.filter(user => user.lang === this.#data.language)
    }

    const fragment = document.createDocumentFragment()
    if (table.length) {
      table.forEach(user => {
        const names = user.names
          .map(n => {
            const localName = n?.o ? `${n.o} (${n.t})` : n
            return `
            <span class="pill ${user.lang}">
              ${localName}
            </span>
          `
          })
          .join('')

        const ranks = user.ranks
          .map(rank => {
            return `
            <span class="pill ${rank?.rank}">
              ${[
                t(rank?.rank),
                rank?.rank === 'top' && user?.maxPosition,
                rank?.date,
              ]
                .filter(Boolean)
                .join(' :: ')}
            </span>
          `
          })
          .join('')

        const maxLevel =
          user.maxPower && user.maxLevel
            ? `
          <span class="pill ${user.lang}">
            ${t('lv')}${user.maxLevel} :: ${user.maxPower / 1000000}M
          </span>
        `
            : ''

        const wrapper = document.createElement('div')
        wrapper.innerHTML = `
        <nn-fila break="md" gap="1">
          <nn-pilar size="20%" class="flex-row">
            <span class="pill ${user.lang}">${user.server}</span>
          </nn-pilar>
          <nn-pilar size="20%" class="flex-row">
            ${user.id}
          </nn-pilar>
          <nn-pilar size="35% - 0.25rem * 3" class="flex-row">
            ${names}
          </nn-pilar>
          <nn-pilar size="25%" class="flex-column">
            ${ranks}
            ${maxLevel}
          </nn-pilar>
        </nn-fila>
        `

        fragment.appendChild(wrapper.firstElementChild)
      })
    } else {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = `
        <nn-fila break="md">
          <nn-pilar size="100%" class="empty">
            ${t('Empty')}
          </nn-pilar>
        </nn-fila>
        `

      fragment.appendChild(wrapper.firstElementChild)
    }

    tableBody.innerHTML = ''
    tableBody.appendChild(fragment)
  }

  connectedCallback() {
    this.innerHTML = this.#data.template
    this.#generateTable()
    this.#generateListeners()
  }
}

customElements.define(getPrefix('players'), Players)
