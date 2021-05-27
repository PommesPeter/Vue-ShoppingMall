<template>
  <v-container class="container">
    <form>
      <v-text-field
          v-model="userName"
          label="用户名"
          required
          style="justify-content: center; width: auto"
      ></v-text-field>
      <v-text-field
          v-model="passwd1"
          label="密码"
          required clearable type="password"
          style="justify-content: center; width: auto;"
      ></v-text-field>
      <v-text-field
          v-model="passwd2"
          label="确认密码"
          required clearable type="password"
          style="justify-content: center; width: auto;"
      ></v-text-field>

      <v-btn
          class="mr-4"
          @click="registerUser">
        注册
      </v-btn>
      <v-btn @click="clear" style="float: right">
        清空
      </v-btn>
      <v-btn @click="switchBackToLogin" style="margin-right: 10px; float: right">
        返回
      </v-btn>
    </form>
  </v-container>

</template>

<script>

export default {
  name: "LoginPage",
  props: ['user_id'],

  data: () => ({
    userName: "",
    passwd1: "",
    passwd2: ""
  }),
  methods: {
    clear() {
      this.userName = ''
      this.passwd1 = ''
      this.passwd2 = ''
    },
    registerUser() {
      if (this.passwd1 === this.passwd2) {
        if (this.passwd1.length === 0 || this.passwd2.length === 0) {
          alert("用户名不能为空...");
          return;
        }
        console.log(this.userName, this.passwd1)
        this.$axios.post('/user/register?name=' + this.userName + '&password=' + this.passwd1)
            .then(res => {
              if (res.data === "isexist") {
                alert("用户已经存在，请重新输入...")
              } else if (res.data === "ok") {
                this.switchBackToLogin();
                alert("注册成功...")
              } else this.$forceUpdate();
            })
            .catch(error => {
              console.log(error)
            })
      } else if (this.passwd1.length === 0 || this.passwd2.length === 0) {
        alert("用户名不能为空...")
      }
      else {
        this.clear();
        alert("两次输入密码不一致");
      }
    },
    switchBackToLogin() {
      this.$global.isShowLogin = true;
      this.$global.isShowRegister = false;
      this.$forceUpdate();
      this.$emit("onUpdateLogin", "LoginBack");
    }
  },
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

.footer {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}
</style>