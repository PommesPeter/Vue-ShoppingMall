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
      <GoodsItem v-for="(item, index) in goods_list" v-bind:item="item" :key="index" class="goods-item-list"/>
    </v-main>
    <ButtomNavi class="button-navi"/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import ButtomNavi from "./components/ButtomNavi";
import GoodsItem from "./components/GoodsItem";

export default {
  name: 'App',

  components: {
    ButtomNavi,
    GoodsItem
  },

  data: () => ({
    goods_list: []
  }),

  methods: {
    get_data() {
      this.$axios.get('/goods/list')
          .then(res => {
            this.goods_list = res.data
          }).catch(error => {
        alert("数据获取失败" + error)
      })
    }
  },
  mounted() {
    this.get_data();
  }
};
</script>

<style>

.button-navi {
  position: fixed;
}
</style>
