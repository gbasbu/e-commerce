<script>
import { mapActions, mapGetters } from 'vuex'
import ProductCard from '@/components/Product-card'

export default {
  name: "Home",
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters(['products', 'authState'])
  },
  methods: {
    ...mapActions(['fetchAddresses', 'fetchProducts'])
  },
  mounted() {
    if(this.authState == true){
      this.fetchAddresses()
    }
    this.fetchProducts()
  },
};
</script>

<template>
  <div class="home">
    <ProductCard class="product" v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>


<style lang="scss" scoped>
div{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .product{
    margin-bottom: 20px;
  }
}
</style>