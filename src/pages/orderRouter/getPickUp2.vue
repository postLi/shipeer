<template>
  <div class="map-lll">
    <div id="mapcontainer"></div>

    <!--<div id="panel"></div>-->
    <div id="myPageTop">
     <div class="headerClass">
       <span>{{title}}</span>
       <span @click="gotoOrder" v-if="title === '待付款' || title === '司机已接单' || title === '司机赶往提货地'"><i class="el-icon-close"></i>取消订单</span>
     </div>
      <div class="contentClass">
        <div class="topClass">
          <p class="changeDriver" v-if="title === '司机已接单'">司机距您<span>1.5</span>公里，预计<span>1分钟</span>后达到…</p>
          <p class="changeDriver" v-if="title === '司机赶往提货地' || title === '司机已到提货地'">司机距您<span>1.5</span>公里，稍后将电话联系您…</p>
          <div v-if="title === '司机已装货' || title === '运输中'">
            <p class="changeDriver">司机预计<span>45</span>分钟后到达卸货地：<span>武山</span></p>
            <p class="changeDriver">目前路况中度拥堵，预计到达时间：<span>14:56分</span></p>
          </div>
          <p class="changeDriver" v-if="title === '司机已到目的地'">司机已到<span>卸货地</span>，正在卸货…</p>
          <!--<p class="changeTime">00:20</p>-->
          <!--<p class="changeCar">倒计时结束后无应答将优先为您叫车</p>-->

        </div>
        <div class="centClass">
          <route-line :data="getDetail.addresses" from="getPickUp2"></route-line>

        </div>
        <div class="footClass">
          <ul>
            <li><span class="dateClass">用车时间:</span><span class="timeClass">{{getDetail.useCarTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></li>
            <li><span class="dateClass">订单号:</span ><span class="timeClass" style="margin-left: 14px;">{{$route.query.orderSerial}}</span></li>
            <li><span>付款方式:</span><span>{{getDetail.payStatus || 0}}&nbsp;&nbsp; ({{getDetail.payWay}}付款)</span></li>
            <li><span>实际支付:</span><span>({{getDetail.orderStatus===0?'未支付':'已支付'}}) &nbsp;￥{{getDetail.factPay || 0}}</span></li>
            <li><span>运输费用:</span><span>¥{{getDetail.orderPrice || 0}} </span></li>
            <li><span>需要车型:</span><span>{{getDetail.carTypeName}}</span></li>
            <li><span>货物名称:</span><span>{{getDetail.goodsName}}</span></li>
            <li><span>货物重量:</span><span>{{getDetail.goodsWeight?getDetail.goodsWeight + '吨':''}}&nbsp;{{getDetail.goodsVolume?getDetail.goodsVolume + '方':''}}	</span></li>
            <li><span>额外服务:</span><span>{{getDetail.extraName}}</span></li>
            <li><span>备注:</span><span>{{getDetail.sendWord}}</span></li>
          </ul>
        </div>
        <div class="myPageFoot">
          <ul>
            <li>
              <img src="../../assets/role.png" alt="">
              <p class="c-3 window-title-left">忘二狗<span class="c-9 window-title-12">（四川人）</span></p>
              <div>
                <el-rate
                  v-model="value5"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </div>
              <span class="c-9 window-title-12">12344单</span>
            </li>
          </ul>
          <ul>
            <li>
              <img :src="getDetail.servicePic" alt="" height="36">
              <p>桂**v895</p>
              <p class="c-9 window-title-12">广东</p>
              <p class="c-9 window-title-12">承载16方，2.5吨</p>
            </li>
          </ul>
        </div>
      </div>

    </div>



  </div>
</template>
<script>
  import {loadJs,parseTime} from '@/utils/'
  import {getAuroraSignature} from '@/api/concentrateAxios/orderManage'
  import { getApi ,postApi,pustApiX} from "@/api/api.js";
  import routeLine from '../order/routeLine.vue'
  export default {
    components:{routeLine},
    watch: {
    },
    data() {
      return {
        jimInfo:{
          appkey: "02c4b4f0341b60405b3c99e7",
          key: "ce2f5588bd87f228b514e847",
          random_str:new Date().getTime(),
          timestamp:new Date().getTime(),
          signature:''
        },

        centerDialogVisible: false,
        popVisibleTitle:'',
        value5: 3.7,
        noinfo: true,

        map:{},
        getDetail:{},//我的订单详情(货主)
        title:'',
        carUrl: require("../../assets/orderMonitor/car.png"),
      }
    },
    mounted() {
      //this.loadMsg()
      //我的订单详情(货主)
      postApi(`/aflc-order/aflcMyOrderApi/myOrderDetail?orderSerial=${this.$route.query.orderSerial}`).then((res)=>{
        if(res.status === 200){


          this.getDetail = res.data;
          this.roadMap(res.data)
        } else {

        }
      });

      //状态跟踪(货主)
      pustApiX(`/aflc-order/aflcMyOrderApi/statusFollowing?orderSerial=${this.$route.query.orderSerial}`).then((res)=>{
        console.log(res)

        if(res.data.longitude && res.status === 200){
          switch (res.data.orderStatus) {
            case "AF00801":
              this.title = '待付款';
              break ;
            case "AF0080601HZ":
              this.title = '司机已接单';
              break ;
            case "AF0080602HZ":
              this.title = '司机赶往提货地';
              break ;
            case "AF0080603HZ":
              this.title = '司机已到提货地';
              break ;
            case "AF0080604HZ":
              this.title = '司机已装货';
              break ;
            case "AF0080605HZ":
              this.title = '运输中';
              break ;
            case "AF0080606HZ":
              this.title = '司机已到目的地';
              break ;
          }
          let marker = new AMap.Marker({
            // icon: this.carUrl,
            icon:new AMap.Icon({
              size: new AMap.Size(48,60),
              image:this.carUrl,
              imageSize:new AMap.Size(48,60)
            }),
            map: this.map,
            position: [113.33368,23.131493],
            offset:new AMap.Pixel(-24, -60),
          });
          let content = [];

          switch (res.data.orderStatus) {
            case "":

              break;

          }

          content.push("司机达到提货地后，装卸各有<span style='color:#44c0ff'>30</span>分钟的免费服务时间");

          let infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: this.createInfoWindow(content.join("<br/>")),
            offset: new AMap.Pixel(0, -71),
            showShadow:true
          });
          infoWindow.open(this.map, marker.getPosition());
        }
      })
    },

    methods: {
      roadMap(data){
        let size;
        switch (data.carType) {
          case "AF01801":
            size = 1;
            break;
          case "AF01802":
            size = 2;
            break;
          case "AF01803":
            size = 3;
            break;
          case "AF01804":
            size = 4;
            break;
        }
        this.map = new AMap.Map('mapcontainer', {});
        this.map.plugin(['AMap.ToolBar'],  () =>{
          this.map.addControl(new AMap.ToolBar())
        });

        let truckOptions = {
          map: this.map,
          // policy:1,
          size:size || 1,
          //city:'',
          //panel:'panel'
        };
        let driving = new AMap.TruckDriving(truckOptions);
        let path = [];
        data.addresses.forEach((item)=>{
          path.push({lnglat:[item.longitude,item.latitude]});
        });
        driving.search(path,(status, result) =>{
console.log(result)
        });
      },
      add(){
        this.centerDialogVisible = true
      },
      gotoOrder(){
        this.$router.push({path: '/order'})
      },
      exit() {
        if (this.map && this.map.destroy && typeof this.map.destroy === 'function') {
          this.map.destroy();
          this.map = {}
        }

        this.noinfo = true
      },

     async initMsg(){
        let JIM = new JMessage({
          debug : true
        })

        JIM.onDisconnect(function(){
          console.log("【disconnect】");
        }); //异常断线监听

      await this.getSignature()
        console.log(this.jimInfo,'几率')
        const md5 = require("js-md5");
        const signature =md5("appkey=" + this.jimInfo.appkey + "&timestamp=" + this.jimInfo.timestamp + "&random_str=" + this.jimInfo.random_str + "&key=" + this.jimInfo.key)

       JIM.init({
          "appkey":this.jimInfo.appkey,
          "random_str": this.jimInfo.random_str,
          "signature":  md5(this.jimInfo.signature),
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
          console.log('error成功了2:' + JSON.stringify(data))
        });
      },
      loadMsg(){
        if(window.JMessage){
          this.initMsg()
        } else {
          loadJs('/static/js/jmessage-sdk-web.2.6.0.min.js').then(res=>{
            this.initMsg()
          })
        }
      },

      getSignature(){
        return getAuroraSignature(2).then(res => {
          if(res.status===200){
            this.jimInfo.signature =res.data
            console.log(this.jimInfo.signature,'请求的');
          }else{
            this.$message.warning(res.text || res.errorInfo || '未知错误，请重试~')
          }
        })
      },
      //构建自定义信息窗体
      createInfoWindow(content) {
        var info = document.createElement("div");
        info.className = "info";

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '-3px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "https://webapi.amap.com/ui/1.0/ui/overlay/SimpleInfoWindow/assets/sharp.png";
        sharp.width = "20";
        bottom.appendChild(sharp);
        info.appendChild(bottom);

        return info;
      }
    },
    created() {

    },
    destroyed() {
      this.exit()
    },
  }
</script>


<style lang="scss">
  .map-lll{
    width: 100%;
    height: 100%;
    position: relative;
    margin: 10px ;
    max-height: calc(100% - 20px);
    max-width: calc(100% - 20px);
    .aflcmap-pop-wrapper{
      width: 70%;
      min-width: 400px;

      .el-dialog__body{
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
      width: 380px;
      font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
      font-size: 14px;
      z-index: 1000;
      .headerClass{
        font-size: 14px;
        color: #fff;
        background-color: #2fb301;
        padding: 10px 20px 8px 20px;
       span:first-of-type{
         padding-right: 150px;
       }
        span:last-of-type{
          cursor: pointer;
          color: rgb(196,233,183);
          float:right;
        }

      }
      .contentClass{
        .topClass{
          font-size: 16px;
          color: #333333;
          margin: 20px 0px  ;
          font-weight: 600;
          max-height: calc(100% - 20px);
          overflow: auto;
          text-align: center;
          span.callClass{
            color: #ff300d;
          }
          p.changeDriver{
            font-size: 16px;
            color: #333333;
            span{
              color: #ff300d
            }
          }
          p.changeTime{
            font-size: 20px;
            color: #3b99f0;
            padding: 10px 0;
          }
          p.changeCar{
            font-size: 12px;
            color: #999999;
          }

        }
        .centClass{
          padding: 0 0 0 10px;
          overflow-y: auto;
          height: 120px;
          ul:first-of-type{
            li{
              overflow:hidden; //超出的文本隐藏
              text-overflow:ellipsis; //溢出用省略号显示
              white-space:nowrap; //溢出不换行
              position: relative;
              padding-left: 30px;
              p{
                font-size: 14px;
                color: #333333;
                padding-top: 8px;
                overflow:hidden; //超出的文本隐藏
                text-overflow:ellipsis; //溢出用省略号显示
                white-space:nowrap; //溢出不换行
              }

              span{
                font-size: 12px;
                color: #999999;
                padding-top: 2px;
              }
            }
            li:not(:last-of-type) {
              p:before{
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
                background:#999999;
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
        .footClass{
          padding: 20px 52px 56px 40px;
          ul{
            li{
              padding-top: 10px;
              span:first-of-type{
                font-size: 14px;
                padding-right: 15px;
                text-align: right;
                width: 60px;
                color: #999999;
              }
              span:nth-of-type(2){
                font-size: 14px;
                color: #333333;
              }
              span.dateClass{
                color: #333333;
              }
              span.timeClass{
                color: #1890ff;
              }
              .btnClass{
                margin-left: 20px;
                span{
                  color: #ffffff;
                }
              }
            }
            li:first-of-type{
              padding-top: 0;
            }
          }
        }
      }
    }

    .myPageFoot{
      position: absolute;
      bottom: -160px;
      right: -1px;
      background: #fff none repeat scroll 0 0;
      border: 1px solid #ccc;
      padding:6px;
      font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
      font-size: 14px;
      width: 380px;
      ul:first-of-type{
        float: left;
        text-align: center;
        padding: 9px 20px 10px 20px;
        li{

        }
      }
      ul:last-of-type{
        float: right;
        text-align: center;
        padding: 9px 25px 10px 20px;
        li{

        }
      }
    }



  }

  .info {
    border: solid 1px silver;
    border-radius: 5px;
    box-shadow: 2px 2px 5px 1px silver;
  }
  div.info-middle {
    padding: 6px;
    border-radius: 5px;
  }
  div.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
  }
  div.info-bottom img {
    position: relative;
    z-index: 104;
  }
  span {

  }
  .info-middle img {
    float: left;
    margin-right: 6px;
  }
</style>
