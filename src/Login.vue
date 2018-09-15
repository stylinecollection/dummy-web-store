<template>
  <div class="container">
    <form>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Login Form</h1>
          <hr>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password">
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <button
            class="btn btn-primary" @click.prevent="onSubmit">Submit!
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import MoltinService from './services/moltin.js';
  export default {
    data() {
      return{
        customerId:'',
        token:'',
        expiers:'',
        email: '',
        password: '',
      }
    },
    methods: {
      setUserData: function (data) {
        this.$store.dispatch('setUserData', data);
      },
      onSubmit: function () {
        const formData = {
          email: this.email,
          password: this.password,
        };
        MoltinService.loginCustomer(formData).then(data=> {
          data = data.data;
          this.customerId = data.customer_id;
          this.token = data.token;
          this.expires = data.expires;
          MoltinService.getCustomerName(this.customerId, this.token).then(customer => {
            data.name = customer.data.name;
            this.setUserData(data);
          });
        })
      }
    }
  }
</script>

<style>
</style>
