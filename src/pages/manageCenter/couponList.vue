<template>
    <div class="orderManageClass-lll" v-loading="loading">
      <el-container>
        <el-header>
          <div class="headerClass">
            <el-form>
              <el-form-item label="">
                <el-input placeholder="请输入优惠券码"></el-input>
              </el-form-item>
            </el-form>
            <div class="btnClass">
              <el-button type="success">兑换</el-button>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="mainClass">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="可用" name="first">
                <div class="info-table">
                  <el-table
                    ref="multipleTable"
                    :data="dataset"
                    border
                    @row-dblclick="getDbClick"
                    @row-click="clickDetails"
                    @selection-change="getSelection"
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    style="width: 100%">

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
                      prop="orderSerial"
                      width="300"
                      label="交易流水号">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="incomeExpendTypeName"
                      width="300"
                      label="交易方式">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="payWayName"
                      width="300"
                      label="金额">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="tradeTypeName"
                      width="300"
                      label="充值后余额">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="totalAmount"
                      width="300"
                      label="订单完成时间">
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已使用" name="second">
                <div class="info-table">
                  <el-table
                    ref="multipleTable"
                    :data="dataset"
                    border
                    @row-dblclick="getDbClick"
                    @row-click="clickDetails"
                    @selection-change="getSelection"
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    style="width: 100%">

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
                      prop="orderSerial"
                      width="300"
                      label="交易流水号">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="incomeExpendTypeName"
                      width="300"
                      label="交易方式">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="payWayName"
                      width="300"
                      label="金额">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="tradeTypeName"
                      width="300"
                      label="充值后余额">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="totalAmount"
                      width="300"
                      label="订单完成时间">
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已过期" name="third">
                <div class="info-table">
                  <el-table
                    ref="multipleTable"
                    :data="dataset"
                    border
                    @row-dblclick="getDbClick"
                    @row-click="clickDetails"
                    @selection-change="getSelection"
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    style="width: 100%">

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
                      prop="orderSerial"
                      width="300"
                      label="交易流水号">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="incomeExpendTypeName"
                      width="300"
                      label="交易方式">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="payWayName"
                      width="300"
                      label="金额">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="tradeTypeName"
                      width="300"
                      label="充值后余额">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="totalAmount"
                      width="300"
                      label="订单完成时间">
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>

            </el-tabs>

          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>

  import {postFindMywallet,postFindAflcReward,getCouponCount,postFindSOPayment} from '@/api/concentrateAxios/manageCenter'
  import {getUserInfo} from '@/utils/auth'
  import searchTime from './components/searchTime'

    export default {
      data(){
        return{
          activeName: 'first',
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
              carInfo:'',
              incomeExpendType:'',
              tradeEndTime:'',
              tradeStartTime:'',
              // "accountId": "string",
              // "carInfo": "string",
              // "incomeExpendType": "string",
              // "tradeEndTime": "2018-09-20T07:05:11.259Z",
              // "tradeStartTime": "2018-09-20T07:05:11.259Z"
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
        getPaymentList(){
          return postFindSOPayment(this.senDataList).then(res =>{
            this.dataset = res.list
          }).catch(err => {
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
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
        },
        handleClick(tab, event) {
          console.log(tab, event);
        }
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

    .el-header {
      padding: 0 0 ;
      background-color: #fff;
      color: #333;
      height: 100% !important;
      margin: 0 10px 0 10px;
      .headerClass{
        display: flex;
        padding: 25px 0 0 40px;
        .btnClass{
          margin-left: 40px;
        }

      }

    }
    .el-main {
      background-color: #fff;
      color: #333;
      margin:0 10px 10px 10px;
      padding: 0 0 ;
      .mainClass{

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
