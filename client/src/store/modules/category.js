import axios from 'axios'

export const state = {
    categories: []
}

export const getters = {
   categories: state => state.categories
}

export const mutations = {
    fetch_categories(state, data){
        state.categories = data
    }
}

export const actions = {
    // Get categories action
    async fetchCategories({ commit }){
        let res = await axios.get('http://localhost:5000/api/categories/get')
        commit('fetch_categories', res.data.categories)
    }
}