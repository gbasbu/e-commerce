<script>
export default {

  data(){
      return{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      };
    }
}
</script>


<template>
    <main>
        <h1>Register Page</h1>
        <div>
        <form>
          <label for="firstName">First Name</label>
          <input type="text" name="firstName" v-model="firstName" placeholder="Enter Your Name">
          <label for="lastName">Last Name</label>
          <input type="text" name="lastName" v-model="lastName" placeholder="Enter Your Surname">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="email" placeholder="Enter Your E-mail">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Enter Your Password">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" placeholder="Enter Your Password Again">
          <button>Register</button>
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
      button{
        margin-top: 20px;
        margin-right: 25px;
      }
    }
  }
</style>