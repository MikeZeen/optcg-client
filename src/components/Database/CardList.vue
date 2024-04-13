<template>
  <div>
    <div>
      <div v-if="totalPages > 1">
        <button v-if="currentPage > 1" @click="prevPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
      </div>
    </div>

    <div v-for="card in paginatedCards" :key="card.cardId">
      <CardInfo :card="card" />
    </div>

    <div>
      <div v-if="totalPages > 1">
        <button v-if="currentPage > 1" @click="prevPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
      </div>
    </div>

    <div>
      <div>
        <select v-model="perPage" @change="pageOptionsChanged">
          <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
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
      perPage: 25,
      perPageOptions: [10, 25, 50, 100],
      totalPages: 1,
    };
  },
  created() {
    this.fetchCards();
  },
  methods: {
    async fetchCards() {
      try {
        const url = "https://localhost:7241/cards";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.cards = data;
        this.totalPages = Math.ceil(this.cards.length / this.perPage);
      } catch (error) {
        console.error(error);
      }
    },
    prevPage() {
      this.currentPage = Math.max(1, this.currentPage - 1); // Ensure it doesn't go below 1
    },
    nextPage() {
      this.currentPage = Math.min(this.totalPages, this.currentPage + 1); // Ensure it doesn't go above totalPages
    },
    pageOptionsChanged() {
      this.perPage = event.target.value;
      this.totalPages = Math.ceil(this.cards.length / this.perPage);
    }
  },
  computed: {
    paginatedCards() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = Math.min(startIndex + this.perPage, this.cards.length);
      return this.cards.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
/* Your component styles */
</style>
