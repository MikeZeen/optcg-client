<template>
  <div class="card box">
    <h2 class="card-header-title">{{ card.cardName }}</h2>
    <div class="card-content">
      <p>
        <strong>ID:</strong> {{ card.cardId }}
      </p>
      <p>
        <strong>Category:</strong> {{ card.cardCategory }}
      </p>
      <p>
        <strong>Color:</strong> {{ card.cardColor }}
      </p>
      <p>
        <strong>Life:</strong> {{ card.cardLife }}
      </p>
      <p>
        <strong>Cost:</strong> {{ card.cardCost }}
      </p>
      <p>
        <strong>Power:</strong> {{ card.cardPower }}
      </p>
      <p>
        <strong>Attribute:</strong> {{ card.cardAttribute }}
      </p>
      <p>
        <strong>Blocker:</strong> {{ card.cardBlocker }}
      </p>
      <p>
        <strong>Description:</strong> {{ card.cardDescription }}
      </p>
      <p>
        <strong>Type:</strong> {{ card.cardType }}
      </p>
      <p>
        <strong>Status:</strong> {{ card.cardStatus }}
      </p>
      <p>
        <strong>Booster:</strong> {{ card.cardBooster }}
      </p>
      <img :src="imageUrl" @load="handleImageLoad" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      imageUrl: null,
    };
  },
  methods: {
    async getImage(cardId, cardImages) {
      const parts = cardId.split('-');
      const prefix = parts[0];
      const imageFile = cardImages.split(", ")[0];

      try {
        const imageUrl = require(`@/assets/images/cards/${prefix}/${imageFile}.png`);
        return imageUrl;
      } catch (error) {
        console.error("Error loading image:", error);
        return null; 
      }
    },
    handleImageLoad() {
      this.$forceUpdate(); // Force re-render of the component
    },
  },
  async mounted() {
    this.imageUrl = await this.getImage(this.card.cardId, this.card.cardImages);
  },
};
</script>

<style scoped>
/* Your component styles */
</style>
