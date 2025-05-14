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
      <a href="players.html">Players</a>
    </li>
    <li>
      <a href="merges.html">Merges</a>
    </li>
    <li>
      <a href="gaps.html" class="disabled">Merge's Gaps</a>
    </li>
  </ul>
</nav>
`

/* <li>
  <input type="checkbox" id="theme">
</li> */

  constructor() {
    super()
  }

  static data = {
    theme: 'dark',
  }

  // setTheme(theme) {
  //   const localTheme = theme || Navbar.data.theme
  //   localStorage.setItem('theme', localTheme)
  //   document.body.classList.remove('dark', 'light')
  //   document.body.classList.add(localTheme)
  // }

  connectedCallback() {
    this.innerHTML = Navbar.template
    const localTheme = localStorage.getItem('theme') || Navbar.data.theme
    Navbar.data.theme = localTheme
    // this.setTheme()

    // this.querySelector('#theme').checked = localTheme === 'dark' ? true : false

    // this.querySelector('#theme').addEventListener('change', e => {
    //   e.target.checked ? this.setTheme('dark') : this.setTheme('light')
    // })
  }
}

window.customElements.define(getPrefix('navbar'), Navbar)

export { Navbar }
