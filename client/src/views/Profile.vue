<script>
import{ mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters(['user', 'addresses', 'orders']),
    methods: {
      ...mapActions(['getProfile', 'logout', 'fetchAddresses', 'fetchOrders']),
      logoutUser() {
        this.logout();
      },
    },
    created() {
      if(this.user){
        this.getProfile(),
        this.fetchAddresses(),
        this.fetchOrders()
      } 
    },
}
</script>


<template>
    <main>
      <div class="header">
        <h1>My Account</h1>
        <button class="underline link" @click.prevent="logoutUser">Logout</button>
      </div>
      <div class="container">
        <div class="user-details">
          <h2>Account Details</h2>
          <div v-if="user">
            <ul>
              <li>
                <p class="username">{{ this.user.firstName }} {{ this.user.lastName }} </p>
              </li>
              <li>
                <router-link to="/addresses" class="link" v-if="addresses.length > 0">
                  View my addresses ({{ addresses.length }})
                </router-link>
              </li>
              <li>
                <router-link to="/address-add" class="link" v-if="addresses.length == 0">
                  Create new address
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="orders-details">
          <h2>Orders Details</h2>
          <div v-if="orders">
            <ul>
              <li>
                  <p v-if="orders.length == 0">No order has been placed yet</p>
              </li>
              <li>
                <router-link to="/orders" class="link" v-if="orders.length > 0">
                  View my orders ({{ orders.length }})
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
</template>


<style lang="scss" scoped>
main{
  h2{
    margin-bottom: 15px;
  }
  .header{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    margin-top: 30px ;
    margin-bottom: 70px;
  }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @media (min-width:768px) {
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
      margin-top: 150px;
    }
    h2{
      opacity: .8;
    }
    .user-details{
      margin-top: 50px;
      @media (min-width:768px) {
        margin: 0;
      }
      .username{
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: -10px;
        margin-bottom: 10px;
      }
    }
    .orders-details{
      margin-top: 70px;
      @media (min-width:768px) {
        margin: 0;
      }
    }
  }
}
</style>