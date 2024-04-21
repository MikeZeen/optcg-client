<template>
  <div class="adv-search-wrapper">
    <div class="adv-search">
      <div class="column">
        <input placeholder="Card ID" v-model="cardID" />
        <input placeholder="Card Name" v-model="cardName" />
        <input placeholder="Category" v-model="cardCategory" />
        <input placeholder="Type" v-model="cardType" />
        <div class="adv-search-numberinputs">
          <input
            placeholder="Life"
            min="0"
            type="number"
            class="numeric"
            v-model="cardLife"
          />
          <input
            placeholder="Power"
            min="0"
            type="number"
            class="numeric"
            v-model="cardPower"
          />
          <input
            placeholder="Blocker"
            min="0"
            type="number"
            class="numeric"
            v-model="cardBlocker"
            step="1000"
          />
          <input
            placeholder="Cost"
            min="0"
            type="number"
            class="numeric"
            v-model="cardCost"
          />
        </div>
        <input placeholder="Attribute" v-model="cardAttribute" />
        <input placeholder="Booster" v-model="cardBooster" />
      </div>
      <div class="column">
        <input placeholder="Color" v-model="cardColor" />
        <textarea
          placeholder="Description"
          class="input-description"
          v-model="cardDescription"
        ></textarea>
        <input placeholder="Status" v-model="cardStatus" />
        <div class="adv-search-buttons">
          <button @click="resetSearch" style="margin-left: auto;">Reset</button>
          <button @click="advancedSearch">Search</button>
          <a @click="toggleSearch" style="margin-left: auto;"
            ><v-icon name="ai-acclaim" class="icon-big" scale="2"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AiAcclaim } from "oh-vue-icons/icons";
import { addIcons } from "oh-vue-icons";

addIcons(AiAcclaim);

export default defineComponent({
  data() {
    return {
      cardID: "",
      cardCategory: "",
      cardName: "",
      cardColor: "",
      cardLife: null,
      cardCost: null,
      cardPower: null,
      cardAttribute: "",
      cardBlocker: null,
      cardDescription: "",
      cardType: "",
      cardStatus: "",
      cardBooster: "",
    };
  },
  methods: {
    toggleSearch() {
      this.$emit("toggleSearch");
    },
    resetSearch() {
      this.cardID = "";
      this.cardCategory = "";
      this.cardName = "";
      this.cardColor = "";
      this.cardLife = null;
      this.cardCost = null;
      this.cardPower = null;
      this.cardAttribute = "";
      this.cardBlocker = null;
      this.cardDescription = "";
      this.cardType = "";
      this.cardStatus = "";
      this.cardBooster = "";
    },
    advancedSearch() {
      this.$emit("advancedSearch", {
        cardID: this.cardID,
        cardCategory: this.cardCategory,
        cardName: this.cardName,
        cardColor: this.cardColor,
        cardLife: this.cardLife,
        cardCost: this.cardCost,
        cardPower: this.cardPower,
        cardAttribute: this.cardAttribute,
        cardBlocker: this.cardBlocker,
        cardDescription: this.cardDescription,
        cardType: this.cardType,
        cardStatus: this.cardStatus,
        cardBooster: this.cardBooster,
      });
    },
  },
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
