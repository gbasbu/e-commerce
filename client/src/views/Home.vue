<script>
// @ is an alias to /src

export default {
  name: 'Home',
  
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
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
  }
</style>
