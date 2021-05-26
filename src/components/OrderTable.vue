<template>
  <div class="root">
    <v-card>
      <v-card-title style="font-family: 'Microsoft YaHei UI',sans-serif; border-radius: 8px; margin: 20px">
        第 {{index + 1}} 个订单:
        <br/>
        当前订单编号为:{{ order_item.id }}
        <br/>
        下单时间为:{{ order_item.orderTime }}
        <v-spacer></v-spacer>
        <v-btn @click="update_data_to_table" style="margin: 20px;">
          点击手动更新数据
        </v-btn>
      </v-card-title>

    </v-card>


    <v-data-table
        :headers="headers"
        :items="goods"
        :items-per-page="7"
        class="elevation-1"
    ></v-data-table>
    <v-divider></v-divider>
  </div>

</template>

<script>
export default {
  name: "OrderTable",
  props: ['order_item', 'index'],
  data() {
    return {
      headers: [
        {text: "商品ID", value: 'id'},
        {
          text: "商品名称",
          align: 'start',
          sortable: true,
          value: 'goods_name'
        },
        {text: "商品数量", value: 'num'},
        {text: "商品总价", value: 'price'},
      ],
      goods: []
    }
  },
  methods: {
    add_data_to_table() {
      const {id, orderTime, orderDetail} = this.order_item;
      console.log("add", orderDetail)
      for (let i = 0; i < orderDetail.length; i++) {
        this.goods.push({
          id: orderDetail[i].goodsId,
          goods_name: orderDetail[i].goodsName,
          num: orderDetail[i].nums.split(",")[0],
          price: orderDetail[i].nums.split(",")[1].split("=")[1]
        })
      }
    },
    update_data_to_table() {
      this.goods = [];
      const {id, orderTime, orderDetail} = this.order_item;
      console.log("update", orderDetail)
      for (let i = 0; i < orderDetail.length; i++) {
        this.goods.push({
          id: orderDetail[i].goodsId,
          goods_name: orderDetail[i].goodsName,
          num: orderDetail[i].nums.split(",")[0],
          price: orderDetail[i].nums.split(",")[1].split("=")[1]
        })
      }
    }
  },
  mounted() {
    this.add_data_to_table()
  }

}
</script>

<style scoped>

</style>