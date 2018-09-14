<template>
  <div class="container">
    <div class="list-group" v-for="product in products" :key="product.id">
      <div class="row list-group-item">
        <img class="col img-thumbnail float-left" style="height: 200px; width: 200px;" :src="getProductThumb(product)" alt="">
        <div class="col content">
          <div class="header">
            <strong>{{ product.name }}</strong>
          </div>
          <div><strong>SKU:</strong> {{ product.sku }}</div>
          <div><strong>Price:</strong> {{ product.price[0].amount }} {{ product.price[0].currency }}</div>
          <div><strong>Stock:</strong> {{ product.meta.stock.level }}</div>
          <div><strong>Category:</strong> {{ getCategory(product) }} </div>
        </div>
      </div>
    </div>

    <br>

    <nav aria-label="..." style="float: right">
      <ul class="pagination">
        <li class="page-item" v-bind:class="{ disabled: !hasFirst}">
          <a class="page-link"  v-on:click="loadProducts('first')" tabindex="-1">First</a>
        </li>
        <li class="page-item" v-bind:class="{ disabled: !hasPrev}">
          <a class="page-link" v-on:click="loadProducts('prev')" tabindex="-1">Previous</a>
        </li>
        <li class="page-item disabled">
          <a class="page-link" href="#">{{current}} <span class="sr-only">(current)</span></a>
        </li>
        <li class="page-item" v-bind:class="{ disabled: !hasNext}">
          <a class="page-link" v-on:click="loadProducts('next')" tabindex="-1">Next</a>
        </li>
        <li class="page-item" v-bind:class="{ disabled: !hasLast}">
          <a class="page-link" v-on:click="loadProducts('last')" tabindex="-1">Last</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        products: {},
        categories: {},
        paginationLinks: {},
        dataMeta: {}
      }
    },
    created () {
      axios.defaults.headers.common['Authorization'] = '231c4161642d668e5bdbb009aead647586f21740';
      axios.get('https://api.moltin.com/v2/products?include=categories&page[limit]=10&page[offset]=0').then(response => {
        this.products = response.data.data;
        if(response.data.hasOwnProperty('included') && response.data.included.hasOwnProperty('categories')) {
          this.categories = response.data.included.categories;
        }
        this.paginationLinks = response.data.links;
        this.dataMeta = response.data.meta;
      });
    },
    methods: {
      loadProducts: function(key) {
        axios.get(this.paginationLinks[key]).then(response => {
          this.products = response.data.data;
          if(response.data.hasOwnProperty('included') && response.data.included.hasOwnProperty('categories')) {
            this.categories = response.data.included.categories;
          }
          this.paginationLinks = response.data.links;
          this.dataMeta = response.data.meta;
        });
      },
      getProductThumb: function (product) {
        const placeholder = 'https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ef4e860a-1d01-4e5c-a6a8-427cfa48a668/';
        try {
          const file = product.relationships.files.data[0].id;
          return placeholder+file+'.jpg'
        } catch (e) {
          return placeholder
        }
      },
      getCategory: function (product) {
        let str_categories = '';
        if(product.relationships.hasOwnProperty('categories')) {
          for (let i in product.relationships.categories.data) {
            for (let j in this.categories) {
              if (product.relationships.categories.data[i].id === this.categories[j].id) {
                if (i != 0) {
                  str_categories += ', ';
                }
                str_categories += this.categories[j].name;
              }
            }
          }
          return str_categories
        }
        return 'N/A'
      }
    },
    computed: {
      hasFirst: function () {
        return this.paginationLinks.first !== this.paginationLinks.current;
      },
      hasLast: function () {
        return this.paginationLinks.last !== this.paginationLinks.current;
      },
      hasNext: function () {
        return this.paginationLinks.next !== null;
      },
      hasPrev: function () {
        return this.paginationLinks.prev !== null;
      },
      current: function () {
        if(Object.keys(this.dataMeta).length !== 0)
        {
          return this.dataMeta.page.current;
        }
        else{
          return 1;
        }
      }
    }
  }
</script>

<style lang="scss">
 .col{
   margin: 20px;
 }
</style>
