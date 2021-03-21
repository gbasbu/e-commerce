<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
export default {
  name: "Home",
  components: {
    
  },
  computed: {
    
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
  <div class="home">
    
  </div>
</template>


<style lang="scss" scoped>
div{
  text-align: center;
}
</style>