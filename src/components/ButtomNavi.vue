<template>
  <v-bottom-navigation
      :value="value"
      color="primary"
  >
    <v-btn>
      <span>注册/登录</span>

      <v-icon>mdi-login</v-icon>
    </v-btn>

    <v-btn>
      <span>商品列表</span>

      <v-icon>mdi-shopping</v-icon>
    </v-btn>

    <v-btn>
      <span>购物车</span>

      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-btn>
      <span>订单管理</span>

      <v-icon>mdi-reorder-horizontal</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "NaviDrawer",
  data: () => ({value: 1}),
}
</script>

<style scoped>

</style>