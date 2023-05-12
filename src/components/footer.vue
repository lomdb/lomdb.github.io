<template>
  <footer>
    <div class="nn-shade">
      <p>
        Built with <span class="heart"></span> by
        <a target="_blank" href="https://miguel-rivas.github.io"
          >Miguel Rivas</a
        >
      </p>
      <hr />
      <ul class="links">
        <template v-for="(link, linkIndex) in links" :key="linkIndex">
          <li>
            <a :href="link.url" target="_blank">{{ link.name }}</a>
          </li>
        </template>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "Patreon", url: "https://www.patreon.com/nanogrid" },
      { name: "Github", url: "https://github.com/nano-grid/nano-grid" },
      { name: "Youtube", url: "https://www.youtube.com/channel/UCrhPLwTBFOdj_-RxOXGua2w" },
    ],
  }),
};
</script>