<template>
  <div class="orderClass-lll">
    <el-container>
      <el-header>支付收银台</el-header>
      <el-container>
        <el-aside width="500px">
          <div class="aside-left">
            <ul>
              <li>
                <div class="liClass">
                  <i class="el-icon-time"></i>
                  用车时间
                  <span>2018-03-05</span>
                  <span>19:20:11</span>
                </div>
              </li>
              <li>
                <div style="height: 100px;" class="stepsClass">
                  <el-steps direction="vertical" :active="1">
                    <el-step title="步骤 1" finish-status="success" description="这是一段很长很长很长的描述性文字" ></el-step>
                    <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字" ></el-step>

                  </el-steps>
                </div>
              </li>
            </ul>
            <ul>
              <li><span>付款方式:</span><span>发货人付款(现金付款)</span></li>
              <li><span>实际支付:</span><span>(已支付)￥80.99</span></li>
              <li><span>运输费用:</span><span>￥80.99</span></li>
              <li><span>需要车型:</span><span>微面</span></li>
              <li><span>货物名称:</span><span>家具</span></li>
              <li><span>货物重量:</span><span>0.5,1-2万</span></li>
              <li><span>额外服务:</span><span>需带回单</span></li>
              <li><span>备注:</span><span>协助装货</span></li>
            </ul>
          </div>
        </el-aside>
        <el-main>
          <div class="mainClass">
            <h5>您还需支付￥99元</h5>
            <ul>
              <li><span>起步价(含5公里)</span><span>30.11元</span></li>
              <li><span>超里程费(超出5公里)</span><span>30.11元</span></li>
              <li><span>订单价</span><span>30.11元</span></li>
              <li><span>优惠券抵扣</span><span>30.11元</span></li>
              <li><span>小费</span><span>30.11元</span></li>
            </ul>
          </div>
          <div class="mainColl">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="" name="1">
                <template slot="title">
                  <i class="header-icon el-icon-info"></i>使用微信收款
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="使用支付宝收款" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="余额付款(优惠9元)" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>

            </el-collapse>
          </div>
        </el-main>
      </el-container>
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
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
.orderClass-lll{
  display: flex;
  .payFor-hearder{
    flex: 1;
    background: #ffe;
  }
  /*width: 100%;*/
  /*height: calc(100% - 38px);*/


  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /*text-align: center;*/
    /*line-height: 200px;*/
    ul:first-of-type{
      margin-bottom: 10px;
      li:first-of-type{
        padding: 20px 0 20px 10px;
        .liClass{
          display: inline-block;
          /*padding-top: 10px;*/
          .el-icon-time{
            font-size: 20px;
          }
        }
        .stepsClass{
          .el-steps.el-steps--vertical{
            padding: 20px 0 20px 10px;
          }

        }
      }

    }
    ul:last-of-type{
      li{
        padding: 20px 0 20px 10px;
        border-bottom: 1px solid #333;
        span:first-of-type{
          padding-right: 20px;
        }
      }
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
    .mainClass{
      h5{

      }
      ul{
        li{
          padding: 10px 0 10px 10px;
          span:first-of-type{
            padding-right: 20px;
          }
        }
      }
    }
  }



}

</style>
