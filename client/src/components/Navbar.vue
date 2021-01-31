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
                <router-link to="/">Logout</router-link>
            </li>
        </ul>
    </nav>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
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