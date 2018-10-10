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
        <!--<div class="pw-status">-->
          <!--<el-steps :active="active" finish-status="success">-->
            <!--<el-step title="步骤 1"></el-step>-->
            <!--<el-step title="步骤 2"></el-step>-->
            <!--<el-step title="步骤 3"></el-step>-->
          <!--</el-steps>-->
        <!--</div>-->
        <div class="pw-form">
          <el-form class="tab-loginClass":model="userData" :rules="userRules" ref="userLogin">
            <el-form-item class="" prop="userPhone" label="手机号:">
              <el-input :maxlength="11" placeholder="请输入注册手机号"
                        v-model="userData.userPhone" clearable @keyup.enter.native="subLogin">

              </el-input>
            </el-form-item>
            <el-form-item class="first" prop="userPhone" label="验证码:">
              <el-input :maxlength="11" placeholder="请输入验证码"
                        v-model="userData.userPhone" clearable @keyup.enter.native="subLogin">
                <template slot="append">
                  <img src="../../assets/role.png" alt="">
                  <span>看不清楚，点击换一张图片</span>
                </template>


              </el-input>
            </el-form-item>
            <el-form-item class="last" prop="userPhone" label="校验码:" >
              <el-input :maxlength="11" placeholder="请输入验证码"
                        v-model="userData.userPhone" clearable @keyup.enter.native="subLogin">
                <template slot="append" >
                  <el-button type="primary" @click="next">获取校验码</el-button>
                </template>
              </el-input>

            </el-form-item>
          </el-form>
        </div>
        <div class="pw-foot">
          <el-button type="success" @click="next">下一步</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {REGEX} from '../../utils/valiRegex'
  import {login, loginValid, loginCode, validLoginCode, validLoginPhone, validLoginServicePhone} from '@/api/login'
  import Axios from 'axios'
  import VueJsCookie from 'vue-js-cookie'
  import {setServerPhone} from '@/utils/auth'

  export default {
    data() {
      let _this = this
      const checkvcode = function (rule, value, callback) {
        if (!value) {
          callback(new Error('请输入验证码,验证码已失效,请更换验证码'))
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
        status:1,
        active: 0,
        backgroundImg: 'url(' + require('../../assets/login/lll01-bg.png') + ')',
        serverPhone: '',
        timer: null,
        imgsrc: '',
        getValidtile: '获取验证码',
        loading: false,
        tabId: 0,
        userData: {
          userPhone: '13000000001',
          userPassword: '123456a',
          pwVcode: ''
        },
        verData: {
          verPhone: '18565382619',
          verGra: '',
          verNote: ''
        },
        userRules: {
          userPassword: [
            {required: true, message: "密码不能为空", trigger: 'blur',}
          ],
          userPhone: [
            {required: true, message: "请输入正确手机号码", pattern: REGEX.MOBILE, trigger: 'blur',}
          ],
          pwVcode: [
            {
              validator: checkvcode, trigger: 'blur'
            }
          ]
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
        }
      }
    },
    mounted() {
      this.changeVcode()
      this.getServerPhone()
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      gotoRegister() {
        this.$router.push({path: '/register'})
      },
      getServerPhone() {
        return validLoginServicePhone().then(res => {
          if (res.status === 200) {
            this.serverPhone = res.data.value
            setServerPhone(this.serverPhone)
          } else {
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
          }
        }).catch(err => {
        })
      },
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
        this.userData.pwVcode = ''
        this.imgsrc = loginCode()
      },
      subLogin() {
        const md5 = require("js-md5");
        if (this.tabId === 0) {
          this.$refs['userLogin'].validate(valid => {
            if (valid) {
              // this.loading = true
              let userPassword = md5(this.userData.userPassword)
              login(this.userData.userPhone + '|aflc-2', userPassword).then(data => {
                if (data.status) {
                  this.$message({
                    message: '您的账号或者密码有误~',
                    type: 'warning'
                  })
                } else {
                  VueJsCookie.set('28kytoken', data.access_token)
                  VueJsCookie.set('28kyuPhone', this.userData.userPhone)
                  // 跳转到首页
                  this.$router.push({path: '/order'})
                }
              }).catch(err => {
                this.$message({
                  message: '您的账号或者密码有误~',
                  type: 'warning'
                })
              })
            } else {

            }
          })
        } else {

          this.$refs['verLogin'].validate(valid => {
            if (valid) {
              let verNote = md5(this.verData.verNote)
              loginValid(this.verData.verPhone + '|aflc-2', verNote).then((data) => {

                VueJsCookie.set('28kytoken', data.access_token)
                VueJsCookie.set('28kyuPhone', this.verData.verPhone)
                // 跳转到首页
                this.$router.push({path: '/order'})
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

        // http://192.168.1.78:7010/aflc-common/aflcCommonSysDistApi/getPlatformCustomerServicePhone
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
        img.contImg{
          padding: 75px 200px;
        }
      }
      .pw-form{
        margin: 0 265px 50px 265px;
        .el-form.tab-loginClass{
          display: inline-grid;
          .el-form-item {
            display: inline-flex;
          }
          .el-form-item.first{
            display: inline-flex;
            .el-input-group__append{
              background: #fff;
              margin-left: 50px;
              border: 1px solid #fff;
              img{
                vertical-align: middle;
                cursor: pointer;
              }
              span{
                text-align: center;
                vertical-align: middle;
                color: #2577e3;

                /*line-height: 36px;*/
              }
            }

          }
          .el-form-item.last{
            .el-button--primary {
              color: #fff;
               background-color: #409EFF;
               border-color: #409EFF;
            }
          }
        }
      }
      .pw-foot{
        text-align: center;
        margin-bottom: 170px;
      }
    }
  }
</style>

