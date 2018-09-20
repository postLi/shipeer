<template>
  <div class="content-top" v-show="dialogVisible">
    <div class="content" >
      <div class="window" >
        <div class="title-4 f_w flex_a padding_l_10">提货地</div>
        <div class="margin_10">
          <span>你可以拖动地图选择位置</span>
          <el-input
            type="textarea"
            autosize
            placeholder="提货详细地址（如：输入“xx工业区”，再从下拉框选择一个地址）"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="data.address">
          </el-input>
          <el-input
            style="width: 220px"
            class="margin_t_10"
            autosize
            placeholder="发货人联系电话（必填）"
            size="small"
            v-model="data.tel">
          </el-input>
          <el-input
            style="width: 220px"
            class="margin_t_10"
            autosize
            placeholder="提货联系人（选填）"
            size="small"
            v-model="data.name">
          </el-input>
          <el-input
            style="width: 220px"
            class="margin_t_10"
            autosize
            placeholder="楼层及门牌号（选填）"
            size="small"
            v-model="data.floor">
          </el-input>
          <el-checkbox v-model="data.checked">保存为常用地址</el-checkbox>
          <div class="flex">
            <el-button class="margin_t_10 f_w" style="background-color: #2fb301;width: 80px" type="success" size="small" @click="ok()">确定</el-button>
          </div>

        </div>
      </div>

      <img src="../../assets/main/ditu_close.png" class="close pointer" alt="" @click="dialogVisible = false">
      <div  class="map-content" ref="allmap"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "showMap",
      props:['data','map'],
      data(){
          return {
            dialogVisible:false
          }
      },
      methods:{
          ok(){
            this.dialogVisible = !this.dialogVisible;
          },
        getMapStatus(map){


        },

      },
      mounted(){

      },
      destroyed(){
          console.log(4444)
      }
    }
</script>

<style scoped lang="scss">
  .content-top{
    position: absolute;top: 40px;z-index: 100;
    .content{
      position: relative;
      box-shadow: 1px 2px 5px 0px #DEDEDE;
      .window{
        width: 278px;
        height: 333px;
        background-color: white;
        position: absolute;
        z-index: 100;
        top: 10px;
        left: 10px;
        .title-4{
          height: 38px;
          background-color: #2fb301;
          font-size: 14px;

        }
      }

      .close{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 102;
      }
    }
  }
  .map-content{
    width: 940px;
    height: 478px;
    overflow: hidden;
  }

</style>
