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
      <LoginPage v-if="isShowLogin" @click="loginToServer"/>
      <div class="GoodsItem" v-if="isShowGoodsList">
        <GoodsItem v-for="(item, index) in goods_list"
                   v-bind:item="item"
                   :key="index"
                   :user-id="userId"
                   class="goods-item-list"/>
      </div>
    </v-main>
    <ButtomNavi class="button-navi"/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import ButtomNavi from "./components/ButtomNavi";
import GoodsItem from "./components/GoodsItem";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

export default {
  name: 'App',

  components: {
    ButtomNavi,
    GoodsItem,
    LoginPage,

    RegisterPage
  },

  data: () => ({
    goods_list: [],
    isShowLogin: true,
    isShowCart: false,
    isShowGoodsList: false,
    isShowOrder: false,
    userName: "",
    passwd: "",
    userId: ""
  }),

  methods: {
    get_data() {
      this.$axios.get('/goods/list')
          .then(res => {
            this.goods_list = res.data
          }).catch(error => {
        alert("数据获取失败" + error)
      })
    },
    loginToServer() {
      this.$axios.post('/user/login?name=' + this.userName + "&password=" + this.passwd)
      .then(res => {
        this.userId = res.data;
      }).catch(error => {

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
