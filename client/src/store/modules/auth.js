import axios from 'axios'


export const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    statıs: ''
};

export const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
};

export const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.token = token,
        state.user = user,
        state.status = 'success'
    }
};

export const actions = {
    // Login Action
    async login({ commit }, user){
        commit('auth_request');
        let res = await axios.post('http://localhost:5000/api/users/login', user)
        if(res.data.success){
            const token = res.data.token;
            const user = res.data.user;
            // Store the token into the localstorge
            localStorage.setItem('token', token);
            // Set the axios defaults
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token, user);
        }
        return res;
    }
};



