import { getPrefix } from './helpers.js'
import './modules/index.js'
import './svg_angel.js'
import './svg_merges.js'
import './svg_timeline.js'
import './svg_state.js'
import './component_navbar.js'
import './component_footer.js'
import { t } from './translations.js'
import { locale } from './params.js'

class Home extends HTMLElement {
  constructor() {
    super()
  }

  #data = {
    template: `
    <div class="nav-controls">
      <lom-navbar></lom-navbar>
    </div>

    <header>
      <img
        src="./img/lomdb.svg"
        alt="lomdb logo"
      />
    </header>

    <main>
      <section>
        <nn-caja
          max-width="1000px"
          padding="1rem"
        >
          <nn-fila
            break="md"
            class="ltr"
          >
            <nn-pilar size="30%">
              <lom-svg-timeline>
              </lom-svg-timeline>
            </nn-pilar>
            <nn-pilar size="70%">
              <h2>${t('Timeline')}</h2>
              <p>${t('timelineDescription')}</p>
              <div>
                <a
                  href="timeline.html?lang=${locale}"
                  class="btn sunglow"
                  >${t('Check Timeline')}</a
                >
              </div>
            </nn-pilar>
          </nn-fila>
        </nn-caja>
      </section>

      <section>
        <nn-caja
          max-width="1000px"
          padding="1rem"
        >
          <nn-fila
            break="md"
            class="rtl"
          >
            <nn-pilar size="30%">
              <img
                src="./img/players.svg"
                alt="3 mushroms posing for a picture"
              />
            </nn-pilar>
            <nn-pilar size="70%">
              <h2>${t('Players Leaderboard')}</h2>
              <p>${t('leaderboardDescription')}</p>
              <div>
                <a
                  href="players.html?lang=${locale}"
                  class="btn sunglow"
                  >${t('Check Players Board')}</a
                >
              </div>
            </nn-pilar>
          </nn-fila>
        </nn-caja>
      </section>

      <section>
        <nn-caja
          max-width="1000px"
          padding="1rem"
        >
          <nn-fila
            break="md"
            class="ltr"
          >
            <nn-pilar size="30%">
              <lom-svg-merges></lom-svg-merges>
            </nn-pilar>
            <nn-pilar size="70%">
              <h2>${t('Merges')}</h2>
              <p>${t('mergesDescription')}</p>
              <div>
                <a
                  href="merges.html?lang=${locale}"
                  class="btn sunglow"
                  >${t('Check Merges')}</a
                >
              </div>
            </nn-pilar>
          </nn-fila>
        </nn-caja>
      </section>

      <section>
        <nn-caja
          max-width="1000px"
          padding="1rem"
        >
          <nn-fila
            break="md"
            class="rtl"
          >
            <nn-pilar size="30%">
              <img
                src="./img/gaps.svg"
                alt="a sequence of numbers missing number 5."
              />
            </nn-pilar>
            <nn-pilar size="70%">
              <h2>${t("Merge's Gaps")}</h2>
              <p>${t('gapDescription')}</p>
              <div>
                <a
                  href="gaps.html?lang=${locale}"
                  class="btn sunglow"
                  >${t("Check Merge's Gaps")}</a
                >
              </div>
            </nn-pilar>
          </nn-fila>
        </nn-caja>
      </section>

      <section>
        <nn-caja
          max-width="1000px"
          padding="1rem"
        >
          <nn-fila
            break="md"
            class="ltr"
          >
            <nn-pilar size="30%">
              <lom-svg-state></lom-svg-state>
            </nn-pilar>
            <nn-pilar size="70%">
              <h2>${t('DB State')}</h2>
              <p>${t('stateDescription')}</p>
              <div>
                <a
                  href="state.html?lang=${locale}"
                  class="btn sunglow"
                  >${t('Check The State')}</a
                >
              </div>
            </nn-pilar>
          </nn-fila>
        </nn-caja>
      </section>

      <section class="instructions">
        <blockquote>
          <lom-svg-angel class="angel angel-1"></lom-svg-angel>
          <lom-svg-angel class="angel angel-2"></lom-svg-angel>
          ${t('instructions')}
        </blockquote>
      </section>
    </main>

    <lom-footer></lom-footer>
  `,
  }

  connectedCallback() {
    this.innerHTML = this.#data.template
  }
}

customElements.define(getPrefix('home'), Home)
