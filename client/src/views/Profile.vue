<script>
import{ mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters(['user']),
    methods: {
      ...mapActions(['getProfile'])
    },
    created() {
      this.getProfile();
    },
}
</script>


<template>
    <main>
      <h1>My Account</h1>
      <div class="user-details">
        <h2>User Details</h2>
        <div v-if="user">
          <ul>
            <li>
              <p class="username">{{ this.user.firstName }} {{ this.user.lastName }} </p>
            </li>
            <li>
              <p>{{ this.user.email }} </p>
            </li>
            <li>
              <router-link to="">Reset Password</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-addresses">
        <h2>Adresses</h2>
      </div>
    </main>
</template>


<style lang="scss" scoped>
  main{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    h1{
      text-align: center;
      margin-bottom: 40px;
    }
    .user-details{
      h2{
        margin-bottom: 5px;
      }
      .username{
      font-size: 1.2rem;
      text-transform: capitalize;
      }
      p{
        font-size: 1.2rem;
      }
    }
    
    
  }
</style>