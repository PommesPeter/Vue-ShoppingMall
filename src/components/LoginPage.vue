<template>
  <v-container class="container">
    <form>
      <v-text-field
          v-model="userName"
          :counter="20"
          label="用户名"
          required
          style="justify-content: center; width: auto"
      ></v-text-field>
      <v-text-field
          v-model="passwd"
          label="密码"
          required
          style="justify-content: center; width: auto;"
      ></v-text-field>

      <div class="footer">
        <a class="forget password" href="#">Forgot Password?</a>
      </div>

      <v-btn
          class="mr-4"
          @click="loginToServer">
        登录
      </v-btn>
      <v-btn
          class="mr-4"
          @click="registerUser">
        注册
      </v-btn>
      <v-btn @click="clear" style="float: right">
        清空
      </v-btn>
    </form>
  </v-container>

</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'

export default {
  name: "LoginPage",

  data: () => ({
    userName: "",
    passwd: "",
  }),
  methods: {
    loginToServer() {
      this.$axios.post('/user/login?name=' + this.userName + "&password=" + this.passwd)
          .then(res => {
            if (res.data === "invalid") {
              alert("用户名或密码错误，请重试...")
              this.$emit("sendUserIdEvent", this.userId);
            } else {
              this.userId = res.data;
              this.$global.isShowLogin = false;
              this.$emit("sendUserIdEvent", this.userId);
            }

          }).catch(error => {
        alert("登录失败，请重试..." + error)
      })
    },
    clear() {
      this.userName = ''
      this.passwd = ''
    },
    registerUser() {
      this.$axios.post('http://202.193.52.12:8080/user/register?name=jianhgao3&password=123456')
          .then(res => {
            if (res.data === "isexist") {
              alert(res.data)
            } else if (res.data === "ok") {
              alert(res.data)
            }
          })
          .catch(error => {
            console.log(error)
          })
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