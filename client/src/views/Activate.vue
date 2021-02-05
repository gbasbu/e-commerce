<script>
import { mapActions } from 'vuex'

export default {
    components:{
      
    },
    data(){
      return{
        email: "",
        emailToken: ""
      };
    },
    methods: {
        ...mapActions(['activate']),
        activateUser(){
            let user = {
                email: this.email,
                emailToken: this.emailToken
            };
            this.activate(user).then(res => {
                if(res.data.success){
                    setTimeout(() => window.close(),3000)
                }
            })
        },
    },
}
</script>


<template>
    
    <main>
      <h1>Activation</h1>
      <div>
        <form @submit.prevent="activateUser">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="email">
          <label for="emailToken">Activation Code</label>
          <input type="text" id="emailToken" name="emailToken" maxlength="6" v-model="emailToken">
          <input class="submit" type="submit" value="Activate">
          <router-link class="create link" to="/login">Back to Login</router-link>
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
    input[type="email"], input[type="text"]{
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
  }
</style>