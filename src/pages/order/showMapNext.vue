<template>
  <div class="p_r ">
    <div class="width_100 height_100" ref="allMapNext"></div>
    <div class="order flex_f">
      <div class="title flex_sb">
        <div class="left">确认订单信息</div>
        <div class="right">修改订单</div>
      </div>

      <div class="order-body flex_1">
        <div class="flex_a">
          <div class="flex_1">
            <span class="order-key">用车时间：</span>
            <span class="order-value">2018-12-20 09:45</span>
          </div>
          <div class="flex_1"><span class="order-key">起步价（小面包车）：</span><span class="order-value">¥45元</span></div>
          <div class="flex_1"><span class="order-value">全程预计需要<span class="c-3">23</span>分钟</span></div>
        </div>

        <div class="flex_a margin_t_10">
          <div class="flex_1">
            <span class="order-key">所需车型：</span>
            <span class="order-value">小面包车</span>
          </div>
          <div class="flex_1"><span class="order-key">超里程费（9公里）：</span><span class="order-value">¥32.4元</span></div>
          <div class="flex_1"></div>
        </div>
        <div class="margin_t_10 order-key">若产生高速费、停车费和搬运费,根据实际费用由用户支付 若涉及逾时等候费,请按照收费标准支付</div>

        <div class="order-route">

        </div>

        <div class="flex_ae total">
          <div class="order-value">总计：</div>
          <div>¥77.4元</div>
          <div class="order-value margin_l_10">(已减免0元)</div>
          <div class="margin_l_10">收费标准</div>
        </div>



        <div class="order-pay">
          <div class="top flex_r">
            <div class="flex_a">付款方式： </div>
            <div class="flex_r top-item">
              <div class="flex_1" v-for="(item,index) in payTypeList" :key="item.id" :class="[(payTypeId === item.id)?'top-item-decoration':'top-item-decoration-no']">
                <div class=" top-item-h pointer flex" @click="selectPay(item.id)" :class="[(payTypeId === item.id)?'':'b-b']">{{item.name}}</div>
              </div>
            </div>

          </div>



          <div class="padding_10">
            <div class="flex_a pay-select">
              <el-radio class="flex" style="margin-top: 2px;" v-model="radio" :label="1">&nbsp; </el-radio>
              <div class="pay-select-name">余额支付</div>
              <div class="order-key">（可用余额<span class="c-r">0.00</span>元）</div>
            </div>

            <div class="flex_a pay-select">
              <el-radio class="flex" style="margin-top: 2px;"  v-model="radio" :label="2">&nbsp;</el-radio>
              <div class="pay-select-name">微信支付</div>
              <div class="order-key margin_l_10">搬运等额外费用可在司机装货后支付</div>
              <div class="pay-discount c-r">(优惠8元)</div>
            </div>
            <div class="flex_a pay-select">
              <el-radio class="flex" style="margin-top: 2px;"  v-model="radio" :label="3">&nbsp;</el-radio>
              <div class="pay-select-name">支付宝支付</div>
              <div class="order-key margin_l_10">搬运等额外费用可在司机装货后支付</div>
              <div class="pay-discount c-r">(优惠8元)</div>
            </div>
          </div>



        </div>

      </div>



    </div>
  </div>

</template>

<script>
    export default {
        name: "showMapNext",
      data(){
          return{
            radio:1,
            payTypeId:1,
            payTypeList:[{id:1,name:'马上付款'},{id:2,name:'装货时付款'},{id:3,name:'收货时付款'}]
          }
      },
      methods:{
        selectPay(id){
          this.payTypeId = id;
        }
      }
    }
</script>

<style scoped lang="scss">
  .order{
    width: 640px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    .title{
      height: 38px;
      background-color: #2fb301;
      padding: 0 10px;
      .left{
        font-size: 14px;
        color: #ffffff;
      }
      .right{
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8)
      }
    }
    .order-body{
      padding: 18px 34px;
    }
    .order-key{
      font-size: 12px;
      color: #999999;
    }
    .order-value{
      font-size: 12px;
      color: #333333;
    }
    .c-3{
    color: #1890ff;
  }
  }

  .order-route{
    width: 467px;
    height: 119px;
  }
  .total{
    :nth-of-type(2){
      font-size: 18px;
      color: #e6454a;
    }
    :nth-of-type(4){
      font-size: 12px;
      color: #5eb2ff;
      text-decoration: underline;
    }
  }
  .order-pay{
    margin-top: 38px;
    width: 100%;
    height: 160px;
    border: 1px solid #1890ff;
    position: relative;
    .top{
      position: absolute;
      top: -30px;
      left: 0;
      height: 30px;
      .top-item{
        width: 300px;
      }
      div{
        font-size: 14px;
      }
    }
  }

  .top-item-decoration{
    border: 1px solid #1890ff;
    border-bottom: none;
    box-sizing: border-box;
  }
  .top-item-decoration-no{
    border: 1px solid transparent;
    border-bottom: #1890ff;
    box-sizing: border-box;
  }

  .top-item-h{
    height: 28px;
    border-bottom: 1px solid white;
  }
  .b-b{
    border-bottom: 1px solid #1890ff;
  }


  .pay-select{
    height: 35px;
    .pay-select-name{
      font-size: 14px;
      color: #333333;
    }
    .pay-discount{
     margin-left: 20px;
    }
  }


  .c-r{
    font-size: 12px;
    color: #e6454a;
  }

</style>
