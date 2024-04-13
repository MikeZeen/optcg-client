<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainMenu from './components/MainMenu.vue'
</script>

<template lang="html">
  <div id="app">
    <div> 
      <MainMenu /> 
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
