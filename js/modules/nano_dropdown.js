import { getPrefix } from './nano_helpers.js'

customElements.define(
  getPrefix('dropdown'),
  class extends HTMLElement {
    constructor() {
      super()
      this.open = false
      this.toggle = this.toggle.bind(this)
      this.handleOutsideClick = this.handleOutsideClick.bind(this)
    }

    #data = {
      attrs: [
        {
          name: 'label',
          value: undefined,
        },
        {
          name: 'icon',
          value: undefined,
        },
      ],
    }

    connectedCallback() {
      this.slot = this.innerHTML
      this.innerHTML = `
      <button type="button" class="dropdown-trigger"></button>
      <div class="dropdown-content">${this.slot}</div>
    `
      this.querySelector('.dropdown-trigger')?.addEventListener(
        'click',
        this.toggle
      )
      document.addEventListener('click', this.handleOutsideClick)

      this.#updateLabel()
      this.#updateIcon()
    }

    disconnectedCallback() {
      document.removeEventListener('click', this.handleOutsideClick)
    }

    toggle(e) {
      e.stopPropagation()
      this.open = !this.open
      this.classList.toggle('open', this.open)
    }

    handleOutsideClick(e) {
      if (!this.contains(e.target)) {
        this.open = false
        this.classList.remove('open')
      }
    }

    #updateLabel() {
      const label = this.getAttribute('label')
      if (label) {
        const btnTrigger = this.querySelector('.dropdown-trigger')
        btnTrigger.innerHTML = `${label} ▼`
      }
    }

    #updateIcon() {
      const icon = this.getAttribute('icon')
      if (icon) {
        const btnTrigger = this.querySelector('.dropdown-trigger')
        btnTrigger.innerHTML = `<nn-icono class="${icon}"><nn-icono> ▼`
      }
    }
  }
)
