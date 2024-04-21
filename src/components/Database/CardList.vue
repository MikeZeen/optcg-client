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
    >
      <CardInfo
        v-if="!fetchFailed"
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
    CardSearch,
    AdvancedCardSearch,
  },
  setup() {
    const fetchFailed = ref(false);
    const allCards = ref<Card[]>([]);
    const cards = ref<Card[]>([]);
    const currentPage = ref(1);
    const perPage = ref(10);
    const totalPages = ref(1);
    const advancedSearch = ref(false);

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
        totalPages.value = Math.ceil(allCards.value.length / perPage.value);

        currentPage.value = 1;

        setTimeout(() => {
          allCards.value = data.cards;
          totalPages.value = Math.ceil(allCards.value.length / perPage.value);
          currentPage.value = 1;
          paginateCards();
        }, 150);
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
      changeResultsPerPage();
    });

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
    };
  },
});
</script>
