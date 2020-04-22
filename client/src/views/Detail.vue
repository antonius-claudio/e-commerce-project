<template>
  <div class="details columns">
    <div class="leftDetail column is-4">
      <img :src="product.image_url"/>
    </div>
    <div class="rightDetail column is-8">
      <div class="titleDetail">
        <h1 class="title">{{product.name}}</h1>
      </div>
      <div class="deskripsiDetail">
        <h1 class="priceDetail title">Price: {{formatPrice(product.price)}}</h1>
        <h1 class="title">Stock: {{product.stock}}</h1>
      </div>
      <div class="actions" v-if="$store.state.isLogged === true">
        <b-numberinput v-model="quantity" min="1" :max="product.stock"></b-numberinput>
        <b-button type="is-info" @click.prevent="addToCart">Add to Cart</b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quantity: 0
    }
  },
  computed: {
    id: function () {
      return Number(this.$route.params.id);
    },
    product: function () {
      return this.$store.getters.getProductById(this.id);
    }
  },
  methods: {
    formatPrice(text){
        let str = String(text);
        let count = 1;
        let temp = '';
        for (let i = str.length; i > 0; i--) {
            if (i % 3 === 0 && i !== str.length) {
                temp += '.';
            }
            temp += str[count-1];
            count++;
        }
        return `Rp ${temp},-`;
    },
    addToCart(){
      console.log('add to carrrt', this.quantity)
      if(this.quantity > 0){
        let form = this.product;
        form.quantity = this.quantity;
        this.$store.dispatch('addToCart', form)
          .then((result) => {
              this.$swal(
                  {
                      icon: 'success',
                      title: `${result}`,
                      showConfirmButton: false,
                      timer: 1000
                  }
              )
              this.$router.push('/cart');
          })
          .catch((err) => {
              this.$swal(
                  {
                      icon: 'error',
                      title: 'Error!',
                      text: `${err}`,
                  }
              )
          });
      } else {
        this.$swal(
            {
                icon: 'error',
                title: 'Error!',
                text: `Quantity cannot be empty`,
            }
        )
      }
    }
  },
}
</script>
<style>
  .details {
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
    background-color: #f5b7454a;
  }
  .titleDetail {
    border-bottom: #fff 1px solid;
    padding-top: 2%;
    padding-bottom: 3%;
    color: #675656;
  }
  .deskripsiDetail {
    display: flex;
    margin-top: 4%;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
  }
  .actions {
    padding: 5%;
    display:flex;
    justify-content: space-between;
  }
</style>