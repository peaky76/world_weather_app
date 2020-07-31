<template>
  <div id="main">
    <header>
      <h1>PEAKY'S WEATHER APP</h1>
    </header>
    <section id="lookup">
      <input id="search-box" type="text" />
      <search-results :results="searchResults"></search-results>
    </section>
    <section id="content">
      <favourite-locations :locations="favouriteLocations"></favourite-locations>
      <location-forecast :location="selectedLocation"></location-forecast>
    </section>
  </div>
</template>

<script>
import SearchResults from "./components/SearchResults";
import FavouriteLocations from "./components/FavouriteLocations";
import LocationForecast from "./components/LocationForecast";

export default {
  data() {
    return {
      searchTerm: "Hello",
      selectedLocation: "Bradford",
      favouriteLocations: ["Bradford"],
    };
  },
  computed: {
    searchResults() {
      return "Bradford";
    },
  },
  components: {
    "search-results": SearchResults,
    "favourite-locations": FavouriteLocations,
    "location-forecast": LocationForecast,
  },
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
#main {
  display: flex;
  flex-wrap: wrap;
}
#main header {
  width: 100%;
}
#main section {
  display: block;
  margin-right: 1.5rem;
}
#lookup > *,
#content > * {
  display: block;
  border: 1px solid black;
  margin-bottom: 1.5rem;
}
</style>
