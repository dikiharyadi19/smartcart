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
          v-show="setProducts.length !== 0 && setProducts.length !== null"
          v-for="(item, i) in setProducts"
          :key="i"
          cols="12"
        >
          <v-card :color="item.color" elevation="2">
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
        <v-col v-show="setProducts.length === 0">
          <v-card color="white" elevation="6">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-card-title class="text-h5">
                Keranjang Masih Kosong..
              </v-card-title>
            </div>
          </v-card>
        </v-col>
        <v-col v-show="setProducts.length != 0">
          <v-card color="white" elevation="6">
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
                  Beli ({{ setProducts.length }})
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
import Pusher from "pusher-js"; // import Pusher
export default {
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
  watch: {},
  computed: {
    total() {
      var total = 0;
      if (this.setProducts.length != 0) {
        total = this.setProducts
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

        // console.log("productAPI");
        // console.log(productAPI.length);

        let productPushher = JSON.parse(
          localStorage.getItem("product-from-pusher")
        );

        // console.log("product pusher");
        // console.log(productPushher.length);

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
      set: function () {
        // console.log("sdasdasd");
        // console.log(newValue);
        // const productsMap = new Map();
        // if (newValue.length != 0) {
        //   for (const item of newValue) {
        //     if (!productsMap.has(item)) {
        //       productsMap.set(item, true);
        //       this.products.push(item);
        //     }
        //   }
        // }
        // this.products = newValue;
      },
    },
  },
  created() {
    this.setDataFirstTime();
    this.getDataCustomer();
    this.subscribeChannell();
    this.getListItem();
  },
  methods: {
    setDataFirstTime() {
      let data = JSON.parse(localStorage.getItem("product-from-pusher"));
      if (data === null) {
        localStorage.setItem("product-from-pusher", JSON.stringify([]));
      }
    },
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
          // console.log(response);
          if (response.data.status === "00") {
            localStorage.setItem(
              "product-from-api",
              JSON.stringify(response.data.data)
            );
            // console.log("test");
            // console.log(JSON.stringify(response.data.data));
          } else if (response.data.status === "01") {
            alert("Error Data!!");
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

      var channel = pusher.subscribe(this.$route.params.id);

      channel.bind("add-to-cart-event", function (data) {
        let productLocalAPI = JSON.parse(
          localStorage.getItem("product-from-api")
        );
        productPusher = productLocalAPI;

        let productLocal = JSON.parse(
          localStorage.getItem("product-from-pusher")
        );

        // console.log("productLocal", productLocal);

        var newDataArray = [];
        if (productLocal.length != 0) {
          const mapProductId = new Map();
          const mapProductId2 = new Map();
          const mapProductId3 = new Map();
          console.log(
            "before push data sama dengan data.item_id=>",
            mapProductId
          );

          for (const item of productLocal) {
            if (item.item_id === data.item_id) {
              if (!mapProductId.has(data.item_id)) {
                mapProductId.set(data.item_id, true);
                newDataArray.push({
                  image: item.image,
                  item_id: item.item_id,
                  order_id: item.order_id,
                  price: item.price + data.price,
                  qty: item.qty + data.qty,
                  type: item.type,
                });
                // console.log("item.item_id === data.item_id", {
                //   image: item.image,
                //   item_id: item.item_id,
                //   order_id: item.order_id,
                //   price: item.price + data.price,
                //   qty: item.qty + data.qty,
                //   type: item.type,
                // });
              }
            } else {
              console.log(
                "before push data else bkan = data =>",
                mapProductId2
              );
              if (!mapProductId2.has(data.item_id)) {
                mapProductId2.set(data.item_id, true);
                // console.log("item.item_id === data.item_id", data);
                newDataArray.push(data);
              }
            }

            if (item.item_id != data.item_id) {
              console.log(
                "before push data if bukan data.item_id=>",
                mapProductId3
              );
              if (!mapProductId3.has(data.item_id)) {
                // mapProductId3.set(data.item_id, true);
                console.log("newDataArray.push(item);", item);
                newDataArray.push(item);
              }
              // console.log("newDataArray.push(data);", data);
              // newDataArray.push(data);
            }
          }
          console.log("newDataArray", newDataArray);
          localStorage.setItem(
            "product-from-pusher",
            JSON.stringify(newDataArray)
          );
        } else {
          productPusher.push(data);
          localStorage.setItem(
            "product-from-pusher",
            JSON.stringify(productPusher)
          );
        }
        // window.location.reload();
        // this.$forceUpdate();
      });
    },
    addProduct(data) {
      this.products.push(data);
    },
    removeProduct(id) {
      console.log(id);
    },
    plusQty(item) {
      // console.log(item);
      this.findCollection(item.id, this.products, "plus");
    },
    minusQty(item) {
      // console.log(item);
      this.findCollection(item.id, this.products, "minus");
    },
    findCollection(param, array, type) {
      //   let arr = [
      //     { name: "string 1", value: "this", other: "that" },
      //     { name: "string 2", value: "this", other: "that" },
      //   ];
      let ArrayData = array;

      let obj = ArrayData.find((o) => o.id === param); //"string 1"
      // console.log("object founded");
      // console.log(obj);
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
