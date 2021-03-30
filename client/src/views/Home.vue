<script>
import { mapActions, mapGetters } from 'vuex'
import ProductCard from '@/components/Product-card'

export default {
  name: "Home",
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters(['products', 'user'])
  },
  methods: {
    ...mapActions(['fetchAddresses', 'fetchProducts'])
  },
  mounted() {
    if(this.user !== ''){
      this.fetchAddresses()
    }
    this.fetchProducts()
  },
};
</script>

<template>
  <main class="home">
    <ProductCard class="product" v-for="product in products" :key="product.id" :product="product" />
  </main>
</template>


<style lang="scss" scoped>
main{
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width:500px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width:768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width:1000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .product{
    margin: 0 auto;
    min-height: 100vh;
    margin-top: 50px;
    @media (min-width:500px) {
      min-height: 80vh;
      margin-top: 60px;
    }
    @media (min-width:768px) {
      min-height: 80vh;
      margin-top: 60px;
    }
    @media (min-width:1000px) {
      min-height: 40vh;
      margin-top: 30px;
    }
  }
}
</style>