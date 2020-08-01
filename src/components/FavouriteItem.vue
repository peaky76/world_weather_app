<template>
  <li>
    <button v-on:click="handleCancel" :id="`cancel-fav-` + location.name">X</button>
    <button v-on:click="handleSelect" :id="`select-fav-` + location.name">{{location.name}}</button>
  </li>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "favourite-item",
  props: ["location"],
  methods: {
    handleCancel() {
      eventBus.$emit("remove-favourite", this.location);
    },
    handleSelect() {
      eventBus.$emit("selected-location", this.location);
    },
  },
};
</script>

<style>
favourite-item {
  background-color: lightblue;
}
</style>