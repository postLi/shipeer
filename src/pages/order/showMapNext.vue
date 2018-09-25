<template>
  <div class="p_r margin_10 height_100 b_c_w o_f">
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
            <span class="order-value">{{parm.useCarTime}}</span>
          </div>
          <div class="flex_1"><span class="order-key">起步价（{{carTypeName}}）：</span><span class="order-value">¥{{price}}元</span></div>
          <!--<div class="flex_1"><span class="order-value">全程预计需要<span class="c-3">{{time}}</span>分钟</span></div>-->
          <div class="flex_1"><span class="order-value">全程预计需要<span class="c-3">{{time}}</span></span></div>
        </div>

        <div class="flex_a margin_t_10">
          <div class="flex_1">
            <span class="order-key">所需车型：</span>
            <span class="order-value">{{carTypeName}}</span>
          </div>
          <div class="flex_1"><span class="order-key">超里程费（{{kmPrice}}公里）：</span><span class="order-value">¥{{outstripPrice}}元</span></div>
          <div class="flex_1"></div>
        </div>
        <div class="margin_t_10 order-key">若产生高速费、停车费和搬运费,根据实际费用由用户支付 若涉及逾时等候费,请按照收费标准支付</div>

        <div class="order-route">



          <route-line :data="parm.shipperLineDtoList" from="showMapNext"></route-line>


        </div>

        <div class="flex_ae total">
          <div class="order-value">总计：</div>
          <div>¥{{parm.totalAmount}}元</div>
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

        <div class="flex margin_20">
          <el-button class=" f_w" style="background-color: #2fb301;width: 140px;height: 46px;font-size: 16px;" type="success" @click="pay()">去支付</el-button>
        </div>

      </div>



    </div>
  </div>

</template>

<script>
  import { getApi ,postApi} from "@/api/api.js";
  import routeLine from './routeLine.vue'
    export default {
      name: "showMapNext",
      props:["getDuration"],
      components:{routeLine},
      data(){
          return{
            radio:1,
            payTypeId:1,
            payTypeList:[{id:1,name:'马上付款'},{id:2,name:'装货时付款'},{id:3,name:'收货时付款'}],
            form:[],
            parm:{},
            carItem:{},
            time:'',
            carTypeName:'',
            price:0,//标准起步价(元)
            kmPrice:0,//标准起步价(公里)
            outstripPrice:0,//超里程费
          }
      },
      methods:{
        pay(){
          if(this.parm.distance < 0.1){
            this.$message.warning("距离必须大于0.1公里");
            return
          }
          postApi('/aflc-order/aflcOrderApi/createOrder',this.parm).then((res)=>{
            console.log(res)
            if(res !== ''){
            }
          });
        },
        selectPay(id){
          this.payTypeId = id;
        }
      },
      mounted(){
        this.form = this.$localStorage.get("formDown");

        let priceId,priceType,serivceCode,carType;
        this.form.carList.forEach((item)=>{
          if(item.carType === this.form.carId){
            this.carItem = item;
            priceId = item.list[0].id;
            priceType = item.list[0].priceType;
            serivceCode = item.list[0].serivceCode;
            carType = item.carType;
            this.carTypeName = item.carTypeName
          }
        });
        console.log(this.form)
        this.parm = {
          aflcPriceDto: {
            priceId: priceId,//定价id
            priceType: priceType,//定价类型 1标准定价 2区域定价
            spec: this.form.specCode//车辆规格
          },
          belongCity: this.form.code[1],//订单所属区域(定位的城市id)
          "couponId": "string",//优惠券id
          distance: 0,//实际总距离(地图计算)
          extraPrice: this.form.tipName,//附加小费
          extraPriceCode: this.form.tipId,//附加小费编码
          extraServiceDtoList: [
            {
              extraId: this.form.requestId,//额外服务id
              "remark": "string"//额外服务描述
            }
          ],
          goodsName: this.form.goodsName,//货物名称
          goodsVolume: this.form.wightName,//货物体积（方）
          goodsWeight: this.form.volumeName,//货物重量（吨）
          ip: "",//客户端ip地址(app端不用传)
          isFirst: (this.form.isFirst)?1:0 ,//我的司机优先接单(1为true，0为false)
          orderFrom: "web",//订单来源(ios,android)
          orderPrice: 0,//订单原价格(未减优惠券，优惠金的金额)(地图计算)
          "preferentialAmountId": "string",//优惠金id
          remark: this.form.remark,//给司机捎句话
          serviceCode: serivceCode,//服务分类（同城，省际,零担）
          shipperId:  this.$localStorage.get("28ky-userdata").shipperId,//货主id(app端不用传)
          shipperLineDtoList: this.form.to,//路线列表
          totalAmount: 0,//总价格(地图计算)
          useCarTime: new Date(this.form.time).format("yyyy-MM-dd hh:mm:ss"),//用车时间(yyyy-MM-dd HH:mm:ss)
          usedCarType: carType//用车类型（车辆类型）
        };

        let coordinate = this.parm.shipperLineDtoList;
        let map = new AMap.Map(this.$refs.allMapNext, {});
        let truckOptions = {
          map: map,
          // policy:1,
          size:1,
          //city:'',
          //panel:'panel'
        };
        let driving = new AMap.TruckDriving(truckOptions);
        let path = [];
        coordinate.forEach((item)=>{
          item.origin = `${item.origin} ${(item.floorHousenum)?item.floorHousenum:''}`;//楼层与祥细地址拼接
          path.push({lnglat:item.originCoordinate.split(',').reverse()});
        });
        driving.search(path,(status, result) =>{
          this.parm.distance = result.routes[0].distance/1000;
          this.price =  this.carItem.list[0].price;
          this.kmPrice =  this.carItem.list[0].kmPrice;
          let outstripPrice =  this.carItem.list[0].outstripPrice;

          console.log('超里程费' + outstripPrice)
          console.log('距离' +this.parm.distance)

          if(this.parm.distance - this.kmPrice > 0){
            let distance = this.parm.distance - this.kmPrice;
            this.outstripPrice = distance.toFixed(0) * outstripPrice;
            this.parm.orderPrice =  this.price + this.outstripPrice;
          }else {
            this.parm.orderPrice =  this.price;
          }
          this.parm.totalAmount = this.parm.orderPrice + this.parm.extraPrice * 1;
          console.log(this.parm)

          let leftTime = result.routes[0].time;
          let d = parseInt(leftTime / 3600 / 24);
          let h = parseInt((leftTime / 3600) % 24);
          let m = parseInt((leftTime / 60) % 60);
          let s = parseInt(leftTime % 60);
          if(d === 0 && h === 0){
            this.time = `${m}分${s}秒`;

          } else if(d === 0){
            this.time = `${h}小时${m}分${s}秒`;
          } else {
            this.time = `${d}天${h}小时${m}分${s}秒`;
          }

        });
      },
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
    overflow: auto;
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
    height: 29px;
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
