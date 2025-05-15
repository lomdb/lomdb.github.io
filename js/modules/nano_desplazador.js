import { getPrefix } from './nano_helpers.js'

class Desplazador extends HTMLElement {
  constructor() {
    super()
  }
}

customElements.define(getPrefix('desplazador'), Desplazador)
