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
  @import './assets/style/style.scss';
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
