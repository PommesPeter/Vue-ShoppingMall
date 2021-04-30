<template>
  <v-container class="container">
    <form>
      <v-text-field
          v-model="userName"
          :error-messages="nameErrors"
          :counter="20"
          label="用户名"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          style="justify-content: center; width: auto"
      ></v-text-field>
      <v-text-field
          v-model="passWord"
          :error-messages="emailErrors"
          label="密码"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          style="justify-content: center; width: auto;"
      ></v-text-field>

      <div class="footer">
        <a class="forget password" href="#">Forgot Password?</a>
      </div>

      <v-btn
          class="mr-4"
          @click="submit">
        登录
      </v-btn>
      <v-btn
          class="mr-4"
          @click="submit">
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
  mixins: [validationMixin],

  validations: {
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    select: {required},
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    userName: '',
    passWord: '',
  }),

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
     submit() {
      this.$v.$touch()
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
    regiSter() {
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