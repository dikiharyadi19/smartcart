<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        /> -->

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <v-btn target="_blank" text>
          <span class="mr-2">Smartcart</span>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :permanent="permanent"
      :src="bg"
      :style="{ background: gradient }"
      app
    >
      <v-list dense nav class="py-0">
        <!-- <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Nama</v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-divider></v-divider> -->

        <!-- <v-flex>
            <Popup class="mt-4 mb-3" @projectAdde="snackbar = true"/>
          </v-flex> -->

        <div class="mt-6">
          <div text>
            <span class="m-2">SMARTCART</span>
            <v-icon>mdi-cart</v-icon>
          </div>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            router
            :to="item.route"
            class="mt-2"
          >
            <!-- v-if="user.role === item.access" -->

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <!-- <v-btn block @click.prevent="signOut" color="white">
            Logout <br />
            <v-icon>mdi-export</v-icon>
          </v-btn> -->
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: false,
      items: [
        // { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        {
          title: "Home",
          icon: "mdi-view-dashboard",
          route: "/",
        },
        {
          title: "Activate Cart",
          icon: "mdi-login",
          route: "/login",
        },
      ],
      color: "white",
      gradient: "linear-gradient(180deg,#white,#white)",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      permanent: false,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      snackbar: false,
      path: process.env.VUE_APP_URL,
      // 'http://localhost:8000/'
      // path: 'https://api-cms-amanbro.herokuapp.com'
    };
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    },
  },
};
</script>
