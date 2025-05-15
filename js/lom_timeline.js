import './modules/index.js'
import { servers } from './db_merges.js'
import { getTooltip } from './utils.js'
import { getPrefix } from './helpers.js'
import { langs } from './component_filters.js'
import './component_navbar.js'
import './component_users.js'
import { t } from './translations.js'
import { rank } from './enum_rank.js'

class Timeline extends HTMLElement {
  constructor() {
    super()
  }

  #data = {
    attrs: [],
    language: 'all',
    langs,
    servers,
    template: `
      <nn-caja padding="4" class="base">
        <lom-navbar></lom-navbar>
        <lom-filters></lom-filters>

        <h2>${t('Merged Servers')}</h2>

        <div class="table">
          <nn-fila break="sm" class="table-header" gap="1">
            <nn-pilar size="25%">${t('Leading Server')}</nn-pilar>
            <nn-pilar size="75% - 0.25rem">${t('Merged')}</nn-pilar>
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

    this.querySelector('.filters button.' + this.#data.language).classList.add(
      'active'
    )

    let localServers

    if (this.#data.language !== 'all') {
      localServers = this.#data.servers.filter(
        server =>
          server.key.id === this.#data.language ||
          server.values.some(val => val.id === this.#data.language)
      )
    } else {
      localServers = this.#data.servers
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
          class="fusion ${cell.id}"
          style="order:${cell.numericId}"
        >
          ${tooltip.msg || cell.label}
        </nn-pilar>
      `
          })
          .join('')

        const players = key.allPlayers
          ?.sort((a, b) => {
            const aPos = a.maxPosition ?? Infinity
            const bPos = b.maxPosition ?? Infinity

            if (aPos !== bPos) {
              return aPos - bPos
            }
            if (a.lastVerify !== b.lastVerify) {
              return new Date(b.lastVerify) - new Date(a.lastVerify)
            }
            if (a.maxRank !== b.maxRank) {
              return rank[a.maxRank] - rank[b.maxRank]
            }
            if (a.langNumber !== b.langNumber) {
              return a.langNumber - b.langNumber
            }
            if (a.server[0] !== b.server[0]) {
              return a.server[0].localeCompare(b.server[0])
            }

            return 0
          })
          .map(user => {
            const tooltip = `${t('Verified')} ${user?.verifiedMonth} ${
              user?.verifiedMonth === 1 ? t('month') : t('months')
            } ${t('ago')}.`
            const rank = `
        <small class="pill help-tooltip ${user?.maxRank}">
          ${[t(user?.maxRank), user?.maxPosition].filter(Boolean).join(' :: ')}
          <div class="help">${t('Highest rank and position achieved')}</div>
        </small>
        <strong class="help-tooltip pill month">
          ${user?.verifiedMonth}
          <div class="help">${tooltip}</div>
        </strong>
      `
            return `<li>${rank} ${user.label}</li>`
          })
          .join('')

        const playersButton =
          players &&
          `
          <button type="button" class="open-modal btn sunglow">
            ${t('Check Players Board').toUpperCase()}
          </button>`

        const wrapper = document.createElement('div')
        wrapper.innerHTML = `
      <nn-fila break="md" class="row" gap="1">
        <nn-pilar size="25%" class="leading-server flex-column">
          <span class="index">${key.index}</span>
          <span class="pill ${key.id}">${key.label}</span>
          <span class="pill white">${t('Size')}: ${group.length}</span>
          
          ${playersButton}

          <dialog class="${key.label.toLowerCase()}">
            <ul class="matrix">
              ${players}
            </ul>
            <button type="button" class="btn sunglow btn-close">Close Modal</button>
          </dialog>

        </nn-pilar>
        <nn-pilar size="75% - 0.25rem">
          <nn-fila break="md" class="merge-group">
            ${tooltipMap}
          </nn-fila>
        </nn-pilar>
      </nn-fila>
    `
        const button = wrapper.querySelector('.open-modal')
        button?.addEventListener('click', function (e) {
          e.stopPropagation()
          const modal = this.nextElementSibling
          if (modal) {
            modal.showModal()
          }
        })

        const closeButton = wrapper.querySelector('.btn-close')
        closeButton?.addEventListener('click', function (e) {
          const dialog = this.closest('dialog')
          if (dialog) {
            dialog.close()
          }
        })

        fragment.appendChild(wrapper.firstElementChild)
      })
    } else {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = `
      <nn-fila break="md" class="row" gap="1">
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

customElements.define(getPrefix('timeline'), Timeline)
