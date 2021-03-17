import axios from 'axios'

export const state = {
    products: [],
    productInfo: null
}

export const getters = {
    products: state => state.products,
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
}

export const actions = {
    // Add product action
    async addProduct({ commit }, productData) {
        try {
            let res = await axios.post("http://localhost:5000/api/product/add", productData);
            if (res.data.success == true) {
                commit("add_product_success", res.data)
            }
            return res
        } catch (err) {
            commit('add_product_error', err)
        }
    },
}