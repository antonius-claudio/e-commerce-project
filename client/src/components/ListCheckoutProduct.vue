<template>
    <div class="columns is-multiline">
        <div class="column is-3">
            {{checkoutProduct.name}}
        </div>
        <div class="column is-3">
            {{formatPrice(checkoutProduct.price)}}
        </div>
        <div class="column is-3">
            {{checkoutProduct.quantity}}
        </div>
        <div class="column is-3">
            {{formatPrice(total)}}
        </div>
    </div>
</template>
<script>
export default {
    props: ['checkoutProduct'],
    computed: {
        total: function() {
            return (this.checkoutProduct.price * this.checkoutProduct.quantity);
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
        }
    },
}
</script>