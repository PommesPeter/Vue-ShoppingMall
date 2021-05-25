<template>
  <div class="root">
    <!--    <div v-for="(goods, index) in cart_list" :key="index">{{goods.name}}</div>-->
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
  components: {
    Cart
  },
  methods: {
    updatePage(data) {
      this.cart_list = JSON.parse(localStorage.getItem("cart_list"))
      console.log("Reloading....", data)
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped>

</style>