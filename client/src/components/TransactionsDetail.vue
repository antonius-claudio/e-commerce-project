<template>
    <div class="columns transBody">
        <div class="column">
            <h4 class="title">Transactions no. {{Number(this.$route.params.id)}} Detail</h4>
            <hr>
            <div class="columns is-multiline">
                <div class="column is-3">
                    Item
                </div>
                <div class="column is-3">
                    Price
                </div>
                <div class="column is-3">
                    Quantity
                </div>
                <div class="column is-3">
                    Total
                </div>
            </div>
            <ListCheckoutProduct v-for="checkoutProduct in checkoutProducts" :key="checkoutProduct.id" :checkoutProduct="checkoutProduct" />
            <hr>
            <div class="columns is-multiline">
                <div class="column is-3 is-offset-3">
                    <b-button type="is-warning" @click.prevent="goBack">Back</b-button>
                </div>
                <div class="column is-3">
                    <strong class="title">Total</strong>
                </div>
                <div class="column is-3">
                    <strong class="title">{{formatPrice(finalTotal)}}</strong>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ListCheckoutProduct from './ListCheckoutProduct';
export default {
    components: {
        ListCheckoutProduct
    },
    created() {
        if(this.$store.state.isLogged === false){
            this.$router.push('/login');
        } else {
            this.$store.dispatch('transactionsDetail', this.$route.params.id);
        }
    },
    computed: {
        checkoutProducts: function () {
            console.log('masuk detail', this.$route.params.id)
            return this.$store.state.checkoutProducts;
        },
        finalTotal: function() {
            let temp = 0;
            this.checkoutProducts.forEach(i => {
                temp += (i.price*i.quantity)
            })
            return temp;
        }
    },
    methods: {
        formatPrice: function (text){
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
        goBack(){
            this.$router.push('/transactions');
        }
    },
}
</script>
<style>
    .transBody {
        margin-top: 3%;
        margin-left: 5%;
        margin-right: 5%;
        padding-bottom: 2%;
    }
</style>