<script>

export default {
    name: 'ProductCard',
    props: ['product'],
    computed: {
        productUrl() {
            return `/product/${this.product._id}`
        }
    },
    methods: {
      
    },
};
</script>

<template>
  <article>
    <router-link class="link" :to="productUrl">
        <img :src="require(`../../../server/public/images/${product.img}`)" width="150" height="200">
        <div>
            <h2>{{ product.title }}</h2>
            <h3 class="brandName">{{ product.brandName }}</h3>
            <h3>{{ product.price }} TL</h3>
        </div>
    </router-link>
  </article>
</template>

<style lang="scss" scoped>
article{
    margin-top: 20px;
    text-align: center;
    max-width: 50%;
    height: 250px;
    cursor: pointer;
    
    h2{
        font-size: 1rem;
    }
    h3{
        font-size: .7rem;
    }
    .brandName{
        opacity: .7;
        margin-bottom: 10px;
    }
}
</style>