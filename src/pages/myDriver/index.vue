<template>
	<div class="driver-lll">
    <Search @change="getSearchParam"></Search>
    <div class="add-coll">
      <el-button type="success" plain size="mini" @click="addColl">添加收藏司机</el-button>
    </div>
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
         style="width: 100%"
         header-align="center">
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
           width="100">
           <template slot-scope="scope">{{ ((searchForms.currentPage - 1)*searchForms.pageSize) + scope.$index + 1 }}</template>
         </el-table-column>
         <el-table-column
         fixed
         sortable
         prop="abnormalNo"
         width="200"
         label="车牌号">
       </el-table-column>
         <el-table-column
           fixed
           sortable
           prop="abnormalNo"
           width="250"
           label="车型">
         </el-table-column>
         <el-table-column
           fixed
           sortable
           prop="abnormalNo"
           width="250"
           label="司机">
         </el-table-column>
         <el-table-column
           fixed
           sortable
           prop="abnormalNo"
           width="250"
           label="联系电话">
         </el-table-column>
         <el-table-column
           fixed
           sortable
           prop="abnormalNo"
           width="250"
           label="当前状态">
         </el-table-column>
         <el-table-column
           fixed
           sortable
           prop="abnormalNo"
           width="250"
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
         dataset:[]

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
 .driver-lll{
   padding-top: 10px;
   .info-table{
     /*display: flex;*/
     padding-top: 20px;
     width: 100%;
     height: calc(100% - 38px);
     tr{
       .cell{
         text-align: center;
         color: #333;
       }
     }
   }
   .page{
     padding-top: 20px;
   }
   /*display: flex;*/
 }
</style>
