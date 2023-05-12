export default {
  js: `import { getVals } from "nano-grid/modules/columns-manager";

export let size = undefined;

$: computedClass = size ? getVals(size).class : undefined;
$: computedStyle = size ? getVals(size).style : undefined;`,
  html: `<template>
  <div class={'nn-column ' + computedClass} style={computedStyle}>
    <slot />
  </div>
</template>`,
  rowJs: `import { validateSpacing } from "nano-grid/modules/columns-manager";

export let breakpoint = undefined,
  group = false,
  spacing = undefined,
  integrated = false,
  vertical = false,
  tableElement = false,
  grid = false,
  className = "";
$: computedSpacing = spacing ? validateSpacing(spacing) : "";
$: computedTable = tableElement ? "row" : undefined;
$: computedGroup = group ? "nano-group" : "";
$: computedIntegrated = integrated ? "integrated" : "";
$: computedVertical = vertical ? "vertical" : "";
$: computedGrid = grid ? "grid" : "";
$: computedBreakpoint = breakpoint ? "nn-" + breakpoint : "";
$: computedClasses = [
  "nn-row",
  computedBreakpoint,
  computedGroup,
  computedIntegrated,
  computedVertical,
  computedGrid,
  computedSpacing,
  className,
]
  .join(" ")
  .replace(/\s+/g, " ")
  .trim();
`,
  rowHtml: `<template>
  <div class={computedClasses} role={computedTable}>
    <slot />
  </div>
</template>`,
  install: `import Column from "../components/Column.svelte";
import Row from "../components/Row.svelte";`,
  example: `<Row>
  <Column size="3/4">
    75%
  </Column>
  <Column size="1/4">
    25%
  </Column>
</Row>`,
}