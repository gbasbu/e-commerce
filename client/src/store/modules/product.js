import axios from 'axios'
const api = 'http://localhost:5000/api/product'

export const state = {
    products: [],
    product: {},
}

export const getters = {
    products: state => state.products,
    product: state => state.product,
}

export const mutations = {
    GET_PRODUCTS(state, data) {
        state.products = data
    },
    GET_PRODUCT(state, data) {
        state.product = data
    }
}

export const actions = {
    // Add product action
    async addProduct({ commit }, productData) {
        let res = await axios.post(`${api}/add`, productData);
        commit(res.data)
    },
    // Get Products action
    async fetchProducts({ commit }) {
        let res = await axios.get(`${api}/`)
        commit('GET_PRODUCTS', res.data)
    },
    // Get Product action
    async fetchProduct({ commit }, productID) {
        let res = await axios.get(`${api}/${productID}`)
        commit('GET_PRODUCT', res.data)

    }
}