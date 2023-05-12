export const containers = [
  {
    key: "nn-sz<400, 500, 600, 900, 1450>",
    description:
      "Change the max-size of the container.",
  },
];

export const columns = [
  {
    key: "nn-[w|h]-n<numbers>d<numbers>[m|p]<0..300>",
    description: "Change the size of the column.<br/>w = <strong>width</strong>, h = <strong>height</strong>, n = <strong>numerator</strong>, d = <strong>denominator</strong>, m = <strong>minus</strong>, p = <strong>plus</strong>",
  },
];

export const rows = [
  {
    key: "nn-grid",
    description:
      "Organize the columns as tiles.",
  },
  {
    key: "nn-sp<25..400>",
    description:
      "Add padding-inline to the columns from 0.25rem to 4rem",
  },
  { key: "nn-break-sm", description: "Row prop that break on 576px." },
  { key: "nn-break-md", description: "Row prop that break on 768px." },
  { key: "nn-break-lg", description: "Row prop that break on 992px." },
  { key: "nn-break-xl", description: "Row prop that break on 1200px." },
  { key: "nn-break-xxl", description: "Row prop that break on 1400px." },
];

export const buttons = [
  {
    key: "nn-flat",
    description: "Change the visual to a 3D flat style.",
  },
  {
    key: "nn-round",
    description: "Change the visual to a rounded style.",
  },
  {
    key: "nn-ghost",
    description: "Change the visual to a ghost style.",
  },
  {
    key: "nn-outline",
    description: "Change the visual to a outline style.",
  },
  {
    key: "nn-nav",
    description:
      "Change the visual to a ghost style with a left border line when active.",
  },
];

export const scrollarea = [
  {
    key: "nn-no-vertical",
    description: "Hide vertical scroll bar.",
  },
  {
    key: "nn-no-horizontal",
    description: "Hide horizontal scroll bar.",
  },
];

export const colors = [
  "nn-shamrock",
  "nn-emerald",
  "nn-laurel",
  "nn-green-pea",
  "nn-elf-green",
  "nn-lake",
  "nn-mariner",
  "nn-denim",
  "nn-cobalt-blue",
  "nn-royal-purple",
  "nn-purple-heart",
  "nn-blue-violet",
  "nn-fuchsia",
  "nn-razzmatazz",
  "nn-alizarin",
  "nn-fire-brick",
  "nn-persian-red",
  "nn-blush",
  "nn-desert",
  "nn-rust",
  "nn-sepia",
  "nn-golden-brown",
  "nn-yukon-gold",
  "nn-burn-orange",
  "nn-sunglow",
  "nn-gold-tips",
  "nn-milk-punch",
  "nn-white",
  "nn-silver",
  "nn-gravel",
  "nn-charcoal",
  "nn-cod-grey",
];

export const componentes = [
  { key: "nn-row", description: "Row component." },
  { key: "nn-column", description: "Column component." },

  { key: "nn-btn", description: "Button component." },
  { key: "nn-icon", description: "Icon component." },
  { key: "nn-crayon", description: "Crayon component." },

  { key: "nn-scroll-area", description: "ScrollArea component." },
  { key: "nn-container", description: "Container component." },

  { key: "nn-label", description: "Label component." },
  { key: "nn-range", description: "Range component." },
  { key: "nn-input", description: "Input component." },
];