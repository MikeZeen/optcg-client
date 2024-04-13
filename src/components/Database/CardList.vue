<template>
  <div>
    <div v-if="totalPages > 1">
      <button v-if="currentPage > 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
    </div>

    <div v-for="card in cards" :key="card.cardId">
      <CardInfo :card="card" />
    </div>
  </div>
</template>

<script>
import CardInfo from "./CardInfo.vue";

export default {
  components: {
    CardInfo,
  },
  data() {
    return {
      cards: [],
      currentPage: 1,
      perPage: 10,
      totalPages: 1,
    };
  },
  created() {
    this.fetchCards();
  },
  watch: {
    currentPage: {
      handler() {
        this.fetchCards();
      },
      immediate: true
    },
    perPage: {
      handler() {
        this.fetchCards();
      },
      immediate: true
    }
  },
  methods: {
    async fetchCards() {
      try {
        const url = `https://localhost:7241/cards/page=${this.currentPage}&perPage=${this.perPage}`;
        const response = await fetch(url);
        const data = await response.json();
        this.cards = data.cards;
        this.totalPages = Math.ceil(data.totalCards / this.perPage);
      } catch (error) {
        console.error(error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
};
</script>

<style scoped>
</style>
