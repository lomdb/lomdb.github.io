<template>
  <nn-scroll-area color="royal-purple">
    <nn-container>
      <header>
        <h1>Grid System</h1>
      </header>

      <div class="nn-box">
        <h2>Available Relative Sizes ({{ cssWidthClasses.length }})</h2>
        <div role="table">
          <div class="table-head" role="rowgroup">
            <nn-row table-element breakpoint="lg">
              <nn-column table-element size="1/3">
                <span class="nn-label nn-charcoal">Size</span>
              </nn-column>
              <nn-column table-element size="1/3">
                <span class="nn-label nn-charcoal">Percent (Aprox)</span>
              </nn-column>
              <nn-column table-element size="1/3">
                <span class="nn-label nn-charcoal">Preview</span>
              </nn-column>
            </nn-row>
          </div>
          <div class="table-body" role="rowgroup">
            <template
              v-for="(size, sizeIndex) in cssWidthClasses"
              :key="'sizeIndex' + sizeIndex"
            >
              <nn-row table-element breakpoint="lg">
                <nn-column table-element size="1/3">
                  <span class="nn-label">
                    {{ size }}
                  </span>
                </nn-column>
                <nn-column table-element size="1/3">
                  <span class="nn-label">
                    {{ class2Value(size) }}
                  </span>
                </nn-column>
                <nn-column table-element size="1/3">
                  <nn-row class="demo-row">
                    <nn-column :size="size">
                      <span class="nn-label nn-royal-purple" />
                    </nn-column>
                  </nn-row>
                </nn-column>
              </nn-row>
            </template>
          </div>
        </div>
      </div>

      <div class="nn-box">
        <h2>Available Absolute Sizes (61)</h2>
        <p>
          Values between 0 and 300 that return an integer when divided by 5.
        </p>
      </div>

      <div class="nn-box">
        <h2>Available Classes ({{ cssWClass.size }})</h2>
        <div role="table">
          <div class="table-head" role="rowgroup">
            <nn-row breakpoint="lg">
              <nn-column size="1/4">
                <span class="nn-label nn-charcoal">Class</span>
              </nn-column>
              <nn-column size="1/4">
                <span class="nn-label nn-charcoal">Formula</span>
              </nn-column>
              <nn-column size="1/4">
                <span class="nn-label nn-charcoal">Value</span>
              </nn-column>
              <nn-column size="1/4">
                <span class="nn-label nn-charcoal">Preview</span>
              </nn-column>
            </nn-row>
          </div>
          <div class="table-body" role="rowgroup">
            <template
              v-for="(klass, klassIndex) in availableClasses"
              :key="'klassIndex' + klassIndex"
            >
              <nn-row breakpoint="lg">
                <nn-column size="1/4">
                  <span class="nn-label">
                    {{ klass }}
                  </span>
                </nn-column>
                <nn-column size="1/4">
                  <span class="nn-label">
                    {{ class2Formula(klass) }}
                    <template
                      v-if="class2Formula(klass) !== class2Formula2(klass)"
                    >
                      &nbsp;||&nbsp; {{ class2Formula2(klass) }}
                    </template>
                  </span>
                </nn-column>
                <nn-column size="1/4">
                  <span class="nn-label">
                    {{ class2Value(klass) }}
                  </span>
                </nn-column>
                <nn-column size="1/4">
                  <nn-row class="demo-row">
                    <nn-column :size="class2Formula(klass)">
                      <span class="nn-label nn-blush" />
                    </nn-column>
                  </nn-row>
                </nn-column>
              </nn-row>
            </template>
            <nn-row breakpoint="lg">
              <template v-if="!allRowsVisible">
                <nn-column size="1/3">
                  <nn-btn
                    text="Show 50+ Rows"
                    title="Show More Rows"
                    @click="showMoreRows()"
                    color="shamrock"
                  />
                </nn-column>
                <nn-column size="1/3">
                  <nn-btn
                    text="Show All Rows"
                    @click="showAllRows()"
                    color="gold-tips"
                  />
                </nn-column>
                <nn-column size="1/3">
                  <span class="nn-label">
                    {{
                      "( " +
                      availableClassesLimit +
                      " of " +
                      cssWClass.size +
                      " )"
                    }}
                  </span>
                </nn-column>
              </template>
              <template v-else>
                <nn-column size="1/1">
                  <span class="nn-label">
                    {{
                      "( " +
                      availableClassesLimit +
                      " of " +
                      cssWClass.size +
                      " )"
                    }}
                  </span>
                </nn-column>
              </template>
            </nn-row>
          </div>
        </div>
      </div>

      <nano-footer />
    </nn-container>
  </nn-scroll-area>
</template>

<script>
import { cssWClass, cssWidthClasses } from "nano-grid/modules/columns-manager";
import nanoFooter from "../components/footer.vue";

export default {
  components: { nanoFooter },
  data: () => ({
    cssWClass,
    cssWidthClasses,
    availableClassesLimit: 25,
  }),
  computed: {
    availableClasses() {
      return [...cssWClass].filter(
        (item, index) => index < this.availableClassesLimit
      );
    },
    allRowsVisible() {
      return this.availableClassesLimit === cssWClass.size;
    },
  },
  created() {},
  methods: {
    showMoreRows() {
      this.availableClassesLimit += 50;
      let outOfRange = this.availableClassesLimit > cssWClass.size;
      if (outOfRange) {
        this.availableClassesLimit = cssWClass.size;
      }
    },
    showAllRows() {
      this.availableClassesLimit = cssWClass.size;
    },
    class2Formula(klass) {
      return klass
        .replace("nn-w", "")
        .replace("-n", "")
        .replace("d", "/")
        .replace(/-?m/, "-")
        .replace(/-?p/, "+")
        .replace(/^\+/, "");
    },
    class2Formula2(klass) {
      const pre = this.class2Formula(klass);

      let fraction = /\d+\/\d+/.test(pre)
        ? pre.match(/\d+\/\d+/)[0].split("/")
        : null;
      const numerator = fraction ? +fraction[0] : null;
      const denominator = fraction ? +fraction[1] : null;

      if (fraction) {
        const isPercent = ((numerator / denominator) * 100) % 1 === 0;
        if (isPercent) {
          fraction = `${(numerator / denominator) * 100}%`;
        } else {
          fraction = fraction.join("/");
        }
      }

      return pre.replace(/\d+\/\d+/, fraction);
    },
    class2Value(klass) {
      const pre = this.class2Formula(klass);

      let fraction = /\d+\/\d+/.test(pre)
        ? pre.match(/\d+\/\d+/)[0].split("/")
        : null;
      const numerator = fraction ? +fraction[0] : null;
      const denominator = fraction ? +fraction[1] : null;

      if (fraction) {
        const isPercent = ((numerator / denominator) * 100) % 1 === 0;
        if (isPercent) {
          fraction = `${(numerator / denominator) * 100}%`;
        } else {
          fraction = `${((numerator / denominator) * 100).toFixed(2)}%`;
        }
      }

      let absolute = /[+-]\d+/.test(pre)
        ? pre.match(/[+-]\d+/)[0] + "px"
        : null;
      let absoluteSingle = /^\d+$/.test(pre)
        ? pre.match(/^\d+$/)[0] + "px"
        : null;

      return pre
        .replace(/\d+\/\d+/, fraction)
        .replace(/[+-]\d+/, absolute)
        .replace(/^\d+$/, absoluteSingle);
    },
  },
};
</script>