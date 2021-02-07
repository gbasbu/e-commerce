import axios from "axios";
import router from '../../router/index';

export const state = {
    token: localStorage.getItem("token") || "",
    user: {},
    userInfo: null
}

export const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    userInfo: state => state.userInfo,
}

export const mutations = {
    auth_success(state, data) {
        state.token = data.token
        state.user = data.user
        state.userInfo = data
    },
    auth_info(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    register_success(state, data) {
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    register_info(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    activate_success(state, data) {
        state.status = data.status;
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    activate_info(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    reset_code_success(state, data) {
        state.status = data.status;
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    reset_password_info(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    reset_password_success(state, data) {
        state.status = data.status;
        state.userInfo = data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    reset_code_info(state, err) {
        state.userInfo = err.response.data;
        setTimeout(() => (state.userInfo = null), 3000);
    },
    logout(state) {
        state.status = "";
        state.token = "";
        state.user = "";
        state.userInfo = null;
    },
    profile_response(state, user) {
        state.user = user;
    },
}

export const actions = {
    // Login Action
    async login({ commit }, user) {
        try {
            let res = await axios.post("http://localhost:5000/api/users/login", user);
            if (res.data.success) {
                const token = res.data.token;
                // Store the token into the localstorge
                localStorage.setItem("token", token);
                // Set the axios defaults
                axios.defaults.headers.common["Authorization"] = token;
                commit("auth_success", res.data);
            }
            return res;
        } catch (err) {
            commit("auth_info", err);
        }
    },
    // Register Action
    async register({ commit }, userData) {
        try {
            let res = await axios.post(
                "http://localhost:5000/api/users/register",
                userData
            );
            if (res.data.success == true) {
                commit("register_success", res.data);
            }
            return res;
        } catch (err) {
            commit("register_info", err);
        }
    },
    // Activation Action
    async activate({ commit }, userData) {
        try {
            let res = await axios.post(
                "http://localhost:5000/api/users/verify-email",
                userData
            );
            if (res.data.success == true) {
                commit("activate_success", res.data);
            }
            return res;
        } catch (err) {
            commit("activate_info", err);
        }
    },
    // Reset Password Mail
    async resetRequest({ commit }, userData) {
        try {
            let res = await axios.post(
                "http://localhost:5000/api/users/reset-request",
                userData
            );
            if (res.data.success == true) {
                commit("reset_code_success", res.data);
            }
            return res;
        } catch (err) {
            commit("reset_code_info", err);
        }
    },
    // Reset Password Action
    async resetPassword({ commit }, userData) {
        try {
            let res = await axios.post(
                "http://localhost:5000/api/users/reset-password",
                userData
            );
            if (res.data.success == true) {
                commit("reset_password_success", res.data);
            }
            return res;
        } catch (err) {
            commit("reset_password_info", err);
        }
    },
    // Get Profile
    async getProfile({ commit }) {
        let res = await axios.get("http://localhost:5000/api/users/profile");
        commit("profile_response", res.data.user);
        return res;
    },
    // Logout Action
    async logout({ commit }) {
        await localStorage.removeItem("token");
        commit("logout");
        delete axios.defaults.headers.common["Authorization"];
        router.push("/login");
        return;
    },
}