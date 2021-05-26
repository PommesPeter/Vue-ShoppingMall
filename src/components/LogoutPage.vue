<template>
  <v-container class="container">
    <div>您已登录，开始您的购物之旅</div>
    <br/>
    <div>你的用户ID是: {{userId}}</div>
    <v-btn
        class="mr-4"
        @click="logoutToServer">
      注销
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "LogoutPage",
  data() {
    return {
      userId: localStorage.getItem("userId")
    }
  },
  methods: {
    logoutToServer() {
      this.userId = "";
      localStorage.setItem("userId", this.userId);
      this.$emit("onUpdateLogout", "LogOut")
      location.reload();
    }
  }
}
</script>

<style scoped>
.container {
  background: #f6f6f7;
  border-radius: 10px 10px 10px 10px;
  width: 80%;
  font-size: 20px;
  position: relative;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  max-width: 450px;
}
</style>