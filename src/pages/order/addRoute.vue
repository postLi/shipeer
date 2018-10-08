<template>
  <div class="add-route" v-if="window">
  <div class="title flex_sb margin_b_10">
  <span class="window-title-left c-3">新增常用路线</span>
  <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="window = false">
  </div>

  <div class="add-route-item ">
    <el-form :model="form" ref="routeRules" class="myForm-m">
      <div v-for="(item,index) in form.addRoute" :key="index" class="margin_b_10">
        <div class="flex_sb">
         <span v-if="index === 0" class="window-title-left c-3">提货地</span>
          <span v-if="index > 0 && index + 1 !== form.addRoute.length" class="window-title-left c-3">途经地</span>
          <span v-if="index + 1 === form.addRoute.length" class="window-title-left c-3">目的地</span>
          <el-button v-if="index === 1" class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="addDestination(form.addRoute.length)">新增目的地</el-button>
          <el-button v-if="index > 1 " class=" f_w" style="background-color: #ff300d;width: 105px" type="danger" size="small" @click="delDestination(index)">删除目的地</el-button>
        </div>

        <route-item :data="item" :index="index"></route-item>

      </div>
    </el-form>
  </div>
    <div class="flex margin_t_20">
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
            form:{
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
                  shipperSort: 0,
                  checkRoute:true
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
                  shipperSort: 1,
                  checkRoute:true
                }]
            },


          }
      },
      methods:{
        save(){
          this.$refs.routeRules.validate((valid) => {
            if (valid) {
              let parm =  {
                "aflcShipperLineDtos": this.form.addRoute,
                "shipperLineName": new Date() * 1
              };
              postApi('/aflc-uc/aflcShipperLineApi/addAflcShipperLine' ,parm).then((res)=>{
                if(res.data){
                  this.$emit("addRoute", "addRoute");
                  this.$message.success('操作成功');
                  this.window = false;
                }
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        showWindow(){
          this.window = !this.window;
          this.form.addRoute = [
            {
              tel:'',
              name:'',
              floor:'',
              cityCode: "",
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
              shipperSort: 0,
              checkRoute:true
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
              shipperSort: 1,
              checkRoute:true
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
          this.form.addRoute.splice(i,1);
          this.form.addRoute.forEach((item ,i)=>{
            item.shipperSort = i
          })
        },
        addDestination(i){
          if(this.form.addRoute.length >=10){
            this.$message.warning('最多只能添加十条目的地');
            return
          }
          this.form.addRoute.push({
              tel:'',
              name:'',
              floor:'',
              cityCode: "",
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
              shipperSort: i,
              checkRoute:true
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
