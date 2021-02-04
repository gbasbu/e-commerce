<script>
import { mapActions, mapGetters } from 'vuex'
import Infos from '@/components/Infos'

export default {
  components:{
    Infos
  },
  data(){
      return{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: ""
      };
    },
    computed:{
      ...mapGetters(['info'])
    },
    methods: {
      ...mapActions(['register']),
      registerUser(){
        let user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        };
        this.register(user).then(res => {
          if(res.data.success){
            this.$router.push('/login');
          }
        })
      }
    },
}
</script>


<template>
    <main>
        <h1>Register Page</h1>
        <Infos v-if="info" :msg="info.msg" :class="[ info.success == false ? 'info-error' : 'info-success' ]" />
        <div>
        <form @submit.prevent="registerUser">
          <label for="firstName">First Name</label>
          <input type="text" name="firstName" v-model="firstName" >
          <label for="lastName">Last Name</label>
          <input type="text" name="lastName" v-model="lastName" >
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="email" >
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" >
          <label for="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" name="confirm_password" v-model="confirm_password" >
          <input type="submit" class="submit" value="Register">
          <router-link class="login link" to="/login">Already have an account?</router-link>
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
    input{
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
    .login{
      display: inline-block;
      width: 100%;
      background-color: white;
      border: 2px solid black;
      padding: 10px 0;
      border-radius: 20px;
      text-align: center;
      font-weight: bold;
      margin-top: -10px;
    }
  }
</style>