<script>
import { mapGetters } from 'vuex'
import Nav from '@/components/Navbar';
import Infos from '@/components/Infos'

export default {
  components: {
    Nav,
    Infos
  },
  computed:{
    ...mapGetters(['userInfo', 'addressInfo'])
  }
}
</script>

<template>
  <div id="app">
    <Nav/>
    <Infos v-if="userInfo" :msg="userInfo.msg" :class="[ userInfo.success == false ? 'info-error' : 'info-success' ]" />
    <Infos v-if="addressInfo" :msg="addressInfo.msg" :class="[ addressInfo.success == false ? 'info-error' : 'info-success' ]" />
    <router-view/>
  </div>
</template>


<style lang="scss">
  @import './assets/style/style.scss';
  #app{
    padding: 0 30px;
  }
</style>
