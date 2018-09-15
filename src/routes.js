import ProductList from './ProductList'
import Register from './Register'
import Login from './Login'
import Cart from './Cart'

export const routes = [
    {path: '/', name: 'ProductList', component: ProductList},
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
    {path: '/cart', name: 'Cart', component: Cart},
  ];
