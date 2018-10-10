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
      <div class="bg"></div>
      <el-main>

        <OrderDetail></OrderDetail>
      </el-main>

    </el-container>
  </div>
</template>

<script>
  import {getUserInfo,getOrderDtaial} from '@/utils/auth'
  import {postEvaluateShipper,getSysDictByCodesGet} from '@/api/concentrateAxios/orderManage'
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  import OrderDetail from '@/components/orderDetail/index'
  export default {
    components:{
      OrderDetail
    },
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
        orderDetailData: getOrderDtaial(),
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
          return false
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
            "userId": this.orderDetailData.driverId,
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
    width: calc(100% - 20px);
    height: calc(100% - 100px);


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
    .bg{
      height: 10px;
      background:url("../../assets/myorder/flower.png") repeat-x;
    }
    .el-main{
      background: #fff;
      /*margin-top: 10px;*/
      padding: 0;

    }


    .el-footer {
      /*background-color: #B3C0D1;*/
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }

</style>
