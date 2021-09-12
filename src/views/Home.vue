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
          <v-btn x-large class="" outlined color="indigo"> Selengkapnya </v-btn>
          <v-btn x-large class="ml-1" color="primary" link router to="Login">
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
export default {
  name: "Home",
};
</script>
