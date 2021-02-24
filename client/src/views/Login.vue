<script>
import { mapActions } from 'vuex'

export default {
    components:{
      
    },
    data(){
      return{
        email: "",
        password: ""
      };
    },
    methods: {
        ...mapActions(['login']),
        loginUser(){
            let user = {
                email: this.email,
                password: this.password
            };
            this.login(user).then(() => {
               this.$router.push('/profile');
            })
        },
    },
}
</script>


<template>
    
    <main>
      <h1>Login</h1>
      <div>
        <form @submit.prevent="loginUser">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="email" required>
          <div class="forgot">
            <label for="password">Password</label>
            <router-link to="/reset-request">Forgot Password</router-link>
          </div>
          <input type="password" id="password" name="password" v-model="password" required>
          <input class="submit" type="submit" value="Login">
          <router-link class="create link" to="/register">Register</router-link>
        </form>
      </div>
    </main>
</template>


<style lang="scss" scoped>
  main{
    min-height: 100vh;
    h1{
      margin: 30px 0;
      text-align: center;
    }
    label,input{
      display: block;
    }
    input[type="submit"], .create{
      cursor: pointer;
    }
    input[type="email"], input[type="password"]{
      width: 100%;
      border: none;
      border-bottom: 2px solid black;
      margin-bottom: 30px;
      padding: 10px 20px;
    }
    input[type="submit"]{
      width: 100%;
      background-color: black;
      color: white;
      border:none;
      padding: 15px 0;
      border-radius: 20px;
      margin-top: 40px;
      font-weight: bold;
    }
    .create{
      display: inline-block;
      width: 100%;
      background-color: white;
      border: 2px solid black;
      padding: 10px 0;
      border-radius: 20px;
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
    }
    .forgot{
      display: flex;
      justify-content: space-between;
    }
  }
</style>