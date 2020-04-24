<template>
    <div class="pick columns is-multiline" @click.prevent="goDetail">
        <div class="column is-6">
            {{checkout.date}}
        </div>
        <div class="column is-6">
            {{formatPrice(checkout.total)}}
        </div>
    </div>
</template>
<script>
export default {
    props: ['checkout'],
    methods: {
        goDetail(){
            this.$router.push(`/transactions/${this.checkout.id}`);
        },
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
    },
}
</script>
<style>
    .pick:hover {
        cursor: pointer;
        background-color:#c2e6ab;
    }
</style>