<script>
import { mapActions } from 'vuex'

export default {
    data() {
    return {
      brandName: "",
      title: "",
      stock: 0,
      price: 0,
      selectedFile: null,
    };
  },
  methods: {
      ...mapActions(["addProduct"]),
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
        this.addProduct(fd).then((res) => {
            if (res.data.success) {
                this.$refs.form.reset(); 
            }
        });
      }, 
    },
}
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <div>
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
      </form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
    main {
    min-height: 100vh;
    h1 {
        margin: 30px 0;
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
        background-color: black;
        color: white;
        border: none;
        padding: 15px 0;
        border-radius: 20px;
        margin-top: 40px;
        font-weight: bold;
    }
}
</style>