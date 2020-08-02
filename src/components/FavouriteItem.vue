<template>
  <li>
    <button class="fav-cancel" v-on:click="handleCancel" :id="`cancel-fav-` + location.id">X</button>
    <button
      class="fav-select"
      v-on:click="handleSelect"
      :id="`select-fav-` + location.id"
    >{{location.city}}</button>
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

<style scoped>
li {
  display: flex;
  align-items: center;
  border: 1px solid grey;
  border-radius: 1rem;
  overflow: hidden;
}
button {
  padding: 0.25rem 0.5rem;
}
button:hover {
  cursor: pointer;
}
.fav-cancel {
  border-right: 1px solid grey;
}
.fav-cancel:hover {
  background-color: red;
}
.fav-select:hover {
  background-color: goldenrod;
}
</style>