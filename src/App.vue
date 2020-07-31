<template>
  <div id="main">
    <header>
      <h1>PEAKY'S WEATHER APP</h1>
    </header>
    <section id="search">
      <search-form></search-form>
      <search-results :results="searchResults"></search-results>
    </section>
    <section id="content">
      <favourite-locations :locations="favouriteLocations"></favourite-locations>
      <location-forecast :location="selectedLocation"></location-forecast>
    </section>
  </div>
</template>

<script>
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import FavouriteLocations from "./components/FavouriteLocations";
import LocationForecast from "./components/LocationForecast";
import { eventBus } from "./main.js";

export default {
  name: "weather-app",
  data() {
    return {
      searchTerm: "",
      selectedLocation: { name: "Bradford", lat: 53.79391, lon: -1.75206 },
      favouriteLocations: [],
      endPointBase:
        "https://api.met.no/weatherapi/locationforecast/2.0/complete?",
      searchResults: [],
      locations: [
        { name: "Edinburgh", lat: 55.953251, lon: -3.188267 },
        { name: "Glasgow", lat: 55.860916, lon: -4.251433 },
        { name: "Dundee", lat: 56.462002, lon: -2.9707 },
        { name: "Aberdeen", lat: 57.14748, lon: -2.0954 },
        { name: "Inverness", lat: 57.477772, lon: -4.224721 },
      ],
    };
  },
  computed: {
    searchEndPoint() {
      return (
        this.endPointBase +
        "lat=" +
        this.selectedLocation.lat +
        "&lon=" +
        this.selectedLocation.lon
      );
    },
  },
  components: {
    "search-form": SearchForm,
    "search-results": SearchResults,
    "favourite-locations": FavouriteLocations,
    "location-forecast": LocationForecast,
  },
  mounted() {
    fetch(this.searchEndPoint)
      .then((response) => response.json())
      .then((data) => (this.searchResults = data));

    eventBus.$on("search-term", (term) => {
      this.searchTerm = term;
    });
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
#search > *,
#content > * {
  display: block;
  border: 1px solid black;
  margin-bottom: 1.5rem;
}
</style>
