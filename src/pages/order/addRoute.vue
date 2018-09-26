<template>
  <div class="add-route" v-if="window">
  <div class="title flex_sb margin_b_10">
  <span class="window-title-left">新增常用路线</span>
  <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="window = false">
  </div>

  <div class="add-route-item ">
    <div v-for="(item,index) in addRoute" :key="index" class="margin_b_10">
        <div class="flex_sb">
         <span v-if="index === 0" class="window-title-left">提货地</span>
          <span v-if="index > 0 && index + 1 !== addRoute.length" class="window-title-left">途经地</span>
          <span v-if="index + 1 === addRoute.length" class="window-title-left">目的地</span>
          <el-button v-if="index === 1" class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="addDestination(addRoute.length)">新增目的地</el-button>
          <el-button v-if="index > 1 " class=" f_w" style="background-color: #ff300d;width: 105px" type="danger" size="small" @click="delDestination(index)">删除目的地</el-button>
        </div>



      <div class="item-base-flex flex_a margin_t_10">
        <img src="../../assets/main/tihuod.png" alt="">
       <input @focus="toLoadUI(item,index)" :ref="index" class="my-input margin_l_10" placeholder="地址" v-model="item.origin"/>
      </div>
      <!--<div class="flex_r margin_t_10">-->
        <!--<div class="flex_1 item-base-flex flex_a margin_r_10">-->
          <!--<img src="../../assets/main/menpaih.png" alt="">-->
          <!--<input class="my-input margin_l_10" placeholder="楼层及门牌号" v-model="item.floor"/>-->
        <!--</div>-->
        <!--<div class="flex_1 item-base-flex flex_a margin_r_10">-->
         <!--<img src="../../assets/main/fahuor.png" alt="">-->
          <!--<input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="item.name"/>-->
        <!--</div>-->
        <!--<div class="flex_1 item-base-flex flex_a">-->
          <!--<img src="../../assets/main/nav_phone.png" alt="">-->
          <!--<input class="my-input margin_l_10" placeholder="联系电话（选填）" v-model="item.tel"/>-->
        <!--</div>-->
      <!--</div>-->


      <!--<route-item :address="form.origin"-->
                    <!--:floorHousenum="form.floor" @inputFloorHousenum="value => { form.floor = value }"-->
                    <!--:contacts="form.name"  @inputContacts="value => { form.name = value }"-->
                    <!--:contactsPhone="form.tel"  @inputContactsPhone="value => { form.tel = value }"-->
                    <!--:index="index"></route-item>-->



    </div>
  </div>
    <div class="flex">
      <el-button class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="save()">保 存</el-button>
      <el-button plain class=" f_w" style="background-color: white;width: 105px;color: #999999;border-color: #979797" size="small" @click="window = false">取 消</el-button>
    </div>
  </div>
</template>

<script>
  import { getApi ,postApi} from "@/api/api.js";
  import routeItem from "@/components/routeItem"
    export default {
        name: "addRoute",
      components:{routeItem},
      data(){
          return{
            window:false,
              addRoute:[
                {
                  tel:'',
                  name:'',
                  floor:'',
                  cityCode: "",//城市编码（格式440100）
                  origin: "",//详细地址
                  originCoordinate: "",//地点坐标(小的在前)
                  originName: "",//地点名称
                  provinceCityArea: "",//省市区（格式:广东省广州市天河区）
                  shipperSort: 0
                },
                {
                tel:'',
                name:'',
                floor:'',
                cityCode: "",
                origin: "",
                originCoordinate: "",
                originName: "",
                provinceCityArea: "",
                shipperSort: 1
              }]

          }
      },
      methods:{
        save(){
          let check =  this.addRoute.some((item)=>{
            return item.originCoordinate === ''
          });

          if(check){
            this.$message.warning('收发货地址没有获取到坐标点');
            return
          }

        let parm =  {
            "aflcShipperLineDtos": this.addRoute,
            "shipperLineName": new Date() * 1
          };
          postApi('/aflc-uc/aflcShipperLineApi/addAflcShipperLine' ,parm).then((res)=>{
            if(res){
              this.$emit("addRoute", "addRoute");
              this.$message.success('操作成功');
              this.window = false;
            }
          });
        },
        showWindow(){
          this.window = !this.window;
          this.addRoute = [
            {
              tel:'',
              name:'',
              floor:'',
              cityCode: "",
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
              shipperSort: 0
            },
            {
              tel:'',
              name:'',
              floor:'',
              cityCode: "",
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
              shipperSort: 1
            }]
        },
        toLoadUI(item,i){
          AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) =>{
            let poiPicker = new PoiPicker({
              input: this.$refs[i][0]
            });
            this.toPoiPickerReady(item,poiPicker);
          });
        },
        toPoiPickerReady(item,poiPicker) {
          window.poiPicker = poiPicker;
          poiPicker.on('poiPicked', (poiResult)=> {
            console.log(poiResult)
            if(poiResult.item.location === undefined){
              this.$message.warning("没有获取到地址");
              return
            }

            let geocoder = new AMap.Geocoder({});
            geocoder.getAddress([poiResult.item.location.lng,poiResult.item.location.lat], (status, result) =>{
              if (status === 'complete' && result.info === 'OK') {
                console.log(result)
                this.$set(item,'origin',result.regeocode.formattedAddress);
                this.$set(item,'cityCode',result.regeocode.addressComponent.adcode);
                this.$set(item,'originCoordinate',`${poiResult.item.location.lat},${poiResult.item.location.lng}`);
                this.$set(item,'originName',poiResult.item.name);
                this.$set(item,'provinceCityArea',`${result.regeocode.addressComponent.province}${result.regeocode.addressComponent.city}${result.regeocode.addressComponent.district}`);
              }
            });

          });
        },
        delDestination(i){
          this.addRoute.splice(i,1);
          this.addRoute.forEach((item ,i)=>{
            item.shipperSort = i
          })
        },
        addDestination(i){
          if(this.addRoute.length >=10){
            this.$message.warning('最多只能添加十条目的地');
            return
          }
          this.addRoute.push({
              tel:'',
              name:'',
              floor:'',
              cityCode: "",
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
              shipperSort: i
            })

        },
      }
    }
</script>

<style scoped lang="scss">
  .add-route{
    z-index: 2;
    position: absolute;
    top: 0;
    width: 509px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px #DEDEDE;
    box-sizing: border-box;
    padding: 10px 20px;
    .add-route-item{
      margin-top: 20px;
    }
  }
  .item-base-flex{
    height: 31px;
    border-radius: 2px;
    border: solid 1px #dcdfe6;
    box-sizing: border-box;
    img{
      margin-left: 3px;
    }
  }

</style>
