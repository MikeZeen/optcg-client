<template>
  <div class="card-wrapper">
    <div class="card-details">
      <img :src="imageUrl!" @load="handleImageLoad" class="card-image"/>
      <div>
        <div class="card-info-row">
          <h2>{{ card.cardName }}</h2>
          <span class="card-color">{{ card.cardColor }}</span>
          <span class="card-category">{{ card.cardCategory }}</span>
          <span class="card-id">{{ card.cardId }}</span>
        </div>
        <div class="card-info-row">
          <span class="card-life" v-if="card.cardLife != 0">
            <v-icon name="bi-heart-fill" scale="1.2" />
            {{ card.cardLife }}
            </span>
          <span class="card-cost" v-if="card.cardCost != 0">
            <v-icon name="gi-two-coins" scale="1.2"/>
            {{ card.cardCost }}
          </span>
          <span class="card-power" v-if="card.cardCategory != 'Event'">
            <v-icon name="gi-pointy-sword" scale="1.2"/>
            {{ card.cardPower }}
          </span>
          <span class="card-blocker" v-if="card.cardBlocker != 0">
            <v-icon name="bi-lightning-charge-fill" scale="1.2"/>
            +{{ card.cardBlocker }}
          </span>
        </div>
        <div class="card-info-row" v-if="card.cardCategory != 'Event'">
          <span class="card-attributes">
            <strong>Attribute:</strong> {{ card.cardAttribute }}
          </span>
        </div>
        <div class="card-info-row" v-if="card.cardDescription != ''">
          <span class="card-description" ><strong>Description:</strong> <br />
            {{ card.cardDescription }}
          </span>
        </div>
        <div class="card-info-row">
          <span class="card-types">
            <strong>Type:</strong> {{ card.cardType.replace(", ", "/") }}</span>
        </div>
        <div class="card-info-row">
            <span class="card-legality">{{ card.cardStatus }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addIcons } from 'oh-vue-icons';
import { BiHeartFill, BiLightningChargeFill } from "oh-vue-icons/icons";
import { FaDollarSign} from "oh-vue-icons/icons";
import { GiTwoCoins, GiPointySword} from "oh-vue-icons/icons";

import { defineComponent } from "vue";

addIcons( GiPointySword, 
          GiTwoCoins, 
          BiHeartFill, 
          BiLightningChargeFill)

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
