<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'product',
    data() {
        return {
            isClick : false,
            comment: "",
            productID: "",
        }
    },
    computed: {
        ...mapGetters(['product', 'comments']),
    },
    methods: {
        ...mapActions(['fetchProduct', 'addComment']),
        newComment() {
            let comment = {
                comment : this.comment,
                productID: this.product._id
            }
            this.addComment(comment)
        }
    },
    created() {
        this.fetchProduct(this.$route.params.id)
    },
}
</script>

<template>
    <main>
        <section class="section1">
            <div>
                <img :src="require(`../../../server/public/images/${product.img}`)">
            </div>
            <div>
                <div>
                    <h1>{{ product.brandName }}</h1>
                    <h2>{{ product.title }}</h2>
                    <h3>{{ product.price }} TL</h3>
                </div>
                <div class="point">
                    <p>puan</p>
                    <button @click="isClick = !isClick">yorumlar</button>
                </div>
            </div>
            
            <div>
                <input type="button" value="Add Basket">
            </div>
        </section>
        <section class="section2" v-if="isClick == true">
            <h2>Product Comments</h2>
            <form @submit.prevent="newComment">
                <label for="comment">Your Comment</label>
                <textarea name="comment" id="comment" v-model="comment"></textarea>
                <input type="submit" value="Add Comment">
            </form>
        </section>
    </main>  
</template>

<style lang="scss" scoped>
main{
    min-height: 200vh;
    text-align: center;
    .section1{
        img{
            height: 400px;
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
            margin-top: 20px;
        }
        input{
            margin-top: 30px;
            width: 100%;
            background-color: black;
            color: white;
            border: none;
            padding: 15px 0;
            border-radius: 20px;
            margin-top: 30px;
            font-weight: bold;
            cursor: pointer;
        }
        button{
            background-color: none;
            border: none;
            cursor: pointer;
        }
        .point{
            display: flex;
            justify-content: space-between;
            margin-top: 20px
            
        }
    }
    .section2{
        margin-top: 50px;
        
        form{
            text-align: left;
            margin-top: 30px;
            label{
                display: block;
            }
            textarea{
                display: block;
                margin-bottom: 10px ;
            }
        }
    }
}

</style>