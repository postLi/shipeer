<template>
  <div class="odPayForClass-lll">
    <el-container class="clearfix">
      <el-header class="clearfix">
        <ul class="clearfix">
          <li>
            <div class="liClass-top">
              <img src="../../assets/role.png"/>
              <p></p>
              <span class="actClass">网显示</span>&nbsp;&nbsp;<span class="unClass">(外星人)</span>
              <el-rate
                v-model="value5"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
              <i><icon-svg iconClass="lll03xin"></icon-svg></i>
              <span class="unClass">13344单</span>

            </div>
            <div class="liClass-foot">
              <img src="../../assets/main/xh@3x.png"/>
              <p></p>
              <p class="actClass">苏**v99</p>
              <p class="unClass">广州</p>
              <span class="unClass">承载16方,&nbsp;2.4吨</span>
            </div>
          </li>
          <li>
            <div class="divClass">
              <span class="actClass">用车时间:</span><span class="blueClass">2019-1-10 09:3</span>
            </div>
            <div class="divClass">
              <span class="unClass">付款方式:</span><span>发货人付款(现金支付)</span>
            </div>
            <div class="divClass">
              <span class="unClass">运输支付:</span><span>￥66.00</span>&nbsp;&nbsp;<span class="blueClass">费用明细</span>
            </div>
            <div class="divClass">
              <span class="unClass">需要车型:</span><span>巍面</span>
            </div>
            <div class="divClass">
              <span class="unClass">货物名称:</span><span>家具</span>
            </div>
            <div class="divClass">
              <span class="unClass">货物重量:</span><span><8,1-2方	</span>
            </div>
            <div class="divClass">
              <span class="unClass">额外服务:</span><span>需要回单	</span>
            </div>
            <div class="divClass last">
              <span class="unClass">备注:</span><span>协助装货</span>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <p>猎德村复建房五区</p>
            <span>南山区兴南路10号</span>
          </li>
          <li>
            <p>猎德村复建房五区</p>
            <span>南山区兴南路10号</span>
          </li>
          <li>
            <p>猎德村复建房五区</p>
            <span>南山区兴南路10号</span>
          </li>
        </ul>
      </el-header>
      <el-main class="clearfix">
        <div class="mainClass clearfix">
          <span class="titleClass">您还需支付</span><span class="priceClass">34.00元</span>
          <ul>
            <li>
              <div><span>起步价(含5公里)</span><span>30.00元</span></div>
              <div><span>超里程费(超出0公里)</span><span>0.00元</span></div>
            </li>
            <li>
              <div><span>订单价</span><span>30.00元</span></div>
              <div><span>优惠券抵扣</span><span class="redClass">0.00元</span></div>
            </li>
            <li>
              <div><span>小费</span><span class="greenClass">+30.00元</span></div>
              <!--<div><span>超里程费(超出0公里)</span><span>0.00元</span></div>-->
            </li>
          </ul>
        </div>
        <div class="mainColl">
          <span class="titleClass">付款方式</span>
          <ul>
            <li>
              <el-radio v-model="radio" label="1">余额支付 <span>(可用余额0.00元)</span><i>立即充值</i></el-radio>

            </li>
            <li>
              <el-radio v-model="radio" label="2">微信支付<span>搬运等额外费用可在司机装货后支付</span><i>（优惠8元）</i></el-radio>
            </li>
            <li>
              <el-radio v-model="radio" label="3">支付宝支付<span>搬运等额外费用可在司机装货后支付</span><i>（优惠8元）</i></el-radio>
            </li>
          </ul>
        </div>
      </el-main>
      <el-footer>
        <el-button type="success">确认付款</el-button>
      </el-footer>
    </el-container>
    <!--<div class="payFor-hearder">-->
    <!--支付收银台-->
    <!--</div>-->
  </div>
</template>

<script>
  import {getUserInfo} from '@/utils/auth'

  export default {
    data(){
      return{
        radio: '1',
        value5: 3.7,
        activeNames: '',
        userData: getUserInfo()
        // activeNames: ['1']
      }
    },
    mounted(){
      console.log('userinfo":', window.USERDATA)
    },
    methods: {
      handleChange(val) {
        console.log(val);
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
      ul:first-of-type{

        border-right: 2px dotted #ddd;
        display: inline-block;
        max-width: 650px;
        min-width: 650px;
        float: left;
        /*border*/
        li:first-of-type{
          padding: 50px 50px 88px 70px;
          float:left;
          /*display: inline-block;*/
          .liClass-top{
            /*display: inline-block;*/
            text-align: center;
            img{
              /*display: flex;*/
              /*padding:0 0 5px 30px;*/
            }
            .actClass{
              color: rgb(51,51,51);
              font-weight: 600;
              font-size: 14px;
              margin-left: -10px;
            }
            .unClass{
              font-size: 12px;
              color: #999999;
            }
            .el-rate{
              display: list-item;
              margin: 5px 0;
            }
            i{
              .svg-icon{
                width: 30px;
                height: 15px;
                text-align: center;
                margin-left: -30px;
              }
            }
          }
          .liClass-foot{
            /*display: inline-block;*/
            text-align: center;
            margin-top: 30px;
          }
        }
        li:last-of-type{
          /*display: inline-block;*/
          padding: 50px 98px 88px 0;
          float: right;
          /*max-width: 650px;*/
          /*min-width: 650px;*/
          .divClass{
            padding-bottom: 13px;
            .actClass{
              color: rgb(51,51,51);
              font-weight: 600;
              font-size: 12px;
              padding-right: 20px;
              text-align: right;
            }
            .unClass{
              font-size: 12px;
              color: #999999;
              padding-right: 20px;
              text-align: right;
            }
            .blueClass{
              color: #1890ff;
              font-size: 12px;
            }
            span:nth-of-type(2){

            }
          }
          .divClass.last{
            margin-bottom: 0;
            .unClass{
              padding-right: 45px;
            }
          }
        }
      }
      ul:last-of-type{
        /*position: absolute;*/
        /*top: 50px;*/
        /*left: 750px;*/
        /*marfin-left: 65px;*/
        float: left;
        margin-left: 50px;
        li{
          padding-top: 10px;
          /*position: relative;*/
          p{
            position: relative;
            /*background-color: green;*/
            display: block;
            color: #333333;
            font-size: 14px;

          }
          span{
            padding-top: 2px;
            font-size: 14px;
            color: #999999;
          }
          p:before{
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
        li:first-of-type{
          padding-top: 0;
        }
        li:last-of-type{
          p:before{
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
        li:first-of-type:before{
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
        li:nth-of-type(2):before{
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
        li:last-of-type:before{
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
          li{

            float: left;
            padding: 20px 70px 20px 70px;
            div{
              span:first-of-type{
                color: #999999;
                font-size: 14px;
                padding-right: 50px;
              }
              .redClass{
                color: #ff300d;
              }
              .greenClass{
                color: #2fb301;
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
