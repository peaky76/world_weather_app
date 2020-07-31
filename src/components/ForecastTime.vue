<template>
  <li>
    <h2>{{forecast.time | formatTime}}</h2>
    <img :src="getWeatherSymbol(forecast.symbol)" />
    {{forecast.temp | formatTemp}} : {{forecast.rain}}
  </li>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "forecast-time",
  props: ["forecast"],
  filters: {
    formatTemp(value) {
      return Math.round(value).toString() + "\u00b0" + "C";
    },
    formatTime(value) {
      return moment.tz(String(value), "Atlantic/Azores").format("ha");
    },
  },
  methods: {
    getWeatherSymbol(symbol) {
      return `/weathericon/svg/${symbol}.svg`;
    },
  },
};
</script>

<style>
</style>