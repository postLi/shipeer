<template>
  <div >

    <div class="item-base-flex flex_a margin_t_10">
      <img src="../assets/main/tihuod.png" alt="">
      <input id="pickerInput" ref="pickerInput" class="my-input margin_l_10" style="height: 32px" placeholder="地址" :value="myAddress" @input="inputAddress"/>
    </div>

    <div class="flex_r margin_t_10">
      <div class="flex_1 item-base-flex flex_a margin_r_10">
        <img src="../assets/main/menpaih.png" alt="">
        <input class="my-input margin_l_10" placeholder="楼层及门牌号" :value="myFloorHousenum" @input="inputFloorHousenum"/>
      </div>

      <div class="flex_1 item-base-flex flex_a margin_r_10">
        <img src="../assets/main/fahuor.png" alt="">
        <input class="my-input margin_l_10" placeholder="发货联系人（选填）" :value="myContacts" @input="inputContacts"/>
      </div>

      <div class="flex_1 item-base-flex flex_a">
        <img src="../assets/main/nav_phone.png" alt="">
        <input class="my-input margin_l_10" :placeholder="(type === 1 || index === 0)?'联系电话（必填）':'联系电话（选填）'" :value="myContactsPhone" @input="inputContactsPhone"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "routeItem",
    computed:{
      myAddress:function () {
        return this.address
      },
      myFloorHousenum:function () {
        return this.floorHousenum
      },
      myContacts:function () {
        return this.contacts
      },
      myContactsPhone:function () {
        return this.contactsPhone
      }
    },
    methods:{
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
          // item.origin = `${poiResult.item.district?poiResult.item.district:''}${poiResult.item.address}`;
          // item.cityCode = poiResult.item.adcode;
          // item.originCoordinate = `${poiResult.item.location.lat},${poiResult.item.location.lng}`;
          // item.originName = poiResult.item.name;
          // item.provinceCityArea = poiResult.item.district;
        });
      },




      inputAddress(e) {
        let value = e.target.value;
        this.$emit('inputAddress', value);
      },
      inputFloorHousenum(e) {
        let value = e.target.value;
        this.$emit('inputFloorHousenum', value);
      },
      inputContacts(e) {
        let value = e.target.value;
        this.$emit('inputContacts', value);
      },
      inputContactsPhone(e) {
        let value = e.target.value;
        this.$emit('inputContactsPhone', value);
      }
    },
    props:["address","floorHousenum","contacts","contactsPhone","type","index"],
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


<!--<address-item :address="form.address"-->
              <!--:floorHousenum="form.floorHousenum" @inputFloorHousenum="value => { form.floorHousenum = value }"-->
              <!--:contacts="form.contacts"  @inputContacts="value => { form.contacts = value }"-->
              <!--:contactsPhone="form.contactsPhone"  @inputContactsPhone="value => { form.contactsPhone = value }"-->
              <!--:type="type" ref="addrItem"></address-item>-->
