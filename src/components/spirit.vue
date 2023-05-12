<template>
  <div class="nn-spirit">
    <code v-html="textFormat" />
  </div>
</template>

<script>
import { pug } from "nano-spirit/modules/code-pug";
import { haml } from "nano-spirit/modules/code-haml";
import { html } from "nano-spirit/modules/code-html";
import { css } from "nano-spirit/modules/code-css";
import { svelte } from "nano-spirit/modules/code-svelte";
import { vue } from "nano-spirit/modules/code-vue";
import { shell } from "nano-spirit/modules/code-shell";
import { js } from "nano-spirit/modules/code-js";
import { react } from "nano-spirit/modules/code-react";

export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
      default: "html",
    },
  },
  computed: {
    textFormat() {
      if (this.lang === "pug") {
        return pug(this.text);
      } else if (this.lang === "haml") {
        return haml(this.text);
      } else if (this.lang === "js") {
        return js(this.text);
      } else if (this.lang === "html") {
        return html(this.text);
      } else if (this.lang === "css") {
        return css(this.text);
      } else if (this.lang === "svelte") {
        return svelte(this.text);
      } else if (this.lang === "vue") {
        return vue(this.text);
      } else if (this.lang === "shell") {
        return shell(this.text);
      } else if (this.lang === "react") {
        return react(this.text);
      } else {
        return this.text;
      }
    },
  },
};
</script>