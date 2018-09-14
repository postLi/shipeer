<template>
  <div class="height_100 flex_r">

<div class="margin_10 flex_1 b_c_w" >
  <div class="tip">
    <span class="title">小提示</span>
    <span class="title1">（<span>*</span>号为必填项）</span>
  </div>

  <div class="item-1 flex_r">
    <div class="item-l"><span class="f_r">*</span>选择城市：</div>
    <el-select v-model="form.city" placeholder="请选择城市" size="small" style="width: 250px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <div class="item-1-2">
      <span>选择用车时间：</span>
      <el-date-picker
        prefix-icon="el-icon-date"
        style="width: 250px"
        size="small"
        v-model="form.date"
        type="date"
        :picker-options="pickerOptions1"
        placeholder="选择日期">
      </el-date-picker>
    </div>

    <div  class="item-1-3">
      <el-select v-model="form.city" placeholder="选择时间" size="small" style="width: 121px">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

  </div>

  <div class="item-2">
    <div class="item-l"><span class="f_r">*</span>选择车型：</div>
  </div>


  <div class="item-3 flex_r">
    <div class="item-l">特殊规格(选填)：</div>
    <el-button size="small" @click="buttonClick(item.id)" v-for="(item,index) in buttonList" :key="item.id" :style="{'background-color':(item.id === buttonId)?'#1890ff':'#f2f2f2','color':(item.id === buttonId)?'white':'black'}">{{item.name}}</el-button>
  </div>

  <div class="item-4 flex_r">
    <div class="item-l"><span class="f_r">*</span>提货地：</div>
    <div class="flex">
      <div class="item-4-1 flex_sb">
        <div class="flex_1" @click="showMap()">必填</div>
        <div>常用地址</div>

        <div style="position: absolute;top: 40px;left: 10px">
          dfsgsdfgsd
        </div>
      </div>
      <el-button size="small" @click="" style="background-color: #2fb301;color: white">选择常用路线</el-button>

    </div>


  </div>

</div>

    <!--<el-button type="text" @click="test()"> map</el-button>-->

<div class="content" v-show="dialogVisible">
  <div class="window" >
    <div class="title flex_a padding_l_10">提货地</div>
    <div class="margin_10">
      <span>你可以拖动地图选择位置</span>
      <el-input
        type="textarea"
        autosize
        placeholder="提货详细地址（如：输入“xx工业区”，再从下拉框选择一个地址）"
        :autosize="{ minRows: 2, maxRows: 4}"
        v-model="form.form.address">
      </el-input>
      <el-input
        style="width: 220px"
        class="margin_t_10"
        autosize
        placeholder="发货人联系电话（必填）"
        size="small"
        v-model="form.form.tel">
      </el-input>
      <el-input
        style="width: 220px"
        class="margin_t_10"
        autosize
        placeholder="提货联系人（选填）"
        size="small"
        v-model="form.form.name">
      </el-input>
      <el-input
        style="width: 220px"
        class="margin_t_10"
        autosize
        placeholder="楼层及门牌号（选填）"
        size="small"
        v-model="form.form.floor">
      </el-input>
      <el-checkbox v-model="form.form.checked">保存为常用地址</el-checkbox>
      <div class="flex">
        <el-button class="margin_t_10" style="background-color: #2fb301;width: 80px" type="success" size="small">确定</el-button>
      </div>

    </div>
  </div>
  <div  class="map-content" ref="allmap"></div>
</div>


  </div>

</template>

<script>
  import myDialog from '../../components/myDialog'
    export default {
        name: "order",
      data() {
        return {
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime()  + 3600 * 1000 * 24 < Date.now();
            }
            },
          buttonId:1,
          buttonList:[{id:1,name:"加长"},{id:2,name:"拆座"},{id:3,name:"高栏"}],
          options: [{
            value: '1',
            label: '广州'
          }, {
            value: '2',
            label: '地方'
          }],
          options1: [{
            value: '1',
            label: '立即用车'
          }, {
            value: '2',
            label: '12:00'
          }],
          dialogVisible: false,
          map:null,
          form:{
            city:'',
            date:'',
            form:{address:'',tel:'',name:'',floor:'',checked:false}
          }
        }
      },
      methods:{
        buttonClick(id){
          this.buttonId = id;
        },
          showMap(){
            this.getMap();
            this.dialogVisible = !this.dialogVisible;
          },
        getMap(){
          this.map.addControl(new BMap.MapTypeControl({//添加地图类型控件
            mapTypes:[
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
            ]}));
          this.map.setCurrentCity("北京");// 设置地图显示的城市 此项是必须设置的
          this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        },
        createMap(){
          let map =new BMap.Map(this.$refs.allmap);
          map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);// 初始化地图,设置中心点坐标和地图级别
          this.map = map;
        },
      },

      components: {
        myDialog
      },
      mounted(){
        this.createMap();
        // this.$http.post(`index.php?controller=Statistics&action=terminal&token`, {}).then(res => {
        // console.log(res)
        // })
      }
    }
</script>

<style scoped lang="scss">
  .content{
    position: relative;
  }
  .map-content{
    width: 940px;
    height: 478px;
    overflow: hidden;
  }
  .window{
    width: 278px;
    height: 333px;
    background-color: white;
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 10px;
    .title{
      height: 38px;
      background-color: #2fb301;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #ffffff;
    }
  }

  .tip{
    margin: 22px 0 0 20px;
    .title{
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #ff300d;
    }
    .title1{
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #999999;
      span{
        color: #ff300d;
      }
    }
  }

  .item-l{
    width: 140px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0;
    color: #333333;
  }
.item-1{
  width: 940px;
  margin: 19px 0 0 20px;

  .item-1-2{
    margin-left: 50px;
    width: 366px;
    span{
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #333333;
    }
  }
}
  .item-2{
    width: 940px;
    margin: 19px 0 0 20px;
  }

  .item-3{
    margin: 19px 0 0 20px;
  }

  .item-4{
    margin: 19px 0 0 20px;
    .item-4-1 {
      position: relative;
      width: 940px;
      height: 32px;
      background-color: #ffffff;
      border-radius: 2px;
      border: solid 1px #dcdfe6;
      :nth-of-type(1){
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #999999;
      }
      :nth-of-type(2){
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #46a6ff;
      }
    }
  }

</style>
