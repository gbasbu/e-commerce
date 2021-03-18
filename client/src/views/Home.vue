<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/components/Product-card'
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters(['products']),
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created() {
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
}
</style>