<template>
  <div v-if="location">
    <header>{{location.name}}</header>
    <div class="radio-container" v-for="(date, index) in forecastsByDate" :key="index">
      <input
        :id="`forecast-date` + index"
        name="forecast-date"
        type="radio"
        v-model="selectedDate"
        :value="date"
      />
      <label :for="`forecast-date` + index">{{date.date}}</label>
    </div>
    <forecast-date :forecasts="selectedDate.forecasts"></forecast-date>
  </div>
</template>

<script>
import ForecastDate from "./ForecastDate";

import groupBy from "lodash/groupBy";
import moment from "moment-timezone";

export default {
  name: "location-forecasts",
  props: ["forecasts", "location"],
  data() {
    return {
      selectedDate: "",
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
    handleClick() {
      this.selectedDate = date;
    },
  },
};
</script>

<style scoped>
#forecasts header,
#forecast-date header {
  font-size: 1.25rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
</style>