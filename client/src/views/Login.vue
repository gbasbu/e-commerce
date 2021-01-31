<script>
export default {
    
    data(){
      return{
        email: "",
        password: ""
      };
    }
}
</script>


<template>
    
    <main>
      <h1>Login Page</h1>
      <div>
        <form>
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="email" placeholder="Enter Your E-mail">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Enter Your Password">
          <button>Login</button>
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
      button{
        margin-top: 20px;
        margin-right: 25px;
      }
    }      
      
    
  }
</style>