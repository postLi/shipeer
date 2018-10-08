<template>
  <div class="mySdialog">
    <!--<el-button type="text">点击打开 Dialog</el-button>-->
    <!--<el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>-->

    <el-dialog
      title="费用明细"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <!--<span>需要注意的是内容是默认不居中的</span>-->
      <ul>
        <li><span class="pf">实际支付:&nbsp;&nbsp;￥{{getDetail.factPay===null?0:getDetail.factPay}}</span><span class="pfy">&nbsp;&nbsp;({{getDetail.payWay}}支付)</span><span></span></li>
        <li><span class="spanLeft">预计行驶</span><span class="spanRight">{{getDetail.totalMileage}}公里</span></li>
        <li><span class="spanLeft">起步价(含{{getDetail.startMileage}}公里)</span><span class="spanRight">{{getDetail.startPrice}}元</span></li>
        <li><span class="spanLeft">超里程费(超出{{getDetail.outMileage}}公里)</span><span class="spanRight">{{getDetail.outMileagePrice===null?0:getDetail.outMileagePrice}}元</span></li>
        <li><span class="spanLeft">小费</span><span class="spanRight">{{getDetail.tip===null?0:getDetail.tip}}元</span></li>

        <li><span class="spanLeft">装卸等候费</span><span class="spanRight">{{getDetail.unloadingFee===null?0:getDetail.unloadingFee}}元</span></li>
        <li><span class="spanLeft">车主改价</span><span class="spanRight">{{getDetail.driverChangeFee===null?0:getDetail.driverChangeFee}}元</span></li>
        <li><span class="spanLeft">额外服务费</span><span class="spanRight">{{getDetail.totalExtraCharge===null?0:getDetail.totalExtraCharge}}元</span></li>
        <li><span class="spanLeft">订单价</span><span class="spanRight">{{getDetail.orderPrice===null?0:getDetail.orderPrice}}元</span></li>
        <li><span class="saleLeft">优惠金</span><span class="saleRight">{{getDetail.reward===null?0:'-'+getDetail.reward}}元</span></li>
        <li><span class="saleLeft">优惠券抵扣</span><span class="saleRight">{{getDetail.preferentialPrice===null?0:'-'+getDetail.preferentialPrice}}元</span></li>
      </ul>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getOrderDtaial} from '@/utils/auth'
  export default {
    props: {
      centerDialogVisible: {
        type: Boolean,
        default: false
      },
      getDetail:{
        type:[Object,Array],
        default:false
      }
    },
    data() {
      return {
        getDetail:getOrderDtaial
        // centerDialogVisible: false
      }
    },
    mounted(){
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
    },
    watch:{
      centerDialogVisible(n){
        // console.log(n,'监听的')
      },
      getDetail(n){
        console.log(n,'顶替')
      }
    }
  }
</script>

<style lang="scss">
  .mySdialog {
    .el-dialog.el-dialog--center {
      .el-dialog__body {
        ul {
          li {
            font-size: 12px;
            span.pf {

            }
            span.pfy {
              color: rgb(149, 211, 255);
            }
            .spanLeft{
              text-align: left;
            }
            .spanRight{
              text-align: right;
              float: right;
            }
            .saleLeft{
              color: rgb(146,124,20);
            }
            .saleRight{
              float: right;
              color: rgb(246,103,120);
            }
          }
          li:not(:last-of-type){
            padding-bottom: 20px;
          }
          li:last-of-type,li:nth-last-child(2){
            background: rgb(254,250,231);
          }
        }
      }
    }
  }
</style>
