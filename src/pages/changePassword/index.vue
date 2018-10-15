<template>
  <div class="changePW-con-lll" v-loading="loading">
    <div class="login-top">
      <div class="top-wrapper clearfix">
        <img src="../../assets/register/logo_green.png" alt="">

      </div>

    </div>
    <div class="login-centent">
      <div class="chang-cont">
        <el-form class="tab-verClass" :model="verData" :rules="verRules" ref="verLogin" label-width="90px">
          <el-form-item class="" label="手机号:" >
            <el-input v-model="verData.verPhone" disabled>
            </el-input>
          </el-form-item>
          <el-form-item class="" label="旧密码:" prop="old_pwd">
            <el-input v-model="verData.old_pwd" placeholder="请输入旧密码">
            </el-input>
          </el-form-item>
          <el-form-item class="nps" label="新密码:" prop="new_pwd">
            <el-input v-model="verData.new_pwd" placeholder="请输入新密码" >
              <template slot="append">
                <span>必须是6-20位英文字母、数字</span>
              </template>
            </el-input>

          </el-form-item>
          <el-form-item class="" label="确认新密码:" prop="sure_pwd">
            <el-input type="password" v-model="verData.sure_pwd" placeholder="请再次输入新密码">
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
  import {getUserInfo} from '@/utils/auth'

  export default {
    data() {
      let _this = this
      const checkVerold_pwd = function (rule, value, callback) {
       if (!value) {
          callback(new Error('请输入旧密码'))
        }
        else {
          callback()
        }
      }
      const checkVernew_pwd = function (rule, value, callback) {
       if (!value) {
          callback(new Error('请输入新密码'))
        }
        if(!REGEX.NUM_AND_LETTER.test(value)){
         callback(new Error('必须是6-20位英文字母、数字'))
       }
        else {
          callback()
        }
      }
      const checkVersure_pwd = function (rule, value, callback) {
        if (!value) {
          callback(new Error('请再次输入新密码'))
        }
        if (value !== _this.verData.new_pwd) {
          callback(new Error('两次输入密码不一致！'))
        }
        else {
          callback()
        }
      }
      return {
        verRules: {
          old_pwd: [{
            validator: checkVerold_pwd, trigger: 'blur'
          }],
          new_pwd: [
            {
              validator: checkVernew_pwd,trigger:'blur'
            }
          //   {
          //   validator: checkVernew_pwd, trigger: 'blur'
          // },
            // { min: 6, max: 20, message: '必须是6-20位字符', trigger: 'blur' },
            // {pattern: REGEX.NUM_AND_LETTER, trigger: 'blur',message: '必须是6-20位英文字母、数字',}
            ],
          sure_pwd: [{
            validator: checkVersure_pwd,trigger: ['blur','change']
          }]
        },
        loading: false,
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

      }
    },
    mounted() {
    },

    methods: {
      subLogin() {
        const md5 = require("js-md5");
          this.$refs['verLogin'].validate(valid => {

            if (valid) {
              let old_pwd = md5(this.verData.old_pwd)
              let new_pwd = md5(this.verData.new_pwd)
              let sure_pwd = md5(this.verData.sure_pwd)
              putupdatePassword(this.verData.verPhone, old_pwd, new_pwd, sure_pwd).then((res) => {
                if(res.status ===200){
                  this.$message.success('修改密码成功')
                  this.$router.push({path: '/'})
                  VueJsCookie.set('28kyuPhone', this.userData.userPhone)
                }else{
                  this.$message.warning(res.errorInfo || res.text || '无法获取服务端数据~')
                }

//                 // VueJsCookie.set('28kytoken', data.access_token)
//                 // VueJsCookie.set('28kyuPhone', this.verData.verPhone)
//                 // 跳转到首页
//                 // this.status=2
//                 // this.nextTitle = '确定'
//                 // this.loading = false
//               }).catch(err => {
//                 this.$message({
//                   message: '您的账号或者密码有误~',
//                   type: 'warning'
//                 })
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
      .chang-cont:hover{
        transform: 2s;
        -webkit-box-shadow: 3px 3px 4px rgba(0, 0, 0, .3);
        -moz-box-shadow: 3px 3px 4px rgba(0, 0, 0, .3);
        box-shadow: 3px 3px 4px rgba(0, 0, 0, .3);
        /*box-shadow: 0 1px 30px rgba(0, 0, 0, .3);*/
      }

      .pw-foot {
        /*text-align: center;*/
        margin: 0 0 100px 205px;
      }
    }

  }
</style>

