<template>
  <div class="att-con-lll" v-loading="loading">
    <div class="login-top">
      <div class="top-wrapper clearfix">
        <img src="../../assets/register/logo_green.png" alt="">

      </div>

    </div>
    <div class="login-centent">
      <h5>资料认证</h5>
      <div class="chang-cont">

        <el-form class="tab-verClass" :model="verData" :rules="verRules" ref="verLogin" label-width="140px" status-icon>
          <el-form-item class="" label="企业名称:" prop="companyName">
            <el-input v-model="verData.companyName" placeholder="请输入企业名称" :maxlength='20'>
            </el-input>
          </el-form-item>

          <el-form-item class="nps" label="统一社会信用代码:" prop="creditCode">
            <el-input v-model="verData.creditCode" placeholder="请输入18位社会信用代码" :maxlength='18'>
            </el-input>

          </el-form-item>
          <el-form-item class="" label="联系人:" prop='contacts'>
            <el-input v-model="verData.contacts" placeholder="请输入联系人姓名" :maxlength='20'>
            </el-input>
          </el-form-item>
          <el-form-item class="" label="营业执照:">
            <!--<el-input>-->
              <!--<template slot="append">-->
                <div class="clearfix uploadcard">
                <upload :title="'本地上传'" :showFileList="true" :limit="1" listtype="picture" v-model="verData.businessLicenceFile"
                />
                </div>
              <!--</template>-->
            <!--</el-input>-->
          </el-form-item>
          <el-form-item class="" label="公司货档口门头照:">
            <div class="clearfix uploadcard">
              <upload :title="'本地上传'" :showFileList="true" :limit="1" listtype="picture" v-model="verData.companyFacadeFile"
              />
            </div>
          </el-form-item>
          <el-form-item class="" label="发货人名片:">
            <div class="clearfix uploadcard">
              <upload :title="'本地上传'" :showFileList="true" :limit="1" listtype="picture" v-model="verData.shipperCardFile"
              />
            </div>
          </el-form-item>
        </el-form>
        <div class="pw-foot">
          <el-button type="success" @click="subLogin">提交认证</el-button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import {REGEX} from '../../utils/valiRegex'
  import {postAuthentication} from '@/api/login'
  import Axios from 'axios'
  import VueJsCookie from 'vue-js-cookie'
  import {getUserInfo} from '@/utils/auth'
  import Upload from '@/components/Upload/singleImage2'

  export default {
    components:{
      Upload
    },
    data() {
      let _this = this
      const checkContacts = function (rule, value, callback) {
        if (!value) {
          callback(new Error('请输入联系人姓名'))
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
          // old_pwd: [{
          //   validator: checkVerold_pwd, trigger: 'blur'
          // }],
          // new_pwd: [
          //   {
          //     validator: checkVernew_pwd,trigger:'blur'
          //   }
          //   //   {
          //   //   validator: checkVernew_pwd, trigger: 'blur'
          //   // },
          //   // { min: 6, max: 20, message: '必须是6-20位字符', trigger: 'blur' },
          //   // {pattern: REGEX.NUM_AND_LETTER, trigger: 'blur',message: '必须是6-20位英文字母、数字',}
          // ],
          companyName: [{
            message: "请输入企业名称", trigger: 'blur'
          }],
          contacts: [{
            required: true,validator: checkContacts,trigger: ['blur','change']
          }]
        },
        loading: false,
        verData: {
          companyName: '',
          contacts: '',
          creditCode: '',
          businessLicenceFile: '',
          companyFacadeFile: '',
          shipperCardFile: ''
        },
        liList:{
          img:''
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
          //   let old_pwd = md5(this.verData.old_pwd)
          //   let new_pwd = md5(this.verData.new_pwd)
          //   let sure_pwd = md5(this.verData.sure_pwd)
            postAuthentication(this.verData).then((res) => {
              console.log(res);
              // if(res.status ===200){
              //   this.$message.success('资料认证成功')
              //   this.$router.go(-1);
              //   // VueJsCookie.set('28kyuPhone', this.userData.userPhone)
              // }else{
              //   this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
              // }
            })
          } else {

          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .att-con-lll {
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
      }

    }
    h5{
      margin: 142px 0 0 35px;
      font-size: 22px;
      color: #333333;
      font-weight: normal;
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

        /*height: calc(100% - 284px);*/
        width: 938px;
        border: 1px solid #ddd;
        margin: 10px 0 0 35px;
        .tab-verClass{
          padding: 60px 0px 12px 190px;
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
              .el-input{
                width: 200%;
              }
            }
            .uploadcard {
              /*padding: 20px 20px 20px 90px;*/
              //上传图片
              .el-upload-list--picture-card .el-upload-list__item {
                width: 158px;
                height: 86px;
              }
              .el-upload-dragger {
                width: 158px;
                .el-button{
                  border: 1px solid #fff;
                  background: #fff;
                }
              }
              .el-upload-dragger:hover{
                border: 1px dotted #67c23a;
              }
              .el-upload--picture-card {
                width: 158px;
                height: 86px;
                line-height: 30px;
                border: 1px dashed #fff;
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
        text-align: center;
        margin-bottom: 50px;
      }
    }

  }
</style>

