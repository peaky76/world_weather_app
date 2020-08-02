<template>
  <div id="main" :class="colourScheme">
    <label id="toggle">
      <input v-on:change="handleColourChange" type="checkbox" />
      <span class="slider round" :class="`tint-` + colourScheme"></span>
    </label>
    <section id="favourites">
      <favourite-locations :locations="favouriteLocations"></favourite-locations>
    </section>
    <section id="search">
      <search-form :colourScheme="colourScheme"></search-form>
      <search-results :results="searchResults"></search-results>
    </section>
    <section id="forecasts">
      <location-forecasts
        :forecastsByDate="groupedForecastsByDate"
        :location="selectedLocation"
        :isInFavourites="isSelectedInFavourites"
        :colourScheme="colourScheme"
      ></location-forecasts>
      <footer>* Times are UTC+0:00 / Cities data from simplemaps.com / Weather data from Meteorologisk Institutt, Norway</footer>
    </section>
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
      cities: [],
      colourScheme: "dusk",
      selectedLocation: "",
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
        return moment.utc(forecast.time).format("ddd D MMM");
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
    this.cities = json;
    this.selectedLocation = this.cities.find(
      (location) => location.city == "Edinburgh"
    );
    this.fetchForecastData();

    this.scheme = this.$colourScheme;
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
    handleColourChange() {
      if (this.colourScheme === "dusk") {
        this.colourScheme = "dawn";
      } else {
        this.colourScheme = "dusk";
      }
    },
    isInNextSevenDays(date_str) {
      let now = moment.utc();
      let dateToTest = moment.utc(date_str);
      return dateToTest.diff(now, "days") < 7;
    },
    isSixOrTwelveOclock(date_str) {
      let dateToTest = moment.utc(date_str);
      return dateToTest.hour() % 6 == 0;
    },
    createSummaryForecast(forecast) {
      let summary = Object({
        time: forecast.time,
        temp: forecast.data.instant.details.air_temperature,
        symbol: forecast.data.next_6_hours.summary.symbol_code,
        rain: forecast.data.next_6_hours.details.precipitation_amount,
        wind: forecast.data.instant.details.wind_speed,
        windDirection: forecast.data.instant.details.wind_from_direction,
      });
      return summary;
    },
  },
};
</script>

<style>
/* Colour Scheme */
.dusk {
  background-color: #183642;
  color: #f4f3ee;
  border-color: #f4f3ee;
}
.dawn {
  background-color: #f6c324;
  color: #07090f;
  border-color: #07090f;
}
.tint-dusk {
  background-color: #2f4a55;
}
.gradient-dusk {
  background-image: linear-gradient(#2f4a55, #183642);
}
.tint-dawn {
  background-color: #f8cf50;
}
.gradient-dawn {
  background-image: linear-gradient(#f8cf50, #f6c324);
}

/* Page parts */
body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  font-family: "Marcellus", serif;
}
button {
  background-color: inherit;
  color: inherit;
  border: none;
}
button:focus,
input:focus {
  outline: none;
}
ul,
fieldset {
  padding: 0;
  margin: 0;
  border: none;
}
li {
  list-style-type: none;
}
footer {
  width: 100%;
  margin-top: 1rem;
  margin-right: 1rem;
  text-align: left;
  font-size: 0.64rem;
}

.radio-container {
  display: inline-block;
  height: 100%;
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
input[type="radio"] label:hover {
  cursor: pointer;
}

#main {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}
#main header {
  width: 100%;
}
#main section {
  background-color: inherit;
}
#search > *,
#content > * {
  margin-bottom: 1.5rem;
}
#favourites {
  height: 2.5rem;
  flex-basis: 100%;
  padding-top: 0.5rem;
  padding-left: calc(20% + 1.5rem);
}
#search {
  flex-basis: 20%;
  box-sizing: border-box;
  padding-right: 1.5rem;
  text-align: right;
}
#forecasts {
  flex-basis: 80%;
  box-sizing: border-box;
  border-color: inherit;
  border-style: groove;
  border-left-width: 0.25rem;
  border-top-width: 0.25rem;
  border-bottom: none;
  border-right: none;
  padding-left: 1.5rem;
  padding-top: 1.5rem;
}

/* Switch */
#toggle {
  position: fixed;
  top: 1rem;
  left: calc(100% - 3rem);
  display: inline-block;
  width: 2rem;
  height: 1.125rem;
}

#toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 0.875rem;
  width: 0.875rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:focus + .slider {
  box-shadow: 0 0 1px grey;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1rem);
  -ms-transform: translateX(1rem);
  transform: translateX(1rem);
}

/* Rounded sliders */
.slider.round {
  border-radius: 1rem;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
