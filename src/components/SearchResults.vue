<template>
  <ul v-if="results">
    <search-result-item
      v-for="(result, index) in results"
      :key="index"
      :result="result"
    >A found location.</search-result-item>
  </ul>
</template>

<script>
import SearchResultItem from "./SearchResultItem";

export default {
  name: "search-results",
  props: ["results"],
  components: {
    "search-result-item": SearchResultItem,
  },
};
</script>

<style>
search-result-item {
  background-color: palevioletred;
}
</style>