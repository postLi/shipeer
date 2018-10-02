<template>
    <div>
      <register-header></register-header>
      <div class="body">
        <div class="title window-title-22 c-3" v-if="!nextPage">欢迎注册28快运企业货主</div>
        <div class="title window-title-22 c-3" v-else>注册成功</div>

        <div class="content flex">
          <div class="content-center"  v-if="!nextPage">
            <div>

              <el-form :model="form"  ref="Rules" class="myForm">
                <div class="item flex_as">
                  <div class="item-left window-title-16 c-3">手机号：</div>
                  <el-form-item label="" label-width=""  prop="mobile"
                                :rules="{required: true, validator: checkMyPhone, trigger: 'blur'}">
                    <el-input class="myInput"
                              style="width: 228px"
                              autosize
                              placeholder="你的手机号码"
                              v-model="form.mobile">
                    </el-input>
                  </el-form-item>

                </div>
              </el-form>
              <el-form :model="form1"  ref="Rules1" class="myForm">
              <div class="item flex_as">
                <div class="item-left window-title-16 c-3">验证码：</div>
                <el-form-item label="" label-width="" prop="imageCode"
                              :rules="{required: true, message: '请输入图形验证码', trigger: 'blur'}">
                  <el-input class="myInput"
                            style="width: 228px"
                            autosize
                            placeholder="请输入图形验证码"
                            v-model="form1.imageCode">
                  </el-input>
                </el-form-item>
                <div class="flex_a h-40">
                  <img class="code-img" :src="imgsrc" @click="changeVcode" alt="">
                  <span class="t pointer" @click="changeVcode">看不清楚，点击换一张图片</span>
                </div>

              </div>

              <div class="item flex_as">
                <div class="item-left window-title-16 c-3">短信验证码：</div>
                <el-form-item label="" label-width="" prop="smsCode"
                              :rules="{required: true, message: '请输入校验码', trigger: 'blur'}">
                  <el-input class="myInput"
                            style="width: 228px"
                            autosize
                            placeholder="请输入校验码"
                            v-model="form1.smsCode">
                  </el-input>
                </el-form-item>

                <el-button :disabled="canClick" class="code-img f_w" style="background-color: #3b99f0;width: 133px;height: 40px;font-size: 16px;border-radius: 0" type="primary" @click="getCode()">{{timeName}}</el-button>
              </div>

              </el-form>
            </div>


            <div class="item flex_a">
              <div class="item-left window-title-16 c-3"></div>
              <div>
                <el-checkbox v-model="checked">&nbsp;</el-checkbox>
                <span>
                  <span class="window-title-16 c-3">我已阅读并同意</span><span @click="user()" class="window-title-16 c-f pointer">《用户协议》</span>
                </span>
              </div>
            </div>
            <div class="item flex_a margin_t_20">
              <div class="item-left window-title-16 c-3"></div>
              <el-button class="f_w" style="background-color: #2fb301;width: 183px;height: 50px;font-size: 20px;border-radius: 0" type="success" @click="next()">下一步</el-button>

            </div>

          </div>

          <div class="content-center-success flex_f" v-else>
            <div class="flex"><img src="../../assets/register/reg_pass.png" alt=""></div>
            <div class="flex_ec margin_t_20">
              <span class="window-title-32 c-9 h-30">{{second}}</span>
              <span class="window-title-22 c-9 h-22">S</span>
              <span class="window-title-left c-9">后跳转到登录页</span>
            </div>
            <div class="flex margin_t_20">
              <el-button class="f_w" style="background-color: #2fb301;width: 128px;height: 44px;font-size: 18px;" type="success" @click="login()">去登录</el-button>
            </div>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
  import { getApi ,postApi,pustApiX} from "@/api/api.js";
  import {checkPhone} from '@/utils/communApi'
  import registerHeader from "@/components/registerHeader"
  import {loginCode,validLoginCode} from '@/api/login'
    export default {
      name: "register",
      components:{registerHeader},
      data(){
          return {
            ok1:false,
            ok2:false,
            checked:false,
            nextPage:false,//下一页
            imgsrc: '',
            form:{
              mobile:'',
            },
            form1:{
              imageCode:'',
              smsCode:''
            },
            time:null,
            timeName:'获取验证码',
            canClick:false,

            second:5
          }
      },
      methods:{
       async next(){
         await this.$refs['Rules'].validate((valid) => {
            if (valid) {
              this.ok1 = true
            } else {
              this.ok1 = false;
              return false;
            }
          });
        await  this.$refs['Rules1'].validate((valid) => {
            if (valid) {
             this.ok2 = true
            } else {
              this.ok2 = false;
              return false;
            }
          });
        if(this.ok1 === true && this.ok2 === true){
          if(this.checked === false){
            this.$message.warning("请同意《用户协议》");
            return
          }
          validLoginCode(this.form1.imageCode).then(result => {
            if (result.status === 200) {
              let parm = {
                areaCode: "",
                cityCode: "",
                memberType: "AF0010101",
                mobile: this.form.mobile,
                password: "",
                provinceCode: "",
                registerOrigin: "AF0030103",
                registerType: "2",
                smsCode: this.form1.smsCode
              };
              postApi('/aflc-common/common/aflcMemberCenter/v1/userRegister',parm).then((res)=>{
                console.log(res)
                if(res.status === 200){
                  this.nextPage = true;
                 let time =  setInterval(()=>{
                    this.second =this.second - 1;
                    if(this.second <=0){
                      clearInterval(time);
                      this.$router.replace("/")
                    }
                  },1000)
                }else {
                  this.$message.warning(res.errorInfo)
                }
              })
            } else {
                this.$message.warning(result.errorInfo);
                this.form1.imageCode = ''
            }
          })
        }

        },
        getCode(){
          this.$refs['Rules'].validate((valid) => {
            if (valid) {
              let parm = {
                memberType:'AF0010101',
                mobile:this.form.mobile
              };
              pustApiX('/aflc-common/common/aflcMemberCenter/v1/checkMobileIsRegister',parm).then((res)=>{
                console.log(res)
                if(res.status === 200){
                  postApi(`/aflc-common/aflcCommonSms/sendCodeSms/${this.form.mobile}`).then((res1)=>{
                    console.log(res1)
                    if(res1.status === 200){
                      this.$message(res1.text)
                      this.timeName = 60;
                      this.canClick = true;
                      this.timeGo();
                    }
                  })
                }else {
                  this.$message.warning(res.errorInfo)
                }
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        changeVcode() {
          this.form1.imageCode = '';
          this.imgsrc = loginCode()
        },
        checkMyPhone(rule, value, callback){
          checkPhone(rule, value, callback)
        },
        login(){
          this.$router.replace('/')
        },
        timeGo(){
        this.time = setInterval(()=>{
           this.timeName = this.timeName -1;
           if( this.timeName <= 0){
             this.timeName = "获取验证码";
             this.canClick = false;
             clearInterval(this.time)
           }
         },1000)
        },
        user(){
         window.open("http://h5.2856pt.com/ServicAgreement/")
        }
      },
      mounted() {
        this.changeVcode()

      },
      destroyed(){
        clearInterval(this.time);
        this.time = null
      }
    }
</script>

<style scoped lang="scss">

  .body{
    max-width: 1138px;
    margin: 0 auto;
  }
  .title{
    margin: 38px 0 8px 0;
  }
  .content{
    max-width: 1138px;
    height: 620px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0
    rgba(153, 153, 153, 0.5);
    border: solid 1px #dddddd;
    .content-center{
      width: 681px;
      height: 282px;
      .item{

        .item-left{
          width: 116px;
          text-align: right;
          padding: 8px 18px 0 0;
        }
      }

    }
    .content-center-success{
      width: 464px;
      height: 221px;
    }
  }
  .code-img{
    margin: 0 17px 0 32px;
  }
  .t{
    font-size: 12px;
    color: #2577e3;
  }
  .h-40{
    height: 40px;
  }
  .h-30{
    height: 30px;
  }
  .h-22{
    height: 22px;
  }
</style>
