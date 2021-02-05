<script>
import { mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      resetToken: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  },
  methods: {
    ...mapActions(["resetPassword"]),
    resetPass() {
      let user = {
        resetToken: this.resetToken,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword,
      };
      this.resetPassword(user).then((res) => {
        if (res.data.success == true) {
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>


<template>
  <main>
    <h1>Reset Password</h1>
    <div>
      <form @submit.prevent="resetPass">
        <label for="resetToken">Your Code</label>
        <input
          type="text"
          id="resetToken"
          name="resetToken"
          v-model="resetToken"
          required
        />
        <label for="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          v-model="newPassword"
          required
        />
        <label for="confirmNewPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          v-model="confirmNewPassword"
          required
        />
        <input class="submit" type="submit" value="Reset Password" />
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
  input[type="text"],
  input[type="password"] {
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
  .create {
    display: inline-block;
    width: 100%;
    background-color: white;
    border: 2px solid black;
    padding: 10px 0;
    border-radius: 20px;
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
  }
}
</style>