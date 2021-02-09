<script>
import { mapGetters } from 'vuex'
import AddressCard from '@/components/Address-card'

export default {
  components: { 
      AddressCard 
    },
    computed: {
        ...mapGetters(['addresses']),
    },
    
};
</script>


<template>
  <main>
      <div class="header">
        <h1>Addresses</h1>
        <router-link class="link underline" to="/address-add">New Address</router-link>
      </div>
      <address-card v-for="address in addresses" :address="address" :key="address.id" ></address-card>
  </main>
</template>


<style lang="scss" scoped>
main {
  min-height: 100vh;
  .header{
      text-align: center;
      margin-bottom: 40px;
      margin-top: 20px;
      h1{
          margin-bottom: 10px;
      }
      .link{
          font-size: 1.2rem;
      }
  }
}
</style>