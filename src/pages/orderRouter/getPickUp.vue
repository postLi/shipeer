<template>
  <div class="map-lll">
    <div id="mapcontainer"></div>

    <!--<div id="panel"></div>-->
    <div id="myPageTop" v-if="$route.query.tab === '派单中'">
     <div class="headerClass">
       <span>{{$route.query.tab}}</span>
       <span @click="gotoOrder"><i class="el-icon-close"></i>取消订单</span>
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
          <ul >
            <template v-for="(item,index) in addList">
              <li><p>{{item.instruction}}</p><span>南山区兴南路10号</span></li>

            </template>
          </ul>
        </div>
        <div class="footClass">
          <ul>
            <li><span class="dateClass">用车时间:</span><span class="timeClass">2018-09-12 09:08</span></li>
            <li><span class="dateClass">订单号:</span ><span class="timeClass">10000000000</span></li>
            <li><span>付款方式:</span><span>发货人付款(现金付款)</span></li>
            <li><span>实际支付:</span><span>(已支付) &nbsp;￥99.00</span></li>
            <li><span>运输费用:</span><span>¥80.56 <el-button type="success" size="mini"  class="btnClass" @click="add">加小费</el-button></span></li>
            <li><span>需要车型:</span><span>未免</span></li>
            <li><span>货物名称:</span><span>电脑</span></li>
            <li><span>货物重量:</span><span><0.7吨,1-2方</span></li>
            <li><span>额外服务:</span><span>需要回单</span></li>
            <li><span>备注:</span><span>协助装货</span></li>
          </ul>
        </div>
      </div>

      <div class="diaClass">
        <el-dialog
          title="提示:优惠券不能抵扣小费费用"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <ul>
            <li>￥10</li>
            <li>￥10</li>
            <li>￥10</li>
          </ul>
          <!--<span>需要注意的是内容是默认不居中的</span>-->
          <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
      console.log(this.$route.query)
      // if(this.$route.query.tab === '派单中'){
      //   this.popVisibleTitle = this.$route.query.tab
      // }

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
        addList:[],
        centerDialogVisible: false,
        popVisibleTitle:'',
        value5: 3.7,
        noinfo: true,
        dialogTableVisible: false,
        thepos: '',
        thename: '',
        theobj: {}
      }
    },
    methods: {
      add(){
        this.centerDialogVisible = true
      },
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
        this.loadMsg()
      },
      initMsg(){
        let JIM = new JMessage({
          debug : true
        })

        JIM.onDisconnect(function(){
          console.log("【disconnect】");
        }); //异常断线监听

        JIM.init({
          "appkey":"02c4b4f0341b60405b3c99e7",
          "random_str":  new Date().getTime(),
          "signature":  '341be97d9aff90c9978347f66f945b77',
          "timestamp":  new Date().getTime(),
          "flag": 0
        }).onSuccess(function(data) {
          console.log('success:' + JSON.stringify(data));
          JIM.onMsgReceive(function(data) {
            data = JSON.stringify(data);
            console.log('1msg_receive:' + data);

          });
        }).onFail(function(data) {
          console.log('error:' + JSON.stringify(data))
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
        driving.search(path,(status, result)=> {
          //
          this.addList = result.routes[0].steps
          // console.log(this.addList,'地图')
          // result.routes[0].steps.forEach(el=>{
          //
          //   this.addList = el
          //   console.log(this.addList,'地图2')
          // })
          // document.getElementById('panel').innerText = result
          // document.getElementById('panel').innerText = JSON.stringify(result)

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
          float:right;
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
          overflow-y: auto;
          height: 120px;
          width: 350px;
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

              }

              span{
                font-size: 12px;
                color: #999999;
                padding-top: 2px;
              }
            }
            /*li:not(:first-of-type):not(:last-of-type) {*/
              /*content: '';*/
              /*display: block;*/
              /*position: absolute;*/
              /*top: 12px;*/
              /*left: 0;*/
              /*background: #979797;*/
              /*width: 2px;*/
              /*height: 30px;*/
            /*}*/
            li:first-of-type {
              p:before{
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
            }
            li:not(:first-of-type):not(:last-of-type) {
              p:before{
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
            }
            li:last-of-type {
              p:before{
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
      .diaClass{
        .el-dialog__wrapper{
          .el-dialog__header{

          }
          .el-dialog__body{
            ul{

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
