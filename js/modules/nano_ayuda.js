import { getPrefix } from './nano_helpers.js'

const template = `
  <nn-icono class="star"></nn-icono>
  <span class="content"></span>
`

const data = {
  content: '',
  attrs: {
    name: 'icono',
  }
}

class Ayuda extends HTMLElement {
  constructor() {
    super()
  }

  updateTooltip() {
    data.content = this.innerHTML
    this.innerHTML = template
    const content = this.querySelector('.content')
    content.innerHTML = data.content
  }

  updateIcon() {
    const attr = this.getAttribute('icono')
    const icono = this.querySelector('nn-icono')
    icono.className = attr || 'star'
  }

  connectedCallback() {
    this.updateTooltip()
    this.updateIcon()
  }

  static get observedAttributes() {
    return Object.values(data.attrs).map(e => e.name)
  }

  attributeChangedCallback(prop) {
    switch (prop) {
      case 'icono':
        this.updateIcon()
        break
    }
  }
}

window.customElements.define(getPrefix('ayuda'), Ayuda)
