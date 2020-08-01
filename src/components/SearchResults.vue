<template>
  <ul id="search-results" v-if="results">
    <search-result-item v-for="(result, index) in firstTenResults" :key="index" :result="result"></search-result-item>
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
  computed: {
    firstTenResults() {
      return this.results.slice(0, 10);
    },
  },
};
</script>

<style>
#search-results {
  display: flex;
  flex-direction: column;
}
</style>