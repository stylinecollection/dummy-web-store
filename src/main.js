import Vue from 'vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

import store from './store';

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
