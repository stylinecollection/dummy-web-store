import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
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
    }
  },
});
