import Vue from 'vue'
import Router from 'vue-router'
import ProductList from './ProductList'
import Register from './Register'
import Login from './Login'
import Cart from './Cart'
import store from './store'

Vue.use(Router);

export const routes = [
    {path: '/', name: 'ProductList', component: ProductList},
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter(to, from, next){
        if(!localStorage.token){
          next()
        }else{
          next('')
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter(to, from, next){
        if(!localStorage.token){
          next()
        }else{
          next('')
        }
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      beforeEnter(to, from, next){
        if(store.state.customerToken){
          next()
        }else{
          next('login')
        }
      }
    },
  ];

export default new Router({
  mode: 'history',
  routes
})
