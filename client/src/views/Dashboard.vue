<script>
import { mapActions, mapGetters } from 'vuex'
import UsersCard from '@/components/admin/Users-card'
import ProductsCard from '@/components/admin/Products-card'
import OrdersCard from '@/components/admin/Orders-card'

export default {
    data() {
    return {
      brandName: "",
      title: "",
      stock: 0,
      price: 0,
      selectedFile: null,
      isSelectedAddProduct: false,
      isSelectUsers: true,
      isSelectProducts: false,
      isSelectOrders: false,
    };
  },
  components:{
    UsersCard,
    ProductsCard,
    OrdersCard
  },
  computed: {
    ...mapGetters(['users', 'products', 'allOrders'])
  },
  methods: {
      ...mapActions(["addProduct", 'fetchUsers', 'fetchProducts', 'fetchAllOrders']),
      onFileSelected(event){
          this.selectedFile = event.target.files[0]
      },
      newProduct() {
        const fd = new FormData()
        fd.append('image', this.selectedFile, this.selectedFile.name);
        fd.append('brandName', this.brandName)
        fd.append('title', this.title)
        fd.append('stock', this.stock)
        fd.append('price', this.price)  
        fd.append('img', '')
        this.addProduct(fd).then(() => {
          this.isSelectedAddProduct = false,
          this.brandName = '',
          this.title = '',
          this.price = 0,
          this.stock = 0,
          this.selectedFile = ''
        });
      },
      selectUsers(){
        this.isSelectUsers = true,
        this.isSelectProducts = false,
        this.isSelectOrders = false
      },
      selectProducts(){
        this.isSelectUsers = false,
        this.isSelectProducts = true,
        this.isSelectOrders = false
      },
      selectOrders(){
        this.isSelectUsers = false,
        this.isSelectProducts = false,
        this.isSelectOrders = true
      }
    },
    created() {
      this.fetchUsers(),
      this.fetchProducts(),
      this.fetchAllOrders()
    },
}
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <div class="menu">
      <button @click="selectUsers" :class="[ isSelectUsers == true ? 'select' : 'notSelect']">Users</button>
      <button @click="selectProducts" :class="[ isSelectProducts == true ? 'select' : 'notSelect']">Products</button>
      <button @click="selectOrders" :class="[ isSelectOrders == true ? 'select' : 'notSelect']">Orders</button>
    </div>
    <div class="users" v-if="isSelectUsers == true">
      <UsersCard class="user" v-for="user in users" :key="user.id" :user="user"/>
    </div>
    <div class="products" v-if="isSelectProducts == true">
      <button class="product-new" @click="isSelectedAddProduct = !isSelectedAddProduct" v-if="isSelectedAddProduct == false">Add Product</button>
      <ProductsCard class="product" v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div class="orders" v-if="isSelectOrders == true">
      <OrdersCard class="order" v-for="order in allOrders" :key="order.id" :order="order"/>
    </div>
    <div v-if="isSelectedAddProduct == true" class="product-form">
      <form ref="form" @submit.prevent="newProduct" enctype="multipart/form-data">
        <label for="brandName">Brand Name</label>
        <input type="text" name="brandName" v-model="brandName" required/>
        <label for="title">Product Title</label>
        <input type="text" name="title" v-model="title" required/>
        <label for="stock">Stock</label>
        <input type="number" id="stock" name="stock" v-model="stock" min="0" required/>
        <label for="price">Price</label>
        <input type="number" id="price" name="price" v-model="price" min="0"/>
        <label for="image">Product Image</label>
        <input @change="onFileSelected" type="file" id="image" name="image"/>
        <input type="submit" class="submit" value="Add Product"/>
        <button @click="isSelectedAddProduct = false" v-if="isSelectedAddProduct == true">Close</button>
      </form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
    main {
    height: auto;
    position: relative;
    h1 {
        margin-top: 30px;
        margin-bottom: 50px;
        text-align: center;
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
    .menu{
      display: flex;
      justify-content: center;
      button{
        margin: 10px 15px;
        padding-bottom: 15px ;
        width: 70px;
        &:focus{
          outline: none;
        }
      }
    }
    .select{
      border-bottom: 2px solid black;
      transform: translateY(-15px);
    }
    .notSelect{
      border:none;
    }
    .user{
      margin-bottom: 20px;
    }
    .products{
      .product-new{
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: indianred;
        color: white;
        padding: 10px;
        border-radius: 10px;
        font-size: 1rem;
        z-index: 6;
        @media (min-width:768px) {
          right: 60px;
        }
        @media (min-width:992px) {
          right: 80px;
        }
        @media (min-width:1200px) {
          right: 120px;
        }
      }
      .product{
        margin-bottom: 15px;
      }
    }
    .product-form{
      width: 350px;
      height: 530px;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
      padding: 30px 0;
      position: absolute;
      top: 0;
      margin-top: -85px;
      @media (min-width:500px){
        margin-top: -50px;
        left: 50%;
        transform: translateX(-50%); 
      }
      @media (min-width:576px) {
          width: 400px;
      }
      @media (min-width:990px) {
          width: 500px;
      }
      form{
        width: 90%;
        margin: 0 auto;
        position: relative;
        button{
          position: absolute;
          top: 0;
          right: 0;
          margin-top: -10px;
          background-color: indianred;
          color: white;
          padding: 10px;
          border-radius: 10px;
          font-size: 1rem;
        }
      }
    }
    .orders{
      .order{
        margin: 20px 0;
      }
    }
  }
</style>