<template>
    <div class="orderManageClass-lll-couList" v-loading="loading">
      <el-container>
        <el-header>
          <div class="headerClass">
            <el-form :model="senData">
              <el-form-item label="">
                <el-input placeholder="请输入优惠券码" v-model="senData.couponNum"></el-input>
              </el-form-item>
            </el-form>
            <div class="btnClass">
              <el-button type="success" @click="onsubmit()">兑换</el-button>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="mainClass">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="可用" name="first">
                <div class="tab_info">
                  <div class="info-table">
                    <!--<el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>-->

                    <el-table
                      ref="multipleTable"
                      :data="datasetOne"
                      border
                      @row-dblclick="getDbClick"
                      @row-click="clickDetails"
                      @selection-change="getSelection"

                      tooltip-effect="dark"
                      :default-sort = "{prop: 'id', order: 'ascending'}"
                      style="width: 100%"
                      stripe>

                      <el-table-column
                        fixed
                        sortable
                        prop="id"
                        label="序号"
                        width="80">
                        <template slot-scope="scope">{{ ((senDataListO.currentPage - 1)*senDataListO.pageSize) + scope.$index + 1 }}</template>
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="orderSerial"
                        width="150"
                        label="优惠券">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="couponName"
                        width="150"
                        label="名称">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="couponTypeName"
                        width="150"
                        label="类型">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="deduction"
                        width="150"
                        label="满减金额">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="SatisfyTheCondition"
                        width="150"
                        label="满减条件">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="discount"
                        width="150"
                        label="折扣">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="maximumDeduction"
                        width="150"
                        label="最高折扣">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="serivceCode"
                        width="130"
                        label="适用服务">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="useCarType"
                        width="130"
                        label="限定车型">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="expiryDate"
                        width="130"
                        label="有效期">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="areaName"
                        width="130"
                        label="使用区域">
                      </el-table-column>

                    </el-table>
                  </div>
                </div>

              </el-tab-pane>
              <el-tab-pane label="已使用" name="second">
                <div class="tab_info">
                  <div class="info-table">
                    <el-table
                      ref="multipleTable"
                      :data="datasetSecond"
                      border
                      @row-dblclick="getDbClick"
                      @row-click="clickDetails"
                      @selection-change="getSelection"

                      tooltip-effect="dark"
                      :default-sort = "{prop: 'id', order: 'ascending'}"
                      style="width: 100%"
                      stripe>

                      <el-table-column
                        fixed
                        sortable
                        prop="id"
                        label="序号"
                        width="80">
                        <template slot-scope="scope">{{ ((senDataListS.currentPage - 1)*senDataListS.pageSize) + scope.$index + 1 }}</template>
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="orderSerial"
                        width="150"
                        label="优惠券">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="couponName"
                        width="150"
                        label="名称">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="couponTypeName"
                        width="150"
                        label="类型">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="deduction"
                        width="150"
                        label="满减金额">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="SatisfyTheCondition"
                        width="150"
                        label="满减条件">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="discount"
                        width="150"
                        label="折扣">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="maximumDeduction"
                        width="150"
                        label="最高折扣">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="serivceCode"
                        width="130"
                        label="适用服务">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="useCarType"
                        width="130"
                        label="限定车型">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="expiryDate"
                        width="130"
                        label="有效期">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="areaName"
                        width="130"
                        label="使用区域">
                      </el-table-column>

                    </el-table>

                  </div>
                </div>

              </el-tab-pane>
              <el-tab-pane label="已过期" name="third">
                <div class="tab_info">
                  <div class="info-table">
                    <el-table
                      ref="multipleTable"
                      :data="datasetThird"
                      border
                      @row-dblclick="getDbClick"
                      @row-click="clickDetails"
                      @selection-change="getSelection"

                      tooltip-effect="dark"
                      :default-sort = "{prop: 'id', order: 'ascending'}"
                      style="width: 100%"
                      stripe>

                      <el-table-column
                        fixed
                        sortable
                        prop="id"
                        label="序号"
                        width="80">
                        <template slot-scope="scope">{{ ((senDataListThird.currentPage - 1)*senDataListThird.pageSize) + scope.$index + 1 }}</template>
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="orderSerial"
                        width="150"
                        label="优惠券">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="couponName"
                        width="150"
                        label="名称">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="couponTypeName"
                        width="150"
                        label="类型">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="deduction"
                        width="150"
                        label="满减金额">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="SatisfyTheCondition"
                        width="150"
                        label="满减条件">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="discount"
                        width="150"
                        label="折扣">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="maximumDeduction"
                        width="150"
                        label="最高折扣">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="serivceCode"
                        width="130"
                        label="适用服务">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="useCarType"
                        width="130"
                        label="限定车型">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="expiryDate"
                        width="130"
                        label="有效期">
                      </el-table-column>
                      <el-table-column
                        fixed
                        sortable
                        prop="areaName"
                        width="130"
                        label="使用区域">
                      </el-table-column>

                    </el-table>
                  </div>
                </div>

              </el-tab-pane>

            </el-tabs>

          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>

  import {postAflcCouponUse,postExchange} from '@/api/concentrateAxios/manageCenter'
  import {getUserInfo} from '@/utils/auth'
  import searchTime from './components/searchTime'

    export default {
      data(){
        return{
          activeName: 'first',
          datasetOne:[],
          datasetSecond:[],
          datasetThird:[],
          selected:[],
          userInfoData:getUserInfo(),
          loading:false,
          senData:{
            couponNum:''
          },
          senDataListO:{
            currentPage:1,
            pageSize:10,
            vo:{
              couponStatus:'AF046401'
            }
          },
          senDataListS:{
            currentPage:1,
            pageSize:10,
            vo:{
              couponStatus:'AF046403'
            }
          },
          senDataListThird:{
            currentPage:1,
            pageSize:10,
            vo:{
              couponStatus:'AF046404'
            }
          },
        }
      },
      components:{
        searchTime
      },
      mounted(){

        this.fetchAllList()

      },
      methods:{
        onsubmit(){
          return postExchange(this.senData.couponNum).then(res =>{
            this.fetchAllList()
            // console.log(res,);
            // this.dataset = res.list
          }).catch(err => {
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
          })
        },
        getPaymentListO(){
          return postAflcCouponUse(this.senDataListO).then(res =>{
            if(res.status === 200){
              this.datasetOne = res.data.list
              console.log(this.datasetOne,'重庆区');
            }else{

            }
          }).catch(err => {
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
          })
        },
        getPaymentListS(){
          return postAflcCouponUse(this.senDataListS).then(res =>{
            if(res.status === 200){
              this.datasetSecond = res.data.list
            }else{
            }
          }).catch(err => {
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
          })
        },
        getPaymentListT(){
          return postAflcCouponUse(this.senDataListThird).then(res =>{
            if(res.status === 200){
              this.datasetThird = res.data.list
            }else{
            }
          }).catch(err => {
            this.$message.error('错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
          })
        },
        fetchAllList(){
          this.getPaymentListO()
          this.getPaymentListS()
          this.getPaymentListT()
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

  .orderManageClass-lll-couList{
    background: rgb(242,242,242);
    margin-right: 10px;
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
      /*margin:0 10px 10px 10px;*/
      padding: 0 0 ;
      .mainClass{
        .el-tabs__nav-scroll{
          margin-left: 40px;
        }
        .tab_info{
          height: 100%;
          -ms-flex-positive: 1;
          flex-grow: 1;
          margin: 0 40px 10px 40px;
          .info-table{
            /*margin: 0 40px 10px 40px;*/
            width: 100%;
            height: calc(100% - 38px);
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
  }
</style>
