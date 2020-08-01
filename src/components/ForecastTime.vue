<template>
  <li id="forecast-time">
    <header>{{forecast.time | formatTime}}</header>
    <img class="weather-symbol" :src="getWeatherSymbol(forecast.symbol)" />
    {{forecast.temp | formatTemp}}
    <!-- //: {{forecast.rain}} -->
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
#forecast-time {
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
}
#forecast-time > * {
  margin-bottom: 0.5rem;
}
.weather-symbol {
  height: 50px;
  width: 50px;
  border: 1px solid black;
  border-radius: 10px;
}
</style>