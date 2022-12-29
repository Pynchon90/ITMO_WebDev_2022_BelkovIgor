import { createApp } from 'vue'
import './style.css'
import PocketBase from 'pocketbase'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router";
import Routes from "./consts/Routes";
import router from './router'
import { createLogger } from "vite";
// import BooksListPage from './pages/BooksListPage.vue'

const pb = new PocketBase(import.meta.env.VITE_DATABASE_URL);
console.log('> pb.authStore.isValid: ', pb.authStore.isValid);
router.beforeEach((to, from, next) =>{
  const authRoutes = [Routes.INDEX, Routes.LOGIN, Routes.REGISTER];
  const indexOfAuthRoute = authRoutes.indexOf(to.path);
  if (indexOfAuthRoute <0 && !pb.authStore.isValid) {
    next ({path: Routes.LOGIN})
  }
  else next();
});



const app = createApp(App);
app.use(router);
app.provide('pb', pb);
app.mount('#app');
