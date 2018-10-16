<template>
  <div class="orderManageClass-lll-couList" v-loading="loading">
    <el-container>
      <el-header>
        <div class="headerClass">
          <el-form :model="senData">
            <el-form-item label="">
              <el-input placeholder="请输入优惠券码" v-model="senData.couponNum" clearable></el-input>
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
                    tooltip-effect="dark"
                    :default-sort="{prop: 'id', order: 'ascending'}"
                    style="width: 100%"
                    stripe>

                    <el-table-column
                      fixed
                      sortable
                      prop="id"
                      label="序号"
                      width="80">
                      <template slot-scope="scope">{{ ((senDataListO.currentPage - 1)*senDataListO.pageSize) +
                        scope.$index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      width="150"
                      label="优惠券">
                      <template slot-scope="scope">
                        <div class="priceClass">
                          <p>￥{{scope.row.deduction?scope.row.deduction:0.00}}</p>
                          <p>满{{scope.row.SatisfyTheCondition?scope.row.deduction:0.00}}可用</p>
                        </div>
                      </template>
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
                      width="128"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="deduction"
                      width="150"
                      label="满减金额">
                      <template slot-scope="scope">
                        ￥{{parseFloat(scope.row.deduction).toFixed(2)}}
                      </template>
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
                    tooltip-effect="dark"
                    :default-sort="{prop: 'id', order: 'ascending'}"
                    style="width: 100%"
                    stripe>

                    <el-table-column
                      fixed
                      sortable
                      prop="id"
                      label="序号"
                      width="80">
                      <template slot-scope="scope">{{ ((senDataListS.currentPage - 1)*senDataListS.pageSize) +
                        scope.$index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      width="150"
                      label="优惠券">
                      <template slot-scope="scope">
                        <div class="priceClass">
                          <p>￥{{scope.row.deduction?scope.row.deduction:0.00}}</p>
                          <p>满{{scope.row.SatisfyTheCondition?scope.row.deduction:0}}可用</p>
                        </div>
                      </template>
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
                      width="118"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="deduction"
                      width="150"
                      label="满减金额">
                      <template slot-scope="scope">
                        ￥{{parseFloat(scope.row.deduction).toFixed(2)}}
                      </template>
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
                    tooltip-effect="dark"
                    :default-sort="{prop: 'id', order: 'ascending'}"
                    style="width: 100%"
                    stripe>

                    <el-table-column
                      fixed
                      sortable
                      prop="id"
                      label="序号"
                      width="80">
                      <template slot-scope="scope">{{ ((senDataListThird.currentPage - 1)*senDataListThird.pageSize) +
                        scope.$index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable

                      width="150"
                      label="优惠券">
                      <template slot-scope="scope">
                        <div class="priceClass">
                          <p>￥{{scope.row.deduction?scope.row.deduction:0.00}}</p>
                          <p>满{{scope.row.SatisfyTheCondition?scope.row.deduction:0}}可用</p>
                        </div>
                      </template>
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
                      width="118"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="deduction"
                      width="150"
                      label="满减金额">
                      <template slot-scope="scope">
                        ￥{{parseFloat(scope.row.deduction).toFixed(2)}}
                      </template>
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
    <div class="info_tab_footer" ref="footer">
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange"/>
      </div>
    </div>
  </div>
</template>

<script>

  import {postAflcCouponUse, postExchange} from '@/api/concentrateAxios/manageCenter'
  import {getUserInfo} from '@/utils/auth'
  import searchTime from './components/searchTime'
  import Pager from '@/components/Pagination/index'

  export default {
    data() {
      return {
        total:0,
        activeName: 'first',
        datasetOne: [],
        datasetSecond: [],
        datasetThird: [],
        selected: [],
        userInfoData: getUserInfo(),
        loading: false,
        senData: {
          "aflcCoupon": {},
          "couponNum": ""
        },
        senDataListO: {
          currentPage: 1,
          pageSize: 10,
          vo: {
            couponStatus: 'AF046401'
          }
        },
        senDataListS: {
          currentPage: 1,
          pageSize: 10,
          vo: {
            couponStatus: 'AF046403'
          }
        },
        senDataListThird: {
          currentPage: 1,
          pageSize: 10,
          vo: {
            couponStatus: 'AF046404'
          }
        },
      }
    },
    components: {
      searchTime,
      Pager
    },
    mounted() {

      this.fetchAllList()

    },
    methods: {
      onsubmit() {
        if(!this.senData.couponNum){
          this.$message.info('请输入优惠券码')
          return false
        }
        this.loading = true
        return postExchange(this.senData).then(res => {
          if(res.status ===200){
            this.fetchAllList()
            this.$message.success(res.data)
            this.loading = false
          }else{
            this.$message.error('错误：' + (res.text || res.errorInfo || '无法获取服务端数据~' || res.data ))
            this.loading = false
          }
          // if(res.status)

        })
      },
      getPaymentListO() {
        this.loading = true
        return postAflcCouponUse(this.senDataListO).then(res => {
          if (res.status === 200) {
            this.datasetOne = res.data.list
            this.total = res.data.totalCount
            this.loading = false
          } else {
            this.$message.error('错误：' + (err.text || err.errorInfo || '无法获取服务端数据~' || err.data ))
            this.loading = false
          }
        })
      },
      getPaymentListS() {
        this.loading = true
        return postAflcCouponUse(this.senDataListS).then(res => {
          if (res.status === 200) {
            this.datasetSecond = res.data.list
            this.loading = false
          } else {
            this.$message.error('错误：' + (err.text || err.errorInfo || '无法获取服务端数据~' || err.data ))
            this.loading = false
          }
        })
      },
      getPaymentListT() {
        this.loading = true
        return postAflcCouponUse(this.senDataListThird).then(res => {
          if (res.status === 200) {
            this.datasetThird = res.data.list
            this.loading = false
          } else {
            this.$message.error('错误：' + (err.text || err.errorInfo || '无法获取服务端数据~' || err.data ))
            this.loading = false
          }
        })
      },
      fetchAllList() {
        this.getPaymentListO()
        this.getPaymentListS()
        this.getPaymentListT()
      },
      gotoAllRecod() {
        this.$router.push({path: '/allRecod'})
      },
      handlePageChange(obj) {
        this.senDataList.currentPage = obj.pageNum
        this.senDataList.pageSize = obj.pageSize
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss">

  .orderManageClass-lll-couList {
    background: #fff;
    margin: 10px 0 10px 10px;
    height:100%;
    width: calc(100% - 20px);
    /*height: calc(100% - 86px);*/
    .el-header {
      padding: 0 0;
      background-color: #fff;
      color: #333;
      height: 100% !important;
      /*margin: 0 px 0 10px;*/
      .headerClass {
        display: flex;
        padding: 25px 0 0 40px;
        .btnClass {
          margin-left: 40px;
        }

      }

    }
    .el-main {
      background-color: #fff;
      color: #333;
      /*margin:0 10px 10px 10px;*/
      padding: 0 0;
      .mainClass {
        .el-tabs__nav-wrap::after {
          background-color: #fff;
        }
        .el-tabs__nav-scroll {
          margin-left: 40px;
          .el-tabs__nav.is-top{
            .el-tabs__active-bar{
              background-color: #2fb301;
            }
            .el-tabs__item.is-top.is-active{
              color: #2fb301;
            }

          }
          .el-tabs__item:hover{
            color: #2fb301;
          }
        }
        .tab_info {
          height: 100%;
          -ms-flex-positive: 1;
          flex-grow: 1;
          margin: 0 40px 10px 40px;
          .info-table {
            /*margin: 0 40px 10px 40px;*/
            width: 100%;
            height: calc(100% - 38px);
            .el-select-dropdown__item.hover, .el-select-dropdown__item:hover, .el-table thead th, .el-table thead tr {
              background-color: #fafafa;
            }
            .el-table th > .cell {
              text-align: center;
              color: #333;

            }
            .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
              text-align: center;
            }
            .el-table__row{
              .cell{
                .priceClass{
                  display: inline-block;
                  background: rgb(255,90,70);
                  padding: 10px 12px;
                  color: rgb(255,210,203);
                  position: relative;
                  border-radius: 4px;
                  p:first-of-type{
                    font-size: 16px;
                    color: rgb(255,228,203);
                  }
                  p:last-of-type{
                    font-size: 12px;
                  }
                }
                .priceClass:before{
                  content: '';
                  display: block;
                  width: 8px;
                  height: 8px;
                  border: 1px solid #fff;
                  border-radius: 50px;
                  background: #fff;
                  position: absolute;
                  top:50%;
                  left:-4px;
                }

              }
            }
          }
        }

      }
    }
    .info_tab_footer {
      padding-left: 20px;
      background: #fff;
      height: 40px;
      line-height: 40px;
      box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
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
