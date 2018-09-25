<template>
  <div class="height_100 flex_r">
    <div class="margin_10 flex_1 b_c_w o_f flex_f" ref="getTableWH">
      <div class="padding_20" ref="getTop">
        <header class="flex_a f_f">
          <div class="flex_a m-r">
            <span class="window-title-left">地址类型：</span>
            <el-select v-model="addressId" placeholder="请选择" size="small" class="address-width" clearable>
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class="flex_a m-r">
            <span class="window-title-left">地址：</span>
            <el-input v-model="address" placeholder="请输入地址" size="small" class="address-width "></el-input>
          </div>
          <div class="flex_a m-r">
            <span class="window-title-left">联系人：</span>
            <el-input v-model="contacts" placeholder="请输入联系人" size="small" class="address-width "></el-input>
          </div>
          <div class="flex_a m-r">
            <span class="window-title-left">联系电话：</span>
            <el-input v-model="contactsPhone" placeholder="请输入联系电话" size="small" class="address-width "></el-input>
          </div>

          <div class="flex_a">
            <el-button size="small" type="success" icon="el-icon-search" @click="search()" style="background-color: #2fb301;">查询</el-button>
            <el-button size="small"  plain icon="el-icon-refresh" style="	background-color: #dcdcdc;border: solid 1px #dcdfe6;color: white" @click="reset()">重置</el-button>
          </div>
        </header>

        <el-button class="m-15" size="small" type="success" icon="el-icon-search" @click="openWindow()" style="background-color: #2fb301;">新增目的地</el-button>
      </div>


      <el-table class="myTable flex_1" :data="tableData" border :height="heightComputer" :style="{'width': getBodyWidth + 'px'}">
        <el-table-column prop="date" label="序号" label-class-name="table_head" header-align="center" align="center" width="80">
          <template slot-scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="地址类型" label-class-name="table_head" header-align="center" align="center"  width="100">
          <template slot-scope="scope" >
            <div v-if="scope.row.type === 1">提货地址</div>
            <div v-if="scope.row.type === 0">收货地址</div>
          </template>
        </el-table-column>
        <el-table-column prop="cityCode" label="城市" label-class-name="table_head" header-align="center" align="center"  min-width="200"></el-table-column>
        <el-table-column prop="provinceCityArea" label="地址" label-class-name="table_head" header-align="center" align="center"  min-width="200"></el-table-column>

        <el-table-column prop="address" label="详细地址" label-class-name="table_head" header-align="center" align="center"  min-width="200"></el-table-column>

        <el-table-column prop="floorHousenum" label="门牌号" label-class-name="table_head" header-align="center" align="center"  min-width="200"></el-table-column>

        <el-table-column prop="contacts" label="联系人" label-class-name="table_head" header-align="center" align="center"  min-width="200"></el-table-column>

        <el-table-column prop="contactsPhone" label="联系电话" label-class-name="table_head" header-align="center" align="center"  min-width="200"></el-table-column>
        <el-table-column prop="address" label="操作" label-class-name="table_head" header-align="center" align="center" width="140"  fixed="right">
          <template slot-scope="scope" >
            <el-button type="text"  @click="edit(item)" style="text-decoration: underline;color: #1890ff;">编辑</el-button>
            <el-button type="text"  @click="del(item.id)" style="text-decoration: underline;color: #1890ff;">删除</el-button>
          </template>
        </el-table-column>

      </el-table>



      <footer ref="footer">
        <my-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></my-pagination>
      </footer>
    </div>
    <el-dialog
      :title="name +'常用路线'"
      :visible.sync="window"
      width="600px"
      :close="handleClose">
      <div class="add-route-item ">
        <div v-for="(item,index) in addRoute" :key="index" class="margin_b_10">
          <div class="flex_sb">
            <span v-if="index === 0" class="window-title-left">提货地</span>
            <span v-if="index > 0 && index + 1 !== addRoute.length" class="window-title-left">途经地</span>
            <span v-if="index + 1 === addRoute.length" class="window-title-left">目的地</span>
            <el-button v-if="index === 1" class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="addDestination(addRoute.length)">新增目的地</el-button>
            <el-button v-if="index > 1 " class=" f_w" style="background-color: #ff300d;width: 105px" type="danger" size="small" @click="delDestination(index)">删除目的地</el-button>
          </div>

          <div class="item-base-flex flex_a margin_t_10">
            <img src="../../assets/main/tihuod.png" alt="">
            <input @focus="toLoadUI(item,index)" :ref="index" class="my-input margin_l_10" placeholder="地址" v-model="item.origin"/>
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
          <!--<route-item :address="form.origin"-->
                        <!--:floorHousenum="form.floor" @inputFloorHousenum="value => { form.floor = value }"-->
                        <!--:contacts="form.name"  @inputContacts="value => { form.name = value }"-->
                        <!--:contactsPhone="form.tel"  @inputContactsPhone="value => { form.tel = value }"-->
                        <!--:index="index" :ref="index"></route-item>-->
        </div>
      </div>



      <span slot="footer" class="dialog-footer">
    <el-button @click="window = false">取 消</el-button>
    <el-button type="primary" @click="save()">保 存</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
  import {REGEX} from '@/utils/valiRegex.js'
  import { getApi ,postApi} from "@/api/api.js";
  import routeItem from "@/components/routeItem"
  import myPagination from "@/components/myPagination"
  import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "routeManage",
      components:{routeItem,myPagination},
      computed:{
        ...mapGetters(['getBodyWidth',]),
        heightComputer: function() {
          return this.height  - this.topHeight - this.footer;
        },
      },
      data(){
        return{
          window:false,
          name:'',
          type:'',//区分货主id（弹窗）
          p: { page: 1, size: 20, total: 0 },
          height:0,
          topHeight:0,
          footer:0,
          tableData: [],
          addRoute:[
            {
              tel:'',
              name:'',
              floor:'',
              cityCode: "",//城市编码（格式440100）
              origin: "",//详细地址
              originCoordinate: "",//地点坐标(小的在前)
              originName: "",//地点名称
              provinceCityArea: "",//省市区（格式:广东省广州市天河区）
              shipperSort: 0
            },
            {
              tel:'',
              name:'',
              floor:'',
              cityCode: "",
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
              shipperSort: 1
            }],
          form:{
            address: "",//详细地址
            cityCode: "",//城市编码（格式440100）
            contacts: "",//联系人
            contactsPhone: "",//联系电话
            coordinate: "",//发货地坐标
            floorHousenum: "",//楼层及门牌号
            provinceCityArea: "",//省市区（格式:广东省广州市天河区）
            summary: "",//地点简称
            type: '',//区分货主(1为发货人，0为收货人)

          },
          contactsPhone:'',
          contacts:'',
          address:'',
          addressId:'',//区分货主id（搜索）
          options: [{
            id: 1,
            name: '提货地址'
          }, {
            id: 0,
            name: '收货地址'
          }],
        }
      },
      methods:{
        delDestination(i){
          this.addRoute.splice(i,1);
          this.addRoute.forEach((item ,i)=>{
            item.shipperSort = i
          })
        },
        addDestination(i){
          if(this.addRoute.length >=10){
            this.$message.warning('最多只能添加十条目的地');
            return
          }
          this.addRoute.push({
            tel:'',
            name:'',
            floor:'',
            cityCode: "",
            origin: "",
            originCoordinate: "",
            originName: "",
            provinceCityArea: "",
            shipperSort: i
          })

        },
        getPage(page) {
          this.tableData = [];
          this.p.page = page;
          this.getList(this.p);
        },
        getPageSize(size) {
          this.p.size = size;
          this.getList(this.p);
        },
        del(id){
          this.$confirm('此操作将删除选择的数据, 是否确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postApi('/aflc-uc/aflcShipperLineApi/deleteAflcShipperLine',[id]).then(() => {
              this.$message.info('删除成功');
              this.getList();
            })

          })
        },
        edit(item){
          this.name= "编辑";
          this.window = !this.window;
          this.form = item;
          if(this.window === true){
            this.loadUI()
          }else {

          }
        },
        save(){
          if(this.type === ''){
            this.$message.warning("请选择提货或收货地址");
            return
          }
          if(this.form.coordinate === ''){
            this.$message.warning("没有获取到坐标点，保存失败");
            return
          }
          if(this.type === 1){
            if(this.form.contactsPhone === ''){
              this.$message.warning("手机号码必填");
            }else {
              if(!REGEX.MOBILE.test(this.form.contactsPhone)){
                this.$message.warning("手机号码格式错误");
                return
              }
            }
          }else{
            if(!REGEX.MOBILE.test(this.form.contactsPhone) && this.form.contactsPhone !== ''){
              this.$message.warning("手机号码格式错误");
              return
            }
          }

          this.form.type = this.type;


          let parm =  {
            "aflcShipperLineDtos": this.addRoute,
            "shipperLineName": new Date() * 1
          };

          if(this.form.id){
            postApi('/aflc-uc/aflcShipperLineApi/updateAflcShipperLine',this.form).then((res)=>{
              if(res !== ''){
                this.$message.success("修改成功");
                this.window = false;
                this.getList();
              }
            });
          }else {
            postApi('/aflc-uc/aflcShipperLineApi/findAflcShipperLine',this.form).then((res)=>{
              if(res !== ''){
                this.$message.success("新增成功");
                this.window = false;
                this.getList();
              }
            });
          }
        },
        requestClick(id){
          this.type = id;
        },
        handleClose(){

        },
        loadUI(){
          AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) =>{
            let poiPicker = new PoiPicker({
              input: this.$refs[i][0]
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
            this.form.address = `${poiResult.item.district?poiResult.item.district:''}${poiResult.item.address}`;
            this.form.cityCode = poiResult.item.adcode;
            this.form.coordinate = `${poiResult.item.location.lat},${poiResult.item.location.lng}`;
            this.form.provinceCityArea = poiResult.item.district;
            this.form.summary = poiResult.item.name;
            this.form.type = this.type;
          });
        },
        openWindow(){
          this.name= "新增";
          this.window = true

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
          if(this.window === true){
            this.loadUI()
          }else {

          }
        },
        search(){

        },
        reset(){

        },
        getList(){
          postApi('/aflc-uc/aflcShipperLineApi/findAflcShipperLine').then((res)=>{
            this.tableData = res.list;
          });
        }
    },
      created(){
        this.getList();

      },

      mounted(){
        this.$nextTick(()=>{
          this.topHeight =  this.$refs.getTop.clientHeight;
          this.height = this.$refs.getTableWH.clientHeight;
          this.footer = this.$refs.footer.clientHeight;
        })
        window.addEventListener("resize", ()=> {
          this.topHeight =  this.$refs.getTop.clientHeight;
          this.height = this.$refs.getTableWH.clientHeight;
          this.footer = this.$refs.footer.clientHeight;

        });
      }
  }
</script>

<style scoped>
  .item-base-flex{
    height: 31px;
    border-radius: 2px;
    border: solid 1px #dcdfe6;
    box-sizing: border-box;
  img{
    margin-left: 3px;
  }
  }
  .address-width{
    width: 150px;
  }
  .m-r{
    margin:0 84px 10px 0;
  }
  .m-15{
    margin: 15px 0;
  }
</style>
