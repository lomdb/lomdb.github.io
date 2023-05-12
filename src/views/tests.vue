<template>
  <nn-scroll-area color="royal-purple">
    <nn-container>
      <header>
        <h1>Tests</h1>
      </header>
      <div class="nn-box">
        <h2>getVals(formula: string): object</h2>
        <template v-for="(row, rowIndex) in cases" :key="'rowIndex' + rowIndex">
          <article class="nn-shade">
            <nn-row  breakpoint="lg">
              <nn-column size="100">
                <span class="nn-label nn-charcoal">Case</span>
              </nn-column>
              <nn-column size="60%">
                <span class="nn-label nn-mariner">{{ row.case }}</span>
              </nn-column>
              <nn-column size="40%-100">
                <span class="nn-label nn-cobalt-blue">{{ row.test }}</span>
              </nn-column>
            </nn-row>

            <br />

            <div role="table">
              <div class="table-head" role="rowgroup">
                <nn-row breakpoint="lg" table-element>
                  <nn-column table-element size="200">
                    <span class="nn-label nn-denim">Attribute</span>
                  </nn-column>

                  <nn-column table-element size="1/2-115">
                    <span class="nn-label nn-denim">Expected</span>
                  </nn-column>

                  <nn-column table-element size="1/2-120">
                    <span class="nn-label nn-denim">Returned</span>
                  </nn-column>
                  <nn-column table-element size="35">
                    <span class="nn-label nn-denim"></span>
                  </nn-column>
                </nn-row>
              </div>
              <div class="table-body" role="rowgroup">
                <nn-row breakpoint="lg" table-element>
                  <nn-column table-element size="200">
                    <span class="nn-label nn-gravel">Width Class</span>
                  </nn-column>
                  <nn-column table-element size="1/2-115">
                    <span class="nn-label">
                      {{ row.expect.width || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="1/2-120">
                    <span class="nn-label">
                      {{ getVals(row.test).width || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="35">
                    <template
                      v-if="
                        isPassing(row.expect.width, getVals(row.test).width)
                      "
                    >
                      <span class="nn-label nn-gold-tips">
                        <nn-icon glyph="star" />
                      </span>
                    </template>
                    <template v-else>
                      <span class="nn-label nn-persian-red">
                        <nn-icon glyph="times" />
                      </span>
                    </template>
                  </nn-column>
                </nn-row>

                <nn-row breakpoint="lg" table-element>
                  <nn-column table-element size="200">
                    <span class="nn-label nn-gravel">Width Style</span>
                  </nn-column>
                  <nn-column table-element size="1/2-115">
                    <span class="nn-label">
                      {{ row.expect.widthStyle || "undefined" }}
                    </span>
                  </nn-column>

                  <nn-column table-element size="1/2-120">
                    <span class="nn-label">
                      {{ getVals(row.test).widthStyle || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="35">
                    <template
                      v-if="
                        isPassing(
                          row.expect.widthStyle,
                          getVals(row.test).widthStyle
                        )
                      "
                    >
                      <span class="nn-label nn-gold-tips">
                        <nn-icon glyph="star" />
                      </span>
                    </template>
                    <template v-else>
                      <span class="nn-label nn-persian-red">
                        <nn-icon glyph="times" />
                      </span>
                    </template>
                  </nn-column>
                </nn-row>

                <nn-row breakpoint="lg" table-element>
                  <nn-column table-element size="200">
                    <span class="nn-label nn-gravel">Height Style</span>
                  </nn-column>
                  <nn-column table-element size="1/2-115">
                    <span class="nn-label">
                      {{ row.expect.heightStyle || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="1/2-120">
                    <span class="nn-label">
                      {{ getVals(row.test).heightStyle || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="35">
                    <template
                      v-if="
                        isPassing(
                          row.expect.heightStyle,
                          getVals(row.test).heightStyle
                        )
                      "
                    >
                      <span class="nn-label nn-gold-tips">
                        <nn-icon glyph="star" />
                      </span>
                    </template>
                    <template v-else>
                      <span class="nn-label nn-persian-red">
                        <nn-icon glyph="times" />
                      </span>
                    </template>
                  </nn-column>
                </nn-row>

                <nn-row breakpoint="lg" table-element>
                  <nn-column table-element size="200">
                    <span class="nn-label nn-gravel">Width Calculation</span>
                  </nn-column>
                  <nn-column table-element size="1/2-115">
                    <span class="nn-label">
                      {{ row.expect.widthCalc || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="1/2-120">
                    <span class="nn-label">
                      {{ getVals(row.test).widthCalc || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="35">
                    <template
                      v-if="
                        isPassing(
                          row.expect.widthCalc,
                          getVals(row.test).widthCalc
                        )
                      "
                    >
                      <span class="nn-label nn-gold-tips">
                        <nn-icon glyph="star" />
                      </span>
                    </template>
                    <template v-else>
                      <span class="nn-label nn-persian-red">
                        <nn-icon glyph="times" />
                      </span>
                    </template>
                  </nn-column>
                </nn-row>

                <nn-row breakpoint="lg" table-element>
                  <nn-column table-element size="200">
                    <span class="nn-label nn-gravel">Height Calculation</span>
                  </nn-column>
                  <nn-column table-element size="1/2-115">
                    <span class="nn-label">
                      {{ row.expect.heightCalc || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="1/2-120">
                    <span class="nn-label">
                      {{ getVals(row.test).heightCalc || "undefined" }}
                    </span>
                  </nn-column>
                  <nn-column table-element size="35">
                    <template
                      v-if="
                        isPassing(
                          row.expect.heightCalc,
                          getVals(row.test).heightCalc
                        )
                      "
                    >
                      <span class="nn-label nn-gold-tips">
                        <nn-icon glyph="star" />
                      </span>
                    </template>
                    <template v-else>
                      <span class="nn-label nn-persian-red">
                        <nn-icon glyph="times" />
                      </span>
                    </template>
                  </nn-column>
                </nn-row>
              </div>
            </div>
          </article>
          <br />
        </template>
      </div>

      <nano-footer />
    </nn-container>
  </nn-scroll-area>
</template>

<script>
import { getVals } from "nano-grid/modules/columns-manager";
import nanoFooter from "../components/footer.vue";

export default {
  components: { nanoFooter },
  data: () => ({
    getVals,
    cases: [
      {
        test: "50 + 25 - 10, 0",
        case: "testing zero as initial value (on height)",
        expect: {
          width: "nn-w-p65",
          widthStyle: undefined,
          heightStyle: "height: 0px",
          widthCalc: "65px",
          heightCalc: "0px",
        },
      },
      {
        test: "0, 50 + 25 - 10",
        case: "testing zero as initial value (on width)",
        expect: {
          width: "nn-w-m0",
          widthStyle: undefined,
          heightStyle: "height: 65px",
          widthCalc: "0px",
          heightCalc: "65px",
        },
      },
      {
        test: "11, 15",
        case: "testing a combination of valid css sizes and out of range values (styles)",
        expect: {
          width: undefined,
          widthStyle: "flex-basis: 11px; max-width: 11px",
          heightStyle: "height: 15px",
          widthCalc: "11px",
          heightCalc: "15px",
        },
      },
      {
        test: "-250",
        case: "testing negative absolute values",
        expect: {
          width: undefined,
          widthStyle: undefined,
          heightStyle: undefined,
          widthCalc: undefined,
          heightCalc: undefined,
        },
      },
      {
        test: "25%-250",
        case: "testing formula with negative absolute value",
        expect: {
          width: "nn-w-n1d4-m250",
          widthStyle: undefined,
          heightStyle: undefined,
          widthCalc: "calc(25% - 250px)",
          heightCalc: undefined,
        },
      },
      {
        test: "-10%",
        case: "testing negative relative values",
        expect: {
          width: undefined,
          widthStyle: undefined,
          heightStyle: undefined,
          widthCalc: undefined,
          heightCalc: undefined,
        },
      },
      {
        test: "25% - 25% + 1/4 + 100/400",
        case: "testing relative sizes operations",
        expect: {
          width: "nn-w-n1d2",
          widthStyle: undefined,
          heightStyle: undefined,
          widthCalc: "50%",
          heightCalc: undefined,
        },
      },
      {
        test: "500",
        case: "testing out of range width values",
        expect: {
          width: undefined,
          widthStyle: "flex-basis: 500px; max-width: 500px",
          heightStyle: undefined,
          widthCalc: "500px",
          heightCalc: undefined,
        },
      },
      {
        test: ",500",
        case: "testing out of range height values",
        expect: {
          width: undefined,
          widthStyle: undefined,
          heightStyle: "height: 500px",
          widthCalc: undefined,
          heightCalc: "500px",
        },
      },
      {
        test: "40% - 20% + 50 - 25, 50 - 25",
        case: "testing susbtraction on width and height",
        expect: {
          width: undefined,
          widthStyle:
            "flex-basis: calc(20% + 25px); max-width: calc(20% + 25px)",
          heightStyle: "height: 25px",
          widthCalc: "calc(20% + 25px)",
          heightCalc: "25px",
        },
      },
      {
        test: "40% - 22%",
        case: "testing relative sizes out of range",
        expect: {
          width: undefined,
          widthStyle: "flex-basis: 18%; max-width: 18%",
          heightStyle: undefined,
          widthCalc: "18%",
          heightCalc: undefined,
        },
      },
      {
        test: ", 15% + 25 * 2 - 10 + 100",
        case: "testing multiplication on height",
        expect: {
          width: undefined,
          widthStyle: undefined,
          heightStyle: "height: calc(15% + 140px)",
          widthCalc: undefined,
          heightCalc: "calc(15% + 140px)",
        },
      },
      {
        test: ", 15% - 25 * 2 - 10",
        case: "testing negative multiplications on height",
        expect: {
          width: undefined,
          widthStyle: undefined,
          heightStyle: "height: calc(15% - 60px)",
          widthCalc: undefined,
          heightCalc: "calc(15% - 60px)",
        },
      },
      {
        test: ", 13%",
        case: "testing height relative values out of range with no calculation",
        expect: {
          width: undefined,
          widthStyle: undefined,
          heightStyle: "height: 13%",
          widthCalc: undefined,
          heightCalc: "13%",
        },
      },
      {
        test: "15vw + 25 * 2",
        case: "testing vw width",
        expect: {
          width: undefined,
          widthStyle:
            "flex-basis: calc(15vw + 50px); max-width: calc(15vw + 50px)",
          heightStyle: undefined,
          widthCalc: "calc(15vw + 50px)",
          heightCalc: undefined,
        },
      },
      {
        test: ", 15vh + 25 * 2",
        case: "testing vh height",
        expect: {
          width: undefined,
          widthStyle: undefined,
          heightStyle: "height: calc(15vh + 50px)",
          widthCalc: undefined,
          heightCalc: "calc(15vh + 50px)",
        },
      },
    ],
  }),
  methods: {
    isPassing(a, b) {
      return a === b;
    },
  },
};
</script>