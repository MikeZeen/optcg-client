<template>
  <div>
    <h1 class="is-primary">This is the Card Page</h1>
    <p>Card ID: {{ cardId }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'CardView',
  data () {
    return {
      cardId: '',
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const route = useRoute();
      this.cardId = route.params.cardId as string;
      // Fetch and display the card's details based on this.cardId
    }
  },
  created() {
    const route = useRoute();
    watch(() => route.params.cardId, (newCardId, oldCardId) => {
      if (newCardId !== oldCardId) {
        this.fetchData();
      }
    });
  }
})
</script>

<style scoped>

</style>