<template>
  <div>
    <div class="ui items">
      <div class="item">
        <div class="ui medium image">
          <img :src="getProductThumb(product.data[0])" alt="">
        </div>
        <div class="content">
          <div class="header">{{ product.data[0].name }}</div>
          <div class="description">
            <p>{{ product.data[0].meta.display_price.with_tax.formatted }}</p>
            <div class="ui label">SKU: {{ product.data[0].sku }}</div>
          </div>
            <div class="extra">
              <div class="ui action input">
                <input type="number" placeholder="Quantity" v-model="qty">
                <button class="ui orange button" role="button" v-on:click.prevent="addToCart(product.data[0].id, qty)">
                  <i aria-hidden="true" class="plus cart icon"></i>Add to Cart
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MoltinService from '../services/moltin.js'

export default {
  name: 'product',
  data () {
    return {
      product: {},
      qty: 1
    }
  },
  beforeMount () {
    // TODO: This might not resolve before the template is built. Add a workaround.
    MoltinService.findBySlug(this.$route.params.slug).then((response) => {
      this.product = response
    })
  },
  methods: {
    addToCart: function (productId, qty) {
      MoltinService.addToCart(productId, qty).then((response) => {
        this.$emit('cart-updated', response)
        this.qty = 1
      })
    },
    getProductThumb: function (product) {
        console.log(product)
        var placeholder = 'https://placeholdit.imgix.net/~text?txtsize=69&txt=824%C3%971050&w=824&h=1050'
        try {
          var fileId = product.relationships.files.data[0].id
          console.log(fileId)
          var imgSrc = 'https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ef4e860a-1d01-4e5c-a6a8-427cfa48a668/' + fileId + '.jpg'
          return imgSrc || placeholder
        } catch (e) {
          return placeholder
        }
      }
  }
}
</script>
<style>
</style>
