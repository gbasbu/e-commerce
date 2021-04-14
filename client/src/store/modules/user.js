import axios from "axios";
import router from '../../router/index';
const api = `${process.env.VUE_APP_API_URL}/api/user`
const adminApi = `${process.env.VUE_APP_API_URL}/api/admin`

export const state = {
    token: localStorage.getItem("token") || "",
    users: [],
    user: {},
    userInfo: null,
    orders: []
}

export const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    users: state => state.users,
    user: state => state.user,
    userInfo: state => state.userInfo,
    orders: state => state.orders
}

export const mutations = {
    AUTH_SUCCESS(state, data) {
        state.token = data.token
        state.user = data.user
        state.status = data.success
    },
    AUTH_ERROR(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    REGISTER_SUCCESS(state, data) {
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    REGISTER_ERROR(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    ACTIVATE_SUCCESS(state, data) {
        state.status = data.status;
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    ACTIVATE_ERROR(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    RESET_CODE_SUCCESS(state, data) {
        state.status = data.status;
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    RESET_PASSWORD_ERROR(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    RESET_PASSWORD_SUCCESS(state, data) {
        state.status = data.status;
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    RESET_CODE_ERROR(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    LOGOUT(state) {
        state.status = "";
        state.token = "";
        state.user = "";
        state.userInfo = null;
    },
    PROFILE_RESPONSE(state, user) {
        state.user = user;
    },
    GET_USERS(state, data){
        state.users = data
    },
    BAN_USER(state, data) {
        state.users = data
    },
    UNBAN_USER(state, data) {
        state.users = data
    },
    DELETE_USER(state, data) {
        state.users = data
    },
    GET_ORDERS(state, data){
        state.orders = data
    }
}

export const actions = {
    // Login Action
    async login({ commit }, user) {
        try {
            let res = await axios.post(`${api}/login`, user);
            if (res.data.success) {
                const token = res.data.token;
                // Store the token into the localstorge
                localStorage.setItem("token", token);
                // Set the axios defaults
                axios.defaults.headers.common["Authorization"] = token;
                commit("AUTH_SUCCESS", res.data);
            }
            return res;
        } catch (err) {
            commit("AUTH_ERROR", err);
        }
    },
    // Register Action
    async register({ commit }, userData) {
        try {
            let res = await axios.post(`${api}/register`, userData);
            if (res.data.success == true) {
                commit("REGISTER_SUCCESS", res.data);
            }
            return res;
        } catch (err) {
            commit("REGISTER_ERROR", err);
        }
    },
    // Activation Action
    async activate({ commit }, userData) {
        try {
            let res = await axios.post(`${api}/verify-email`,userData);
            if (res.data.success == true) {
                commit("ACTIVATE_SUCCESS", res.data);
            }
            return res;
        } catch (err) {
            commit("ACTIVATE_ERROR", err);
        }
    },
    // Reset Password Mail
    async resetRequest({ commit }, userData) {
        try {
            let res = await axios.post(`${api}/reset-request`,userData);
            if (res.data.success == true) {
                commit("RESET_CODE_SUCCESS", res.data);
            }
            return res;
        } catch (err) {
            commit("RESET_CODE_ERROR", err);
        }
    },
    // Reset Password Action
    async resetPassword({ commit }, userData) {
        try {
            let res = await axios.post(`${api}/reset-password`, userData);
            if (res.data.success == true) {
                commit("RESET_PASSWORD_SUCCESS", res.data);
            }
            return res;
        } catch (err) {
            commit("RESET_PASSWORD_ERROR", err);
        }
    },
    // Get Profile
    async getProfile({ commit }) {
        let res = await axios.get(`${api}/profile`);
        commit("PROFILE_RESPONSE", res.data.user);
        return res;
    },
    // Logout Action
    async logout({ commit }) {
        await localStorage.removeItem("token");
        commit("LOGOUT");
        delete axios.defaults.headers.common["Authorization"];
        router.push("/login");
        return;
    },
    // Get users
    async fetchUsers({ commit }){
        const result = await axios.get(`${adminApi}/users`)
        commit('GET_USERS', result.data)
    },
    // Ban user
    async banUser({ commit }, userId){
        const result = await axios.post(`${adminApi}/user/${userId}/ban`)
        commit('BAN_USER', result.data)
    },
    // Unban user
    async unbanUser({ commit }, userId){
        const result = await axios.post(`${adminApi}/user/${userId}/unban`)
        commit('UNBAN_USER', result.data)
    },
    // Delete user
    async deleteUser({ commit }, userId){
        const result = await axios.delete(`${adminApi}/user/${userId}/delete`)
        commit('DELETE_USER', result.data)
    },
    //Get orders from user id
    async fetchOrders({ commit }){
        const result = await axios.get(`${api}/orders`)
        commit('GET_ORDERS', result.data)
    }
}