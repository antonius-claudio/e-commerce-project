<template>
    <div class="column is-2 cardProduct">
        <div class="inside">
            <div class="headerCardProduct" @click.prevent="goDetail">
                <img :src="product.image_url" :alt="product.name">
            </div>
            <div class="titleCardProduct" @click.prevent="goDetail">
                {{product.name}}
            </div>
            <div class="footerCardProduct">
                <div class="leftFooter" @click.prevent="goDetail">
                    {{formatPrice}}
                    <div class="leftStock">
                        stock: {{product.stock}}
                    </div>
                </div>
                <div class="cartIcon" @click.prevent="btnAddToCart" v-if="$store.state.isLogged === true">
                    <font-awesome-icon icon="cart-plus" />
                </div>
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
            this.$store.dispatch('addToCart', this.product)
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
        },
        goDetail(){
            this.$router.push(`/products/${this.product.id}`);
        }
    },
}
</script>
<style>
    .inside {
        background-color: #adecad8c;
        padding: 10px;
        box-shadow: 5px 6px #d6d6d6;
    }
    .cardProduct {
        padding: 10px;
    }
    .cardProduct:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
    .titleCardProduct {
        color: #484646;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        border: 1px solid #fff;
    }
    .footerCardProduct {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .leftFooter {
        font-size: 0.8em;
    }
    .cartIcon {
        color: #ff6f6f;
    }
    .cartIcon:hover {
        cursor: pointer;
        transform: scale(1.5);
    }
</style>