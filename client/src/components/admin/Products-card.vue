<script>
import { mapActions } from 'vuex'
export default {
    name: 'ProductsCard',
    props: ['product'],
    data() {
        return {
            isClick: false,
            isClickUpdate: false,
            brandName: this.product.brandName,
            title: this.product.title,
            stock: this.product.stock,
            price: this.product.price,
            id: this.product._id
        }
    },
    methods: {
        ...mapActions(['deleteProduct', 'updateProduct']),
        removeProduct(id){
            this.deleteProduct(id)
        },
        putProduct(){
            let data = {
                brandName : this.brandName,
                title : this.title,
                stock : this.stock,
                price : this.price,
                id : this.id
            }
            this.updateProduct(data).then(() => {
                this.isClickUpdate = false,
                this.brandName = '',
                this.title = '',
                this.stock = 0,
                this.price = 0
            })
        }
    },
}
</script>

<template>
    <div class="main">
        <div class="top">
            <div class="buttons">
                <button class="show" v-if="isClick == false" @click="isClick = true">+</button>
                <button class="hidden" v-if="isClick == true" @click="isClick = false">-</button>
            </div>
            <figure class="image">
                <img v-if="product.imgURL" :src="`${product.imgURL}`" alt="Product Image" width="50" height="70">
            </figure>
            <div class="title">
                <p>{{ product.title }}</p>
            </div>
            <div class="brandName">
                <p>{{ product.brandName }}</p>
            </div>
            <div class="price">
                <p>{{ product.price }} TL</p>
            </div>
            <div class="stock">
                <p>{{ product.stock }} pcs</p>
            </div>
            <div class="action">
                <button class="updateButton" @click="isClickUpdate = true">Update</button>
                <button class="deleteButton" @click="removeProduct(product._id)">Delete</button>
            </div>
        </div>
        <div class="bottom" v-if="isClick == true">
            <ul>
                <li class="bottom-brandName"><span>Brand Name:</span> {{ product.brandName }}</li>
                <li class="bottom-price"><span>Price: </span>{{ product.price }} TL</li>
                <li class="bottom-stock"><span>Stock: </span>{{ product.stock }} pcs</li>
                <li>
                    <span>Action: </span>
                    <button class="updateButton" @click="isClickUpdate = true">Update</button>
                    <button class="deleteButton" @click="removeProduct(product._id)">Delete</button>
                </li>
            </ul>
        </div>
        <div class="update" v-if="isClickUpdate == true">
            <form  @submit.prevent="putProduct(product._id)">
                <label for="brandName">Brand Name</label>
                <input type="text" name="brandName" v-model="brandName"/>
                <label for="title">Product Title</label>
                <input type="text" name="title" v-model="title"/>
                <label for="stock">Stock</label>
                <input type="number" id="stock" name="stock" v-model="stock" min="0"/>
                <label for="price">Price</label>
                <input type="number" id="price" name="price" v-model="price" min="0"/>
                <input type="submit" class="submit" value="Save Product"/>
                <button class="close" @click="isClickUpdate = false">Close</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main{
    position: relative;
}
.top{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    button{
        font-size: 1.5rem;
        padding: 2px 6px;
        margin-top: -5px;
        border-radius: 100%;
    }
    .show{
        background-color: seagreen;
        color: white;
    }
    .hidden{
        padding: 2px 8px;
        background-color: indianred;
        color: white;
    }
    .title{
        text-transform: capitalize;
    }
    .brandName, .price, .stock, .action{
        display: none;
    }
    .buttons{
        display: flex;
        justify-content: flex-start;
    }
}
.bottom{
    padding: 20px 30px;
    span{
        font-weight: bold;
    }
    li{
        padding: 5px 0;
        text-transform: capitalize;
        button{
            background-color: indianred;
            padding: 2px 6px;
            border-radius: 5px;
            color: white;
            margin-right: 10px ;
        }
    }
    .updateButton{
        background-color: seagreen;
    }
}
.update{
    width: 300px;
    height: 450px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    padding: 30px 0;
    position: absolute;
    left: 50%;
    top: 40%;
    z-index: 5;
    transform: translate(-50%, -50%);
    @media (min-width:576px) {
        width: 400px;
        margin-top: 30px;
    }
    @media (min-width:990px) {
        width: 500px;
        margin-top: 60px;
    }
    form{
        width: 90%;
        margin: 0 auto;
        position: relative;
        button{
          position: absolute;
          top: 0;
          right:0;
          margin-top: -10px;
          background-color: indianred;
          color: white;
          padding: 10px;
          border-radius: 10px;
          font-size: 1rem;
        }
        label,
        input {
            display: block;
        }
        input[type="submit"],
        .create {
            cursor: pointer;
        }
        input {
            width: 100%;
            border: none;
            border-bottom: 2px solid black;
            margin-bottom: 30px;
            padding: 10px 20px;
        }
        input[type="file"]{
            border: none;
        }
        input[type="submit"] {
            width: 100%;
            display: inline-block;
            background-color: black;
            color: white;
            border: none;
            padding: 15px 0;
            border-radius: 20px;
            font-weight: bold;
        }
    }   
}
@media (min-width:576px) {
    .top{
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .brandName{
            display: flex;
            justify-content: center;
        }
    }
    .bottom{
        .bottom-brandName{
          display: none;
        }
    }
}
@media (min-width:768px) {
    .top{
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        .price{
            display: flex;
            justify-content: center;
        }
    }
    .bottom{
        .bottom-price{
          display: none;
        }
    }
}
@media (min-width:992px) {
    .top{
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        .stock{
            display: flex;
            justify-content: center;
        }
    }
    .bottom{
        .bottom-stock{
          display: none;
        }
    }
}
@media (min-width:1200px) {
    .top{
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        .action{
            display: flex;
            justify-content: flex-end;
            button{
                font-size: .9rem;
                font-weight: bold;
                color: white;
                border-radius: 5px;
                padding: 5px;
            }
            .updateButton{
                background-color: seagreen;
            }
            .deleteButton{
                background-color: indianred;
                margin-left: 20px;
            }
        }
        .buttons{
            display: none;
        }
    }
    .bottom{
        display: none;
    }
}
</style>