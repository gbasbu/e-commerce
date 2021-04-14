import axios from 'axios'
const api = `${process.env.VUE_APP_API_URL}/api/address`

export const state = {
    addresses: [],
}

export const getters = {
    addresses: state => state.addresses
}

export const mutations = {
    GET_ADDRESSES(state, data) {
        state.addresses = data
    },
    ADD_ADDRESS(state, data) {
        state.addresses.push(data)
    },
    DELETE_ADDRESS(state, data) {
    state.addresses.forEach(element => {
        if(element._id == data._id){
          state.addresses.splice(state.addresses.indexOf(element),1)
        }
      });
    },
    UPDATE_ADDRESS(state, data) {
    state.addresses = data
    }
}

export const actions = {
    // Fetch Addresses
    async fetchAddresses({ commit }) {
        const result = await axios.get(api)
        commit('GET_ADDRESSES', result.data)
    },
    // Add Address
    async addAddress({ commit }, data) {
        const result = await axios.post(`${api}/add`, data)
        commit('ADD_ADDRESS', result.data)
    },
    // Delete Address
    async deleteAddress({ commit }, id) {
        const result = await axios.delete(`${api}/${id}/delete`)
        commit('DELETE_ADDRESS', result.data)
    },
    // Update Address
    async updateAddress({ commit }, data) {
        const result = await axios.put(`${api}/${data.id}/update`, data)
        commit('UPDATE_ADDRESS', result.data)
    }
}

