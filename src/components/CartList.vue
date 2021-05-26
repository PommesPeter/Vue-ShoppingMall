<template>
  <div class="root">
    <!--    <div v-for="(goods, index) in cart_list" :key="index">{{goods.name}}</div>-->
    <div v-show="isShow"
         style="margin: 200px; font-family: 'Microsoft YaHei UI',sans-serif; border: black; border-radius: 9px; position: relative">
      <div class="message">
        <v-img src="../assets/empty.svg" width="100" style="position:absolute; left: 220px; bottom: 32px"></v-img>
        <div class="txt">购物车空空如也哦~~，去看看心仪的商品吧~</div>
      </div>
    </div>
    <div v-for="(item, index) in cart_list" :key="index">
      <Cart :cartId="item.cardid" :uId="item.userId" :goodsId="item.goodsId"
            :thumbnail="item.thumbnail" :name="item.name" :num="item.num" :price="item.price"
            :onUpdateListAfterDel="updatePage" v-model="cart_list"/>
    </div>

  </div>
</template>

<script>

import Cart from "./Cart";

export default {
  name: "CartList",
  props: ['cart_list', 'userId'],
  data() {
    return {
      isShow: false
    }
  },
  components: {
    Cart
  },
  methods: {
    updatePage(data) {
      this.cart_list = JSON.parse(localStorage.getItem("cart_list"))
      console.log("Reloading....", data)
      this.$forceUpdate();
    }
  },
  updated() {
    this.isShow = this.cart_list.length === 0;
  }
}
</script>

<style scoped>
.message {
  height: 95px;
  padding-left: 341px;
  /*background: url("../assets/empty.svg") 200px no-repeat;*/
}
</style>