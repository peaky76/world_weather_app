<template>
  <ul id="forecasts" v-if="forecasts">
    <li id="forecast-date" v-for="(date, index) in forecastsByDate" :key="index">
      {{date.date}}
      <forecast-date :forecasts="date.forecasts"></forecast-date>
    </li>
  </ul>
</template>

<script>
import ForecastDate from "./ForecastDate";

import groupBy from "lodash/groupBy";
import moment from "moment-timezone";

export default {
  name: "location-forecasts",
  props: ["forecasts"],
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
#forecasts {
  display: flex;
  flex-direction: column;
}
#forecast-date {
  margin-bottom: 1em;
}
</style>