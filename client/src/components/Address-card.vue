<script>
import { mapActions } from 'vuex'

export default {
    name: 'AddressCard',
    props: ['address'],
    data() {
      return {
        isClick : false
      }
    },
    methods: {
      ...mapActions(['deleteAddress', 'updateAddress']),
      remove(id){
          this.deleteAddress(id).then(() => {
            this.$router.push('/profile');
          })
      },
      changeAddress(){
        let newAddress = {
          firstName: this.address.firstName,
          lastName: this.address.lastName,
          telNo: this.address.telNo,
          province: this.address.province,
          county: this.address.county,
          location: this.address.location,
          title: this.address.title,
          id: this.address._id
        }
        this.updateAddress(newAddress).then((res) => {
          if(res.data.success == true){
            this.isClick = false
          }
        })
      }
    },
};
</script>

<template>
  <section>
      <h4><strong>{{ address.title }}</strong></h4>
      <p>{{ address.firstName }} {{ address.lastName }}</p>
      <p>{{ address.location }}</p>
      <p>{{ address.county }} / {{ address.province }}</p>
      <div class="buttons">
        <button class="link" @click="isClick = !isClick">Update</button>
        <button class="link" @click="remove(address._id)">Delete</button>
      </div>

      <div v-if="isClick" class="update">
        <hr>
        <h2>Update Address</h2>
        <form @submit.prevent="changeAddress()">
          <label for="firstName">First Name</label>
          <input type="text" name="firstName" v-model="address.firstName" required/>
          <label for="lastName">Last Name</label>
          <input type="text" name="lastName" v-model="address.lastName" required/>
          <label for="telNo">Phone Number</label>
          <input type="text" id="telNo" name="telNo" v-model="address.telNo" required maxlength="10"/>
          <label for="province">Province</label>
          <input type="text" id="province" name="province" v-model="address.province" required/>
          <label for="county">County</label>
          <input type="text" id="county" name="county" v-model="address.county" required/>
          <label for="location">Location</label>
          <input type="text" id="location" name="location" v-model="address.location" required/>
          <label for="title">Address Title</label>
          <input type="text" id="title" name="title" v-model="address.title" required/>
          <input type="submit" class="submit" value="Update Address" />
          <button @click="isClick = !isClick">Cancel</button>
      </form>
      </div>
    </section>
</template>

<style lang="scss" scoped>
section{
  margin-bottom: 50px;
  text-transform: capitalize;
  h4{
    margin-bottom: 10px;
  }
  p{
    margin-bottom: 5px;
  }
  .buttons{
    margin-top: 15px;
    
    button{
      padding: 5px 10px;
      border:1px solid black;
      margin-right: 10px ;
        border-radius: 20px;
        &:first-child{
        background-color: black;
        color: white;
      }
    }
  }
  .update{
    margin-top: 20px;
    h2{
      margin-bottom: 20px;
    }
    hr{
      border: 1px solid black;
      margin: 20px 0;
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
    input[type="submit"] {
      display: inline-block;
      margin-right: 10px;
      width: 48%;
      background-color: black;
      color: white;
      border: none;
      padding: 15px 0;
      border-radius: 30px;
      font-weight: bold;
    }
    form{
      button{
        padding: 15px 0;
        width: 48%;
        background-color: transparent;
        border: 1px solid black;
        border-radius: 30px;
        cursor: pointer;
        font-weight: bold;
      }
    }
    .login {
      display: inline-block;
      width: 100%;
      background-color: white;
      border: 2px solid black;
      padding: 10px 0;
      border-radius: 20px;
      text-align: center;
      font-weight: bold;
      margin-top: -10px;
    }
  }
}
</style>