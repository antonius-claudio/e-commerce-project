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
        this.$store.dispatch('transactionsDetail', this.$route.params.id);
    },
    computed: {
        checkoutProducts: function () {
            console.log('masuk detail', this.$route.params.id)
            return this.$store.state.checkoutProducts;
        },
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