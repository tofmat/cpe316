<template>
  <div class="big">
    <div class="header">
      <div class="flex spaceBetween alignCenter">
        <img src="../assets/logocolored.png" alt="logo">
        <div>
          <v-btn class="signBtn">Sign up</v-btn>
        </div>
      </div>
    </div>
    <div class="mainBack flex justifyCenter alignCenter">
        <div class="loginPanel">
          <div>
            <h3>Login to your account</h3>
            <form @submit.prevent="loginUser(userInfo)">
              <v-text-field
                v-model="userInfo.username"
                label="Username"
                placeholder="Enter your username"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                v-model="userInfo.password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                hide-details="auto"
              ></v-text-field>
              <v-btn class="loginBtn logBtn" type="submit" :loading = loading>Login</v-btn>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      loading: false,
      userInfo : {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async loginUser(loginInfo){
      this.errors = ""
      try {
          this.loading = true;
          this.$toast.show('Logging in...')
          const response = await this.$auth.loginWith('local', {
            data: loginInfo
          })
          localStorage.token = response.data.token;
          this.$router.push('/loan')
          this.$toast.success('You are logged in')
          this.loading = false;
          return response;
      } catch (error){
          // this.errors = error.response.data.error
          this.loading = false;
          this.$toast.info('There was a problem logging in, check your credentials');
      }
    }
  }
}

</script>
<style scoped>
.big {
  background-color: #2F2E41;
}
.header {
  padding: 30px;
  padding-bottom: 0 !important;
}
.flex {
  display: flex;
}
.spaceBetween {
  justify-content: space-between;
}
.justifyCenter {
  justify-content: center;
}
.alignCenter {
  align-items: center;
}
.signBtn {
  background-color: #FF3926 !important;
  color: white !important;
  border-radius: 10px;
}
.mainBack {
  min-height: calc(100vh - 50px);
  background: url('../assets/mainBack.png');
  padding: 10px 100px;
  background-size: cover;
  background-repeat: no-repeat;
}
.loginPanel {
  background: rgba(255, 255, 255, 0.884);
  width: 400px;
  padding: 100px 20px;
  height: fit-content;
  border-radius: 20px;
}
.logBtn {
  margin-top: 30px;
  background-color: black !important;
  color:  white !important;
}
@media (max-width: 600px) {
  .header {
    padding: 10px !important;
  }
  .loginPanel {
    width: 90% !important;
  }
  .mainBack {
    padding: 10px 25px;
    align-items: flex-start;
    margin-top: 50px;
  }
}
</style>
