<template>
  <div class="root">
    <div v-for="(goods, index) in cart_list" :key="index">{{goods.name}}</div>
    <v-card
        v-for="(goods, index) in cart_list"
        :key="index"
        class="mx-auto my-12"
        max-width="400"
        style="flex-flow: nowrap; float: left; margin: 20px !important;"
    >
      <v-img
          height="300"
          :src="'http://202.193.52.12:8080/' + goods.thumbnail"/>

      <v-card-title>{{ goods.name }}</v-card-title>
      <v-card-text>
        <v-row
            align="center"
            class="mx-0"></v-row>

        <div class="my-4 subtitle-1">
          单项总价: $ {{ goods.price * parseFloat(goods.num) }}
        </div>
      </v-card-text>

      <v-input></v-input>

      <v-card-actions>
        <v-btn
            color="deep-purple lighten-2"
            text
        >
          加入购物车
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: ['cart_list', 'userId'],
  data: () => {
    return {
      pass: ""
    }
  },
  mounted() {
    console.log("cart " + this.cart_list)

  },
  methods: {}
}
</script>

<style scoped>

</style>