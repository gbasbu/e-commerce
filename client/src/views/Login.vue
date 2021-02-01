<script>
import { mapActions } from 'vuex'

export default {
    
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
            this.login(user).then(res => {
                if(res.data.success){
                    this.$router.push('/');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
}
</script>


<template>
    
    <main>
      <h1>Login Page</h1>
      <div>
        <form @submit.prevent="loginUser">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="email" placeholder="Enter Your E-mail">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Enter Your Password">
          <input class="submit" type="submit" value="Login">
          <router-link to="/register">Need an account?</router-link>
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