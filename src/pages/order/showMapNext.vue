<template>
  <div class="p_r height_100 b_c_w o_f">
    <div class="width_100 height_100" ref="allMapNext"></div>
    <div class="order flex_f">
      <div class="title flex_sb">
        <div class="left">确认订单信息</div>
        <div class="right pointer flex_a" @click="toOrderManage()">
          <img src="../../assets/order/xiugaidd.png" alt="">
         <span>修改订单</span> 
        </div>
      </div>

      <div class="order-body flex_1">
        <div class="flex_a">
          <div class="flex_1">
            <span class="order-key">用车时间：</span>
            <span class="window-title-12 c-3">{{parm.useCarTime}}</span>
          </div>
          <div class="flex_1"><span class="order-key">起步价（{{carTypeName}}）：</span><span class="window-title-12 c-3">¥{{price}}元</span></div>
          <!--<div class="flex_1"><span class="window-title-12">全程预计需要<span class="c-3">{{time}}</span>分钟</span></div>-->
          <div class="flex_1"><span class="window-title-12 c-3">全程预计需要<span class="c-18">{{time}}</span></span></div>
        </div>

        <div class="flex_a margin_t_10">
          <div class="flex_1">
            <span class="order-key">所需车型：</span>
            <span class="window-title-12 c-3">{{carTypeName}}</span>
          </div>
          <div class="flex_1"><span class="order-key">超里程费（{{kmPrice}}公里）：</span><span class="window-title-12 c-3">¥{{outstripPrice}}元</span></div>
          <div class="flex_1"></div>
        </div>
        <div class="margin_t_10 order-key">若产生高速费、停车费和搬运费,根据实际费用由用户支付 若涉及逾时等候费,请按照收费标准支付</div>

        <div class="order-route">

          <route-line :data="parm.shipperLineDtoList" from="showMapNext"></route-line>


        </div>

        <div class="flex_es total">
          <div class="flex_ae">
            <div class="window-title-12 c-3">总计：</div>
            <div class="font-1">¥{{parm._totalAmount}}元</div>
            <div class="p_r">
              <div class="window-title-12 c-3 margin_l_10">(已减免{{reduce}}元，<span class="font-3 pointer" @click="showExchange()">更多优惠</span>)</div>
              <div class="exchange-owner flex_f" v-if="windowExchange">
                <div class="window-title-left c-3 flex_sb">
                  <span>我的优惠卷</span>
                  <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="windowExchange = false">
                </div>
                  <div class="o_f flex_1 margin_t_10" >
                    <div v-if="couponList.length > 0" class="exchange-item flex_a margin_b_10 pointer" v-for="(item,index) in couponList" :key="item.id" @click="selectExchange(item)">
                      <div class="exchange-item-left flex" :style="{'background-image':backgroundImg,'filter':(parm.couponId === item.id)?'brightness(100%)':'brightness(70%)'}">
                        <div v-if="item.couponType === 'AF046201'">
                          <div class="exchange-item-font1 flex">￥{{item.remissionDiscount}}</div>
                          <div class="exchange-item-font2">满{{item.conditionDeduction}}可用</div>
                        </div>
                        <div v-if="item.couponType === 'AF046202'">
                          <div class="exchange-item-font1 flex">{{item.remissionDiscount}}折</div>
                          <div class="exchange-item-font2">最高抵扣{{item.conditionDeduction}}元</div>
                        </div>
                      </div>

                      <div class="exchange-item-right flex_1 flex height_100">
                        <div>
                          <div class="window-title-left c-3">【{{item.couponName}}】{{item.couponTypeName}}</div>
                          <div class="window-title-left c-3" style="padding: 0 7px;">{{item.endTime}}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="flex window-title-left">
                      还没有优惠卷
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <div class="margin_l_10 font-2 pointer" @click="$router.push('/chargeStandard')">收费标准</div>

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

          <div class="padding_10" v-if="payTypeId === 1">
            <div class="flex_a pay-select">
              <el-radio class="flex" style="margin-top: 2px;" v-model="payChannel" label="ye" @change="radioChange">&nbsp; </el-radio>
              <icon-svg iconClass="ddqr_yue" class="svg" style="width: 45px;height: 32px"></icon-svg>
              <div class="pay-select-name">余额支付</div>
              <div class="order-key">（可用余额<span class="c-r">{{balance}}</span>元）</div>
              <div class="window-title-12 c-9 pointer" style="margin-left: 100px" @click="$router.push('/toPayCoupon')">立即充值</div>
            </div>

            <div class="flex_a pay-select">
              <el-radio class="flex" style="margin-top: 2px;"  v-model="payChannel" label="wx">&nbsp;</el-radio>
              <icon-svg iconClass="lll01wet" class="svg"></icon-svg>
              <div class="pay-select-name">微信支付</div>
              <div class="order-key margin_l_10">搬运等额外费用可在司机装货后支付</div>
              <div class="pay-discount c-r">(优惠8元)</div>
            </div>
            <div class="flex_a pay-select">
              <el-radio class="flex" style="margin-top: 2px;"  v-model="payChannel" label="ali">&nbsp;</el-radio>
              <icon-svg iconClass="lll02zfb" class="svg"></icon-svg>
              <div class="pay-select-name">支付宝支付</div>
              <div class="order-key margin_l_10">搬运等额外费用可在司机装货后支付</div>
              <div class="pay-discount c-r">(优惠8元)</div>
            </div>
          </div>

          <div class="padding_10 flex height_100 window-title-left c-3" v-if="payTypeId === 4">
            装货时付款，等候时间按装货时间的2倍计算，装货时间超过30分钟，将产生等候费
          </div>
          <div class="padding_10 flex height_100 window-title-left c-3" v-if="payTypeId === 3">
            收货时付款，等候时间按装货时间的2倍计算，装货时间超过30分钟，将产生等候费
          </div>
        </div>

        <div class="flex margin_20">
          <el-button class=" f_w" style="background-color: #2fb301;width: 140px;height: 46px;font-size: 16px;" type="success" @click="pay()">
            <span v-if="payTypeId === 1">去支付</span>
            <span v-else>去叫车</span>
          </el-button>
        </div>
      </div>
    </div>


    <el-dialog
      title="微信支付"
      :visible.sync="centerDialogVisible"
      width="600px"
      center>
      <div class="content">
        <div class="contLeft">
          <p>充值金额（元）</p>
          <p>{{parm._totalAmount}}</p>
          <img :src="pfimg" alt="">

          <p>二维码有效时长为2个小时<br>
            请尽快支付</p>
        </div>
        <div class="contRight">
          <img src="../../assets/myorder/lll-iPhone X.png" alt="">
          <img src="../../assets/myorder/saoyisao.png" alt="">
          <p>请使用微信扫一扫</p>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="支付宝支付"
      :visible.sync="centerDialogVisiblezfb"
      width="600px"
      center>
      <div class="content">
        <div class="contLeft">
          <p>充值金额（元）</p>
          <p>{{parm._totalAmount}}</p>
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
    </el-dialog>


  </div>

</template>

<script>
  import { getApi ,postApi,imgApi} from "@/api/api.js";

  import routeLine from './routeLine.vue'
    export default {
      name: "showMapNext",
      props:["getDuration"],
      components:{routeLine},
      watch:{
        centerDialogVisiblezfb(n){
          if(!n){
            clearTimeout(this.timer)
          }
        },
        centerDialogVisible(n){
          if(!n){
            clearTimeout(this.timer)
          }
        }
      },
      data(){
          return{
            backgroundImg:'url(' + require('../../assets/order/youhuiq.png') + ')',
            centerDialogVisible:false,//微信窗口
            centerDialogVisiblezfb:false,//支付宝窗口
            pfimg:'',
            windowExchange:false,
            payChannel:"wx",
            payTypeId:1,
            payTypeList:[{id:1,name:'马上付款'},{id:4,name:'装货时付款'},{id:3,name:'收货时付款'}],
            form:[],
            parm:{},
            carItem:{},
            time:'',
            carTypeName:'',
            serivceCode:'',
            price:0,//标准起步价(元)
            kmPrice:0,//标准起步价(公里)
            outstripPrice:0,//超里程费
            couponList:[],
            reduce:0,//已减免
            orderId:'',//订单Id
            balance:0//充值金额
          }
      },
      methods:{
        findMywallet(){
          //我的钱包
          postApi('/aflc-uc/aflcMywalletApi/findMywallet').then((res)=>{
            if(res.status === 200){
              this.balance = res.data.mywallet.balance
            } else {

            }
          });
        },
        balanceCheck(){
          this.$confirm(`账户余额不足，还需要充值${this.parm._totalAmount - this.balance}元`, '提示', {
            confirmButtonText: '去充值',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/toPayCoupon')
          }).catch(() => {
            //
          });
        },

       async radioChange(e){
          if(e === 'ye'){
           await this.findMywallet();
           if(this.balance < this.parm._totalAmount){
             await this.balanceCheck()
           }
          }
        },
        toOrderManage(){
          this.$router.push('/OrderManage/allOrder');
        },
        selectExchange(item){
        console.log(item)
        this.windowExchange = false;
         if(this.parm.couponId !== item.id){
           this.math();
           if(item.couponType === "AF046201"){
             if(item.conditionDeduction < this.parm._orderPrice){
               this.parm.couponId = item.id;
               this.reduce = item.remissionDiscount;
               this.parm._orderPrice = this.parm._orderPrice - this.reduce;
               this.parm._totalAmount = this.parm._orderPrice + this.parm.extraPrice * 1;
             }else {
               this.$message.warning(`满${item.conditionDeduction}可用`)
             }
           }

           if(item.couponType === "AF046202"){
             this.parm.couponId = item.id;
             if(this.parm._orderPrice * item.remissionDiscount/10 > item.conditionDeduction){
               this.reduce = item.conditionDeduction;
               this.parm._orderPrice = this.parm._orderPrice - item.conditionDeduction
             }else {
               this.reduce = this.parm._orderPrice - this.parm._orderPrice * item.remissionDiscount/10;
               this.parm._orderPrice = this.parm._orderPrice * item.remissionDiscount/10
             }
             this.parm._totalAmount = this.parm._orderPrice + this.parm.extraPrice * 1;
           }

         }else{
           this.parm.couponId = '';
           this.reduce = 0;
           this.math();
         }

        },
        showExchange(){
          this.windowExchange = !this.windowExchange;
          if(this.windowExchange){
            let parm = {
              currentPage: 1,
              pageSize: 100,
              vo: {
                couponStatusName: "未使用",
                carType:this.form.carId,
                userId: this.$localStorage.get("28ky-userdata").shipperId
              }
            };
            postApi('/aflc-sm/aflcCouponExchangeApiOwner/exchangeOwner',parm).then((res)=>{
              if(res.status === 200){
                this.couponList = res.data.list;
              }
            });
          }

        },

        getPayResult(rid,payChannel){
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            postApi(`/aflc-pay/api/pay/shipper/common/v1/tradeQuery/${rid}`,payChannel).then(res=>{
              if(res.status === 200){
                // 支付成功
                this.$router.replace("/OrderManage/already");
              } else {
                // 支付失败
                this.getPayResult(rid,payChannel)
              }

            }).catch(err=>{
              // 支付失败
              this.getPayResult(rid,payChannel)
            })
          }, 3000)
        },
        fr(res){
          let fr=new FileReader();
          fr.readAsDataURL(res);
          fr.onload=(e)=>{
            this.pfimg=e.target.result;
            this.getPayResult(this.orderId,{payChannel:this.payChannel})
          }
        },
       async pay(){
          if(this.parm.distance < 0.1){
            this.$message.warning("距离必须大于0.1公里");
            return
          }

          if(this.payTypeId === 1){
            if(this.payChannel === "ye"){
            await this.findMywallet();
              if(this.balance < this.parm._totalAmount){
                await this.balanceCheck()
              }else {
                this.$confirm(`确定支付${this.parm._totalAmount}元的运费吗？`, '', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: ''
                }).then(() => {
                  postApi(`/aflc-uc/aflcMywalletApi/mywalletPay/${this.orderId}`).then((res)=>{
                    if(res.status === 200){
                      this.$message.success("支付成功");
                      this.$router.replace('/OrderManage/already')
                    } else {

                    }
                  });
                }).catch(() => {
            //
                });
              }

            }else{

             await this.createOrder();//3.加上优惠金优惠卷创建订单
             await imgApi(`/aflc-pay/pay/shipper/common/v1/scanPayOrder/${this.orderId}`,{payChannel:this.payChannel}).then((res)=>{//单独请求
                if(this.payChannel === "wx"){
                  this.centerDialogVisible = true;
                  this.fr(res);
                }
                if(this.payChannel === "ali"){
                  this.centerDialogVisiblezfb = true;
                  this.fr(res);
                }

              })

            }
          }
          if(this.payTypeId === 4){
            this.cashOnDelivery(4);
          }
          if(this.payTypeId === 3){
            this.cashOnDelivery(3);
          }

        },
        cashOnDelivery(id){
          postApi(`/aflc-order/aflcOrderApi/cashOnDelivery?type=${id}&orderSerial=${this.orderId}`).then((res)=>{
            if(res.status === 200){
              this.$router.push({path: '/orderRouter/getPickUp',query: {
                  tab: "派单中",
                  qy:{orderId:this.orderId},
                }})
            }
          })
        },
        selectPay(id){
          this.payTypeId = id;
        },
       async getPreferential(){
          let parm = {
            areaCode: this.form.code[1],
            carType: this.form.carId,
            discountLevel: this.$localStorage.get("28ky-userdata").discountLevel,
            serivceCode: this.serivceCode,
            totalAmount: this.parm.orderPrice,//总价格(起步价+超里程费)
            userId: this.$localStorage.get("28ky-userdata").shipperId
          };
          //获取优惠金及优惠券(司机端)
          await postApi('/aflc-order/aflcOrderApi/getPreferential',parm).then((res)=>{
            console.log(res)
            if(res.status === 200){
              // this.parm.couponId = ""
              // this.parm.preferentialAmountId = ''
            } else {
              this.$message.warning(res.errorInfo)
            }
          });
        },
       async createOrder(){
         await postApi('/aflc-order/aflcOrderApi/createOrder',this.parm).then((res)=>{
            console.log(res)
            if(res.status === 200){
              this.orderId = res.data;
            } else {
              this.$message.warning(res.errorInfo)
            }
          });
        },
        math(){
          let outstripPrice =  this.carItem.list[0].outstripPrice;
          if(this.parm.distance - this.kmPrice > 0){
            let distance = this.parm.distance - this.kmPrice;
            // console.log(distance)
            // console.log( outstripPrice)
            // console.log(distance * outstripPrice)
            this.outstripPrice = Math.ceil(distance * outstripPrice);

            // console.log(this.outstripPrice)
            this.parm.orderPrice =  this.price + this.outstripPrice;
          }else {
            this.parm.orderPrice =  this.price;
          }
          this.parm._orderPrice =  this.parm.orderPrice;
          this.parm._totalAmount = this.parm.totalAmount  = this.parm.orderPrice + this.parm.extraPrice * 1;

        }
      },
      mounted(){
        this.form = this.$localStorage.get("formDown");

        let priceId,priceType,carType;
        this.form.carList.forEach((item)=>{
          if(item.carType === this.form.carId){
            this.carItem = item;
            priceId = item.list[0].id;
            priceType = item.list[0].priceType;
            this.serivceCode = item.list[0].serivceCode;
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
          couponId: "",//优惠券id
          distance: 0,//实际总距离(地图计算)
          extraPrice: this.form.tipName,//附加小费
          extraPriceCode: this.form.tipId,//附加小费编码
          extraServiceDtoList: this.form.extraServiceDtoList,//额外服务
          goodsName: this.form.goodsName,//货物名称
          goodsVolume: this.form.wightName,//货物体积（方）
          goodsWeight: this.form.volumeName,//货物重量（吨）
          ip: "",//客户端ip地址(app端不用传)
          isFirst: (this.form.isFirst)?1:0 ,//我的司机优先接单(1为true，0为false)
          orderFrom: "web",//订单来源(ios,android)
          orderPrice: 0,//订单原价格(未减优惠券，优惠金的金额)
          _orderPrice:0,//订单原价格(未减优惠券，优惠金的金额)(计算,不是接口字段)
          preferentialAmountId: "",//优惠金id
          remark: this.form.remark,//给司机捎句话
          serviceCode: this.serivceCode,//服务分类（同城，省际,零担）
          shipperId:  this.$localStorage.get("28ky-userdata").shipperId,//货主id(app端不用传)
          shipperLineDtoList: this.form.to,//路线列表
          totalAmount: 0,//总价格
          _totalAmount: 0,//总价格(计算,不是接口字段)
          useCarTime: new Date(this.form.time).format("yyyy-MM-dd hh:mm:ss"),//用车时间(yyyy-MM-dd HH:mm:ss)
          usedCarType: carType//用车类型（车辆类型）
        };
        let size;
        switch (carType) {
          case "AF01801":
            size = 1;
            break;
          case "AF01802":
            size = 2;
            break;
          case "AF01803":
            size = 3;
            break;
          case "AF01804":
            size = 4;
            break;
        }
        let coordinate = this.parm.shipperLineDtoList;
        let map = new AMap.Map(this.$refs.allMapNext, {});
        let truckOptions = {
          map: map,
          // policy:1,
          size:size,
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
          this.math();//1.计算总金额
          this.getPreferential();//2.获取优惠金优惠卷

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
      created(){
        this.findMywallet();
        let parm = {
          currentPage: 1,
          pageSize: 100,
          vo: {}
        };
        postApi('/aflc-uc/aflcUserRewardApi/findAflcReward',parm).then((res)=>{
          console.log(res)
          if(res.status === 200){
            
          } else {
            this.$message.warning(res.errorInfo)
          }
        });

      },
      destroyed(){
        //this.$localStorage.remove("formDown");
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
    .c-18{
    color: #1890ff;
  }
  }

  .order-route{
    width: 467px;
    height: 119px;
    overflow: auto;
  }
  .total{
    .font-1{
      font-size: 18px;
      color: #e6454a;
    }
    .font-2{
      font-size: 12px;
      color: #5eb2ff;
      text-decoration: underline;
    }
    .font-3{
      font-size: 12px;
      color: #e6454a;
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

  .exchange-owner{
    position: absolute;
    top: 0;
    left: 140px;
    width: 318px;
    height: 331px;
    background-color: #f2f2f2;
    box-shadow: 4px 4px 8px 0
    rgba(153, 153, 153, 0.5);
    z-index: 300;
    padding: 10px;
    .exchange-item{
      height: 80px;
      .exchange-item-left{
        height: 80px;
        width: 86px;
        color: #ffffff;
        .exchange-item-font1{
          font-size: 22px;
        }
        .exchange-item-font2{
          font-size: 12px;
        }
      }
      .exchange-item-right{
        background-color: white;
      }
    }
  }

  .select-exchange{
    border: 1px solid;
    box-sizing: content-box;
  }

    .svg-icon{
      width: 45px;
      height: 45px;
    }

  .content{
    .contLeft{
      float: left;
      margin: 40px 100px 120px 50px;
      text-align: center;
      p:first-of-type{
        font-size: 12px;
        color: #333333;
      }
      p:nth-of-type(2){
        font-size: 16px;
        color: #ff300d;
        padding-top: 5px;
      }
      p:last-of-type{
        font-size: 12px;
        color: #333333;
        padding-top: 10px;
      }
      img{
        width: 154px;
        height: 154px;
      }
    }
    .contRight{
      position: relative;
      text-align: center;
      img:nth-of-type(2){
        position: absolute;
        top: 50px;
        left: 270px;
        width: 100px;
        height: 100px;
      }
      /*float: right;*/
    }
  }
</style>
