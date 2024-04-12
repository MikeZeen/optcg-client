<template lang="html">
  <div id="app">
    <div class="columns is-flex">
      <Navbar class="column is-2"/>
      <router-view class="column is-10"/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
</style>
