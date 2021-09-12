<template>
  <v-container>
    <h2>Keranjang Belanja</h2>
    <v-row dense class="mt-6">
      <v-col v-for="(item, i) in products" :key="i" cols="12">
        <v-card :color="item.color">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" v-text="item.name"></v-card-title>

              <v-card-subtitle v-text="item.type"></v-card-subtitle>

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

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.image"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Sukro Dua kelinci",
          type: "Cemilan",
          price: 8500,
          image: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          color: "white",
          //   1F7087
          qty: 2,
        },
        {
          id: 2,
          name: "Lays",
          type: "Cemilan",
          price: 9500,
          image: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          color: "white",
          //   952175
          qty: 3,
        },
      ],
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People",
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
      ],
    };
  },
  methods: {
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
  computed: {},
};
</script>
