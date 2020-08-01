<template>
  <div>
    <input v-on:input="handleInput" type="text" v-model="searchTerm" />
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
    handleInput() {
      eventBus.$emit("search-term", this.searchTerm);
    },
  },
};
</script>

<style scoped>
</style>