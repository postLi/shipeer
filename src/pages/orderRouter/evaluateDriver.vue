<template>
  <div class="odPayForClass-lll-ev">
    <el-container class="clearfix">
      <el-header class="clearfix">
        <div class="height-top">
          <p>评价司机<span>（您的评价将会被严格匿名）</span></p>
          <div class="rate">
            <span>司机评分</span>
            <el-rate
              v-model="rateDrive.starLevel"

              show-score
              text-color="#ff9900"
              score-template="{value}"
              @change="changeRate"
            >
            </el-rate>
          </div>
          <div class="rateTitle">
            <span>司机评语</span>
            <div class="rateMess">
              <el-checkbox-group v-model="checkboxGroup1" @change="changeActive">
                <el-checkbox-button v-for="(item,index) in liList" :label="item.name" :key="item.name" :index="index">{{item.name}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
            <!--<ul>-->
              <!--<template v-for="(item,index) in liList">-->
                <!--<li @click="changeActive(item,index)" :class="[tabId === index ? 'active' : 'unatctiv']">{{item.name}}</li>-->
              <!--</template>-->

            <!--</ul>-->

          </div>
          <div class="textarea">
            <el-input type="textarea" placeholder="师傅服务周到吗？输入评语为更多的小伙伴提供参考～" v-model="rateDrive.rembel"></el-input>
          </div>
          <div class="btn">
            <el-button type="success" @click="onSubmit">评价</el-button>
          </div>
          <!--<ul>-->
            <!--<li>评价司机<span>（您的评价将会被严格匿名）</span></li>-->
            <!--<li></li>-->
            <!--<li></li>-->
            <!--<li></li>-->
            <!--<li></li></ul>-->
        </div>
        <div class="height-foot">

        </div>

      </el-header>
      <el-main>
        <ul class="clearfix">
          <li>
            <div class="liClass-top">
              <img src="../../assets/role.png"/>
              <p></p>
              <span class="actClass">网显示</span>&nbsp;&nbsp;<span class="unClass">(外星人)</span>
              <el-rate
                v-model="rateDetail.rateNum"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
              <i><icon-svg iconClass="lll03xin"></icon-svg></i>
              <span class="unClass">13344单</span>

            </div>
            <div class="liClass-foot">
              <img src="../../assets/main/xh@3x.png"/>
              <p></p>
              <p class="actClass">苏**v99</p>
              <p class="unClass">广州</p>
              <span class="unClass">承载16方,&nbsp;2.4吨</span>
            </div>
          </li>
          <li>
            <div class="divClass">
              <span class="actClass">用车时间:</span><span class="blueClass">2019-1-10 09:3</span>
            </div>
            <div class="divClass">
              <span class="unClass">付款方式:</span><span>发货人付款(现金支付)</span>
            </div>
            <div class="divClass">
              <span class="unClass">运输支付:</span><span>￥66.00</span>&nbsp;&nbsp;<span class="blueClass">费用明细</span>
            </div>
            <div class="divClass">
              <span class="unClass">需要车型:</span><span>巍面</span>
            </div>
            <div class="divClass">
              <span class="unClass">货物名称:</span><span>家具</span>
            </div>
            <div class="divClass">
              <span class="unClass">货物重量:</span><span><8,1-2方	</span>
            </div>
            <div class="divClass">
              <span class="unClass">额外服务:</span><span>需要回单	</span>
            </div>
            <div class="divClass last">
              <span class="unClass">备注:</span><span>协助装货</span>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <p>猎德村复建房五区</p>
            <span>南山区兴南路10号</span>
          </li>
          <li>
            <p>猎德村复建房五区</p>
            <span>南山区兴南路10号</span>
          </li>
          <li>
            <p>猎德村复建房五区</p>
            <span>南山区兴南路10号</span>
          </li>
          <li>
            <p>猎德村复建房五区</p>
            <span>南山区兴南路10号</span>
          </li> <li>
          <p>猎德村复建房五区</p>
          <span>南山区兴南路10号</span>
        </li>

        </ul>
      </el-main>

    </el-container>
    <!--<div class="payFor-hearder">-->
    <!--支付收银台-->
    <!--</div>-->
  </div>
</template>

<script>
  import {getUserInfo} from '@/utils/auth'
  import {postEvaluateShipper,getSysDictByCodesGet} from '@/api/concentrateAxios/orderManage'
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data(){
      return{
        checkboxGroup1: [],
        cities: cityOptions,
        tabId:0,
        radio: '1',
        rateDrive:{
          starLevel:5,
          rembel:'',
          evaluationType:''
        },
        rateDetail:{
          rateNum:5,
        },

        activeNames: '',
        changeItem: '',
        userData: getUserInfo(),
        liList:[
        ],
        senData:{
          "evaluationDes": "",
          "evaluationId": "",
          "evaluationName": "",
          "evaluationType": "",
          "orderSerial": "",
          "starLevel": "",
          "userId": '',
          "userName": ""
          // getUserInfo().shipperId
        },
        sendCodes:{
          codes:''
        }
        // activeNames: ['1']
      }
    },
    mounted(){
      this.fetchRate('AF0042102')
      // console.log(this.$route.query)
    },
    methods: {
      onSubmit(){

        if(this.rateDrive.evaluationType.length === 0){
          this.$message.info('请给司机评语~')
        }else{
          let evaluationType = this.rateDrive.evaluationType.map(el => {

            return el
          })
          evaluationType = evaluationType.length > 1 ? evaluationType.join(',') : evaluationType

          this.senData = {
            "evaluationDes": this.rateDrive.rembel,
            "evaluationId":this.userData.shipperId,
            "evaluationName": this.userData.contacts,
            "evaluationType": evaluationType,
            // this.$route.query.qy.orderSerial
            "orderSerial": this.$route.query.qy.orderSerial,
            "starLevel": this.rateDrive.starLevel,
            "userId": '',
            // this.$route.query.qy.driverName
            "userName": this.$route.query.qy.driverName
          }
        }
        let promiseObj
        promiseObj = postEvaluateShipper(this.senData)
        promiseObj.then(res =>{
          if(res.status===200){
            this.$message.success('评价成功')
          }else{
            this.$message.warning(res.text || res.errorInfo || '未知错误，请重试~')
          }
        })

      },
      fetchRate(codes){
        return getSysDictByCodesGet(codes).then(res=>{
          if(res.status === 200){
            if(this.rateDrive.starLevel > 3.5){
              this.liList = res.data.AF0042102
            }else{
              this.liList = res.data.AF0042101
            }
          }
        })
      },
      changeRate(item){
        this.rateDrive.starLevel = item
        if(this.rateDrive.starLevel > 3.5){
          this.fetchRate('AF0042102')
        }else{
          this.fetchRate('AF0042101')
        }
      },
      changeActive(item){
        this.rateDrive.evaluationType = item
        console.log(item)
      }
    }
  }
</script>

<style lang="scss">

  .odPayForClass-lll-ev{
    display: flex;
    margin:10px;
    width: 100%;
    height: calc(100% - 38px);


    .el-header {
      padding: 0 0 ;
      color: #333;
      text-align: left;
      height: 350px !important;
      background: #fff;
      .height-top{
        margin: 40px 10px 23px 107px;
        p:first-of-type{
          font-size: 14px;
          color: #333333;
          font-weight: 600;
          span{
            font-size: 12px;
            color: #cccccc;
            padding-left: 5px;
          }
        }
        .rate{
          display: inline-block;
          padding: 20px 0;
          font-size: 14px;
          color: #999999;
          span{

          }
          .el-rate{
            display: inline-block;
            padding-left: 57px;

          }
        }
        .rateTitle{

          span{
            font-size: 14px;
            color: #999999;
            float: left;
          }
          .rateMess{
            display: inline-block;
            margin-left: 40px;
            .el-checkbox-group{
              /*background: skyblue;*/
              .el-checkbox-button{
                margin-left: 20px;
                .el-checkbox-button__inner{
                  background-color: #f2f2f2;
                  color: #333333;
                  font-size: 12px;
                }

              }
              .el-checkbox-button.is-checked{
                .el-checkbox-button__inner{
                  background-color: #ff300d;
                  border-color: #ff300d ;
                  color: #ffffff;
                  font-size: 12px;
                }
              }
            }

          }

        }
        .textarea{
          width: 100%;
          display: inline-block;
          margin: 20px 0 20px 100px;
          .el-textarea{
            width: 50%;
          }
        }
        .btn{
          display: inline-block;
          padding-left: 800px;
        }
      }
      .height-foot{
      }

    }
    .el-main{

      ul:first-of-type{

        border-right: 2px dotted #ddd;
        display: inline-block;
        max-width: 650px;
        min-width: 650px;
        float: left;
        /*border*/
        li:first-of-type{
          padding: 50px 50px 88px 70px;
          float:left;
          /*display: inline-block;*/
          .liClass-top{
            /*display: inline-block;*/
            text-align: center;
            img{
              /*display: flex;*/
              /*padding:0 0 5px 30px;*/
            }
            .actClass{
              color: rgb(51,51,51);
              font-weight: 600;
              font-size: 14px;
              margin-left: -10px;
            }
            .unClass{
              font-size: 12px;
              color: #999999;
            }
            .el-rate{
              display: list-item;
              margin: 5px 0;
            }
            i{
              .svg-icon{
                width: 30px;
                height: 15px;
                text-align: center;
                margin-left: -30px;
              }
            }
          }
          .liClass-foot{
            /*display: inline-block;*/
            text-align: center;
            margin-top: 30px;
          }
        }
        li:last-of-type{
          /*display: inline-block;*/
          padding: 50px 98px 88px 0;
          float: right;
          /*max-width: 650px;*/
          /*min-width: 650px;*/
          .divClass{
            padding-bottom: 13px;
            .actClass{
              color: rgb(51,51,51);
              font-weight: 600;
              font-size: 12px;
              padding-right: 20px;
              text-align: right;
            }
            .unClass{
              font-size: 12px;
              color: #999999;
              padding-right: 20px;
              text-align: right;
            }
            .blueClass{
              color: #1890ff;
              font-size: 12px;
            }
            span:nth-of-type(2){

            }
          }
          .divClass.last{
            margin-bottom: 0;
            .unClass{
              padding-right: 45px;
            }
          }
        }
      }
      ul:last-of-type{

        float: left;
        margin-left: 50px;
        margin-top: 50px;
        li{
          padding-top: 10px;
          p{
            position: relative;
            display: block;
            color: #333333;
            font-size: 14px;

          }
          span{
            padding-top: 2px;
            font-size: 14px;
            color: #999999;
          }

        }
        li:not(:last-of-type){
          p:before{
            content: '';
            display: block;
            height: 30px;
            width: 2px;
            background: #979797;
            position: absolute;
            top: 24px;
            left: -14px;
            /*border: 2px solid #ddd;*/
          }
        }
        li:first-of-type{
          padding-top: 0;
        }

        li:first-of-type:before{
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #80cc5a;
          position: relative;
          top: 18px;
          left: -18px;


        }
        li:not(:first-of-type):not(:last-of-type):before{
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #999999;
          position: relative;
          top: 15px;
          left: -16px;
          /*left: 56px;*/

        }
        li:last-of-type:before{
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #e6454a;
          position: relative;
          top: 10px;
          left: -18px;
          /*left: 156px;*/


        }
      }
    }


    .el-footer {
      /*background-color: #B3C0D1;*/
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }

</style>
