<template>
  <div class="orderManageClass-lll-tpCoupon" v-loading="loading">
    <el-container>
      <el-header>
        <div class="headerClass">
          <div class="headerTop">
            <p class="p-ye">账户余额：<span>{{parseFloat(balance).toFixed(2) || 0.00}}</span>元</p>
            <h4>充值金额：</h4>
            <ul class="clearfix">
              <template v-for="(item,index) in datasetList">
                <li @click="changeActive(item,index)" :class="[tabId === index ? 'active' : 'unatctiv']"
                    v-if="item.moreMoney !== 0">
                  <!--<p>{{item.name}}</p>-->
                  <!--<p>赠送{{item.moreMoney}}</p>-->
                  <p>{{item.name}}</p>
                  <p>赠送{{item.moreMoney}}</p>
                </li>

                <li v-else @click="changeActive(item,index)" :class="[tabId === index ? 'active' : 'unatctiv']">
                  <el-input placeholder="请输入金额" v-model="item.name" :maxlength="8" @input="(val)=>changInputFn(item, val)"
                            @change="(val)=>changInputFn(item, val)"></el-input>
                  <p></p>
                </li>
              </template>
            </ul>
          </div>
          <div class="headerFoot">
            <h4>支付方式：</h4>
            <ul>
              <li @click="changPfId=0" :class="[changPfId === 0 ? 'active' : 'unatctiv']">
                  <span class="spanClass">
                  <icon-svg iconClass="lll01wet" class="svg"></icon-svg>
                  </span>
                <span class="titleP">微信支付</span>
              </li>
              <li @click="changPfId=1" :class="[changPfId === 1 ? 'active' : 'unatctiv']">
                <span class="spanClass"><icon-svg iconClass="lll02zfb" class="svg"></icon-svg></span>
                <span class="titleP">支付宝</span>
              </li>
            </ul>
            <div class="btn">
              <el-button type="success" @click="onSubmit">充值</el-button>
              <span>（支付{{changeItem.name || 0}}元，到账<i>{{changeItem.totalMoney || 0}}</i>元）</span>
            </div>
          </div>
        </div>

        <div class="openDialogw">
          <el-dialog
            title="微信支付"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <div class="content">
              <div class="contLeft">
                <p>充值金额（元）</p>
                <p>{{changeItem.name}}</p>
                <img :src="pfimg" alt="">
                <!--<img src="../../assets/login/code.png" alt="">-->
                <p>二维码有效时长为2个小时<br>
                  请尽快支付</p>
              </div>
              <div class="contRight">
                <img src="../../assets/myorder/lll-iPhone X.png" alt="">
                <img src="../../assets/myorder/saoyisao.png" alt="">
                <p>请使用微信扫一扫</p>
              </div>
            </div>
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
            <!--</span>-->
          </el-dialog>
        </div>
        <div class="openDialogz">
          <el-dialog
            title="支付宝支付"
            :visible.sync="centerDialogVisiblezfb"
            width="30%"
            center>
            <div class="content">
              <div class="contLeft">
                <p>充值金额（元）</p>
                <p>{{changeItem.name}}</p>
                <!--<img src="../../assets/login/code.png" alt="">-->
                <img :src="pfimg" alt="">
                <p>二维码有效时长为2个小时<br>
                  请尽快支付</p>
              </div>
              <div class="contRight">
                <img src="../../assets/myorder/iPhoneXzhifub.png" alt="">
                <img src="../../assets/myorder/zhifub_saoyisao.png" alt="">
                <p>请使用支付宝扫一扫</p>
              </div>
            </div>
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="centerDialogVisiblezfb = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="centerDialogVisiblezfb = false">确 定</el-button>-->
            <!--</span>-->
          </el-dialog>
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
              :default-sort="{prop: 'id', order: 'ascending'}"
              style="width: 100%">

              <el-table-column
                fixed
                sortable
                prop="id"
                label="序号"
                width="128">
                <template slot-scope="scope">{{ ((senDataList.currentPage - 1)*senDataList.pageSize) + scope.$index + 1
                  }}
                </template>
              </el-table-column>
              <el-table-column
                fixed
                sortable
                prop="rechargeSerial"
                width="300"
                label="充值流水号">
              </el-table-column>
              <el-table-column
                fixed
                sortable
                width="400"
                label="交易方式">
                <template slot-scope="scope">
                  <span >{{scope.row.rechargeWay === '0' ? '支付宝':'微信'}}</span>
                </template>
                <!--<template slot-scope="scope">-->
                  <!--<span v-if="scope.row.rechargeWay === '0' ? '支付宝':'微信'"></span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                fixed
                sortable
                prop="rechargeSum"
                width="400"
                label="金额">
                <template slot-scope="scope">
                  ￥{{parseFloat(scope.row.rechargeSum).toFixed(2)}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--fixed-->
              <!--sortable-->
              <!--prop="tradeTypeName"-->
              <!--width="300"-->
              <!--label="充值后余额">-->
              <!--</el-table-column>-->
              <el-table-column
                fixed
                sortable
                width="400"
                label="订单完成时间">
                <template slot-scope="scope"><span class="redClass">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span></template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
    <div class="info_tab_footer" ref="footer">
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange"/>
      </div>
    </div>
  </div>
</template>

<script>

  import {
    postFindMywallet,
    getSysDictByCodesGet,
    postCreateAflcRecharge,
    postScanPay,
    postTradeQuery,
    postFindAflcRecharge
  } from '@/api/concentrateAxios/manageCenter'
  import {getUserInfo} from '@/utils/auth'
  import searchTime from './components/searchTime'
  import Pager from '@/components/Pagination/index'
  import {REGEX} from '../../utils/valiRegex'
  import {parseTime} from '@/utils/'
  export default {
    data() {
      return {
        changInput: '',
        total: 0,
        centerDialogVisible: false,
        centerDialogVisiblezfb: false,
        strVal: '',
        changeRed: 0,
        isPfrecord: true,
        radio: '1',
        checkedW: true,
        checkedZ: false,
        isview: false,

        tabId: 0,
        changPfId: 0,
        // changPfId:false,
        dataset: [],
        datasetList: [],
        selected: [],
        changeItem: '',
        showBox: false,
        infoData: {
          rewardMax: 0.00,
          balance: 0.00,
          nums: 0
        },
        userInfoData: getUserInfo(),
        loading: false,
        senData: {
          "accountId": "",
          "giveSum": 0,
          "mobile": "",
          "name": "",
          "rechargeChannel": "",
          "rechargeCode": "",
          "rechargeSum": 0,
          "rechargeWay": "",
          "userType": ""
        },
        senDataList: {
          currentPage: 1,
          pageSize: 5,
          vo: {
            "endRechargeTime": "",
            "startRechargeTime": ""

          }
        },
        balance: '',
        pfimg: '',
        sendAF011: 'AF011'
      }
    },

    computed: {
      getitem() {
        this.datasetList.forEach(el => {

        })
        // console.log(item)
        //item.value.slice(-3) * item.name.substr(0,item.name.length-1
        // return item.value.slice(-3) * item.name.substr(0,item.name.length-1)

      }
    },
    components: {
      searchTime,
      Pager
    },
    mounted() {
      this.getPayment()
      this.fetchAllList()
      this.fetchGetWall()
      this.senData = {
        "accountId": this.userInfoData.shipperId,
        "giveSum": 0,
        "mobile": this.userInfoData.mobile,
        "name": this.userInfoData.mobile,
        "rechargeChannel": 1,
        "rechargeCode": "",
        "rechargeSum": 0,
        "rechargeWay": 1,
        "userType": 1
      }
    },
    watch: {
      changInput(n) {

      },
      centerDialogVisiblezfb(n) {
        if (!n) {
          clearTimeout(this.timer)
        }
      },
      centerDialogVisible(n) {
        if (!n) {
          clearTimeout(this.timer)
        }
      }
    },
    methods: {
      getWallet() {

        return postFindMywallet(this.userInfoData.userToken).then(res => {
          this.loading = true
          if (res.status === 200) {
            this.balance = res.data.mywallet.balance
            this.loading = false
          } else {
            this.$message.error('错误：' + (res.text || res.errorInfo || res.data || JSON.stringify(res) || '无法获取服务端数据'))
            this.loading = false
          }
        })
      },
      fetchGetWall() {
        this.getWallet()
      },
      changInputFn(item, val) {
        item.totalMoney = (Number(val) * item.bilibili).toFixed(2)
        if(!REGEX.ONLY_NUMBER.test(item.name)){
          this.$notify({
            title: '提示',
            dangerouslyUseHTMLString: true,
            message: '<strong>只能输入数字</strong>'
          });
          item.name = ''
          item.totalMoney = ''
          return false
        }
        if(!REGEX.NUM_POINT.test(item.name)){
          this.$notify({
            title: '提示',
            dangerouslyUseHTMLString: true,
            message: '<strong>请保留2位小数</strong>'
          });
          item.name = ''
          item.totalMoney = ''
          return false
        }

      },
      onSubmit() {
        this.centerDialogVisible = false
        this.centerDialogVisiblezfb = false
        if (this.changPfId === 0) {
          this.centerDialogVisible = true
          this.getCreateAflcRecharg()

        } else if (this.changPfId === 1) {
          this.centerDialogVisiblezfb = true
          this.getCreateAflcRechargzfb()
        }
      },
      changeActive(item, index) {
        this.tabId = index
        // console.log(this.tabId,'循环');
        if (this.tabId === 0) {
          this.changeItem = this.datasetList[0]
        } else if (this.tabId === 5) {
          this.changeItem = this.datasetList[5]
          this.changInput = Object.assign(this.changeItem.name)
        }
        else {
          this.changeItem = item
        }

      },

      checked(type) {
        this.checkedW = false
        this.checkedZ = false
        switch (type) {

          case 'check1':
            if (this.radio === 1) {
              this.checkedZ = true
            } else {
              this.checkedW = true
            }
            break;
          case 'check2':
            if (this.radio === 2) {
              this.checkedW = true
            } else {
              this.checkedZ = true
            }
            break;
        }
      },
      getCreateAflcRecharg() {
        this.fnSenData()

        return postCreateAflcRecharge(this.senData).then(res => {
          this.loading = true
          let data = {
            "payChannel": "wx"
          }
          if (res.status === 200) {
            let rid = res.data

            return postScanPay(res.data, data).then(res => {
              var fr = new FileReader();
              fr.readAsDataURL(res);
              fr.onload = (e) => {
                this.pfimg = e.target.result;
                // 轮询请求结果
                // return postTradeQuery
                this.getPayResult(rid, 'wx')
              }

            })
            this.loading = false
          } else {
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
            this.loading = false
          }

        })
      },
      getCreateAflcRechargzfb() {
        this.fnSenData()
        return postCreateAflcRecharge(this.senData).then(res => {
          let data = {
            "payChannel": "ali"
          }
          if (res.status === 200) {
            let rid = res.data
            return postScanPay(res.data, data).then(res => {
              var fr = new FileReader();
              fr.readAsDataURL(res);
              fr.onload = (e) => {
                this.pfimg = e.target.result;
                // 轮询请求结果
                this.getPayResult(rid, 'ali')
              }

            })
          } else {
            // this.$message.info('')
          }

        })
      },
      getPayResult(rid, type) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.loading = true
          postTradeQuery(rid, type).then(res => {
            if (res.status === 200) {
              // 支付成功
              this.$message.success('支付成功')
              this.fetchGetWall()
              if (type === 'wx') {
                this.centerDialogVisible = false
              } else {
                this.centerDialogVisiblezfb = false
              }
              // this.centerDialogVisiblezfb
              this.loading = false
            } else {
              // 支付失败
              this.getPayResult(rid, type)
            }

          }).catch(err => {
            // 支付失败
            this.getPayResult(rid, type)
          })
        }, 3000)
      },
      getPayment() {
        this.loading = true
        return getSysDictByCodesGet(this.sendAF011).then(res => {
          if (res.status === 200) {
            let data = res.data.AF011
            this.datasetList = data.map(el => {
              if (el.code === 'AF01106') {
                el.name = ''
              } else {
                el.name = el.name.replace('元', '')
              }
              let name = el.value.split(',')
              el.bili = name[1]
              el.bilibili = (1 + (+name[1]))
              el.moreMoney = name[0] * name[1]
              el.totalMoney = name[0] * (1 + (+name[1]))
              return el
            })
            this.changeActive(this.datasetList[0], 0)
            this.loading = false
            // this.changeItem = this.datasetList[0]
          } else {
            this.$message.error('错误：' + (err.text || err.errorInfo || '无法获取服务端数据~' || err.data))
            this.loading = false
          }

        })
      },
      getPaymentList() {
        this.loading = true
        return postFindAflcRecharge(this.senDataList).then(res => {
          if (res.status === 200) {
            this.dataset = res.data.list
            this.total = res.data.totalPage
            this.loading = false
          } else {
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
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
      fnSenData() {
        if (this.tabId === 0) {
          this.changeItem = Object.assign(this.datasetList[0])
          this.senData.rechargeCode = this.changeItem.code
          this.senData.rechargeSum = this.changeItem.name.substr(0, this.changeItem.name.length - 1)
        } else {
          this.changeItem = Object.assign(this.changeItem)
          this.senData.rechargeCode = this.changeItem.code
          this.senData.rechargeSum = this.changeItem.name.substr(0, this.changeItem.name.length - 1)
        }
      },
      getDbClick() {

      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection) {
        this.selected = selection
      },
      gotoAllRecod() {
        this.$router.push({path: '/allRecod'})
      },
      handlePageChange(obj) {
        this.senDataList.currentPage = obj.pageNum
        this.senDataList.pageSize = obj.pageSize
      },
    }
  }
</script>

<style lang="scss">

  .orderManageClass-lll-tpCoupon {
    background: rgb(242, 242, 242);

    .el-header {
      padding: 0 0;
      background-color: #fff;
      color: #333;
      height: 100% !important;
      margin: 10px 10px 0 10px;
      .headerClass {
        display: inline-block;
        padding: 25px 0 40px 40px;
        .headerTop {
          p.p-ye {
            font-size: 28px;
            color: #333333;
            span {
              color: #3b99f0;
            }
          }
          h4 {
            margin: 40px 0 15px 0;
          }
          ul {
            li {
              float: left;
              padding: 15px 70px 15px 70px;
              border: 1px solid #dddddd;
              background: #f2f2f2;
              margin-right: 50px;
              font-size: 14px;
              cursor: pointer;
              p:first-of-type {
                color: #333333;
              }
              p:last-of-type {
                color: #ff300d;
              }
            }
            li:last-of-type {
              margin-right: 0;
              padding: 18px 0px;
              .el-input {
                text-align: center;
                .el-input__inner {
                  height: 30px;
                  line-height: 30px;
                  width: 70%;
                  font-size: 12px;
                }
              }
              /*cursor: help;*/
            }
            .active {
              background-color: #ffffff;
              border: solid 2px #2fb301;
              p:first-of-type {
                color: #2fb301;
              }
              p:last-of-type {
                color: #2fb301;
              }
            }
          }
        }
        .headerFoot {
          h4 {
            margin: 40px 0 14px 0;
          }
          ul {
            float: left;
            margin-left: 28px;
            .active {
              background: url("../../assets/myorder/lll_selected.png") no-repeat;
            }
            .unatctiv {

            }
            li {
              cursor: pointer;
              display: inline-block;
              border: 1px solid #dddddd;
              padding: 13px 15px 15px 0px;
              border-radius: 6px;
              span.spanClass {
                position: relative;
                .svg-icon {
                  position: absolute;
                  top: -15px;
                  left: 15px;
                  width: 45px;
                  height: 45px;
                }

              }
              .titleP {
                padding-left: 60px;
                font-size: 14px;
                color: #333333;
              }

            }
            li:first-of-type {
              padding: 13px 4px 14px 0px;
            }
            li:last-of-type {
              padding: 13px 18px 14px 0px;
              margin-left: 30px;
            }
          }
          .btn {
            float: left;
            margin-left: 90px;
            span:first-of-type {
              margin-left: 10px;
              i {
                font-style: normal;
                color: #ff300d;
              }
            }
            /*text-align: right;*/
            /*display: inline-block;*/
          }
        }

      }
      .openDialogw, .openDialogz {
        .el-dialog__body {
          .content {
            .contLeft {
              float: left;
              margin: 40px 100px 120px 50px;
              text-align: center;
              p:first-of-type {
                font-size: 12px;
                color: #333333;
              }
              p:nth-of-type(2) {
                font-size: 16px;
                color: #ff300d;
                padding-top: 5px;
              }
              p:last-of-type {
                font-size: 12px;
                color: #333333;
                padding-top: 10px;
              }
              img {
                width: 154px;
                height: 154px;
              }
            }
            .contRight {
              position: relative;
              text-align: center;
              img:nth-of-type(2) {
                position: absolute;
                top: 50px;
                left: 270px;
                width: 100px;
                height: 100px;
              }
              /*float: right;*/
            }
          }
        }

      }

    }
    .el-main {
      background-color: #fff;
      color: #333;
      margin: 10px 10px 10px 10px;
      padding: 0 0;
      .mainClass {
        h4 {
          margin: 20px 0 15px 40px;
        }
        .accountBtn {
          margin: 40px 40px 10px 40px;
          ul {
            display: flex;
            li:first-of-type {
              flex: 1;
              text-align: left;
              color: #333;
              font-size: 18px;
              font-weight: 600;
            }
            li:last-of-type {
              flex: 1;
              text-align: right;
              color: #3b99f0;
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
        .info-table {
          margin: 0 40px 10px 40px;
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
