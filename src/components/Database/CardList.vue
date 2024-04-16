<template lang="html">
  <div class="database-wrapper">
    <div class="pagination" v-if="totalPages > 1">
      <button v-if="currentPage > 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
      <label for="results-per-page">Results per page:</label>
      <select id="results-per-page" v-model="perPage" @change="changeResultsPerPage">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="cards">
      <CardInfo
      v-for="card in cards"
      :key="card.cardId.toString()"
      :card="card"
    />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import CardInfo from "./CardInfo.vue";

interface Card {
  cardId: string;
  cardName: string;
  cardCategory: string;
  cardColor: string;
  cardLife: string;
  cardCost: string;
  cardPower: string;
  cardAttribute: string;
  cardBlocker: string;
  cardDescription: string;
  cardType: string;
  cardStatus: string;
  cardBooster: string;
  cardImages: string;
}

export default defineComponent({
  components: {
    CardInfo,
  },
  setup() {
    const cards = ref<Card[]>([]);
    const currentPage = ref(1);
    const perPage = ref(10);
    const totalPages = ref(1);

    const fetchCards = async () => {
      try {
        const url = `https://localhost:7241/cards/page=${currentPage.value}&perPage=${perPage.value}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        if (!data) {
          throw new Error("Empty response");
        }
        console.log(data);
        cards.value = data.cards;
        totalPages.value = Math.ceil(data.totalCards / perPage.value);
      } catch (error) {
        console.error(error);
      }
    };

    const changeResultsPerPage = () => {
      currentPage.value = 1;
      fetchCards();
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    watch(currentPage, fetchCards);
    watch(perPage, fetchCards);

    onMounted(fetchCards);

    return {
      cards,
      currentPage,
      perPage,
      totalPages,
      fetchCards,
      prevPage,
      nextPage,
      changeResultsPerPage,
    };
  },
});
</script>

<style scoped></style>