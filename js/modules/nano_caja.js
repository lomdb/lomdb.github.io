import { getPrefix } from './nano_helpers.js'

const data = {
  attrs: [
    {
      name: 'padding',
      regex: /p-(\d)*/g,
      prefix: 'p',
    },
    {
      name: 'size',
      regex: /mw-(\d)*/g,
      prefix: 'mw',
    },
  ],
}

class Caja extends HTMLElement {
  constructor() {
    super()
  }

  removeCustomClass(regex) {
    ;[...this.classList].forEach(
      currentClass =>
        regex.test(currentClass) && this.classList.remove(currentClass)
    )
  }

  updateAttr({ name, regex, prefix }) {
    this.removeCustomClass(regex)
    const attr = this.getAttribute(name)
    attr && this.classList.add([prefix, attr].join('-'))
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

window.customElements.define(getPrefix('caja'), Caja)

export { data }
