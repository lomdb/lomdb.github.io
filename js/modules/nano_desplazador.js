import { getPrefix } from './nano_helpers.js'

customElements.define(
  getPrefix('desplazador'),
  class extends HTMLElement {
    constructor() {
      super()
    }
  }
)
