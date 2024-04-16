<template>
  <div class="card-wrapper">
    <div class="card-details">
      <img :src="imageUrl!" @load="handleImageLoad" class="card-image"/>
      <div>
        <div class="card-info-row">
          <h2>{{ card.cardName }}<span> </span></h2>
          <h2 style="text-decoration: none;">{{ card.cardId }}</h2>
        </div>
        <div class="card-info-row">
          <span class="card-color">{{ card.cardColor }}</span>
          <span class="card-category">{{ card.cardCategory }}</span>
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
          <div v-html="highlightedDescription"></div>
          </span>
        </div>
        <div class="card-info-row">
          <span class="card-types">
            <strong>Type:</strong> {{ card.cardType.replace(", ", "/") }}</span>
        </div>
        <div class="card-info-row">
            <span class="card-legality">{{ card.cardStatus.toLowerCase() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addIcons } from 'oh-vue-icons';
import { BiHeartFill, BiLightningChargeFill } from "oh-vue-icons/icons";
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
      //*Blue *//
      effects: ["\\[On Play\\]", "\\[Activate: Main\\]", 
                "\\[On K.O.\\]", "\\[Your Turn\\]", 
                "\\[Opponent's Turn\\]", "\\[When Attacking\\]",
                "\\[Main\\]", "\\[On Block\\]", "\\[End of your Turn\\]",
                "\\[End of Opponent's Turn\\]", "\\[On Your Opponent's Attack\\]"],

      //*Orange *//
      keywords: ["\\[Blocker\\]", "\\[Rush\\]", "\\[Double Attack\\]", "\\[Banish\\]"],

      //*Yellow *//
      trigger : ["\\[Trigger\\]"],

      //*Pink *//
      restriction : ["\\[Once Per Turn\\]"],

      //*Black *//
      donNumber : 0,
      donX : [`\\[DON!!x${this.donNumber}\\]`],
      donMinus : [`\\[DON!!-${this.donNumber}\\]`]

    };
  },
  computed: {
    formattedDescription(){
      return this.card.cardDescription;
    },
    highlightedDescription() {
      let description = this.formattedDescription;
      [...this.effects, ...this.keywords, ...this.trigger, ...this.restriction].map(effect => {
        const regex = new RegExp(`(${effect})([^\\[]*)`, 'g');
        description = description.replace(regex, (match, p1, p2, offset, string) => {
          const effectWithoutBrackets = p1.replace(/\\?\[/g, '').replace(/\\?\]/g, '');
          let className;
          if (this.effects.includes(effect)) {
            className = 'bg-blue keyword';
          } else if (this.keywords.includes(effect)) {
            className = 'bg-orange keyword';
          } else if (this.trigger.includes(effect)) {
            className = 'bg-yellow keyword';
          } else if (this.restriction.includes(effect)) {
            className = 'bg-pink keyword';
          }
          return `<strong class="${className}">${effectWithoutBrackets}</strong>${p2}`;
        });
      });

      if (/\[DON!! x\d+\]|DON!! −\d+/.test(description)) {
        const donRegex = /\[DON!! x\d+\]|DON!! −\d+/g;
        description = description.replace(donRegex, (match) => {
          // Remove brackets from the matched string
          const matchWithoutBrackets = match.replace(/[\[\]]/g, '');
          return `<strong class="bg-black keyword">${matchWithoutBrackets}</strong>`;
        });
      }

      return description;
    }
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
