<template>
  <div v-if="location">
    <header>
      {{location.name}}
      <button v-if="!inFavourites" v-on:click="handleAddFav">Add to favourites</button>
    </header>
    <div class="forecast-date" v-for="(date, index) in forecastsByDate" :key="index">
      <input
        v-on:change="handleChangeDate"
        :id="`forecast-date` + index"
        name="forecast-date"
        type="radio"
        v-model="displayDate"
        :value="date"
      />
      <label :for="`forecast-date` + index">{{date.date}}</label>
    </div>
    <forecast-date :forecasts="selectedDate.forecasts"></forecast-date>
  </div>
</template>

<script>
import ForecastDate from "./ForecastDate";
import { eventBus } from "../main.js";
import groupBy from "lodash/groupBy";
import moment from "moment-timezone";

export default {
  name: "location-forecasts",
  props: ["forecasts", "location", "selectedDate", "inFavourites"],
  data() {
    return {
      displayDate: "",
    };
  },
  components: {
    "forecast-date": ForecastDate,
  },
  computed: {
    forecastsByDate() {
      // Group forecasts by date into a new object
      let grouped = groupBy(this.forecasts, (forecast) => {
        return moment(forecast.time).format("ddd D MMM");
      });
      // Map that object to an array of objects and return
      return Object.keys(grouped).map((key) =>
        Object({ date: key, forecasts: grouped[key] })
      );
    },
  },
  methods: {
    handleAddFav() {
      eventBus.$emit("add-favourite", this.location);
    },
    handleChangeDate() {
      eventBus.$emit("selected-date", this.displayDate);
    },
  },
};
</script>

<style scoped>
.forecast-date {
  display: inline-block;
  margin-right: 1rem;
}
</style>