<template>
  <div class="odPayForClass-lll-un">
    <el-container class="clearfix">
      <el-header class="clearfix">
        <div class="height-top">
          <div class="unLeft">

            <!--<div class="clearfix uploadcard">-->
              <!--<upload :title="'本地上传'" :showFileList="true" :limit="4" listtype="picture" v-model="liList.img"-->
                      <!--/>-->
            <!--</div>-->
            <ul>
              <template v-for="(item,index) in detailData.receiptUrls">
                <li v-if="detailData.length>0"><img :src="item" alt=""></li>

              </template>


              <!--<li><img src="../../assets/login/code.png" alt=""></li>-->
              <!--<li><img src="../../assets/login/code.png" alt=""></li>-->
            </ul>


          </div>
          <div class="unRight">
            <ul>
              <li>订单号：{{isRouteData.orderSerial}}</li>
              <li>司机已卸货</li>
              <li>订单将于<span>{{isRouteData.autoComplateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span> 自动完成<br>
                您也可以手动完成哦！</li>
              <li> <el-button type="success" @click="submit">确认收货</el-button></li>
              <li></li>
            </ul>
          </div>
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
  import {parseTime} from '@/utils/'
  import {getUserInfo,getOrderDtaial} from '@/utils/auth'
  import Upload from '@/components/Upload/singleImage2'
  import OrderDetail from '@/components/orderDetail/index'
  import {postConfirmGoods} from '@/api/concentrateAxios/orderManage'
  export default {
    data(){
      return{
        tabId:0,
        radio: '1',
        value5: 3.7,
        activeNames: '',
        changeItem: '',
        userData: getUserInfo(),
        detailData: getOrderDtaial(),
        liList:{
          img:''
        },
        isRouteData:{}
        // activeNames: ['1']
      }
    },
    components: {
      Upload,
      OrderDetail
    },
    mounted(){
      this.isRouteData = JSON.parse(this.$route.query.qy)
      console.log(this.isRouteData)
    },
    methods: {
      submit(){
        let possObj
        possObj = postConfirmGoods(this.isRouteData.qy.orderSerial,this.userData.shipperId).then(res=>{
          if(res.status ===200){
            this.$message.success('收货成功~')
            this.$router.push({path: '/order'})
          }else{
            this.$message.warning(res.text || res.errorInfo || '无法获取服务端数据~')
          }
        })
      },
      changeActive(item,index){
        this.tabId = index
        this.changeItem = item

      },
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="scss">

  .odPayForClass-lll-un{
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
        margin: 20px 0;
        .unLeft{
          padding: 40px 40px 23px 50px;
          float: left;
          /*display: inline-block;*/
          /*padding-right: 50px;*/
          /*border-right: 2px solid #ddd;*/

          ul{
            li{
              float: left;
              padding-right: 10px;
              img{
                width: 195px;
                height: 158px;
              }
            }
          }

          .el-dialog{
            margin-top:10vh !important;
            margin: 0 auto 20px !important;
          }


        }
        .unRight{
          float: left;
          /*display: inline-block;*/
          padding: 40px 50px 23px 50px;
          display: inline-block;
          ul{
            text-align: center;
            li:first-of-type{
              font-size: 14px;
              color: #999999;
            }
            li:nth-of-type(2){
              font-size: 18px;
              color: #7cbb50;
              padding: 28px 0 5px 18px;
              font-weight: 600;
            }
            li:nth-of-type(3){
              font-size: 12px;
              color: #999999;
              span{
                font-size: 12px;
                color: #3b99f0;
              }
            }
            li:nth-of-type(4){
              margin-top: 30px;
            }
          }
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
      padding:0;
      /*overflow: hidden;*/
    }
    .el-footer {
      /*background-color: #B3C0D1;*/
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }

</style>
