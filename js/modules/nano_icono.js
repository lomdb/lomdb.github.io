import { getPrefix } from './nano_helpers.js'

class Icono extends HTMLElement {
  constructor() {
    super()
  }
}

window.customElements.define(getPrefix('icono'), Icono)
