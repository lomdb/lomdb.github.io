import './modules/index.js'
import { servers } from './db_merges.js'
import { getPrefix } from './helpers.js'
import './component_navbar.js'
import './component_users.js'

import mergesGlobal from './db_merges_global.js'
import mergesSea from './db_merges_sea.js'
import mergesTW from './db_merges_tw.js'
import mergesKR from './db_merges_kr.js'

import { am } from './db_users-am.js'
import { eu } from './db_users-eu.js'
import { sea } from './db_users-sea.js'
import { kr } from './db_users-kr.js'
import { jp } from './db_users-jp.js'
import { tw } from './db_users-tw.js'

class State extends HTMLElement {
  constructor() {
    super()
  }

  #data = {
    attrs: [],
    language: 'all',
    servers,
    template: `
      <nn-caja padding="4" class="base">
        <lom-navbar></lom-navbar>
        <lom-filters></lom-filters>

        <h2>DB State</h2>

        <div class="table">
          <nn-fila break="sm" class="table-header" gap="1">
            <nn-pilar size="25% - ${4 - 1}px">REGION</nn-pilar>
            <nn-pilar size="25% - ${4 - 1}px">MERGES</nn-pilar>
            <nn-pilar size="25% - ${4 - 1}px">TOP 100</nn-pilar>
            <nn-pilar size="25% - ${4 - 1}px">ELITES</nn-pilar>
          </nn-fila>
          <div class="table-body"></div>
        </div>
      </nn-caja>
  `,
  }

  #getPlayersLastDate(players, category) {
    return (
      players
        .map(player =>
          player.ranks.filter(r => r.rank === category).map(r => r.date)
        )
        .flat()
        .sort((a, b) => b?.localeCompare(a))[0] || '-'
    )
  }

  #getMergeLastDate(merges) {
    return Object.keys(merges).sort((a, b) => b.localeCompare(a))[0] || '-'
  }

  #table = [
    {
      region: 'The Americas',
      top100: this.#getPlayersLastDate(am, 'top'),
      elites: this.#getPlayersLastDate(am, 'elite'),
      merges: this.#getMergeLastDate(mergesGlobal),
    },
    {
      region: 'Europe',
      top100: this.#getPlayersLastDate(eu, 'top'),
      elites: '-', //this.#getPlayersLastDate(eu, 'elite'),
      merges: this.#getMergeLastDate(mergesGlobal),
    },
    {
      region: 'South East Asian (SEA)',
      top100: this.#getPlayersLastDate(sea, 'top'),
      elites: '-', //this.#getPlayersLastDate(sea, 'elite'),
      merges: this.#getMergeLastDate(mergesSea),
    },
    {
      region: 'Taiwan',
      top100: this.#getPlayersLastDate(tw, 'top'),
      elites: this.#getPlayersLastDate(tw, 'elite'),
      merges: this.#getMergeLastDate(mergesTW),
    },
    {
      region: 'Korea',
      top100: this.#getPlayersLastDate(kr, 'top'),
      elites: this.#getPlayersLastDate(kr, 'elite'),
      merges: this.#getMergeLastDate(mergesKR),
    },
    {
      region: 'Japan',
      top100: this.#getPlayersLastDate(jp, 'top'),
      elites: this.#getPlayersLastDate(jp, 'elite'),
      merges: '-',
    },
    {
      region: 'China',
      top100: '-', //this.#getPlayersLastDate(cn, 'top'),
      elites: '-', //this.#getPlayersLastDate(cn, 'elite'),
      merges: '-',
    },
  ]

  #generateTable() {
    const tableBody = this.querySelector('.table-body')
    const fragment = document.createDocumentFragment()

    this.#table.forEach(row => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = `
        <nn-fila break="sm" class="row" gap="1">
          <nn-pilar size="25% - 3px"">
            ${row.region}
          </nn-pilar>
          <nn-pilar size="25% - 3px"">
            ${row.merges}
          </nn-pilar>
          <nn-pilar size="25% - 3px"">
            ${row.top100}
          </nn-pilar>
          <nn-pilar size="25% - 3px"">
            ${row.elites}
          </nn-pilar>
        </nn-fila>
      `
      fragment.appendChild(wrapper.firstElementChild)
    })

    tableBody.innerHTML = ''
    tableBody.appendChild(fragment)
  }

  connectedCallback() {
    this.innerHTML = this.#data.template
    this.#generateTable()
  }
}

window.customElements.define(getPrefix('state'), State)
