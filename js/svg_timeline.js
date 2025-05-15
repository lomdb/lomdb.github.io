import { getPrefix } from './helpers.js'

class Merges extends HTMLElement {
  constructor() {
    super()
    this.#shadow = this.attachShadow({ mode: 'closed' })
    this.#shadow.innerHTML = this.#data.styles + this.#data.template
  }

  #shadow
  #data = {
    styles: `
<style>
  .linea {
    fill: #e38d81;
    stroke-width: 2.17898;
    animation: shake 1s ease-in-out alternate infinite;
  }

  @keyframes shake {
    from {
      rotate: 0deg;
    }

    to {
      rotate: 3deg;
    }
  }
</style>
    `,
    template: `
<svg width="320" height="280" viewBox="0 0 84.667 74.083">
<title>Servers' Merge Timeline Animation</title>
<desc>Path representing the merge transitions between servers</desc>
<g>
<rect x="2.7078" y="16.307" width="78.599" height="43.812" ry="4.3501" fill="#a1d6ff" fill-opacity=".33333" stroke-width="5.4285"/>
<rect x="7.106" y="20.762" width="69.802" height="34.902" ry="3.6086" fill="#feffe1" stroke-width="4.5031"/>
<path class="linea" d="m67.388 10.764a1.0896 1.0896 0 0 0-0.632 0.23151l-15.224 11.946a1.0896 1.0896 0 0 0 0.26613 1.8681l5.5428 2.2257-6.3174 9.0666-12.625-2.5663a2.1734 2.1734 0 0 0-2.4138 1.2382l-5.8885 13.082-13.316-0.6289a2.1734 2.1734 0 0 0-2.2479 1.8164l-1.9554 11.83a2.1732 2.1732 0 0 0 1.789 2.498 2.1732 2.1732 0 0 0 2.5001-1.789l1.6387-9.9219 12.863 0.6072a2.1734 2.1734 0 0 0 2.0862-1.279l5.781-12.848 12.322 2.5058a2.1734 2.1734 0 0 0 2.2169-0.88677l7.7065-11.062 8.2755 3.3238a1.0896 1.0896 0 0 0 1.4841-1.1653l-1.3663-9.5787-1.3668-9.5782a1.0896 1.0896 0 0 0-0.67231-0.8568 1.0896 1.0896 0 0 0-0.44648-0.07803z"/>
</g>
</svg>
    `,
  }
}

customElements.define(getPrefix('svg-timeline'), Merges)
