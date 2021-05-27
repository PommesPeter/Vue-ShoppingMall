<template>
  <div class="root">
    <!--    <div v-for="(goods, index) in cart_list" :key="index">{{goods.name}}</div>-->
    <v-card
        class="mx-auto my-13"
        max-width="400"
        style="flex-flow: nowrap; float: left; margin: 20px !important;"
        :style="{background: bgColor}"
    >
      <v-img
          height="350"
          :src="'http://202.193.52.12:8080/' + thumbnail"/>
      <v-card-title>
        {{ name }}
      </v-card-title>
      <v-card-text>
        <v-row
            align="center"
            class="mx-0"></v-row>
        <div class="my-4 subtitle-1">
          单项总价: $ {{ price * parseFloat(num) }}
        </div>
        <div class="my-5 subtitle-1">
          商品数量: {{ num }}
        </div>

      </v-card-text>

      <v-card-actions>
        <v-btn
            color="deep-purple lighten-2"
            text @click="chooseItem" v-model="selected">
          选中
        </v-btn>
        <v-btn
            color="deep-purple lighten-2"
            text
            @click="deleteItem">
          删除
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: ['cartId', 'uId', 'goodsId', 'thumbnail', 'name', 'num', 'price'],
  data: () => {
    return {
      userId: localStorage.getItem("userId"),
      selected: false,
      bgColor: "white",
      selectedCart: []
    }
  },
  methods: {
    deleteItem() {
      this.$axios.post(`/cart/deleteById?userId=${this.userId}&cartId=${this.cartId}`)
          .then(res => {
            // this.cart_list = res.data;
            localStorage.setItem("cart_list", JSON.stringify(res.data));
            console.log("删除成功");
            this.$forceUpdate();
            this.$emit("onUpdateListAfterDelete", "DelList", res.data);
            // alert("删除成功...");
          })
          .catch(err => {
            alert("发生错误:" + err);
          })
    },
    chooseItem() {
      this.selectedCart = JSON.parse(localStorage.getItem("selectedCart"));
      console.log(this.selected)
      if (this.selected === true) {
        this.selected = false;
        this.bgColor = "white";
        this.selectedCart.pop();
        localStorage.setItem("selectedCart", JSON.stringify(this.selectedCart));
      } else {
        this.selected = true;
        this.bgColor = "lightblue";
        this.selectedCart.push(this.cartId)
        localStorage.setItem("selectedCart", JSON.stringify(this.selectedCart));
      }
      console.log(this.selectedCart)
    }
  },
}
</script>

<style scoped>

</style>