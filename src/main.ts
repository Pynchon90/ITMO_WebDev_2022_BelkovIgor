import { createApp } from 'vue';
import { provideApolloClient } from '@vue/apollo-composable';
import './style.css';
import apolloClient from './graphql/apollo';
import Routes from './consts/Routes';
import router from './router';
import App from './App.vue';
import userModel from './model/UserModel';

router.beforeEach((to, from, next) => {
  const authRoutes = [Routes.INDEX, Routes.LOGIN, Routes.REGISTER];
  const indexOfAuthRoute = authRoutes.indexOf(to.path);
  if (indexOfAuthRoute < 0 && !userModel.isAuthenticated) {
    next({ path: Routes.LOGIN });
  } else next();
});

const app = createApp(App);

provideApolloClient(apolloClient);

app.use(router);
app.mount('#app');
