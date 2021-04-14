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
            <img :src="`${product.imgURL}`" alt="Product Image">
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
        <button @click="addToBasket(product._id)">Add to Cart</button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
article{
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;
    @media (min-width:500px) {
        width: 80%;
    }
    @media (min-width:768px) {
        width: 70%;
    }
    img{
        width: 60%;
        height: auto;
        margin-bottom: 20px;
        @media (min-width:500px) {
            width: 150px;
            height: 250px;
        }
        @media (min-width:1000px) {
            width: 80px;
            height: 120px;
            margin-bottom: 10px;
        }
    }
    h2{
        font-size: 1.5rem;
        @media (min-width:1000px) {
            font-size: 1rem;
        }
    }
    h3{
        font-size: 1rem;
        @media (min-width:1000px) {
            font-size: .7rem;
        }
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
        @media (min-width:1000px) {
            font-size: .5rem;
            padding: 10px 0;
            width: 70%;
        }
    }
}
</style>