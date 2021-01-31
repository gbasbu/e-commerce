

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

};

export const actions = {

};