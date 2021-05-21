<template>
  <div class="root">
<!--    <div v-for="(goods, index) in cart_list" :key="index">{{goods.name}}</div>-->
    <v-card
        class="mx-auto my-13"
        max-width="400"
        style="flex-flow: nowrap; float: left; margin: 20px !important;"
    >
      <v-img
          height="350"
          :src="'http://202.193.52.12:8080/' + thumbnail"/>

      <v-card-title>{{name}}</v-card-title>

      <v-card-text>
        <v-row
            align="center"
            class="mx-0"></v-row>
        <div class="my-4 subtitle-1">
          单项总价: $ {{price * parseFloat(num)}}
        </div>
        <div class="my-5 subtitle-1">
          商品数量: {{num}}
        </div>

      </v-card-text>

      <v-card-actions>
        <v-btn
            color="deep-purple lighten-2"
            text
        >
          加入购物车
        </v-btn>
        <v-btn
            color="deep-purple lighten-2"
            text
            @click="deleteItem($event)"
        >
          删除
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: ['cartId', 'userId', 'goodsId', 'thumbnail', 'name', 'num', 'price'],
  data: () => {
    return {

    }
  },
  mounted() {

  },
  methods: {
    deleteItem(event) {
      let current = event.currentTarget;
    },
  }
}
</script>

<style scoped>

</style>