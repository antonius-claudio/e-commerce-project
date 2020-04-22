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
    },
    CLEAR_CARTS(state) {
      state.carts = [];
    },
    UPDATE_PRODUCTS(state, payload) {
      payload.forEach(i => {
        let index = state.products.findIndex(product => product.id === i.ProductId);
        state.products[index].stock = state.products[index].stock - i.quantity;
      })
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
      if(payload.quantity){
        quantity = payload.quantity;
      }
      console.log('quantityyyyyyyyyyyyyy', quantity)
      let index = this.state.carts.findIndex(cart => cart.ProductId === payload.id);
      let cond = false;
      if (index === -1) {
        if (quantity <= payload.stock) {
          cond = true;
        }
      } else {
        if ((this.state.carts[index].quantity+quantity) <= payload.stock) {
          cond = true;
        }
      }
      return new Promise ((resolve, reject) => {
        if (cond === false) {
          reject('Stok terbatas!');
        } else {
          axios({
            url: url + '/carts',
            method: 'POST',
            data: {
              ProductId: payload.id,
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
        }
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
    },
    checkout({commit}, payload) {
      let data = {
        total: payload,
        cart: []
      }
      this.state.carts.forEach(i => {
        data.cart.push({
          CartId: i.id,
          ProductId: i.ProductId,
          name: i.Product.name,
          price: i.Product.price,
          stock: (Number(i.Product.stock)-Number(i.quantity)),
          quantity: i.quantity
        })
      })
      return new Promise ((resolve, reject) => {
        axios({
          url: url + '/checkout',
          method: 'POST',
          headers: {
            access_token
          },
          data: {
            payload: JSON.stringify(data)
          }
        })
          .then((result) => {
            commit('UPDATE_PRODUCTS', data.cart);
            commit('CLEAR_CARTS');
            resolve(result.data);
          })
          .catch((err) => {
            console.log('masuk err checkout')
            reject(err.response.data.message);
          });
      })
    }
  },
  modules: {
  },
  getters: {
    getProducts: (state) => () => {
        return state.products.filter(product => product.stock >= 1)
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    getCartByIdProduct: (state) => (id) => {
      return state.carts.find(cart => cart.ProductId === id)
    },
  }
});
