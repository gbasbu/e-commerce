<script>
import { mapGetters } from 'vuex'
import Nav from '@/components/Navbar'
import Infos from '@/components/Infos'

export default {
  components: {
    Infos,
    Nav
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
}
</script>

<template>
  <div id="app">
    <Nav/>
    <Infos v-if="userInfo" :msg="userInfo.msg" :class="[ userInfo.success == false ? 'info-error' : 'info-success' ]" />
    <router-view/>
  </div>
</template>


<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    .link{
      text-decoration: none;
      color: black;
      cursor: pointer;
    }
    button{
      border: none;
      cursor: pointer;
      background-color: transparent;
    }
    ul{
      list-style: none;
    }
    .info-error{
      background-color: #ffbaba;
      border-left:5px solid #ff0000 ;
      color: white;
    }
    .info-success{
      background-color: #b2ffb2;
      border-left: 5px solid #00ff00;
      color: white;
    }
  }
  #app{
    padding: 0 30px;
    position: relative;

    @media (min-width:768px) {
      padding: 0 60px;
    }
    @media (min-width:992px) {
      padding: 0 80px;
    }
    @media (min-width:1200px) {
      padding: 0 120px;
    }
    .info{
      position: fixed;
      right: 0;
      margin-right: 30px;
      z-index: 2;
      @media (min-width:768px) {
      margin-right: 60px;
      }
      @media (min-width:992px) {
        margin-right: 80px;
      }
      @media (min-width:1200px) {
        margin-right: 120px;
      }
    }
  }
</style>
