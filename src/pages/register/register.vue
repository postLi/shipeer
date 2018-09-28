<template>
    <div>
      <header>
        <div class="body height_100 flex_es">
          <img src="../../assets/main/jiank_logo.png" alt="">
        </div>
      </header>
      <div class="body">
        <div class="title window-title-22 c-3" v-if="!nextPage">欢迎注册28快运企业货主</div>
        <div class="title window-title-22 c-3" v-else>注册成功</div>
        <el-form :model="form"  ref="Rules" class="myForm">
        <div class="content flex">
          <div class="content-center"  v-if="!nextPage">

            <div class="item flex_as">
              <div class="item-left window-title-16 c-3">手机号：</div>
              <el-form-item label="" label-width=""  prop="phone"
                            :rules="{required: true, validator: checkMyPhone, trigger: 'blur'}">
              <el-input class="myInput"
                style="width: 228px"
                autosize
                placeholder="你的手机号码"
                v-model="form.phone">
              </el-input>
              </el-form-item>
            </div>

            <div class="item flex_as">
              <div class="item-left window-title-16 c-3">验证码：</div>
              <el-form-item label="" label-width=""  prop="code"
                            :rules="{required: true, message: '请输入图形验证码', trigger: 'blur'}">
              <el-input class="myInput"
                style="width: 228px"
                autosize
                placeholder="请输入图形验证码"
                v-model="form.code">
              </el-input>
              </el-form-item>
              <div class="flex_a h-40">
                <img class="code-img" :src="imgsrc" @click="changeVcode" alt="">
                <span class="t pointer" @click="changeVcode">看不清楚，点击换一张图片</span>
              </div>

            </div>

            <div class="item flex_as">
              <div class="item-left window-title-16 c-3">短信验证码：</div>
              <el-form-item label="" label-width=""  prop="sms"
                            :rules="{required: true, message: '请输入校验码', trigger: 'blur'}">
              <el-input class="myInput"
                style="width: 228px"
                autosize
                placeholder="请输入校验码"
                v-model="form.sms">
              </el-input>
              </el-form-item>

              <el-button class="code-img f_w" style="background-color: #3b99f0;width: 133px;height: 40px;font-size: 16px;border-radius: 0" type="primary" @click="getCode()">获取验证码</el-button>
            </div>

            <div class="item flex_a">
              <div class="item-left window-title-16 c-3"></div>
              <div>
                <el-checkbox v-model="checked">&nbsp;</el-checkbox>
                <span class="pointer" @click="checked = true">
                  <span class="window-title-16 c-3">我已阅读并同意</span><span class="window-title-16 c-f">《用户协议》</span>
                </span>
              </div>
            </div>
            <div class="item flex_a margin_t_20">
              <div class="item-left window-title-16 c-3"></div>
              <el-button class="f_w" style="background-color: #2fb301;width: 183px;height: 50px;font-size: 20px;border-radius: 0" type="success" @click="next()">下一步</el-button>

            </div>

          </div>

          <div class="content-center-success flex_f" v-else>
            <div class="window-title-29 c-0 flex">恭喜您，注册成功！</div>
            <div class="flex_ec margin_t_20">
              <span class="window-title-32 c-9 h-30">5</span>
              <span class="window-title-22 c-9 h-22">S</span>
              <span class="window-title-left c-9">后跳转到登录页</span>
            </div>
            <div class="flex margin_t_20">
              <el-button class="f_w" style="background-color: #2fb301;width: 128px;height: 44px;font-size: 18px;" type="success" @click="login()">去登录</el-button>
            </div>
          </div>

        </div>
        </el-form>
      </div>
    </div>
</template>

<script>
  import {checkPhone} from '@/utils/communApi'
  import {loginCode} from '@/api/login'
    export default {
      name: "register",
      data(){
          return {
            checked:false,
            nextPage:false,//下一页
            imgsrc: '',
            form:{
              phone:'',
              code:'',
              sms:''
            }
          }
      },
      methods:{
        next(){
          if(this.checked === false){
            this.$message.warning("请同意《用户协议》");
            return
          }
          this.$refs['Rules'].validate((valid) => {
            if (valid) {

            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        getCode(){

        },
        changeVcode() {
          this.form.code = '';
          this.imgsrc = loginCode()
        },
        checkMyPhone(rule, value, callback){
          checkPhone(rule, value, callback)
        },
        login(){
          this.$router.replace('/')
        }
      },
      mounted() {
        this.changeVcode()

      },
    }
</script>

<style scoped lang="scss">
  header{
    height: 100px;
    background-color: #ffffff;
    border: 1px solid #DDDDDD;
  }
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
          padding: 10px 18px 0 0;
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
