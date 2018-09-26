<template>
  <div class="table-lll" ref="getTableWH">
    <Search @change="getSearchParam" ref="getTop"></Search>
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
        :style="{'width': getBodyWidth + 'px'}"


      >
        <!--:height="heightComputer"-->
        <el-table-column
          fixed
          sortable
          prop="id"
          label="序号"
          width="90">
          <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="orderSerial"
          width="150"
          label="订单号">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="belongCityName"
          width="130"
          label="城市">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="carType"
          width="110"
          label="需求车型">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="120"
          label="运费总额">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="useCarTime"
          width="160"
          label="用车时间">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="payStatus"
          width="110"
          label="订单状态">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="parentStatus"
          width="110"
          label="付款状态">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="110"
          label="提货地">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="110"
          label="目的地">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="carNumber"
          width="110"
          label="车牌号">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="driverName"
          width="100"
          label="司机">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="mobile"
          width="130"
          label="司机联系电话">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleClick1(scope.row)" type="text" size="small">派单中</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page" ref="footer">
      <div class="block">
        <!--<span class="demonstration">调整每页显示条数</span>-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"

          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './components/search'
  import {postMyOrderList} from '@/api/concentrateAxios/orderManage'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        height:0,
        topHeight:0,
        footer:0,
        currentPage3: 5,
        dataset:[

        ],
        senDataList:{
          currentPage:1,
          pageSize:5,
          status:''
        }

      }
    },
    computed:{
      ...mapGetters(['getBodyWidth',]),
      heightComputer: function() {
        return this.height  - this.topHeight - this.footer;
      },
    },
    components:{
      Search
    },
    mounted(){
      this.getPaymentList()
      this.$nextTick(()=>{
        this.topHeight =  this.$refs.getTop.clientHeight;
        this.height = this.$refs.getTableWH.clientHeight;
        this.footer = this.$refs.footer.clientHeight;
      })
      window.addEventListener("resize", ()=> {
        this.topHeight =  this.$refs.getTop.clientHeight;
        this.height = this.$refs.getTableWH.clientHeight;
        this.footer = this.$refs.footer.clientHeight;

      });
    },
    methods:{
      getPaymentList(){
        return postMyOrderList(this.senDataList.currentPage,this.senDataList.pageSize,this.senDataList.status).then(res =>{
          this.dataset = res.data.list
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
        this.$router.push({path: '/orderRouter/evaluateDriver'})
        // this.$router.push({path: '/orderRouter/payFoy'})
        // console.log(row);
      },
      handleClick1(row) {
        this.$router.push({path: '/orderRouter/unloadOrder'})
        // this.$router.push({path: '/orderRouter/getPickUp'})
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
      },

    }

  }
</script>

<style lang="scss">
  .table-lll{
    margin-top: 10px;
    background: #fff;
    .info-table{
      /*display: flex;*/
      /*padding-top: 20px;*/
        padding: 10px 10px 40px;
        height: 100%;
        -ms-flex-positive: 1;
        flex-grow: 1;
      .el-select-dropdown__item.hover, .el-select-dropdown__item:hover, .el-table thead th, .el-table thead tr {
        background-color: #fafafa;
      }
      .el-table th>.cell{
        text-align: center;
        color: #333;
        .el-button--text{
          border-bottom: 1px solid #409EFF;
        }

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

