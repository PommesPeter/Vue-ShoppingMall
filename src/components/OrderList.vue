<template>
  <div>
      <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
      ></v-data-table>
  </div>

</template>

<script>

export default {
  name: "OrderList",
  props: ['userId'],
  components: {

  }
}
</script>

<style scoped>

</style>