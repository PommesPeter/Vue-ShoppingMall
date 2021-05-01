<template>
  <v-app>
    <v-app-bar
        app
        color="orange"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            class="shrink mr-2"
            contain
            src="./assets/drawing.svg"
            transition="scale-transition"
            width="40"
        />

        <v-img
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
      <LoginPage v-if="this.$global.isShowLogin"
                 v-model="this.$global.isShowLogin"
                 @sendUserIdEvent="showUserId"/>
<!--      这里有子组件给父组件传值的写法-->
      <div class="GoodsItem" v-if="this.$global.isShowGoodsList">
        <GoodsItem v-for="(item, index) in goods_list"
                   v-bind:item="item"
                   :key="index"
                   :user-id="userId"
                   class="goods-item-list"/>
      </div>
    </v-main>
    <BottomNavi class="bottom-navi"
                @onUpdatePage="updatePage"/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import BottomNavi from "./components/BottomNavi";
import GoodsItem from "./components/GoodsItem";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

export default {
  name: 'App',

  components: {
    BottomNavi,
    GoodsItem,
    LoginPage,
    RegisterPage
  },

  data: () => ({
    goods_list: [],
    userId: ""
  }),

  methods: {
    get_data() {
      this.$axios.get('/goods/list')
          .then(res => {
            this.goods_list = res.data;
            console.log(res.data)
            this.$global.isShowGoodsList = true;
          }).catch(error => {
        alert("数据获取失败..." + error)
      })
    },
    showUserId(data) {
      this.userId = data;
      //useless

    },
    updatePage(data) {
      console.log("Reloading....", data)
      this.$forceUpdate();
    }
  },
  mounted() {
    this.get_data();
  }
};
</script>

<style>

.bottom-navi {
  position: fixed;
}
</style>
