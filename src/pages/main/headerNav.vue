<template>
  <div class="header flex_r" v-loading='loading'>
    <div class="header-left flex">
      <img src="../../assets/main/jiank_logo.png" alt="">
    </div>
    <!--<div class="margin_10 flex_r flex_1">-->
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
        <div class="font useClass">
          <el-popover
            ref="popoveruser"
            placement="top-start"
            width="140"
            trigger="hover"
            class="user-center"
          >
            <el-row :span="2">
              <el-col><span @click="gotoManageC">管理中心</span></el-col>
            </el-row>
            <el-row>
              <el-col><span @click="gotochangePW">修改密码</span></el-col>
            </el-row>
            <el-row>
              <el-col><span @click="laygot">退出登录</span></el-col>
            </el-row>
          </el-popover>
          <div class="avatar-wrapper" v-popover:popoveruser :title="userInfoData.mobile">
            <img v-if="userInfoData.shipperCardFile===''|| userInfoData.shipperCardFile === null " class="user-avatar"
                 :src="defaultImg">
            <img class="user-avatar" :src="userInfoData.shipperCardFile" v-else>
            <!--span class="user-name">{{userInfoData.contacts}}<i class="el-icon-arrow-down"></i></span-->
          </div>
        </div>
      </div>
    </div>
    <!--</div>-->

  </div>
</template>

<script>
  import VueJsCookie from 'vue-js-cookie'
  import {getUser, validLoginServicePhone, deleteToken} from '@/api/login'
  import {setUserInfo, getUserInfo, removeUserInfo, getServerPhone} from '@/utils/auth'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        loading: false,
        visible: false,
        serverPhone: getServerPhone(),
        userInfoData: {},
        uPhone: VueJsCookie.get('28kyuPhone'),
        defaultImg: require('../../assets/default_tx.png')
      }
    },
    mounted() {
      let w = document.querySelector(".header-right").clientWidth;
      this.setBodyWidth(w);
      window.addEventListener("resize", () => {
        let w = document.querySelector(".header-right").clientWidth;
        this.setBodyWidth(w);
      });
      return getUser(this.uPhone).then(res => {
        if (res.status === 200) {
          this.userInfoData = res.data;
          setUserInfo(this.userInfoData);
        }
      });
    },
    methods: {
      ...mapActions(['setBodyWidth']),
      gotoManageC() {
        this.$router.push({path: '/manageCenter'})
      },
      // /changePassword
      gotochangePW() {
        this.$router.push({path: '/changePassword'})
      },
      laygot() {
        return deleteToken().then(res => {

          VueJsCookie.remove('28kytoken')
          VueJsCookie.remove('28kyuPhone')
          removeUserInfo()
          this.$router.push({path: '/'})

        }).catch(err => {
          this.$message.error('错误：' + (err.text || err.errorInfo || '无法获取服务端数据~' || err.data))
        })

      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    height: 54px;
    .header-left {
      width: 190px;
      height: 100%;
      background-color: #2fb301;
    }
    .header-right {
      /*box-shadow: 2px -2px 2px 1px;*/
      border-bottom: 1px solid #f2f2f2;
      .header-right-context {
        margin-right: 40px;

      }
    }
  }

  .divide {
    width: 1px;
    height: 32px;
    background-color: #c6c8ce;
    margin: 0 29px;
  }

  .font {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0;
    color: #333333;
  }

  .header-phone {
    position: relative;
    img.phone-img {
      position: absolute;
      top: 28px;
      left: 1px;
      display: none;
      z-index: 1;
    }
  }

  .header-phone:hover img.phone-img {
    display: block;
  }

  .useClass {
    .avatar-wrapper {
      .user-avatar {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        vertical-align: middle;
      }
      .user-name {
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

  .el-popover.el-popper {
    /*width: 120px !important;*/
    .el-row {
      .el-col {
        padding: 10px 0;
        text-align: center;
        cursor: pointer;

      }
      .el-col:hover {
        background: #ddd;
        color: #1890ff;
      }
    }
  }
</style>
