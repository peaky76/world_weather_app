<template>
  <div>
    <input
      id="search-form"
      :class="`tint-` + colourScheme"
      v-on:input="handleInput"
      type="text"
      v-model="searchTerm"
    />
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "search-form",
  props: ["colourScheme"],
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

<style>
#search-form {
  width: 85%;
  padding: 0.5rem;
  color: inherit;
  font-family: inherit;
  font-size: 2.44rem;
  text-align: right;
}
</style>