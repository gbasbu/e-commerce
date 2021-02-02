<script>
import Nav from '@/components/Navbar';

export default {
  components: {
    Nav
  }
}
</script>

<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>


<style lang="scss">
  @import './assets/style/style.css';
  #app{
    padding: 0 30px;
  }
</style>
