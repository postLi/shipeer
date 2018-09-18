<template>
    <div class="inSingle-lll">
      <el-container>
        <el-header>
          <div class="headerClass">
            <ul>
              <li>派单中</li>
              <li> <el-button type="danger" icon="el-icon-close
">取消订单</el-button></li>
            </ul>

          </div>
        </el-header>
        <el-container >
          <el-aside width="1000px">Aside</el-aside>
          <el-main >
            <div class="mainClass">
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
                <li><span>运输费用:</span><span>￥80.99</span> <el-button type="primary">加小费</el-button></li>
                <li><span>需要车型:</span><span>微面</span></li>
                <li><span>货物名称:</span><span>家具</span></li>
                <li><span>货物重量:</span><span>0.5,1-2万</span></li>
                <li><span>额外服务:</span><span>需带回单</span></li>
                <li><span>备注:</span><span>协助装货</span></li>
              </ul>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "in-single"
    }
</script>

<style lang="scss">
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    /*text-align: center;*/
    line-height: 60px;
    .headerClass{

      ul{
        display: flex;
        li:first-of-type{
          flex: 9;
        }
        li:last-of-type{
          flex: 1;
        }
        /*span{*/
          /*flex: 1;*/
        /*}*/
        /*.el-button{*/
          /*flex: 1;*/
        /*}*/
      }
    }
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /*text-align: center;*/
    /*line-height: 200px;*/
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
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
</style>
