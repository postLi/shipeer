<template>
    <div class="orderManageClass-lll-tpCoupon" v-loading="loading">
      <el-container>
        <el-header>
          <div class="headerClass">
            <div class="headerTop">
              <h4>充值金额：</h4>
              <ul class="clearfix" >
                <template v-for="(item,index) in dataset">
                  <li @click="tabId=index" :class="[tabId === index ? 'active' : 'unatctiv']">
                    <p>{{item.name}}元</p>
                    <p>赠送60</p>
                  </li>
                </template>
                <!--<li @click="tabId=1" :class="[tabId === 1 ? 'active' : 'unatctiv']">-->
                  <!--<p>500元</p>-->
                  <!--<p>赠送100</p>-->
                <!--</li>-->
                <!--<li @click="tabId=2" :class="[tabId === 2 ? 'active' : 'unatctiv']">-->
                  <!--<p>300元</p>-->
                  <!--<p>赠送60</p>-->
                <!--</li>-->
                <!--<li @click="tabId=3" :class="[tabId === 3 ? 'active' : 'unatctiv']">-->
                  <!--<p>500元</p>-->
                  <!--<p>赠送100</p>-->
                <!--</li>-->
                <!--<li @click="tabId=4" :class="[tabId === 4 ? 'active' : 'unatctiv']">-->
                  <!--<p>300元</p>-->
                  <!--<p>赠送60</p>-->
                <!--</li>-->
                <!--<li>-->
                  <!--必须为10的倍数-->
                  <!--&lt;!&ndash;<p>必须为10的倍数</p>&ndash;&gt;-->
                  <!--&lt;!&ndash;<p></p>&ndash;&gt;-->
                <!--</li>-->
              </ul>
            </div>
            <div class="headerFoot">
              <h4>支付方式：</h4>
              <el-radio v-model="radio" label="1" class="wetclass" @change="checked('check1')">
                <span class="spanClass">
                  <icon-svg iconClass="lll01wet" class="svg"></icon-svg>
                </span>
                微信支付
                <img src="../../assets/role.png" alt="" v-if="checkedW">
              </el-radio >
              <el-radio v-model="radio" label="2" class="wetclass" @change="checked('check2')">
                <span class="spanClass"><icon-svg iconClass="lll02zfb" class="svg"></icon-svg></span>
                支付宝
                <img src="../../assets/main/fahuor.png" alt="" v-if="checkedZ">
              </el-radio >
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="mainClass">
            <h4>充值记录查询：</h4>
            <searchTime @change="getSearchParam" :pfrecord="isPfrecord"></searchTime>

            <!--<div class="accountBtn">-->
              <!--<ul>-->
                <!--<li>近期交易</li>-->
                <!--<li @click="gotoAllRecod">查看全部交易记录</li>-->
              <!--</ul>-->
            <!--</div>-->
            <div class="info-table">
              <el-table
                ref="multipleTable"
                :data="dataset"
                border
                @row-dblclick="getDbClick"
                @row-click="clickDetails"
                @selection-change="getSelection"
                :default-sort = "{prop: 'id', order: 'ascending'}"
                style="width: 100%">

                <el-table-column
                  fixed
                  sortable
                  prop="id"
                  label="序号"
                  width="128">
                  <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="orderSerial"
                  width="300"
                  label="交易流水号">
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="incomeExpendTypeName"
                  width="300"
                  label="交易方式">
                </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="payWayName"
                    width="300"
                    label="金额">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="tradeTypeName"
                    width="300"
                    label="充值后余额">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="totalAmount"
                    width="300"
                    label="订单完成时间">
                  </el-table-column>
              </el-table>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>

  import {getSysDictByCodesGet} from '@/api/concentrateAxios/manageCenter'
  import {getUserInfo} from '@/utils/auth'
  import searchTime from './components/searchTime'

    export default {
      data(){
        return{
          isPfrecord:true,
          radio: '1',
          checkedW: true,
          checkedZ: false,
          isview: false,

          tabId: 0,
          dataset:[],
          selected:[],
          showBox:false,
          infoData:{
            rewardMax:0.00,
            balance:0.00,
            nums:0
          },
          userInfoData:getUserInfo(),
          loading:false,
          senData:{
            currentPage:100,
            pageSize:1,
            vo:{

            }
          },
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
          },
          sendAF011:'AF011'
        }
      },
      components:{
        searchTime
      },
      mounted(){
        this.getPaymentList()

      },
      methods:{
        // checkedW(){
        //   if(this.checkedW == true){
        //     this.checkedZ = false
        //   }else{
        //     this.checkedZ = true
        //   }
        // },

        checked(type){
          this.checkedW = false
          this.checkedZ = false
          switch (type){

            case 'check1':
              if(this.radio === 1){
                this.checkedZ = true
              }else{
                this.checkedW = true
              }
              break;
            case 'check2':
              if(this.radio ===2){
                this.checkedW = true
              }else{
                this.checkedZ = true
              }
              break;
          }
        },
        getPaymentList(){
          return getSysDictByCodesGet(this.sendAF011).then(res =>{

            this.dataset = res.data.AF011
            console.log(this.dataset)
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
        }
      }
    }
</script>

<style lang="scss">

  .orderManageClass-lll-tpCoupon{
    background: rgb(242,242,242);

    .el-header {
      padding: 0 0 ;
      background-color: #fff;
      color: #333;
      height: 100% !important;
      margin: 0 10px 0 10px;
      .headerClass{
        display: inline-block;
        padding: 25px 0 40px 40px;
        .headerTop{
          h4{
            margin: 40px 0 15px 0;
          }
          ul{
            li{
              float: left;
              padding:15px 70px 15px 70px;
              border: 1px solid #dddddd;
              background: #f2f2f2;
              margin-right: 50px;
              font-size: 14px;
              cursor: pointer;
              p:first-of-type{
                color: #333333;
              }
              p:last-of-type{
                color: #ff300d;
              }
            }
            li:last-of-type{
              margin-right: 0;
              padding:25px 36px 28px 25px;
              cursor: help;
            }
            .active{
              background-color: #ffffff;
              border: solid 2px #2fb301;
              p:first-of-type{
                color: #2fb301;
              }
              p:last-of-type{
                color: #2fb301;
              }
            }
          }
        }
        .headerFoot{
          h4{
            margin: 40px 0 14px 0;
          }
         .wetclass{
           .el-radio__label{
             padding-left: 35px;
             position: relative;
           }
           span.spanClass{
             position: relative;
             .svg-icon{
               position: absolute;
               top: -15px;
               left: -38px;
               width: 45px;
               height: 45px;
             }

           }
           img{
             position: absolute;
             top: 27px;
             left: 27px;
             display: block;
           }
         }
        }
      }

    }
    .el-main {
      background-color: #fff;
      color: #333;
      margin:0 10px 10px 10px;
      padding: 0 0 ;
      .mainClass{
        h4{
          margin: 60px 0 15px 40px;
        }
        .accountBtn{
          margin: 40px 40px 10px 40px;
          ul{
            display: flex;
            li:first-of-type{
              flex: 1;
              text-align: left;
              color: #333;
              font-size: 18px;
              font-weight: 600;
            }
            li:last-of-type{
              flex: 1;
              text-align: right;
              color: #3b99f0;
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
        .info-table{
          margin: 0 40px 10px 40px;
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
      }
    }
  }
</style>
