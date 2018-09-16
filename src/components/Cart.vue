<template>
    <div>
      <div class="ui warning message" v-if="cart.data.length == 0">
        <div class="header">Your cart is empty</div>
        <p>You'll need to add some items to the cart before you can checkout.</p>
      </div>

      <div v-if="cart.data.length > 0">
        <div class="ui divided items">
          <div class="item" v-for="item in cart.data" :key="item.id">
            <div class="ui small image">
              <img v-bind:src="getProductThumb(item)" alt="">
            </div>
            <div class="content">
              <div class="header">{{ item.name }}</div>
              <div class="meta">{{ item.quantity }}x {{ item.meta.display_price.with_tax.value.formatted }}</div>
              <button class="ui basic icon right floated button" role="button" v-on:click.prevent="removeFromCart(item.id)">
                <i aria-hidden="true" class="remove icon"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>

        <div class="ui large clearing segment">
          <strong>Sub total:</strong> {{ cart.meta.display_price.with_tax.formatted }}
          <span>
            <span class="ui black right floated button">Checkout</span>
          </span>
        </div>
      </div>
    </div>
</template>
<script>
import MoltinService from '../services/moltin.js'

export default {
  name: 'product',
  props: ['cart'],
  methods: {
    removeFromCart (itemId) {
      MoltinService.removeFromCart(itemId).then((response) => {
        this.$emit('cart-updated', response)
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
<style></style>
