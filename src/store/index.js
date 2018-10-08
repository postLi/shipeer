
import Vue from 'vue'
import vuex from 'vuex'
import {getUserInfo,setUserInfo} from '@/utils/auth'

Vue.use(vuex);

const state = {
  token:'',
  userData:{},
  bodyWidth:'',//右边内容宽度

  form:{//主页表单
    belongCity:'',//发货地 订单所属区域(定位的城市id)
    carList:[],//车辆列表
    code:[],//城市code
    date: new Date(),//选择日期
    timeList:[],//时间列表
    time:'',//选择的时间
    city:'',
    carId:"AF01801",
    specCode:'',//车辆规格Code
    extraServiceDtoList:[],//额外服务
    goodsId:'',//货物id
    goodsName:'',
    wightId:'',//重量id
    wightName:'',
    volumeId:'',//体积id
    volumeName:'',
    tipId:'',//小费id
    tipName:'',//小费名
    isFirst:false,//我的司机优先接单
    to:[{
      consignee: "",//收货人姓名
      consigneeMobile: "",//收货人电话
      isSms: 0,//是否短信通知(1为是，0为否)
      origin: "",//地点名称详细地址
      originCoordinate: "",//地点坐标(格式22.5253951835,114.0988813763纬度经度)
      originName: "",//地点名称
      provinceCityArea: "",//省市区（格式:广东省广州市天河区）
      shipperSort: 0,//线路排序号
      show:false,mapTo:null,zoom:14,checkP:true,checkMap:true,adcode:''
    },
      {
        consignee: "",
        consigneeMobile: "",
        isSms: 0,
        origin: "",
        originCoordinate: "",
        originName: "",
        provinceCityArea: "",
        shipperSort: 1,
        show:false,mapTo:null,zoom:14,checkP:true,checkMap:true,adcode:''}
    ],
    remark:''//给司机捎句话
  },
};

const actions = {
  tokenGet({commit}, value){
    commit('tokenGet',value);
  },
  setBodyWidth({commit}, value){
    commit('setBodyWidth',value);
  },
  setForm({commit}, value){
    commit('setForm',value);
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
  },
  getForm(state){
    return state.form
  },
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
  },
  setForm(state,value){
    state.form = value
  }

};

export default new vuex.Store({
  state,
  actions,
  getters,
  mutations
})
