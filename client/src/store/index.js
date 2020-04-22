import Vue from 'vue';
import Vuex from 'vuex';
import { url } from '../utils';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    products: [],
    carts: [],
  },
  mutations: {
    SET_ISLOGGED(state, n) {
      state.isLogged = n;
    }
  },
  actions: {
    register({commit}, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: url + '/register',
          method: 'POST',
          data: {
            email: payload.email,
            password: payload.password,
            name: payload.name,
            address: payload.address,
            phone: payload.phone
          }
        })
        .then((result) => {
          commit('SET_ISLOGGED', true);
          localStorage.setItem('access_token', result.data.access_token);
          localStorage.setItem('email', result.data.email);
          localStorage.setItem('name', result.data.name);
          localStorage.setItem('address', result.data.address);
          localStorage.setItem('phone', result.data.phone);
          resolve(`Hi, ${result.data.name}`);
        })
        .catch((err) => {
          reject(err.response.data.message);
        });
      })
    },
    login({commit}, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: url + '/login',
          method: 'POST',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then((result) => {
            commit('SET_ISLOGGED', true);
            localStorage.setItem('access_token', result.data.access_token);
            localStorage.setItem('email', result.data.email);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('address', result.data.address);
            localStorage.setItem('phone', result.data.phone);
            resolve(`Hi, ${result.data.name}`);
          })
          .catch((err) => {
            reject(err.response.data.message);
          });
      })
    }
  },
  modules: {
  },
});
