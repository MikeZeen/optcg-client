<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="searchTerm" class="searchbar" type="text" placeholder="Search..."/>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('updateSearch', this.searchTerm);
    }
  }
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
