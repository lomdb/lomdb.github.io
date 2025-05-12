import './modules/index.js'
import { getPrefix } from './helpers.js'

class Navbar extends HTMLElement {
  static template = `
<nav>
  <ul>
    <li>
      <a href="index.html">Home</a>
    </li>
    <li>
      <a href="timeline.html">Timeline</a>
    </li>
    <li>
      <a href="merges.html">Merges</a>
    </li>
    <li>
      <a href="gaps.html">Merge's Gap</a>
    </li>
    <li>
      <a href="players.html">Players</a>
    </li>
    <li>
      <input type="checkbox" id="theme">
    </li>
  </ul>
</nav>
`

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = Navbar.template
  }
}

window.customElements.define(getPrefix('navbar'), Navbar)

export { Navbar }
