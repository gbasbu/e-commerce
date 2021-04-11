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
    ADD_PRODUCT(state, data){
        state.products.push(data)
    },
    GET_PRODUCTS(state, data) {
        state.products = data
    },
    GET_PRODUCT(state, data) {
        state.product = data
    },
    DELETE_PRODUCT(state, data) {
        state.products = data
    },
    UPDATE_PRODUCT(state, data) {
        state.products = data 
    },
    SORT_PRODUCT(state, data){
        state.products = data
    }
}

export const actions = {
    // Add product action
    async addProduct({ commit }, productData) {
        let result = await axios.post(`${api}/add`, productData);
        commit('ADD_PRODUCT', result.data)
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
    },
    // Delete Product action
    async deleteProduct({ commit }, productId){
        const result = await axios.delete(`http://localhost:5000/api/admin/product/${productId}/delete`)
        commit('DELETE_PRODUCT', result.data)
    },
    // Update Product action
    async updateProduct({ commit }, product){
        const result = await axios.put(`http://localhost:5000/api/admin/product/update`, product)
        commit('UPDATE_PRODUCT', result.data)
    },
    // Sorting Product Action
    async sortProduct({ commit }, index){
        const result = await axios.get(`${api}/sort/${index}`)
        commit('SORT_PRODUCT', result.data)
    }
}