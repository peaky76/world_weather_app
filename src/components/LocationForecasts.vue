<template>
  <ul v-if="forecasts">
    <forecast-box v-for="(forecast, index) in forecasts" :key="index" :forecast="forecast"></forecast-box>
  </ul>
</template>

<script>
import ForecastBox from "./ForecastBox";

export default {
  name: "location-forecasts",
  props: ["forecasts"],
  components: {
    "forecast-box": ForecastBox,
  },
};
</script>

<style>
</style>