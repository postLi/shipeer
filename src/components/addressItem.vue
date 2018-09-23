<template>
  <div class="add-route-item">
    <div class="window-title-left" v-if="type === 1">提货地</div>
    <div class="window-title-left" v-if="type === 0">收货地</div>
    <div class="item-base-flex flex_a margin_t_10">
      <img src="../assets/main/tihuod.png" alt="">
      <input id="pickerInput" class="my-input margin_l_10" style="height: 32px" placeholder="地址" v-model="data.address"/>
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
        <input class="my-input margin_l_10" :placeholder="(type === 1)?'联系电话（必填）':'联系电话（选填）'" v-model="data.contactsPhone"/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "addressItem",
      props:["data","type"],
      created(){

      }
    }
</script>

<style scoped lang="scss">
  .add-route-item{
    margin-top: 20px;
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
