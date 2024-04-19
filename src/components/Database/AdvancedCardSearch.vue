<template>
    <div class="adv-search-wrapper">
      <div class="adv-search" >
        <div class="column">
            <input placeholder="Card ID" v-model="cardID"/>
            <input placeholder="Card Name" v-model="cardName"/>
            <input placeholder="Category" v-model="cardCategory"/>
            <input placeholder="Type" v-model="cardType"/>
            <div class="adv-search-numberinputs">
                <input placeholder="Life" min="0" type="number" class="numeric" v-model="cardLife"/>
                <input placeholder="Power" min="0" type="number" class="numeric" v-model="cardPower"/>
                <input placeholder="Blocker" min="0" type="number" class="numeric" v-model="cardBlocker" step="1000"/>
                <input placeholder="Cost" min="0" type="number" class="numeric" v-model="cardCost"/>
            </div>
            <input placeholder="Attribute" v-model="cardAttribute"/>
            <input placeholder="Booster" v-model="cardBooster"/>
        </div>
        <div class="column">
            <input placeholder="Color" v-model="cardColor"/>
            <textarea placeholder="Description" class="input-description" v-model="cardDescription"></textarea> 
            <input placeholder="Status" v-model="cardStatus"/>
            <div class="adv-search-buttons">
                <button>Search</button> 
                <button @click="toggleSearch">Simple Search</button>
            </div>
        </div>  
      </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
  
export default defineComponent({
    data() {
        return {
            cardID: '',
            cardCategory: '',
            cardName: '',
            cardColor: '',
            cardLife: null,
            cardCost: null,
            cardPower: null,
            cardAttribute: '',
            cardBlocker: null,
            cardDescription: '',
            cardType: '',
            cardStatus: '',
            cardBooster: '',
        };
    },
    methods: {
        toggleSearch(){
            this.$emit('toggleSearch')
        },

    }
});
</script>
  
<style scoped>
/* Add your scoped styles here */
</style>
