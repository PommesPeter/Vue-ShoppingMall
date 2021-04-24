<template>
  <v-app>
    <HelloWorld/>
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
