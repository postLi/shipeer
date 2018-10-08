<template>
    <div>
      <register-header></register-header>
      <div class="body">

          <div class="content flex_f flex_a">
              <img v-if="step === 1" class="step-img" src="../../assets/register/one.png" alt="">
              <img v-if="step === 2" class="step-img" src="../../assets/register/two.png" alt="">
              <img v-if="step === 3" class="step-img" src="../../assets/register/three.png" alt="">
              <div class="content-center" v-if="step === 1">
                <div>
                  <el-form :model="form" ref="Rules" class="myForm">
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
                    <el-form-item label="" label-width=""  prop="imageCode"
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
                    <el-form-item label="" label-width=""  prop="smsCode"
                                  :rules="{required: true, message: '请输入校验码', trigger: 'blur'}">
                      <el-input class="myInput"
                                style="width: 228px"
                                autosize
                                placeholder="请输入校验码"
                                v-model="form1.smsCode">
                      </el-input>
                    </el-form-item>

                    <el-button :disabled="canClick" class="code-img f_w" style="background-color: #3b99f0;width: 133px;height: 40px;font-size: 16px;border-radius: 0" type="primary" @click="getCode()">{{timeName === '获取验证码'?'获取验证码':'发送成功（' + timeName + '）'}}</el-button>
                  </div>
                  </el-form>
                </div>

                <div class="item flex_a margin_t_20">
                  <div class="item-left window-title-16 c-3"></div>
                  <el-button class="f_w" style="background-color: #2fb301;width: 183px;height: 50px;font-size: 20px;border-radius: 0" type="success" @click="next()">下一步</el-button>

                </div>
              </div>

            <div class="content-center" v-if="step === 2">
              <div>
                <div class="item flex_as">
                  <div class="item-left window-title-16 c-3">手机号：</div>
                  <div class="h-40 margin_b_20 flex_a">{{form.mobile}}</div>
                </div>
                <el-form :model="form2"  ref="Rules2" class="myForm">
                <div class="item flex_as">
                  <div class="item-left window-title-16 c-3">新密码：</div>
                  <el-form-item label="" label-width=""  prop="password"
                                :rules="{required: true, validator: checkMyEngNum, trigger: 'blur'}">
                    <el-input class="myInput" type="password"
                              style="width: 228px"
                              autosize
                              placeholder="请输入新密码"
                              v-model="form2.password">
                    </el-input>

                  </el-form-item>
                  <div class="flex_a h-40">
                    <span class="t margin_l_10">必须是6-20位英文字母、数字</span>
                  </div>
                </div>

                <div class="item flex_as">
                  <div class="item-left window-title-16 c-3">确认新密码：</div>
                  <el-form-item label="" label-width=""  prop="passwordSure"
                                :rules="{required: true, message: '请再次输入新密码', trigger: 'blur'}">
                    <el-input class="myInput" type="password"
                              style="width: 228px"
                              autosize
                              placeholder="请再次输入新密码"
                              v-model="form2.passwordSure">
                    </el-input>
                  </el-form-item>
                </div>
                </el-form>
              </div>

              <div class="item flex_a margin_t_20">
                <div class="item-left window-title-16 c-3"></div>
                <el-button class="f_w" style="background-color: #2fb301;width: 183px;height: 50px;font-size: 20px;border-radius: 0" type="success" @click="success()">确定</el-button>

              </div>
            </div>

            <div class="content-center flex_f flex_a" v-if="step === 3">
              <img  class="" src="../../assets/register/mima_chongzhicg.png" alt="">
              <div class="window-title-29 c-3">重置成功，请牢记您的新密码！</div>
              <div class="window-title-left c-3">（{{second}}s后返回重新登录）</div>
              <el-button class="f_w" style="margin-top:54px;background-color: #2fb301;width: 183px;height: 50px;font-size: 20px;border-radius: 0" type="success" @click="toLogin()">返回重新登录</el-button>

            </div>

          </div>

      </div>
    </div>
</template>

<script>
  import { getApi ,postApi,putApiX} from "@/api/api.js";
  import registerHeader from "@/components/registerHeader"
  import {checkPhone,checkEngNum} from '@/utils/communApi'
  import {loginCode,validLoginCode } from '@/api/login'
  import md5 from 'js-md5';
    export default {
        name: "passWordEdit",
      components:{registerHeader},
      data(){
          return{
            ok1:false,
            ok2:false,
            step:1,
            imgsrc:'',
            form:{
              mobile:'',
            },
            form1:{
              imageCode:'',
              smsCode:'',
            },
            form2:{
              password:'',
              passwordSure:''
            },
            time:null,
            timeName:'获取验证码',
            canClick:false,

            second:4
          }
      },
      methods:{
        checkMyEngNum(rule, value, callback){
          checkEngNum(rule, value, callback)
        },
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
            validLoginCode(this.form1.imageCode).then(result => {
              if (result.status === 200) {
                this.step = 2;
              }else {
                this.$message.warning(result.errorInfo);
                this.form1.imageCode = ''
              }
            })
          }
        },
        getCode(){
          this.$refs['Rules'].validate((valid) => {
            if (valid) {
              postApi(`/aflc-common/aflcCommonSms/sendCodeSms/${this.form.mobile}`).then((res1)=>{
                if(res1.status === 200){
                  this.timeName = 60;
                  this.$localStorage.set_s("timeNamePassWord",this.timeName);
                  this.canClick = true;
                  this.timeGo();
                }
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        toLogin(){
          this.$router.replace('/')
        },
        success(){
          if(this.form2.password !== this.form2.passwordSure){
            this.$message.warning("两次输入密码不一致");
            return
          }
          this.$refs['Rules2'].validate((valid) => {
            if (valid) {
              let parm ={
                memberType:"AF0010101",
                mobile:this.form.mobile,
                imageCode:this.form1.imageCode,
                smsCode:this.form1.smsCode,
                password:md5(this.form2.password),
                passwordSure:md5(this.form2.passwordSure)
              };
              putApiX("/aflc-common/common/aflcMemberCenter/v1/retrievePassword",parm).then((res)=>{
                if(res.status === 200){
                  this.$message.warning(res.errorInfo);
                  this.step = 3;
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
              return false;
            }
          });

        },
        timeGo(){
          this.time = setInterval(()=>{
            this.timeName = this.timeName -1;
            this.$localStorage.set_s("timeNamePassWord",this.timeName);
            if( this.timeName <= 0){
              this.timeName = "获取验证码";
              this.$localStorage.remove_s('timeNamePassWord');
              this.canClick = false;
              clearInterval(this.time)
            }
          },1000)
        },

        changeVcode() {
          this.form.imageCode = '';
          this.imgsrc = loginCode()
        },
        checkMyPhone(rule, value, callback){
          checkPhone(rule, value, callback,0)
        },
      },
      created(){
        if(this.$localStorage.get_s('timeNamePassWord')){
          this.timeName = this.$localStorage.get_s('timeNamePassWord');
          this.canClick = true;
          this.timeGo();
        }
      },
      mounted(){
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
    margin-top: 75px;
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
  .step-img{
    margin: 75px 0 88px 0;
  }
</style>
