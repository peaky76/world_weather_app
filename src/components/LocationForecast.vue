<template>
  <div v-if="location">This will be the weather forecast for a location.</div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "location-forecast",
  props: ["location"],
};
</script>

<style>
</style>