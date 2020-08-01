<template>
  <div v-if="location">
    <header>{{location.name}}</header>
    <li id="forecast-date" v-for="(day, index) in forecastsByDate" :key="index">{{day.date}}</li>
    <forecast-date :date="selectedDate"></forecast-date>
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
};
</script>

<style scoped>
#forecast-date {
  margin-bottom: 1rem;
}
#forecasts header,
#forecast-date header {
  font-size: 1.25rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
</style>