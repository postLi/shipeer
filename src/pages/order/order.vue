<template>
  <div class="height_100 flex_r">

    <div v-show="!nextSuccess" class="margin_10 flex_1 b_c_w o_f" >
  <div class="tip">
    <span class="title">小提示</span>
    <span class="title1">（<span>*</span>号为必填项）</span>
  </div>

  <div class="item-margin item-1 flex_r">
    <div class="item-l"><span class="f_r">*</span>选择城市：</div>
    <el-select v-model="form.city" placeholder="请选择城市" size="small" style="width: 250px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <div class="item-1-2">
      <span>选择用车时间：</span>
      <el-date-picker
        prefix-icon="el-icon-date"
        style="width: 250px"
        size="small"
        v-model="form.date"
        type="date"
        :picker-options="pickerOptions1"
        placeholder="选择日期">
      </el-date-picker>
    </div>

    <div  class="item-1-3">
      <el-select v-model="form.city" placeholder="选择时间" size="small" style="width: 121px">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

  </div>

  <div class="item-margin item-2 flex_r">
    <div class="item-l"><span class="f_r">*</span>选择车型：</div>
    <div class="flex_ae">
      <img v-for="(item,index) in carList" :key="item.id" class="pointer" :src="item.name" alt="" @click="selectCar(item.id)" :style="{'filter':(form.carId === item.id)?'opacity(100%)': 'opacity(50%)'}">
    </div>

  </div>


  <div class="item-margin item-3 flex_r">
    <div class="item-l">特殊规格(选填)：</div>
    <el-button size="small" @click="buttonClick(item.id)" v-for="(item,index) in buttonList" :key="item.id" :style="{'background-color':(item.id === form.buttonId)?'#1890ff':'#f2f2f2','color':(item.id === form.buttonId)?'white':'black'}">{{item.name}}</el-button>
  </div>

  <div class="item-margin item-4 flex_r">
    <div class="item-l"><span class="f_r">*</span>提货地：</div>
    <div>
      <div class="flex">
        <div class="item-4-1 flex_sb">
          <div class="flex_1 input" @click="showMap()">{{(form.from.address === '')?'必填':form.from.address}}</div>
          <div class="address">常用地址</div>
          <show-map :data="form.from" ref="childClick"></show-map>
        </div>
        <div class="p_r">
          <el-button size="small" @click="addressRoute = !addressRoute" style="background-color: #2fb301;color: white">选择常用地址</el-button>
          <div class="address-line flex_f" v-show="addressRoute">
              <div class="title flex_sb margin_b_10">
                <span>选用常用地址</span>
                <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="addressRoute = false">
              </div>
            <div class="search flex_sb">
              <div class="search-body flex_a">
                <div class="flex_1 height_100 search-left flex_a">
                  <input type="text" v-model="search_route" class="my-input margin_l_10" placeholder="请输入关键字搜索">
                </div>

                <div class="search-right height_100 flex pointer">
                  搜索
                </div>

              </div>
              <el-button size="small" @click="" type="primary">新增常用地址</el-button>
            </div>
            <div class="flex_1 o_f">
              <div class="address-item flex_a" v-for="(item,index) in searchAddressList" :key="item.id">
                <div class="height_100 address-item-left flex_1 flex_f_c">
                  <div>{{item.name1}}</div>
                  <div>{{item.name2}}</div>
                  <div>{{item.name3}}</div>
                </div>
                <div class="height_100 flex_a address-item-right margin_r_10">
                  <div class="edit">编辑</div>
                  <div class="del">删除</div>
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

  <div class="item-margin item-4 flex_r">
    <div class="item-l"><span class="f_r">*</span>目的地：</div>
    <div>
      <div class="flex">
        <div class="item-4-1 flex_sb">
          <div class="flex_1 input" @click="showMap1()">{{(form.to.address === '')?'必填':form.to.address}}</div>
          <div class="address">常用地址</div>
          <show-map :data="form.to" ref="childClick1"></show-map>
        </div>
        <div class="p_r">
        <el-button size="small" @click="windowRoute = !windowRoute" type="success" icon="el-icon-circle-plus" style="background-color: white;color: #2fb301">新增目的地</el-button>
          <div class="route-line flex_f" v-show="windowRoute">
            <div class="title flex_sb margin_b_10">
              <span>选用常用路线</span>
              <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="windowRoute = false">
            </div>
            <div class="search flex_sb">
              <div class="search-body flex_a">
                <div class="flex_1 height_100 search-left flex_a">
                  <input type="text" v-model="search_route" class="my-input margin_l_10" placeholder="请输入关键字搜索">
                </div>

                <div class="search-right height_100 flex pointer">
                  搜索
                </div>

              </div>
              <el-button size="small" @click="" type="primary">新增常用路线</el-button>
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
          <input class="my-input margin_l_10" placeholder="楼层及门牌号（选填）" v-model="form.to.floor"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/fahuor.png" alt="">
          <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="form.to.name"/>
        </div>

        <div class="item-base margin_t_10 flex_a margin_r_50">
          <img src="../../assets/main/nav_phone.png" alt="">
          <input class="my-input margin_l_10" placeholder="收货联系人电话（必填）" v-model="form.to.tel"/>
        </div>
      </div>
    </div>
  </div>

  <div class="item-margin item-5 flex_r">
    <div class="item-l">货物名称：</div>
    <div  class="item-5-1">
      <el-select v-model="form.city" placeholder="" size="small" style="width: 140px">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
    <el-button size="small" @click="requestClick(item.id)" v-for="(item,index) in requestList" :key="item.id" :style="{'background-color':(item.id === form.requestId)?'#1890ff':'#f2f2f2','color':(item.id === form.requestId)?'white':'black'}">{{item.name}}</el-button>
  </div>

  <div class="item-margin item-7 flex_r">
    <div class="item-l">订单备注：</div>
    <div class="item-7-1">
      <div class="flex_a number">
        <div class="a">11</div>
        <div class="aa">/60</div>
      </div>
      <el-input
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

    <show-map-next class="margin_10 flex_1 b_c_w o_f" v-show="nextSuccess" ref="childClickNext"></show-map-next>


  </div>

</template>

<script>
  import myDialog from '../../components/myDialog'
  import showMap from './showMap.vue'
  import showMapNext from './showMapNext'
    export default {
        name: "order",
      data() {
        return {
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime()  + 3600 * 1000 * 24 < Date.now();
            }
            },
          nextSuccess:false,
          windowRoute:false,
          addressRoute:false,
          search_route:'',
          buttonList:[{id:1,name:"加长"},{id:2,name:"拆座"},{id:3,name:"高栏"}],
          requestList:[{id:1,name:"需要装卸（与司机议价）"},{id:2,name:"需要回单（免费）"},{id:3,name:"需要回款（免费）"},{id:4,name:"电子回单（免费）"}],
          carList:[
            {id:1,name: require("../../assets/main/xm@3x.png")},
            {id:2,name: require("../../assets/main/xh@3x.png")},
            {id:3,name: require("../../assets/main/zh@3x.png")},
            {id:4,name: require("../../assets/main/dh@3x.png")}],
          searchAddressList:[{id:1,name1:'11',name2:'22',name3:'33',},
            {id:2,name1:'11',name2:'22',name3:'33',},
            {id:3,name1:'11',name2:'22',name3:'33',},
            {id:4,name1:'11',name2:'22',name3:'33',}],
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
          map:null,
          map1:null,
          mapNext:null,
          form:{
            city:'',
            date:'',
            carId:1,
            buttonId:1,
            requestId:1,
            tip:'',
            from:{address:'',tel:'',name:'',floor:'',centerPoint:null,checked:false},
            to:{address:'',tel:'',name:'',floor:'',centerPoint:null,checked:false},
            remarks:''
          },
          zoom:14,
          zoom1:14,
          loadOne:true,
          loadOne1:true,
        }
      },
      methods:{
        next(){
          this.nextSuccess = true
          setTimeout( ()=> {
            this.mapNext =new BMap.Map(this.$refs.childClickNext.$refs.allMapNext, {enableMapClick:false});
            this.mapNext.centerAndZoom(this.form.to.centerPoint, this.zoom);
            this.mapNext.enableScrollWheelZoom(true);
          },200)
        },
        selectCar(id){
          this.form.carId = id;
        },
        buttonClick(id){
          this.form.buttonId = id;
        },
        requestClick(id){
          this.form.requestId = id;
        },
          showMap(){
            let geoc = new BMap.Geocoder();
            setTimeout( ()=> {
              if(this.loadOne === true){
                this.loadOne = false;
                this.map =new BMap.Map(this.$refs.childClick.$refs.allmap, {enableMapClick:false});
                let point =  this.form.from.centerPoint;
                this.map.centerAndZoom(point, this.zoom);
                this.map.enableScrollWheelZoom(true);

                geoc.getLocation(point, (re) => {
                  console.log(re)
                  this.form.from.address = re.address;
                });
                this.map.addEventListener('zoomend',(e) =>{
                  let center1 = this.map.getCenter();
                  let centerPoint = new BMap.Point(center1.lng, center1.lat);
                  console.log( centerPoint);
                  this.zoom = this.map.getZoom();
                  geoc.getLocation(centerPoint,(re) => {
                    console.log(re);
                    this.form.from.centerPoint = centerPoint;
                    this.form.from.address = re.address;
                  });
                });
              }
              this.map.addEventListener('moveend',(e) =>{
                let center1 = this.map.getCenter();
                let centerPoint = new BMap.Point(center1.lng, center1.lat);
                console.log( centerPoint);
                geoc.getLocation(centerPoint,(re) => {
                  console.log(re);
                  this.form.from.centerPoint = centerPoint;
                  this.form.from.address = re.address;
                });
              });

              this.$refs.childClick.getMapStatus();

            },100);

            this.$refs.childClick.ok();
          },
        showMap1(){
          let geoc = new BMap.Geocoder();

          setTimeout( ()=> {
            if(this.loadOne1 === true){
              this.loadOne1 = false;
              this.map1 =new BMap.Map(this.$refs.childClick1.$refs.allmap, {enableMapClick:false});
              let point =  this.form.to.centerPoint;
              this.map1.centerAndZoom(point, this.zoom1);
              this.map1.enableScrollWheelZoom(true);

              geoc.getLocation(point, (re) => {
                console.log(re)
                this.form.to.address = re.address;
              });
              this.map1.addEventListener('zoomend',(e) =>{
                let center1 = this.map1.getCenter();
                let centerPoint = new BMap.Point(center1.lng, center1.lat);
                console.log( centerPoint);
                this.zoom1 = this.map1.getZoom();
                geoc.getLocation(centerPoint,(re) => {
                  console.log(re);
                  this.form.to.centerPoint = centerPoint;
                  this.form.to.address = re.address;
                });
              });
            }

            this.map1.addEventListener('moveend',(e) =>{
              let center1 = this.map1.getCenter();
              let centerPoint = new BMap.Point(center1.lng, center1.lat);
              console.log( centerPoint);
              geoc.getLocation(centerPoint,(re) => {
                console.log(re);
                this.form.to.centerPoint = centerPoint;
                this.form.to.address = re.address;
              });
            });

            this.$refs.childClick.getMapStatus();

          },100);
          this.$refs.childClick1.ok();
        },
        createMap(){
          let centerPoint = new BMap.Point(113.275722,23.144614);
          this.form.from.centerPoint = centerPoint;
          this.form.to.centerPoint = centerPoint;

        },
      },

      components: {
        myDialog,showMap,showMapNext
      },
      mounted(){
        this.createMap();
        // this.$http.post(`index.php?controller=Statistics&action=terminal&token`, {}).then(res => {
        // console.log(res)
        // })
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
    width: 940px;
    img{
      margin-right: 73px;
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
  .address-line{
    position: absolute;
    bottom: -56px;
    width: 486px;
    height: 262px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px #DEDEDE;
    padding: 8px;
    box-sizing: border-box;
    .title{
      span{
        font-size: 14px;
        color: #333333;
      }
    }
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
    .address-item{
      height: 61px;
      border-bottom: 1px dotted #f2f2f2;

      .address-item-left{
        font-size: 12px;
        :nth-of-type(1){
          color: #333333;
        }
        :nth-of-type(2),:nth-of-type(3){
          color: #999999;
        }
      }
      .address-item-right{
        .edit{
          font-size: 12px;

          color: #1890ff;
          margin-right: 36px;
        }
        .del{
          font-size: 12px;

          color: #ff300d;
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
    .title{
      span{
        font-size: 14px;
        color: #333333;
      }
    }
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
</style>
