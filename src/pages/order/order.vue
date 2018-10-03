<template>
  <div class="height_100 flex_r">
    <!--margin_10暂时不要-->
    <div class="flex_1 b_c_w o_f" >
      <div class="tip">
        <span class="title">小提示</span>
        <span class="title1">（<span>*</span>号为必填项）</span>
      </div>

      <div class="item-margin item-1 flex_r">
        <div class="item-l"><span class="f_r">*</span>选择城市：</div>
        <el-cascader placeholder="请选择城市" size="small" style="width: 121px"
        :props="defaultProps"
        :options="cityList"
        v-model="form.code"
        :show-all-levels="false"
        filterable
        @change="getPriceByArea">
        </el-cascader>

        <div class="item-1-2">
          <span>选择用车时间：</span>
          <el-date-picker :clearable="false"
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

        <div class="item-1-3">
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
        <div class="p_r flex" style="width: 208px" v-for="(item,index) in form.carList" :key="item.carType" >
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

    <!--发货地 目的地 -->
      <div class="item-margin item-4 flex_r" v-for="(item,index) in form.to">
      <div v-if="index === 0" class="item-l"><span class="f_r">*</span>发货地：</div>
      <div  v-if="index > 0 && index + 1 !== form.to.length" class="item-l"><span class="f_r">*</span>途经地：</div>
      <div  v-if="index + 1 ===  form.to.length"  class="item-l"><span class="f_r">*</span>目的地：</div>
      <div>
        <div class="flex">
          <div class="item-4-1 flex_sb p_r">
            <div class="flex_1 input flex_a" @click="showMap1(item,index)">
              <img src="../../assets/main/tihuod.png" alt="">
              <span class="window-title-12" :class="[(item.origin === '')?'c-9':'c-0']">{{(item.origin === '')?'必填':item.origin}}</span>

            </div>
            <div class="address pointer" @click="selectDistAddress(item,index)">常用地址</div>
            <show-map :data="item" :ref="index"></show-map>
            <show-address :showAddress="item" :ref="index" :type="(index ===0)?'0':'1'" @selectAddress="(data)=>{
                return getSelectAddress1(item,data)
            }"></show-address>
          </div>

          <div class="p_r" v-if="index === 0">
            <el-button size="small" style="background-color: #2fb301;color: white" @click="routeClick()">选择常用线路</el-button>
            <!--弹窗-->
            <div class="route-line flex_f" v-show="windowRoute">
              <div class="title flex_sb margin_b_10">
                <span class="window-title-left c-3">选用常用路线</span>
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
                  <el-button size="small" @click="$refs.show[0].showWindow()" type="primary">新增常用路线</el-button>
                  <!--新增常用路线-->

                  <add-route ref="show" @addRoute = "getAddRoute" ></add-route>

                </div>
              </div>
              <div class="flex_1 o_f" v-if="searchRouteList.length > 0">
                <div class="route-item flex_f" v-for="(item,index) in searchRouteList" :key="item.id">
                  <route-line :data="item" from="order" @selectLine="getSelectLine"></route-line>
                </div>
              </div>
              <div v-else class="flex height_100 window-title-left c-3">
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
            <input class="my-input margin_l_10" :placeholder="(index === 0)?'发货联系人（选填）':'收货联系人（选填）'" v-model="item.consignee"/>
          </div>

          <div class="item-base margin_t_10 flex_a margin_r_50">
            <img src="../../assets/main/nav_phone.png" alt="">
            <input class="my-input margin_l_10" :placeholder="(index === 0)?'发货联系人电话（必填）':'收货联系人电话（选填）'" v-model="item.consigneeMobile"/>
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
          <div class="select-drop flex_sb pointer" @click="()=>{tipWindow= false;wightWindow = false;volumeWindow = false;goodsWindow = !goodsWindow}">
            <div class="flex_1 window-title-12 c-3 padding_l_10">{{(form.goodsName === '')?"（选填）":form.goodsName}}</div>
            <i style="line-height: 100%;" class="el-input__icon el-icon-arrow-down"></i>
          </div>
          <div class="small-window" style="width: 400px" v-if="goodsWindow">
            <div class="f_f">

              <my-button @click="goodsClick({name:'',id:''})" style="background-color: #f2f2f2;color: black; margin: 0;">
                不填
              </my-button>

                <my-button style="margin: 0 3px 3px 0" size="mini" @click="goodsClick(item)" v-for="(item,index) in goodsList" :key="item.id"
                           :style="{'background-color':(item.id === form.goodsId)?'#1890ff':'#f2f2f2','color':(item.id === form.goodsId)?'white':'black'}">
                  {{item.name}}
                </my-button>
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
                确定
              </el-button>
            </div>
          </div>
        </div>


      </div>
      <div class="item-5-1 flex_a">
        <div class="p_r" >
          <div class="select-drop flex_sb pointer" @click="()=>{tipWindow= false;goodsWindow = false;volumeWindow = false;wightWindow = !wightWindow}">
            <div class="flex_1 window-title-12 c-3 padding_l_10">{{(form.wightName === '不填' || form.wightName === '')?"（选填）":form.wightName}}</div>
            <i style="line-height: 100%;" class="el-input__icon el-icon-arrow-down"></i>
          </div>
          <div class="small-window" v-if="wightWindow">
            <div class="f_f">
              <my-button style="margin: 0 3px 3px 0" size="mini" @click="wightClick(item)" v-for="(item,index) in wightList" :key="item.id"
                         :style="{'background-color':(item.id === form.wightId)?'#1890ff':'#f2f2f2','color':(item.id === form.wightId)?'white':'black'}">
                {{item.name}}
              </my-button>
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
                确定
              </el-button>
            </div>
          </div>
        </div>
        <span class="window-title-12 margin_l_10">吨</span>
      </div>
      <div  class="item-5-1 flex_a">
        <div class="p_r" >
          <div class="select-drop flex_sb pointer" @click="()=>{tipWindow= false;goodsWindow = false;wightWindow = false;volumeWindow = !volumeWindow}">
            <div class="flex_1 window-title-12 c-3 padding_l_10">{{(form.volumeName === '不填' || form.volumeName === '')?"（选填）":form.volumeName}}</div>
            <i style="line-height: 100%;" class="el-input__icon el-icon-arrow-down"></i>
          </div>
          <div class="small-window" v-if="volumeWindow">
            <div class="f_f">
              <my-button style="margin: 0 3px 3px 0" size="mini" @click="volumeClick(item)" v-for="(item,index) in volumeList" :key="item.id"
                         :style="{'background-color':(item.id === form.volumeId)?'#1890ff':'#f2f2f2','color':(item.id === form.volumeId)?'white':'black'}">
                {{item.name}}
              </my-button>
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
                确定
              </el-button>
            </div>
          </div>
        </div>
        <span class="window-title-12 margin_l_10">方</span>
      </div>
    </div>

      <div class="item-margin item-6 flex_r">
      <div class="item-l">额外需求(选填)：</div>
      <el-button size="small" @click="requestClick(item)" v-for="(item,index) in requestList" :key="item.extraId"
                 :style="{'background-color':(item.selected)?'#1890ff':'#f2f2f2','color':(item.selected)?'white':'black'}">
        <span v-if="item.extraName ==='需要装卸'">{{item.extraName}}（与司机议价）</span>
        <span v-else>{{item.extraName}}{{item.remark === ''? '（免费）':'￥(' + item.remark + ')' }}</span>
      </el-button>
    </div>

      <div class="item-margin item-7 flex_r">
      <div class="item-l">订单备注：</div>
      <div class="item-7-1">
        <div class="flex_a number">
          <div class="a">{{form.remark.length}}</div>
          <div class="aa">/60</div>
        </div>
        <el-input
          style="font-size: 12px"
          maxlength="60"
          type="textarea"
          autosize
          placeholder="请输入货物类型、订单备注等"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="form.remark">
        </el-input>
      </div>
    </div>

      <div class="item-margin item-8 flex_r">
      <div class="item-l"><span class="f_r">*</span>加小费：</div>
      <div class="flex_a">
        <div  class="margin_r_10">
          <div class="p_r">
            <div class="select-drop flex_sb pointer" @click="()=>{
            goodsWindow = false;wightWindow = false;volumeWindow = false
            tipWindow = !tipWindow
            }">
              <div class="flex_1 window-title-12 c-3 padding_l_10">{{(form.tipName === '')?"（选填）":form.tipName}}</div>
              <i style="line-height: 100%;" class="el-input__icon el-icon-arrow-down"></i>
            </div>
            <!--弹窗-->
            <div class="small-window" v-if="tipWindow">
              <div class="flex_sb">
                <my-button size="mini" @click="tipClick({name:'',id:''})" style="background-color: #f2f2f2;color: black">
                  不加小费
                </my-button>
                <div>
                  <my-button style="margin: 0 3px 3px 0;" size="mini" @click="tipClick(item)" v-for="(item,index) in tipList" :key="item.id"
                             :style="{'background-color':(item.id === form.tipId)?'#1890ff':'#f2f2f2','color':(item.id === form.tipId)?'white':'black'}">
                    {{item.name}}
                  </my-button>
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
                  确定
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <el-checkbox v-model="form.isFirst">我的司机优先接单</el-checkbox>

      </div>
    </div>

      <div class="item-margin flex_r">
        <div class="item-l"></div>
        <el-button class=" f_w" style="background-color: #2fb301;width: 140px;height: 46px" type="success" @click="next()">下一步</el-button>
      </div>

    </div>

    <el-dialog title="司机需带回" width="400px" :visible.sync="dialogFormVisible">
      <el-form :model="extraService"  ref="extraServiceRules">
        <el-form-item label="" label-width=""  prop="money"
                      :rules="{required: true, validator: checkNumber, trigger: 'blur'}">
          <el-input size="small" v-model="extraService.money" placeholder="输入金额（元）"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="extraServiceReset('extraServiceRules')">取 消</el-button>
        <el-button size="small" type="primary" @click="extraServiceSave('extraServiceRules')">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import VueJsCookie from 'vue-js-cookie'
  import { mapActions,mapGetters } from 'vuex';
  import myButton from '../../components/myButton'
  import showMap from './showMap.vue'
  import showMapNext from './showMapNext'
  import addRoute from './addRoute'
  import showAddress from './showAddress'
  import routeLine from './routeLine.vue'
  import { getApi ,postApi} from "@/api/api.js";
  import {REGEX} from '@/utils/valiRegex.js'
    export default {
      name: "order",
      components: {
        showMap,showMapNext,addRoute,showAddress,myButton,routeLine
      },
      watch:{
        // form:{
        //   handler(newValue, oldValue) {
        //     console.log(newValue)
        //   },
        //   deep: true
        // }
      },
      data() {
        return {
          dialogFormVisible:false,
          extraService:{
            money:''
          },
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
          windowRoute:false,//选择线路弹窗
          search_route:'',
          specList:[],//车辆规格
          requestList:[],//额外需求
          searchRouteList:[],//路线列表
          mapNext:null,
          timeList:[],//时间列表

          form:{},//要提交的表单

          cityList:[],//城市列表

          tipList:'',//小费列表
          tipWindow:false,
          inputTip:'',//手动输入小费

          goodsList:[],//货物列表
          goodsWindow:false,
          inputGoods:'',

          wightList:[],//重量列表
          wightWindow:false,
          inputWight:'',

          volumeList:[],//体积列表
          volumeWindow:false,
          inputVolume:'',
        }
      },
      methods:{
        ...mapActions(['setForm']),
        ...mapGetters(['getForm']),
        getSelectLine(dataList){

          console.log(dataList)
          this.form.to = [];

          dataList.forEach((item,i)=>{
            this.form.to.push({
              consignee: "",
              consigneeMobile: "",
              isSms: 0,
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
              shipperSort: i,
              show:false,mapTo:null,zoom:14
            });
            // this.form.to[i].floorHousenum =item;
            // this.form.to[i].consignee =item;
            // this.form.to[i].consigneeMobile =item;

            this.form.to[i].origin =item.address;
            this.form.to[i].originCoordinate =`${item.latitude},${item.longtitude}`;
            this.form.to[i].originName =item.name;
            this.form.to[i].provinceCityArea =item.provinceCityArea;
          })
          this.windowRoute = false;
        },
        getAddRoute(data){
          getApi('/aflc-uc/aflcShipperLineApi/findAflcShipperLine').then((res)=>{
            this.searchRouteList = res.data;
          });
        },
          routeClick(){
            this.windowRoute = !this.windowRoute;
            //收发货人路线列表
            this.getAddRoute();
          },
        volumeClick(item){
          this.form.volumeId = item.id;
          this.form.volumeName = item.name;
          this.inputVolume = '';
          this.volumeWindow = false;
        },
        closeVolume(){
          if(this.inputVolume !== ''){
            if(!REGEX.Number_point.test(this.inputVolume)){
              this.$message.warning("必须是数字");
              return
            }
            this.form.volumeName = this.inputVolume;
          } else {
            this.form.volumeName = '';
          }
          this.form.volumeId = '';
          this.volumeWindow = false;
        },
        wightClick(item){
          this.form.wightId = item.id;
          this.form.wightName = item.name;
          this.inputWight = '';
          this.wightWindow = false;
        },
        closeWight(){
          if(this.inputWight !== ''){
            if(!REGEX.Number_point.test(this.inputWight)){
              this.$message.warning("必须是数字");
              return
            }
            this.form.wightName = this.inputWight;
          } else {
            this.form.wightName = '';
          }
          this.form.wightId = '';
          this.wightWindow = false;
        },
        goodsClick(item){
          this.form.goodsId = item.id;
          this.form.goodsName = item.name;
          this.inputGoods = '';
          this.goodsWindow = false;
        },
        closeGoods(){
          if(this.inputGoods !== ''){
            this.form.goodsName = this.inputGoods;
          } else {
            this.form.goodsName = '';
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
              this.form.tipName = 200;
              this.inputTip = 200;
            } else {
              this.form.tipName = this.inputTip;
            }
          } else {
            this.form.tipName = '';
          }
          this.form.tipId = '';
          this.tipWindow = false;
        },
        tipClick(item){
          this.form.tipId = item.id;
          this.form.tipName = item.name;
          this.inputTip = '';
          this.tipWindow = false;
        },
        getSelectAddress1(item,data){
          item.floorHousenum = data.floorHousenum;
          // item.cityCode = data.cityCode;
          item.consignee = data.contacts;
          item.consigneeMobile = data.contactsPhone;
          item.origin = data.address;
          item.originCoordinate = data.coordinate;
          item.originName = data.summary;
          item.provinceCityArea = data.provinceCityArea;
          //item.type = data.type;
          console.log(item)
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
              this.timeList = timeList;
              this.form.time = timeList[0].time
            }else {
              let ii = 86400000/t1;
              for(let i=0;i<ii;i++){
                timeList.push({time:startTime + t1 * i,timeShow:new Date(startTime + t1 * i).format("hh:mm")})
              }
              this.timeList = timeList;
              this.form.time = timeList[0].time
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

            // if(res[0].serviceName === "同城"){
              res.data[0].list.forEach((item)=>{
                item.list[0].show = false;
              });
              this.form.carList = res.data[0].list;
              getApi(`/aflc-sm/aflcExtraPriceApi/findExtraPrice/${res.data[0].serviceCode}`).then((res1)=>{
                res1.data.forEach((item)=>{
                  item.selected = false;
                  item.remark = ''
                });
                this.requestList = res1.data;
              })
            // }
          })
        },

        selectDistAddress(item,i){
          this.tipWindow = false;
          this.goodsWindow = false;
          this.wightWindow = false;
          this.volumeWindow = false;
          this.form.to.forEach((item)=>{
            item.show = false;
          });
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
            isSms: 0,
            origin: "",
            originCoordinate: "",
            originName: "",
            provinceCityArea: "",
            shipperSort: i,
            show:false,mapTo:'',zoom:14,})
        },

        next(){
          if(this.form.time === ''){
            this.$message.warning('时间必须选择');
            return
          }
          if(this.form.to[0].consigneeMobile === ''){
            this.$message.warning('发货人电话必填');
            return
          }else {
            if(!REGEX.MOBILE.test(this.form.to[0].consigneeMobile)){
              this.$message.warning("手机号码格式错误");
              return
            }
          }
          let check = this.form.to.some((item)=>{
            return item.origin === ''
          });
          if(check){
            this.$message.warning('收发货地址必填');
            return
          }
          this.form.to.forEach((item)=>{
            delete item.mapTo;
          });
          let extraServiceDtoList = [];
          let list =  this.requestList.filter((item)=>{
            return item.selected === true
          });
          list.forEach((item)=>{
            extraServiceDtoList.push({
              extraId:item.extraId,
              remark:item.remark
            })
          });
          this.form.extraServiceDtoList = extraServiceDtoList;
          this.$localStorage.set("formDown",this.form);
          this.setForm(this.form);
          this.$router.push('/order/showMapNext');

          // let truckOptions = {
          //   policy:0,
          //   size:1,
          // };
          // let path = [];
          // this.form.to.forEach((item)=>{
          //   path.push({lnglat:item.originCoordinate.split(',').reverse()});
          // });
          //
          // let driving = new AMap.TruckDriving(truckOptions);
          //
          // driving.search(path,function(status, result) {
          //   console.log(result)
          // });

        },
        selectCar(id){
          this.form.carId = id;
        },
        specClick(code){
          this.form.specCode = code;
        },
        requestClick(item){
            if(item.extraId === "1b51fb332dac42da9f19092d275caf29"){
              item.selected = !item.selected;
              this.requestList.forEach((item)=>{
                if(item.extraId ==="2b988d6a75314914ae5fdf724e10b1c9"){
                  item.selected = false
                }
              })
            }else if(item.extraId ==="2b988d6a75314914ae5fdf724e10b1c9"){
              item.selected = !item.selected
              this.requestList.forEach((item)=>{
                if(item.extraId ==="1b51fb332dac42da9f19092d275caf29"){
                  item.selected = false
                }
              })
            } else if(item.extraId === "ee9b54d836a74924b43824b62c79c734"){
              if(item.selected === false){
                item.selected = false;
                this.dialogFormVisible = true
              } else {
                item.selected = false;
                item.remark = ''
              }
            } else {
              item.selected = !item.selected
            }

        },
        showMap1(item,i){
          this.tipWindow = false;
          this.goodsWindow = false;
          this.wightWindow = false;
          this.volumeWindow = false;
          // this.form.to.forEach((item,i)=>{
          //   this.$refs[i][0].dialogVisible = false;
          //   item.show = false;
          // });
          this.$refs[i][0].ok();
        },
        createMap(){
          let citysearch = new AMap.CitySearch();
          citysearch.getLocalCity((status, result) =>{
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.city && result.bounds) {
                console.log(result);
                let adcode =  result.adcode * 1;
                let city = result.city;
                //城市列表
                getApi('/aflc-common/aflcCommonAddressApi/cityList').then((res)=>{
                  res.data.forEach((item)=>{
                    item.code = item.pinyin;
                    item.name = item.pinyin;
                  });
                  res.data.unshift({code: "当前定位城市", name: "当前定位城市", pinyin: "当前定位城市",cities:[{
                      code: adcode,
                      name: city,
                      parentCode: 1,
                      pinyin: "当前定位城市",
                    }]});
                  this.form.code = ["当前定位城市",adcode];
                  this.cityList = res.data;
                  this.getPriceList(adcode)
                });
              }
            }
          });
        },

        checkNumber(rule, value, callback){
          let re = /^0{1}([.]([1-9][0-9]?)|[.][0-9][1-9])$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
          if (value === '') {
            callback(new Error('请输入价格'));
          }else {
            if(re.test(value)){
              callback()
            }else {
              callback(new Error('价格格式错误'));
            }
          }
        },
        extraServiceReset(formName){
          this.$refs[formName].resetFields();
          this.dialogFormVisible = false
        },
        extraServiceSave(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.requestList.forEach((item)=>{
                if(item.extraId ==="ee9b54d836a74924b43824b62c79c734"){
                  item.selected = true;
                  item.remark = this.extraService.money;
                }
              })
              this.dialogFormVisible = false
            } else {
              console.log('error submit!!');
              return false;
            }
          });


        }
      },
      created(){
        this.form = this.getForm();
      },
      mounted(){
        let  timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) * 1;

        this.changeDate(timeStamp);

        this.createMap();

        //选择车型
        // getApi('/aflcsmservice/sm/aflcSysDict/v1/getCarTypeList').then((res)=>{
        //   console.log(res)
        // })

        //车辆规格
        getApi('/aflcsmservice/sm/aflcSysDict/v1/getCarSpecList').then((res)=>{
          this.specList = res.data
        });

        //货物名称
        getApi('/aflccommonservice/sysDict/getSysDictByCodeGet/AF034').then((res)=>{
          this.goodsList = res.data
        });

        //重量
        getApi('/aflc-common/sysDict/getSysDictByCodeGet/AF00403').then((res)=>{
          this.wightList = res.data
        });
        //体积
        getApi('/aflc-common/sysDict/getSysDictByCodeGet/AF00404').then((res)=>{
          this.volumeList = res.data
        });

        //小费
        getApi('/aflc-common/sysDict/getSysDictByCodeGet/AF00405').then((res)=>{
          this.tipList = res.data
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

      .address{
        font-size: 12px;
        color: #46a6ff;
        padding-right: 10px;
      }
      img{
        margin: 0 10px 0 3px;
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
        height: 32px;
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

</style>
