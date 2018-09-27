<template>
  <div>

    <div class="item-base-flex flex_a margin_t_10">
      <img src="../assets/main/tihuod.png" alt="">
      <input id="pickerInput" @focus="toLoadUI()" class="my-input margin_l_10" style="height: 32px" placeholder="地址" v-model="data.address"/>
    </div>

    <div class="flex_r margin_t_10">
      <div class="flex_1 item-base-flex flex_a margin_r_10">
        <img src="../assets/main/menpaih.png" alt="">
        <input class="my-input margin_l_10" placeholder="楼层及门牌号" v-model="data.floorHousenum"/>
      </div>

      <div class="flex_1 item-base-flex flex_a margin_r_10">
        <img src="../assets/main/fahuor.png" alt="">
        <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="data.contacts"/>
      </div>

      <div class="flex_1 item-base-flex flex_a">
        <img src="../assets/main/nav_phone.png" alt="">
        <input class="my-input margin_l_10" :placeholder="(type === '0')?'联系电话（必填）':'联系电话（选填）'" v-model="data.contactsPhone"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addressItem",
    props:["data","type"],
    methods:{
      toLoadUI(){
        AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) =>{
          let poiPicker = new PoiPicker({
            input: 'pickerInput'
          });
          this.poiPickerReady(poiPicker);
        });
      },
      poiPickerReady(poiPicker) {
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
                this.data.address = result.regeocode.formattedAddress;
                //result.regeocode.addressComponent.adcode
                this.data.cityCode = result.regeocode.addressComponent.city;
                this.data.coordinate = `${poiResult.item.location.lat},${poiResult.item.location.lng}`;
                this.data.provinceCityArea = `${result.regeocode.addressComponent.province}${result.regeocode.addressComponent.city}${result.regeocode.addressComponent.district}`;
                this.data.summary = poiResult.item.name;
                this.data.type = this.type;
              }
            });
          // this.data.address = `${poiResult.item.district?poiResult.item.district:''}${poiResult.item.address}`;
          // this.data.cityCode = poiResult.item.adcode;
          // this.data.coordinate = `${poiResult.item.location.lat},${poiResult.item.location.lng}`;
          // this.data.provinceCityArea = poiResult.item.district;
          // this.data.summary = poiResult.item.name;
          // this.data.type = this.type;
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
