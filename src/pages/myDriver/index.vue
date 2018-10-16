<template>
  <div class="driver-lll-my" v-loading="loading">
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
        height="100%"
        tooltip-effect="dark"
        :default-sort="{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        header-align="center">

        <el-table-column
          fixed
          sortable
          prop="id"
          label="序号"
          width="100">
          <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="carNumber"
          width="200"
          label="车牌号">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="carTypeName"
          width="250"
          label="车型">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="driverName"
          width="250"
          label="司机">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="driverPhone"
          width="250"
          label="联系电话">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="isFreeName"
          width="250"
          label="当前状态">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop=""
          width="250"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="收藏司机"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :model="dialogFn" ref="dialog" :rules="rules">
        <el-form-item label="手机号" prop="driverMobile">
          <el-input placeholder="请输入手机号" :maxlength="11" v-model="dialogFn.driverMobile" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubForm('dialog')">保 存</el-button>
         <el-button @click="centerDialogVisible = false">取 消</el-button>

  </span>
    </el-dialog>
    <div class="info_tab_footer" ref="footer">
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './components/search'
  import {postDriverList, postDriver,deleteDriver} from '@/api/concentrateAxios/myDriver'
  import {REGEX} from '../../utils/valiRegex'
  import Pager from '@/components/Pagination/index'
  import {getUserInfo} from '@/utils/auth'
  export default {
    data() {
      return {
        loading: false,
        total: 0,
        // loading : false,
        centerDialogVisible: false,
        currentPage3: 5,
        dataset: [],
        dialogFn: {
          driverMobile: ''
        },
        senDataList: {
          currentPage: 1,
          pageSize: 10,
          vo: {
            shipperId:getUserInfo().shipperId,
            carNumber:'',
            driverPhone:'',
            driverName:''
          }
        },
        rules: {
          driverMobile: [
            {message: "请输入正确手机号码", pattern: REGEX.MOBILE, trigger: 'blur',}
          ]
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
    watch:{
      centerDialogVisible(n){
        if(n === false){
          this.dialogFn.driverMobile = ''
        }
      }
    },
    methods: {
      onSubForm(dialog) {
        if(!this.dialogFn.driverMobile ){
          this.$message.info('请输入手机号')
          return false
        }
        this.$refs[dialog].validate(valid => {
          if (valid) {
            this.loading = true
            return postDriver(this.dialogFn.driverMobile).then(res => {
              if (res.status === 200) {
                this.$message.success('收藏成功~');
                this.centerDialogVisible = false
                this.fetchAllList()
                this.loading = false
              } else {
                this.$message.error('错误：' + (res.text || res.errorInfo || res.data || '无法获取服务端数据' || JSON.stringify(res)))
                this.loading = false
              }

            })
          } else {
            return false
          }
        })

      },
      addCollDriver() {
        this.centerDialogVisible = true
        // return postDriver
      },
      getPaymentList() {
        this.loading = true
        return postDriverList(this.senDataList).then(res => {
          if (res.status === 200) {
            this.dataset = res.data.list
            this.total = res.data.totalPage
            this.loading = false
          } else {
            this.$message.error('错误：' + (res.text || res.errorInfo || res.data || '无法获取服务端数据' || JSON.stringify(res)))
            this.loading = false
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
      handleClick(row) {
        this.loading = true
        this.$confirm('确定要删除司机吗？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteDriver(row.id).then(res => {
           if(res.status ===200){
             this.$message({
               type: 'success',
               message: '删除成功!'
             })
             this.fetchAllList()
             this.loading = false
           }else{
             this.$message.error('错误：' + (res.text || res.errorInfo || res.data || '无法获取服务端数据' || JSON.stringify(res)))
             this.loading = false
           }
          })
        }).catch(err=>{
          this.loading = false
        })

      },

      handlePageChange(obj){
        this.senDataList.currentPage = obj.pageNum
        this.senDataList.pageSize = obj.pageSize
      }
    }

  }
</script>

<style lang="scss">
  .driver-lll-my {
    margin: 10px;
    background: #fff;
    height: 100%;
    .info-table {
      /*display: flex;*/
      padding: 20px 10px 0 20px;
      width: 100%;
      height: calc(100% - 38px);
      tr {
        .cell {
          text-align: center;
          color: #333;
        }
      }
    }
    .el-dialog__wrapper {
      .el-dialog {
        margin-top: 30vh;
        .el-dialog__body {
          .el-form {
            .el-form-item {
              display: flex;
            }
          }
        }
      }

    }
    .add-coll {
      margin-left: 80px;
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
