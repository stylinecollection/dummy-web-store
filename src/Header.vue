<template>
  <div>
    <b-navbar toggleable type="light" variant="light">
      <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
      <b-navbar-brand>Dummy Web Store</b-navbar-brand>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-7"></div>
          <div class="col-md-1" v-if="customerToken == null">
            <router-link to="/register" active-class="active"><a>Register</a></router-link>
          </div>
          <div class="col-md-2 text-right" v-if="customerToken != null">
            <router-link to="/cart" active-class="active"><a>{{customerName}}</a></router-link>
          </div>
          <div class="col-md-1" v-if="customerToken == null">
            <router-link to="/login" active-class="active"><a>Login</a></router-link>
          </div>
          <div class="col-md-1" v-if="customerToken != null">
            <router-link to="/logout" active-class="active"><a>Logout</a></router-link>
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    computed:{
      customerToken(){
        return this.$store.getters.getToken
      },
      customerName(){
        return this.$store.getters.getcustomerName
      }
    }
  }
</script>

<style>
</style>
