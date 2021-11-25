<template>
  <div class="ma-2 ml-4 text-left">
    <v-row>
      <v-col :cols="12">
        <!-- <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="300"
          max-width="400"
          src="https://picsum.photos/id/11/500/300"
        ></v-img> -->
        <h2 class="mt-8">Gunakan Smartcart sekarang dan dapatkan manfaatnya</h2>
        <p class="mt-4">
          Smartcart merupakan aplikasi smart yang dapat memberikan anda
          kemudahan dalam berbelanja
        </p>

        <div>
          <v-btn x-medium class="ml-3" outlined color="indigo">
            Selengkapnya
          </v-btn>
          <v-btn x-medium class="ml-3" color="primary" link router to="Login">
            Activate Cart
          </v-btn>
        </div>
      </v-col>
      <v-col :cols="12">
        <!-- <div background-color="light-blue">new Colmn</div> -->
      </v-col>
    </v-row>
    <!-- <img
      lazy-src="@/assets/shopping.png"
      max-height="300"
      max-width="400"
      src="@/assets/shopping.png"
    /> -->
  </div>
</template>

<script>
import Pusher from "pusher-js"; // import Pusher
import axios from "axios";
export default {
  data() {
    return {
      customer: {},
    };
  },
  created() {
    let pusher = new Pusher("b3389a8ce46a6230dd82", {
      cluster: "ap1",
    });
    if (localStorage.getItem("customer") != null) {
      pusher.unsubscribe(
        JSON.parse(localStorage.getItem("customer")).cart_name
      );
      this.getDataCustomer();
      this.logOut();
      localStorage.clear();
    }
  },
  methods: {
    getDataCustomer() {
      this.customer = JSON.parse(localStorage.getItem("customer"));
    },
    logOut() {
      axios
        .get(
          "https://smartcart-add.herokuapp.com/api/carts/logout/" +
            this.customer.cart.cart_id
        )
        .then(() => {});
    },
  },
};
</script>
