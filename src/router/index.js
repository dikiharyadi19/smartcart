import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Otp from "../views/Otp.vue";
import Payment from "../views/Payment.vue";
import Thankyou from "../views/Thankyou.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/cart/:id",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/payment/:id",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/payment-method/:id",
    name: "Otp",
    component: Otp,
  },
  {
    path: "/thankyou",
    name: "Thankyou",
    component: Thankyou,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
