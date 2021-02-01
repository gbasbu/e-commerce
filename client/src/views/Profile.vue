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
        <div>
          <ul>
            <li>
              <h3>Name: {{ this.user.firstName }} {{ this.user.lastName }} </h3>
            </li>
            <li>
              <h3>Email: {{ this.user.email }}</h3>
            </li>
          </ul>
        </div>
    </main>
</template>


<style lang="scss" scoped>
  main{
    padding: 0 20px;
    
    @media (min-width:768px) {
    padding: 0 40px;
    }
    @media (min-width:1024px) {
      padding: 0 80px;
    }
    div{
      margin-top: 50px;
      ul{
        list-style: none;
      }
    }
  }
</style>