import axios from 'axios'
import router from '../../router'

export const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    info: null
};

export const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    info: state => state.info
};

export const mutations = {
    auth_request(state){
        state.status = 'loading'
        state.info = null
    },
    auth_success(state, token, user){
        state.token = token,
        state.user = user,
        state.status = 'success'
        state.info = null
    },
    auth_info(state, err){
        state.info = err.response.data
        setTimeout(() => state.info = null, 3000);
    },
    register_request(state){
        state.status = 'loading'
        state.info = null
    },
    register_success(state, err){
        state.status = 'success'
        state.info = err
        setTimeout(() => state.info = null, 3000);
    },
    register_info(state, err) {
        state.info = err.response.data
        setTimeout(() => state.info = null, 3000);
    },
    logout(state){
        state.status = ''
        state.token = ''
        state.user = ''
        state.info = null
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
            commit('auth_info', err)
        }
    },
    // Register Action
    async register({ commit }, userData){
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:5000/api/users/register', userData);
            if(res.data.success !== undefined){
            commit('register_success', res.data);
        }
        return res;
        } catch (err) {
            commit('register_info', err)
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



