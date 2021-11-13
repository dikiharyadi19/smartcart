import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import pusher from "./plugins/pusher";

import { VueMaskFilter } from "v-mask";
Vue.filter("VMask", VueMaskFilter);

Vue.config.productionTip = false;

import VueQrcodeReader from "vue-qrcode-reader";
// Vue.use(require("vue-pusher"), {
//   api_key: "586a4442c5412f2724a9",
//   options: {
//     cluster: "ap1",
//     encrypted: true,
//   },
// });

Vue.use(VueQrcodeReader);

new Vue({
  router,
  store,
  vuetify,
  // pusher,
  render: (h) => h(App),
}).$mount("#app");
