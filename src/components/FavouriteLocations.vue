<template>
  <ul v-if="locations.length">
    <span id="favs-label">Favourites:</span>
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

<style scoped>
ul {
  display: flex;
  align-items: center;
}
#favs-label {
  font-variant: small-caps;
  margin-right: 1rem;
}
</style>