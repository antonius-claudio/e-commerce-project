<template>
    <div class="columns transBody">
        <div class="column">
            <h4 class="title">Transactions</h4>
            <hr>
            <div class="columns is-multiline">
                <div class="column is-6">
                    Date
                </div>
                <div class="column is-6">
                    Total
                </div>
            </div>
            <ListTransaction v-for="checkout in checkouts" :key="checkout.id" :checkout="checkout" />
        </div>
    </div>
</template>
<script>
import ListTransaction from '../components/ListTransaction';
export default {
    components: {
        ListTransaction
    },
    computed: {
        checkouts: function () {
            return {...this.$store.state.checkouts};
            // return this.$store.getters.getProducts();
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