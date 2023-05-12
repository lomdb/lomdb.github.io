export default {
  js: `import { getVals } from "nano-grid/modules/columns-manager";

export default {
  props: {
    tag: {
      type: String,
      default: "div",
    },
    size: {
      type: String,
      default: "",
    },
    tableElement: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass() {
      return this.size ? getVals(this.size).class : "";
    },
    computedStyle() {
      return this.size ? getVals(this.size).style : "";
    },
    role() {
      if (this.tableElement) {
        return "cell";
      } else {
        return "";
      }
    },
  },
}`,
  html: `<template>
  <component :is="tag" :class="computedClass" :role="role" :style="computedStyle">
    <template>
      <slot />
    </template>
  </component>
</template>`,
  install: `import Column from '../components/column.vue';
import Row from '../components/row.vue';

app.component("nn-column", Column);
app.component("nn-row", Row);`,
  example: `<nn-row>
  <nn-column size="3/4">
    75%
  </nn-column>
  <nn-column size="1/4">
    25%
  </nn-column>
</nn-row>`,
}