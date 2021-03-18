import Vue from 'vue'
import Vuex from 'vuex'
import * as user from './modules/user'
import * as  address from './modules/address'
import * as  category from './modules/category'
import * as  product from './modules/product'
import * as  comment from './modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    user,
    address,
    category,
    product,
    comment
  }

})
