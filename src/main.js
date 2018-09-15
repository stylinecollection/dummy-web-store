import Vue from 'vue'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
Vue.use(VueRouter);

import { routes } from './routes';
import { store } from './store';

Vue.use(BootstrapVue);
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
