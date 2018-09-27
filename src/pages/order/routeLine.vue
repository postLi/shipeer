<template>
  <div>
    <div class=" route-item-body flex_1 flex_a" v-for="(item,index) in data" :key="item.id">
      <div class="p_r height_100 route-item-body-left" v-if="index === 0">
        <div class="green-point"></div>
        <div class="green-point-line address-line"></div>
      </div>

      <div class="p_r height_100 route-item-body-left" v-if="index > 0 && index + 1 !== data.length">
        <div class="gray-point"></div>
        <div class="gray-point-up address-line"></div>
        <div class="gray-point-down address-line"></div>
      </div>

      <div class="p_r height_100 route-item-body-left" v-if="index !== 0 && index + 1 === data.length">
        <div class="red-point"></div>
        <div class="red-point-line address-line"></div>
      </div>
      <div v-if="from === 'showMapNext'">
        <div class="window-title-12">{{item.originName}}</div>
        <div class="window-title-10">{{item.origin}}</div>
      </div>

      <div v-if="from === 'order'" @click="selectLine()" class="pointer" title="点击选择路线">
        <div class="window-title-12">{{item.name}}</div>
        <div class="window-title-10">{{item.address}}</div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "routeLine",
      props:["data","from"],
      methods:{
        selectLine(){
          this.$emit("selectLine",this.data)
        }
      }
    }
</script>

<style scoped lang="scss">
  .route-item-body{
    height: 40px;
    .route-item-body-left{
      width: 47px;
    }
  }

  .green-point{
    width: 10px;height: 10px;border-radius: 40px;background-color: green;
    position: absolute;top: 50%;left: 50%;
    transform: translate(-50%,-50%)
  }
  .green-point-line{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 34%);
  }


  .red-point{
    width: 10px;height: 10px;border-radius: 40px;background-color: red;
    position: absolute;top: 50%;left: 50%;
    transform: translate(-50%,-50%)
  }

  .red-point-line{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -132%);
  }

  .gray-point{
    width: 6px;height: 6px;border-radius: 40px;background-color: #999999;
    position: absolute;top: 50%;left: 50%;
    transform: translate(-50%,-50%)
  }
  .gray-point-up{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -132%);
  }
  .gray-point-down{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 34%);
  }

  .address-line {
    width: 2px;
    height: 18px;
    border-radius: 2px;
    background-color: #979797;
  }
</style>
