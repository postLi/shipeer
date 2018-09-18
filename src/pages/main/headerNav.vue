<template>
    <div class="header flex_r">
      <div class="header-left flex">
        <img src="../../assets/main/jiank_logo.png" alt="">
      </div>
      <div class="header-right flex_ce flex_1">
        <div class="header-right-context flex_a height_100">
          <div class=" flex_a header-phone">
            <img src="../../assets/main/nav_phone.png" alt="">
            <span class="font margin_l_10 phoneHover">手机版</span>
            <img src="../../assets/login/code.png" alt="" class="phone-img">
            </div>
          <div class="divide"></div>
          <div class="font">客服电话：{{serverPhone}}</div>
          <div class="divide"></div>
          <!--<div class="font">张三丰</div>-->
          <div class="font useClass">
            <el-popover
              ref="popoveruser"
              placement="top-start"
              width="200"
              trigger="hover"
              class="user-center"

              >
              <el-row :span="2" @click="gotoManageC">
                <el-col >管理中心</el-col>
              </el-row>
              <el-row>
                <el-col>修改密码</el-col>
              </el-row>
              <el-row>
                <el-col>退出登录</el-col>
              </el-row>
            </el-popover>
            <div class="avatar-wrapper" v-popover:popoveruser>
              <img class="user-avatar" src="../../assets/role.png">
              <span class="user-name">张三丰<i class="el-icon-arrow-down"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getUser,validLoginServicePhone} from '@/api/login'
    export default {
        data(){
          return{
            visible: false,
            serverPhone:''
          }
        },
      mounted(){
          this.getServerPhone()
      },
      methods:{
        gotoManageC(){
          this.$router.push({path: '/manageCenter'})
        },
          getUserInfo(){
            return getUser().then(res=>{

            })
          },
        getServerPhone(){
          return validLoginServicePhone().then(res=>{
            if(res.status ===200){
              this.serverPhone = res.data.value
            }else{
              this.$message.error('客服电话错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
            }
          }).catch(err => {
          })
        },
      }
    }
</script>

<style scoped lang="scss">
  .header{
    height: 54px;
    .header-left{
      width: 190px;
      height: 100%;
      background-color: #2fb301;
    }
    .header-right{
      /*box-shadow: 2px -2px 2px 1px;*/
      .header-right-context{
        margin-right: 40px;

      }
    }
  }

  .divide{
    width: 1px;
    height: 32px;
    background-color: #c6c8ce;
    margin: 0 29px;
  }
  .font{
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0;
    color: #333333;
  }
  .header-phone{
    position: relative;
    img.phone-img{
      position: absolute;
      top:28px;
      left:1px;
      display: none;
    }
  }
  .header-phone:hover img.phone-img{
    display: block;
  }
  .useClass{
    .avatar-wrapper{
      .user-avatar{
        width: 36px;
        height: 36px;
        margin-right: 12px;
        vertical-align: middle;
      }
      .user-name{
        display: inline-block;
        max-width: 64px;
        color: #333;
        line-height: 50px;
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .el-popover.el-popper{
    width: 150px !important;
    .el-row{
      .el-col{
        padding: 10px 0;
        text-align: center;
      }
      .el-col:hover{
        background: #ffe;
      }
    }
  }
</style>
