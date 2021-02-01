<template>
    <nav>
        <h1>
            <router-link to="/">Menu</router-link>
        </h1>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link to="/login">Login</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link to="/register">Register</router-link>
            </li>
            <li v-if="isLoggedIn">
                <router-link to="/profile">Profile</router-link>
            </li>
            <li v-if="isLoggedIn">
                <button @click.prevent="logoutUser">Logout</button>
            </li>
        </ul>
    </nav>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
      ...mapActions(['logout']),
      logoutUser(){
          this.logout();
      }
  },
}
</script>


<style lang="scss">
    nav{
        display: flex;
        justify-content: space-between;
        padding: 0 30px;

        ul{
            list-style: none;
            display: flex;
            li{
                margin-left: 15px;
            }
        }
    }
</style>