<template>
  <div class="root">
    <!--    <div v-for="(goods, index) in cart_list" :key="index">{{goods.name}}</div>-->
    <div v-for="(item, index) in cart_list" :key="index">
      <Cart :cartId="item.cartId" :uId="item.userId" :goodsId="item.goodsId"
            :thumbnail="item.thumbnail" :name="item.name" :num="item.num" :price="item.price"/>
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
  data: () => {
    return {

    }
  },
  mounted() {
  console.log(this.cart_list)
  },
  methods: {
    deleteItem(event) {


    }
  }
}
</script>

<style scoped>

</style>