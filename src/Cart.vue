<template>
  <div class="container">
    <div class="list-group" v-for="product in products" :key="product.id">
      <div class="row list-group-item">
        <div class="col content">
          <div class="header">
            <strong>{{ product.name }}</strong>
          </div>
          <div><strong>Price:</strong> {{ product.value.amount }} {{ product.value.currency }}</div>
          <div><strong>Quantity:</strong> {{ product.quantity }}</div>
          <br>
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>
        <div class="col content">
        <br>

        <div class="extra">
          <button v-on:click.prevent="removeFromCart(product)" type="button" class="btn btn-outline-danger btn-sm">Remove From Cart</button>
        </div>

        </div>
      </div>
    </div>
    <div class="alert alert-danger text-center" role="alert" v-if="productsCount == 0">
      <strong>No Item is Added in Cart!</strong>
    </div>
  </div>
</template>

<script>
  import MoltinService from './services/moltin.js';

  export default {
    data(){
      return{
        products:[]
      }
    },
    created(){
      this.loadData();
    },
    methods:{
      loadData: function () {
        MoltinService.getCart(this.$store.getters.getId).then(items=>{
          this.products = items.data;
        })
      },
      removeFromCart: function (product) {
        MoltinService.removeFromCart(this.$store.getters.getId, product.id).then(response=>{
          this.loadData();
        });
      }
    },
    computed:{
      productsCount:function () {
        return this.products.length;
      }
    }
  }
</script>
