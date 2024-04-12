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
      <image src="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  methods:{

  }
};
</script>
.mb-1 {
  margin-bottom: 1rem;
}
<style scoped>
</style>