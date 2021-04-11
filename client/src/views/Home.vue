<script>
import { mapActions, mapGetters } from 'vuex'
import ProductCard from '@/components/Product-card'

export default {
  name: "Home",
  components: {
    ProductCard
  },
  data() {
    return {
      select: 0
    }
  },
  computed: {
    ...mapGetters(['products', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['fetchAddresses', 'fetchProducts', 'sortProduct']),
    selectSorting(index){
      this.sortProduct(index)
    }
  },
  mounted() {
    if(this.isLoggedIn == true){
      this.fetchAddresses()
    }
    this.fetchProducts()
  },
};
</script>

<template>
  <main>
    <div class="sorting">
      <select class="select" @change="selectSorting(select)" v-model="select">
        <option value="0">Default Sorting</option>
        <option value="1">Increasing Price</option>
        <option value="2">Descending Price</option>
        <option value="3">Alphabetical A-Z</option>
        <option value="4">Alphabetical Z-A</option>
      </select>
    </div>
    <div class="main">
      <ProductCard class="product" v-for="product in products" :key="product.id" :product="product" />
    </div>
  </main>
</template>


<style lang="scss" scoped>
.sorting{
  display: flex;
  justify-content: center;
  margin-bottom: -20px;
  @media (min-width:999px) {
    margin: 10px 0;
  }
  .select{
    min-width: 200px;
    border: none;
    padding: 10px 0;
    border-bottom: 2px solid black;
  }
}
.main{
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width:500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width:768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width:1000px) {
    grid-template-columns: repeat(4,1fr);
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