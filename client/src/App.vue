<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'
export default {
  components: {
    Nav
  },
  created() {
      this.$store.dispatch('getAll');
      if(localStorage.getItem('access_token')){
        this.$store.dispatch('transactions');
        this.$store.commit('SET_ISLOGGED', true);
        this.$router.push('/');
      }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
