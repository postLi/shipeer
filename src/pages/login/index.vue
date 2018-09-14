<template>
  <div class="login-con-lll">
    <div class="login-top">
      <div class="top-wrapper clearfix">
        <img src="../../assets/login/lll01-ky.png" alt="">
        <div class="top-telphone">
          <span>合作热线：</span><span>400-890-3558</span>
        </div>
      </div>

    </div>
    <div class="login-centent">
      <div class="centent-left">
        <img src="../../assets/login/code.png" alt="">
        <div class="left-word">
          <span>28快运</span>
          <span>快好省您的物流</span>
        </div>
      </div>
      <div class="centent-right">
        <el-form class="centent-form">
          <h3>企业用户登录</h3>
          <div class="form-tab">
            <!--class="tabLogin"-->
            <!--class="tabVer"-->
            <span @click="tabId=0" :class="[tabId === 0 ? 'activet' : 'unatctiv']" >账户登录 </span>|
            <span @click="tabId=1" :class="[tabId === 1 ? 'activet' : 'unatctiv']">验证码登录</span>
          </div>
          <el-form class="tab-loginClass" v-show="tabId===0">
            <el-form-item class="">
              <el-input placeholder="请输入手机号码"  prefix-icon="el-icon-mobile-phone
">

              </el-input>
            </el-form-item>
            <el-form-item class="">
              <el-input placeholder="请输入密码"  prefix-icon="el-icon-goods">

              </el-input>
            </el-form-item>
            <el-form-item class="">
              <el-input placeholder="请输入图形验证码">
                <template slot="append">12345</template>
              </el-input>
            </el-form-item>

          </el-form>
          <el-form class="tab-verClass" v-show="tabId===1">
            <el-form-item class="">
              <el-input placeholder="请输入手机号码" prefix-icon="el-icon-mobile-phone
">
              </el-input>
            </el-form-item>

            <el-form-item class="">
              <el-input placeholder="请输入图形验证码">
                <template slot="append">67890</template>
              </el-input>
            </el-form-item>
            <el-form-item class="">
              <el-input  placeholder="请输入短信验证码">
                <template slot="append">获取验证码</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class='login-rember'>
            <ul>
              <li>
                <img src="../../assets/login/wechat.png" alt="">
               微信登录</li>
              <li> 注册 </li>

              <li v-show="tabId===0">忘记密码 <span>|</span></li>

            </ul>
          </div>
          <div class="login-btn">
            <el-button type="success" @click="subLogin">登录</el-button>
          </div>
        </el-form>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        tabId:0
      }
    },
    mounted(){

    },
    methods:{
      subLogin(){
        this.$message('登录功能暂未开放');
      }
    }
  }
</script>

<style lang="scss">
  ul,li{ padding:0;margin:0;list-style:none}
  .login-con-lll {
    position: relative;
    height: 100%;
    min-height: 86px;
    background-image: url(../../assets/login/lll01-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: auto;
    .login-top{
      background-color:#000;
      opacity: 0.5;
      position: fixed;
      top: 0;
      z-index: 2;
      width: 100%;
      padding: 20px 0 20px 70px;
      .top-wrapper{
        max-width: 1230px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        img{
          height: 35px;
          margin: 10px auto;
          vertical-align: middle;
        }
        .top-telphone{
          height: 35px;
          margin: 10px auto;
          display: inline-block;
          float: right;
          color: #fff;
          span:first-of-type{
            font-size: 30px;
          }
          span:last-of-type{
            font-size: 40px;
          }
        }
      }

    }
    .login-centent{
      height: 100%;
      min-height: 800px;
      max-width: 1230px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .centent-left{
        float: left;
        margin: 320px 165px 0;
        width: 335px;
        .left-word{
          color: #fff;
          span:first-of-type{
            margin: 20px 0 12px;
            display: block;
            font-size: 30px ;
            letter-spacing: 4px;
          }
          span:last-of-type{
            font-size: 25px ;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 2px;
          }
        }
      }
      .centent-right{
        float: right;
        margin: 170px 100px 0;
        width: 335px;
        .centent-form{
          width: 100%;
          display: inline-block;
          padding: 0 25px 23px;
          background: rgba(255,255,255,.9);
          /*border: 1px solid #13407c;*/
          /*border-radius: 5px;*/
          /*border-radius: 10px;*/
          transition: .5s;
          h3{
            font-size: 18px;
            color: #333;
            margin: 24px auto 30px;
            text-align: center;
          }
          .form-tab{
            text-align: center;
            color:#333;
            font-size: 14px;
            padding-bottom: 25px;
            span:first-of-type{
              margin-right: 30px;
            }
            span:last-of-type{
              margin-left: 30px;
              /*color: skyblue;*/
              /*padding-left: 60px;*/
            }
            .tabLogin{
              color: red;
            }
            .activet{
              color: #1890ff;
              border-bottom: 1px solid #1890ff;
            }
            .unatctiv{
              /*color:red;*/
            }
          }
          .el-form-item {
            /*border-radius: 2px;*/
            color: #9b9b9b;
            margin-bottom: 20px!important;
            .el-input__inner{

              border-top: 2px solid #ccc;
              border-right: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
              border-left: 1px solid #ccc;
            }
          }
          .login-btn{
            margin-top: 42px;
            padding: 20px 0;
            height: 40px;
            .el-button{
              width: 100%;
            }
          }
          .login-rember{

            ul{

              li:first-of-type{
                float: left;
                cursor: pointer;
              }
              li:nth-of-type(3),li:nth-of-type(2){
                float: right;
                color: #1890ff;
                cursor: pointer;
              }
              li:nth-of-type(2){
                padding-left: 10px;
              }
              li:nth-of-type(3){
                padding-right: 20px;
                span{
                  padding-left: 20px;
                }
              }
            }
            font-size: 14px;
            color: #333;
            margin-top: 20px;
          }
          .tab-loginClass{

          }
        }
        .centent-form:hover{
          transform: 2s;
          box-shadow: 0 1px 30px rgba(0,0,0,.3);
        }

      }
    }
  }
</style>
