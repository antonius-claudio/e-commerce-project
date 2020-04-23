<template>
    <div class="columns is-multiline" @click.prevent="goDetail">
        <div class="column is-6">
            {{checkout.date}}
        </div>
        <div class="column is-6">
            {{checkout.total}}
        </div>
    </div>
</template>
<script>
export default {
    props: ['checkout'],
    methods: {
        goDetail(){
            this.$router.push(`/transactions/${this.checkout.id}`);
        }
    },
}
</script>