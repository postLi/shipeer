<template>
  <div class="height_100 flex_r">
    <div class="margin_10 flex_1 b_c_w o_f flex_f" ref="getTableWH">
      <div class="padding_20" ref="getTop">
        <header class="flex_a f_f">
          <div class="flex_a m-r">
            <span class="window-title-left">提货地：</span>
            <el-input v-model="addressFrom" placeholder="请输入地址" size="small" class="address-width "></el-input>
          </div>
          <div class="flex_a m-r">
            <span class="window-title-left">收货地：</span>
            <el-input v-model="addressTo" placeholder="请输入联系人" size="small" class="address-width "></el-input>
          </div>

          <div class="flex_a m-r">
            <el-button size="small" type="success" icon="el-icon-search" @click="search()" style="background-color: #2fb301;">查询</el-button>
            <el-button size="small"  plain icon="el-icon-refresh" style="	background-color: #dcdcdc;border: solid 1px #dcdfe6;color: white" @click="reset()">重置</el-button>
          </div>
        </header>

        <el-button class="m-15" size="small" type="success" icon="el-icon-search" @click="openWindow()" style="background-color: #2fb301;">新增</el-button>
      </div>


      <el-table class="myTable flex_1" :data="tableData" border :height="heightComputer" :style="{'width': getBodyWidth + 'px'}">
        <el-table-column prop="date" label="序号" label-class-name="table_head" header-align="center" align="center" width="80">
          <template slot-scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="cityCode" label="提货地" label-class-name="table_head" header-align="center" align="center"  min-width="200">
          <template slot-scope="scope" >
            {{scope.row[0].name}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="详细地址" label-class-name="table_head" header-align="center" align="center"  min-width="200">
          <template slot-scope="scope" >
            {{scope.row[0].address}}
          </template>
        </el-table-column>
        <el-table-column prop="floorHousenum" label="目的地" label-class-name="table_head" header-align="center" align="center"  min-width="200">
          <template slot-scope="scope" >
            {{scope.row[scope.row.length - 1].name}}
          </template>
        </el-table-column>
        <el-table-column prop="contacts" label="详细地址" label-class-name="table_head" header-align="center" align="center"  min-width="200">
          <template slot-scope="scope" >
            {{scope.row[scope.row.length - 1].address}}
          </template>
        </el-table-column>

        <el-table-column prop="contactsPhone" label="途径地数量" label-class-name="table_head" header-align="center" align="center"  width="120">
          <template slot-scope="scope" >
            {{scope.row.length}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" label-class-name="table_head" header-align="center" align="center" width="140"  fixed="right">
          <template slot-scope="scope" >
            <el-button type="text"  @click="edit(scope.row)" style="text-decoration: underline;color: #1890ff;">编辑</el-button>
            <el-button type="text"  @click="del(scope.row)" style="text-decoration: underline;color: #1890ff;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <footer ref="footer">
        <!--<my-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></my-pagination>-->
      </footer>
    </div>
    <el-dialog
      :title="name +'常用路线'"
      :visible.sync="window"
      width="600px"
      @open="handleOpen"
      @close="handleClose">
      <div class="add-route-item ">
        <div v-for="(item,index) in addRoute" :key="index" class="margin_b_10">
          <div class="flex_sb">
            <span v-if="index === 0" class="window-title-left">提货地</span>
            <span v-if="index > 0 && index + 1 !== addRoute.length" class="window-title-left">途经地</span>
            <span v-if="index + 1 === addRoute.length" class="window-title-left">目的地</span>
            <el-button v-if="index === 1" class=" f_w" style="background-color: #2fb301;width: 105px" type="success" size="small" @click="addDestination(addRoute.length)">新增目的地</el-button>
            <el-button v-if="index > 1 " class=" f_w" style="background-color: #ff300d;width: 105px" type="danger" size="small" @click="delDestination(index)">删除目的地</el-button>
          </div>

          <route-item :data="item" :index="index"></route-item>

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

          addressTo:'',
          addressFrom:'',

        }
      },
      methods:{

        edit(item){
          this.name= "编辑";
          this.window = !this.window;
          item.forEach((item1,i)=>{
            this.$set(item1,'origin',item1.address);
            this.$set(item1,'originName',item1.name);
            this.$set(item1,'originCoordinate',`${item1.latitude},${item1.longtitude}`);
            this.$set(item1,'shipperSort',i);
          });

          console.log(item)
          this.addRoute = item;
        },
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
        del(item){
          this.$confirm('此操作将删除选择的数据, 是否确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postApi(`/aflc-uc/aflcShipperLineApi/deleteAflcShipperLine/${item[0].shipperNo}`).then(() => {
              this.$message.info('删除成功');
              this.getList();
            })

          })
        },

        save(){

          console.log(this.addRoute)
          let check =  this.addRoute.some((item)=>{
            return item.originCoordinate === ''
          });

          if(check){
            this.$message.warning('收发货地址没有获取到坐标点');
            return
          }
          if( this.name === "编辑"){
            let parm =  {
              "aflcShipperLineDtos": this.addRoute,
              "shipperLineName": this.addRoute[0].lineName
            };
            postApi(`/aflc-uc/aflcShipperLineApi/updateAflcShipperLine/${this.addRoute[0].shipperNo}`,parm).then((res)=>{
              if(res !== '' || res !== null){
                this.$message.success("修改成功");
                this.window = false;
                this.getList();
              }
            });
          }else {
            let parm =  {
              "aflcShipperLineDtos": this.addRoute,
              "shipperLineName": new Date() * 1
            };
            postApi('/aflc-uc/aflcShipperLineApi/addAflcShipperLine',parm).then((res)=>{
              if(res !== '' || res !== null){
                this.$message.success("新增成功");
                this.window = false;
                this.getList();
              }
            });
          }
        },
        handleOpen(){

        },
        handleClose(){
          this.getList()
        },
        openWindow(){
          this.name= "新增";
          this.window = true;
          this.addRoute = [
            {
              tel:'',
              name:'',
              floor:'',
              cityCode: "",
              origin: "",
              originCoordinate: "",
              originName: "",
              provinceCityArea: "",
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
            }]
        },
        search(){

        },
        reset(){

        },
        getList(){
          getApi('/aflc-uc/aflcShipperLineApi/findAflcShipperLine').then((res)=>{
            this.tableData = res;
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
