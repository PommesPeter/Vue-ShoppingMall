<template>
  <v-bottom-navigation
      :value="value"
      color="primary"
  >
    <v-btn>
      <span>Recent</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn>
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>Nearby</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "NaviDrawer",
  data: () => ({value: 1}),
}
</script>

<style scoped>

</style>