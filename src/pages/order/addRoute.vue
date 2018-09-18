<template>
  <div class="add-route" v-if="window">
  <div class="title flex_sb margin_b_10">
  <span class="window-title-left">新增常用路线</span>
  <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="window = false">
  </div>

  <div class="add-route-item">
  <div class="window-title-left">提货地</div>
  <div class="item-base-flex flex_a margin_t_10">
  <img src="../../assets/main/menpaih.png" alt="">
  <input class="my-input margin_l_10" placeholder="地址" v-model="addRoute.from.address"/>
  </div>

  <div class="flex_r margin_t_10">
  <div class="flex_1 item-base-flex flex_a margin_r_10">
  <img src="../../assets/main/menpaih.png" alt="">
  <input class="my-input margin_l_10" placeholder="楼层及门牌号" v-model="addRoute.from.floor"/>
  </div>

  <div class="flex_1 item-base-flex flex_a margin_r_10">
  <img src="../../assets/main/fahuor.png" alt="">
  <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="addRoute.from.name"/>
  </div>

  <div class="flex_1 item-base-flex flex_a">
  <img src="../../assets/main/nav_phone.png" alt="">
  <input class="my-input margin_l_10" placeholder="联系电话（必填）" v-model="addRoute.from.tel"/>
  </div>
  </div>
  </div>

  <div class="add-route-item ">
    <div v-for="(item,index) in addRoute.to" :key="index" class="margin_b_10">
        <div class="flex_sb">
         <span class="window-title-left">目的地</span>
          <el-button v-if="index === 0" class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="addDestination()">新增目的地</el-button>
          <el-button v-if="index !== 0" class=" f_w" style="background-color: #ff300d;width: 105px" type="danger" size="small" @click="delDestination(index)">删除目的地</el-button>
        </div>
      <div class="item-base-flex flex_a margin_t_10">
        <img src="../../assets/main/menpaih.png" alt="">
       <input class="my-input margin_l_10" placeholder="地址" v-model="item.address"/>
      </div>
      <div class="flex_r margin_t_10">
        <div class="flex_1 item-base-flex flex_a margin_r_10">
          <img src="../../assets/main/menpaih.png" alt="">
          <input class="my-input margin_l_10" placeholder="楼层及门牌号" v-model="item.floor"/>
        </div>
        <div class="flex_1 item-base-flex flex_a margin_r_10">
         <img src="../../assets/main/fahuor.png" alt="">
          <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="item.name"/>
        </div>
        <div class="flex_1 item-base-flex flex_a">
          <img src="../../assets/main/nav_phone.png" alt="">
          <input class="my-input margin_l_10" placeholder="联系电话（选填）" v-model="item.tel"/>
        </div>
      </div>
    </div>
  </div>
    <div class="flex">
      <el-button class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="">保 存</el-button>
      <el-button plain class=" f_w" style="background-color: white;width: 105px;color: #999999;border-color: #979797" size="small" @click="window = false">取 消</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "addRoute",
      data(){
          return{
            window:false,
            addRoute:{//新增线路
              from:{address:'',tel:'',name:'',floor:''},
              to:[{address:'',tel:'',name:'',floor:''}]
            },
          }
      },
      methods:{
        showWindow(){
          this.window = !this.window;
        },
        delDestination(i){
          this.addRoute.to.splice(i,1)
        },
        addDestination(){
          if(this.addRoute.to.length >=10){
            this.$message.warning('最多只能添加十条目的地');
            return
          }
          this.addRoute.to.push({address:'',tel:'',name:'',floor:''})

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
