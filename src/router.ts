import { createRouter, createWebHashHistory } from 'vue-router';
import Routes from './consts/Routes';
import IndexPage from './pages/IndexPage.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: Routes.INDEX,
      component: IndexPage,
    },
    {
      path: Routes.BOOKS,
      component: () => import('./pages/BooksPage.vue'),
    },
    {
      path: Routes.LOGIN,
      component: () => import('./pages/LoginPage.vue'),
    },
    {
      path: Routes.REGISTER,
      component: () => import('./pages/RegisterPage.vue'),
    },
  ],
});

export default router;
