<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      telNo: "",
      province: "",
      county: "",
      location: '',
      title: ''
    };
  },
  methods: {
    ...mapActions(["addAddress"]),
    newAddress() {
      let newAddress = {
        firstName: this.firstName,
        lastName: this.lastName,
        telNo: this.telNo,
        province: this.province,
        county: this.county,
        location: this.location,
        title: this.title,
        userId: ''
      };
      this.addAddress(newAddress).then(() => {
          this.$router.push('/profile');
      })
    },
  },
};
</script>


<template>
  <main>
    <h1>New Address</h1>
    <div>
      <form @submit.prevent="newAddress">
        <label for="firstName">First Name</label>
        <input type="text" name="firstName" v-model="firstName" required/>
        <label for="lastName">Last Name</label>
        <input type="text" name="lastName" v-model="lastName" required/>
        <label for="telNo">Phone Number</label>
        <input type="text" id="telNo" name="telNo" v-model="telNo" required maxlength="10"/>
        <label for="province">Province</label>
        <input type="text" id="province" name="province" v-model="province" required/>
        <label for="county">County</label>
        <input type="text" id="county" name="county" v-model="county" required/>
        <label for="location">Location</label>
        <input type="text" id="location" name="location" v-model="location" required/>
        <label for="title">Address Title</label>
        <input type="text" id="title" name="title" v-model="title" required/>
        <input type="submit" class="submit" value="Create Address" />
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
</style>