<template>
  <li id="forecast-detail">
    <img class="weather-symbol" :src="getWeatherSymbol(forecast.symbol)" />
    <header>{{forecast.time | formatTime}}</header>
    <span class="weather-detail">{{forecast.temp | formatTemp}}</span>
    <span class="weather-detail small">{{forecast.rain | formatRain}}</span>
    <span
      class="weather-detail small"
    >{{forecast.wind | formatWind}}{{getWindDirection(forecast.windDirection)}}</span>
  </li>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "forecast-detail",
  props: ["forecast"],
  filters: {
    formatRain(value) {
      return "Rain: " + value + "mm";
    },
    formatTemp(value) {
      return Math.round(value).toString() + "\u00b0" + "C";
    },
    formatTime(value) {
      return moment.utc(String(value)).format("h a");
    },
    formatWind(value) {
      return "Wind: " + value + "m/s ";
    },
  },
  methods: {
    getWeatherSymbol(symbol) {
      return `/weathericon/svg/${symbol}.svg`;
    },
    getWindDirection(degrees) {
      const value = Math.round(degrees / 22.5 + 0.5);
      const directions = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
      ];
      return directions[value % 16];
    },
  },
};
</script>

<style>
#forecast-detail {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  width: 150px;
  padding: 1.5rem;
  background: inherit;
  text-align: center;
}
header {
  font-size: 1.56rem;
  margin-bottom: 1rem;
}
.weather-symbol {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 6rem;
  width: 6rem;
}
.weather-detail {
  font-size: 1.56rem;
  margin-bottom: 1rem;
}
.weather-detail.small {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>