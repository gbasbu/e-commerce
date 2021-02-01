<script>
import { mapActions } from 'vuex'
export default {

  data(){
      return{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: ""
      };
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
        <div>
        <form @submit.prevent="registerUser">
          <label for="firstName">First Name</label>
          <input type="text" name="firstName" v-model="firstName" placeholder="Enter Your Name">
          <label for="lastName">Last Name</label>
          <input type="text" name="lastName" v-model="lastName" placeholder="Enter Your Surname">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="email" placeholder="Enter Your E-mail">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Enter Your Password">
          <label for="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" name="confirm_password" v-model="confirm_password" placeholder="Enter Your Password Again">
          <input type="submit" class="submit" value="Register">
          <router-link to="/login">Already have an account?</router-link>
        </form>
      </div>
    </main>
</template>


<style lang="scss" scoped>
  main{
    padding: 0 20px;
    
    @media (min-width:768px) {
    padding: 0 40px;
    }
    @media (min-width:1024px) {
      padding: 0 80px;
    }

    div{
      display: flex;
      justify-content: center;
      width: 100%;
      label{
        display:block;
        margin-top: 10px;
      }
      input{
        display: block;
      }
      .submit{
        margin: 15px 0;
      }
    }
  }
</style>