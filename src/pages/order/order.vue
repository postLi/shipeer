<template>
  <div class="height_100 flex_r">
    <div v-show="!nextSuccess" class="margin_10 flex_1 b_c_w o_f" >
  <div class="tip">
    <span class="title">小提示</span>
    <span class="title1">（<span>*</span>号为必填项）</span>
  </div>

  <div class="item-margin item-1 flex_r">
    <div class="item-l"><span class="f_r">*</span>选择城市：</div>
    <el-cascader placeholder="请选择城市" size="small"
    :props="defaultProps"
    :options="cityList"
    v-model="form.code"
    :show-all-levels="false"
    filterable
    @change="getPriceByArea">
    </el-cascader>

    <div class="item-1-2">
      <span>选择用车时间：</span>
      <el-date-picker
        prefix-icon="el-icon-date"
        style="width: 250px"
        size="small"
        v-model="form.date"
        type="date"
        :picker-options="pickerOptions1"
        value-format="timestamp"
        placeholder="选择日期"
      @change="changeDate"
      >
      </el-date-picker>
    </div>

    <div  class="item-1-3">
      <el-select v-model="form.time" placeholder="选择时间" size="small" style="width: 121px">
        <el-option
          v-for="item in timeList"
          :key="item.time"
          :label="item.timeShow"
          :value="item.time">
        </el-option>
      </el-select>
    </div>

  </div>

  <div class="item-margin item-2 flex_r">
    <div class="item-l"><span class="f_r">*</span>选择车型：</div>
    <div class="flex_ae">
      <div class="p_r flex" style="width: 208px" v-for="(item,index) in carList" :key="item.carType" >
        <img @mouseover="selectHover(item.list[0])" @mouseout="outHover(item.list[0])" style="height: 60px" class="pointer" :src="item.list[0].servicePic" alt="" @click="selectCar(item.list[0].carTypeCode)" :style="{'filter':(form.carId === item.list[0].carTypeCode)?'opacity(100%)': 'opacity(50%)'}">
        <div class="img-mark" v-show="item.list[0].show">
          <div class="margin_t_10 flex_a">
            <span class="left">载重</span>
            <span>{{item.list[0].capacityTon}}吨</span>
          </div>
          <div class="margin_t_10 flex_a">
            <span  class="left">长宽高</span>
            <span>{{item.list[0].carLength}}*{{item.list[0].carWidth}}*{{item.list[0].carHeight}}米</span>
          </div>
          <div class="margin_t_10 flex_a">
            <span  class="left">载货体积</span>
            <span>{{item.list[0].capacitySquare}}方</span>
          </div>
        </div>
      </div>
    </div>

  </div>


  <div class="item-margin item-3 flex_r">
    <div class="item-l">特殊规格(选填)：</div>
    <el-button size="small" @click="specClick(item.code)" v-for="(item,index) in specList" :key="item.id" :style="{'background-color':(item.code === form.specCode)?'#1890ff':'#f2f2f2','color':(item.code === form.specCode)?'white':'black'}">{{item.name}}</el-button>
  </div>

  <!--提货地 目的地 -->
  <div class="item-margin item-4 flex_r" v-for="(item,index) in form.to">
    <div v-if="index === 0" class="item-l"><span class="f_r">*</span>提货地：</div>
    <div  v-if="index > 0 && index + 1 !== form.to.length" class="item-l"><span class="f_r">*</span>途经地：</div>
    <div  v-if="index + 1 ===  form.to.length"  class="item-l"><span class="f_r">*</span>目的地：</div>
    <div>
      <div class="flex">
        <div class="item-4-1 flex_sb p_r">
          <div class="flex_1 input flex_a" @click="showMap1(item,index)">
            <img src="../../assets/main/tihuod.png" alt="">
            <span>{{(item.origin === '')?'必填':item.origin}}</span>

          </div>
          <div class="address" @click="selectDistAddress(item,index)">常用地址</div>
          <show-map :data="item" :ref="index"></show-map>
          <show-address :showAddress="item" :ref="index" :type="0" @selectAddress="(data)=>{
              return getSelectAddress1(data,item)
          }"></show-address>
        </div>

        <div class="p_r" v-if="index === 0">
          <el-button size="small" style="background-color: #2fb301;color: white" @click="routeClick()">选择常用线路</el-button>
          <!--弹窗-->
          <div class="route-line flex_f" v-show="windowRoute">
            <div class="title flex_sb margin_b_10">
              <span class="window-title-left">选用常用路线</span>
              <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="windowRoute = false">
            </div>
            <div class="search flex_sb">
              <div class="search-body flex_a">
                <div class="flex_1 height_100 search-left flex_a">
                  <input type="text" v-model="search_route" class="my-input margin_l_10" placeholder="请输入关键字搜索">
                </div>
                <div class="search-right height_100 flex pointer">搜索</div>
              </div>
              <div class="p_r">
                <el-button size="small" @click="$refs.show.showWindow()" type="primary">新增常用路线</el-button>
                <!--新增常用路线-->
                <add-route ref="show" @addRoute = "getAddRoute"></add-route>
              </div>
            </div>
            <div class="flex_1 o_f" v-if="searchRouteList.length > 0">
              <div class="route-item flex_f" v-for="(item,index) in searchRouteList" :key="item.id">
                <div class=" route-item-body flex_1 flex_a" v-for="(item1,index1) in item" :key="item1.id">
                  <div class="p_r height_100 route-item-body-left" v-if="index1 === 0">
                    <div class="green-point"></div>
                    <div class="green-point-line address-line"></div>
                  </div>

                  <div class="p_r height_100 route-item-body-left" v-if="index1 > 0 && index1 + 1 !== item.length">
                    <div class="gray-point"></div>
                    <div class="gray-point-up address-line"></div>
                    <div class="gray-point-down address-line"></div>
                  </div>

                  <div class="p_r height_100 route-item-body-left" v-if="index1 !== 0 && index1 + 1 === item.length">
                    <div class="red-point"></div>
                    <div class="red-point-line address-line"></div>
                  </div>
                  <div>
                    <div class="window-title-12">{{item1.name}}</div>
                    <div class="window-title-10">{{item1.address}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex height_100 window-title-left">
              还没有路线
            </div>

          </div>
        </div>

        <el-button size="small" v-if="index === 1" type="success" icon="el-icon-circle-plus" style="background-color: white;color: #2fb301" @click="addNewDestination(form.to.length)">新增目的地</el-button>
        <el-button size="small" v-if="index > 1 " type="danger" icon="el-icon-remove" style="background-color: white;color: #ff300d" @click="delNewDestination(index)">删除目的地</el-button>
      </div>
      <div class="flex_r">
        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/menpaih.png" alt="">
          <input class="my-input margin_l_10" placeholder="楼层及门牌号（选填）" v-model="item.floorHousenum"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/fahuor.png" alt="">
          <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="item.contacts"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/nav_phone.png" alt="">
          <input class="my-input margin_l_10" placeholder="收货联系人电话（选填）" v-model="item.contactsPhone"/>
        </div>
      </div>
    </div>
  </div>

  <div class="item-margin item-5 flex_r">
    <div class="item-l">货物名称：</div>
    <div  class="item-5-1">
      <!--<el-autocomplete style="width: 140px" size="small" v-model="form.goodsId" :fetch-suggestions="goodsSearch"-->
        <!--placeholder="请输入货物" @select="handleSelect">-->
        <!--<template slot-scope="{ item }">-->
          <!--<div >{{ item.name }}</div>-->
        <!--</template>-->
      <!--</el-autocomplete>-->
      <div class="p_r" style="width: 140px" >
        <div class="select-drop flex_sb pointer" @click="goodsWindow = !goodsWindow">
          <div class="flex_1 window-title-12 padding_l_10">{{(goodsName === '')?"（选填）":goodsName}}</div>
          <i class="flex el-input__icon el-icon-arrow-down"></i>
        </div>
        <div class="small-window" style="width: 400px" v-if="goodsWindow">
          <div class="f_f">
            <el-button size="mini" @click="goodsClick({name:'',id:''})" style="background-color: #f2f2f2;color: black; margin: 0;">
              不填
            </el-button>
              <el-button style="margin: 0 3px 3px 0" size="mini" @click="goodsClick(item)" v-for="(item,index) in goodsList" :key="item.id"
                         :style="{'background-color':(item.id === form.goodsId)?'#1890ff':'#f2f2f2','color':(item.id === form.goodsId)?'white':'black'}">
                {{item.name}}
              </el-button>
          </div>
          <div class="flex_a margin_t_10">
            <el-input
              class="margin_r_10"
              autosize
              size="mini"
              placeholder="手动输入货物名称"
              v-model="inputGoods">
            </el-input>
            <el-button size="mini" @click="closeGoods()" type="success">
              确实
            </el-button>
          </div>
        </div>
      </div>


    </div>
    <div class="item-5-1 flex_a">
      <div class="p_r" >
        <div class="select-drop flex_sb pointer" @click="wightWindow = !wightWindow">
          <div class="flex_1 window-title-12 padding_l_10">{{(wightName === '不填' || wightName === '')?"（选填）":wightName}}</div>
          <i class="flex el-input__icon el-icon-arrow-down"></i>
        </div>
        <div class="small-window" v-if="wightWindow">
          <div class="f_f">
            <el-button style="margin: 0 3px 3px 0" size="mini" @click="wightClick(item)" v-for="(item,index) in wightList" :key="item.id"
                       :style="{'background-color':(item.id === form.wightId)?'#1890ff':'#f2f2f2','color':(item.id === form.wightId)?'white':'black'}">
              {{item.name}}
            </el-button>
          </div>
          <div class="flex_a margin_t_10">
            <el-input
              class="margin_r_10"
              autosize
              size="mini"
              placeholder="手动输入重量（单位：吨）"
              v-model="inputWight">
            </el-input>
            <el-button size="mini" @click="closeWight()" type="success">
              确实
            </el-button>
          </div>
        </div>
      </div>
      <span>吨</span>
    </div>
    <div  class="item-5-1 flex_a">
      <div class="p_r" >
        <div class="select-drop flex_sb pointer" @click="volumeWindow = !volumeWindow">
          <div class="flex_1 window-title-12 padding_l_10">{{(volumeName === '不填' || volumeName === '')?"（选填）":volumeName}}</div>
          <i class="flex el-input__icon el-icon-arrow-down"></i>
        </div>
        <div class="small-window" v-if="volumeWindow">
          <div class="f_f">
            <el-button style="margin: 0 3px 3px 0" size="mini" @click="volumeClick(item)" v-for="(item,index) in volumeList" :key="item.id"
                       :style="{'background-color':(item.id === form.volumeId)?'#1890ff':'#f2f2f2','color':(item.id === form.volumeId)?'white':'black'}">
              {{item.name}}
            </el-button>
          </div>
          <div class="flex_a margin_t_10">
            <el-input
              class="margin_r_10"
              autosize
              size="mini"
              placeholder="手动输入体积（单位：方）"
              v-model="inputVolume">
            </el-input>
            <el-button size="mini" @click="closeVolume()" type="success">
              确实
            </el-button>
          </div>
        </div>
      </div>
      <span>方</span>
    </div>
  </div>

  <div class="item-margin item-6 flex_r">
    <div class="item-l">额外需求(选填)：</div>
    <el-button size="small" @click="requestClick(item.extraId)" v-for="(item,index) in requestList" :key="item.extraId"
               :style="{'background-color':(item.extraId === form.requestId)?'#1890ff':'#f2f2f2','color':(item.extraId === form.requestId)?'white':'black'}">
      <span v-if="item.extraName ==='需要装卸'">{{item.extraName}}（与司机议价）</span>
      <span v-else>{{item.extraName}}（免费）</span>
    </el-button>
  </div>

  <div class="item-margin item-7 flex_r">
    <div class="item-l">订单备注：</div>
    <div class="item-7-1">
      <div class="flex_a number">
        <div class="a">{{form.remarks.length}}</div>
        <div class="aa">/60</div>
      </div>
      <el-input
        maxlength="60"
        type="textarea"
        autosize
        placeholder="请输入货物类型、订单备注等"
        :autosize="{ minRows: 2, maxRows: 4}"
        v-model="form.remarks">
      </el-input>
    </div>
  </div>

  <div class="item-margin item-8 flex_r">
    <div class="item-l"><span class="f_r">*</span>加小费：</div>
    <div class="flex_a">
      <div  class="margin_r_10">
        <div class="p_r">
          <div class="select-drop flex_sb pointer" @click="tipWindow = !tipWindow">
            <div class="flex_1 window-title-12 padding_l_10">{{(tipName === '')?"（选填）":tipName}}</div>
            <i class="flex el-input__icon el-icon-arrow-down"></i>
          </div>
          <!--弹窗-->
          <div class="small-window" v-if="tipWindow">
            <div class="flex_sb">
              <el-button size="mini" @click="tipClick({name:'',id:''})" style="background-color: #f2f2f2;color: black">
                不加小费
              </el-button>
              <div>
                <el-button size="mini" @click="tipClick(item)" v-for="(item,index) in tipList" :key="item.id"
                           :style="{'background-color':(item.id === form.tipId)?'#1890ff':'#f2f2f2','color':(item.id === form.tipId)?'white':'black'}">
                  {{item.name}}
                </el-button>
              </div>

            </div>
            <div class="flex_a margin_t_10">
              <el-input
                class="margin_r_10"
                autosize
                size="mini"
                placeholder="其他金额（最高200元）"
                v-model="inputTip">
              </el-input>
              <el-button size="mini" @click="closeTip()" type="success">
                确实
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <el-checkbox v-model="form.tip">我的司机优先接单</el-checkbox>

    </div>
  </div>

  <div class="item-margin flex_r">
    <div class="item-l"></div>
    <el-button class=" f_w" style="background-color: #2fb301;width: 140px;height: 46px" type="success" @click="next()">下一步</el-button>
  </div>

</div>

    <show-map-next class="margin_10 flex_1 b_c_w o_f" v-show="nextSuccess" ref="childClickNext" :getDuration="getDuration"></show-map-next>
  </div>

</template>

<script>
  import VueJsCookie from 'vue-js-cookie'
  import myDialog from '../../components/myDialog'
  import showMap from './showMap.vue'
  import showMapNext from './showMapNext'
  import addRoute from './addRoute'
  import showAddress from './showAddress'
  import { getApi ,postApi} from "@/api/api.js";
  import {REGEX} from '@/utils/valiRegex.js'
    export default {
        name: "order",
      data() {
        return {
          defaultProps: {
            value:'code',
            children: 'cities',
            label: 'name'
          },
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime()  + 3600 * 1000 * 24 < Date.now();
            }
            },
          tipWindow:false,
          nextSuccess:false,//下一步
          windowRoute:false,//选择线路弹窗
          search_route:'',
          specList:[],//车辆规格
          requestList:[],//额外需求
          carList:[],//车辆列表
          searchRouteList:[],//路线列表

          mapNext:null,
          timeList:[],//时间列表
          form:{//主页表单
            code:[],//城市code
            date:'',//选择日期
            time:'',//选择的时间
            city:'',
            carId:"AF01801",
            specCode:'',//车辆规格Code
            requestId:'',//额外需求id
            goodsId:'',//货物id
            wightId:'',//重量id
            volumeId:'',//体积id
            tipId:'',//小费id
            to:[{
              consignee: "",//收货人姓名
              consigneeMobile: "",//收货人电话
              isSms: "",//是否短信通知(1为是，0为否)
              origin: "",//地点名称详细地址
              originCoordinate: "",//地点坐标(格式22.5253951835,114.0988813763纬度经度)
              originName: "",//地点名称
              provinceCityArea: "",//省市区（格式:广东省广州市天河区）
              shipperSort: 0,//线路排序号
                checked:false,show:false,mapTo:null,loadOne:true,zoom:14
            },
              {
                consignee: "",
                consigneeMobile: "",
                isSms: "",
                origin: "",
                originCoordinate: "",
                originName: "",
                provinceCityArea: "",
                shipperSort: 1,
              checked:false,show:false,mapTo:null,loadOne:true,zoom:14}
              ],
            remarks:''
          },
          getDuration:'',//起终时间
          distAddress:0,//主页选择目的地index
          cityList:[],//城市列表
          tipList:'',//小费列表
          tipName:'',//小费名
          inputTip:'',//手动输入小费
          goodsList:[],//货物列表
          goodsWindow:false,
          goodsName:'',
          inputGoods:'',
          wightList:[],//重量列表
          wightWindow:false,
          wightName:'',
          inputWight:'',
          volumeList:[],//体积列表
          volumeWindow:false,
          volumeName:'',
          inputVolume:'',
        }
      },
      methods:{
        getAddRoute(data){
          getApi('/aflc-uc/aflcShipperLineApi/findAflcShipperLine').then((res)=>{
            this.searchRouteList = res;
          });
        },
          routeClick(){
            this.windowRoute = !this.windowRoute;
            //收发货人路线列表
            this.getAddRoute();
          },
        volumeClick(item){
          this.form.volumeId = item.id;
          this.volumeName = item.name;
          this.inputVolume = '';
          this.volumeWindow = false;
        },
        closeVolume(){
          if(this.inputVolume !== ''){
            if(!REGEX.Number_point.test(this.inputVolume)){
              this.$message.warning("必须是数字");
              return
            }
            this.volumeName = this.inputVolume;
          } else {
            this.volumeName = '';
          }
          this.form.volumeId = '';
          this.volumeWindow = false;
        },
        wightClick(item){
          this.form.wightId = item.id;
          this.wightName = item.name;
          this.inputWight = '';
          this.wightWindow = false;
        },
        closeWight(){
          if(this.inputWight !== ''){
            if(!REGEX.Number_point.test(this.inputWight)){
              this.$message.warning("必须是数字");
              return
            }
            this.wightName = this.inputWight;
          } else {
            this.wightName = '';
          }
          this.form.wightId = '';
          this.wightWindow = false;
        },
        goodsClick(item){
          this.form.goodsId = item.id;
          this.goodsName = item.name;
          this.inputGoods = '';
          this.goodsWindow = false;
        },
        closeGoods(){
          if(this.inputGoods !== ''){
            this.goodsName = this.inputGoods;
          } else {
            this.goodsName = '';
          }
          this.form.goodsId = '';
          this.goodsWindow = false;
        },
        closeTip(){
          if(this.inputTip !== ''){
            if(!REGEX.ONLY_NUMBER.test(this.inputTip)){
              this.$message.warning("必须是数字");
              return
            }
            if((this.inputTip * 1) > 200){
              this.tipName = 200;
              this.inputTip = 200;
            } else {
              this.tipName = this.inputTip;
            }
          } else {
            this.tipName = '';
          }
          this.form.tipId = '';
          this.tipWindow = false;
        },
        tipClick(item){
          this.form.tipId = item.id;
          this.tipName = item.name;
          this.inputTip = '';
          this.tipWindow = false;
        },
        getSelectAddress1(data,item){
          item.address = data.address;
          item.cityCode = data.cityCode;
          item.contacts = data.contacts;
          item.contactsPhone = data.contactsPhone;
          item.coordinate = data.coordinate;
          item.floorHousenum = data.floorHousenum;
          item.provinceCityArea = data.provinceCityArea;
          item.summary = data.summary;
          item.type = data.type;
        },

        goodsSearch(queryString, cb){
          let restaurants = this.goodsList;
          let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          console.log(results)
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        handleSelect(item) {
          this.form.goodsId = item.name;
        },
        outHover(item){
          this.$set(item,'show',false);
        },
        selectHover(item){
          this.$set(item,'show',true);
        },
        changeDate(date){
          this.form.time = '';
          if(date !== null){
            let getDate = new Date().getDate();
            let dd = new Date(date).format("dd") *1;
            let startTime = date;
            let EndTime = date + 86400000;
            let t1 = 60 * 1000 * 15;
            let timeList = [];
            if(getDate === dd){
              //今天
              let now = new Date() * 1;
              let haveTime =   EndTime - now;
              let ii = Math.ceil(haveTime/t1) - 3;
              timeList.unshift({time:now,timeShow:'立即用车'});
              for(let i=ii;i>=0;i--){
                timeList.push({time:EndTime - t1 * i,timeShow:new Date(EndTime - t1 * i).format("hh:mm")})
              }
              this.timeList = timeList
            }else {
              let ii = 86400000/t1;
              for(let i=0;i<ii;i++){
                timeList.push({time:startTime + t1 * i,timeShow:new Date(startTime + t1 * i).format("hh:mm")})
              }
              this.timeList = timeList
            }
          }else {
            this.timeList = [];
          }
        },
        getPriceByArea(data){
          this.getPriceList(data[1]);
        },
        getPriceList(code){
          //价格服务 //额外需求
          getApi(`/aflc-sm/aflcPriceApi/getPriceByArea/${code}`).then((res)=>{
            console.log(res)
            // if(res[0].serviceName === "同城"){
              res[0].list.forEach((item)=>{
                item.list[0].show = false;
              });
              this.carList = res[0].list;
              getApi(`/aflc-sm/aflcExtraPriceApi/findExtraPrice/${res[0].serviceCode}`).then((res1)=>{
                this.requestList = res1;
              })
            // }
          })
        },

        selectDistAddress(item,i){
          item.show = !item.show;
          if(item.show === true){
            this.$refs[i][1].getList();
          }
        },
        delNewDestination(i){
          this.form.to.splice(i,1)
          this.form.to.forEach((item ,i)=>{
            item.shipperSort = i
          })
        },
        addNewDestination(i){
          if(this.form.to.length >10){
            this.$message.warning('最多只能添加十条目的地');
            return
          }
          this.form.to.push({
            consignee: "",
            consigneeMobile: "",
            isSms: "",
            origin: "",
            originCoordinate: "",
            originName: "",
            provinceCityArea: "",
            shipperSort: i,
            checked:false,show:false,mapTo:'',loadOne:true,zoom:14,})
        },

        next(){
          console.log(this.form)
          let priceId,priceType;
          this.carList.forEach((item)=>{
            if(item.carType === this.form.carId){
              priceId = item.list[0].id;
              priceType = item.list[0].priceType;
            }

          })

          let parm = {
            aflcPriceDto: {
              priceId: priceId,
              priceType: priceType,
              spec: this.form.specCode
            },
            belongCity: this.form.code[1],
            "couponId": "string",
            "distance": 0,
            extraPrice: 0,
            extraPriceCode: "",
            "extraServiceDtoList": [
              {
                "extraId": "string",
                "remark": "string"
              }
            ],
            "goodsName": "string",
            "goodsVolume": "string",
            "goodsWeight": "string",
            "ip": "string",
            "isFirst": "string",
            "orderFrom": "string",
            "orderPrice": 0,
            "preferentialAmountId": "string",
            "remark": "string",
            "serviceCode": "string",
            "shipperId": "string",
            "shipperLineDtoList": [
              {
                "consignee": "string",
                "consigneeMobile": "string",
                "isSms": "string",
                "origin": "string",
                "originCoordinate": "string",
                "originName": "string",
                "provinceCityArea": "string",
                "shipperSort": 0
              }
            ],
            "totalAmount": 0,
            "useCarTime": "2018-09-21T09:24:33.197Z",
            "usedCarType": "string"
          }
          console.log(parm)
          // this.nextSuccess = true;
          // setTimeout( ()=> {
          //
          //   this.mapNext =new BMap.Map(this.$refs.childClickNext.$refs.allMapNext, {enableMapClick:false});
          //   // this.mapNext.centerAndZoom(this.form.to._centerPoint, 14);
          //   this.mapNext.enableScrollWheelZoom(true);
          //
          //   let driving = new BMap.DrivingRoute(this.mapNext, {
          //     renderOptions:{map: this.mapNext, autoViewport: true,},
          //     onSearchComplete: (res)=>{
          //       if (driving.getStatus() != BMAP_STATUS_SUCCESS){
          //         return ;
          //       }
          //       let plan = res.getPlan(0);
          //       // this.getDuration = (plan.getDuration(false)/60).toFixed(0)
          //       this.getDuration = plan.getDuration(true)
          //     },
          //   });
          //   driving.search(this.form.from._centerPoint, this.form.to._centerPoint);
          //   let starIcon = new BMap.Icon('./static/ti.png',new BMap.Size(32,56),{anchor: new BMap.Size(16, 53)});
          //   let endIcon = new BMap.Icon('./static/ti.png',new BMap.Size(32,56),{anchor: new BMap.Size(16, 53)});
          //   driving.setMarkersSetCallback((res)=>{
          //     res[0].marker.setIcon(starIcon);
          //     res[1].marker.setIcon(endIcon);
          //   })
          // },200)
        },
        selectCar(id){
          this.form.carId = id;
        },
        specClick(code){
          this.form.specCode = code;
        },
        requestClick(id){
          this.form.requestId = id;
        },
        showMap1(item,i){
          let centerPoint;
          this.$refs[i][0].ok();
            // if(item.loadOne === true){
            //   item.loadOne = false;

          item.mapTo = new AMap.Map(this.$refs[i][0].$refs.allmap, {
            zoom: 14,
            scrollWheel: true,
            // center: centerPoint
          });
          if(item.originCoordinate === ""){
            // console.log(item.mapTo.getCenter())
            item.originCoordinate = [item.mapTo.getCenter().lat,item.mapTo.getCenter().lng].join(',')
          }else {
            let list = item.originCoordinate.split(',');
            centerPoint = [list[1] *1,list[0] *1];
            item.mapTo.setCenter(centerPoint)
          }
              AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) =>{


                var positionPicker = new PositionPicker({
                  mode: 'dragMap',
                  map: item.mapTo,
                  iconStyle: {
                    url: './static/ti.png',
                    ancher: [16, 56],
                    size: [32,56]
                  }
                });
                AMap.service('AMap.Geocoder',() =>{
                  let geocoder = new AMap.Geocoder({});
                  geocoder.getAddress(centerPoint, (status, result) =>{
                    if (status === 'complete' && result.info === 'OK') {
                      console.log(result)
                    }
                  });
                  item.mapTo.on("zoomchange",(e)=>{
                    console.log( item.mapTo.getCenter())
                    let centerPoint = [item.mapTo.getCenter().lng,item.mapTo.getCenter().lat];

                  })
                  item.mapTo.on("moveend",(e)=>{
                    console.log( item.mapTo.getCenter())
                    let centerPoint = [item.mapTo.getCenter().lng,item.mapTo.getCenter().lat];
                    geocoder.getAddress(centerPoint, (status, result) =>{
                      if (status === 'complete' && result.info === 'OK') {
                        console.log(result);

                      }
                    });
                  });

                })
                positionPicker.on('success', (positionResult)=> {
                  console.log(positionResult)
                  item.originCoordinate = [positionResult.position.lat,positionResult.position.lng].join(',');
                  item.origin = positionResult.address;
                });
                positionPicker.on('fail', (positionResult)=> {
                });
                positionPicker.start();
              });
            // }

            // this.$refs[i][0].getMapStatus();

        },
        createMap(){
          var citysearch = new AMap.CitySearch();
          citysearch.getLocalCity((status, result) =>{
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.city && result.bounds) {
                console.log(result);
                let adcode =  result.adcode * 1;
                let city = result.city;
                // let adcode =  11111111;
                // let city = 2222222;
                //城市列表
                getApi('/aflc-common/aflcCommonAddressApi/cityList').then((res)=>{
                  res.forEach((item)=>{
                    item.code = item.pinyin;
                    item.name = item.pinyin;
                  });
                  res.unshift({code: "当前城市", name: "当前城市", pinyin: "当前城市",cities:[{
                      code: adcode,
                      name: city,
                      parentCode: 1,
                      pinyin: "当前城市",
                    }]});
                  this.form.code = ["当前城市",adcode];
                  this.cityList = res;
                  this.getPriceList(adcode)
                });
              }
            }
          });
        },
      },

      components: {
        myDialog,showMap,showMapNext,addRoute,showAddress
      },
      mounted(){
        this.createMap();

        //选择车型
        getApi('/aflcsmservice/sm/aflcSysDict/v1/getCarTypeList').then((res)=>{
          console.log(res)
        })

        //车辆规格
        getApi('/aflcsmservice/sm/aflcSysDict/v1/getCarSpecList').then((res)=>{
          this.specList = res
        });

        //货物名称
        getApi('/aflccommonservice/sysDict/getSysDictByCodeGet/AF034').then((res)=>{
          this.goodsList = res
        });

        //重量
        getApi('/aflc-common/sysDict/getSysDictByCodeGet/AF00403').then((res)=>{
          this.wightList = res
        });
        //体积
        getApi('/aflc-common/sysDict/getSysDictByCodeGet/AF00404').then((res)=>{
          this.volumeList = res
        });

        //小费
        getApi('/aflc-common/sysDict/getSysDictByCodeGet/AF00405').then((res)=>{
          this.tipList = res
        });
      }
    }
</script>

<style scoped lang="scss">
  .margin_r_50{
    margin-right: 50px;
  }

  .item-margin{
    margin: 19px 0 0 20px;
  }

  .tip{
    margin: 22px 0 0 20px;
    .title{
      font-size: 12px;

      color: #ff300d;
    }
    .title1{
      font-size: 12px;

      color: #999999;
      span{
        color: #ff300d;
      }
    }
  }

  .item-l{
    width: 140px;
    font-size: 14px;

    color: #333333;
  }


.item-1{
  width: 940px;

  .item-1-2{
    margin-left: 50px;
    width: 366px;
    span{
      font-size: 14px;
      color: #333333;
    }
  }
}
  .item-2{
    /*width: 940px;*/
    .p_r{
      /*margin-right: 73px;*/
    }
  }
  .img-mark{
    position: absolute;
    width: 208px;
    height: 136px;
    z-index: 300;
    top: 62px;
    left: 0;
    background-color: rgba(51,51,51,0.8);
    padding: 15px;
    box-sizing: border-box;
    span{
      font-size: 14px;
      color: #ffffff;
    }
    .left{
      width: 80px;
      font-size: 14px;

      color: rgba(255, 255, 255, 0.8);
    }
  }
  .item-3{
  }

  .item-4{
    .item-4-1 {
      position: relative;
      margin-right: 20px;
      width: 940px;
      height: 32px;
      background-color: #ffffff;
      border-radius: 2px;
      border: solid 1px #dcdfe6;
      box-sizing: border-box;
      .input{
        font-size: 12px;

        color: #999999;
      }
      .address{
        font-size: 12px;
        color: #46a6ff;
        padding-right: 10px;
      }
      img{
        padding: 0 10px 0 3px;
      }
    }
  }

  .item-base{
    width: 280px;
    height: 31px;
    border-radius: 2px;
    border: solid 1px #dcdfe6;
    box-sizing: border-box;
    img{
      margin-left: 3px;
    }
  }

  .item-5{
    .item-5-1{
      margin-right: 50px;
    }
  }

  .item-7{
    .item-7-1{
      position: relative;
      width: 940px;
      .number{
        position: absolute;
        bottom: -4px;
        right: 16px;
        width: 40px;
        height: 30px;
        div:nth-of-type(2){
          font-size: 12px;
          color: #999999;

        }
        div:nth-of-type(1){
          font-size: 12px;

          color: #ee3d42;
        }
      }

    }
  }



  .route-line{
    position: absolute;
    top: 0;
    width: 486px;
    height: 481px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px #DEDEDE;
    padding: 8px;
    box-sizing: border-box;

    .search{
      .search-body{
        width: 298px;
        height: 35px;
        border-radius: 3px;
        .search-left{
          background-color: #f2f2f2;
          border: 1px solid #f2f2f2;
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;

        }
        .search-right{
          width: 50px;
          color: white;
          background-color: #2fb301;
          border: 1px solid #2fb301;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
        }
      }
    }
    .route-item{
      /*height: 119px;*/
      .route-item-body{
        height: 40px;
        .route-item-body-left{
          width: 47px;
        }
      }
    }
  }
  .add-route{
    position: absolute;
    top: 0;
    right: 0;
    width: 509px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px #DEDEDE;
    box-sizing: border-box;
    padding: 10px 20px;
    .add-route-item{
      margin-top: 20px;
    }
  }

  .select-drop{
    width: 120px;
    height: 32px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #dcdfe6;
    box-sizing: border-box;
  }


  .small-window{
    position: absolute;
    top: 42px;
    left: 0;
    width: 300px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px #DEDEDE;
    box-sizing: border-box;
    padding: 10px 20px;
    z-index: 200;
  }

  .green-point{
    width: 10px;height: 10px;border-radius: 40px;background-color: green;
    position: absolute;top: 50%;left: 50%;
    transform: translate(-50%,-50%)
  }
  .green-point-line{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 34%);
  }


  .red-point{
    width: 10px;height: 10px;border-radius: 40px;background-color: red;
    position: absolute;top: 50%;left: 50%;
    transform: translate(-50%,-50%)
  }

  .red-point-line{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -132%);
  }

  .gray-point{
    width: 6px;height: 6px;border-radius: 40px;background-color: #999999;
    position: absolute;top: 50%;left: 50%;
    transform: translate(-50%,-50%)
  }
  .gray-point-up{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -132%);
  }
  .gray-point-down{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 34%);
  }

  .address-line {
    width: 2px;
    height: 18px;
    border-radius: 2px;
    background-color: #979797;
  }
</style>
