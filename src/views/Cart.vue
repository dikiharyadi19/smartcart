<template>
  <v-container>
    <span
      ><b>Customer Cart ID: {{ customer.customer_cart_id }}</b></span
    >
    <v-sheet id="scroll-threshold-example" class="mx-auto overflow-hidden">
      <!-- max-height="600" -->
      <!-- <h2>Keranjang Belanja</h2>
      product:
      {{ productLocalStorage }} -->
      <v-row dense class="mt-6">
        <v-col
          v-show="products.length !== 0 && products.length !== null"
          v-for="(item, i) in products"
          :key="i"
          cols="12"
        >
          <v-card :color="item.color">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">{{
                  item.name || "nama produk"
                }}</v-card-title>

                <v-card-subtitle>{{
                  item.type || "tipe produk"
                }}</v-card-subtitle>
                <v-card-title
                  >{{ item.price | VMask(currencyMask) }}
                </v-card-title>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    icon
                    color="red"
                    @click="removeProduct(item.id)"
                  >
                    <v-icon class="mt-2">mdi-trash-can-outline</v-icon>
                  </v-btn>

                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="plusQty(item)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <div class="mt-6 ma-2">
                    <h2>{{ item.qty }}</h2>
                  </div>
                  <v-btn
                    v-show="item.qty != 1"
                    v-if="item.qty != 1"
                    class="mt-5"
                    outlined
                    rounded
                    small
                    @click="minusQty(item)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <v-btn
                    else
                    v-show="item.qty == 1"
                    disabled
                    class="mt-5"
                    outlined
                    rounded
                    small
                    @click="minusQty(item)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <!-- <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.image"></v-img>
            </v-avatar> -->
            </div>
          </v-card>
        </v-col>
        <v-col v-show="products.length === 0">
          <v-card color="white">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-card-title class="text-h5">
                Keranjang Masih Kosong..
              </v-card-title>
            </div>
          </v-card>
        </v-col>
        <v-col v-show="products.length != 0">
          <v-card color="gray">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-subtitle class="text-h6"> Total Harga </v-card-subtitle>
                <v-card-subtitle class="text-h6">
                  {{ total | VMask(currencyMask) }}
                </v-card-subtitle>
              </div>
              <div>
                <v-btn
                  class="mt-14 mb-14 mr-4"
                  outlined
                  color="green"
                  @click="submit"
                >
                  Beli ({{ products.length }})
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-responsive height="100"></v-responsive> -->
    </v-sheet>
    <!-- <BottomNavigation /> -->
  </v-container>
</template>
<script>
import axios from "axios";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "Rp.",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
// import BottomNavigation from "@/components/BottomNavigation.vue";
import Pusher from "pusher-js"; // import Pusher
export default {
  components: {
    // BottomNavigation: BottomNavigation,
  },
  data() {
    return {
      customer: {},
      customer_cart_id: "",
      currencyMask,
      product: {},
      // productLocalStorage: [],
      products: [
        // {
        //   id: 1,
        //   name: "Sukro Dua kelinci",
        //   type: "Cemilan",
        //   price: 8500,
        //   image: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        //   color: "white",
        //   qty: 2,
        // },
        // {
        //   id: 2,
        //   name: "Lays",
        //   type: "Cemilan",
        //   price: 9500,
        //   image: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        //   color: "white",
        //   qty: 3,
        // },
      ],
    };
  },
  mounted() {},
  computed: {
    total() {
      var total = 0;
      if (this.products.length != 0) {
        total = this.products
          .map((o) => o.price)
          .reduce((a, c) => {
            return a + c;
          });
      }
      return total;
    },
    setProducts: {
      // getter
      get: function () {
        let products = [];
        let productAPI = JSON.parse(localStorage.getItem("product-from-api"));

        console.log("productAPI");
        console.log(productAPI.length);

        let productPushher = JSON.parse(
          localStorage.getItem("product-from-api")
        );

        console.log("product pusher");
        console.log(productPushher.length);

        const productsMap = new Map();

        if (productAPI.length != 0) {
          for (const item of productAPI) {
            if (!productsMap.has(item)) {
              productsMap.set(item, true);
              products.push(item);
            }
          }
        }

        if (productPushher.length != 0) {
          for (const item of productPushher) {
            if (!productsMap.has(item)) {
              productsMap.set(item, true);
              products.push(item);
            }
          }
        }

        return products;
      },
      // setter
      set: function (newValue) {
        const productsMap = new Map();
        if (newValue.length != 0) {
          for (const item of newValue) {
            if (!productsMap.has(item)) {
              productsMap.set(item, true);
              this.products.push(item);
            }
          }
        }
        // this.products = newValue;
      },
    },
  },
  created() {
    this.getDataCustomer();
    this.subscribeChannell();
    this.getListItem();
  },
  methods: {
    submit() {
      localStorage.setItem(
        "checkout",
        JSON.stringify({
          total: this.total,
          products: this.products,
        })
      );
      this.$router.push("/checkout");
    },
    getListItem() {
      axios
        .get(
          "https://smartcart-add.herokuapp.com/api/carts/list/" +
            this.customer.cart.cart_id
        )
        .then((response) => {
          console.log(response);
          if (response.data.status === "00") {
            localStorage.setItem(
              "product-from-api",
              JSON.stringify(response.data.data)
            );
            console.log("test");
            console.log(JSON.stringify(response.data.data));
          } else if (response.data.status === "01") {
            alert("Error Mengambil Data!!");
          }
        });
    },
    getDataCustomer() {
      this.customer = JSON.parse(localStorage.getItem("customer"));
    },
    subscribeChannell() {
      Pusher.logToConsole = true;
      let productPusher = [];

      let pusher = new Pusher("b3389a8ce46a6230dd82", {
        cluster: "ap1",
      });

      // var channel = pusher.subscribe(
      //   "3c96b0015154b1885fb9021baef7bb60ccb2fdf0@0b7becb7-ef8b-4537-b9a5-e77aa3c402fb-cart"
      // );
      var channel = pusher.subscribe(this.$route.params.id);

      channel.bind("add-to-cart-event", function (data) {
        // this.product.push(JSON.stringify(data));
        // productLocalStorage = JSON.parse(
        //   localStorage.getItem("productLocalStorage")
        // );
        productPusher.push(data);
        localStorage.setItem(
          "product-from-pusher",
          JSON.stringify(productPusher)
        );
      });
    },
    removeProduct(id) {
      console.log(id);
    },
    plusQty(item) {
      console.log(item);
      this.findCollection(item.id, this.products, "plus");
    },
    minusQty(item) {
      console.log(item);
      this.findCollection(item.id, this.products, "minus");
    },
    findCollection(param, array, type) {
      //   let arr = [
      //     { name: "string 1", value: "this", other: "that" },
      //     { name: "string 2", value: "this", other: "that" },
      //   ];
      let ArrayData = array;

      let obj = ArrayData.find((o) => o.id === param); //"string 1"
      console.log("object founded");
      console.log(obj);
      var qty = 0;
      if (type === "plus") {
        qty = obj.qty + 1;
      }

      if (type === "minus") {
        if (obj.qty > 1 && obj.qty != 1) {
          qty = obj.qty - 1;
        } else {
          alert("Quantity tidak boleh lebih kecil dari 1");
        }
      }

      let objIndex = ArrayData.findIndex((obj) => obj.id == param);
      //Update object's name property.
      this.products[objIndex].qty = qty;
      return obj;
    },
  },
};
</script>
