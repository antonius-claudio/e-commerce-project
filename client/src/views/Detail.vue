<template>
  <div class="details">
    
  </div>
</template>
<script>
export default {
  computed: {
    id: function () {
      return this.$route.params.id;
    },
  },
}
</script>
<style>
  .details {
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
    background-color: #f9b8b84a;
  }
</style>