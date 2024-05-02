<template lang="html">
  <div>
    <ul class="menu-list">
      <img src="/Logo.png" class="logo"/>
      <router-link to="/" tag="li" class="menu-item"><a>News</a></router-link>
      <router-link to="/db" tag="li" class="menu-item"><a>Database</a></router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainMenu",
});
</script>

<style scoped>
.logo{
  width: 80%;
  margin: auto;
}
</style>
