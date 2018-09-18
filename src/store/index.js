
import Vue from 'vue'
import vuex from 'vuex'
import {getUserInfo,setUserInfo} from '@/utils/auth'

Vue.use(vuex);

const state = {
  token:'',
  userData:{}
};

const actions = {
  tokenGet({commit}, value){
    commit('tokenGet',value);
  },
};

const getters = {
  getToken(state){
    return state.token
  },
  getUserInfo(state){
    return state.userData
  }
};

const mutations = {
  tokenGet(state, value){
    state.token = value;
  },
  setUserInfo(state,value){
    state.userData = value
  }


};

export default new vuex.Store({
  state,
  actions,
  getters,
  mutations
})
