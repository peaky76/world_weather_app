<template>
  <ul v-if="locations">
    <favourite-item v-for="(location, index) in locations" :key="index" :location="location"></favourite-item>
  </ul>
</template>

<script>
import FavouriteItem from "./FavouriteItem";

export default {
  name: "favourite-locations",
  props: ["locations"],
  components: {
    "favourite-item": FavouriteItem,
  },
};
</script>

<style>
</style>