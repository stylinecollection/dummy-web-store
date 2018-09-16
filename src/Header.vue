<template>
  <div>
    <b-navbar toggleable type="light" variant="light">
      <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
      <b-navbar-brand>Dummy Web Store</b-navbar-brand>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6"></div>
          <div class="col-md-1  text-center">
            <router-link to="/" active-class="active"><a><strong>Home</strong></a></router-link>
          </div>
          <div class="col-md-1  text-center" v-if="customerToken != null">
            <router-link to="/cart" active-class="active"><a><strong>Cart</strong></a></router-link>
          </div>
          <div class="col-md-1 text-center" v-if="customerToken == null">
            <router-link to="/register" active-class="active"><a><strong>Register</strong></a></router-link>
          </div>
          <div class="col-md-1 text-center" v-if="customerToken != null">
            <strong>{{customerName}}</strong>
          </div>
          <div class="col-md-1 text-center" v-if="customerToken == null">
            <router-link to="/login" active-class="active"><a><strong>Login</strong></a></router-link>
          </div>
          <div class="col-md-1 text-center" v-if="customerToken != null">
            <strong><a href="#" @click="onLogout">Logout</a></strong>
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    methods:{
      onLogout(){
        this.$store.dispatch('logout')
      }
    },
    computed:{
      customerToken(){
        return this.$store.getters.getToken
      },
      customerName(){
        return this.$store.getters.getcustomerName.split(' ')[0]
      }
    }
  }
</script>

<style>
</style>
