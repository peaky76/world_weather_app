<template>
  <div id="main">
    <section id="favourites">
      <favourite-locations :locations="favouriteLocations"></favourite-locations>
    </section>
    <section id="search">
      <search-form></search-form>
      <search-results :results="searchResults"></search-results>
    </section>
    <section id="forecasts">
      <location-forecasts
        :forecastsByDate="groupedForecastsByDate"
        :location="selectedLocation"
        :isInFavourites="isSelectedInFavourites"
      ></location-forecasts>
    </section>
    <footer>Cities location data from https://simplemaps.com/data/world-cities</footer>
  </div>
</template>

<script>
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import FavouriteLocations from "./components/FavouriteLocations";
import LocationForecasts from "./components/LocationForecasts";

import groupBy from "lodash/groupBy";
import moment from "moment-timezone";
import { eventBus } from "./main.js";
import json from "./assets/simplemaps_worldcities/worldcities.json";

export default {
  name: "weather-app",
  data() {
    return {
      searchTerm: "",
      cities: json,
      // dataDump: "",
      selectedLocation: { name: "Edinburgh", lat: 55.953251, lng: -3.188267 },
      allForecastsForLocation: [],
      favouriteLocations: [],
      forecastEndPointBase:
        "https://api.met.no/weatherapi/locationforecast/2.0/complete?",
    };
  },
  computed: {
    forecastEndPoint() {
      return (
        this.forecastEndPointBase +
        "lat=" +
        this.selectedLocation.lat +
        "&lon=" +
        this.selectedLocation.lng
      );
    },
    groupedForecastsByDate() {
      // Group forecasts by date into a new object
      let grouped = groupBy(this.filteredForecasts, (forecast) => {
        return moment(forecast.time).format("ddd D MMM");
      });
      return grouped;
    },
    isSelectedInFavourites() {
      return this.favouriteLocations.includes(this.selectedLocation);
    },
    filteredForecasts() {
      return this.allForecastsForLocation
        .filter((forecast) => this.isInNextSevenDays(forecast.time))
        .filter((forecast) => this.isSixOrTwelveOclock(forecast.time))
        .map((forecast) => this.createSummaryForecast(forecast));
    },
    searchResults() {
      const matches = this.cities.filter((cityObj) => {
        const length = this.searchTerm.length;
        if (length === 0) {
          return true;
        }
        if (
          cityObj.city.toLowerCase().substring(0, length) ===
          this.searchTerm.toLowerCase()
        ) {
          return true;
        }
        return false;
      });
      return matches;
    },
  },
  components: {
    "search-form": SearchForm,
    "search-results": SearchResults,
    "favourite-locations": FavouriteLocations,
    "location-forecasts": LocationForecasts,
  },
  mounted() {
    this.fetchForecastData();

    eventBus.$on("selected-location", (location) => {
      this.selectedLocation = location;
      this.fetchForecastData();
    });
    eventBus.$on("search-term", (term) => {
      this.searchTerm = term;
    });
    eventBus.$on("add-favourite", (location) => {
      this.favouriteLocations.push(location);
    });
    eventBus.$on("remove-favourite", (location) => {
      let index = this.favouriteLocations.indexOf(location);
      this.favouriteLocations.splice(index, 1);
    });
  },
  methods: {
    fetchForecastData() {
      //   Gets forecast data for selected location
      if (this.selectedLocation) {
        fetch(this.forecastEndPoint)
          .then((response) => response.json())
          .then(
            (data) =>
              (this.allForecastsForLocation = data.properties.timeseries)
          );
      }
    },
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
/* Dusk
#0D2C54
#F4F3EE
#80475E */
html {
  font-size: 22px;
}
body {
  margin: 0;
  height: calc(100vh - 20rem);
  padding: 1rem;
  background-color: #183642;
  color: #f4f3ee;
}
ul,
fieldset {
  padding: 0;
  margin: 0;
}
li {
  list-style-type: none;
}
footer {
  width: 100%;
  margin-right: 1rem;
  text-align: right;
  font-size: 0.64rem;
}

.radio-container {
  display: inline-block;
  height: 100%;
  width: 5em;
  text-align: center;
}
input[type="radio"] {
  display: none;
  height: 100%;
  width: 100%;
}
input[type="radio"] label {
  display: none;
  height: 100%;
  width: 100%;
}
#main {
  width: 100%;
  height: 95%;
  padding-top: 5%;
}
#main header {
  width: 100%;
}
#main section {
  display: block;
}
#search > *,
#content > * {
  margin-bottom: 1.5rem;
}
#favourites {
  height: 2rem;
  width: 75%;
  padding-left: 25%;
}
#search {
  display: block;
  height: 50%;
  width: calc(20% - 1.625rem);
  float: left;
  padding-right: 1.5rem;
  border-right: 0.125rem groove #f4f3ee;
}
#forecasts {
  display: block;
  height: 50%;
  width: calc(80% - 6.5rem);
  float: right;
  padding-left: 1.5rem;
  padding-right: 5rem;
}
</style>
