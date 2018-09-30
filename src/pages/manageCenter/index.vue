<template>
    <div class="orderManageClass-lll" v-loading="loading">
      <el-container>
        <el-header>
          <div class="headerClass">
            <ul>
              <li>
                <div class="liImg">
                  <!--<span style="color: red"><icon-svg iconClass="baobiao2_yingyeehzb"></icon-svg></span>-->
                  <img v-if="userInfoData.shipperCardFile===''|| userInfoData.shipperCardFile === null " class="user-avatar" src="../../assets/default_tx.png">
                  <img class="user-avatar" :src="userInfoData.shipperCardFile" v-else>
                </div>
                <div class="liMessage">
                  <span>欢迎您,&nbsp;&nbsp;{{userInfoData.mobile}}</span>
                  <span>更换手机号</span>
                </div>
                <div class="liOther" style="padding-top:22px">
                  <span>企业名称:</span>
                  <span >{{userInfoData.companyName}}</span>
                </div>
                <div class="liOther">
                  <span>联系人:</span>
                  <span>{{userInfoData.contacts}}</span>
                </div>
                <div class="liOther">
                  <span>企业认证:</span>
                  <span>{{userInfoData.shipperStatusName}}</span>
                  <span class="spanClass" v-if="userInfoData.shipperStatus === 'AF0010403'">去认证</span>
                </div>
              </li>

            </ul>
            <ul>
              <li>
               <div class="liClass" >
                 <span class="spanClass"><icon-svg iconClass="lll06yue" class="svg"></icon-svg></span>
                 <!--<img src="../../assets/main/fahuor.png" alt="">-->
                 <p>账户余额</p>
                 <p>¥{{infoData.balance}}</p>
                 <p @click="gotoToPayCoupon">（充值特惠，去充值）</p>
               </div>

              </li>
            </ul>
            <ul>
              <li>
                <div class="liClass" @click="gotoCoupon">
                  <span class="spanClass"><icon-svg iconClass="lll04youhuij" class="svg"></icon-svg></span>
                  <!--<img src="../../assets/main/fahuor.png" alt="">-->
                  <p>在线交易优惠金</p>
                  <p>¥{{infoData.rewardMax}}</p>
                  <p></p>
                </div>

              </li>
            </ul>
            <ul>
              <li>
                <div class="liClass" @click="gotoCouponList">
                  <span class="spanClass"><icon-svg iconClass="lll05youhuiq" class="svg"></icon-svg></span>
                  <!--<img src="../../assets/main/fahuor.png" alt="">-->
                  <p>优惠券</p>
                  <p>{{infoData.nums}}张</p>
                  <p></p>
                </div>

              </li>
            </ul>
          </div>
        </el-header>
        <el-main>
          <div class="mainClass">


            <div class="accountBtn">
              <ul>
                <li>近期交易</li>
                <li @click="gotoAllRecod">查看全部交易记录</li>
              </ul>
            </div>
            <div class="info-table">
              <el-table
                ref="multipleTable"
                :data="dataset"
                border
                :default-sort = "{prop: 'id', order: 'ascending'}"
                style="width: 100%">

                <el-table-column
                  fixed
                  sortable
                  prop="id"
                  label="序号"
                  width="100">
                  <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="orderSerial"
                  width="280"
                  label="交易流水号">
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="incomeExpendTypeName"
                  width="200"
                  label="收支类型">
                </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="payWayName"
                    width="250"
                    label="交易方式">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="tradeTypeName"
                    width="250"
                    label="交易类型">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="totalAmount"
                    width="260"
                    label="金额">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="payTime"
                    width="290"
                    label="交易时间">
                  </el-table-column>
              </el-table>
            </div>
          </div>
        </el-main>
      </el-container>
      <div class="info_tab_footer" ref="footer"> <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
</template>

<script>
  import VueJsCookie from 'vue-js-cookie'
  import Vue from 'vue'
  import Pager from '@/components/Pagination/index'
  // import {getUser} from '@/api/login'
  import {postFindMywallet,postFindAflcReward,getCouponCount,postFindSOPayment} from '@/api/concentrateAxios/manageCenter'
  import {getUserInfo} from '@/utils/auth'

    export default {
      components:{
        Pager

      },
      data(){
        return{
          total: 0,
          dataset:[],
          selected:[],
          infoData:{
            rewardMax:0.00,
            balance:0.00,
            nums:0
          },
          userInfoData:getUserInfo(),
          loading:false,
          senData:{
            currentPage:100,
            pageSize:1,
            vo:{

            }
          },
          senDataList:{
            currentPage:1,
            pageSize:5,
            vo:{

            }
          }
        }
      },
      mounted(){

        this.getFn()

      },
      methods:{
        getFn(){
          this.getWallet()
          this.getRewardInfo()
          this.getCouponCountInfo()
          this.getPaymentList()
        },
        getWallet(){

          return postFindMywallet(this.userInfoData.userToken).then(res =>{
              if(res.status ===200){
                this.infoData.balance = res.data.mywallet.balance
              }else{
                this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)|| '无法获取服务端数据'))
              }
          })
        },
        getRewardInfo(){
          return postFindAflcReward(this.senData).then(res => {
           if(res.status === 200){
             this.infoData.rewardMax = res.data.list[0].rewardMax
           }else{
             this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)|| '无法获取服务端数据'))
           }
          })
        },
        getCouponCountInfo(){
          return getCouponCount().then(res => {
              if(res.status ===200){
                this.infoData.nums = res.data
              }else{
                this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err) || '无法获取服务端数据'))
              }

          })
        },
        getPaymentList(){
          return postFindSOPayment(this.senDataList).then(res =>{
            if(res.status ===200){
              this.dataset = res.data.list
              this.total = res.data.totalPage
            }else{
              this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)|| '无法获取服务端数据'))
            }
          })
        },
        getDbClick(){

        },
        clickDetails(row, event, column){
          this.$refs.multipleTable.toggleRowSelection(row)
        },
        getSelection(selection){
          this.selected = selection
        },
        gotoAllRecod(){
          this.$router.push({path: '/allRecod'})
        },
        gotoCoupon(){
          this.$router.push({path: '/coupon'})
        },
        gotoToPayCoupon(){
          this.$router.push({path: '/toPayCoupon'})
        },
        gotoCouponList(){
          this.$router.push({path: '/couponList'})
        },
        handlePageChange(obj) {
          this.senDataList.currentPage = obj.pageNum
          this.senDataList.pageSize = obj.pageSize
        },
      }
    }
</script>

<style lang="scss">
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .orderManageClass-lll{
    background: rgb(242,242,242);
    /*margin: 10px;*/
    .el-header {
      padding: 0 0 ;
      background-color: #fff;
      color: #333;
      height: 100% !important;
      margin: 10px;
      .headerClass{
        display: flex;
        ul:first-of-type{
          flex: 1;
          border-right: 2px dotted #ddd;
          margin-bottom: 8px;
          li{
            padding: 42px 40px 5px 40px;
            .liImg{
              text-align: center;
              vertical-align: middle;
              img{
                border-radius:50%;
                width: 128px;
                height: 128px;
              }
            }
            .liMessage{
              margin-top: 10px;
              span:first-of-type{
                color: rgb(67,67,67);
                font-size: 15px;
                font-weight: 600;
                padding-right: 20px;
              }
              span:last-of-type{
                color: rgb(127,188,215);
                border-bottom: 1px solid rgb(127,188,215);
                /*cursor: pointer;*/
              }
            }
            .liOther{
              padding-top: 10px;
              span:first-of-type{
                font-size: 14px;
                color: #999;

              }
              span:nth-of-type(2){
                color: rgb(67,67,67);
                font-size: 14px;
                font-weight: 600;
                padding: 0 20px 30px;
              }
              span.spanClass{
                color: rgb(127,188,215);
                border-bottom: 1px solid rgb(127,188,215);

              }
            }
          }
        }
        ul:nth-of-type(2),ul:nth-of-type(3),ul:nth-of-type(4){
          flex: 1;
          margin: 30px 0px 30px 0px;
          li{
            background: rgb(50,199,8);
            .liClass{
              vertical-align: middle;
              text-align: center;
              padding-top: 58px;
              .spanClass{
                /*display: inline-block;*/
                .svg{
                  width: 40px;
                  height: 30px;
                }
              }
              img{
                width: 32px;
                height: 32px;

              }
              p:first-of-type{
                color: #fff;
                font-size: 16px;

                padding-top: 20px;
              }
              p:nth-of-type(2){
                color: #fff;
                font-size: 36px;
                letter-spacing: 1px;
                padding-top: 20px;
              }
              p:nth-of-type(3){

                padding-bottom: 60px;
                color:rgb(228,236,11);
                font-size: 12px;
              }
            }

          }
        }
        ul:nth-of-type(2){
          margin-left: 30px;
          li{
            .liClass{
              p:last-of-type{
                padding-bottom: 75px;
              }
            }
          }
        }
        ul:nth-of-type(3){
          margin-right: 100px;
          margin-left: 100px;
          /*margin:30px 100px 30px 100px;*/
          li{
            background: #f9c52b;
            .liClass{
              p:last-of-type{
                padding-bottom: 91px;
              }
            }
          }
        }
        ul:nth-of-type(4){
          margin-right: 80px;
          li{
            background: #ec5a64;
            .liClass{
              p:last-of-type{
                padding-bottom: 75px;
                padding-bottom: 85px;
              }
            }
          }
        }
        ul:nth-of-type(2) li:hover,ul:nth-of-type(3) li:hover,ul:nth-of-type(4) li:hover {
          transform: 2s;
          box-shadow: 0 1px 1px rgba(0, 0, 0, .3);

        }
        ul:nth-of-type(3) li:hover,ul:nth-of-type(4) li:hover {
          cursor: pointer;
        }
        ul:nth-of-type(2) li:hover{
          .liClass{
            p:nth-of-type(3){
              cursor: pointer;
            }
          }
        }
      }

    }
    .el-main {
      background-color: #fff;
      color: #333;
      margin:0 10px 10px 10px;
      padding: 0 0 ;
      .mainClass{
        .accountBtn{
          margin: 40px 40px 10px 40px;
          ul{
            display: flex;
            li:first-of-type{
              flex: 1;
              text-align: left;
              color: #333;
              font-size: 18px;
              font-weight: 600;
            }
            li:last-of-type{
              flex: 1;
              text-align: right;
              color: #3b99f0;
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
        .info-table{
          margin: 0 40px 10px 40px;
          height: 100%;
          -ms-flex-positive: 1;
          flex-grow: 1;
          .el-select-dropdown__item.hover, .el-select-dropdown__item:hover, .el-table thead th, .el-table thead tr {
            background-color: #fafafa;
          }
          .el-table th>.cell{
            text-align: center;
            color: #333;

          }
          .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
            text-align: center;
          }
        }
      }
    }

    .info_tab_footer {
      padding-left: 20px;
      background: #fff;
      height: 40px;
      line-height: 40px;
      box-shadow: 0 -2px 2px rgba(0,0,0,.1);
      position: relative;
      z-index: 10;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .show_pager {
      float: right;
      line-height: 40px;
      height: 40px;
      overflow: hidden;
      margin-right: 40px;
    }
  }
</style>
