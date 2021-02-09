<script>
import { mapActions } from 'vuex'

export default {
    name: 'AddressCard',
    props: {
      address: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...mapActions(['deleteAddress']),
      remove(id){
          this.deleteAddress(id)
      }
    },
};
</script>

<template>
  <section>
      <h4><strong>{{ address.addressTitle }}</strong></h4>
      <p>{{ address.firstName }} {{ address.lastName }}</p>
      <p>{{ address.address }}</p>
      <p>{{ address.county }} / {{ address.province }}</p>
      <a href="" class="link" @click="remove(address._id)">Delete</a>
    </section>
</template>

<style lang="scss" scoped>
section{
  margin-bottom: 50px;
  text-transform: capitalize;
  h4{
    margin-bottom: 10px;
  }
  p{
    margin-bottom: 5px;
  }
}
</style>