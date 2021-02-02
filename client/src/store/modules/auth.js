import axios from 'axios'
import router from '../../router'

export const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    statıs: '',
    error: null
};

export const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};

export const mutations = {
    auth_request(state){
        state.status = 'loading'
        state.error = null
    },
    auth_success(state, token, user){
        state.token = token,
        state.user = user,
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err){
        state.error = err.response.data.msg
        setTimeout(() => state.error = null, 3000);
    },
    register_request(state){
        state.status = 'loading'
        state.errorr = null
    },
    register_success(state){
        state.status = 'success'
        state.errorr = null
    },
    register_error(state, err) {
        state.error = err.response.data.msg
        setTimeout(() => state.error = null, 3000);
    },
    logout(state){
        state.status = ''
        state.token = ''
        state.user = ''
        state.error = null
    },
    profile_request(state){
        state.status = 'loading'
    },
    profile_response(state,user){
        state.user = user
    }
    
};

export const actions = {
    // Login Action
    async login({ commit }, user){
        commit('auth_request');
        try{
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
        }catch(err){
            commit('auth_error', err)
        }
    },
    // Register Action
    async register({ commit }, userData){
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:5000/api/users/register', userData);
            if(res.data.success !== undefined){
            commit('register_success');
        }
        return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // Get Profile
    async getProfile({ commit }) {
        commit('profile_request')
        let res = await axios.get('http://localhost:5000/api/users/profile')
        commit('profile_response', res.data.user)
        return res
    },
    // Logout Action
    async logout({ commit }){
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login')
        return
    }
};



