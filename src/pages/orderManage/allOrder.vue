<template>
  <div class="table-lll">
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
        height="100%"
        tooltip-effect="dark"
        :default-sort = "{prop: 'id', order: 'ascending'}"
        style="width: 100%">
        <el-table-column
          fixed
          sortable
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="id"
          label="序号"
          width="90">
          <template slot-scope="scope"></template>
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="150"
          label="订单号">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="130"
          label="城市">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="120"
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
          prop="abnormalNo"
          width="160"
          label="用车时间">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="120"
          label="付款状态">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="120"
          label="提货地">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="120"
          label="目的地">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="120"
          label="车牌号">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
          width="100"
          label="司机">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="abnormalNo"
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <div class="block">
        <!--<span class="demonstration">调整每页显示条数</span>-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
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
  export default{
    data(){
      return {
        currentPage3: 5,
        dataset:[
          {data:'',num:1}
        ]

      }
    },
    components:{
      Search
    },
    methods:{
      getSearchParam(obj){

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

      }

    }
    .page{
      padding-top: 20px;
    }
    /*display: flex;*/
  }
</style>

