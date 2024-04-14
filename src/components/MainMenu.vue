<template lang="html">
  <div>
    <ul class="menu-list">
      <li class="menu-item"><router-link to="/">Home</router-link></li>
      <li class="menu-item"><router-link to="/db">Database</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainMenu",
});
</script>

<style scoped></style>
