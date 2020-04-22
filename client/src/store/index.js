import Vue from 'vue';
import Vuex from 'vuex';
import { url } from '../utils';
import axios from 'axios';
const access_token = localStorage.getItem('access_token');
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
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
    UPDATE_CARTS(state, payload) {
      let index = state.carts.findIndex(cart => cart.id === payload.id);
      if (index === -1) {
        console.log('ini dari baru update carts', index)
        state.carts.push(payload);
      } else {
        state.carts[index].quantity = payload.quantity;
        console.log('ini dari lama update carts', index)
      }
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
    },
    getAll({commit}) {
      axios({
        url: url + '/products',
        method: 'GET'
      })
        .then((result) => {
          commit('SET_PRODUCTS', result.data);
        })
        .catch((err) => {
          console.log('Failed to get product from db');
        });
    },
    getCarts({commit}) {
      axios({
        url: url + '/carts',
        method: 'GET',
        headers: {
          access_token
        }
      })
        .then((result) => {
          commit('SET_CARTS', result.data);
        })
        .catch((err) => {
          console.log('Failed to get cart from db');
        });
    },
    addToCart({commit}, payload) {
      console.log('ini dari add to cart', payload)
      let quantity = 1;
      return new Promise ((resolve, reject) => {
        axios({
          url: url + '/carts',
          method: 'POST',
          data: {
            ProductId: payload,
            quantity
          },
          headers: {
            access_token
          }
        })
          .then((result) => {
            commit('UPDATE_CARTS', result.data);
            resolve(`${result.data.Product.name} added to cart!`);
          })
          .catch((err) => {
            reject(err.response.data.message);
          });
      })
    },
    updateCart({commit}, payload) {
      axios({
        url: url + '/carts',
        method: 'PUT',
        data: {
          id: payload.id,
          quantity: payload.quantity
        },
        headers: {
          access_token
        }
      })
        .then((result) => {
          commit('UPDATE_CARTS', result.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  },
  modules: {
  },
});
