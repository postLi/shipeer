<template>
	<div class="driver-lll" >
    <Search @change="getSearchParam"></Search>
    <div class="add-coll">
      <el-button type="success" plain size="mini" @click="addCollDriver">添加收藏司机</el-button>
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

          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="收藏司机"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :model="dialogFn" ref="dialog" :rules="rules">
        <el-form-item label="手机号" prop="driverMobile">
          <el-input placeholder="请输入手机号" :maxlength="11" v-model="dialogFn.driverMobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubForm('dialog')">保 存</el-button>
         <el-button @click="centerDialogVisible = false">取 消</el-button>

  </span>
    </el-dialog>

  </div>
</template>

<script>
   import Search from './components/search'
   import {postDriverList,postDriver} from '@/api/concentrateAxios/myDriver'
   import {REGEX} from '../../utils/valiRegex'
 export default{
     data(){
       return {
         // loading : false,
         centerDialogVisible : false,
         currentPage3: 5,
         dataset:[],
         dialogFn:{
           driverMobile:''
         },
         senDataList:{
           currentPage:1,
           pageSize:5,
           vo:{

           }
         },
         rules:{
           driverMobile:[
             {message: "请输入正确手机号码", pattern: REGEX.MOBILE, trigger: 'blur',}
           ]
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
     onSubForm(dialog){
       this.$refs[dialog].validate(valid => {
         if (valid) {
           return postDriver(this.dialogFn.driverMobile).then(res => {
             this.$message.success('收藏成功~');
             this.centerDialogVisible = false
             this.fetchAllList()

           }).catch(err => {
             this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
           })
         }else{
           return false
         }
       })

   },
     addCollDriver(){
      this.centerDialogVisible = true
      // return postDriver
    },
     getPaymentList(){
       return postDriverList(this.senDataList).then(res =>{
         // console.log(res);
         this.dataset = res.data.list
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
       console.log(row);
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
   margin: 10px;
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
   .el-dialog__wrapper{
     .el-dialog{
       margin-top: 30vh;
       .el-dialog__body{
         .el-form{
           .el-form-item{
             display: flex;
           }
         }
       }
     }

   }
   .page{
     padding-top: 20px;
   }
   /*display: flex;*/
 }
</style>
