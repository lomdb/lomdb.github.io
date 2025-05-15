import { getPrefix } from './nano_helpers.js'

const template = `
  <button
    type="button"
    aria-expanded="true"
    aria-controls="collapseOne">
  </button>
  <div></div>
`

const data = {
  content: '',
  attrs: [
    {
      name: 'titulo',
    },
  ],
}

class Paso extends HTMLElement {
  constructor() {
    super()
  }

  updateAttr(name, regex, prefix) {
    const attr = this.getAttribute(name)
    // attr && this.classList.add([prefix, attr].join('-'))
  }

  connectedCallback() {
    data.attrs.forEach(attr => this.updateAttr(attr))
    data.content = this.innerHTML
    this.innerHTML = template

    this.querySelector('button').innerHTML = this.getAttribute('title')
    this.querySelector('div').innerHTML = data.content
  }

  static get observedAttributes() {
    return data.attrs.map(attr => attr.name)
  }

  attributeChangedCallback(prop) {
    const attr = data.attrs.find(attr => attr.name === prop)?.[0]
    attr && this.updateAttr(attr)
  }
}

customElements.define(getPrefix('paso'), Paso)

export { data }
