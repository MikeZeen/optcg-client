<template lang="html">
  <div>
    <div><h6>General</h6></div>
    <router-link to="/">Home</router-link>
    <router-link to="/db">Database</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // Import defineComponent from 'vue'

export default defineComponent({
  name: 'MainMenu',
});
</script>

<style scoped>
</style>