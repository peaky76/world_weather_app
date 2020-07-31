<template>
  <li>{{forecast.time | formatDate}} : {{forecast.temp}} : {{forecast.symbol}} : {{forecast.rain}}</li>
  <!-- <li>{{forecast.time}} - {{forecast.temp}}, {{forecast.rain}}, {{forecast.symbol}}</li> -->
</template>

<script>
export default {
  name: "forecast-box",
  props: ["forecast"],
};
</script>

<style>
</style>