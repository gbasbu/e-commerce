<template>
  <nav>
    <router-link to="/">
      <img src="./assets/logo.svg" alt="Logo">
    </router-link>
    <ul>
      <li>
        <router-link to="/user"><i class="fas fa-user"></i></router-link>
      </li>
      <li>
        <router-link to="/basket"><i class="fas fa-shopping-basket"></i></router-link>
      </li>
    </ul>
  </nav>
  <router-view/>
</template>

<style lang="scss" scoped>
nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  @media (min-width:768px) {
    padding: 0 40px;
  }
  @media (min-width:1024px) {
    padding: 0 80px;
  }
  ul{
    list-style: none;
    display: flex;
    li:nth-last-child(1){
      margin-left: 20px;

      @media (min-width:768px) {
      margin-left: 30px;
      }
      @media (min-width:1024px) {
        margin-left: 40px;
      }
    }
    i{
      font-size: 2rem;
      color: black;
    }
  }
}

</style>
