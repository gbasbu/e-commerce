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
        <img :src="require(`../../../server/public/images/${product.img}`)">
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
    text-align: center;
    cursor: pointer;
    img{
        width: 250px;
        height: 300px;
        @media (min-width:500px) {
            width: 200px;
            height: 250px;
        }
    }
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