<template>
  <div class="map-lll">
    <div id="mapcontainer"></div>

    <!--<div id="panel"></div>-->
    <div id="myPageTop">
     <div class="headerClass">
       <span>司机赶往提货地</span>
       <span @click="gotoOrder">取消订单</span>
       <!--<div class="btnClass">-->
         <!--<el-button type="success" size="mini" icon="el-icon-close">成功按钮</el-button>-->
       <!--</div>-->
     </div>
      <div class="contentClass">
        <div class="topClass">
          司机距您<span>1.5</span>公里，稍后将电话联系您…
        </div>
        <div class="centClass">
          <!--<div id="panel"></div>-->
          1234567
        </div>
        <div class="footClass">
          <ul>
            <li><span class="dateClass">用车时间:</span><span class="timeClass">2018-09-12 09:08</span></li>
            <li><span class="dateClass">订单号:</span ><span class="timeClass">10000000000</span></li>
            <li><span>付款方式:</span><span>发货人付款(现金付款)</span></li>
            <li><span>实际支付:</span><span>(已支付) &nbsp;￥99.00</span></li>
            <li><span>运输费用:</span><span>¥80.56 <el-button type="success" size="mini"  class="btnClass">去支付</el-button></span></li>
            <li><span>需要车型:</span><span>未免</span></li>
            <li><span>货物名称:</span><span>电脑</span></li>
            <li><span>货物重量:</span><span><0.7吨,1-2方</span></li>
            <li><span>额外服务:</span><span>需要回单</span></li>
            <li><span>备注:</span><span>协助装货</span></li>
          </ul>
        </div>
      </div>

    </div>
    <div class="myPageFoot">
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

    <!--<div class="aflcmap-pop-footer" slot="footer">-->
      <!--<div class="addrname">当前选中的地址：{{this.thename}}<br>当前经纬度信息：{{this.thepos}}</div>-->
      <!--<el-button type="primary" :disabled="noinfo" @click="submitForm">确 定</el-button>-->
      <!--<el-button type="info" @click="close">取 消</el-button>-->

    <!--</div>-->

  </div>
</template>
<script>
  import {loadJs} from '@/utils/'

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
      }
    },
    mounted() {
// this.dialogTableVisible = this.popVisible
      this.init()
    },
    created() {

    },
// 关闭时清空地图数据
    destoryed() {
      this.exit()
    },
    data() {
      return {
        value5: 3.7,
        noinfo: true,
        dialogTableVisible: false,
        thepos: '',
        thename: '',
        theobj: {}
      }
    },
    methods: {
      gotoOrder(){
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
// })
          })
        }
      },
      close(done) {
        this.exit()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      },
      initMap() {
        const _this = this
        const AMap = window.AMap
// 地图加载
        _this.map = new AMap.Map('mapcontainer', {
          resizeEnable: true
        })
        let map = this.map

        map.plugin(['AMap.ToolBar'], function () {
          map.addControl(new AMap.ToolBar())
        })

        var truckOptions = {
          map: map,
          policy:0,
          size:1,
          city:'guangzhou',
          // panel:'panel'
        };
        var driving = new AMap.TruckDriving(truckOptions);
        var path = [{keyword:'天河南沙区'},//起点
          {keyword:'天河番禺区'},//途径
          {keyword:'广州市天河区'}//终点
        ];
        driving.search(path,function(status, result) {
          // console.log(status, result)
          document.getElementById('panel').innerText = result
          // document.getElementById('panel').innerText = JSON.stringify(result)
          //TODO something
        });
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
      }
    }
  }
</script>


<style lang="scss">
  h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; }
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
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
      margin: 10px auto;
      padding:6px;
      font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
      font-size: 14px;
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
        }

      }
      .contentClass{
        .topClass{
          font-size: 16px;
          color: #333333;
          padding: 40px 52px 45px 50px;
          font-weight: 600;
          max-height: calc(100% - 20px);
          overflow: auto;
          span{
            color: #ff300d;
          }
        }
        .centClass{
          padding: 0 52px 46px 40px;
        }
        .footClass{
          padding: 0 52px 56px 40px;
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
      bottom: 35px;
      right: 10px;
      background: #fff none repeat scroll 0 0;
      border: 1px solid #ccc;
      margin: 10px auto;
      padding:6px;
      font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
      font-size: 14px;
      ul:first-of-type{
        float: left;
        text-align: center;
        padding: 9px 25px 28px 40px;
        li{

        }
      }
      ul:last-of-type{
        float: right;
        text-align: center;
        padding: 9px 25px 28px 40px;
        li{

        }
      }
    }



  }
</style>
