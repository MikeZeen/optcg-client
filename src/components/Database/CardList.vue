<template lang="html">
  <div class="database-wrapper">
    <div class="pagination" v-if="totalPages > 1">
      <div class="pagination-buttons">
        <button :disabled="currentPage <= 1" @click="prevPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage >= totalPages" @click="nextPage">
          Next
        </button>
      </div>
      <SearchBar @updateSearch="handleSearchUpdate" />
      <select v-model="perPage" @change="changeResultsPerPage" class="results">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div :class="['cards-failed', { 'cards': !fetchFailed }]">
      <div class="failed" v-if="fetchFailed">
        <h1>Failed to find any cards!</h1>
      </div>
      <CardInfo
        v-for="card in cards"
        v-if="!fetchFailed"
        :key="card.cardId.toString()"
        :card="card"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import CardInfo from "./CardInfo.vue";
import SearchBar from "./Searchbar.vue";

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
    SearchBar
  },
  setup() {
    const fetchFailed = ref(false);
    const allCards = ref<Card[]>([]);
    const cards = ref<Card[]>([]);
    const currentPage = ref(1);
    const perPage = ref(10);
    const totalPages = ref(1);

    const fetchAllCards = async () => {
      try {
        fetchFailed.value = false;
        const url = `https://localhost:7241/cards`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        if (!data) {
          throw new Error("Empty response");
        }
        allCards.value = data.cards;
        totalPages.value = Math.ceil(allCards.value.length / perPage.value);
        paginateCards();
      } catch (error) {
        console.error(error);
        fetchFailed.value = true;
      }
    };

    const paginateCards = () => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      cards.value = allCards.value.slice(startIndex, endIndex);
    };

    const searchNameCards = async (searchTerm: string) => {
      try {
        fetchFailed.value = false;
        const url = `https://localhost:7241/cards/search?CardName=${searchTerm}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to search cards");
        }
        const data = await response.json();
        if (!response) {
          throw new Error("Empty response");
        }
        allCards.value = data.cards;
        totalPages.value = Math.ceil(allCards.value.length / perPage.value);
        paginateCards();
      } catch (error) {
        console.error('searchNameCards error:', error);
        fetchFailed.value = true;
      }
    };

    const handleSearchUpdate = (searchTerm: string) => {
      searchNameCards(searchTerm)
        .then(response => console.log('searchNameCards response:', response))
        .catch(error => console.error('searchNameCards error:', error));
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        paginateCards();
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        paginateCards();
      }
    };

    const changeResultsPerPage = () => {
      totalPages.value = Math.ceil(allCards.value.length / perPage.value);
      paginateCards();
    };

    onMounted(fetchAllCards);

    watch(currentPage, () => {
      paginateCards();
    });

    watch(perPage, () => {
      changeResultsPerPage();
    });

    return {
      fetchFailed,
      allCards,
      cards,
      currentPage,
      perPage,
      totalPages,
      fetchAllCards,
      searchNameCards,
      handleSearchUpdate,
      prevPage,
      nextPage,
      changeResultsPerPage,
    };
  },
});
</script>
