<template>
  <div>
    <p>{{name}}</p>
    <button @click="initializeProductDetails">Click</button>
  </div>
</template>

<script>
  export default {
    data: function () {
      return{
        name:'A',
        image:null,
        sku:null,
        price:null,
        stock:null,
        category:null
      }
    },
    methods: {
      initializeProductDetails(){
        this.name = 'Food';
        this.image = 'Food';
        this.sku = 'Food';
        this.price = 'Food';
        this.stock = 'Food';
        this.category = 'Food';
      }
    }
  }
</script>

<style lang="scss">

</style>
