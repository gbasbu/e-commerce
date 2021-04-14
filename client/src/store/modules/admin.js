import axios from 'axios'
const adminApi = `${process.env.VUE_APP_API_URL}/api/admin`

export const state = {
    allOrders: [],
}

export const getters = {
    allOrders: state => state.allOrders
}

export const mutations = {
    FETCH_ORDERS(state,data){
        state.allOrders = data
    },
    ORDER_CARGO(state, data){
        state.allOrders = data
    },
    ORDER_COMPLETE(state, data){
        state.allOrders = data
    }
}

export const actions = {
   // Fetch Orders Action
   async fetchAllOrders({ commit }){
       const result = await axios.get(`${adminApi}/orders`)
       commit('FETCH_ORDERS', result.data)
   },
   // Order in cargo action
   async inCargo({ commit }, orderId){
       const result = await axios.post(`${adminApi}/order/${orderId}/cargo`)
       commit('ORDER_CARGO', result.data)
   },
   // Order delivered action
   async complete({ commit }, orderId){
        const result = await axios.post(`${adminApi}/order/${orderId}/complete`)
        commit('ORDER_COMPLETE', result.data)
   }
}

