<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" height="650" max-width="500">
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-card-title>Metode Pembayaran</v-card-title>
            </div>
            <!-- <v-card-subtitle>Nomor Telepon</v-card-subtitle> -->
            <div class="ml-2 mr-2">
              <v-text-field
                v-model="telepon"
                label="Nomor Telepon"
                outlined
              ></v-text-field>
            </div>
            <div class="ml-2 mr-2" v-show="buttonOtp">
              <v-btn class="ma-2" outlined color="green" @click="kirimOtp">
                Kirim OTP
              </v-btn>
            </div>
            <div class="ma-2" v-show="showOtp">
              <v-text-field
                v-model="otp"
                outlined
                label="Kode OTP"
              ></v-text-field>
            </div>
            <div class="ml-2 mr-2" v-show="showOtp === true">
              <v-btn class="ma-2" outlined color="green" @click="submit">
                Submit
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <!-- <v-card-title>Ringkasan Pembayaran</v-card-title>
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-card-subtitle> Total Tagihan </v-card-subtitle>
              <v-card-subtitle> Rp.20.000 </v-card-subtitle>
            </div> -->
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    telepon: "089617180294",
    otp: "",
    value: 1,
    buttonOtp: true,
    showOtp: false,
    items: ["OVO", "GoPay"],
    // select: this.params.id,
    loader: null,
    loading: false,
  }),
  methods: {
    submit() {
      this.$router.push({
        name: "Payment",
        params: { id: this.$route.params.id },
      });
    },
    kirimOtp() {
      if (this.telepon != "") {
        this.buttonOtp = false;
        this.showOtp = true;
        this.otp = "4566";
      } else {
        alert("Nomor Telepon Kosong !!");
      }
    },
    loaders() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>
