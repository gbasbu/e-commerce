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
        ...mapActions(['fetchAddresses'])
    },
    mounted() {
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
      <AddressCard v-for="address in addresses" :address="address" :key="address.id" />
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