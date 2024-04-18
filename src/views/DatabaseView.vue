<template lang="html">
  <div>
    <CardList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardList from "../components/Database/CardList.vue";

export default defineComponent({
  components: {
    CardList,
  },
  name: "DatabaseView",
  data() {
    return {};
  },
});
</script>

<style scoped></style>
