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
            src="./assets/title.png"
            width="150" style="margin-left: 10px"
        />
        <v-btn class="mx-4" v-show="this.$global.isShowCart" @click="createOrder"
               style="width: 100px">
          生成订单
        </v-btn>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <LoginPage v-if="userId.length === 0" v-show="this.$global.isShowLogin" @onUpdateRegister="updatePage"
                 @sendUserIdEvent="showCartFromUserId"/>
      <LogoutPage v-else v-show="this.$global.isShowLogin" @onUpdateLogout="updatePage"></LogoutPage>

      <RegisterPage v-show="this.$global.isShowRegister"
                    @onUpdateLogin="updatePage"/>
      <!--      这里有子组件给父组件传值的写法-->
      <div class="GoodsItem"
           v-show="this.$global.isShowGoodsList">
        <GoodsItem v-for="(item, index) in goods_list"
                   :item="item" :key="index" :user-id="userId"
                   class="goods-item-list"/>
      </div>
      <div class="CartList"
           v-show="this.$global.isShowCart">
        <CartList :cart_list="load_cart_data" @onUpdateDeleteList="updatePage"/>
      </div>
      <div class="OrderList"
           v-show="this.$global.isShowOrder">
        <OrderList :order_list="load_order_data" :user-id="this.userId"/>
      </div>
    </v-main>
    <BottomNavi class="bottom-navi"
                @onUpdatePage="updatePage" @onUpdateList="showCartFromUserId(userId)"
                @onUpdateOrderList="showOrderFromUserId(userId)"/>
  </v-app>
</template>

<script>
import BottomNavi from "./components/BottomNavi";
import GoodsItem from "./components/GoodsItem";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartList from "./components/CartList";
import OrderList from "./components/OrderList";
import LogoutPage from "./components/LogoutPage";

export default {
  name: 'App',
  components: {
    BottomNavi,
    GoodsItem,
    LoginPage,
    RegisterPage,
    CartList,
    OrderList,
    LogoutPage
  },
  data: () => ({
    goods_list: [],
    cart_list: [],
    order_list: [],
    userId: '',
    isLogin: false
  }),
  methods: {
    get_goods_data() {
      this.$axios.get('/goods/list')
          .then(res => {
            this.goods_list = res.data;
            localStorage.setItem("goods_list", JSON.stringify(res.data));
          }).catch(error => {
        alert("数据获取失败..." + error)
      })
    },
    showCartFromUserId(data) {
      console.log("userId", data.toString())
      if (data !== 'undefined' && data != null && data !== "") {
        this.userId = data;
        this.updatePage("GoodsList2")
        this.$axios.get(`/cart/listByUser?userId=${data}`)
            .then(res => {
              this.cart_list = res.data;
              localStorage.setItem("cart_list", JSON.stringify(res.data));
              // console.log(res.data)
            }).catch(error => {
          alert("发生错误..." + error);
        })
      } else {
        this.userId = "";
      }
      this.cart_list = JSON.parse(localStorage.getItem("cart_list"))
      console.log(this.cart_list)
    },
    showOrderFromUserId(data) {
      console.log(data, "222")
      if (data.length !== 0) {
        this.userId = data;
        this.updatePage("OrderList")
        this.$axios.get('/order/listByUser?userId=' + data)
            .then(res => {
              localStorage.setItem("order_list", JSON.stringify(res.data));
              this.order_list = res.data;
              console.log("order_list", res.data)
            }).catch(error => {
          alert("发生错误..." + error);
        })
      } else {
        this.userId = "";
      }
      // this.order_list = JSON.parse(localStorage.getItem("order_list"));
    },
    createOrder() {
      let selectedCart = JSON.parse(localStorage.getItem("selectedCart"));
      if (selectedCart.length === 0) {
        alert("未选择任何商品，无法生成订单...");
      } else {
        let needed = selectedCart.toString();
        this.$axios.post(`/order/addCastOrder?userId=${this.userId}&cartList=${needed}`)
        .then(res => {
          localStorage.setItem("order_list", JSON.stringify(res.data));
          alert("生成订单成功....")
          console.log(res.data)
        })
        .catch(err => {
          alert("出错了...." + err)
        })
      }
    },
    updatePage(data) {
      console.log("Reloading....", data)
      this.$forceUpdate();
    }
  },
  computed: {
    load_cart_data() {
      return this.cart_list;
    },
    load_order_data() {
      // console.log("order_list length", this.order_list.length)
      return this.order_list;
    }
  },
  mounted() {
    this.get_goods_data();
    localStorage.setItem("userId", this.userId);
    console.log(localStorage.getItem("userId"));
  }
};
</script>

<style>
.bottom-navi {
  position: fixed;
}
</style>
