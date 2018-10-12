<template>
  <div class="table-lll-al" ref="getTableWH" v-loading="loading">
    <Search @change="getSearchParam" ref="getTop"></Search>
    <div class="tab_info">
      <div class="info_tab">
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
          style="overflow-x: scroll"
        >
          <!--:height="heightComputer"-->
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
            width="200"
            label="订单号">
            <template slot-scope="scope"><template></template>
              <!--已取消-->
              <el-button @click="handleClickToMap(scope.row)" type="text" size="small" >{{scope.row.orderSerial}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="belongCityName"
            width="100"
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
            width="110"
            label="运费总额">
          </el-table-column>
          <el-table-column
            fixed
            sortable

            width="160"
            label="用车时间" >
            <template slot-scope="scope"><span class="redClass">{{ scope.row.useCarTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span></template>
          </el-table-column>
          <el-table-column
            fixed
            sortable

            width="115"
            label="订单状态" >
            <template slot-scope="scope">
              <span class="greenClass">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable

            width="110"
            label="付款状态">
            <template slot-scope="scope">
              <span class="greenClass">{{ scope.row.payStatus }}</span>
            </template>
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
            width="100"
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
            width="150"
            label="操作">
            <template slot-scope="scope">
              <!--<el-button @click="handleClickEvaDriver(scope.row)" type="text" size="small" v-if="scope.row.payStatus === 'AF00801'">去支付</el-button>-->
              <el-button @click="handleClickPy(scope.row)" type="text" size="small" v-if="scope.row.payStatus === 'AF00801'">去支付</el-button>
              <!--<el-button @click="handleClickEvaDriver(scope.row)" type="text" size="small" v-if="scope.row.payStatus === 'AF00801'">去支付</el-button>-->
              <el-button @click="handleClickEvaDriver(scope.row)" type="text" size="small"  v-if="scope.row.status === 'AF0080701' && scope.row.payStatus === 'AF00802'">评价司机</el-button>

              <el-button type="text" size="small" @click="handleClickMessage(scope.row)" v-if="scope.row.status === 'AF0080705'">确认回款</el-button>
              <el-button type="text" size="small" @click="handleClickMessage(scope.row)"  v-if="scope.row.status === 'AF0080703'">确认回单</el-button>
              <el-button @click="handleClickAgain(scope.row)" type="text" size="small"  v-if="scope.row.status === 'AF00807' && scope.row.payStatus === 'AF00802'">再下一单</el-button>
              <el-button type="text" size="small" @click="handleClickAgain(scope.row)" v-if="scope.row.status === 'AF00808'">重新下单</el-button>
              <el-button @click="handleClickUnloadOrder(scope.row)" type="text" size="small"  v-if="scope.row.status === 'AF0080607HZ'">确认收货</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="info_tab_footer" ref="footer"> <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
  <!--</div>-->
  </div>
</template>

<script>
  import Search from './components/search'
  import {postMyOrderList} from '@/api/concentrateAxios/orderManage'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {parseTime} from '@/utils/'
  export default{
    data(){
      return {
        loading:false,
        title:'派单中',
        sendData:{},
        sendFn:'',
        total: 0,
        totalCount: 0,
        height:0,
        topHeight:0,
        footer:0,
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
      Search,
      Pager

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
      handlePageChange(obj) {
        this.senDataList.currentPage = obj.pageNum
        this.senDataList.pageSize = obj.pageSize
      },
      getPaymentList(){
        this.loading = true
        return postMyOrderList(this.senDataList.currentPage,this.senDataList.pageSize,this.senDataList.status).then(res =>{
          if(res.status ===200){
            this.dataset = res.data.list
            this.total = res.data.totalPage
            this.totalCount = res.data.totalCount
            this.loading = false
          }else{
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
          }
        })
      },
      fetchAllList(){
        this.getPaymentList()
      },
      getSearchParam(obj){
        this.senDataList.vo = Object.assign(this.senDataList.vo, obj)
        this.fetchAllList()
      },
      handleClickToMap(row){
        this.sendData = row
        if(row.payStatus === 'AF00801'){
          this.$router.push({path: '/orderRouter/getPickUp',query: {
              tab: this.title,
              qy:this.sendData,
              fn:this.sendFn
            }})
        }
        else if(row.payStatus === 'AF0080601HZ'){
          this.$router.push({path: '/orderRouter/getPickUp',query: {
              tab: this.title,
              qy:this.sendData,
              fn:this.sendFn
            }})
        } else {
          this.$router.push({path: '/orderRouter/getPickUp2',query: {
              orderSerial: row.orderSerial,
            }})
        }

      },

      handleClickPy(row) {
        this.sendData = JSON.stringify(row)
        this.$router.push({path: '/orderRouter/payFoy',query: {
            qy:this.sendData
          }})
      },

      handleClickEvaDriver(row){
        this.title = '评价司机'
        this.sendData = JSON.stringify(row)
        // console.log(this.sendData);
        this.$router.push({path: '/orderRouter/evaluateDriver',query: {
            tab: this.title,
            qy:this.sendData
          }})
      },
      handleClickUnloadOrder(row) {
        this.title = '确认收货'
        this.sendData = JSON.stringify(row)
        this.$router.push({path: '/orderRouter/unloadOrder',query: {
            tab: this.title,
            qy:this.sendData
          }})
      },
      handleClickAgain(row) {
        this.$router.push({path: '/order'})
      },
      handleClickMessage(row) {
        if(row.status === 'AF0080703'){
          this.$confirm('确认已收到此订单司机带回来的回单?', '确认回单', {
            confirmButtonText: '已收到汇款',
            cancelButtonText: '还未收到'

          }).then(() => {
            this.$message({
              type: 'primary',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$confirm('确认已收到此订单司机带回来的回款?', '确认回款', {
            confirmButtonText: '已收到回款',
            cancelButtonText: '还未收到'

          }).then(() => {
            this.$message({
              type: 'primary',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }

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
  .table-lll-al{
    margin-top: 10px ;
    background: #fff;
    width: calc(100% - 20px);
    height: 100%;
    .el-table__body-wrapper .is-scrolling-middle{
      /*overflow-x: none !important;*/
    }
    .tab_info{
      padding: 10px 10px 40px;
      height: 100%;
      -ms-flex-positive: 1;
      flex-grow: 1;
      .info_tab{
        width: 100%;
        height: calc(100% - 38px);
          /*display: flex;*/
          /*padding-top: 20px;*/
          /*padding: 10px 10px 40px;*/
          /*height: 100%;*/
          /*-ms-flex-positive: 1;*/
          /*flex-grow: 1;*/
          .el-table__body-wrapper{
            overflow-x: hidden;
          }
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
          .el-table__row{
            .el-button{
              color: #1890ff;
            }
            .redClass{
              color: #ff300d;
            }
            .greenClass{
              color: #2fb301;
            }
          }


      }
    }

   .info_tab_footer {
      padding-left: 20px;
      background: #fff;
      height: 40px;
      line-height: 40px;
      box-shadow: 0 -2px 2px rgba(0,0,0,.1);
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

