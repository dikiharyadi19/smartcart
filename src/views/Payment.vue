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
        <v-btn color="green" @click="submit">
          <span></span>
        </v-btn>
        <v-btn color="green" @click="submit">
          <span></span>
        </v-btn>
        <v-btn color="green" @click="submit">
          <span>Bayar</span>
        </v-btn>
        <v-btn color="green" @click="submit">
          <span></span>
        </v-btn>
        <v-btn color="green" @click="submit">
          <span></span>
        </v-btn>
      </v-bottom-navigation>
      <v-sheet id="scroll-threshold-example" class="overflow-y-auto pb-16">
        <v-responsive height="2500">
          <v-row dense>
            <v-col cols="12">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-title>Pembayaran</v-card-title>
                </div>
                <div class="ma-2"></div>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card v-show="params === 'GoPay'">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-subtitle> Total Tagihan </v-card-subtitle>
                  <v-card-subtitle>
                    <b>{{
                      dataCheckout.checkout.total | VMask(currencyMask)
                    }}</b>
                  </v-card-subtitle>
                </div>
                <v-divider></v-divider>
                <v-card-title>GoPay</v-card-title>
                <div class="d-flex flex-column">
                  <div class="ma-2 ml-5">
                    **** **** **** <br />
                    Saldo Rp1.000.000
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-subtitle> Pakai GoPay </v-card-subtitle>
                  <v-card-subtitle>
                    {{
                      ("- " + dataCheckout.checkout.total) | VMask(currencyMask)
                    }}</v-card-subtitle
                  >
                </div>
              </v-card>
              <v-card v-show="params === 'OVO'">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-subtitle> Total Tagihan </v-card-subtitle>
                  <v-card-subtitle>
                    <b>{{
                      dataCheckout.checkout.total | VMask(currencyMask)
                    }}</b>
                  </v-card-subtitle>
                </div>
                <v-divider></v-divider>
                <v-card-title>OVO</v-card-title>
                <div class="d-flex flex-column">
                  <div class="ma-2 ml-5">
                    **** **** **** <br />
                    Saldo Rp1.000.000
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-subtitle> Pakai OVO </v-card-subtitle>
                  <v-card-subtitle>
                    {{
                      ("- " + dataCheckout.checkout.total) | VMask(currencyMask)
                    }}</v-card-subtitle
                  >
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
    params: "",
    dataCheckout: {},
  }),
  created() {
    this.getParams();
    this.getCheckout();
  },
  methods: {
    getCheckout() {
      this.dataCheckout = JSON.parse(localStorage.getItem("checkout"));
    },
    submit() {
      this.$router.push({
        name: "Thankyou",
      });
    },
    getParams() {
      this.params = this.$route.params.id;
    },
  },
};
</script>
