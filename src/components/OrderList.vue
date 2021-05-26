<template>
<!--  <div v-show="isEmptyList" style="position: relative">-->
<!--    <div class="txt" style="position:absolute; left: 650px; top: 200px">订单列表为空~~</div>-->
<!--  </div>-->
  <div class="root">
    <div v-for="(orders, index) in load_order_list" :key="index">
      <OrderTable :order_item="orders" :index="index"/>
    </div>
  </div>

</template>

<script>
import OrderTable from "./OrderTable";
export default {
  name: "OrderList",
  props: ['userId', 'order_list'],
  data() {
    return {
      selectedCart: [],
      isEmptyList: false
    }
  },
  components: {
    OrderTable
  },
  computed: {
    load_order_list () {
      console.log(this.order_list)
      return this.order_list;
    }
  },
  mounted() {
    localStorage.setItem("selectedCart", JSON.stringify(this.selectedCart))
  },
  updated() {
    // this.isEmptyList = this.order_list.length === 0;
  }
}
</script>

<style scoped>

</style>