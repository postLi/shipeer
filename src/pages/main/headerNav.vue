<template>
    <div class="header flex_r">
      <div class="header-left flex">
        <img src="../../assets/main/jiank_logo.png" alt="">
      </div>
      <div class="header-right flex_ce flex_1">
        <div class="header-right-context flex_a height_100">
          <div class=" flex_a">
            <img src="../../assets/main/nav_phone.png" alt="">
            <span class="font margin_l_10">手机版</span>
            </div>
          <div class="divide"></div>
          <div class="font">客服电话：400-189-2856</div>
          <div class="divide"></div>
          <!--<div class="font">张三丰</div>-->
          <div class="font">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              class="user-center"
              >
              <el-row :span="2">
                <el-col>用户中心</el-col>
              </el-row>
              <el-row>
                <el-col>修改密码</el-col>
              </el-row>
              <el-row>
                <el-col>退出登录</el-col>
              </el-row>
              <el-button slot="reference">张三丰<i class="el-icon-arrow-down"></i></el-button>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getUser} from '@/api/login'
    export default {
        data(){
          return{
            visible: false
          }
        },
      methods:{

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
  .el-popover{
    .el-row{
      .el-col{
        padding: 10px 0;
      }
      .el-col:hover{
        background: #ffe;
      }
    }
  }
</style>
