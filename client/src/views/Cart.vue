<template>
    <div class="columns cartBody">
        <div class="column is-8 struk">
            <h4 class="title">Checkout</h4>
            <hr>
            <div class="columns is-multiline headerCart">
                <div class="column is-4">
                    Item
                </div>
                <div class="column is-3">
                    Quantity
                </div>
                <div class="column is-2">
                    Price
                </div>
                <div class="column is-3">
                    Total
                </div>
            </div>
            <div class="maxHeight">
                <ListCart v-for="cart in carts" :key="cart.id" 
                :cart="cart"
                @calculate="calculate"/>
            </div>
            <div class="end">
                <div class="leftend">
                    <h3 class="title">Total: {{formatPrice(total)}}</h3>
                </div>
                <div class="rightend" @click.prevent="btnCheckout">
                    <b-button type="is-success">Checkout</b-button>
                </div>
            </div>
        </div>
        <div class="column is-4">
            <img src="../assets/img-side.jpg"/>
        </div>
    </div>
</template>
<script>
import ListCart from '../components/ListCart';
export default {
    data() {
        return {
            total: 0
        }
    },
    components: {
        ListCart
    },
    computed: {
        carts: function() {
            return this.$store.state.carts;
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
        calculate: function(payload){
            this.total += payload;
        },
        btnCheckout(){
            console.log('masuk checkout', this.total);
        }
    },
}
</script>
<style>
    .cartBody {
        margin-top: 3%;
        margin-left: 5%;
        margin-right: 5%;
        padding-bottom: 2%;
    }
    .struk {
        border-radius: 10px;
        background-color: #aaa8b5c7;
    }
    .headerCart {
        padding-left: 10px;
        padding-right: 10px;
    }
    .headerCart .column {
        padding: 0;
        font-weight: bold;
        border-bottom: 1px solid #fff;
    }
    .maxHeight {
        max-height: 70%;
        overflow: auto;
    }
    .end {
        display: flex;
        justify-content: space-between;
        margin-top: 3%;
        padding-left: 10%;
    }
</style>