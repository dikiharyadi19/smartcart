import Vue from "vue";
Vue.use(require("vue-pusher"), {
  api_key: "586a4442c5412f2724a9",
  options: {
    cluster: "ap1",
    encrypted: true,
  },
});
