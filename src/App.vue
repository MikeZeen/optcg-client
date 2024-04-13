<template lang="html">
  <div id="app">
    <div> <!-- Use Materialize row class -->
      <MainMenu/> <!-- Use col s2 to span 2 columns and full-height to make it full height -->
      <router-view/> <!-- Use col s10 to span 10 columns -->
    </div>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue'
export default {
  name: 'App',
  components: {
    MainMenu
  }
}
</script>

<style scoped>
/* You can add scoped styles here if necessary */
.full-height {
  height: 100vh; /* Set height to 100% of viewport height */
}
</style>
