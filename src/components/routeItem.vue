<template>
  <div >

    <div class="item-base-flex flex_a margin_t_10" :style="{'border-color':data.checkRoute?'#dcdfe6':'red'}">
      <img src="../assets/main/tihuod.png" alt="">
      <!--<input id="pickerInput" @focus="toLoadUI(index)" :ref="index" class="my-input margin_l_10" style="height: 32px" placeholder="地址" v-model="data.origin"/>-->

      <el-form-item label="" label-width="" prop="origin" size="small"
                    :rules="{required: true, validator:(rule, value, callback)=>{
                      return checkMyRoute(rule, data, callback)
                    },trigger: 'change'}">
        <el-input class="myInput-border-none" :ref="index" @focus="toLoadUI(index)" style="font-size: 12px;width: 400px" v-model="data.origin" placeholder="地址"></el-input>
      </el-form-item>
    </div>

    <!--<div class="flex_r margin_t_10">-->
      <!--<div class="flex_1 item-base-flex flex_a margin_r_10">-->
        <!--<img src="../assets/main/menpaih.png" alt="">-->
        <!--<input class="my-input margin_l_10" placeholder="楼层及门牌号" v-model="data.origin"/>-->
      <!--</div>-->

      <!--<div class="flex_1 item-base-flex flex_a margin_r_10">-->
        <!--<img src="../assets/main/fahuor.png" alt="">-->
        <!--<input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="data.origin"/>-->
      <!--</div>-->

      <!--<div class="flex_1 item-base-flex flex_a">-->
        <!--<img src="../assets/main/nav_phone.png" alt="">-->
        <!--<input class="my-input margin_l_10" :placeholder="(type === 1 || index === 0)?'联系电话（必填）':'联系电话（选填）'" v-model="data.origin"/>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "routeItem",
    props:["data","index"],
    computed:{

    },
    data(){
      return{

      }
    },
    methods:{
      checkMyRoute(rule, value, callback){
        if (value.originCoordinate === '' || value.origin === '') {
          callback(new Error("没有获取到坐标点，保存失败"));
          value.checkRoute = false
        }else {
          callback();
          value.checkRoute = true
        }
      },
      toLoadUI(i){
        AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) =>{
          let poiPicker = new PoiPicker({
            input: this.$refs[i].$refs.input
          });
          this.toPoiPickerReady(poiPicker);
        });
      },
      toPoiPickerReady(poiPicker) {
        //window.poiPicker = poiPicker;
        poiPicker.on('poiPicked', (poiResult)=> {
          console.log(poiResult)
          if(poiResult.item.location === undefined){
            this.$message.warning("没有获取到地址");
            this.data.origin = '';
            this.data.cityCode = '';
            this.data.originCoordinate = '';
            this.data.originName = '';
            this.data.provinceCityArea = '';
            return
          }

          let geocoder = new AMap.Geocoder({});
          geocoder.getAddress([poiResult.item.location.lng,poiResult.item.location.lat], (status, result) =>{
            if (status === 'complete' && result.info === 'OK') {
              console.log(result)
              this.data.origin = result.regeocode.formattedAddress;
              this.data.cityCode = result.regeocode.addressComponent.adcode;
              this.data.originCoordinate = `${poiResult.item.location.lat},${poiResult.item.location.lng}`;
              this.data.originName = poiResult.item.name;
              this.data.provinceCityArea = `${result.regeocode.addressComponent.province},${result.regeocode.addressComponent.city},${result.regeocode.addressComponent.district}`;
            }
          });


          // this.$set(item,'origin',result.regeocode.formattedAddress);
          // this.$set(item,'cityCode',result.regeocode.addressComponent.adcode);
          // this.$set(item,'originCoordinate',`${poiResult.item.location.lat},${poiResult.item.location.lng}`);
          // this.$set(item,'originName',poiResult.item.name);
          // this.$set(item,'provinceCityArea',`${result.regeocode.addressComponent.province},${result.regeocode.addressComponent.city},${result.regeocode.addressComponent.district}`);

        });
      },

    },

    created(){

    }
  }
</script>

<style scoped lang="scss">

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

