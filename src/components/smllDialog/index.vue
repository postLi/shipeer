<template>
  <div class="mySdialog">
    <el-dialog
      title="费用明细"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <!--<span>需要注意的是内容是默认不居中的</span>-->
      <ul>
        <li><span class="pf">实际支付:&nbsp;&nbsp;￥{{getDetail.factPay===null?0.00:parseFloat(getDetail.factPay).toFixed(2)}}</span><span class="pfy">&nbsp;&nbsp; <i style="font-style: normal" v-if="getDetail.payWay">({{getDetail.payWay}}付款)</i> <i v-else></i></span><span></span></li>
        <li><span class="spanLeft">预计行驶</span><span class="spanRight">{{getDetail.totalMileage}}公里</span></li>
        <li><span class="spanLeft">起步价(含{{getDetail.startMileage||0}}公里)</span><span class="spanRight">{{parseFloat(getDetail.startPrice).toFixed(2)}}元</span></li>
        <li><span class="spanLeft">超里程费(超出{{getDetail.outMileage||0}}公里)</span><span class="spanRight">{{getDetail.outMileagePrice===null?0.00:parseFloat(getDetail.outMileagePrice).toFixed(2)}}元</span></li>
        <li><span class="spanLeft">小费</span><span class="spanRight">{{getDetail.tip===null?0.00:parseFloat(getDetail.tip).toFixed(2)}}元</span></li>

        <li><span class="spanLeft">装卸等候费</span><span class="spanRight">{{getDetail.unloadingFee===null?0.00:parseFloat(getDetail.unloadingFee).toFixed(2)}}元</span></li>
        <li><span class="spanLeft">车主改价</span><span class="spanRight">{{getDetail.driverChangeFee===null?0.00:parseFloat(getDetail.driverChangeFee).toFixed(2)}}元</span></li>
        <li><span class="spanLeft">车主改价</span><span class="spanRight">{{getDetail.driverChangeFee===null?0.00:parseFloat(getDetail.driverChangeFee).toFixed(2)}}元</span></li>
        <li><span class="spanLeft">额外服务费</span><span class="spanRight">{{getDetail.totalExtraCharge===null?0.00:parseFloat(getDetail.totalExtraCharge).toFixed(2)}}元</span></li>
        <li><span class="spanLeft">订单价</span><span class="spanRight">{{getDetail.orderPrice===null?0.00:parseFloat(getDetail.orderPrice).toFixed(2)}}元</span></li>
        <li><span class="saleLeft">优惠金</span><span class="saleRight">{{getDetail.reward===null?0.00:'-'+parseFloat(getDetail.reward).toFixed(2)}}元</span></li>
        <li><span class="saleLeft">优惠券抵扣</span><span class="saleRight">{{getDetail.preferentialPrice===null?0.00:'-'+parseFloat(getDetail.preferentialPrice).toFixed(2)}}元</span></li>
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
      // AF0041801	余额支付 AF0041803	支付宝支付AF0041802	微信支付 AF0041804	现金支付

      if (this.getDetail.payWay === 'AF0041803') {
        this.getDetail.payWay = '支付宝'
      } else if (this.getDetail.payWay === 'AF0041802') {
        this.getDetail.payWay = '微信'
      } else if (this.getDetail.payWay === 'AF0041801') {
        this.getDetail.payWay = '余额支付'
      } else if (this.getDetail.payWay === 'AF0041804') {
        this.getDetail.payWay = '现金支付'
      }
    },
    watch:{
      centerDialogVisible(n){
        // console.log(n,'监听的')
      },
      getDetail(n){

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
