<script>
import{ mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters(['user', 'addresses']),
    methods: {
      ...mapActions(['getProfile', 'fetchAddress']),
      ...mapActions(["logout"]),
      logoutUser() {
        this.logout();
      },
    },
    created() {
      this.getProfile()
      this.fetchAddress()
    },
}
</script>


<template>
    <main>
      <h1>My Account</h1>
      <router-link class="underline link" :to="logoutUser">Logout</router-link>
      <div class="user-details">
        <h2>Account Details</h2>
        <div v-if="user">
          <ul>
            <li>
              <p class="username">{{ this.user.firstName }} {{ this.user.lastName }} </p>
            </li>
            <li>
              <router-link to="/addresses" class="link">
                View my addresses ({{ addresses.length }})
              </router-link>
            </li>
          </ul>
        </div>
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
      margin-top: 20px;
    }
    a{
      text-align: center;
      margin-bottom: 50px;
      margin-top: 10px;
      font-size: 1.2rem;
    }
    .user-details{
      margin-bottom: 30px;
      h2{
        margin-bottom: 10px;
      }
      .username{
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: capitalize;
      margin-bottom: 5px;
      }
      p{
        font-size: 1.2rem;
      }
      .link{
        border-bottom: 1px solid lightgray;
        padding-bottom: 5px;
      }
    }
    
    
  }
</style>