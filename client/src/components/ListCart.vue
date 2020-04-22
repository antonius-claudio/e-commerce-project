<template>
    <div class="columns is-multiline">
        <div class="column is-4">
            {{cart.Product.name}}
        </div>
        <div class="column is-3">
            <b-numberinput v-model="cart.quantity" min="1" :max="cart.Product.stock"></b-numberinput>
        </div>
        <div class="column is-2">
            {{formatPrice(cart.Product.price)}}
        </div>
        <div class="column is-3">
            {{formatPrice(total)}}
        </div>
    </div>
</template>
<script>
export default {
    props: ['cart'],
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
        }
    },
    computed: {
        total : function(){
            return this.cart.Product.price * this.cart.quantity;
        },
        quantity : function(){
            return this.cart.quantity;
        }
    },
    created() {
        this.$emit('calculate', (this.cart.Product.price * this.cart.quantity));
    },
    watch: {
        quantity: function(val, oldVal) {
            if(val !== oldVal){
                this.$store.dispatch('updateCart', {id:this.cart.id, quantity:val})
            }
            console.log('baru quantity', val);
        },
        total: function(val, oldVal) {
            let final = val - oldVal;
            this.$emit('calculate', final);
        }
    },
}
</script>