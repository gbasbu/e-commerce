import axios from 'axios'

export const state = {
    addresses: [],
    addressInfo: null
}

export const getters = {
    addresses: state => state.addresses,
    addressInfo: state => state.addressInfo,
}

export const mutations = {
    add_address_success(state, data) {
        state.addressInfo = data
        setTimeout(() => state.addressInfo = null, 3000)
    },
    add_address_error(state, err) {
        state.addressInfo = err.response.data;
        setTimeout(() => state.addressInfo = null, 3000)
    },
    fetch_address_success(state,data) {
        state.addresses = data
    },
    fetch_address_error(state, err) {
        state.addressInfo = err.response.data;
        setTimeout(() => state.addressInfo = null, 3000)
    },
    delete_address_success(state, data){
        state.addressInfo = data
        setTimeout(() => state.addressInfo = null, 3000)
    },
    delete_address_error(state, err){
        state.addressInfo = err.response.data
        setTimeout(() => state.addressInfo = null, 3000)
    }
}

export const actions = {
    // Add Address Action
    async addAddress({ commit }, addressData) {
        try {
            let res = await axios.post("http://localhost:5000/api/address/add", addressData);
            if (res.data.success == true) {
                commit("add_address_success", res.data)
            }
            return res
        } catch (err) {
            commit('add_address_error', err)
        }
    },
    // Fetch Addres Action
    async fetchAddress({ commit }){
        try {
            let res = await axios.get('http://localhost:5000/api/address/get')
            if(res.data.success !== false){
                commit('fetch_address_success', res.data.address)
            }
            return res
        } catch (err) {
            commit('fetch_address_error', err)
        }
    },
    // Delete Address Action
    async deleteAddress({ commit }, addressID){
        try {
            let res = await axios.delete(`http://localhost:5000/api/address/delete/${addressID}`)
            if(res.data.success !== false){
                commit('delete_address_success', res.data)
            }
            return res
        } catch (err) {
            commit('delete_address_error', err)
        }
    }
}