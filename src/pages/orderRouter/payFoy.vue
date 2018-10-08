<template>
  <div class="odPayForClass-lll">
    <el-container class="clearfix">
      <el-header class="clearfix">
        <!--<ul class="clearfix">-->
          <!--<li>-->
            <!--<div class="liClass-top">-->
              <!--&lt;!&ndash;<img src="../../assets/role.png"/>&ndash;&gt;-->
              <!--<img v-if="getDetail.driverHeadUrl===''|| getDetail.driverHeadUrl === null " class="user-avatar" src="../../assets/default_tx.png">-->
              <!--<img class="user-avatar" :src="getDetail.driverHeadUrl" v-else>-->
              <!--<p></p>-->
              <!--<span class="actClass">{{getDetail.driverName === null ?'xx':getDetail.driverName}}</span>&nbsp;&nbsp;<span class="unClass">({{getDetail.belongCityName === null ? 'xx' : getDetail.belongCityName}})</span>-->
              <!--<el-rate-->
                <!--v-model="getDetail.evaluateScore===null ? 0:getDetail.evaluateScore"-->
                <!--disabled-->
                <!--show-score-->
                <!--text-color="#ff9900"-->
                <!--score-template="{value}">-->
              <!--</el-rate>-->
              <!--<i><icon-svg iconClass="lll03xin"></icon-svg></i>-->
              <!--<span class="unClass">{{getDetail.completeOrderNums ===null ? 0: getDetail.completeOrderNums}}单</span>-->

            <!--</div>-->
            <!--<div class="liClass-foot">-->
              <!--<img v-if="getDetail.servicePic===''|| getDetail.servicePic === null " class="user-avatar" src="../../assets/main/xh@3x.png">-->
              <!--<img class="user-avatar" :src="getDetail.servicePic" v-else>-->

              <!--&lt;!&ndash;<img src="../../assets/main/xh@3x.png"/>&ndash;&gt;-->
              <!--<p></p>-->
              <!--<p class="actClass">苏**v99</p>-->
              <!--<p class="unClass">广州</p>-->
              <!--&lt;!&ndash;<span class="unClass">承载16方,&nbsp;2.4吨</span>&ndash;&gt;-->
              <!--<span class="unClass">承载{{getDetail.carSpec}}吨</span>-->
            <!--</div>-->
          <!--</li>-->
          <!--<li>-->
            <!--<div class="divClass">-->
              <!--<span class="actClass">用车时间:</span><span class="blueClass">{{getDetail.useCarTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>-->
            <!--</div>-->
            <!--<div class="divClass">-->
              <!--<span class="unClass">付款方式:</span><span class="spanclass">发货人付款({{getDetail.payWay}}支付)</span>-->
              <!--&lt;!&ndash;payWay 交易方式(0:支付宝，1:微信,2：余额支付,3,收货时付款，4发货时付款,5: 现金支付&ndash;&gt;-->

            <!--</div>-->
            <!--<div class="divClass">-->
              <!--<span class="unClass">运输支付:</span><span class="spanclass">￥{{getDetail.orderPrice}}</span>&nbsp;&nbsp;<span class="blueClass">费用明细</span>-->
            <!--</div>-->
            <!--<div class="divClass">-->
              <!--<span class="unClass">需要车型:</span><span class="spanclass">{{getDetail.carTypeName}}</span>-->
            <!--</div>-->
            <!--<div class="divClass">-->
              <!--<span class="unClass">货物名称:</span><span class="spanclass">{{getDetail.goodsName}}</span>-->
            <!--</div>-->
            <!--<div class="divClass">-->
              <!--<span class="unClass">货物重量:</span><span class="spanclass"><{{getDetail.goodsWeight===''?0:getDetail.goodsWeight}}吨,{{getDetail.goodsVolume==='' ?0:getDetail.goodsVolume}}方	</span>-->
            <!--</div>-->
            <!--<div class="divClass">-->
              <!--<span class="unClass">额外服务:</span><span class="spanclass">{{getDetail.extraName}}	</span>-->
            <!--</div>-->
            <!--<div class="divClass last">-->
              <!--<span class="unClass" style="text-align: right">备注:</span><span class="spanclass">协助装货</span>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<ul>-->
          <!--<template v-for="(item,index) in getDetail.addresses">-->
            <!--<li>-->
              <!--<p>{{item.viaAddressName}}</p>-->
              <!--<span>{{item.viaAddress}}</span>-->
            <!--</li>-->
          <!--</template>-->
          <!--&lt;!&ndash;<li>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>猎德村复建房五区</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>南山区兴南路10号</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>猎德村复建房五区</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>南山区兴南路10号</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>猎德村复建房五区</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>南山区兴南路10号</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--</ul>-->
        <OrderDetail  :orderid="$route.query.qy.orderSerial"></OrderDetail>
      </el-header>
      <el-main class="clearfix">
        <div class="mainClass clearfix">
          <span class="titleClass">您还需支付</span><span class="priceClass">{{getDetail.factPay?getDetail.factPay:0}}元</span>
          <ul>
            <li>
              <div><span>起步价(含{{getDetail.startMileage}}公里)</span><span>{{getDetail.startPrice}}元</span></div>
              <div><span>超里程费(超出{{getDetail.outMileage}}公里)</span><span>{{getDetail.outMileagePrice===null?0:getDetail.outMileagePrice}}元</span></div>
            </li>
            <li>
              <div><span>订单价</span><span>{{getDetail.orderPrice}}元</span></div>
              <div><span>优惠券抵扣</span><span class="redClass">{{getDetail.preferentialPrice===null?0:'-'+getDetail.preferentialPrice}}元</span></div>
            </li>
            <li>
              <div><span>小费</span><span class="greenClass">+{{getDetail.tip===null?0:getDetail.tip}}元</span></div>
              <!--<div><span>超里程费(超出0公里)</span><span>0.00元</span></div>-->
            </li>
          </ul>
        </div>
        <div class="mainColl">
          <span class="titleClass">付款方式</span>
          <ul>
            <li>
              <el-radio v-model="radio" label="1"><span class="spanClass">
                  <icon-svg iconClass="lll01wet" class="svg"></icon-svg>
                  </span>
                <span class="titleP">余额支付</span> <span class="yue">(可用余额<i>{{balance}}</i>元)</span><i class="getup" @click="gotoCoupon">立即充值</i></el-radio>

            </li>
            <li>
              <el-radio v-model="radio" label="2"><span class="spanClass">
                  <icon-svg iconClass="lll01wet" class="svg"></icon-svg>
                  </span>
                <span class="titleP">微信支付</span> <span class="youhui">搬运等额外费用可在司机装货后支付<i>（优惠{{Number(getDetail.reward+getDetail.preferentialPrice)}}元）</i></span></el-radio>

            </li>
            <!--<li>-->
              <!--<el-radio v-model="radio" label="2">微信支付<span>搬运等额外费用可在司机装货后支付</span><i>（优惠8元）</i></el-radio>-->
            <!--</li>-->
            <li>
              <el-radio v-model="radio" label="3"><span class="spanClass">
                  <icon-svg iconClass="lll02zfb" class="svg"></icon-svg>
                  </span>
                <span class="titleP">支付宝支付</span> <span class="youhui">搬运等额外费用可在司机装货后支付<i>（优惠{{Number(getDetail.reward+getDetail.preferentialPrice)}}元）</i></span></el-radio>

            </li>

          </ul>
        </div>
        <div class="openDialogw" >
          <el-dialog
            title="微信支付"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <div class="content">
              <div class="contLeft">
                <p>充值金额（元）</p>
                <p>300元</p>
                <img :src="pfimg" alt="">
                <!--<img src="../../assets/login/code.png" alt="">-->
                <p>二维码有效时长为2个小时<br>
                  请尽快支付</p>
                <div class="btn" >
                  <el-button type="success" @click="donePy1">完成支付</el-button>
                </div>
              </div>
              <div class="contRight">
                <img src="../../assets/myorder/lll-iPhone X.png" alt="">
                <img src="../../assets/myorder/saoyisao.png" alt="">
                <p>请使用微信扫一扫</p>
              </div>
            </div>
          </el-dialog>
        </div>
        <div class="openDialogz" >
          <el-dialog
            title="支付宝支付"
            :visible.sync="centerDialogVisiblezfb"
            width="30%"
            center>
            <div class="content">
              <div class="contLeft">
                <p>充值金额（元）</p>
                <p>300元</p>
                <img :src="pfimg" alt="">
                <!--<img src="../../assets/login/code.png" alt="">-->
                <p>二维码有效时长为2个小时<br>
                  请尽快支付</p>
                <div class="btn" >
                  <el-button type="success" plain @click="donePyzfb">完成支付</el-button>
                </div>
              </div>
              <div class="contRight">
                <img src="../../assets/myorder/iPhoneXzhifub.png" alt="">
                <img src="../../assets/myorder/zhifub_saoyisao.png" alt="">
                <p>请使用支付宝扫一扫</p>
              </div>
            </div>
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="centerDialogVisiblezfb = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="centerDialogVisiblezfb = false">确 定</el-button>-->
            <!--</span>-->
          </el-dialog>
        </div>

      </el-main>
      <el-footer>
        <el-button type="success" @click="onSubmit">确认付款</el-button>
      </el-footer>
    </el-container>
    <!--<div class="payFor-hearder">-->
    <!--支付收银台-->
    <!--</div>-->
  </div>
</template>

<script>
  import {getUserInfo,setOrderDtaial,getOrderDtaial} from '@/utils/auth'
  import {postScanPayOrder,postMywalletPay,postMyOrderDetail,getLcDriver,getSysDictBycode} from '@/api/concentrateAxios/orderManage'
  import {postTradeQuery,postFindMywallet} from '@/api/concentrateAxios/manageCenter'
  import {parseTime} from '@/utils/'
  import OrderDetail from '@/components/orderDetail/index'
  export default {
    components:{
      OrderDetail
    },
    data(){
      return{
        centerDialogVisible: false,
        centerDialogVisiblezfb: false,
        centerDialogVisibleye: false,
        radio: '1',
        value5: 3.7,
        activeNames: '',
        userData: getUserInfo(),
        pfimg:'',
        getDetail:getOrderDtaial(),
        balance:''
        // activeNames: ['1']
      }
    },
    watch:{
      centerDialogVisible(n){
        this.donePy1()
        // console.log(document.getElementById('xiaoli'))
        if(!n){
          clearTimeout(this.timer)

        }else{

        }
      },
      centerDialogVisiblezfb(n){
        this.donePyzfb()
        if(!n){
          clearTimeout(this.timer)

        }else{

        }
      },
      centerDialogVisibleye(n){
        if(!n){
          // clearTimeout(this.timer)
        }
      }
    },
    mounted(){
      console.log(this.$route.query)
      // console.log('userinfo":', window.USERDATA)
      // this.fetchOrderDetail()
      this.getWallet()

    },
    methods: {
      getWallet(){

        return postFindMywallet().then(res =>{
          if(res.status ===200){
            this.balance = res.data.mywallet.balance
          }else{
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)|| '无法获取服务端数据'))
          }
        })
      },

      onSubmit(){
        if(this.radio == 1){
          // this.centerDialogVisibleye = true
          this.fetchMywall()
        }else if(this.radio == 2){
          this.centerDialogVisible = true
          this.fetctScanPayOrder()
        }else{
          this.centerDialogVisiblezfb = true
          this.fetctScanPayOrderzfb()
        }

      },
      fetchMywall(){
        return postMywalletPay(this.$route.query.qy.orderSerial).then(res => {
          if(res.status ===200){
            this.$message.success('支付成功')
          }else{
            this.$message.warning(res.text || res.errorInfo || '未知错误，请重试~')
          }
        })
      },
      fetctScanPayOrder(){
        let data = {
          "payChannel": "wx"
        }
        return postScanPayOrder(this.$route.query.qy.orderSerial,data).then(res =>{
            var fr = new FileReader();
            fr.readAsDataURL(res);
            fr.onload=(e)=>{
              this.pfimg = e.target.result;
              this.getPayResult(this.$route.query.qy.orderSerial,"wx")
            }
        })
      },
      fetctScanPayOrderzfb(){
        let data = {
          "payChannel": "ali"
        }
        return postScanPayOrder(this.$route.query.qy.orderSerial,data).then(res =>{
            var fr = new FileReader();
            fr.readAsDataURL(res);
            fr.onload=(e)=>{
              this.pfimg = e.target.result;
              this.getPayResult(this.$route.query.qy.orderSerial,"ali")
            }
        })
      },

      getPayResult(rid,type){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          postTradeQuery(rid,type).then(res=>{
            if(res.status ===200){
              this.$message.success('支付成功')
            }else{
              this.getPayResult(rid,type)
            }
          }).catch(err=>{
            this.getPayResult(rid,type)
          })
        },3000)
      },
      handleChange(val) {
        console.log(val);
      },
      donePy1(event){
        this.getPayResult(this.$route.query.qy.orderSerial,"wx")
      },
      donePyzfb(){
        this.getPayResult(this.$route.query.qy.orderSerial,"ali")
      },
      gotoCoupon(){
        this.$router.push({path: '/toPayCoupon'})
      },
      // payWay 交易方式(0:支付宝，1:微信,2：余额支付,3,收货时付款，4发货时付款,5: 现金支付
      changePW(){

        if(this.getDetail.payWay ===null){
          return this.getDetail.payWay ='支付宝'
        }else{
          return this.getDetail.payWay ='现金'
        }
      }
    }
  }
</script>

<style lang="scss">

  .odPayForClass-lll{
    display: flex;
    margin:10px;
    width: 100%;
    height: calc(100% - 38px);


    .el-header {
      padding: 0 0 ;
      color: #333;
      text-align: left;
      height: 407px !important;
      background: #fff;

    }
    .el-main.clearfix{
      .mainClass{
        .titleClass{
          font-size: 18px;
          color: #333333;
          font-weight: 600;
          padding-right: 5px;
        }
        .priceClass{
          font-size: 24px;
          color: #ff300d;
        }
        ul{
          background-color: #f2f2f2;
          display: flex;
          max-width: 900px;
          min-width: 1000px;
          li{

            /*float: left;*/
            padding: 20px 70px 20px 70px;
            div{
              span:first-of-type{
                color: #999999;
                font-size: 14px;
                padding-right: 50px;
              }
              span:last-of-type{
                font-size: 14px;
              }
              .redClass{
                color: #ff300d;
              }
              .greenClass{
                color: #2fb301;
              }
            }
            div:last-of-type{
              span:first-of-type{
                padding-right: 25px;
              }
            }
          }
        }
      }
      .mainColl {
        .titleClass {
          font-size: 14px;
          color: #333333;
          font-weight: 600;
        }
        ul{
          margin: 10px 0 10px 60px;
          li{
            i{
              font-style: normal;
            }
            .el-radio{
              .el-radio__label{
                .spanClass{
                  display: inline-block;
                  position: relative;
                  .svg{
                    width: 35px;
                    height: 35px;
                    position: absolute;
                    top: -25px;
                    left: 1px;
                  }
                }
                .titleP{
                  margin-left: 30px;
                  color: #333333;
                }
                .yue{
                  color: #999999;
                  i{
                    font-size: 12px;
                    color: #e6454a;
                  }
                }
                .youhui{
                  color: #999999;
                  i{
                    font-size: 12px;
                    color: #e6454a;
                    margin-left: 10px;
                  }
                }
                .getup{
                  margin-left: 90px;
                  color: #999999;
                  border-bottom: 1px solid #999;
                }
              }
            }
          }
          li:not(:first-of-type){
            margin-top: 20px;
          }
        }
      }
      .openDialogw,.openDialogz,.openDialogy{
        .el-dialog__body{
          .content{
            .contLeft{
              float: left;
              margin: 40px 100px 120px 50px;
              text-align: center;
              p:first-of-type{
                font-size: 12px;
                color: #333333;
              }
              p:nth-of-type(2){
                font-size: 16px;
                color: #ff300d;
                padding-top: 5px;
              }
              p:last-of-type{
                font-size: 12px;
                color: #333333;
                padding-top: 10px;
              }
              img{
                width: 154px;
                height: 154px;
              }
              .btn{
                margin-top: 40px;
              }
            }
            .contRight{
              position: relative;
              text-align: center;
              img:nth-of-type(2){
                position: absolute;
                top: 50px;
                left: 270px;
                width: 100px;
                height: 100px;
              }
              /*float: right;*/
            }
          }
        }

      }

    }


    .el-footer {
      /*background-color: #B3C0D1;*/
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }

</style>
