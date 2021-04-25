<template>
  <v-app>
    <v-app-bar
      app
      color="orange"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/drawing.svg"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
    <ButtomNavi/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import ButtomNavi from "./components/ButtomNavi";
export default {
  name: 'App',

  components: {
    HelloWorld,
    ButtomNavi
  },

  data: () => ({
    //
  }),
};
</script>
