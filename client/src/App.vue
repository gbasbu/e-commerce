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
    ...mapGetters(['userInfo', 'addressInfo', 'productInfo'])
  },
}
</script>

<template>
  <div id="app">
    <Nav/>
    <Infos v-if="userInfo" :msg="userInfo.msg" :class="[ userInfo.success == false ? 'info-error' : 'info-success' ]" />
    <Infos v-if="addressInfo" :msg="addressInfo.msg" :class="[ addressInfo.success == false ? 'info-error' : 'info-success' ]" />
    <Infos v-if="productInfo" :msg="productInfo.msg" :class="[ productInfo.success == false ? 'info-error' : 'info-success' ]" />
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
  }
</style>
