<template>
  <ul>
    <forecast-time v-for="(forecast, index) in date" :key="index" :forecast="forecast"></forecast-time>
  </ul>
</template>

<script>
import ForecastTime from "./ForecastTime";

export default {
  name: "forecast-date",
  props: ["date"],
  components: {
    "forecast-time": ForecastTime,
  },
};
</script>

<style>
ul {
  display: flex;
  margin-bottom: 1em;
}
</style>