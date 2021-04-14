<script>
import { mapActions, mapGetters } from 'vuex'
import Infos from '@/components/Infos'

export default {
  components: {
    Infos,
  },
  data() {
    return {
      isClick : false,
    }
  },
  computed:{
    ...mapGetters(['isLoggedIn', 'userInfo', 'orderInfo']),
    ...mapGetters(['basket', 'total', 'user'])
  },
  methods: {
    ...mapActions(['fetchBasket', 'plusStock', 'minusStock', 'totalPrice', 'getProfile']),
    addStock(id){
      this.plusStock(id).then(() => this.totalPrice()) 
    },
    delStock(id){
      this.minusStock(id).then(() => this.totalPrice())
    },
    confirmBasket(){
      this.isClick = false,
      this.$router.push('/order-confirm')
    }
  },
  mounted() {
    if(this.isLoggedIn == true){
      this.fetchBasket(),
      this.totalPrice(),
      this.getProfile()
    }
  },
}
</script>

<template>
  <div id="app">
    <nav>
      <h1>
        <router-link class="link" to="/">E-Commerce</router-link>
      </h1>
      <ul>
        <li>
          <router-link class="link" to="/profile">
            <i class="fas fa-user"></i>
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/dashboard" v-if="user.isAdmin == true">
            <i class="fas fa-user-cog"></i>
          </router-link>
        </li>
        <li>
          <button v-if="isLoggedIn == true" class="link" @click="isClick = !isClick">
            <i class="fas fa-shopping-basket"></i> <span>{{ basket.length }}</span>
            </button>
        </li>
      </ul>
    </nav>
    <div class="basket" v-if="isClick == true">
      <div class="basket-item" v-for="item in basket" :key="item.id">
        <figure>
          <img v-if="basket !== undefined" :src="`${item.productImg}`" width="70" height="100">
        </figure>
        <div>
          <h5>{{ item.productTitle }}</h5><br>
          <button @click="delStock(item.productId)">-</button><span>{{ item.stock }}</span><button @click="addStock(item.productId)">+</button>
          <p>{{ item.productPrice * item.stock }} TL</p>
        </div>
      </div>
      <button @click="confirmBasket" class="submit link" :disabled="total == 0">Confirm Cart {{ total }} TL</button>
    </div>
    <Infos class="infos" v-if="userInfo" :msg="userInfo.msg" :class="[ userInfo.success == false ? 'info-error' : 'info-success' ]" />
    <Infos class="infos" v-if="orderInfo.msg" :msg="orderInfo.msg" :class="[ orderInfo.success == false ? 'info-error' : 'info-success' ]" />
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
      &:disabled{
        opacity: .6;
        cursor: default;
      }
    }
    ul{
      list-style: none;
    }
    .info-error{
      background-color: white;
      border: 1px solid #ff0000;
      border-left:5px solid #ff0000 ;
    }
    .info-success{
      background-color:white;
      border: 1px solid #00ff00;
      border-left: 5px solid #00ff00;
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
    .infos{
      position: absolute;
      padding: 10px 20px;
      margin-top: 10px;
      color: black;
      font-weight: bold;
      z-index: 7;
    }
    nav {
      display: flex;
      padding: 20px 0;
      justify-content: space-between;
      align-items: center;
      ul {
        display: flex;
        li {
          i {
            font-size: 1.5rem;
            margin-left: 20px;
            @media (min-width:768px) {
              margin-left: 40px;
            }
          }
          button{
            i{
              padding: 0;
            }
            span{
              font-size: 1.5rem;
              font-weight: bold;
            }
          }
        }
      }
      
    }
    .basket{
      position: absolute;
      width: 300px;
      height: 400px;
      right: 30px;
      top: 60px;
      background-color: white;
      box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, 
          rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, 
          rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
      z-index: 3;
      padding: 10px;
      overflow: auto;
        @media (min-width:768px) {
          right: 60px;
        }
        @media (min-width:992px) {
          right: 80px;
          height: 450px;
        }
        @media (min-width:1200px) {
          right: 120px;
          height: 500px;
        }
      h4{
        text-align: center;
      }
      hr{
        opacity: .5;
        margin-top: 10px;
      }
      .submit{
        position: absolute;
        text-align: center;
        bottom: 10px;
        background-color:#28a745;
        color: white;
        font-weight: bold;
        padding: 10px;
        width: 92%;
      }
      .disabled{
        opacity: .5;
        cursor: default;
      }
      .basket-item{
        display: flex;
        margin-bottom: 10px;
        img{
          margin-right: 15px;
        }
        h5{
          font-size: .8rem;
          margin-top: 20px;
          text-transform: capitalize;
        }
        span{
          margin: 0 10px;
        }
        button{
          padding: 5px;
          border-radius: 100%;
          border: 1px solid black;
        }
        p{
          position: absolute;
          right: 25px;
          margin-top: -22px;
        }
      }
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
h