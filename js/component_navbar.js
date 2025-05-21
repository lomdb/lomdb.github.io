import './modules/index.js'
import { getPrefix } from './helpers.js'
import { t } from './translations.js'
import { locale, currentRoute } from './params.js'
import './modules/nano_dropdown.js'
class Navbar extends HTMLElement {
  #template = `
<nav>
  <div class="mobile-controls">
    <button type="button" class="toggle" tabindex="0">
      <nn-icono class="bars"></nn-icono>
    </button>
    <button type="button" class="close-menu">
      <nn-icono class="times"></nn-icono>
    </button>
  </div>
  <ul>
    <li>
      <a href="index.html?lang=${locale}">${t('Home')}</a>
    </li>
    <li>
      <a href="timeline.html?lang=${locale}">${t('Timeline')}</a>
    </li>
    <li>
      <a href="3d-chart.html?lang=${locale}">${t('3D Chart')}</a>
    </li>
    <li>
      <a href="players.html?lang=${locale}">${t('Players')}</a>
    </li>
    <li>
      <a href="merges.html?lang=${locale}">${t('Merges')}</a>
    </li>
    <li>
      <nn-dropdown label="${t('Tools')}">
        <a href="gaps.html?lang=${locale}">${t("Merge's Gaps")}</a>
        <a href="state.html?lang=${locale}">${t('DB State')}</a>
        <a href="normalizer.html?lang=${locale}">${t('Normalizer')}</a>
      </nn-dropdown>
    </li>
    <li>
      <nn-dropdown icon="globe">
        <a href="?lang=de">Deutsch</a>
        <a href="?lang=en">English</a>
        <a href="?lang=es">Español</a>
        <a href="?lang=fr">Français</a>
        <a href="?lang=pt">Português</a>
      </nn-dropdown>
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

  #data = {
    theme: 'dark',
    currentRoute,
    locale,
  }

  // setTheme(theme) {
  //   const localTheme = theme || this.#data.theme
  //   localStorage.setItem('theme', localTheme)
  //   document.body.classList.remove('dark', 'light')
  //   document.body.classList.add(localTheme)
  // }

  #setActiveLinks() {
    const activeLink = this.querySelector(`a[href^="${this.#data.currentRoute}"]`)
    const activeLang = this.querySelector(`a[href="?lang=${this.#data.locale}"]`)
    activeLink?.classList.add('active')
    activeLang?.classList.add('active')
  }

  connectedCallback() {
    this.innerHTML = this.#template
    const localTheme = localStorage.getItem('theme') || this.#data.theme
    this.#data.theme = localTheme

    const toggleBtn = this.querySelector('.toggle')
    const closeBtn = this.querySelector('.close-menu')

    toggleBtn.addEventListener('click', () => {
      this.classList.toggle('open')
    })

    closeBtn.addEventListener('click', () => {
      this.classList.remove('open')
    })

    this.#setActiveLinks()
    // this.setTheme()

    // this.querySelector('#theme').checked = localTheme === 'dark' ? true : false

    // this.querySelector('#theme').addEventListener('change', e => {
    //   e.target.checked ? this.setTheme('dark') : this.setTheme('light')
    // })
  }
}

customElements.define(getPrefix('navbar'), Navbar)
