import BuilderWorkareaView from '../views/home.vue';
import ClassesWorkareaView from '../views/grid-system.vue';
import DictionaryWorkareaView from '../views/documentation.vue';
import DocumentationWorkareaView from '../views/installation.vue';
import TestsWorkareaView from '../views/tests.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    components: {
      workarea: BuilderWorkareaView,
    },
  },
  {
    path: '/sizes',
    name: 'sizes',
    components: {
      workarea: ClassesWorkareaView,
    },
  },
  {
    path: '/documentation',
    name: 'documentation',
    components: {
      workarea: DictionaryWorkareaView,
    },
  },
  {
    path: '/installation',
    name: 'installation',
    components: {
      workarea: DocumentationWorkareaView,
    },
  },
  {
    path: '/tests',
    name: 'tests',
    components: {
      workarea: TestsWorkareaView,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
