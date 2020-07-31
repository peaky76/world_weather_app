<template>
  <div id="main">
    <header>
      <h1>PEAKY'S WEATHER APP</h1>
    </header>
    <section id="search">
      <search-form></search-form>
      <!-- <search-results :results="searchResults"></search-results> -->
    </section>
    <section id="content">
      <favourite-locations :locations="favouriteLocations"></favourite-locations>
      <location-forecasts :forecasts="summaryForecasts"></location-forecasts>
    </section>
  </div>
</template>

<script>
import SearchForm from "./components/SearchForm";
// import SearchResults from "./components/SearchResults";
import FavouriteLocations from "./components/FavouriteLocations";
import LocationForecasts from "./components/LocationForecasts";
import moment from "moment-timezone";
import { eventBus } from "./main.js";

export default {
  name: "weather-app",
  data() {
    return {
      searchTerm: "",
      // searchResults: [],

      selectedLocation: { name: "Bradford", lat: 53.79391, lon: -1.75206 },
      selectedDay: "",
      timedForecasts: [],

      favouriteLocations: [],
      forecastEndPointBase:
        "https://api.met.no/weatherapi/locationforecast/2.0/complete?",
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
    forecastEndPoint() {
      return (
        this.forecastEndPointBase +
        "lat=" +
        this.selectedLocation.lat +
        "&lon=" +
        this.selectedLocation.lon
      );
    },
    summaryForecasts() {
      return this.timedForecasts
        .filter((forecast) => this.isInNextSevenDays(forecast.time))
        .filter((forecast) => this.isSixOrTwelveOclock(forecast.time))
        .map((forecast) => this.createSummaryForecast(forecast));
    },
  },
  components: {
    "search-form": SearchForm,
    // "search-results": SearchResults,
    "favourite-locations": FavouriteLocations,
    "location-forecasts": LocationForecasts,
  },
  mounted() {
    // Get forecast for selected location
    fetch(this.forecastEndPoint)
      .then((response) => response.json())
      .then((data) => (this.timedForecasts = data.properties.timeseries));

    eventBus.$on("search-term", (term) => {
      this.searchTerm = term;
    });
  },
  methods: {
    isInNextSevenDays(date_str) {
      let now = moment();
      let dateToTest = moment(date_str);
      return dateToTest.diff(now, "days") < 7;
    },
    isSixOrTwelveOclock(date_str) {
      let dateToTest = moment(date_str);
      return dateToTest.hour() % 6 == 1;
    },
    createSummaryForecast(forecast) {
      let summary = Object({
        time: forecast.time,
        temp: forecast.data.instant.details.air_temperature,
        symbol: forecast.data.next_6_hours.summary.symbol_code,
        rain: forecast.data.next_6_hours.details.precipitation_amount,
      });
      return summary;
    },
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
  margin-bottom: 1.5rem;
}
</style>
