import Vue from 'vue'
import Vuex from 'vuex'
import * as user from './modules/user'
import * as address from './modules/address'
import * as  product from './modules/product'
import * as  comment from './modules/comment'
import * as  basket from './modules/basket'
import * as  admin from './modules/admin'


Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    user,
    address,
    product,
    comment,
    basket,
    admin
  }

})
