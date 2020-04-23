<template>
    <div class="columns is-multiline">
        <div class="column is-3">
            {{checkoutProduct.name}}
        </div>
        <div class="column is-3">
            {{checkoutProduct.price}}
        </div>
        <div class="column is-3">
            {{checkoutProduct.quantity}}
        </div>
        <div class="column is-3">
            {{total}}
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
}
</script>