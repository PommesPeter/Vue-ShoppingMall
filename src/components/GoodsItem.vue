<template>
  <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="400"
      style="flex-flow: nowrap; float: left; margin: 20px !important;"
  >
    <v-img
        height="250"
        :src="'http://202.193.52.12:8080/' + goods.pthumbnail"
    ></v-img>

    <v-card-title>{{ goods.name }}</v-card-title>
    <v-card-text>
      <v-row
          align="center"
          class="mx-0"
      >
      </v-row>

      <div class="my-4 subtitle-1">
        $ {{ goods.price1 }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
          color="deep-purple lighten-2"
          text
          @click="addGoodsToCart"
      >
        加入购物车
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GoodsItem",
  props: ['item', 'userId'],
  data: () => {
    return {
      item: [],
      userId: ""
    }
  },
  mounted() {
    this.goods = this.item
  },
  methods: {
    addGoodsToCart() {
      this.$axios.get('/goods/list')
          .then(res => {
            console.log(res.data)
          }).catch(error => {
        alert("数据获取失败" + error)
      })
    }
  }
}
</script>

<style scoped>

</style>