import { getPrefix } from './helpers.js'

const template = `
  <span>
    <button>
      <nn-icono class="arrow-chevron"></nn-icono>
    </button>
  </span>
  <ul class="users"></ul>
`

const data = {
  content: '',
  attrs: [
    {
      name: 'icono',
    },
    {
      name: 'label',
    },
  ],
}

class Users extends HTMLElement {
  constructor() {
    super()
  }

  updateTooltip() {
    data.content = this.innerHTML
    this.innerHTML = template
    const content = this.querySelector('.users')
    content.innerHTML = data.content
  }

  updateLabel() {
    const attr = this.getAttribute('label')
    const span = this.querySelector('span')
    if (span) {
      span.innerHTML = attr + span?.innerHTML
    }
  }

  updateIcon() {
    const attr = this.getAttribute('icono')
    const icono = this.querySelector('nn-icono')
    icono.className = attr || 'arrow-chevron'
  }

  connectedCallback() {
    this.updateTooltip()
    this.updateIcon()
    this.updateLabel()

    this.querySelector('button').addEventListener('click', () => {
      this.querySelector('.users').classList.toggle('show')
      this.querySelector('nn-icono').classList.toggle('up')
    })
  }

  static get observedAttributes() {
    return data.attrs.map(e => e.name)
  }

  attributeChangedCallback(prop) {
    switch (prop) {
      case 'icono':
        this.updateIcon()
        break
      case 'label':
        this.updateLabel()
        break
    }
  }
}

customElements.define(getPrefix('users'), Users)
