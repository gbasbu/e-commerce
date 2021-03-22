<script>
import { mapActions, mapGetters } from 'vuex'
import ProductCard from '@/components/Product-card'

export default {
  name: "Home",
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters(['products'])
  },
  methods: {
    ...mapActions(['fetchAddresses', 'fetchProducts'])
  },
  mounted() {
    this.fetchAddresses(),
    this.fetchProducts()
  },
};
</script>

<template>
  <div class="home">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>


<style lang="scss" scoped>
div{
  text-align: center;
}
</style>