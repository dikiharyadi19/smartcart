<template>
  <v-bottom-navigation
    absolute
    color="white"
    hide-on-scroll
    horizontal
    scroll-target="#scroll-threshold-example"
    scroll-threshold="500"
  >
    <v-btn color="deep-purple accent-4" text>
      <span>Recents</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn color="deep-purple accent-4" text>
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn color="deep-purple accent-4" text>
      <span>Nearby</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
