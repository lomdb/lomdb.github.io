
import { createApp } from 'vue';
import appView from "./app.vue";
import router from "./modules/router";
import store from "./modules/store";
import NanoBtn from '@/components/btn.vue';
import 'nano-grid/components';
import "./stylesheets/application.scss";

const app = createApp(appView);

app.component("btn", NanoBtn);
app.use(store).use(router).mount('#app');