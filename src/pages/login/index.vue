<template>
  <div class="login-con-lll" v-loading="loading" :style="{'background-image':backgroundImg}">
    <div class="login-top">
      <div class="top-wrapper clearfix">
        <img src="../../assets/login/lll01-ky.png" alt="">
        <div class="top-telphone">
          <span>合作热线：</span><span>{{serverPhone}}</span>
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
            <span @click="tabId=0" :class="[tabId === 0 ? 'activet' : 'unatctiv']">账户登录 </span>|
            <span @click="tabId=1" :class="[tabId === 1 ? 'activet' : 'unatctiv']">验证码登录</span>
          </div>
          <el-form class="tab-loginClass" v-show="tabId===0" :model="userData" :rules="userRules" ref="userLogin">
            <el-form-item class="" prop="userPhone">
              <el-input :maxlength="11" placeholder="请输入手机号码" prefix-icon="el-icon-mobile-phone"
                        v-model="userData.userPhone" clearable @keyup.enter.native="subLogin">
              </el-input>
            </el-form-item>
            <el-form-item class="" prop="userPassword">
              <el-input placeholder="请输入密码" type="password" prefix-icon="el-icon-goods" v-model="userData.userPassword"
                        clearable @keyup.enter.native="subLogin">
              </el-input>
            </el-form-item>
            <el-form-item class="" prop="pwVcode">
              <el-input v-model="userData.pwVcode" placeholder="请输入图形验证码" :maxlength="6" clearable
                        @keyup.enter.native="subLogin">
                <template slot="append">
                  <img :src="imgsrc" @click="changeVcode">
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-form class="tab-verClass" v-show="tabId===1" :model="verData" ref="verLogin" :rules="verRules">
            <el-form-item class="" prop="verPhone">
              <el-input placeholder="请输入手机号码" :maxlength="11" prefix-icon="el-icon-mobile-phone"
                        v-model="verData.verPhone" clearable @keyup.enter.native="subLogin">
              </el-input>
            </el-form-item>
            <el-form-item class="" prop="verGra">
              <el-input :maxlength="5" placeholder="请输入图形验证码" v-model="verData.verGra" clearable
                        @keyup.enter.native="subLogin">
                <template slot="append">
                  <img :src="imgsrc" @click="changeVcode">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="ver-note">
              <el-input placeholder="请输入短信验证码" v-model="verData.verNote" clearable @keyup.enter.native="subLogin">
                <template slot="append">
                  <el-button @click="getValidNum" :disabled="disabled">{{getValidtile}}</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class='login-rember'>
            <ul>
              <li>
                <img src="../../assets/login/wechat.png" alt="">
                微信登录
              </li>
              <li @click="gotoRegister"> 注册</li>

              <li v-show="tabId===0" @click="$router.push('/passWordEdit')">忘记密码 <span>|</span></li>

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
          callback(new Error('请输入正确的验证码'))
        } else {
          validLoginCode(value).then(result => {
            if (result.status == 200) {
              callback()
            } else {
              callback(new Error('验证码错误，或者验证码已失效，请点击更换验证码'))
            }
          }).catch(err => {
            callback(new Error('服务端返回数据错误，请稍候再试'))
          })
        }
      }
      const checkVerNote = function (rule, value, callback) {
        if (!_this.verData.verPhone) {
          callback(new Error('请输入正确的手机号码'))
        }
        else if (!_this.verData.verGra) {
          callback(new Error('请输入正确的图形验证码'))
        }
        else {
          callback()
        }
      }
      return {
        backgroundImg: 'url(' + require('../../assets/login/lll01-bg.png') + ')',
        serverPhone: '',
        timer: null,
        imgsrc: '',
        getValidtile: '获取验证码',
        loading: false,
        disabled: false,
        zero: '',
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
            {required: true, message: "请输入正确的手机号码", pattern: REGEX.MOBILE, trigger: 'blur',}
          ],
          pwVcode: [
            {
              validator: checkvcode, trigger: 'blur'
            }
          ]
        },
        verRules: {
          verPhone: [
            {required: true, message: "请输入正确的手机号码", pattern: REGEX.MOBILE, trigger: 'blur'}
          ],
          verGra: [{
            validator: checkvcode, trigger: 'blur'
          }],
          verNote: [{
            required: true, message: "请输入正确的短信验证码", trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      this.changeVcode();
      this.getServerPhone();
      if (VueJsCookie.get('28kyuPhone')) {
        this.userData.userPhone = VueJsCookie.get('28kyuPhone')
        this.verData.verPhone = VueJsCookie.get('28kyuPhone')
      }
    },

    methods: {
      gotoRegister() {
        this.$router.push({path: '/register'})
      },
      getServerPhone() {
        return validLoginServicePhone().then(res => {
          if (res.status === 200) {
            this.serverPhone = res.data.value
            setServerPhone(this.serverPhone)
          } else {
            this.$message.error('错误：' + (res.text || res.errorInfo || res.data || '无法获取服务端数据' || JSON.stringify(res)))
          }
        })
      },
      getValidNum() {
        var form = this.$refs['verLogin'];
        form.validateField("verPhone", errMsg => {
          if (errMsg)
            return;
          form.validateField("verGra", errMsg => {
            if (errMsg)
              return;
            validLoginPhone(this.verData.verPhone).then(res => {
              let wait = 60
              if (res.status === 200) {
                if (!this.timer) {
                  this.timer = setInterval(() => {
                    if (wait > 1) {
                      wait--;

                      this.getValidtile = '发送成功(' + wait + ')';
                      this.disabled = true;
                    } else {
                      this.getValidtile = '获取验证码';
                      clearInterval(this.timer);
                      this.timer = null;
                      this.disabled = false;
                    }
                  }, 1000);
                }
              } else {
                this.$message.error('错误：' + (res.text || res.errorInfo || res.data || JSON.stringify(res) || '服务器端返回数据错误.'))
              }
            });
          });
        });
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
              this.loading = true;
              let userPassword = md5(this.userData.userPassword)
              login(this.userData.userPhone + '|aflc-2', userPassword).then(data => {
                if (data.status) {
                  this.$message({
                    message: '您的账号或者密码有误.',
                    type: 'warning'
                  });
                } else {
                  VueJsCookie.set('28kytoken', data.access_token)
                  VueJsCookie.set('28kyuPhone', this.userData.userPhone)
                  this.$router.push({path: '/order'})
                }
                this.loading = false;
              }).catch(err => {
                this.$message({
                  message: '服务端返回数据错误，请稍候再试.',
                  type: 'warning'
                });
                this.loading = false;
              })
            }
          });
        } else {
          this.$refs['verLogin'].validate(valid => {
            if (valid) {
              this.loading = true;
              let verNote = md5(this.verData.verNote);
              loginValid(this.verData.verPhone + '|aflc-2', this.verData.verNote).then((data) => {
                VueJsCookie.set('28kytoken', data.access_token);
                VueJsCookie.set('28kyuPhone', this.verData.verPhone);
                this.$router.push({path: '/order'});
                this.loading = false;
              }).catch(err => {
                this.loading = false;
                this.$message({
                  message: '您的账号或者短信验证码有误，或者短信验证码失效，请重新获取.',
                  type: 'warning'
                });
              });
            }
          });
        }

        // http://192.168.1.78:7010/aflc-common/aflcCommonSysDistApi/getPlatformCustomerServicePhone
      }
    }
  }
</script>

<style lang="scss">
  ul, li {
    padding: 0;
    margin: 0;
    list-style: none
  }

  .login-con-lll {
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
      background-color: #000;
      opacity: 0.5;
      position: fixed;
      top: 0;
      z-index: 2;
      width: 100%;
      padding: 20px 0 20px 70px;

      .top-wrapper {
        max-width: 1230px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        min-width: 600px;
        img {
          height: 35px;
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
      height: 100%;
      min-height: 800px;
      max-width: 1230px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .centent-left {
        float: left;
        margin: 320px 165px 0;
        width: 335px;
        .left-word {
          color: #fff;
          span:first-of-type {
            margin: 20px 0 12px;
            display: block;
            font-size: 30px;
            letter-spacing: 4px;
          }
          span:last-of-type {
            font-size: 25px;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 2px;
          }
        }
      }
      .centent-right {
        float: right;
        margin: 170px 100px 0;
        width: 335px;
        .centent-form {
          width: 100%;
          display: inline-block;
          padding: 0 25px 23px;
          background: rgba(255, 255, 255, .9);
          /*border: 1px solid #13407c;*/
          /*border-radius: 5px;*/
          /*border-radius: 10px;*/
          transition: .5s;
          h3 {
            font-size: 18px;
            color: #333;
            margin: 24px auto 30px;
            text-align: center;
          }
          .form-tab {
            text-align: center;
            color: #333;
            font-size: 14px;
            padding-bottom: 25px;
            span:first-of-type {
              margin-right: 30px;
            }
            span:last-of-type {
              margin-left: 30px;
              /*color: skyblue;*/
              /*padding-left: 60px;*/
            }
            .tabLogin {
              color: red;
            }
            .activet {
              color: #1890ff;
              border-bottom: 1px solid #1890ff;
            }
            .unatctiv {
              /*color:red;*/
            }
          }
          .el-form-item {
            /*border-radius: 2px;*/
            color: #9b9b9b;
            margin-bottom: 20px !important;
            .el-input__inner {

              border-top: 2px solid #ccc;
              border-right: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
              border-left: 1px solid #ccc;
            }
            .el-input-group--append {
              .el-input-group__append {
                cursor: pointer;
                padding: 0 3px;
                color: #1890ff;
                img {
                  width: 100px;
                }
              }
            }
          }
          .ver-note {
            .el-input-group--append {
              .el-input-group__append {
                color: #1890ff;
                padding: 0 18px;
              }
            }

          }
          .login-btn {
            margin: 42px 0 40px 0;
            padding: 20px 0;
            height: 40px;
            .el-button {
              width: 100%;
            }
          }
          .login-rember {

            ul {

              li:first-of-type {
                float: left;
                cursor: pointer;
              }
              li:nth-of-type(3), li:nth-of-type(2) {
                float: right;
                color: #1890ff;
                cursor: pointer;
              }
              li:nth-of-type(2) {
                padding-left: 10px;
              }
              li:nth-of-type(3) {
                padding-right: 20px;
                span {
                  padding-left: 20px;
                }
              }
            }
            font-size: 14px;
            color: #333;
            margin-top: 20px;
          }
          .tab-loginClass {

          }
        }
        .centent-form:hover {
          transform: 2s;
          box-shadow: 0 1px 30px rgba(0, 0, 0, .3);
        }

      }
    }
  }
</style>
