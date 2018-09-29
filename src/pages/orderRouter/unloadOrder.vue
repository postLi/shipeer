<template>
  <div class="odPayForClass-lll-un">
    <el-container class="clearfix">
      <el-header class="clearfix">
        <div class="height-top">
          <div class="unLeft">

            <div class="clearfix uploadcard">
              <upload :title="'本地上传'" :showFileList="true" :limit="4" listtype="picture" v-model="liList.img"
                      />
            </div>
            <!--<ul>-->
              <!--<li><img src="../../assets/login/code.png" alt=""></li>-->
              <!--<li><img src="../../assets/login/code.png" alt=""></li>-->
              <!--<li><img src="../../assets/login/code.png" alt=""></li>-->
              <!--<li><img src="../../assets/login/code.png" alt=""></li>-->
            <!--</ul>-->


          </div>
          <div class="unRight">
            <ul>
              <li>订单号：182839448934</li>
              <li>司机已卸货</li>
              <li>订单将于<span>2018-03–05  19:14:13</span> 自动完成<br>
                您也可以手动完成哦！</li>
              <li> <el-button type="success">确认收货</el-button></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="height-foot">

        </div>

      </el-header>
      <el-main>
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
      </el-main>

    </el-container>
    <!--<div class="payFor-hearder">-->
    <!--支付收银台-->
    <!--</div>-->
  </div>
</template>

<script>
  import {getUserInfo} from '@/utils/auth'
  import Upload from '@/components/Upload/singleImage2'

  export default {
    data(){
      return{
        tabId:0,
        radio: '1',
        value5: 3.7,
        activeNames: '',
        changeItem: '',
        userData: getUserInfo(),
        liList:{
          img:''
        }
        // activeNames: ['1']
      }
    },
    components: {
      Upload
    },
    mounted(){
      console.log('userinfo":', window.USERDATA)
    },
    methods: {
      changeActive(item,index){
        this.tabId = index
        this.changeItem = item

      },
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="scss">

  .odPayForClass-lll-un{
    display: flex;
    margin:10px;
    width: 100%;
    height: calc(100% - 38px);


    .el-header {
      padding: 0 0 ;
      color: #333;
      text-align: left;
      height: 350px !important;
      background: #fff;
      .height-top{
        margin: 20px 0;
        .unLeft{
          padding: 40px 50px 23px 50px;
          float: left;
          /*display: inline-block;*/
          /*padding-right: 50px;*/
          border-right: 2px solid #ddd;
          .el-dialog{
            margin-top:10vh !important;
            margin: 0 auto 20px !important;
          }
          .uploadcard {
            /*padding: 20px 20px 20px 90px;*/
            //上传图片
            .el-upload-list--picture-card .el-upload-list__item {
              width: 195px;
              height: 158px;
            }
            .el-upload-dragger {
              width: 195px;
            }
            .el-upload--picture-card {
              width: 195px;
              height: 158px;
              line-height: 30px;
            }
            .upload__tip {
              line-height: 30px;
            }
            .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
              margin-top: 8px;
            }
            //上传图片end
            .uploadlist {
              width: 100%;
              margin-left: 80px;
              li {
                float: left;
                width: 100px;
                margin-right: 10px;
              }
            }
          }

        }
        .unRight{
          float: left;
          /*display: inline-block;*/
          padding: 40px 50px 23px 50px;
          display: inline-block;
          ul{
            text-align: center;
            li:first-of-type{
              font-size: 14px;
              color: #999999;
            }
            li:nth-of-type(2){
              font-size: 18px;
              color: #7cbb50;
              padding: 28px 0 5px 18px;
              font-weight: 600;
            }
            li:nth-of-type(3){
              font-size: 12px;
              color: #999999;
              span{
                font-size: 12px;
                color: #3b99f0;
              }
            }
            li:nth-of-type(4){
              margin-top: 30px;
            }
          }
        }
      }
      .height-foot{

      }

    }
    .el-main{

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

        float: left;
        margin-left: 50px;
        margin-top: 50px;
        li{
          padding-top: 10px;
          p{
            position: relative;
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


    .el-footer {
      /*background-color: #B3C0D1;*/
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }

</style>
