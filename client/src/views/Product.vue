<script>
import { mapGetters, mapActions } from 'vuex'
import CommentCard from '@/components/Comment-card'
export default {
    name: 'product',
    components:{
        CommentCard
        
    },
    data() {
        return {
            isClick : true,
            description: "",
            productId: "",
        }
    },
    computed: {
        ...mapGetters(['product', 'comments']),
        
    },
    methods: {
        ...mapActions(['fetchProduct', 'addComment', 'fetchComments', 'addItemToBasket', 'totalPrice']),
        newComment() {
            let comment = {
                description : this.description,
                productId: this.product._id,
            }
            this.addComment(comment).then(() => this.fetchComments(this.$route.params.id))
        },
        addProductAtBasket(id){
            this.addItemToBasket(id).then(() => this.totalPrice())
        }
    },
    mounted() {
        this.fetchProduct(this.$route.params.id),
        this.fetchComments(this.$route.params.id)
    },
}
</script>

<template>
    <main>
        <section class="section1">
            <figure>
                <img v-if="product.img !== undefined" :src="require(`../../../server/public/images/${product.img}`)" alt="Product Image">
            </figure>
            <div class="product-infos">
                <div>
                    <h1>{{ product.brandName }}</h1>
                    <h2>{{ product.title }}</h2>
                    <h3>{{ product.price }} TL</h3>
                </div>
                <div class="point">
                    <a href="#comment" class="link"  v-if="comments.length == 0">No comment!<br>Do you want to write first comment?</a>
                    <a href="#comment" class="link"  v-if="comments.length == 1">{{ comments.length }} - View comment.</a>
                    <a href="#comment" class="link"  v-if="comments.length > 1">{{ comments.length }} - View comments.</a>
                </div>
            </div>
            <div>
                <button class="add" @click="addProductAtBasket(product._id)">Add to Basket</button>
            </div>
        </section>
        <section class="section2" v-if="isClick == true">
            <h2>Comments</h2>
            <form @submit.prevent="newComment">
                <textarea name="comment" id="comment" rows="5" v-model="description"></textarea>
                <input type="submit" value="Add Comment" :disabled="!description">
            </form>
        </section>
        <section v-if="isClick == true">
            <article  class="comments" v-for="comment in comments" :key="comment.id">
                <comment-card :comment="comment" v-if="comment.like !== undefined"></comment-card>
            </article>
        </section>
    </main>  
</template>

<style lang="scss" scoped>
main{
    min-height: 120vh;
    text-align: center;
    @media (min-width:768px) {
        max-width: 600px;
        margin: 0 auto;
    }
    .comments{
        margin-bottom: 50px;
    }
    .section1{
        margin-top: 20px;
        @media (min-width:768px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin: 45px 0;
        }
        .product-infos{
        @media (min-width:768px) {
            margin: auto 0;
         }
        }
        a{
            text-transform:initial;
        }
        img{
            height: 250px;
            @media (min-width:768px) {
                height: 350px;
            }
        }
        h1{
            font-size: 1rem;
                opacity: .7;
        }
       h2{
            font-size: 2rem;
            font-weight: bold;
        }
        h3{
            margin-top: 10px;
        }
        .add{
            width: 100%;
            background-color: black;
            color: white;
            border: none;
            padding: 15px 0;
            border-radius: 20px;
            margin: 20px 0;
            font-weight: bold;
            cursor: pointer;
            text-transform:initial;
            @media (min-width:500px) {
                margin: 40px 0;
            }
        }
        .point{
            margin-top: 15px;
        }
    }
    .section2{
        margin: 50px 0;
        form{
            text-align: left;
            margin-top: 30px;
            label{
                display: block;
            }
            textarea{
                display: block;
                width: 100%;
                margin-bottom: 20px;
                padding: 10px 20px;
            }
            input{
                width: 200px;
                padding: 10px 0;
                border: none;
                border-radius: 20px;
                background-color: #28a745;
                color: white;
                font-weight: bold;
                cursor: pointer;

                &:disabled{
                    opacity: .5;
                    cursor: default;
                }
            }
        }
    }
}

</style>