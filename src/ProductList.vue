<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <b-form-select v-model="selectedCategory" :options="categories" class="mb-3" v-on:input="filter()"/>
      </div>
      <div class="col-md-2">
        <b-form-select v-model="selectedAvailability" :options="availability" class="mb-3" v-on:input="filter()"/>
      </div>
      <div class="col-md-8 text-right" v-if="( selectedCategory === null && selectedAvailability === null)">
        <a class="" href="#"  v-on:click="sort()" v-if="sorted === '-price'">Sort by Price &#x2193;</a>
        <a class="" href="#"  v-on:click="sort()" v-if="sorted === 'price'">Sort by Price &#x2191;</a>
      </div>
    </div>

    <br>
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
          <br>

          <div class="extra" v-if="showAddCartButton(product)" >
            <button v-on:click.prevent="addToCart(product)" type="button" class="btn btn-outline-secondary btn-sm">Add To Cart</button>
          </div>

        </div>
      </div>
    </div>
    <br>
    <nav aria-label="..." style="float: right" v-if="productsCount > 0">
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
    <div class="alert alert-danger text-center" role="alert" v-if="productsCount === 0">
      <strong>No Data Found!</strong>
    </div>
  </div>
</template>

<script>
  import MoltinService from './services/moltin.js';

  export default {
    data () {
      return {
        placeholder: 'https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ef4e860a-1d01-4e5c-a6a8-427cfa48a668/',
        products: {},
        productLink: 'https://api.moltin.com/v2/products?include=categories&page[limit]=10&page[offset]=0',
        selectedCategory:null,
        categories: [{'value': null, 'text':"Select Category"}],
        selectedAvailability:null,
        availability: [{'value': null, 'text':"All"},{'value': 0, 'text':"Out of Stock"},{'value': 1, 'text':"In Stock"}],
        productCategories: {},
        paginationLinks: {},
        dataMeta: {},
        sorted: '-price'
      }
    },
    created () {
      MoltinService.getHomepageProducts().then(response => {
        this.products = response.data;
        if(response.hasOwnProperty('included') && response.included.hasOwnProperty('categories')) {
          this.productCategories = response.included.categories;
        }
        this.paginationLinks = response.links;
        this.dataMeta = response.meta;
      });
      MoltinService.getCategories().then(response => {
        for(let i in response.data) {
          this.categories.push({'value': response.data[i].id, 'text':response.data[i].name})
        }
      });
    },
    methods: {
      addToCart: function (product) {
        let ref = this.$store.getters.getId;
        MoltinService.addToCart(ref, product.id, 1)
      },
      loadProducts: function(key) {
        var offset = 0;
        if(key==='next'){
          offset = this.dataMeta.page.offset + this.dataMeta.page.limit;
        }
        else if(key==='prev'){
          offset = this.dataMeta.page.offset - this.dataMeta.page.limit;
        }
        else if(key==='last'){
          offset = (this.dataMeta.page.total-1) * this.dataMeta.page.limit;
        }
        else if(key==='first'){
          offset = 0;
        }
        MoltinService.getHomepageProducts(10, offset, this.selectedCategory, this.selectedAvailability).then(response => {
          this.products = response.data;
          if(response.hasOwnProperty('included') && response.included.hasOwnProperty('categories')) {
            this.productCategories = response.included.categories;
          }
          this.paginationLinks = response.links;
          this.dataMeta = response.meta;
        });
      },
      getProductThumb: function (product) {
        if(product.hasOwnProperty('relationships') && product.relationships.hasOwnProperty('files')){
          const file = product.relationships.files.data[0].id;
          return this.placeholder+file+'.jpg'
        }
        else{
          return ''
        }
      },
      getCategory: function (product) {
        let str_categories = '';
        if(product.relationships.hasOwnProperty('categories')) {
          for (let i in product.relationships.categories.data) {
            for (let j in this.productCategories) {
              if (product.relationships.categories.data[i].id === this.productCategories[j].id) {
                if (i != 0) {
                  str_categories += ', ';
                }
                str_categories += this.productCategories[j].name;
              }
            }
          }
          return str_categories
        }
        return 'N/A'
      },
      filter: function () {
        let products = null;
        if(this.selectedCategory == null && this.selectedAvailability == null)
        {
          products = MoltinService.getSortedProducts(10, 0, this.sorted);
        }
        else{
          products = MoltinService.getHomepageProducts(10, 0, this.selectedCategory, this.selectedAvailability);
        }

        products.then(response => {
          this.products = response.data;
          if(response.hasOwnProperty('included') && response.included.hasOwnProperty('categories')) {
            this.productCategories = response.included.categories;
          }
          this.paginationLinks = response.links;
          this.dataMeta = response.meta;
        });
      },
      changeSort: function () {
        if(this.sorted === 'price')
          this.sorted = '-price';
        else
          this.sorted = 'price'
      },
      sort: function () {
        this.changeSort();
        this.filter();
      },
      showAddCartButton(product){
        if(this.$store.getters.getToken != null){
          if(product.meta.stock.level > 0)
            return true
        }
        return false
      },
    },
    computed: {
      customerToken: function () {
        return this.$store.getters.getToken
      },
      productsCount: function () {
        if(this.dataMeta.hasOwnProperty('results'))
          return this.dataMeta.results.all;
        else
          return -1;
      },
      hasFirst: function () {
        return this.paginationLinks.first !== this.paginationLinks.current;
      },
      hasLast: function () {
        return this.paginationLinks.next !== null;
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
      },
      filterQuery: function () {
        let filterString = '';
        if(this.selectedCategory != null || this.selectedAvailability != null){
          filterString = '&filter=';
          if(this.selectedCategory != null){
            filterString += 'eq(category.id,'+this.selectedCategory+')';
          }
          if(this.selectedAvailability != null){
            if(this.selectedAvailability == 0){
              filterString += 'eq(stock,0)';
            }
            else{
              filterString += 'gt(stock,0)';
            }
          }
        }
        return filterString;
      },
      sortQuery: function () {
          return '&sort='+this.sorted;
      },
      url: function () {
        if( this.selectedCategory === null && this.selectedAvailability === null)
        {
          return this.productLink+this.sortQuery;
        }
        else{
          return this.productLink+this.filterQuery;
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
