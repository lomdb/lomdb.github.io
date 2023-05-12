export default {

  install: `import "nano-grid/components";`,
  installCss: ` // --- All color related variables
@import "nano-grid/scss/css-vars";

// --- Components
@import "nano-grid/scss/box";
@import "nano-grid/scss/btn";
@import "nano-grid/scss/container";
@import "nano-grid/scss/crayon";
@import "nano-grid/scss/grid-system";
@import "nano-grid/scss/icon";
@import "nano-grid/scss/input";
@import "nano-grid/scss/label";
@import "nano-grid/scss/range-slider";
@import "nano-grid/scss/scroll-area";
@import "nano-grid/scss/shade";

// ---- Button Styles
@import "nano-grid/scss/btn-flat";
@import "nano-grid/scss/btn-ghost";
@import "nano-grid/scss/btn-outline";
@import "nano-grid/scss/btn-nav";
`,
installCssAlt: `@import "nano-grid/scss/nano-grid";

// ---- Optional Button Styles (Flat Buttons are already included on nano-grid.scss)
@import "nano-grid/scss/btn-ghost";
@import "nano-grid/scss/btn-outline";
@import "nano-grid/scss/btn-nav";
`,
  example: `<nn-row breakpoint="lg">
  <nn-column size="75">
    <span class="nn-label nn-burn-orange">75px</span>
  </nn-column>
  <nn-column size="50%">
    <span class="nn-label">50%</span>
  </nn-column>
  <nn-column size="1/2 - 80 * 2">
    <span class="nn-label nn-burn-orange">calc(50% - 160px)</span>
  </nn-column>
  <nn-column size="85">
    <span class="nn-label">85px</span>
  </nn-column>
</nn-row>`,
}