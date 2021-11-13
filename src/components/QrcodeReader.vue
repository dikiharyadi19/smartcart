<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title>Silahkan Scan Barcode Keranjang Disini</v-card-title>
      <qrcode-stream @init="onInit" @decode="onDecode"></qrcode-stream>
      <!-- <qrcode-drop-zone></qrcode-drop-zone> -->
      <!-- <qrcode-capture></qrcode-capture> -->
    </v-card>
  </v-container>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      decoded: "",
    };
  },
  computed: {},
  methods: {
    onInit(promise) {
      promise.catch(function () {
        this.userMediaSupported = false;
      });
    },
    onDecode(decodedString) {
      this.decoded = decodedString;
      console.log(decodedString);
      if (this.decoded != "" && this.decoded != undefined) {
        // axios
        //   .get(
        //     "https://smartcart-add.herokuapp.com/api/carts/auth/" +
        //       decodedString
        //   )
        //   .then((response) => {
        //     console.log(response);
        //     if (response.status === "00" && response.msg === "success") {
        //       this.$router.push({
        //         name: "Cart",
        //         params: { id: response.data.cart_name },
        //       });
        //     } else {
        //       alert("Koneksi Bermasalah...");
        //     }
        //   });
        this.$router.push({
          name: "Cart",
          params: { id: decodedString },
        });
      } else {
        alert("QRcode Tidak Terbaca..");
      }
    },
  },
};
</script>
