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
        <el-form class="tab-verClass" :model="verData" :rules="verRules" ref="verLogin" label-width="90px">
          <el-form-item class="" label="手机号:" >
            <el-input v-model="verData.verPhone" disabled>
            </el-input>
          </el-form-item>
          <el-form-item class="" label="旧密码:">
            <el-input v-model="verData.old_pwd" placeholder="请输入旧密码">
            </el-input>
          </el-form-item>
          <el-form-item class="nps" label="新密码:">
            <el-input v-model="verData.new_pwd" placeholder="请输入新密码">
              <template slot="append">
                <span>必须是6-20位英文字母、数字</span>
              </template>
            </el-input>

          </el-form-item>
          <el-form-item class="" label="确认新密码:">
            <el-input v-model="verData.sure_pwd" placeholder="请再次输入新密码">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="pw-foot">
          <el-button type="success" @click="subLogin">确定</el-button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import {REGEX} from '../../utils/valiRegex'
  import {login, loginValid, loginCode, validLoginCode, validLoginPhone, validLoginServicePhone,putupdatePassword} from '@/api/login'
  import Axios from 'axios'
  import VueJsCookie from 'vue-js-cookie'
  import {setServerPhone, getUserInfo} from '@/utils/auth'

  export default {
    data() {
      let _this = this
      const checkVersure_pwd = function (rule, value, callback) {
        if (_this.verData.nPW !== _this.verData.surePW) {
          callback(new Error('两次输入密码不一致！'))
        }
        else if (!_this.verData.surePW) {
          callback(new Error('请再次输入新密码'))
        }
        else if (!_this.verData.new_pwd) {
          callback(new Error('请输入新密码'))
        }
        else {
          callback()
        }
      }
      return {
        backgroundImg: 'url(' + require('../../assets/login/lll01-bg.png') + ')',

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

          // verPhone: '',
          verPhone: getUserInfo().mobile,
          old_pwd:'',
          new_pwd:'',
          sure_pwd:'',
          // verGra: '',
          // verNote: ''
        },
        verRules: {
          sure_pwd:[{
            required: true, message: "请输入正确手机号码", pattern: REGEX.MOBILE, trigger: 'blur'
          }],
          // verPhone: [
          //   {required: true, message: "请输入正确手机号码", pattern: REGEX.MOBILE, trigger: 'blur',}
          // ],
          // verGra: [{
          //   validator: checkvcode, trigger: 'blur'
          // }],
          // verNote: [{
          //   validator: checkVerNote, trigger: 'blur'
          // }]
        },
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
          this.$refs['verLogin'].validate(valid => {
            if (valid) {
              let verNote = md5(this.verData.verNote)
              putupdatePassword(this.verData.verPhone, this.verData.old_pwd, this.verData.new_pwd, this.verData.sure_pwd).then((data) => {

                // VueJsCookie.set('28kytoken', data.access_token)
                // VueJsCookie.set('28kyuPhone', this.verData.verPhone)
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
    min-width: 1230px;
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
        max-width: 1230px;
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
      max-width: 1230px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      position: relative;

      .chang-cont {

        /*height: calc(100% - 284px);*/
        width: 707px;
        border: 1px solid #ddd;
        margin: 142px 0 0 247px;
        .tab-verClass{
          margin: 78px 0px 52px 87px;
          .el-form-item{
            display: flex;
            .el-input.is-disabled{
.el-input__inner{
  background-color: #fff;
  border-color: #fff;
  color: #333333;;
}
            }
            .el-form-item__content{
              margin-left: 0 !important;
              .el-input-group__append{
                font-size: 12px;
                color: #2577e3;
                background: #fff;
                border: 1px solid #fff;
              }
            }
          }
        }

      }

      .pw-foot {
        /*text-align: center;*/
        margin: 0 0 100px 205px;
      }
    }

  }
</style>

