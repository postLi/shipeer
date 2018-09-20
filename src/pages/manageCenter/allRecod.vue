<template>
  <div class="table-lll-al">
    <h4>交易记录查询：</h4>
    <Search @change="getSearchParam"></Search>
    <div class="info-table">
      <el-table
        ref="multipleTable"
        :data="dataset"
        stripe
        border
        @row-dblclick="getDbClick"
        @row-click="clickDetails"
        @selection-change="getSelection"
        tooltip-effect="dark"
        :default-sort = "{prop: 'id', order: 'ascending'}"
        style="width: 100%">

        <el-table-column
          fixed
          sortable
          prop="id"
          label="序号"
          width="80">
          <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1 }}</template>
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
          prop="totalAmount"
          width="120"
          label="金额">
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
    <div class="page">
      <!--<div class="block">-->
        <!--&lt;!&ndash;<span class="demonstration">调整每页显示条数</span>&ndash;&gt;-->
        <!--<el-pagination-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page.sync="currentPage2"-->
          <!--:page-sizes="[100, 200, 300, 400]"-->
          <!--:page-size="100"-->
          <!--layout="sizes, prev, pager, next"-->
          <!--:total="1000">-->
        <!--</el-pagination>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import Search from './components/search'
  import {postFindSOPayment} from '@/api/concentrateAxios/manageCenter'
  import {pickerOptions2} from '@/utils/'
  export default{
    data(){
      return {
        currentPage3: 5,
        dataset:[

        ],
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
      Search
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(row) {
        this.$router.push({path: '/orderRouter/payFoy'})
        console.log(row);
      },
      handleClick1(row) {
        this.$router.push({path: '/orderRouter/getPickUp'})
        console.log(row);
      },
      addColl(){
        this.$message('添加收藏司机');
      },
      getDbClick(){

      },
      clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection){
        this.selected = selection
      }
    }

  }
</script>

<style lang="scss">
  .table-lll-al{
    margin: 10px;
    background: #fff;
    h4{
      margin: 40px 0 15px 40px;
    }
    .info-table{
      /*display: flex;*/
      /*padding-top: 20px;*/
        padding: 0 10px 0 40px;
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
    .page{
      padding-top: 20px;
    }
    /*display: flex;*/
  }
</style>

