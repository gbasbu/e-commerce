import Vue from 'vue'
import Vuex from 'vuex'
import * as user from './modules/user'
import * as  address from './modules/address'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    user,
    address
  }

})
