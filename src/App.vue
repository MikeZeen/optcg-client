<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MainMenu from "./components/MainMenu.vue";
</script>

<template lang="html">
  <div id="app">
    <div id="wrapper">
      <MainMenu class="main-menu" />
      <RouterView class="content" />
    </div>
  </div>
</template>

<style scoped></style>
