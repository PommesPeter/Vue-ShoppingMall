<template>
  <v-bottom-navigation
      :value="value"
      color="orange"
      hide-on-scroll
  >
    <v-btn @click="switchToLogin"
           style="height: auto">
      <span>注册/登录</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>

    <v-btn @click="switchToGoodsList"
           style="height: auto">
      <span>商品列表</span>
      <v-icon>mdi-shopping</v-icon>
    </v-btn>

    <v-btn @click="switchToCart"
           style="height: auto">
      <span>购物车</span>
      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-btn @click="switchToOrder"
           style="height: auto">
      <span>订单管理</span>
      <v-icon>mdi-reorder-horizontal</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNavi",
  data: () => ({value: 0}),
  methods: {
    switchToLogin() {
      this.$global.isShowLogin = true;
      this.$global.isShowOrder = false;
      this.$global.isShowGoodsList = false;
      this.$global.isShowCart = false;
      this.$forceUpdate();
      this.$emit("onUpdatePage", "Login");
    },
    switchToOrder() {
      this.$global.isShowLogin = false;
      this.$global.isShowOrder = true;
      this.$global.isShowGoodsList = false;
      this.$global.isShowCart = false;
      this.$forceUpdate();
      this.$emit("onUpdatePage", "Order");
    },
    switchToGoodsList() {
      this.$global.isShowLogin = false;
      this.$global.isShowOrder = false;
      this.$global.isShowGoodsList = true;
      this.$global.isShowCart = false;
      this.$forceUpdate();
      this.$emit("onUpdatePage", "GoodsList");
      console.log("1111", this.$global.isShowLogin, this.$global.isShowGoodsList);
    },
    switchToCart() {
      this.$global.isShowLogin = false;
      this.$global.isShowOrder = false;
      this.$global.isShowGoodsList = false;
      this.$global.isShowCart = true;
      this.$forceUpdate();
      this.$emit("onUpdatePage", "Cart");
    },
  }
}
</script>

<style scoped>


</style>