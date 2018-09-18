<template>
    <div class="orderManageClass-lll">
      <el-container>
        <el-header>
          <div class="headerClass">
            <div class="img">
              <img :src="userInfoData.shipperCardFile" alt="">
              <!--<img src="../../assets/role.png" alt="">-->
            </div>
              <ul>
                <li>欢迎您,{{userInfoData.mobile}}<span>更换手机号</span></li>
                <li> 企业名称:{{userInfoData.companyName}}</li>

              </ul>
              <ul>
                <li>联系人:{{userInfoData.contacts}}</li>
                <li>企业认证:{{userInfoData.shipperStatusName}}<span v-if="userInfoData.shipperStatus === AF0010403">去认证</span></li>
              </ul>
          </div>
        </el-header>
        <el-main>
          <div class="mainClass">
            <div class="accountClass">
              <h5>我的账户</h5>

              <div class="contentClass">
                <ul class="bigUl">
                  <li>
                    <div>$</div>
                    <ul>
                      <li>账户余额</li>
                      <li>￥888</li>
                    </ul>
                  </li>
                </ul>
                <ul class="bigUl">
                  <li>
                    <div>$</div>
                    <ul>
                      <li>账户余额</li>
                      <li>￥888</li>
                    </ul>
                  </li>
                </ul>
                <ul class="bigUl">
                  <li>
                    <div>$</div>
                    <ul>
                      <li>账户余额</li>
                      <li>￥888</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>


            <div class="accountBtn">
              <ul>
                <li>近期交易</li>
                <li>查看全部交易记录</li>
              </ul>
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
                  width="100">
                  <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="abnormalNo"
                  width="250"
                  label="交易流水号">
                </el-table-column>
                <el-table-column
                  fixed
                  sortable
                  prop="abnormalNo"
                  width="200"
                  label="收支类型">
                </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="abnormalNo"
                    width="250"
                    label="交易方式">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="abnormalNo"
                    width="250"
                    label="交易类型">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="abnormalNo"
                    width="250"
                    label="金额">
                  </el-table-column>
                  <el-table-column
                    fixed
                    sortable
                    prop="abnormalNo"
                    width="250"
                    label="交易时间">
                  </el-table-column>
              </el-table>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import VueJsCookie from 'vue-js-cookie'
  import Vue from 'vue'
  import {getUser} from '@/api/login'
  import {getUserInfo,setUserInfo} from '../../utils/auth'

    export default {
      data(){
        return{
          dataset:[],
          selected:[],
          userInfoData:{}
        }
      },
      mounted(){
        this.getUserInfo()
        // this.userInfoData = getUserInfo()
        // this.getUserInfo()
      },
      methods:{
        getUserInfo(){
          let uPhone = VueJsCookie.get('28kyuPhone')
          return getUser(uPhone).then(res=>{
            if(res.status===200){
              this.userInfoData = res.data
              this.$store.commit('setUserInfo', res.data)
              console.log('1111111')
              window.USERDATA = res.data
              setUserInfo(this.userInfoData)
              console.log(this.userInfoData,'用户')
            }else{
              this.$message.error('客服电话错误：' + (res.text || res.errInfo || res.data || JSON.stringify(res)))
            }

          })
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
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .orderManageClass-lll{
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      height: 100% !important;
      /*text-align: center;*/
      /*line-height: 560px;*/
      .headerClass{
        display: flex;
        margin: 10px 20px 10px 10px ;
        .img{
          img{
            width: 56px;
            height: 46px;

          }
        }
          ul{
             flex:1;
            width: 100%;
            max-width: 420px;
            min-width: 520px;
            li{
              span{
                padding-left: 20px;
                color: #eee;
              }
            }
          }
          ul:first-of-type{
            margin-left: 50px;
          }
          ul:last-of-type{

          }
      }
    }
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      .mainClass{
        .accountClass{
          .h5{

          }
          .contentClass{
            display: flex;
            ul.bigUl{
              flex: 1;
              background: #67C23A;
              width: 100%;
              max-width: 320px;
              margin: 10px;
              li{
                div{
                  text-align: left;
                  padding: 20px;
                  font-size: 30px;
                  color: #fff;
                  float: left;
                }
                ul{
                  float: left;
                  li{
                    color: #fff;
                    padding-top: 10px;
                  }
                }

              }
            }
          }

        }
        .accountBtn{
          ul{
            display: flex;
            li:first-of-type{
              flex: 1;
              text-align: left;
            }
            li:last-of-type{
              flex: 1;
              text-align: right;
            }
          }
        }
        .info-table{
          padding: 10px 10px 40px;
          height: 100%;
          -ms-flex-positive: 1;
          flex-grow: 1;
          .cel{
            text-align: center;
          }
        }
      }
    }
  }
</style>
