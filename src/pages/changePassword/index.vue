<template>
  <div class="changePW-con-lll" v-loading="loading">
    <div class="login-top">
      <div class="top-wrapper clearfix">
        <img src="../../assets/register/logo_green.png" alt="">
        <div class="top-telphone">
          <span>合作热线：</span><span>{{serverPhone}}</span>
        </div>
      </div>

    </div>
    <div class="login-centent">
      <div class="chang-cont">
        <img v-if="status ===1" class="contImg" src="../../assets/register/one.png" alt="">
        <img v-if="status ===2" class="contImg" src="../../assets/register/two.png" alt="">
        <img v-if="status ===3" class="contImg" src="../../assets/register/three.png" alt="">
        <div class="pw-form">
          <el-form class="tab-loginClass" :model="verData" :rules="verRules" ref="verLogin" v-if="status ===1">
            <el-form-item class="" prop="userPhone" label="手机号:">
              <el-input :maxlength="11" placeholder="请输入注册手机号"
                        v-model="verData.verPhone" clearable @keyup.enter.native="subLogin">

              </el-input>
            </el-form-item>
            <el-form-item class="first" prop="userPhone" label="验证码:">
              <el-input :maxlength="5" placeholder="请输入验证码"
                        v-model="verData.verGra" clearable @keyup.enter.native="subLogin">
                <template slot="append">
                  <img :src="imgsrc" alt="" @click="changeVcode">
                  <span>看不清楚，点击换一张图片</span>
                </template>


              </el-input>
            </el-form-item>
            <el-form-item class="last" prop="userPhone" label="校验码:">
              <el-input placeholder="请输入验证码"
                        v-model="verData.verNote" clearable @keyup.enter.native="subLogin">
                <template slot="append">
                  <span></span>
                  <el-button type="primary" @click="getValidNum">{{getValidtile}}</el-button>
                </template>
              </el-input>

            </el-form-item>
          </el-form>

          <el-form class="tab-serClass" :model="changeData" :rules="changeRule" ref="userLogin" v-if="status ===2">
            <el-form-item class="" prop="userPhone" label="手机号:">
              <el-input :maxlength="11"
                        v-model="changeData.verPhone" clearable  disabled>

              </el-input>
            </el-form-item>
            <el-form-item class="first" prop="userPhone" label="原始密码:">
              <el-input :maxlength="11" placeholder="请输入原始密码"
                        v-model="changeData.oPW" clearable @keyup.enter.native="subLogin">


              </el-input>
            </el-form-item>
            <el-form-item class="first" prop="userPhone" label="新密码:">
              <el-input :maxlength="11" placeholder="请输入新密码"
                        v-model="changeData.nPW" clearable @keyup.enter.native="subLogin">
                <template slot="append">
                  <!--<img src="../../assets/role.png" alt="">-->
                  <span>必须是6-20位英文字母、数字</span>
                </template>


              </el-input>
            </el-form-item>
            <el-form-item class="last" prop="userPhone" label="确认新密码:">
              <el-input :maxlength="11" placeholder="请再次输入新密码"
                        v-model="changeData.surePW" clearable @keyup.enter.native="subLogin">

              </el-input>

            </el-form-item>
          </el-form>
          <div class="tab-threeClass" v-if="status ===3">
            <img src="../../assets/register/mima_chongzhicg.png" alt="">
            <p>修改成功，请牢记您的新密码！</p>
            <p>（4s后返回重新登录）</p>
          </div>

        </div>
        <div class="pw-foot">
          <el-button type="success" @click="subLogin">{{nextTitle}}</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {REGEX} from '../../utils/valiRegex'
  import {login, loginValid, loginCode, validLoginCode, validLoginPhone, validLoginServicePhone,putretrievePassword,putupdatePassword} from '@/api/login'
  import Axios from 'axios'
  import VueJsCookie from 'vue-js-cookie'
  import {setServerPhone, getUserInfo} from '@/utils/auth'

  export default {
    data() {
      let _this = this
      const checkvcode = function (rule, value, callback) {
        if (!value) {
          callback(new Error('验证码错误，或者验证码已失效，请重新获取'))
        } else {
          validLoginCode(value).then(result => {
            if (result.status == 200) {
              callback()
            } else {
              callback(new Error('请输入正确的验证码'))
            }
          }).catch(err => {
            callback(new Error('请求出错了'))
          })
        }
      }
      const checkVerNote = function (rule, value, callback) {
        if (!_this.verData.verPhone) {
          callback(new Error('请输入正确手机号码'))
        }
        else if (!_this.verData.verGra) {
          callback(new Error('请输入图形验证码'))
        }
        else {
          callback()
        }
      }
      return {
        nextTitle: '下一步',
        status: 1,
        active: 0,
        backgroundImg: 'url(' + require('../../assets/login/lll01-bg.png') + ')',
        serverPhone: '',
        timer: null,
        imgsrc: '',
        getValidtile: '获取校验码',
        loading: false,
        tabId: 0,
        changeData:{
          verPhone: '',
          oPW: '',
          nPW: '',
          surePW: ''
        },
        verData: {
          verPhone: getUserInfo().mobile,
          verGra: '',
          verNote: ''
        },
        verRules: {
          verPhone: [
            {required: true, message: "请输入正确手机号码", pattern: REGEX.MOBILE, trigger: 'blur',}
          ],
          verGra: [{
            validator: checkvcode, trigger: 'blur'
          }],
          verNote: [{
            validator: checkVerNote, trigger: 'blur'
          }]
        },
        changeRule:{

        }
      }
    },
    mounted() {
      this.changeVcode()
    },

    methods: {
      getValidNum() {
        if (!this.verData.verPhone) {
          this.$message({
            message: '请输入正确手机号码~',
            type: 'warning'
          })
        }
        else if (!this.verData.verGra) {
          this.$message({
            message: '请输入图形验证码~',
            type: 'warning'
          })

        }
        else {
          validLoginPhone(this.verData.verPhone).then(res => {
            let wait = 60

            if (res.status === 200) {
              // this.$message({
              //   message: '发送成功,请留意短信~',
              //   type: 'warning'
              // })
              if (!this.timer) {
                this.timer = setInterval(() => {
                  if (wait > 1) {
                    wait--
                    this.getValidtile = '发送成功' + wait
                  }
                  else {
                    this.getValidtile = '获取验证码'
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)


              }
            } else {
              this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res) || '您的账号或者密码有误~'))
            }
          })
        }

      },
      changeVcode() {
        // this.userData.pwVcode = ''
        this.imgsrc = loginCode()
      },
      subLogin() {
        const md5 = require("js-md5");
        if (this.status === 1) {
          this.$refs['verLogin'].validate(valid => {
            if (valid) {
              let verNote = md5(this.verData.verNote)
              putretrievePassword(this.verData.verPhone, this.verData.verNote).then((data) => {

                VueJsCookie.set('28kytoken', data.access_token)
                VueJsCookie.set('28kyuPhone', this.verData.verPhone)
                // 跳转到首页
                this.status=2
                this.nextTitle = '确定'
                this.loading = false
              }).catch(err => {
                this.$message({
                  message: '您的账号或者密码有误~',
                  type: 'warning'
                })
              })
            } else {

            }
          })
        } else if (this.status === 2) {
          // this.nextTitle = '返回重新登录'
        } else {


        }
      }
    }
  }
</script>

<style lang="scss">
  .changePW-con-lll {
    position: relative;
    height: 100%;
    min-height: 86px;
    /*background-image: url(../../assets/login/lll01-bg.png);*/
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    min-width: 1138px;
    .login-top {
      background-color: #fff;
      opacity: 0.5;
      position: fixed;
      top: 0;
      z-index: 2;
      width: 100%;
      padding: 20px 0 15px 70px;
      border-bottom: 1px solid #ddd;
      .top-wrapper {
        max-width: 1138px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        min-width: 600px;
        img {
          width: 270px;
          height: 64px;
          /*height: 35px;*/
          margin: 0 auto;
          vertical-align: middle;
        }
        .top-telphone {
          height: 35px;
          margin: 0 auto;
          display: inline-block;
          float: right;
          color: #fff;
          padding-right: 50px;
          span:first-of-type {
            font-size: 30px;
          }
          span:last-of-type {
            padding-right: 55px;
            font-size: 40px;
          }
        }
      }

    }
    .login-centent {
      /*height: 100%;*/
      min-height: 800px;
      max-width: 1138px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .chang-cont {
        height: calc(100% - 284px);
        width: 1138px;
        border: 1px solid #ddd;
        margin: 176px 0 0 35px;
        img.contImg {
          padding: 75px 200px;
        }
      }
      .pw-form {
        margin: 0 265px 50px 265px;
        .el-form.tab-loginClass {
          display: inline-grid;
          .el-form-item {
            display: inline-flex;
            .el-input.is-disabled .el-input__inner {

            }
            .el-input.is-disabled {

              .el-input__inner {

              }
            }
          }
          .el-form-item.first {
            display: inline-flex;
            .el-input-group__append {
              background: #fff;
              margin-left: 50px;
              border: 1px solid #fff;
              img {
                vertical-align: middle;
                cursor: pointer;
                width: 100px;

              }
              span {
                text-align: center;
                vertical-align: middle;
                color: #2577e3;

                /*line-height: 36px;*/
              }
            }

          }
          .el-form-item.last {
            /*background: #fff;*/
            /*border: 1px solid #fff;*/
            span {
              margin-left: 20px;
              /*background: #fff;*/
            }
            .el-button--primary {
              color: #fff;
              background-color: #409EFF;
              border-color: #409EFF;

            }
          }
        }
        .tab-serClass {
          display: inline-grid;
          .el-form-item {
            display: inline-flex;
            .el-form-item__content {
              .el-input.is-disabled {
                .el-input__inner {
                  background: #fff;
                  color: #333333;
                  font-size: 16px;
                  border: 1px solid #fff;
                }
              }
            }
          }
          .el-form-item.first {
            display: inline-flex;
            .el-input-group__append {
              background: #fff;
              margin-left: 50px;
              border: 1px solid #fff;
              img {
                vertical-align: middle;
                cursor: pointer;
              }
              span {
                text-align: center;
                vertical-align: middle;
                color: #2577e3;

                /*line-height: 36px;*/
              }
            }

          }
          .el-form-item.last {
            /*background: #fff;*/
            /*border: 1px solid #fff;*/
            span {
              margin-left: 20px;
              /*background: #fff;*/
            }
            .el-button--primary {
              color: #fff;
              background-color: #409EFF;
              border-color: #409EFF;

            }
          }
        }
        .tab-threeClass {
          display: inline-grid;
          text-align: center;
          /*padding: 0 95px;*/
          img {
            width: 177px;
            height: 90px;
            text-align: center;
            margin-left: 210px;
          }
          p:first-of-type {
            margin: 10px 0 0 90px;
            font-size: 30px;
            color: #333333;
            font-weight: 600;
          }
          p:last-of-type {
            margin-left: 80px;
            font-size: 14px;
            color: #333333;
          }
        }
      }
      .pw-foot {
        text-align: center;
        margin-bottom: 170px;
      }
    }
  }
</style>

