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
      <LoginPage v-show="this.$global.isShowLogin"
                 @sendUserIdEvent="showUserId" :user-id="userId"/>
      <!--      这里有子组件给父组件传值的写法-->
      <div class="GoodsItem"
           v-show="this.$global.isShowGoodsList">
        <GoodsItem v-for="(item, index) in goods_list"
                   v-bind:item="item"
                   :key="index"
                   :user-id="userId"
                   class="goods-item-list"/>
      </div>
      <div class="CartItem"
           v-show="this.$global.isShowCart">
        <Cart :user-id="userId"/>
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
import Cart from "./components/Cart";

export default {
  name: 'App',

  components: {
    BottomNavi,
    GoodsItem,
    LoginPage,
    RegisterPage,
    Cart
  },

  data: () => ({
    goods_list: [],
    cart_list: [],
    userId: ""
  }),

  methods: {
    get_data() {
      this.$axios.get('/goods/list')
          .then(res => {
            this.goods_list = res.data;
          }).catch(error => {
        alert("数据获取失败..." + error)
      })
    },
    showUserId(data) {
      if (data !== "invalid") {
        this.userId = data;
      }
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
