<script>
import { mapActions } from 'vuex'
export default {
    name: 'ProductCard',
    props: ['product'],
    computed: {
        productUrl() {
            return `/product/${this.product._id}`
        }
    },
    methods: {
      ...mapActions(['addItemToBasket','totalPrice']),
      addToBasket(id){
            this.addItemToBasket(id).then(() => this.totalPrice())
        }
    },
};
</script>

<template>
  <article>
    <router-link class="link" :to="productUrl">
        <figure>
            <img :src="require(`../../../server/public/images/${product.img}`)" alt="Product Image">
        </figure>
        <div>
            <h2>{{ product.title }}</h2>
            <h3 class="brandName">{{ product.brandName }}</h3>
            <h3>{{ product.price }} TL</h3>
        </div>
        <div>
        </div>
    </router-link>
    <div>
        <button @click="addToBasket(product._id)">Add to Basket</button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
article{
    text-align: center;
    cursor: pointer;
    img{
        width: 200px;
        height: 250px;
        margin-bottom: 20px;
        @media (min-width:500px) {
            width: 150px;
            height: 200px;
        }
    }
    h2{
        font-size: 1.5rem;
    }
    h3{
        font-size: 1rem;
    }
    .brandName{
        opacity: .7;
        margin-bottom: 10px;
    }
    button{
        width: 100%;
        background-color: black;
        color: white;
        border: none;
        padding: 15px 0;
        border-radius: 20px;
        margin-top: 15px;
        font-weight: bold;
        cursor: pointer;
        text-transform:initial;
    }
}
</style>