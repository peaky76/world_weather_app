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
  name: "Weather App",
  data() {
    return {
      searchTerm: "",
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
    "search-form": SearchForm,
    "search-results": SearchResults,
    "favourite-locations": FavouriteLocations,
    "location-forecast": LocationForecast,
  },
  mounted() {
    // fetch("https://restcountries.eu/rest/v2/all")
    //   .then((response) => response.json())
    //   .then((data) => (this.countries = data));

    // eventBus.$on("selected-country", (country) => {
    //   this.selectedCountry = country;
    // });

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
