
import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const state = {
  token:''
};

const actions = {
  tokenGet({commit}, value){
    commit('tokenGet',value);
  },
};

const getters = {
  getToken(state){
    return state.token
  }
};

const mutations = {
  tokenGet(state, value){
    state.token = value;
  },

};

export default new vuex.Store({
  state,
  actions,
  getters,
  mutations
})
