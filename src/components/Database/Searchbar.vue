<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <input v-model="searchTerm" class="searchbar" type="text" placeholder="Search..." />
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: ''
      };
    },
    methods: {
      handleSubmit() {
        // Emit the updateSearch event with the searchTerm
        this.$emit('updateSearch', this.searchTerm);
        // Clear the search term after emitting the event
        this.searchTerm = '';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  