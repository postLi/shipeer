<template>
  <div class="map-lll">
    <div id="mapcontainer"></div>

    <!--<div id="panel"></div>-->
    <div id="myPageTop" v-if="$route.query.tab === '派单中'">
      <div class="headerClass">
        <span>{{isRouteData.tab}}</span>
        <span @click="gotoOrder"><i class="el-icon-close"></i>取消订单</span>
      </div>
      <div class="contentClass">
        <div class="topClass">
          <p class="changeDriver">{{$route.query.qy.isEnshrine===true?'已为您推送收藏':'系统选择'}}司机</p>
          <!--<p class="changeDriver">系统选择司机</p>-->
          <p class="changeTitle" v-if="isHiddenCar">正在为您<span>优先叫车</span></p>
          <p class="changeTime" v-if="!isHiddenCar">00:{{wait}}</p>
          <p class="changeCar" v-if="!isHiddenCar">倒计时结束后无应答将优先为您叫车</p>

          <!--司机距您<span class="callClass">1.5</span>公里，稍后将电话联系您…-->
        </div>
        <div class="centClass">
          <!--<div id="panel"></div>-->
          <ul>
            <template v-for="(item,index) in getDetail.addresses">
              <li><p>{{item.viaAddressName}}</p><span>{{item.viaAddress}}</span></li>

            </template>
          </ul>
        </div>
        <div class="footClass">
          <ul>
            <li><span class="dateClass">用车时间:</span><span class="timeClass">{{getDetail.useCarTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </li>
            <!--<li><span class="dateClass">订单号:</span ><span class="timeClass">10000000000</span></li>-->
            <li><span>付款方式:</span><span>{{getDetail.payStatus || 0}}&nbsp;&nbsp; ({{getDetail.payWay}}付款)</span></li>
            <li>
              <span>实际支付:</span><span>({{getDetail.orderStatus===0?'未支付':'已支付'}}) &nbsp;￥{{getDetail.factPay || 0}}</span>
            </li>
            <li><span>运输费用:</span><span>¥{{getDetail.orderPrice || 0}} <el-button type="info" size="mini"
                                                                                  class="btnClass" @click="add">加小费{{addTitle}}</el-button></span>
            </li>
            <li><span>需要车型:</span><span>{{getDetail.carTypeName}}</span></li>
            <li><span>货物名称:</span><span>{{getDetail.goodsName}}</span></li>
            <li><span>货物重量:</span><span><{{getDetail.goodsWeight|| 0}}吨,{{getDetail.goodsVolume|| 0}}方	</span></li>
            <li><span>额外服务:</span><span>{{getDetail.extraName}}</span></li>
            <li><span>备注:</span><span>{{getDetail.sendWord}}</span></li>
          </ul>
        </div>
      </div>

      <div class="diaClass">
        <el-dialog
          title="提示:优惠券不能抵扣小费费用"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <div class="radioList">
            <el-radio-group v-model="radio3" @change="changeRadio">
              <template v-for="(item,index) in radioList">
                <el-radio-button :label="item.name">￥{{item.name}}元</el-radio-button>
              </template>
              <!--<el-radio-button label="radioList[1].name">￥{{radioList[1].name}}元</el-radio-button>-->
              <!--<el-radio-button label="radioList[2].name">￥{{radioList[2].name}}元</el-radio-button>-->
              <!--<el-radio-button label="北京"></el-radio-button>-->
              <!--<el-radio-button label="广州"></el-radio-button>-->
            </el-radio-group>
          </div>
          <div class="textarea">
            <el-input @focus="radio3=''" type="type" placeholder="其他金额,在此输入,(最高200元)～" v-model="changeInput"
                      :maxlength="5"></el-input>
          </div>
          <!--<span>需要注意的是内容是默认不居中的</span>-->
          <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="success" @click="submitRadio">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </div>

    <div class="myPageFoot" v-if="$route.query.tab!=='派单中'">
      <ul>
        <li>
          <img src="../../assets/role.png" alt="">
          <p>忘二狗<span>（四川人）</span></p>
          <div>
            <el-rate
              v-model="value5"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
          <span>12344</span>
        </li>
      </ul>
      <ul>
        <li>
          <img src="../../assets/role.png" alt="">
          <p>忘二狗<span>（四川人）</span></p>
          <p>广东</p>
          <p>承载16方，2.5吨</p>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import {loadJs, parseTime} from '@/utils/'
  import {
    getAuroraSignature,
    postMyOrderDetail,
    getSysDictByCodeGet,
    postAddTip,
    getFCode
  } from '@/api/concentrateAxios/orderManage'
  import {getUserInfo, setOrderDtaial, getOrderDtaial} from '@/utils/auth'

  export default {

    props: {
      pos: {
        type: [String, Array],
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      popVisible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      popVisible(newVal) {

      },
      name() {
        this.thename = this.name
      },
      pos() {
        this.thepos = this.pos
      },
      changeInput(n) {

      },
      radio3(n) {
        if (n) {
          this.changeInput = ''
        }
      }
    },
    data() {
      return {
        addTitle: '',
        changeInput: '',
        radio3: '10',
        getDetail: {addresses:[{}]},
        radioList: [
          // {name:10},
          // {name:20},
          // {name:30}
        ],
        jimInfo: {
          appkey: "02c4b4f0341b60405b3c99e7",
          key: "ce2f5588bd87f228b514e847",
          random_str: new Date().getTime(),
          timestamp: new Date().getTime(),
          signature: ''
        },
        addList: [],
        centerDialogVisible: false,
        popVisibleTitle: '',
        value5: 3.7,
        noinfo: true,
        dialogTableVisible: false,
        thepos: '',
        thename: '',
        theobj: {},
        isRouteData: {},
        isRadio: '',
        timer: null,
        wait:0,
        getFCodes:'',
        isHiddenCar:false
      }
    },
    mounted() {
      this.isRouteData = this.$route.query
      // console.log(this.$route.query)
      // if(this.$route.query.tab === '派单中'){
      //   this.popVisibleTitle = this.$route.query.tab
      // }

// this.dialogTableVisible = this.popVisible
      this.init()
      this.fetchOrderDetail()
      this.dowTime()


    },
    created() {

    },
// 关闭时清空地图数据
    destoryed() {
      this.exit()
    },

    methods: {

      fetchCode(){
        if(this.isRouteData.qy.isEnshrine ===true){
          this.getFCodes = 'AF0051601'
        }else{
          this.getFCodes = 'AF0051602'
        }
        return getFCode(this.getFCodes).then(res=>{
          if(res.status ===200){
            this.wait = res.data.value
          }else{
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
          }
        })
      },
      dowTime() {
        this.fetchCode()
        // let wait = 20
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.wait > 1) {
              this.wait--
              this.isHiddenCar = false
            }
            else {
              clearInterval(this.timer);
              this.timer = null
              this.isHiddenCar = true
            }
          }, 1000)
        }
      },
      fetchOrderDetail() {
        return postMyOrderDetail(this.isRouteData.qy.orderSerial).then(res => {
          if (res.status === 200) {
            this.getDetail = res.data
            // payWay 交易方式(0:支付宝，1:微信,2：余额支付,3,收货时付款，4发货时付款,5: 现金支付
            if (this.getDetail.payWay === 0) {
              this.getDetail.payWay = '支付宝'
            } else if (this.getDetail.payWay === 1) {
              this.getDetail.payWay = '微信'
            } else if (this.getDetail.payWay === 2) {
              this.getDetail.payWay = '余额支付'
            } else if (this.getDetail.payWay === 3) {
              this.getDetail.payWay = '收货时付款'
            } else if (this.getDetail.payWay === 4) {
              this.getDetail.payWay = '发货时付款'
            } else if (this.getDetail.payWay === 5) {
              this.getDetail.payWay = '现金'
            } else {
              this.getDetail.payWay = ''
            }
            this.setCircle()
          } else {
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
          }
        })
      },

      fetchCodeGet() {
        return getSysDictByCodeGet('AF00405').then(res => {
          if (res.status === 200) {
            this.radioList = res.data
            // this.radio3 = this.radioList[0].name
          }
          else {
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
          }
        })
      },
      add() {
        this.centerDialogVisible = true
        this.fetchCodeGet()

      },
      changeRadio(item) {
        this.isRadio = item
      },
      submitRadio() {
        // let params = postAddTip
        let data = {
          "orderSerial": this.isRouteData.qy.orderSerial,
          "shipperId": "",
          "tip": 0
        }
        if (this.radio3 === '' && this.changeInput === '') {
          this.$message.info('请选择值~')
          return false
        } else if (this.radio3 !== '' && this.changeInput === '') {
          data.tip = this.isRadio === '' ? this.radioList[0].name : this.isRadio
        } else {
          data.tip = this.changeInput
        }
        data.tip = Number(data.tip)

        let promiseObj
        promiseObj = postAddTip(data)
        promiseObj.then(res => {
          if (res.status === 200) {
            this.addTitle = res.data
            this.$message.success('添加成功')
            let newNum
            newNum = data.tip
            this.addTitle = newNum + '元'
          }
          else {
            this.$message.warning(res.errorInfo || res.text || '无法获取服务端数据~')
          }
        })
        this.centerDialogVisible = false
      },
      gotoOrder() {
        this.$router.push({path: '/order'})
      },
      exit() {
        if (this.map && this.map.destroy && typeof this.map.destroy === 'function') {
          this.map.destroy()
          this.map = {}
        }
        this.thepos = ''
        this.thename = ''
        this.theobj = {}
        this.noinfo = true
      },
      init() {
        // 从后端请求数据后再加载地图
        this.loadMap()
        this.loadMsg()
      },
      initMsg() {
        let JIM = new JMessage({
          debug: true
        })


        JIM.onDisconnect(function () {
          console.log("【disconnect】");
        }); //异常断线监听
        //接口
        // this.getSignature().then(res => {
        //   // console.log(res,'请求的数据');
        //   JIM.init({
        //     "appkey": this.jimInfo.appkey,
        //     "random_str": this.jimInfo.random_str,
        //     "signature": this.jimInfo.signature,
        //     "timestamp": this.jimInfo.timestamp,
        //     "flag": 1
        //   }).onSuccess(function (data) {
        //     // console.log('success:' + JSON.stringify(data));
        //     console.log(data, '成功了');
        //     JIM.onMsgReceive(function (data) {
        //       data = JSON.stringify(data);
        //       console.log('1msg_receive:' + data, '成功了1');
        //
        //     });
        //   }).onFail(function (data) {
        //     console.log('error2:' + JSON.stringify(data))
        //   });
        // })


        // console.log(this.jimInfo,'几率')
        const md5 = require("js-md5");
        const signature =md5("appkey=" + this.jimInfo.appkey + "&timestamp=" + this.jimInfo.timestamp + "&random_str=" + this.jimInfo.random_str + "&key=" + this.jimInfo.key)
        JIM.init({
          "appkey":this.jimInfo.appkey,
          "random_str": this.jimInfo.random_str,
          "signature":  signature,
          "timestamp":  this.jimInfo.timestamp,
          "flag": 1
        }).onSuccess(function(data) {
          // console.log('success:' + JSON.stringify(data));
          console.log(data,'成功了');
          JIM.onMsgReceive(function(data) {
            data = JSON.stringify(data);
            console.log('1msg_receive:' + data,'成功了1');

          });
        }).onFail(function(data) {
          console.log('error2:' + JSON.stringify(data))
        });
      },
      loadMsg() {
        if (window.JMessage) {
          this.initMsg()
        } else {
          loadJs('/static/js/jmessage-sdk-web.2.6.0.min.js').then(res => {
            this.initMsg()
          })
        }
      },
      loadMap() {
        if (window.AMap) {
          this.initMap()
        } else {
          // 73bdb8428fbfe511ed6c5f3328b5734b
          // e61aa7ddc6349acdb3b57c062080f730
          loadJs('https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder,AMap.TruckDriving').then(() => {
// loadJs('//webapi.amap.com/ui/1.0/main.js').then(() => {
            this.initMap()
            // this.loadAddToolbar()
// })
          })
        }
      },
      loadAddToolbar(){
        loadJs('https://cache.amap.com/lbs/static/addToolbar.js').then(()=>{

        })

      },
      close(done) {
        this.exit()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      },
      initMap() {
        this.loadAddToolbar()
        const _this = this
        const AMap = window.AMap
// 地图加载
        _this.map = new AMap.Map('mapcontainer', {
          resizeEnable: true
        })
        let map = this.map
        window.map = map

        map.plugin(['AMap.ToolBar'], function () {
          map.addControl(new AMap.ToolBar())
        })





  // this.setCircle()

        // //轨迹
        // var truckOptions = {
        //   map: map,
        //   policy: 0,
        //   size: 1,
        //   city: 'guangzhou',
        //   // panel:'panel'
        // }
        //
        // var driving = new AMap.TruckDriving(truckOptions);
        // var path = [{keyword: '天河南沙区'},//起点
        //   // {keyword: '天河番禺区'},//途径
        //   {keyword: '广州市天河区'}//终点
        // ];
        // driving.search(path, (status, result) => {
        //   this.addList = result.routes[0].steps
        // });

      },
      setCircle(){
        var map = this.map
        // 纬度
        var latitude = this.getDetail.addresses[0].latitude || 30
        // 经度
        var longitude = this.getDetail.addresses[0].longitude || 120
        // 构造点标记
        var marker = new AMap.Marker({
          // position: map.getCenter(),
          icon: require("../../assets/myorder/ti.png"),
          position: [longitude, latitude],
          offset: new AMap.Pixel(-13, -30)
        });
// 构造矢量圆形
        var circle = new AMap.Circle({
          center: new AMap.LngLat(longitude, latitude), // 圆心位置
          radius: 190,  //半径
          strokeColor: "#F33",  //线颜色
          strokeOpacity: 0,  //线透明度
          strokeWeight: 3,  //线粗细度
          fillColor: "#99d6ff",  //填充颜色
          fillOpacity: 0.5 //填充透明度
        });
        var circle2 = new AMap.Circle({
          center: new AMap.LngLat(longitude, latitude), // 圆心位置
          radius: 125,  //半径
          strokeColor: "#F33",  //线颜色
          strokeOpacity: 0,  //线透明度
          strokeWeight: 3,  //线粗细度
          fillColor: "#82cbfb",  //填充颜色
          fillOpacity: 0.5 //填充透明度
        });
        var circle3 = new AMap.Circle({
          center: new AMap.LngLat(longitude, latitude), // 圆心位置
          radius: 60,  //半径
          strokeColor: "#F33",  //线颜色
          strokeOpacity: 0,  //线透明度
          strokeWeight: 3,  //线粗细度
          fillColor: "#53b7fa",  //填充颜色
          fillOpacity: 0.5 //填充透明度
        });

// 将以上覆盖物添加到地图上
// 单独将点标记添加到地图上
// map.add(marker);
// add方法可以传入一个覆盖物数组，将点标记和矢量圆同时添加到地图上
        map.add([marker,circle]);
        map.add([marker,circle2]);
        map.add([marker,circle3]);
        map.setFitView();




        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle('我是marker的title');

        // 设置label标签
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label

        if(this.isRouteData.qy.isEnshrine ===true){
          if(this.isHiddenCar = true){
            marker.setLabel({
              //修改label相对于maker的位置
              offset: new AMap.Pixel(-70, -90),
              content: "<div class='info'>已为您通知到<span>200</span>名司机</div>"
            });
          }else{
            // this.isShowNum()
            marker.setLabel({
              //修改label相对于maker的位置
              offset: new AMap.Pixel(-70, -90),
              content: "<div class='info'>已通知您的收藏司机</div>"
            });
          }

        }else{
          // this.isHideNum()
          marker.setLabel({
            //修改label相对于maker的位置
            offset: new AMap.Pixel(-100, -90),
            content: "<div class='info'>已为您通知到<span>200</span>名司机</div>"
          });
        }
      },

// 设置获取到的信息
      setData(pos, addr, obj) {
        this.thepos = pos
        this.thename = addr
        this.theobj = obj
        this.noinfo = false
        console.log(obj)
      },
      submitForm() {
        this.$emit('success', this.thepos, this.thename, this.theobj)
        this.close()
      },
      getSignature() {
        return getAuroraSignature(2).then(res => {
          if (res.status === 200) {
            this.jimInfo.signature = res.data

            console.log(this.jimInfo.signature, '请求的');
          } else {
            this.$message.warning(res.text || res.errorInfo || '未知错误，请重试~')
          }
        })
      }
    }
  }
</script>


<style lang="scss">
  @import "https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css";
  .map-lll {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 10px;
    max-height: calc(100% - 20px);
    max-width: calc(100% - 20px);

    .amap-marker-label{
      border: 0;
      /*background-color: transparent;*/
      background-color: #ffffff;
      border-radius: 10px;
    }

    .info{
      position: relative;
      top: 0;
      right: 0;
      min-width: 0;
      font-size: 18px;
      color: #333333;
      padding: 18px;
      font-weight: 600;

      span{
        color: #ff300d;
      }
    }
    .info:before{
      display: block;
      content: '';
      width:0;
      height:0;
      border-width:20px 12px 0;;
      border-style:solid;
      border-color:#fff transparent transparent;/*灰 透明 透明 */
      /*margin:40px auto;*/
      position:absolute;
      top: 53px;
      left: 104px;
    }

    .aflcmap-pop-wrapper {
      width: 70%;
      min-width: 400px;

      .el-dialog__body {
        position: relative;
        height: 500px;

      }
    }
    #mapcontainer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    /*#panel{*/
    /*position: absolute;*/
    /*top:10px;*/
    /*right: 10px;*/
    /*width: 300px;*/
    /*max-height: calc(100% - 20px);*/
    /*overflow: auto;*/
    /*background: #ffe;*/
    /*}*/
    .button-group {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: 12px;
      padding: 10px;
    }

    .button-group .button {
      height: 28px;
      line-height: 28px;
      background-color: #0D9BF2;
      color: #FFF;
      border: 0;
      outline: none;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 3px;
      margin-bottom: 4px;
      cursor: pointer;
    }
    .button-group .inputtext {
      height: 26px;
      line-height: 26px;
      border: 1px;
      outline: none;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 3px;
      margin-bottom: 4px;
      cursor: pointer;
    }
    .amap-info-content {
      font-size: 12px;
    }

    #myPageTop {
      position: absolute;
      top: 5px;
      right: 10px;
      background: #fff none repeat scroll 0 0;
      border: 1px solid #ccc;
      margin: 0 auto;

      font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
      font-size: 14px;

      .headerClass {
        font-size: 14px;
        color: #fff;
        background-color: #2fb301;
        padding: 10px 20px 8px 20px;
        span:first-of-type {
          padding-right: 150px;
        }
        span:last-of-type {
          cursor: pointer;
          color: rgb(196, 233, 183);
          float: right;
        }

      }
      .contentClass {
        .topClass {
          font-size: 16px;
          color: #333333;
          margin: 20px 0px 10px 0;
          font-weight: 600;
          max-height: calc(100% - 20px);
          overflow: auto;
          text-align: center;
          span.callClass {
            color: #ff300d;
          }
          p.changeDriver {
            font-size: 14px;
            color: #333333;
          }
          p.changeTime {
            font-size: 20px;
            color: #3b99f0;
            padding: 10px 0;
          }
          p.changeTitle{
            font-size: 30px;
            color: #333333;
            padding-top: 10px;
            span{
              color: #ff300d;
            }
          }
          p.changeCar {
            font-size: 12px;
            color: #999999;
          }

        }
        .centClass {
          padding: 0 52px 0px 40px;
          overflow-y: auto;
          height: 120px;
          width: 350px;
          ul:first-of-type {
            li {
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              position: relative;
              padding-left: 30px;
              p {
                font-size: 14px;
                color: #333333;
                padding-top: 8px;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
              }

              span {
                font-size: 12px;
                color: #999999;
                padding-top: 2px;
              }
            }
            li:not(:last-of-type) {
              p:before {
                content: '';
                display: block;
                position: absolute;
                top: 30px;
                left: 4px;
                background: #979797;
                width: 2px;
                height: 30px;
              }

            }
            li:first-of-type:before {

              content: '';
              display: block;
              position: absolute;
              top: 12px;
              left: 0;
              background: #80cc5a;
              width: 12px;
              height: 12px;
              border-radius: 50%;

            }
            li:not(:first-of-type):not(:last-of-type):before {

              content: '';
              display: block;
              position: absolute;
              top: 16px;
              left: 2px;
              background: #999999;
              width: 6px;
              height: 6px;
              border-radius: 50%;

            }
            li:last-of-type:before {

              content: '';
              display: block;
              position: absolute;
              top: 12px;
              left: 0;
              background: #e6454a;
              width: 12px;
              height: 12px;
              border-radius: 50%;

            }
          }
        }
        .footClass {
          padding: 10px 52px 56px 40px;
          ul {
            li {
              padding-top: 10px;
              span:first-of-type {
                font-size: 14px;
                padding-right: 15px;
                text-align: right;
                width: 60px;
                color: #999999;
              }
              span:nth-of-type(2) {
                font-size: 14px;
                color: #333333;
              }
              span.dateClass {
                color: #333333;
              }
              span.timeClass {
                color: #1890ff;
              }
              .btnClass {
                margin-left: 20px;
                span {
                  color: #ffffff;
                }
              }
            }
            li:first-of-type {
              padding-top: 0;
            }
          }
        }
      }
      .diaClass {
        .el-dialog.el-dialog--center {
          margin-top: 30vh !important;
          /*.el-dialog__wrapper{*/
          .el-dialog__header {

          }
          .el-dialog__body {

            .radioList {
              text-align: center;
              .el-radio-group {
                .el-radio-button {
                  margin-left: 10px;
                  /*background: #ffe;*/
                  .el-radio-button__inner {
                    background: #ffe;
                  }
                }
                .el-radio-button.is-active {
                  .el-radio-button__inner {
                    background: #67c23a;
                  }
                }
              }

            }
            .textarea {
              text-align: center;
              display: inline-block;
              width: 100%;
              margin-top: 10px;
              .el-input {
                width: 50%;
              }
            }
          }
          .el-dialog__footer {

          }
          /*}*/
        }

      }
    }

    .myPageFoot {
      position: absolute;
      bottom: 35px;
      right: 10px;
      background: #fff none repeat scroll 0 0;
      border: 1px solid #ccc;
      margin: 10px auto;
      padding: 6px;
      font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
      font-size: 14px;
      ul:first-of-type {
        float: left;
        text-align: center;
        padding: 9px 25px 28px 40px;
        li {

        }
      }
      ul:last-of-type {
        float: right;
        text-align: center;
        padding: 9px 25px 28px 40px;
        li {

        }
      }
    }

  }
</style>
