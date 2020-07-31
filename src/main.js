import Vue from "vue";
import App from "./App.vue";
import moment from "moment";

Vue.config.productionTip = false;

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("ddd Do MMM ha");
  }
});

export const eventBus = new Vue();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
