<script>
import{ mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters(['user']),
    methods: {
      ...mapActions(['getProfile'])
    },
    created() {
      this.getProfile();
    },
}
</script>


<template>
    <main>
        <h1>Profile Page</h1>
        <div v-if="user">
          <ul>
            <li>
              <h3>Name: {{ this.user.firstName }} {{ this.user.lastName }} </h3>
            </li>
            <li>
              <h3>Email: {{ this.user.email }} </h3>
            </li>
          </ul>
        </div>
    </main>
</template>


<style lang="scss" scoped>
  
</style>