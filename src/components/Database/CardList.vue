<template lang="html">
  <div class="database-wrapper">
    <div class="pagination" v-if="totalPages >= 1">
      <div class="pagination-buttons">
        <button :disabled="currentPage <= 1" @click="prevPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage >= totalPages" @click="nextPage">
          Next
        </button>
      </div>
      <transition name="opacity">
        <div class="searchbar-wrapper" v-if="!advancedSearch">
          <CardSearch @updateSearch="handleSearchUpdate" />
          <a @click="advancedSearch = !advancedSearch"
            ><v-icon name="gi-hamburger-menu" class="icon-big" scale="2"
          /></a>
        </div>
      </transition>
      <select v-model="perPage" @change="changeResultsPerPage" class="results">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <button @click="displayMode = 'full'">Full View</button>
      <button @click="displayMode = 'image'">Image View</button>
    </div>
    <transition name="slide">
      <AdvancedCardSearch
        v-if="advancedSearch"
        @toggle-search="advancedSearch = !advancedSearch"
        @advancedSearch="fetchCards"
      />
    </transition>
    <div v-if="fetchFailed" :class="['cards-failed', { cards: !fetchFailed }]">
      <div class="failed">
        <h1>Failed to find any cards!</h1>
      </div>
    </div>
    <transition-group
      name="card"
      tag="div"
      :class="['cards-failed', { cards: !fetchFailed }]"
      :data-display-mode="displayMode"
    >

    <CardInfo
      v-if="!fetchFailed && displayMode === 'full'"
      v-for="(card, index) in cards"
      :key="card.cardId"
      :card="card"
    />

    <CardImage
      v-if="!fetchFailed && displayMode === 'image'"
      v-for="(card, index) in cards"
      :key="card.cardId"
      :card="card"
    />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import CardInfo from "./CardInfo.vue";
import CardImage from "./CardImage.vue";
import { config } from "@/config";
import CardSearch from "./CardSearch.vue";
import AdvancedCardSearch from "./AdvancedCardSearch.vue";
import { GiHamburgerMenu } from "oh-vue-icons/icons";
import { addIcons } from "oh-vue-icons";

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

addIcons(GiHamburgerMenu);

export default defineComponent({
  components: {
    CardInfo,
    CardImage,
    CardSearch,
    AdvancedCardSearch,
  },
  setup() {
    const savedSettings = JSON.parse(localStorage.getItem('cardSettings') || '{}');
    const fetchFailed = ref(savedSettings.fetchFailed !== undefined ? savedSettings.fetchFailed : false);
    const allCards = ref(savedSettings.allCards || []);
    const cards = ref(savedSettings.cards || []);
    const currentPage = ref(savedSettings.currentPage !== undefined ? savedSettings.currentPage : 1);
    const perPage = ref(savedSettings.perPage !== undefined ? savedSettings.perPage : 10);
    const totalPages = ref(savedSettings.totalPages !== undefined ? savedSettings.totalPages : 1);
    const advancedSearch = ref(savedSettings.advancedSearch !== undefined ? savedSettings.advancedSearch : false);
    const displayMode = ref(savedSettings.displayMode || 'full');

    const fetchCards = async (
      searchTerm?: string | Record<string, any>,
      searchParams?: Record<string, any>
    ) => {
      try {
        fetchFailed.value = false;
        let url = `${config.baseURL}/cards`;
        let queryParams = [];

        if (typeof searchTerm === "string") {
          url += `/search?CardName=${searchTerm}`;
        } else if (typeof searchTerm === "object") {
          url += `/search`;
          for (const key in searchTerm) {
            if (searchTerm[key]) {
              queryParams.push(`${key}=${encodeURIComponent(searchTerm[key])}`);
            }
          }
        } else if (searchParams) {
          url += `/search`;
          for (const key in searchParams) {
            if (searchParams[key]) {
              queryParams.push(
                `${key}=${encodeURIComponent(searchParams[key])}`
              );
            }
          }
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();

        // Log the actual response data for debugging
        console.log("Response data:", data);

        // Check if the response data includes the 'cards' property
        if (!data.hasOwnProperty("cards") || !Array.isArray(data.cards)) {
          throw new Error(
            "Invalid response format: 'cards' property is missing or not an array"
          );
        }

        allCards.value = data.cards;
        totalPages.value = Math.ceil(allCards.value.length / perPage.value) || 1; // Update totalPages when allCards or perPage changes
        currentPage.value = 1; // Reset currentPage
        paginateCards(); // Paginate cards with updated values
      } catch (error) {
        console.error(error);
        fetchFailed.value = true;
      }
    };

    const paginateCards = () => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = Math.min(startIndex + perPage.value, allCards.value.length);
      cards.value = allCards.value.slice(startIndex, endIndex);
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

    onMounted(fetchCards);

    watch(currentPage, () => {
      paginateCards();
    });

    watch(perPage, () => {
      currentPage.value = 1;
      changeResultsPerPage();
    });

    watch([fetchFailed, allCards, cards, currentPage, perPage, totalPages, advancedSearch, displayMode], () => {
      const settingsToSave = {
        fetchFailed: fetchFailed.value,
        allCards: allCards.value,
        cards: cards.value,
        currentPage: currentPage.value,
        perPage: perPage.value,
        totalPages: totalPages.value,
        advancedSearch: advancedSearch.value,
        displayMode: displayMode.value
      };
      localStorage.setItem('cardSettings', JSON.stringify(settingsToSave));
    }, { deep: true });

    const handleSearchUpdate = (searchTerm: string) => {
      fetchCards(searchTerm);
    };

    return {
      fetchFailed,
      allCards,
      cards,
      currentPage,
      perPage,
      totalPages,
      fetchCards,
      handleSearchUpdate,
      prevPage,
      nextPage,
      changeResultsPerPage,
      advancedSearch,
      displayMode,
    };
  },
});
</script>
