<template>
  <div class="table-lll-all" v-loading="loading">
    <h4>交易记录查询：</h4>
    <Search @change="getSearchParam"></Search>
    <div class="info-table">
      <el-table
        ref="multipleTable"
        :data="dataset"
        stripe
        border
        tooltip-effect="dark"
        :default-sort="{prop: 'id', order: 'ascending'}"
        style="width: 100%">

        <el-table-column
          fixed
          sortable
          prop="id"
          label="序号"
          width="80">
          <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="orderSerial"
          width="125"
          label="交易流水号">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="orderFinishTime"
          width="160"
          label="订单完成时间">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="incomeExpendTypeName"
          width="120"
          label="收支类型">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="payWayName"
          width="110"
          label="交易方式">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="tradeTypeName"
          width="110"
          label="交易类型">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="orderTypeName"
          width="110"
          label="服务类型">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="startLocation"
          width="190"
          label="出发地">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="endLocation"
          width="192"
          label="目的地">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          width="120"
          label="金额">
          <template slot-scope="scope">
            ￥{{parseFloat(scope.row.totalAmount).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="carNumber"
          width="100"
          label="车牌号">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="driverName"
          width="120"
          label="司机">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="driverMobile"
          width="120"
          label="联系电话">
        </el-table-column>
      </el-table>
    </div>
    <div class="info_tab_footer" ref="footer">
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './components/search'
  import {postFindSOPayment} from '@/api/concentrateAxios/manageCenter'
  import {pickerOptions2} from '@/utils/'
  import Pager from '@/components/Pagination/index'

  export default {
    data() {
      return {
        total: 0,
        loading: false,
        currentPage3: 5,
        dataset: [],
        senDataList: {
          currentPage: 1,
          pageSize: 5,
          vo: {
            carInfo: '',
            incomeExpendType: '',
            tradeEndTime: '',
            tradeStartTime: '',
            // "accountId": "string",
            // "carInfo": "string",
            // "incomeExpendType": "string",
            // "tradeEndTime": "2018-09-20T07:05:11.259Z",
            // "tradeStartTime": "2018-09-20T07:05:11.259Z"
          }
        }

      }
    },
    components: {
      Search,
      Pager
    },
    mounted() {
      this.getPaymentList()
    },
    methods: {
      getPaymentList() {
        this.loading = true
        return postFindSOPayment(this.senDataList).then(res => {
          if (res.status === 200) {
            this.dataset = res.data.list
            this.total = res.data.totalCount
            this.loading = false
          } else {
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
          }

        })
      },
      fetchAllList() {
        this.getPaymentList()
      },
      getSearchParam(obj) {
        this.senDataList.vo = Object.assign(this.senDataList.vo, obj)
        this.fetchAllList()
      },
      handlePageChange(obj) {
        this.senDataList.currentPage = obj.pageNum
        this.senDataList.pageSize = obj.pageSize
      }
    }

  }
</script>

<style lang="scss">
  .table-lll-all {
    margin: 10px;
    background: #fff;
    height: calc(100% - 86px);
    h4 {
      margin: 0px 0 15px 40px;
      padding-top: 40px;
    }
    .info-table {
      /*display: flex;*/
      /*padding-top: 20px;*/
      padding: 0 10px 0 40px;
      height: 100%;
      -ms-flex-positive: 1;
      flex-grow: 1;
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

