<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
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
      <li>
        <router-link class="link" to="/profile"
          ><i class="fas fa-shopping-basket"></i
        ></router-link>
      </li>
    </ul>
  </nav>
</template>


<style lang="scss" scoped>
nav {
  display: flex;
  padding: 40px 0;
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