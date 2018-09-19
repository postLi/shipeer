<template>
  <div class="address-line flex_f" v-show="showAddress.show">
    <div class="title flex_sb margin_b_10">
      <span class="window-title-left">选用常用地址</span>
      <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="showAddress.show = false">
    </div>
    <div class="search flex_sb">
      <div class="search-body flex_a">
        <div class="flex_1 height_100 search-left flex_a">
          <input type="text" v-model="search_address" class="my-input margin_l_10" placeholder="请输入关键字搜索">
        </div>

        <div class="search-right height_100 flex pointer">
          搜索
        </div>

      </div>
      <div class="p_r">
        <el-button size="small" @click="openWindow()" type="primary">新增常用地址</el-button>
        <div class="add-route" v-if="window">
          <div class="title flex_sb margin_b_10">
            <span class="window-title-left">新增常用地址</span>
            <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="close()">
          </div>

          <div class="add-route-item">
            <div class="window-title-left">提货地</div>
            <div class="item-base-flex flex_a margin_t_10">
              <img src="../../assets/main/menpaih.png" alt="">
              <input id="pickerInput" class="my-input margin_l_10" style="height: 32px" placeholder="地址" v-model="form.address"/>
            </div>

            <div class="flex_r margin_t_10">
              <div class="flex_1 item-base-flex flex_a margin_r_10">
                <img src="../../assets/main/menpaih.png" alt="">
                <input class="my-input margin_l_10" placeholder="楼层及门牌号" v-model="form.floorHousenum"/>
              </div>

              <div class="flex_1 item-base-flex flex_a margin_r_10">
                <img src="../../assets/main/fahuor.png" alt="">
                <input class="my-input margin_l_10" placeholder="发货联系人（选填）" v-model="form.contacts"/>
              </div>

              <div class="flex_1 item-base-flex flex_a">
                <img src="../../assets/main/nav_phone.png" alt="">
                <input class="my-input margin_l_10" placeholder="联系电话（必填）" v-model="form.contactsPhone"/>
              </div>
            </div>
          </div>
          <div class="flex margin_t_10">
            <el-button class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="save()">保 存</el-button>
            <el-button plain class=" f_w" style="background-color: white;width: 105px;color: #999999;border-color: #979797" size="small" @click="close()">取 消</el-button>
          </div>
        </div>
      </div>

    </div>
    <div class="flex_1 o_f">
      <div v-if="addressList.length > 0">
        <div  class="address-item flex_a" v-for="(item,index) in addressList" :key="item.id">
          <div class="height_100 address-item-left flex_1 flex_f_c">
            <div>{{item.summary}}</div>
            <div>{{item.address}}</div>
            <div>{{item.contacts}} {{item.contactsPhone}}</div>
          </div>
          <div class="height_100 flex_a address-item-right margin_r_10">
            <div class="edit pointer" @click="edit(item)">编辑</div>
            <div class="del pointer" @click="del(item.id)">删除</div>
          </div>
        </div>
      </div>
      <div v-else class="flex height_100 window-title-left">还没有地址</div>
    </div>

  </div>
</template>

<script>
  import { getApi ,postApi} from "@/api/api.js";
  import VueJsCookie from 'vue-js-cookie'
  import {REGEX} from '@/utils/valiRegex.js'
    export default {
      name: "showAddress",
      props:["showAddress","type"],
      watch:{
      },
      data(){
        return{
          search_address:'',
          window:false,
          addressList:[],
          form:{
            "address": "",//详细地址
            "cityCode": "",//城市编码（格式440100）
            "contacts": "",//联系人
            "contactsPhone": "",//联系电话
            "coordinate": "",//发货地坐标
            "floorHousenum": "",//楼层及门牌号
            "provinceCityArea": "",//省市区（格式:广东省广州市天河区）
            "summary": "",//地点简称
            "type": ''//区分货主(1为发货人，0为收货人)
          }
        }
      },
      methods:{
        close(){
          this.window = false;
          this.getList();
        },
        edit(item){
          this.window = !this.window;
          this.form = item;
          if(this.window === true){
            this.loadUI()
          }else {

          }
        },
        del(id){
          this.$confirm('此操作将删除选择的数据, 是否确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postApi('/aflc-uc/aflcShipperContactsApi/deleteContactsList',[id]).then(() => {
                this.$message.info('删除成功');
                this.getList();
            })

          })
        },
        save(){
          if(this.form.coordinate === ''){
            this.$message.warning("没有获取到坐标点，保存失败");
            return
          }
          if(this.form.contactsPhone === ''){
            this.$message.warning("手机号码必填");
          }else {
            if(!REGEX.MOBILE.test(this.form.contactsPhone)){
              this.$message.warning("手机号码格式错误");
              return
            }
          }
          let conf = {
            headers:{"user_token":this.$localStorage.get("28ky-userdata").userToken,},
          };
          if(this.form.id){
            postApi('/aflc-uc/aflcShipperContactsApi/updateContactsList',this.form,conf).then((res)=>{
              if(res !== ''){
                this.$message.success("修改成功");
                this.window = false;
                this.getList();
              }
            });
          }else {
            postApi('/aflc-uc/aflcShipperContactsApi/addContactsList',this.form,conf).then((res)=>{
              if(res !== ''){
                this.$message.success("新增成功");
                this.window = false;
                this.getList();
              }
            });
          }
        },
         poiPickerReady(poiPicker) {
          window.poiPicker = poiPicker;
          poiPicker.on('poiPicked', (poiResult)=> {
            console.log(poiResult)
            if(poiResult.item.location === undefined){
              this.$message.warning("没有获取到地址");
              return
            }
            this.form.address = `${poiResult.item.district?poiResult.item.district:''}${poiResult.item.address}`;
            this.form.cityCode = poiResult.item.adcode;
            this.form.coordinate = `${poiResult.item.location.lat},${poiResult.item.location.lng}`;
            this.form.provinceCityArea = poiResult.item.district;
            this.form.summary = poiResult.item.name;
            this.form.type = this.type;
          });
        },
        openWindow(){
          this.window = !this.window;
          this.form ={
            "address": "",
            "cityCode": "",
            "contacts": "",
            "contactsPhone": "",
            "coordinate": "",
            "floorHousenum": "",
            "provinceCityArea": "",
            "summary": "",
            "type": ''
          };
          if(this.window === true){
            this.loadUI()
          }else {

          }
        },
        loadUI(){
          AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) =>{
            let poiPicker = new PoiPicker({
              input: 'pickerInput'
            });
            this.poiPickerReady(poiPicker);
          });
        },
        getList(){
          //收发货人地址列表
          let userData = this.$localStorage.get("28ky-userdata");
          let formData = new FormData();
          formData.append("access_token ",VueJsCookie.get('28kytoken'));
          formData.append("user_token ",userData.userToken);
          formData.append("currentPage",1);
          formData.append("pageSize",1000);
          formData.append("type",this.type);
          postApi('/aflc-uc/aflcShipperContactsApi/getContactsList',formData).then((res)=>{
            this.addressList = res.list;
          });
        }
      },
      created(){},
      mounted(){},
    }
</script>

<style scoped lang="scss">
  .add-route{
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
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

  .address-line{
    position: absolute;
    top: 41px;
    right: 0;
    z-index: 200;
    width: 486px;
    height: 262px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px #DEDEDE;
    padding: 8px;
    box-sizing: border-box;

    .search{
      .search-body{
        width: 298px;
        height: 35px;
        border-radius: 3px;
        .search-left{
          background-color: #f2f2f2;
          border: 1px solid #f2f2f2;
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;

        }
        .search-right{
          width: 50px;
          color: white;
          background-color: #2fb301;
          border: 1px solid #2fb301;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
        }
      }
    }
    .address-item{
      height: 61px;
      border-bottom: 1px dotted #f2f2f2;

      .address-item-left{
        font-size: 12px;
        :nth-of-type(1){
          color: #333333;
        }
        :nth-of-type(2),:nth-of-type(3){
          color: #999999;
        }
      }
      .address-item-right{
        .edit{
          font-size: 12px;

          color: #1890ff;
          margin-right: 36px;
        }
        .del{
          font-size: 12px;

          color: #ff300d;
        }
      }
    }

  }
</style>
