<template>
  <div v-if="location">
    <header>
      <span id="selected-location">{{location.city}}</span>
      <button v-if="!isInFavourites" v-on:click="handleAddFav">Add to favourites</button>
    </header>
    <fieldset>
      <div class="radio-container" v-for="(date, index) in dates" :key="index">
        <input
          :id="`date-select-` + index"
          name="date-select"
          type="radio"
          v-model="selectedDate"
          :value="date"
        />
        <label :for="`date-select-` + index">{{date}}</label>
      </div>
    </fieldset>
    <forecast-date :forecasts="dailyForecasts"></forecast-date>
  </div>
</template>

<script>
import ForecastDate from "./ForecastDate";
import { eventBus } from "../main.js";

export default {
  name: "location-forecasts",
  props: ["forecastsByDate", "location", "isInFavourites"],
  components: {
    "forecast-date": ForecastDate,
  },
  data() {
    return {
      selectedDate: "",
    };
  },
  computed: {
    dailyForecasts() {
      if (this.selectedDate) {
        return this.forecastsByDate[this.selectedDate];
      } else {
        return null;
      }
    },
    dates() {
      return Object.keys(this.forecastsByDate);
    },
  },
  methods: {
    handleAddFav() {
      console.log("Adding favourite");
      eventBus.$emit("add-favourite", this.location);
    },
  },
};
</script>

<style>
/* #selected-location {
  font-size: 1.25rem;
} */
</style>