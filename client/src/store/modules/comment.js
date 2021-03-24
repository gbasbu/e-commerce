import axios from 'axios'
const api = 'http://localhost:5000/api/comment/'
export const state = {
    comments: [],
}

export const getters = {
    comments: state => state.comments,
}

export const mutations = {
    ADD_COMMENT(state, data) {
        state.comments.push(data)
    },
    GET_COMMENTS(state, data) {
        state.comments = data
    },
    LIKE_COMMENT(state, data) {
        state.comments = data
    },
    DISLIKE_COMMENT(state, data) {
        state.comments = data
    }
}

export const actions = {
    // Add Comment action
    async addComment({ commit }, productData) {
        let result = await axios.post(`${api}/add`, productData);
        commit("ADD_COMMENT", result.data)
    },
    // Get Comments action
    async fetchComments({ commit }, productId) {
        let result = await axios.get(`${api}/${productId}`)
        commit('GET_COMMENTS', result.data)
    },
    // Like Comment action
    async likeComment({ commit }, commentId) {
        let result = await axios.post(`${api}/${commentId}/like`)
        commit('LIKE_COMMENT', result.data)
        
    },
    // Dislike Comment action
    async dislikeComment({ commit }, commentId) {
        let result = await axios.post(`${api}/${commentId}/dislike`)
        commit('DISLIKE_COMMENT', result.data)
    }
    
}