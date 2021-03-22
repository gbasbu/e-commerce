import axios from 'axios'

export const state = {
    comments: [],
}

export const getters = {
    comments: state => state.comments,
}

export const mutations = {
    add_comment_success(state, data) {
        state.commentInfo = data
        setTimeout(() => state.commentInfo = null, 3000)
    },
    add_comment_error(state, err) {
        state.commentInfo = err.response.data;
        setTimeout(() => state.commentInfo = null, 3000)
    },
    fetch_comments_success(state, data) {
        state.comments = data
    },
}

export const actions = {
    // Add Comment action
    async addComment({ commit }, productData) {
        try {
            let res = await axios.post("http://localhost:5000/api/comment/add", productData);
            if (res.data.success == true) {
                commit("add_comment_success", res.data)
            }
            return res
        } catch (err) {
            commit('add_comment_error', err)
        }
    },
    // Get Comments action
    async fetchComments({ commit }) {
        try {
            let res = await axios.get('http://localhost:5000/api/comments/get')
            if(res.data) {
                commit('fetch_comments_success', res.data.comments)
            }
        } catch (err) {
            console.log('get products err: ', err);
        }
    },
    
}