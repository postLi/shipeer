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
            <span>验证码登录 &nbsp;|</span>
            <span>账户登录</span>
          </div>
          <el-form-item class="">
            <el-input>
              <template slot="append">2123</template>
            </el-input>
          </el-form-item>
          <el-form-item class="">
            <el-input>
              <template slot="append">获取验证码</template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="success">登录</el-button>
          </div>
        </el-form>
        <div class='login-rember'>
          <span>忘记密码</span>
          <span>立即注册</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="scss">
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
            margin-top: 20px;
            display: block;
            font-size: 30px ;
          }
          span:last-of-type{
            font-size: 25px ;
            padding-top: 10px;
            color: rgba(255, 255, 255, 0.8);
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
          background: #fff;
          border: 1px solid #13407c;
          /*border-radius: 5px;*/
          /*border-radius: 10px;*/
          transition: .5s;
          h3{
            font-size: 16px;
            color: #333;
            margin: 36px auto 30px;
            text-align: center;
          }
          .el-form-item {
            border-radius: 2px;
            border: 1px solid #ccc;
            background: skyblue;
            color: #454545;
            margin-bottom: 20px!important;
          }
          .login-btn{
            margin-top: 42px;
            margin-bottom: 20px;
            height: 40px;
          }
        }
        .login-rember{
          font-size: 14px;
          color: #fff;
          margin-top: 20px;
        }

      }
    }
  }
</style>
