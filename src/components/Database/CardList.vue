<template lang="html">
  <div>
    <div v-if="totalPages > 1">
      <button v-if="currentPage > 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
    </div>

    <CardInfo
      v-for="card in cards"
      :key="card.cardId.toString()"
      :card="card"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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

    return {
      cards,
      currentPage,
      perPage,
      totalPages,
      fetchCards,
      prevPage,
      nextPage,
    };
  },
  mounted() {
    // Call fetchCards when the component is mounted
    this.fetchCards();
  },
});
</script>

<style scoped></style>
