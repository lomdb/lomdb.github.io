import { getPrefix } from './nano_helpers.js'

customElements.define(
  getPrefix('icono'),
  class extends HTMLElement {
    constructor() {
      super()
    }
  }
)
