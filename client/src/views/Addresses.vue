<script>
import AddressCard from '@/components/Address-card'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { 
      AddressCard 
    },
    computed: {
        ...mapGetters(['addresses'])
    },
    methods: {
        ...mapActions(['fetchAddresses', 'isLoggedIn'])
    },
    created() {
        this.fetchAddresses()
    },
};
</script>


<template>
  <main>
      <div class="header">
        <h1>Addresses</h1>
        <router-link class="link underline" to="/address-add">New Address</router-link>
      </div>
      <div class="addresses">
        <AddressCard class="address" v-for="address in addresses" :address="address" :key="address.id" />
      </div>
  </main>
</template>


<style lang="scss" scoped>
main {
  min-height: 100vh;
  .header{
      text-align: center;
      margin-bottom: 70px;
      margin-top: 20px;
      h1{
          margin-bottom: 10px;
      }
      .link{
          font-size: 1.2rem;
      }
  }
  .addresses{
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    text-align: center;
    margin:0 auto;
    @media (min-width:768px) {
      grid-template-columns: 1fr 1fr;
    }
    .address{
      margin:0 auto;
      margin-bottom: 70px;
    }
  }
}
</style>