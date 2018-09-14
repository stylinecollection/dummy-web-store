import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import ProductList from './ProductList.vue'

Vue.use(BootstrapVue);
Vue.component('products', ProductList);

new Vue({
  el: '#app',
  render: h => h(App)
});
