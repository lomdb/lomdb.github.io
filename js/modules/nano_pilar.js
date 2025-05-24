import { getPrefix } from './nano_helpers.js'

customElements.define(
  getPrefix('pilar'),
  class extends HTMLElement {
    constructor() {
      super()
    }

    static get observedAttributes() {
      return ['size']
    }

    #updateSize() {
      const attr = this.getAttribute('size')
      if (attr) {
        const isCalc = /[-+*/]/.test(attr)
        this.style.setProperty('--size', isCalc ? `calc(${attr})` : attr)
      }
    }

    connectedCallback() {
      this.#updateSize()
    }

    attributeChangedCallback(name) {
      if (name === 'size') {
        this.#updateSize()
      }
    }
  }
)
