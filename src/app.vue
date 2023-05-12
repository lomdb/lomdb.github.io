<template>
  <main :class="classes">
    <nn-row class="nano-app">
      <panel-navigation />

      <nn-column size="100%-50" class="workarea">
        <router-view name="workarea" />
      </nn-column>
    </nn-row>
  </main>
</template>

<script>
import PanelNavigation from "./components/panel-navigation.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
  }),
  components: {
    PanelNavigation,
  },
  computed: {
    ...mapGetters({
      theme: "getTheme",
    }),
    sectionName() {
      return `section-${this.$route.name}`;
    },
    classes() {
      return [this.sectionName, this.theme ? "nn-light" : "nn-dark"];
    },
  },
  created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentRoute = urlParams.get("route");
    if (currentRoute) {
      this.$router.push(`/${currentRoute}`);
    }
  },
  methods: {
    ...mapMutations(["toggleValue"]),
  },
};
</script>