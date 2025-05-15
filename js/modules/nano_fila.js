import { getPrefix } from './nano_helpers.js'

const data = {
  attrs: [
    {
      name: 'gap',
      regex: /gap-(\d)*/g,
      prefix: 'gap',
    },
    {
      name: 'padding-inline',
      regex: /pi-(\d)*/g,
      prefix: 'pi',
    },
    {
      name: 'break',
      regex: /break-(.*)*/g,
      prefix: 'break',
    },
  ],
}

class Fila extends HTMLElement {
  constructor() {
    super()
  }

  removeCustomClass(regex) {
    ;[...this.classList].forEach(
      currentClass =>
        regex.test(currentClass) && this.classList.remove(currentClass)
    )
  }

  updateAttr(attr) {
    this.removeCustomClass(attr.regex)
    const value = this.getAttribute(attr.name)
    attr & value && this.classList.add([attr.prefix, value].join('-'))
  }

  connectedCallback() {
    data.attrs.forEach(attr => this.updateAttr(attr))
  }

  static get observedAttributes() {
    return data.attrs.map(attr => attr.name)
  }

  attributeChangedCallback(prop) {
    const attr = data.attrs.find(attr => attr.name === prop)?.[0]
    attr && this.updateAttr(attr)
  }
}

customElements.define(getPrefix('fila'), Fila)

export { data }