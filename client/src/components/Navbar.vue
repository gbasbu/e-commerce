<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<template>
  <nav>
    <h1>
      <router-link class="link" to="/">E-Commerce</router-link>
    </h1>
    <ul>
      <li>
        <router-link class="link" to="/profile"
          ><i class="fas fa-user"></i
        ></router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link class="link" to="/profile"
          ><i class="fas fa-shopping-basket"></i
        ></router-link>
      </li>
      <li v-if="isLoggedIn">
        <a href="" class="link" @click.prevent="logoutUser"
          ><i class="fas fa-sign-out-alt"></i
        ></a>
      </li>
    </ul>
  </nav>
</template>


<style lang="scss" scoped>
nav {
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
    li {
      margin-left: 20px;
      i {
        font-size: 1.5rem;
      }
    }
  }
}
</style>