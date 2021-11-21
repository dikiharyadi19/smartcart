<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" height="650" max-width="500">
      <v-bottom-navigation
        absolute
        color="white"
        hide-on-scroll
        horizontal
        scroll-target="#scroll-threshold-example"
        scroll-threshold="500"
      >
        <v-row>
          <v-col cols="12">
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div class="mb-2 ml-2">
                  Total Bayar <br />
                  <b>{{ dataCheckout.total | VMask(currencyMask) }}</b>
                </div>
                <v-btn
                  color="green"
                  class="white--text font-weight-bold"
                  @click="Payment"
                  >Bayar
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-bottom-navigation>
      <v-sheet id="scroll-threshold-example" class="overflow-y-auto pb-16">
        <v-responsive height="2500">
          <v-row dense>
            <v-col cols="12">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-title>Metode Pembayaran</v-card-title>
                </div>
                <div class="ma-2">
                  <v-combobox
                    v-model="select"
                    :items="items"
                    hide-selected
                    outlined
                  ></v-combobox>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-title>Ringkasan Pembayaran</v-card-title>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-subtitle> Total Tagihan </v-card-subtitle>
                  <v-card-subtitle>
                    {{ dataCheckout.total | VMask(currencyMask) }}
                  </v-card-subtitle>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-responsive>
      </v-sheet>
    </v-card>
  </v-container>
</template>
<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "Rp.",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  data: () => ({
    currencyMask,
    value: 1,
    items: ["OVO", "GoPay"],
    select: "",
    dataCheckout: {},
  }),
  created() {
    this.getCheckout();
  },
  methods: {
    getCheckout() {
      this.dataCheckout = JSON.parse(localStorage.getItem("checkout"));
    },
    Payment() {
      localStorage.setItem(
        "checkout",
        JSON.stringify({
          checkout: this.dataCheckout,
          payment: this.select,
        })
      );
      if (this.select != "") {
        this.$router.push({
          name: "Otp",
          params: { id: this.select },
        });
      } else {
        alert("Pilih Metode pembayaran Terlebih dahulu..");
      }
    },
  },
};
</script>
