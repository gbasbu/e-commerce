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
    ...mapGetters(['info'])
  }
}
</script>

<template>
  <div id="app">
    <Nav/>
    <Infos v-if="info" :msg="info.msg" :class="[ info.success == false ? 'info-error' : 'info-success' ]" />
    <router-view/>
  </div>
</template>


<style lang="scss">
  @import './assets/style/style.css';
  #app{
    padding: 0 30px;
  }
</style>
