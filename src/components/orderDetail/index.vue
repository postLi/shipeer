<template>
  <div class="commOrder">
    <ul class="clearfix">
      <li>
        <div class="liClass-top">
          <!--<img src="../../assets/role.png"/>-->
          <img v-if="getDetail.driverHeadUrl===''|| getDetail.driverHeadUrl === null " class="user-avatar"
               src="../../assets/default_tx.png">
          <img class="user-avatar" :src="getDetail.driverHeadUrl" v-else>
          <p></p>
          <span class="actClass">{{getDetail.driverName === null ?'xx':getDetail.driverName}}</span>&nbsp;&nbsp;<span
          class="unClass">({{getDetail.driverMobile}})</span>
          <el-rate
            v-model="getDetail.evaluateScore===null ? 0:getDetail.evaluateScore"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          <i>
            <icon-svg iconClass="lll03xin"></icon-svg>
          </i>
          <span class="unClass">{{getDetail.completeOrderNums ===null ? 0: getDetail.completeOrderNums}}单</span>

        </div>
        <div class="liClass-foot">
          <img v-if="getDetail.servicePic===''|| getDetail.servicePic === null " class="user-avatar"
               src="../../assets/main/xh@3x.png">
          <img class="user-avatar" :src="getDetail.servicePic" v-else>

          <!--<img src="../../assets/main/xh@3x.png"/>-->
          <p></p>
          <p class="actClass">{{getDetail.carNumber}}</p>
          <!--<p class="unClass">广州</p>-->
          <!--<span class="unClass">承载16方,&nbsp;2.4吨</span>-->
          <!--<span class="unClass">承载{{getDetail.carSpec}}吨</span>-->
        </div>
      </li>
      <li>
        <div class="divClass">
          <span class="actClass">用车时间:</span><span class="blueClass">{{getDetail.useCarTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </div>
        <div class="divClass">
          <span class="unClass">付款方式:</span> <span class="spanclass">{{getDetail.payStatus}}&nbsp;&nbsp;({{getDetail.payWay}}支付)</span>
          <!--支付时机(0，收货时付款，1，发货时付款)",name="payTimeType")-->
          <!--payWay 交易方式(0:支付宝，1:微信,2：余额支付,3,收货时付款，4发货时付款,5: 现金支付-->

        </div>
        <div class="divClass">
          <span class="unClass">实际支付:</span> <span class="spanclass">{{getDetail.orderStatus===0?'未支付':'已支付'}}&nbsp;&nbsp;￥{{getDetail.factPay===null?0:getDetail.factPay}}</span>

        </div>
        <div class="divClass">
          <span class="unClass">运输支付:</span><span class="spanclass">￥{{getDetail.orderPrice}}</span>&nbsp;&nbsp;<span
          class="blueClass" @click="openDetail">费用明细</span>
        </div>
        <div class="divClass">
          <span class="unClass">需要车型:</span><span class="spanclass">{{getDetail.carTypeName}}</span>
        </div>
        <div class="divClass">
          <span class="unClass">货物名称:</span><span class="spanclass">{{getDetail.goodsName}}</span>
        </div>
        <div class="divClass">
          <span class="unClass">货物重量:</span><span class="spanclass"><{{getDetail.goodsWeight===''?0:getDetail.goodsWeight}}吨,{{getDetail.goodsVolume==='' ?0:getDetail.goodsVolume}}方	</span>
        </div>
        <div class="divClass">
          <span class="unClass">额外服务:</span><span class="spanclass">{{getDetail.extraName}}	</span>
        </div>
        <div class="divClass last">
          <span class="unClass" style="text-align: right">备注:</span><span
          class="spanclass">{{getDetail.sendWord}}</span>
        </div>
      </li>
    </ul>
    <ul>
      <template v-for="(item,index) in getDetail.addresses">
        <li>
          <p>{{item.viaAddressName}}</p>
          <span>{{item.viaAddress}}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import {parseTime} from '@/utils/'
  import {getUserInfo, setOrderDtaial, getOrderDtaial} from '@/utils/auth'
  import {postMyOrderDetail,getSysDictBycode} from '@/api/concentrateAxios/orderManage'

  export default {
    props: {
      orderid: [Number, String]
    },
    data() {
      return {
        centerDialogVisible: false,
        centerDialogVisiblezfb: false,
        centerDialogVisibleye: false,
        radio: '1',
        value5: 3.7,
        activeNames: '',
        userData: getUserInfo(),
        pfimg: '',
        getDetail: {
          // addresses:[],
        },
        payStatus:''
      }
    },
    watch: {
      orderid() {

      }
    },
    mounted() {
      this.fetchOrderDetail()
      // this.fetchCode()
    },
    methods: {
      openDetail() {
        alert('00')
      },
      fetchOrderDetail() {
        return postMyOrderDetail(this.$route.query.qy.orderSerial).then(res => {
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


            setOrderDtaial(res.data)
            this.fetchCode()
            // console.log(this.getDetail.payStatus,'所以')
          } else {
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
          }
        })
      },
      fetchCode() {
        return getSysDictBycode(this.getDetail.payStatus).then(res => {
          if (res.status === 200) {
              this.payStatus = res.data.name
          } else {
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res) || '无法获取服务端数据'))
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

  .commOrder {
    /*text-align: center;*/
    /*height: 407px !important;*/
    ul:first-of-type {

      border-right: 2px dotted #ddd;
      display: inline-block;
      max-width: 600px;
      min-width: 500px;
      float: left;
      /*border*/
      li:first-of-type {
        padding: 50px 50px 88px 70px;
        float: left;
        /*display: inline-block;*/
        .liClass-top {
          /*display: inline-block;*/
          text-align: center;
          img {
            /*display: flex;*/
            /*padding:0 0 5px 30px;*/
          }
          .actClass {
            color: rgb(51, 51, 51);
            font-weight: 600;
            font-size: 14px;
            margin-left: -10px;
          }
          .unClass {
            font-size: 12px;
            color: #999999;
          }
          .el-rate {
            display: list-item;
            margin: 5px 0;
          }
          i {
            .svg-icon {
              width: 30px;
              height: 15px;
              text-align: center;
              margin-left: -30px;
            }
          }
        }
        .liClass-foot {
          /*display: inline-block;*/
          text-align: center;
          margin-top: 30px;
          img {
            width: 85px;
            height: 42px;
          }
          .actClass {
            color: #333333;
            font-weight: 600;
            font-size: 14px;
            padding-right: 20px;
            text-align: center;
          }
        }
        .unClass {
          font-size: 12px;
          color: #999999;
          padding-right: 20px;
          text-align: center;
        }
      }
      li:last-of-type {
        /*display: inline-block;*/
        padding: 50px 98px 88px 0;
        float: right;
        /*max-width: 650px;*/
        /*min-width: 650px;*/
        .divClass {
          padding-bottom: 13px;
          .actClass {
            color: rgb(51, 51, 51);
            font-weight: 600;
            font-size: 12px;
            padding-right: 20px;
            text-align: right;
          }
          .unClass {
            font-size: 12px;
            color: #999999;
            padding-right: 20px;
            text-align: right;
          }
          .blueClass {
            color: #1890ff;
            font-size: 12px;
          }
          span:nth-of-type(2) {

          }
          .spanclass {
            font-size: 12px;
            color: #333333;
          }
        }
        .divClass.last {
          margin-bottom: 0;
          .unClass {
            padding-right: 45px;
          }
        }
      }
    }
    ul:last-of-type {
      /*position: absolute;*/
      /*top: 50px;*/
      /*left: 750px;*/
      /*marfin-left: 65px;*/
      float: left;
      margin: 40px 0 0 50px;
      /*min-width: 700px;*/
      /*display: inline-block;*/
      li {
        padding-top: 10px;
        /*position: relative;*/
        p {
          position: relative;
          /*background-color: green;*/
          display: block;
          color: #333333;
          font-size: 14px;

        }
        span {
          padding-top: 2px;
          font-size: 14px;
          color: #999999;
        }
        p:before {
          content: '';
          display: block;
          height: 30px;
          width: 2px;
          background: #979797;
          position: absolute;
          top: 24px;
          left: -14px;
          /*border: 2px solid #ddd;*/
        }
      }
      li:first-of-type {
        padding-top: 0;
      }
      li:last-of-type {
        p:before {
          content: '';
          display: block;
          height: 30px;
          /*width: 2px;*/
          background: #fff;
          position: absolute;
          top: 24px;
          left: -14px;
          /*border: 2px solid #ddd;*/
        }
      }
      li:first-of-type:before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #80cc5a;
        position: relative;
        top: 18px;
        left: -18px;

      }
      li:nth-of-type(2):before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #999999;
        position: relative;
        top: 15px;
        left: -16px;
        /*left: 56px;*/

      }
      li:last-of-type:before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #e6454a;
        position: relative;
        top: 10px;
        left: -18px;
        /*left: 156px;*/

      }
    }
  }

</style>
