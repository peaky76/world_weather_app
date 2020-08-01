<template>
  <ul>
    <forecast-detail v-for="(forecast, index) in forecasts" :key="index" :forecast="forecast"></forecast-detail>
  </ul>
</template>

<script>
import ForecastDetail from "./ForecastDetail";

export default {
  name: "forecast-date",
  props: ["forecasts"],
  components: {
    "forecast-detail": ForecastDetail,
  },
};
</script>

<style>
ul {
  display: flex;
  margin-bottom: 1em;
}
</style>