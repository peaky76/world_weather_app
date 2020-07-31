<template>
  <div>
    <input v-on:input="handleSearchInput" id="search-box" type="text" v-model="searchTerm" />
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "search-form",
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    handleSearchInput() {
      eventBus.$emit("search-term", this.searchTerm);
    },
  },
};
</script>

<style scoped>
</style>