<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="searchTerm" class="searchbar" type="text" :placeholder="placeholder" @focus="placeholder = ''" @blur="placeholder = 'Search by Name...'" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      searchTerm: '',
      placeholder: 'Search by Name...'
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

</style>
