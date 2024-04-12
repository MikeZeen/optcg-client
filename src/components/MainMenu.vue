<template lang="html">
  <div>
    <div class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="db">Database</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
