<template>
    <div class="card-wrapper">
      <img :src="imageUrl" @load="handleImageLoad" class="card-image"/>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    props: {
      card: {
        type: Object as () => {
          cardId: string;
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