import axios from 'axios'
const api = 'http://localhost:5000/api/basket'

export const state = {
    basket: [],
    total : 0,
    orderInfo: {}
}

export const getters = {
    basket: state => state.basket,
    total: state => state.total,
    orderInfo: state => state.orderInfo
}

export const mutations = {
    ADD_TO_BASKET(state, data){
        state.basket = data
    },
    PLUS_STOCK(state, data){
        state.basket = data
    },
    MINUS_STOCK(state, data){
        state.basket = data
    },
    BASKET_PRİCE(state, data){
        state.total = data
    },
    GET_BASKET(state, data) {
        state.basket = data
    },
    CONFIRM_BASKET(state, data){
        state.basket = [],
        state.orderInfo = data
        setTimeout(() => state.orderInfo = '', 3000);
    }
}

export const actions = {
    // Create basket
    async addItemToBasket({ commit }, productId){
        const result = await axios.post(`${api}/${productId}/add`)
        commit('ADD_TO_BASKET', result.data)
    },
    // Add stock
    async plusStock({ commit }, productId){
        const result = await axios.put(`${api}/${productId}/plus`)
        commit('PLUS_STOCK', result.data)
    },
    // Minus stock
    async minusStock({ commit }, productId){
        const result = await axios.put(`${api}/${productId}/minus`)
        commit('MINUS_STOCK', result.data)
    },
    // Get basket price
    async totalPrice({ commit }){
        const result = await axios.get(`${api}/total`)
        commit('BASKET_PRİCE', result.data)
    },
    // Get basket
    async fetchBasket({ commit }){
        const result = await axios.get(`${api}/`)
        commit('GET_BASKET', result.data)
    },
    // Confirm basket
    async confirmBasket({ commit }, addressId){
        const result = await axios.post(`${api}/${addressId}/confirm`)
        commit('CONFIRM_BASKET', result.data)
    }
}

