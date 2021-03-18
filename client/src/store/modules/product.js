import axios from 'axios'

export const state = {
    products: [],
    product: {},
    productInfo: null
}

export const getters = {
    products: state => state.products,
    product: state => state.product,
    productInfo: state => state.productInfo,
}

export const mutations = {
    add_product_success(state, data) {
        state.productInfo = data
        setTimeout(() => state.productInfo = null, 3000)
    },
    add_product_error(state, err) {
        state.productInfo = err.response.data;
        setTimeout(() => state.productInfo = null, 3000)
    },
    fetch_products_success(state, data) {
        state.products = data
    },
    fetch_product_success(state, data) {
        state.product = data
    }
}

export const actions = {
    // Add product action
    async addProduct({ commit }, productData) {
        try {
            let res = await axios.post("http://localhost:5000/api/product/add", productData);
            if (res.data) {
                commit("add_product_success", res.data)
            }
            return res
        } catch (err) {
            commit('add_product_error', err)
        }
    },
    // Get Products action
    async fetchProducts({ commit }) {
        try {
            let res = await axios.get('http://localhost:5000/api/products/get')
            if(res.data) {
                commit('fetch_products_success', res.data.products)
            }
        } catch (err) {
            console.log('get products err: ', err);
        }
    },
    // Get Product action
    async fetchProduct({ commit }, productID) {
        try {
            let res = await axios.get(`http://localhost:5000/api/product/get/${productID}`)
            if(res.data) {
                commit('fetch_product_success', res.data.product)
            }
        } catch (err) {
            console.log('get product err: ', err);
        }
    }
}