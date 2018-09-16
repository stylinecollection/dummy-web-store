<template>
  <div>
    <app-header></app-header>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './Header.vue'

  export default {
    components:{
      appHeader: Header
    },
    created(){
      this.$store.dispatch('tryAutoLogin');
    }
  }
</script>

<style lang="scss">

</style>
