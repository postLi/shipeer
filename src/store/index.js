
import Vue from 'vue'
import vuex from 'vuex'
import {getUserInfo,setUserInfo} from '@/utils/auth'

Vue.use(vuex);

const state = {
  token:'',
  userData:{},
  bodyWidth:''//右边内容宽度
};

const actions = {
  tokenGet({commit}, value){
    commit('tokenGet',value);
  },
  setBodyWidth({commit}, value){
    commit('setBodyWidth',value);
  },
};

const getters = {
  getToken(state){
    return state.token
  },
  getUserInfo(state){
    return state.userData
  },
  getBodyWidth(state){
    return state.bodyWidth
  }
};

const mutations = {
  tokenGet(state, value){
    state.token = value;
  },
  setUserInfo(state,value){
    state.userData = value
  },
  setBodyWidth(state,value){
    state.bodyWidth = value
  }

};

export default new vuex.Store({
  state,
  actions,
  getters,
  mutations
})
