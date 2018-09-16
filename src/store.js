import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    customerToken:null,
    customerId:null,
    expiers:null,
    customerName:null,
  },
  mutations:{
    setPayload: (state, payload) => {
      state.customerToken = payload.token;
      state.customerId = payload.customer_id;
      state.expiers = payload.expires;
      state.customerName = payload.name;

      localStorage.setItem('token', payload.token);
      localStorage.setItem('customerId', payload.token);
      localStorage.setItem('customerName', payload.name);
      localStorage.setItem('expires', new Date(payload.expires*1000));
    },
    clearAuthData(state){
      state.customerName = null;
      state.customerId = null;
      state.customerToken = null;
      state.expiers = null;

      localStorage.removeItem('token');
      localStorage.removeItem('customerId');
      localStorage.removeItem('customerName');
      localStorage.removeItem('expires');
    },
    tryAutoLogin(state){
      const token = localStorage.getItem('token');
      if(!token){
        return
      }
      const expires = localStorage.getItem('expires');
      if(new Date() >= expires){
        return
      }
      const customerId = localStorage.getItem('customerId');
      const customerName = localStorage.getItem('customerName');

      state.customerToken = token;
      state.customerId = customerId;
      state.expiers = expires;
      state.customerName = customerName;
    }
  },
  getters:{
    getToken: state=> {
      return state.customerToken;
    },
    getId: state=> {
      return state.customerId;
    },
    getExpirationTime: state=> {
      return state.expiers;
    },
    getcustomerName: state=> {
      return state.customerName;
    }
  },
  actions:{
    setUserData: ({commit}, payload) => {
      commit('setPayload', payload);
    },
    logout({commit}){
      commit('clearAuthData');
      router.replace('/login')
    },
    tryAutoLogin({commit}){
      commit('tryAutoLogin');
    }
  },
});
