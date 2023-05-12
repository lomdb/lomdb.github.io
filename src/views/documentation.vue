<template>
  <nn-scroll-area color="royal-purple">
    <nn-container>
      <header>
        <h1>Dictionary</h1>
      </header>
      <div class="nn-box">
        <h2>Components</h2>

        <nn-row breakpoint="lg" grid>
          <template
            v-for="(item, itemIndex) in componentes"
            :key="'itemIndex' + itemIndex"
          >
            <nn-column size="1/4">
              <span class="nn-label">
                {{ item.key }}
              </span>
            </nn-column>
          </template>
        </nn-row>
      </div>

      <div class="nn-box">
        <h2>Row Settings</h2>
        <div class="table" role="table">
          <div class="table-head" role="rowgroup">
            <nn-row table-element breakpoint="lg">
              <nn-column table-element size="1/2">Keyword</nn-column>
              <nn-column table-element size="1/2">Description</nn-column>
            </nn-row>
          </div>
          <div class="table-body" role="rowgroup">
            <template
              v-for="(item, itemIndex) in rows"
              :key="'itemIndex' + itemIndex"
            >
              <nn-row table-element breakpoint="lg">
                <nn-column table-element size="1/2">
                  {{ item.key }}
                </nn-column>
                <nn-column table-element size="1/2">
                  {{ item.description }}
                </nn-column>
              </nn-row>
            </template>
          </div>
        </div>
      </div>

      <div class="nn-box">
        <h2>Column Settings</h2>
        <div class="table" role="table">
          <div class="table-head" role="rowgroup">
            <nn-row table-element breakpoint="lg">
              <nn-column table-element size="1/2">Keyword</nn-column>
              <nn-column table-element size="1/2">Description</nn-column>
            </nn-row>
          </div>
          <div class="table-body" role="rowgroup">
            <template
              v-for="(item, itemIndex) in columns"
              :key="'itemIndex' + itemIndex"
            >
              <nn-row table-element breakpoint="lg">
                <nn-column table-element size="1/2">
                  {{ item.key }}
                </nn-column>
                <nn-column table-element size="1/2">
                  <span v-html="item.description" />
                </nn-column>
              </nn-row>
            </template>
          </div>
        </div>
      </div>

      <div class="nn-box">
        <h2>Button Settings</h2>
        <div class="table" role="table">
          <div class="table-head" role="rowgroup">
            <nn-row table-element breakpoint="lg">
              <nn-column table-element size="1/2">Keyword</nn-column>
              <nn-column table-element size="1/2">Description</nn-column>
            </nn-row>
          </div>
          <div class="table-body" role="rowgroup">
            <template
              v-for="(item, itemIndex) in buttons"
              :key="'itemIndex' + itemIndex"
            >
              <nn-row table-element breakpoint="lg">
                <nn-column table-element size="1/2">
                  {{ item.key }}
                </nn-column>
                <nn-column table-element size="1/2">
                  {{ item.description }}
                </nn-column>
              </nn-row>
            </template>
          </div>
        </div>
      </div>

      <div class="nn-box">
        <h2>Scroll Area Settings</h2>
        <div class="table" role="table">
          <div class="table-head" role="rowgroup">
            <nn-row table-element breakpoint="lg">
              <nn-column table-element size="1/2">Keyword</nn-column>
              <nn-column table-element size="1/2">Description</nn-column>
            </nn-row>
          </div>
          <div class="table-body" role="rowgroup">
            <template
              v-for="(item, itemIndex) in scrollarea"
              :key="'itemIndex' + itemIndex"
            >
              <nn-row table-element breakpoint="lg">
                <nn-column table-element size="1/2">
                  {{ item.key }}
                </nn-column>
                <nn-column table-element size="1/2">
                  {{ item.description }}
                </nn-column>
              </nn-row>
            </template>
          </div>
        </div>
      </div>

      <div class="nn-box">
        <h2>Container Settings</h2>
        <div class="table" role="table">
          <div class="table-head" role="rowgroup">
            <nn-row table-element breakpoint="lg">
              <nn-column table-element size="1/2">Keyword</nn-column>
              <nn-column table-element size="1/2">Description</nn-column>
            </nn-row>
          </div>
          <div class="table-body" role="rowgroup">
            <template
              v-for="(item, itemIndex) in containers"
              :key="'itemIndex' + itemIndex"
            >
              <nn-row table-element breakpoint="lg">
                <nn-column table-element size="1/2">
                  {{ item.key }}
                </nn-column>
                <nn-column table-element size="1/2">
                  {{ item.description }}
                </nn-column>
              </nn-row>
            </template>
          </div>
        </div>
      </div>

      <div class="nn-box">
        <h2>Colors</h2>

        <nn-row breakpoint="lg" grid>
          <template
            v-for="(item, itemIndex) in colors"
            :key="'itemIndex' + itemIndex"
          >
            <nn-column size="1/4">
              <span :class="['nn-label', item]">
                {{ item }}
              </span>
            </nn-column>
          </template>
        </nn-row>

        <br />

        <div class="nn-shade">
          <p><em>And an extra color just for the label component</em></p>

          <nn-row breakpoint="lg">
            <nn-column size="1/4">
              <span class="nn-label nn-input-color"> nn-input-color </span>
            </nn-column>
          </nn-row>
        </div>
      </div>

      <nano-footer />
    </nn-container>
  </nn-scroll-area>
</template>

<script>
import nanoFooter from "../components/footer.vue";
import * as installation from "../db/installation";

export default {
  components: { nanoFooter },
  data: () => ({
    containers: installation.containers,
    columns: installation.columns,
    rows: installation.rows,
    buttons: installation.buttons,
    scrollarea: installation.scrollarea,
    colors: installation.colors,
    componentes: installation.componentes,
  }),
  computed: {},
  created() {},
  methods: {},
};
</script>