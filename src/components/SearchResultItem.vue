<template>
  <li v-on:click="handleClick" class="search-result-item">
    <span class="city">{{result.city}}</span>
    <span class="country">{{result.country}}</span>
  </li>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "search-result-item",
  props: ["result"],
  methods: {
    handleClick() {
      eventBus.$emit("selected-location", this.result);
    },
  },
};
</script>

<style>
.search-result-item {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}
.search-result-item:hover {
  cursor: pointer;
}
.country {
  font-size: 0.64rem;
  text-transform: uppercase;
  color: grey;
}
.country::before {
  content: "\00a0";
}
</style>