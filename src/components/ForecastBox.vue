<template>
  <li>{{forecast | formatDate}}</li>
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