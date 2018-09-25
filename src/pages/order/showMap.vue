<template>
  <div class="content-top" v-show="dialogVisible">
    <div class="content" >
      <div class="window" >
        <div class="title-4 f_w flex_a padding_l_10" v-if="data.shipperSort === 0">提货地</div>
        <div class="title-4 f_w flex_a padding_l_10" v-if="data.shipperSort !== 0">目的地</div>
        <div class="margin_10">
          <span>你可以拖动地图选择位置</span>
          <el-input
            type="textarea"
            autosize
            placeholder="详细地址（如：输入“xx工业区”，再从下拉框选择一个地址）"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="data.origin">
          </el-input>
          <el-input
            style="width: 220px"
            class="margin_t_10"
            autosize
            :placeholder="(data.shipperSort === 0)?'发货人联系电话（必填）':'收货人联系电话（选填）'"
            size="small"
            v-model="data.consigneeMobile">
          </el-input>
          <el-input
            style="width: 220px"
            class="margin_t_10"
            autosize
            :placeholder="(data.shipperSort === 0)?'提货联系人（选填）':'收货联系人（选填）'"
            size="small"
            v-model="data.consignee">
          </el-input>
          <el-input
            style="width: 220px"
            class="margin_t_10"
            autosize
            placeholder="楼层及门牌号（选填）"
            size="small"
            v-model="data.floorHousenum">
          </el-input>
          <el-checkbox v-model="checked">保存为常用地址</el-checkbox>
          <div class="flex">
            <el-button class="margin_t_10 f_w" style="background-color: #2fb301;width: 80px" type="success" size="small" @click="save()">确定</el-button>
          </div>

        </div>
      </div>

      <img src="../../assets/main/ditu_close.png" class="close pointer" alt="" @click="close()">
      <div  class="map-content" ref="allmap"></div>
    </div>
  </div>
</template>

<script>
  import {REGEX} from '@/utils/valiRegex.js'
  import { getApi ,postApi} from "@/api/api.js";
    export default {
        name: "showMap",
      props:['data','map'],
      data(){
          return {
            dialogVisible:false,
            checked:false,
            parm :{
              address: "",//详细地址
              cityCode: "",//城市编码（格式440100）
              contacts: "",//联系人
              contactsPhone: "",//联系电话
              coordinate: "",//发货地坐标
              floorHousenum: "",//楼层及门牌号
              provinceCityArea: "",//省市区（格式:广东省广州市天河区）
              summary: "",//地点简称
              type: '',//区分货主(1为发货人，0为收货人)
            }
          }
      },
      methods:{
        save(){
          if(this.data.shipperSort === 0){
            if(this.data.consigneeMobile === ''){
              this.$message.warning("手机号码必填");
              return
            }else {
              if(!REGEX.MOBILE.test(this.data.consigneeMobile)){
                this.$message.warning("手机号码格式错误");
                return
              }
            }
          }else {
            if(!REGEX.MOBILE.test(this.data.consigneeMobile) && this.data.consigneeMobile !== ''){
              this.$message.warning("手机号码格式错误");
              return
            }
          }
          this.dialogVisible = false;
          // this.data.map.destroy( );
          this.parm.contacts = this.data.consignee;
          this.parm.contactsPhone = this.data.consigneeMobile;
          this.parm.floorHousenum = this.data.floorHousenum;
          if(this.checked){
            postApi('/aflc-uc/aflcShipperContactsApi/addContactsList',this.parm).then((res)=>{
              if(res !== ''){
                this.$message.success("新增成功");
              }
            });
          }
          this.data.map = null

        },
          ok(){
            this.dialogVisible = true;

            let centerPoint;

            this.data.mapTo = new AMap.Map(this.$refs.allmap, {
              zoom: 14,
              scrollWheel: true,
              // center: centerPoint
            });
            if(this.data.originCoordinate === ""){
              // console.log(this.data.mapTo.getCenter())
              this.data.originCoordinate = [this.data.mapTo.getCenter().lat,this.data.mapTo.getCenter().lng].join(',')
            }else {
              centerPoint = this.data.originCoordinate.split(',').reverse();
              this.data.mapTo.setCenter(centerPoint)
            }
            AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) =>{
              var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: this.data.mapTo,
                iconStyle: {
                  url: './static/ti.png',
                  ancher: [16, 56],
                  size: [32,56]
                }
              });

              positionPicker.on('success', (positionResult)=> {
                console.log(positionResult)
                this.data.originCoordinate = [positionResult.position.lat,positionResult.position.lng].join(',');
                this.data.origin = positionResult.address;
                this.data.originName = positionResult.regeocode.pois[0].name;
                this.data.provinceCityArea =  `${positionResult.regeocode.addressComponent.province}${positionResult.regeocode.addressComponent.city}${positionResult.regeocode.addressComponent.district}`
                this.parm  ={
                  address: positionResult.address,//详细地址
                  cityCode: positionResult.regeocode.addressComponent.adcode,//城市编码（格式440100）
                  contacts: this.data.consignee,//联系人
                  contactsPhone: this.data.consigneeMobile,//联系电话
                  coordinate: [positionResult.position.lat,positionResult.position.lng].join(','),//发货地坐标
                  floorHousenum: this.data.floorHousenum,//楼层及门牌号
                  provinceCityArea: `${positionResult.regeocode.addressComponent.province}${positionResult.regeocode.addressComponent.city}${positionResult.regeocode.addressComponent.district}`,//省市区（格式:广东省广州市天河区）
                  summary: positionResult.regeocode.pois[0].name,//地点简称
                  type: (this.data.shipperSort === 0)?1:0,//区分货主(1为发货人，0为收货人)
                }
              });
              positionPicker.on('fail', (positionResult)=> {
              });
              positionPicker.start();

              // AMap.service('AMap.Geocoder',() =>{
              //   let geocoder = new AMap.Geocoder({});
              //   geocoder.getAddress(centerPoint, (status, result) =>{
              //     if (status === 'complete' && result.info === 'OK') {
              //       console.log(result)
              //     }
              //   });
              //   this.data.mapTo.on("zoomchange",(e)=>{
              //     console.log( this.data.mapTo.getCenter())
              //     let centerPoint = [this.data.mapTo.getCenter().lng,this.data.mapTo.getCenter().lat];
              //
              //   })
              //   this.data.mapTo.on("moveend",(e)=>{
              //     console.log( this.data.mapTo.getCenter())
              //     let centerPoint = [this.data.mapTo.getCenter().lng,this.data.mapTo.getCenter().lat];
              //     geocoder.getAddress(centerPoint, (status, result) =>{
              //       if (status === 'complete' && result.info === 'OK') {
              //         console.log(result);
              //
              //       }
              //     });
              //   });
              //
              // })

            });

          },
        close(){
          this.dialogVisible = false;
          // this.data.map.destroy( );
          this.data.map = null
        },
        getMapStatus(map){


        },

      },
      mounted(){

      },
      destroyed(){
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
