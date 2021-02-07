import axios from 'axios'

export const state = {
    address: {},
    addressInfo: null
}

export const getters = {
    address: state => state.address,
    addressInfo: state => state.addressInfo,
}

export const mutations = {
    addAddress_success(state, data) {
        state.addressInfo = data
        setTimeout(() => state.addressInfo = null, 3000)
    },
    addAddress_error(state, err) {
        state.addressInfo = err.response.data;
        setTimeout(() => state.info = null, 3000)
    }
}

export const actions = {
    // Add Address Action
    async addAddress({ commit }, addressData) {
        
        try {
            let res = await axios.post("http://localhost:5000/api/address/add", addressData);
            if (res.data.success == true) {
                commit("addAddress_success", res.data)
            }
            return res
        } catch (err) {
            commit('addAddress_error', err)
        }
    },
}