<template>
  <nn-scroll-area color="royal-purple">
    <nn-container>
      <header>
        <h1>Installation</h1>
      </header>
      <div class="nn-box">
        <div class="nn-shade">
          <h2>-- Adding Nano Grid</h2>
          <nn-row breakpoint="lg">
            <nn-column size="100%-100*3">
              <div class="nn-label nn-input-color">
                <template v-if="pmanager === 'yarn'">
                  yarn add nano-grid
                </template>
                <template v-else-if="pmanager === 'npm'">
                  npm install nano-grid
                </template>
                <template v-else-if="pmanager === 'clone'">
                  git clone https://github.com/nano-grid/nano-grid.git
                </template>
              </div>
            </nn-column>
            <nn-column size="100">
              <nn-btn
                mode="flat"
                text="Yarn"
                :color="pmanager === 'yarn' ? 'denim' : 'charcoal'"
                @click="togglePackageManager('yarn')"
              />
            </nn-column>
            <nn-column size="100">
              <nn-btn
                mode="flat"
                text="NPM"
                :color="pmanager === 'npm' ? 'persian-red' : 'charcoal'"
                @click="togglePackageManager('npm')"
              />
            </nn-column>
            <nn-column size="100">
              <nn-btn
                mode="flat"
                text="Clone"
                :color="pmanager === 'clone' ? 'royal-purple' : 'charcoal'"
                @click="togglePackageManager('clone')"
              />
            </nn-column>
          </nn-row>
        </div>

        <br />

        <div class="nn-shade">
          <h2>-- Registering components</h2>
          <p>In your
            <nn-crayon tag="strong" color="burn-orange">Javascript</nn-crayon>
          </p>
          <spirit lang="js" :text="spirit.webComponent.install" />

          <p>
            In your
            <nn-crayon tag="strong" color="blush">Sass</nn-crayon>
          </p>
          <spirit lang="css" :text="spirit.webComponent.installCssAlt" />

          <p>You can also choose to import only specific modules</p>
          <spirit lang="css" :text="spirit.webComponent.installCss" />

          <h2>-- Test the following structure in your project</h2>
          <spirit lang="html" :text="spirit.webComponent.example" />

          <h2>-- Preview</h2>
          <div v-html="spirit.webComponent.example"/>
        </div>

        <br />

        <h2>Building your own grid components</h2>

        <nn-row breakpoint="lg" grid>
          <nn-column size="1/4">
            <nn-btn
              mode="flat"
              text="Vue 2"
              :color="spirit.current === 'vue2' ? 'shamrock' : 'charcoal'"
              @click="changeCode('vue2')"
            />
          </nn-column>
          <nn-column size="1/4">
            <nn-btn
              mode="flat"
              text="Vue 3"
              :color="spirit.current === 'vue3' ? 'elf-green' : 'charcoal'"
              @click="changeCode('vue3')"
            />
          </nn-column>
          <nn-column size="1/4">
            <nn-btn
              mode="flat"
              text="Svelte 3"
              :color="spirit.current === 'svelte3' ? 'burn-orange' : 'charcoal'"
              @click="changeCode('svelte3')"
            />
          </nn-column>
          <nn-column size="1/4">
            <nn-btn
              mode="flat"
              text="React 17"
              :color="spirit.current === 'react17' ? 'cobalt-blue' : 'charcoal'"
              @click="changeCode('react17')"
            />
          </nn-column>
        </nn-row>

        <div class="nn-shade">
          <h2>-- Column Component</h2>

          <template v-if="spirit.current === 'vue2'">
            <p>JS Code</p>
            <spirit lang="js" :text="spirit.vue2.js" />
            <p>HTML Code</p>
            <spirit lang="vue" :text="spirit.vue2.html" />
            <h2>-- Registering components</h2>
            <spirit lang="js" :text="spirit.vue2.install" />
            <h2>-- Using components</h2>
            <spirit lang="html" :text="spirit.vue2.example" />
          </template>

          <template v-if="spirit.current === 'vue3'">
            <p>JS Code</p>
            <spirit lang="js" :text="spirit.vue3.js" />
            <p>HTML Code</p>
            <spirit lang="vue" :text="spirit.vue3.html" />
            <h2>-- Registering components</h2>
            <spirit lang="js" :text="spirit.vue3.install" />
            <h2>-- Using components</h2>
            <spirit lang="html" :text="spirit.vue3.example" />
          </template>

          <template v-else-if="spirit.current === 'svelte3'">
            <p>JS Code</p>
            <spirit lang="js" :text="spirit.svelte3.js" />
            <p>HTML Code</p>
            <spirit lang="svelte" :text="spirit.svelte3.html" />
            <h2>-- Row Component</h2>
            <p>JS Code</p>
            <spirit lang="js" :text="spirit.svelte3.rowJs" />
            <p>HTML Code</p>
            <spirit lang="svelte" :text="spirit.svelte3.rowHtml" />
            <h2>-- Registering components</h2>
            <spirit lang="js" :text="spirit.svelte3.install" />
            <h2>-- Using components</h2>
            <spirit lang="html" :text="spirit.svelte3.example" />
          </template>

          <template v-else-if="spirit.current === 'react17'">
            <p>JS Code</p>
            <spirit lang="react" :text="spirit.react17.js" />
            <h2>-- Row Component</h2>
            <p>JS Code</p>
            <spirit lang="react" :text="spirit.react17.rowJs" />
            <h2>-- Registering components</h2>
            <spirit lang="js" :text="spirit.react17.install" />
            <h2>-- Using components</h2>
            <spirit lang="html" :text="spirit.react17.example" />
          </template>
        </div>
      </div>

      <nano-footer />
    </nn-container>
  </nn-scroll-area>
</template>

<script>
import Spirit from "../components/spirit.vue";
import svelte3 from "../db/code-svelte3";
import react17 from "../db/code-react17";
import vue3 from "../db/code-vue3";
import vue2 from "../db/code-vue2";
import webComponent from "../db/code-webcomponent";
import nanoFooter from "../components/footer.vue";

export default {
  components: { Spirit, nanoFooter },
  data: () => ({
    pmanager: "yarn",
    spirit: {
      current: "vue2",
      vue2,
      vue3,
      svelte3,
      webComponent,
      react17,
    },
  }),
  methods: {
    changeCode(code) {
      this.spirit.current = code;
    },
    togglePackageManager(value) {
      this.pmanager = value;
    },
  },
};
</script>