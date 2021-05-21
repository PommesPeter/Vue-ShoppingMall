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
      <LoginPage v-show="this.$global.isShowLogin" @onUpdateLogin="updatePage"
                 @sendUserIdEvent="showCartFromUserId"/>
      <RegisterPage v-show="this.$global.isShowRegister"
                    @onUpdateLogin="updatePage"/>
      <!--      这里有子组件给父组件传值的写法-->
      <div class="GoodsItem"
           v-show="this.$global.isShowGoodsList">
        <GoodsItem v-for="(item, index) in goods_list"
                   :item="item" :key="index" :user-id="userId"
                   class="goods-item-list"/>
      </div>
      <div class="CartItem"
           v-show="this.$global.isShowCart">
        <CartList :cart_list="load_data"
              :user-id="userId"/>
      </div>
    </v-main>
    <BottomNavi class="bottom-navi"
                @onUpdatePage="updatePage" @onUpdateList="showCartFromUserId(userId)"/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import BottomNavi from "./components/BottomNavi";
import GoodsItem from "./components/GoodsItem";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartList from "./components/CartList";

export default {
  name: 'App',

  components: {
    BottomNavi,
    GoodsItem,
    LoginPage,
    RegisterPage,
    CartList
  },

  data: () => ({
    goods_list: [],
    cart_list: [],
    userId: localStorage.getItem("userId")
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
    showCartFromUserId(data) {
      console.log(data, "1111")
      if (data !== 'undefined' && data != null && data !== "") {
        this.userId = data;
        this.updatePage("GoodsList2")
        this.$axios.get('/cart/listByUser?userId=' + data)
            .then(res => {
              this.cart_list = res.data;
              // console.log(res.data)
            }).catch(error => {
          alert("发生错误..." + error);
        })
      } else {
        this.userId = "";
      }
    },
    updatePage(data) {
      console.log("Reloading....", data)
      this.$forceUpdate();
    }
  },
  computed: {
    load_data() {
      return this.cart_list;
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
