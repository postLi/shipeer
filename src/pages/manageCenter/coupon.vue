<template>
    <div class="orderManageClass-lll-cou" v-loading="loading">
      <el-container>
        <el-header>
          <div class="headerClass">
            <ul>
              <li>在线交易优惠金</li>
              <li>奖励上限：888.88元</li>
              <li>累计减免：<span>1888.88</span>元</li>
            </ul>
          </div>
        </el-header>
        <el-main>
          <div class="mainClass">
            <h4>减免记录：</h4>
            <searchTime @change="getSearchParam" :pfrecord="isPfrecord"></searchTime>

            <!--<div class="accountBtn">-->
              <!--<ul>-->
                <!--<li>近期交易</li>-->
                <!--<li @click="gotoAllRecod">查看全部交易记录</li>-->
              <!--</ul>-->
            <!--</div>-->
            <div class="info-table">
              <el-table
                ref="multipleTable"
                :data="dataset"
                border
                @row-dblclick="getDbClick"
                @row-click="clickDetails"
                @selection-change="getSelection"
                :default-sort = "{prop: 'id', order: 'ascending'}"
                style="width: 100%"

              >

                <el-table-column
                  fixed
                  sortable
                  prop="id"
                  label="序号"
                  width="128">
                  <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="id"
                  width="300"
                  label="订单编号">
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="serivceCode"
                  width="300"
                  label="服务类型">
                </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="carType"
                    width="300"
                    label="需求车型">
                  </el-table-column>
                  <!--<el-table-column-->
                    <!--fixed-->
                    <!--sortable-->
                    <!--prop="tradeTypeName"-->
                    <!--width="150"-->
                    <!--label="出发地">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    fixed
                    sortable
                    prop="totalAmount"
                    width="300"
                    label="订单金额">
                  </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="rewardSum"
                  width="300"
                  label="减免金额">
                </el-table-column>

                <!--<el-table-column-->
                  <!--fixed-->
                  <!--sortable-->
                  <!--prop="totalAmount"-->
                  <!--width="150"-->
                  <!--label="减免时间">-->
                <!--</el-table-column>-->
              </el-table>
            </div>
          </div>
        </el-main>

      </el-container>
    </div>
</template>

<script>

  import {postFindMywallet,postFindAflcReward,getCouponCount,postFindSOPayment,postFlcReward} from '@/api/concentrateAxios/manageCenter'
  import {getUserInfo} from '@/utils/auth'
  import searchTime from './components/searchTime'

    export default {
      data(){
        return{
          isPfrecord:false,
          dataset:[],
          datasetPrice:[],
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
              // carInfo:'',
              // incomeExpendType:'',
              // tradeEndTime:'',
              // tradeStartTime:'',
            }
          }
        }
      },
      components:{
        searchTime
      },
      mounted(){

        this.getPaymentList()

      },
      methods:{
        //
        // getPayment(){
        //   return postFlcReward(this.senData).then(res =>{
        //     console.log(res,'优惠券')
        //     // this.datasetPrice = res.list
        //   }).catch(err => {
        //     this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
        //   })
        // },
        getPaymentList(){
          return postFlcReward(this.senDataList).then(res =>{
            this.dataset = res.data.list[0].aflcUserRewardList
            console.log( res.data.list[0].aflcUserRewardList);
          })
        },
        fetchAllList(){
          this.getPaymentList()
        },
        getSearchParam(obj){
          this.senDataList.vo = Object.assign(this.senDataList.vo, obj)
          this.fetchAllList()
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
        }
      }
    }
</script>

<style lang="scss">
  .orderManageClass-lll-cou{
    background: rgb(242,242,242);
    h4{
      margin: 40px 0 15px 40px;
    }
    .el-header {
      padding: 0 0 ;
      background-color: #fff;
      color: #333;
      height: 100% !important;
      margin: 0 10px 0 10px;
      .headerClass{
        display: inline-block;
        padding: 25px 0 40px 40px;
        ul{
          display: flex;
          li:first-of-type{
            background: rgb(250,214,107);
            font-size: 36px;
            color: #333333;
            padding: 58px 60px 57px 70px;
            font-weight: 600;
          }
          li:nth-of-type(2){
            background: rgb(249,197,43);
            font-size: 26px;
            color: #666;
            padding: 58px 60px 57px 70px;
          }
          li:nth-of-type(3){
            background: rgb(249,197,43);
            font-size: 26px;
            color: #666;
            padding: 58px 60px 57px 70px;
            span{
              color: #3b99f0;
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
  }
</style>
