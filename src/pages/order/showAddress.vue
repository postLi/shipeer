<template>
  <div class="address-line flex_f" v-show="showAddress.show">
    <div class="title flex_sb margin_b_10">
      <span class="window-title-left c-3">选用常用地址</span>
      <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="showAddress.show = false">
    </div>
    <div class="search flex_sb">
      <div class="search-body flex_a">
        <div class="flex_1 height_100 search-left flex_a">
          <input type="text" v-model="queryKeyword" class="my-input margin_l_10" placeholder="请输入关键字搜索">
        </div>

        <div class="search-right height_100 flex pointer window-title-left" @click="getList()">
          搜索
        </div>

      </div>
      <div class="p_r">
        <el-button size="small" @click="openWindow()" type="primary">新增常用地址</el-button>
        <div class="add-route" v-if="window">
          <div class="title flex_sb margin_b_10">
            <span class="window-title-left c-3">{{name}}常用地址</span>
            <img src="../../assets/main/changydz_close.png" alt="" class="pointer" @click="close()">
          </div>

          <address-item :data="form" :type="type" ref="address"></address-item>

          <div class="flex margin_t_20">
            <el-button class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="save()">保 存</el-button>
            <el-button plain class=" f_w" style="background-color: white;width: 105px;color: #999999;border-color: #979797" size="small" @click="close()">取 消</el-button>
          </div>
        </div>
      </div>

    </div>
    <div class="flex_1 o_f">
      <div v-if="addressList.length > 0">
        <div  class="address-item flex_a" v-for="(item,index) in addressList" :key="item.id">
          <div class="height_100 address-item-left flex_1 flex_f_c" @click="selectAddress(item)" title="点击选择地址">
            <div class="pointer width_max">{{item.summary}}</div>
            <div class="pointer width_max">{{item.address}}</div>
            <div class="pointer width_max">{{item.contacts}} {{item.contactsPhone}}</div>
          </div>
          <div class="height_100 flex_a address-item-right margin_r_10">
            <div class="edit pointer" @click="edit(item.id)">编辑</div>
            <div class="del pointer" @click="del(item.id)">删除</div>
          </div>
        </div>
      </div>
      <div v-else class="flex height_100 window-title-left c-3">还没有地址</div>
    </div>

  </div>
</template>

<script>
  import addressItem from "@/components/addressItem"
  import { getApi ,postApi,deleteApi,putApi} from "@/api/api.js";
  import VueJsCookie from 'vue-js-cookie'
  import {REGEX} from '@/utils/valiRegex.js'
    export default {
      name: "showAddress",
      props:["showAddress","type"],
      components:{addressItem},
      watch:{
      },
      data(){
        return{
          name:'',
          queryKeyword:'',
          window:false,
          addressList:[],
          form:{
            address: "",//详细地址
            cityCode: "",//城市编码（格式440100）
            contacts: "",//联系人
            contactsPhone: "",//联系电话
            coordinate: "",//发货地坐标
            floorHousenum: "",//楼层及门牌号
            provinceCityArea: "",//省市区（格式:广东省广州市天河区）
            summary: "",//地点简称
            type: '',//区分货主(0为发货人，1为收货人)

          }
        }
      },
      methods:{
        selectAddress(item){
          console.log(item)
          this.showAddress.show = false;
          this.$emit("selectAddress", item);
        },
        close(){
          this.window = false;
          this.getList();
        },
        edit(id){
          this.name= "编辑";
          this.window = !this.window;
          getApi(`/aflc-uc/usercenter/aflcShipperContacts/v1/${id}`).then((res)=>{
            this.form = res.data;
          });

        },
        del(id){
          this.$confirm('此操作将删除选择的数据, 是否确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteApi(`/aflc-uc/usercenter/aflcShipperContacts/v1/delete/${id}`).then(() => {
                this.$message.info('删除成功');
                this.getList();
            })

          })
        },
        save(){
          console.log(this.form)
          this.$refs.address.$refs['addressRules'].validate((valid) => {
            if (valid) {
              if(this.form.id){
                putApi('/aflc-uc/usercenter/aflcShipperContacts/v1/update',this.form).then((res)=>{
                  if(res !== '' || res !== null){
                    this.$message.success("修改成功");
                    this.window = false;
                    this.getList();
                  }
                });
              }else {
                postApi('/aflc-uc/usercenter/aflcShipperContacts/v1/add',this.form).then((res)=>{
                  if(res !== '' || res !== null){
                    this.$message.success("新增成功");
                    this.window = false;
                    this.getList();
                  }
                });
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },

        openWindow(){
          this.name= "新增";
          this.window = !this.window;
          this.form ={
            address: "",
            cityCode: "",
            contacts: "",
            contactsPhone: "",
            coordinate: "",
            floorHousenum: "",
            provinceCityArea: "",
            summary: "",
            type: '',
          };

        },

        getList(){
          //收发货人地址列表
          let parm = {
            currentPage: 1,
            pageSize: 1000,
            vo: {
              type:this.type, //类型（0：常用发货人，1：常用收货人）
              queryKeyword:this.queryKeyword,
            }
          };
          postApi('/aflc-uc/usercenter/aflcShipperContacts/v1/list',parm).then((res)=>{
            this.addressList = res.data.list;
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
        height: 32px;
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
