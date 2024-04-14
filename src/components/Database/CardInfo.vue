<template>
  <div>
    <div>
      <h4>{{ card.cardName }}</h4>
    </div>
    <div>
      <div>
        <div>
          <img :src="imageUrl!" @load="handleImageLoad" />
        </div>
        <div>
          <p><strong>ID:</strong> {{ card.cardId }}</p>
          <p><strong>Category:</strong> {{ card.cardCategory }}</p>
          <p><strong>Color:</strong> {{ card.cardColor }}</p>
          <p><strong>Life:</strong> {{ card.cardLife }}</p>
          <p><strong>Cost:</strong> {{ card.cardCost }}</p>
          <p><strong>Power:</strong> {{ card.cardPower }}</p>
          <p><strong>Attribute:</strong> {{ card.cardAttribute }}</p>
          <p><strong>Blocker:</strong> {{ card.cardBlocker }}</p>
          <p><strong>Description:</strong> {{ card.cardDescription }}</p>
          <p><strong>Type:</strong> {{ card.cardType }}</p>
          <p><strong>Status:</strong> {{ card.cardStatus }}</p>
          <p><strong>Booster:</strong> {{ card.cardBooster }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    card: {
      type: Object as () => {
        cardName: string;
        cardId: string;
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
      },
      required: true,
    },
  },
  data() {
    return {
      imageUrl: null as string | null,
    };
  },
  methods: {
    async getImage(cardId: string, cardImages: string) {
      const parts = cardId.split("-");
      const prefix = parts[0];
      const imageFile = cardImages.split(", ")[0];

      try {
        // Use import to dynamically load the image
        const imageUrl = await import(
          `../../assets/images/cards/${prefix}/${imageFile}.png`
        );
        return imageUrl.default;
      } catch (error) {
        console.error("Error loading image:", error);
        return null;
      }
    },
    handleImageLoad() {
      this.$forceUpdate();
    },
  },
  async mounted() {
    this.imageUrl = await this.getImage(this.card.cardId, this.card.cardImages);
  },
});
</script>

<style scoped></style>
