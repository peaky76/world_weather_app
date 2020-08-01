<template>
  <div id="main">
    <section id="favourites">
      <favourite-locations :locations="favouriteLocations"></favourite-locations>
    </section>
    <section id="search">
      <search-form :locations="locations"></search-form>
      <!-- <search-results :results="searchResults"></search-results> -->
    </section>
    <section id="forecasts">
      <location-forecasts
        :forecasts="summaryForecasts"
        :location="selectedLocation"
        :selectedDate="selectedDate"
        :inFavourites="isSelectedInFavourites"
      ></location-forecasts>
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
      //searchTerm: "",
      // searchResults: [],

      selectedLocation: null,
      selectedDate: moment(),
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
        { name: "Moscow", lat: 55.751244, lon: 37.618423 },
      ],
    };
  },
  computed: {
    forecastEndPoint() {
      if (this.selectedLocation) {
        return (
          this.forecastEndPointBase +
          "lat=" +
          this.selectedLocation.lat +
          "&lon=" +
          this.selectedLocation.lon
        );
      } else {
        return;
      }
    },
    isSelectedInFavourites() {
      return this.favouriteLocations.includes(this.selectedLocation);
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
    eventBus.$on("selected-date", (date) => {
      this.selectedDate = date;
    });
    eventBus.$on("selected-location", (location) => {
      this.selectedLocation = location;
      this.fetchForecastData();
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
          .then((data) => (this.timedForecasts = data.properties.timeseries));
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
body {
  margin: 0;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style-type: none;
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
  width: 100vw;
  height: 100vh;
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
  display: block;
  height: 50px;
  width: 100%;
  padding-left: 25%;
  background: palevioletred;
}
#search {
  width: calc(25% - 1.5rem);
  float: left;
  padding-right: 1.5rem;
  background: paleturquoise;
}
#forecasts {
  width: 75%;
  float: right;
  background: palegoldenrod;
}
</style>
