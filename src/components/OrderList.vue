<template>
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
      selectedCart: []
    }
  },
  components: {
    OrderTable
  },
  computed: {
    load_order_list () {
      this.$forceUpdate();
      return this.order_list;
    }
  },
  mounted() {
    localStorage.setItem("selectedCart", JSON.stringify(this.selectedCart))
  }

}
</script>

<style scoped>

</style>