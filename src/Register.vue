<template>
  <div class="container">
    <form v-if="id === ''">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Registration Form</h1>
          <hr>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="name">
          </div>
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
    <div v-if="id !== ''" class="alert alert-success center-text" role="alert">
      Registration Successful!
    </div>
  </div>
</template>

<script>
  import MoltinService from './services/moltin.js';

  export default {
    data() {
      return{
        name: '',
        email: '',
        password: '',
        id:''
      }
    },
    methods: {
      onSubmit: function () {
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        MoltinService.createCustomer(formData).then(customer=>{
          this.id = customer.id
        });
      }
    }
  }
</script>

<style>
</style>
