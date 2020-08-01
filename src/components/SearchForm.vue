<template>
  <div>
    <select v-on:change="handleSelect" v-model="selectedLocation">
      <option
        v-for="(location, index) in locations"
        :key="index"
        :value="location"
      >{{location.name}}</option>
    </select>
    <!-- <input v-on:input="handleSearchInput" id="search-box" type="text" v-model="searchTerm" /> -->
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "search-form",
  props: ["locations"],
  data() {
    return {
      selectedLocation: "",
    };
  },
  methods: {
    handleSelect() {
      eventBus.$emit("selected-location", this.selectedLocation);
    },
  },
};
</script>

<style scoped>
</style>