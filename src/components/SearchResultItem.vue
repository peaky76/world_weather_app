<template>
  <li v-on:click="handleClick" class="search-result-item">
    <span id="search-result-city" class="city">{{result.city}}</span>
    <br />
    <span id="search-result-admin" class="admin">{{result.admin_name}}</span>
    <span id="search-result-country" class="country">{{result.country}}</span>
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
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.search-result-item:hover {
  cursor: pointer;
}
.country,
.admin {
  text-transform: uppercase;
  color: grey;
  font-size: 0.64em;
}
.admin {
  font-style: italic;
}
.admin::after {
  content: ",\00a0";
}
</style>