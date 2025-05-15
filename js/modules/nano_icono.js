import { getPrefix } from './nano_helpers.js'

class Icono extends HTMLElement {
  constructor() {
    super()
  }
}

customElements.define(getPrefix('icono'), Icono)
