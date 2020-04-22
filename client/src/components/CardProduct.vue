<template>
    <div class="column is-2 cardProduct">
        <div class="headerCardProduct">
          <img :src="product.image_url" :alt="product.name">
        </div>
        <div class="titleCardProduct">
          {{product.name}}
        </div>
        <div class="footerCardProduct">
          <div class="price">
            {{formatPrice}}
          </div>
          <div class="cartIcon" @click.prevent="btnAddToCart">
            <font-awesome-icon icon="cart-plus" />
          </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['product'],
    computed: {
        formatPrice: function (){
            let str = String(this.product.price);
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
        }
    },
    methods: {
        btnAddToCart(){
            this.$store.dispatch('addToCart', this.product.id)
                .then((result) => {
                    this.$swal(
                        {
                            icon: 'success',
                            title: `${result}`,
                            showConfirmButton: false,
                            timer: 1000
                        }
                    )
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
        }
    },
}
</script>
<style>
    .cardProduct {
        background-color: #adecad8c;
    }
    .titleCardProduct {
        color: #484646;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .footerCardProduct {
        display: flex;
        justify-content: space-between;
    }
    .cartIcon {
        color: #ff6f6f;
    }
    .cartIcon:hover {
        cursor: pointer;
        transform: scale(1.5);
    }
</style>