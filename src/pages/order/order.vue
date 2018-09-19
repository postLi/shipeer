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
    clearable
    @change="handleChange">
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
    <el-button size="small" @click="specClick(item.id)" v-for="(item,index) in specList" :key="item.id" :style="{'background-color':(item.id === form.specId)?'#1890ff':'#f2f2f2','color':(item.id === form.specId)?'white':'black'}">{{item.name}}</el-button>
  </div>

  <!--提货地-->
  <div class="item-margin item-4 flex_r">
    <div class="item-l"><span class="f_r">*</span>提货地：</div>
    <div>
      <div class="flex">
        <div class="item-4-1 flex_sb p_r">
          <div class="flex_1 input" @click="showMap()">{{(form.from.address === '')?'必填':form.from.address}}</div>
          <div class="address" @click="selectSourceAddress()">常用地址</div>
          <show-map :data="form.from" ref="childClick"></show-map>
          <show-address :showAddress="form.from" ref="addressData" :type="1"></show-address>
        </div>
        <div class="p_r">
          <el-button size="small" style="background-color: #2fb301;color: white" @click="windowRoute = !windowRoute">选择常用线路</el-button>
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
                <add-route ref="show"></add-route>
              </div>

            </div>
          <div class="flex_1 o_f">

            <div class="route-item flex_f" v-for="(item,index) in searchRouteList" :key="item.id">
              <div class=" route-item-body flex_1 flex_a" v-for="(item1,index1) in item.name0" :key="item1.a">
              <div  class="flex height_100 route-item-body-left"></div>
                <div>
                  <div>{{item1.a}}</div>
                  <div>{{item1.b}}</div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>

      </div>
      <div class="flex_r">
        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/menpaih.png" alt="">
          <input class="my-input margin_l_10" placeholder="楼层及门牌号（选填）" v-model="form.from.floor"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/fahuor.png" alt="">
          <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="form.from.name"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/nav_phone.png" alt="">
          <input class="my-input margin_l_10" placeholder="收货联系人电话（必填）" v-model="form.from.tel"/>
        </div>
      </div>
    </div>
  </div>

  <!--目的地 -->
  <div class="item-margin item-4 flex_r" v-for="(item,index) in form.to">
    <div class="item-l"><span class="f_r">*</span>目的地：</div>
    <div>
      <div class="flex">
        <div class="item-4-1 flex_sb p_r">
          <div class="flex_1 input" @click="showMap1(item,index)">{{(item.address === '')?'必填':item.address}}</div>
          <div class="address" @click="selectDistAddress(item,index)">常用地址</div>
          <show-map :data="item" :ref="index"></show-map>
          <show-address :showAddress="item" :ref="index" :type="0"></show-address>
        </div>
        <el-button size="small" v-if="index === 0" type="success" icon="el-icon-circle-plus" style="background-color: white;color: #2fb301" @click="addNewDestination()">新增目的地</el-button>
        <el-button size="small" v-if="index !== 0" type="danger" icon="el-icon-remove" style="background-color: white;color: #ff300d" @click="delNewDestination(index)">删除目的地</el-button>
      </div>
      <div class="flex_r">
        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/menpaih.png" alt="">
          <input class="my-input margin_l_10" placeholder="楼层及门牌号（选填）" v-model="item.floor"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/fahuor.png" alt="">
          <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="item.name"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/nav_phone.png" alt="">
          <input class="my-input margin_l_10" placeholder="收货联系人电话（选填）" v-model="item.tel"/>
        </div>
      </div>
    </div>
  </div>

  <div class="item-margin item-5 flex_r">
    <div class="item-l">货物名称：</div>
    <div  class="item-5-1">
      <el-autocomplete style="width: 140px" size="small" v-model="form.goods" :fetch-suggestions="goodsSearch"
        placeholder="请输入货物" @select="handleSelect">
        <template slot-scope="{ item }">
          <div >{{ item.name }}</div>
        </template>
      </el-autocomplete>

    </div>
    <div  class="item-5-1">
      <el-select v-model="form.city" placeholder="" size="small" style="width: 140px">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      吨
    </div>
    <div  class="item-5-1">
      <el-select v-model="form.city" placeholder="" size="small" style="width: 140px">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      方
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
        <el-select v-model="form.city" placeholder="请选择" size="small" style="width: 121px">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
          nextSuccess:false,//下一步
          windowRoute:false,//选择线路弹窗
          search_route:'',
          specList:[],//车辆规格
          requestList:[],//额外需求
          goodsList:[],//货物列表
          carList:[
            // {id:1,name: require("../../assets/main/xm@3x.png")},
            // {id:2,name: require("../../assets/main/xh@3x.png")},
            // {id:3,name: require("../../assets/main/zh@3x.png")},
            // {id:4,name: require("../../assets/main/dh@3x.png")}
            ],//车辆列表
          searchRouteList:[
            {id:1,name0:[{a:'11',b:'22'},{a:'22',b:'22'},{a:'33',b:'22'}]},
            {id:2,name0:[{a:'11',b:'22'},{a:'22',b:'22'},{a:'33',b:'22'}]},
            ],
          options: [{
            value: '1',
            label: '广州'
          }, {
            value: '2',
            label: '地方'
          }],
          options1: [{
            value: '1',
            label: '立即用车'
          }, {
            value: '2',
            label: '12:00'
          }],
          mapNext:null,
          timeList:[],//时间列表
          form:{//主页表单
            code:[],//城市code
            date:'',//选择日期
            time:'',//选择的时间
            city:'',
            carId:"AF01801",
            specId:'',//车辆规格id
            requestId:'',//额外需求id
            goods:'',//货物
            tip:'',
            from:{address:'',tel:'',name:'',floor:'',centerPoint:null,checked:false,map:null,loadOne:true,zoom:14,show:false,},
            to:[{address:'',tel:'',name:'',floor:'',centerPoint:null,checked:false,show:false,map1:null,loadOne1:true,zoom1:14,}],
            remarks:''
          },
          getDuration:'',//起终时间
          distAddress:0,//主页选择目的地index
          cityList:[],//城市列表
        }
      },
      methods:{
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
          this.form.goods = item.name;
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
            console.log(startTime)
            console.log(EndTime)
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
              console.log(timeList)
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
        handleChange(data){
        console.log(data)
        },
        selectSourceAddress(){
          this.form.from.show = !this.form.from.show;
          if(this.form.from.show === true){
            this.$refs.addressData.getList();
          }
        },

        selectDistAddress(item,i){
          item.show = !item.show;
          if(item.show === true){
            this.$refs[i][1].getList();
          }
        },
        delNewDestination(i){
          this.form.to.splice(i,1)
        },
        addNewDestination(){
          if(this.form.to.length >=10){
            this.$message.warning('最多只能添加十条目的地');
            return
          }
          this.form.to.push({address:'',tel:'',name:'',floor:'',centerPoint:null,checked:false,show:false,map1:'',loadOne1:true,zoom1:14,})
        },

        next(){
          console.log(this.form)

          // this.nextSuccess = true;
          // setTimeout( ()=> {
          //
          //   this.mapNext =new BMap.Map(this.$refs.childClickNext.$refs.allMapNext, {enableMapClick:false});
          //   // this.mapNext.centerAndZoom(this.form.to.centerPoint, 14);
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
          //   driving.search(this.form.from.centerPoint, this.form.to.centerPoint);
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
        specClick(id){
          this.form.specId = id;
        },
        requestClick(id){
          this.form.requestId = id;
        },
          showMap(){
            let centerPoint = [113.275722,23.144614];
            this.$refs.childClick.ok();
              if(this.form.from.loadOne === true){
                this.form.from.loadOne = false;
                AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) =>{
                  this.form.from.map = new AMap.Map(this.$refs.childClick.$refs.allmap, {
                    zoom: 14,
                    scrollWheel: true,
                    center: centerPoint
                  });
                  var positionPicker = new PositionPicker({
                    mode: 'dragMap',
                    map: this.form.from.map,
                    iconStyle: {
                      url: './static/ti.png',
                      ancher: [16, 56],
                      size: [32,56]
                    }
                  });
                  positionPicker.on('success', (positionResult)=> {

                    console.log(positionResult.regeocode.pois[0].name)
                    console.log(positionResult)
                    this.form.from.address = positionResult.address;
                  });
                  positionPicker.on('fail', (positionResult)=> {
                  });
                  positionPicker.start();
                  this.form.from.map.panBy(0, 1);
                });
              }
            //  this.$refs.childClick.getMapStatus();
          },
        showMap1(item,i){
          let centerPoint = [113.275722,23.144614];
          this.$refs[i][0].ok();
            if(item.loadOne1 === true){
              item.loadOne1 = false;
              AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) =>{
                item.map1 = new AMap.Map(this.$refs[i][0].$refs.allmap, {
                  zoom: 14,
                  scrollWheel: true,
                  center: centerPoint
                });
                var positionPicker = new PositionPicker({
                  mode: 'dragMap',
                  map: item.map1,
                  iconStyle: {
                    url: './static/ti.png',
                    ancher: [16, 56],
                    size: [32,56]
                  }
                });
                positionPicker.on('success', (positionResult)=> {
                  console.log(positionResult.regeocode.pois[0].name)
                  item.address = positionResult.address;
                });
                positionPicker.on('fail', (positionResult)=> {
                });
                positionPicker.start();
                item.map1.panBy(0, 1);
              });
            }

            // this.$refs[i][0].getMapStatus();

        },
        createMap(){
          // let centerPoint = new BMap.Point(113.275722,23.144614);
          // this.form.from.centerPoint = centerPoint;

          var citysearch = new AMap.CitySearch();
          citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.city && result.bounds) {
                console.log(result);
                // this.form.code[1] = result.adcode;
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
        //城市列表
        getApi('/aflc-common/aflcCommonAddressApi/cityList').then((res)=>{
          res.forEach((item)=>{
            item.code = item.pinyin;
            item.name = item.pinyin;
          });
          this.cityList = res;
        });


        //选择车型
        getApi('/aflcsmservice/sm/aflcSysDict/v1/getCarTypeList').then((res)=>{
          console.log(res)
        })

        //车辆规格
        getApi('/aflcsmservice/sm/aflcSysDict/v1/getCarSpecList').then((res)=>{
          this.specList = res
        });

        //价格服务 //额外需求
        getApi('/aflc-sm/aflcPriceApi/getPriceByArea/440110').then((res)=>{
          if(res[0].serviceName === "同城"){
            res[0].list.forEach((item)=>{
              item.list[0].show = false;
            });
            this.carList = res[0].list;
            getApi(`/aflc-sm/aflcExtraPriceApi/findExtraPrice/${res[0].serviceCode}`).then((res)=>{
              this.requestList = res;
            })

          }
        })

        //货物名称
        getApi('/aflccommonservice/sysDict/getSysDictByCodeGet/AF034').then((res)=>{
          this.goodsList = res
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

</style>
