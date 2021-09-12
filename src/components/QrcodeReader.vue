<template>
  <v-container>
    QRcode Decoded string: {{ decoded }}
    <v-card class="mx-auto my-12" max-width="374">
      <qrcode-stream @decode="onDecode"></qrcode-stream>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      decoded: "",
    };
  },
  methods: {
    onDecode(decodedString) {
      this.decoded = decodedString;
      console.log(decodedString);
      if (this.decoded != "" && this.decoded === undefined) {
        this.$router.push({ name: "Cart", params: { id: this.decoded } });
      }
    },
  },
};
</script>
