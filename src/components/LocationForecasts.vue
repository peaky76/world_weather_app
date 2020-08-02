<template>
  <div id="forecast-wrapper" v-if="location">
    <header>
      <div id="selected-location">
        <span id="selected-city" class="city">{{location.city}}</span>
        <br />
        <span id="selected-admin" class="admin">{{location.admin_name}}</span>
        <span id="selected-country" class="country">{{location.country}}</span>
      </div>
      <button
        id="favourite-button"
        class="grey"
        v-if="!isInFavourites"
        v-on:click="handleAddFav"
      >{{heartShape}}</button>
      <button id="favourite-button" class="red" v-if="isInFavourites">{{heartShape}}</button>
    </header>
    <div id="forecast-body">
      <fieldset id="date-selecter">
        <div
          class="radio-container"
          :class="{'active':(date === selectedDate),'tint-dawn': (colourScheme === 'dawn'), 'tint-dusk': (colourScheme === 'dusk')}"
          v-for="(date, index) in dates"
          :key="index"
        >
          <input
            :id="`date-select-` + index"
            name="date-select"
            type="radio"
            v-model="selectedDate"
            :value="date"
          />
          <label :for="`date-select-` + index">{{date}}</label>
        </div>
      </fieldset>
      <div id="forecast-content" :class="`gradient-` + colourScheme">
        <forecast-date :forecasts="dailyForecasts"></forecast-date>
      </div>
    </div>
  </div>
</template>

<script>
import ForecastDate from "./ForecastDate";
import { eventBus } from "../main.js";
import moment from "moment-timezone";

export default {
  name: "location-forecasts",
  props: ["forecastsByDate", "location", "isInFavourites", "colourScheme"],
  components: {
    "forecast-date": ForecastDate,
  },
  data() {
    return {
      heartShape: "\u2665",
      selectedDate: moment.utc(moment.now()).format("ddd D MMM"),
    };
  },
  computed: {
    dailyForecasts() {
      if (this.selectedDate) {
        return this.forecastsByDate[this.selectedDate];
      } else {
        return null;
      }
    },
    dates() {
      return Object.keys(this.forecastsByDate);
    },
  },
  methods: {
    handleAddFav() {
      console.log("Adding favourite");
      eventBus.$emit("add-favourite", this.location);
    },
  },
};
</script>

<style scoped>
#forecast-wrapper {
  display: flex;
  flex-direction: column;
}
#forecast-wrapper header {
  display: flex;
  margin-bottom: 1rem;
}
#selected-location {
  font-size: 3.05rem;
  line-height: 0.8em;
  margin-right: 1em;
}
#favourite-button {
  font-size: 3.05rem;
}
#favourite-button:hover {
  cursor: pointer;
}
#favourite-button.red {
  color: red;
}
#favourite-button.grey {
  color: #f4f3ee;
}
#forecast-body {
  margin-right: auto;
}
#date-selecter {
  font-variant: small-caps;
}
#forecast-content {
  border-width: 1px;
  border-style: solid;
  border-top: none;
  text-align: left;
}
.radio-container {
  padding: 0.25rem 1rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.75rem 0.75rem 0 0;
}
.radio-container:hover,
.radio-container > *:hover {
  cursor: pointer;
}
.active {
  -webkit-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}
.active.tint-dusk {
  color: #f8cf50;
  border-bottom: 1px solid #2f4a55;
}
.active.tint-dawn {
  color: #2f4a55;
  border-bottom: 1px solid #f8cf50;
}
</style>