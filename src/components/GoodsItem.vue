<template>
  <div class="root">

    <v-card
        class="mx-auto my-13"
        max-width="400"
        style="flex-flow: nowrap; float: left; margin: 20px !important;"
    >
      <v-img
          height="350"
          :src="'http://202.193.52.12:8080/' + goods.pthumbnail"
      ></v-img>

      <v-card-title>{{ goods.name }}</v-card-title>

      <v-card-text>
        <v-row
            align="center"
            class="mx-0"></v-row>
        <div class="my-4 subtitle-1">
          商品单价： $ {{ goods.price1 }}
        </div>
        <div class="my-4 subtitle-1">
          商品总价： $ {{ parseFloat(goods.price1) * num }}
        </div>
        <div style="position: relative">
          <v-btn class="mx-2" fab small style="float:left;" @click="decreaseNum">
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
          <v-textarea
              no-resize
              single-line
              outlined dense :value="num" v-model="num"
              rows="1" row-height="15" style="width: 2.5em; height: 1em"
          ></v-textarea>
          <v-btn class="mx-2" fab small @click="increaseNum" style="position: absolute; left: 95px; top: 0px">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
            color="deep-purple lighten-2"
            text style="right: 75px; top: 5px"
            @click="addGoodsToCart">
          加入购物车
        </v-btn>
      </v-card-actions>


      <v-spacer></v-spacer>

    </v-card>
  </div>

</template>

<script>
export default {
  name: "GoodsItem",
  props: ['item', 'userId'],
  data: () => {
    return {
      goods : {},
      cart_list: [],
      num: 1,
      goodsId: "",
      price: 0
    }
  },
  mounted() {
    this.goods = this.item
    this.num = 1;
    this.$axios.get(`/cart/listByUser?userId=${this.userId}`)
        .then(res => {
          this.cart_list = res.data;
          localStorage.setItem("cart_list", JSON.stringify(this.cart_list));
          // console.log(res.data)
        }).catch(error => {
      alert("发生错误..." + error);
    });
    // console.log("111", this.userId)

  },
  methods: {
    addGoodsToCart() {
      const {id, price1} = this.goods
      this.$axios.post(`/cart/add?userId=${this.userId}&goodsId=${id}&num=${this.num}&price=${price1}`)
          .then(res => {
            localStorage.setItem("cart_list", JSON.stringify(res.data));
            console.log(res.data)
            alert("加入购物车成功...")
          }).catch(err => {
        alert("请求错误...." + err)
      })
    },
    increaseNum() {
      this.num++;
    },
    decreaseNum() {
      if (this.num <= 1) this.num = 1;
      else this.num--;
    }
  }
}
</script>

<style scoped>

</style>