<template>
  <li>This is a search item</li>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "search-result-item",
  props: ["result"],
};
</script>

<style>
</style>