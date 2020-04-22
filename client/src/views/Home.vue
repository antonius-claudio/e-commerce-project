<template>
  <div class="home">
    <div class="columns is-multiline">      
      <CardProduct v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProduct from '@/components/CardProduct';

export default {
  name: 'Home',
  components: {
    CardProduct,
  },
  computed: {
    products: function () {
      return {...this.$store.state.products};
    },
  },
};
</script>
<style>
  .home {
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
  }
</style>
