<template>
  <component
    :is="computedTag"
    :class="computedClasses"
    :role="tag === 'button' ? 'button' : undefined"
    :aria-label="computedLabel"
    :to="to"
    :title="computedLabel"
    @click.passive="$emit('click', $event)"
  >
    <nn-icon v-if="glyph !== ''" :glyph="glyph" :direction="iconDirection" />
    <span class="caption" v-if="text">
      {{ text }}
    </span>
  </component>
</template>

<script>
import { colorsType, directionsType } from "../modules/types";
import { nano, titleCase } from "../modules/helpers";

export default {
  props: {
    tag: {
      type: String,
      default: "button",
    },
    glyph: {
      type: String,
      default: "",
    },
    text: {
      type: [String, Number],
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    to: {
      default: undefined,
    },
    direction: {
      type: String,
      default: "down",
    },
    mode: {
      type: String,
      default: "flat",
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonType() {
      return `${nano}btn ${nano}${this.mode}`;
    },
    itemColor() {
      if (colorsType.includes(this.color)) {
        return nano + this.color;
      } else {
        console.warn(
          `color="${this.color}" is not a supported value on btn.vue, try the following values instead:`
        );
        console.warn(colorsType);
        return "";
      }
    },
    iconDirection() {
      if (directionsType.includes(this.direction)) {
        return this.direction;
      } else {
        console.warn(
          `direction="${this.direction}" is not a supported value on btn.vue, try the following values instead:`
        );
        console.warn(directionsType);
        return "down";
      }
    },
    computedTag() {
      if (this.to) {
        return "router-link";
      } else {
        return this.tag;
      }
    },
    computedLabel() {
      if (this.title) {
        return titleCase(this.title);
      } else if (this.text) {
        return titleCase(this.text) + " Button";
      } else if (this.glyph) {
        return titleCase(this.glyph) + " Button";
      }
    },
    computedClasses() {
      return [
        this.buttonType,
        this.itemColor,
        {
          "nn-active": this.active,
          "nn-round": this.round,
        },
      ];
    },
  },
};
</script>
