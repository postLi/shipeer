<template>
  <div class="height_100 flex_r">
    <div class="flex_1 b_c_w o_f flex_f" ref="getTableWH">
      <div class="padding_20" ref="getTop">
        <header class="flex_a f_f">
          <div class="flex_a m-r">
            <span class="window-title-left c-3">地址类型：</span>
            <el-select v-model="addressIdSearch" placeholder="请选择" size="small" class="address-width" clearable>
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class="flex_a m-r">
            <span class="window-title-left c-3">地址：</span>
            <el-input v-model="addressSearch" placeholder="请输入地址" size="small" class="address-width "></el-input>
          </div>
          <div class="flex_a m-r">
            <span class="window-title-left c-3">联系人：</span>
            <el-input v-model="contactsSearch" placeholder="请输入联系人" size="small" class="address-width "></el-input>
          </div>
          <div class="flex_a m-r">
            <span class="window-title-left c-3">联系电话：</span>
            <el-input v-model="contactsPhoneSearch" placeholder="请输入联系电话" size="small" class="address-width "></el-input>
          </div>

          <div class="flex_a m-r">
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
            <div v-if="scope.row.type === '0'">提货地址</div>
            <div v-if="scope.row.type === '1'">收货地址</div>
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
            <el-button type="text"  @click="edit(scope.row.id)" style="text-decoration: underline;color: #1890ff;">编辑</el-button>
            <el-button type="text"  @click="del(scope.row.id)" style="text-decoration: underline;color: #1890ff;">删除</el-button>
          </template>
        </el-table-column>

      </el-table>



      <footer ref="footer">
        <my-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></my-pagination>
      </footer>
    </div>
    <el-dialog
      :title="name +'常用地址'"
      :visible.sync="window"
      width="600px"
      @close="handleClose">
      <el-button size="small" @click="requestClick(item.id)" v-for="(item,index) in options" :key="item.id"
                 :style="{'background-color':(item.id === type)?'#1890ff':'#f2f2f2','color':(item.id === type)?'white':'black'}">
        {{item.name}}
      </el-button>

      <address-item :data="form" :type="type" ref="address"></address-item>
      <span slot="footer" class="dialog-footer">
    <el-button @click="window = false">取 消</el-button>
    <el-button type="primary" @click="save()">保 存</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
  import {REGEX} from '@/utils/valiRegex.js'
  import { getApi ,postApi,putApi,deleteApi} from "@/api/api.js";
  import addressItem from "@/components/addressItem"
  import myPagination from "@/components/myPagination"
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: "addressManage",
    components:{addressItem,myPagination},
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
        p: { page: 1, size: 10, total: 0 },
        height:0,
        topHeight:0,
        footer:0,
        tableData: [],
        form:{
          address: "",//详细地址
          cityCode: "",//城市编码（格式440100）
          contacts: "",//联系人
          contactsPhone: "",//联系电话
          coordinate: "",//发货地坐标
          floorHousenum: "",//楼层及门牌号
          provinceCityArea: "",//省市区（格式:广东省广州市天河区）
          summary: "",//地点简称
          type: '',//
        },
        contactsPhoneSearch:'',
        contactsSearch:'',
        addressSearch:'',
        addressIdSearch:'',//区分货主id（搜索）
        options: [{
          id: '0',
          name: '提货地址'
        }, {
          id: '1',
          name: '收货地址'
        }],
      }
    },
    methods:{
      getPage(page) {
        this.tableData = [];
        this.p.page = page;
        this.getList();
      },
      getPageSize(size) {
        this.p.size = size;
        this.getList();
      },
      del(id){
        this.$confirm('此操作将删除选择的数据, 是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteApi(`/aflc-uc/usercenter/aflcShipperContacts/v1/delete/${id}`).then((res) => {
            if(res.status === 200){
              this.$message.info('删除成功');
              this.p.page = 1;
              this.getList();
            } else {
              this.$message.warning(res.errorInfo)
            }
          })

        })
      },
      edit(id){
        this.name= "编辑";
        this.window = !this.window;
        getApi(`/aflc-uc/usercenter/aflcShipperContacts/v1/${id}`).then((res)=>{
          if(res.status === 200){
            this.requestClick(res.data.type);
            this.form = res.data;
          }else {
            this.$message.warning(res.errorInfo)
          }
        });
      },
      save(){
        if(this.type === ''){
          this.$message.warning("请选择提货或收货地址");
          return
        }

        this.form.type = this.type;

        console.log(this.form)
        this.$refs.address.$refs['addressRules'].validate((valid) => {
          if (valid) {
            if(this.form.id){
              putApi('/aflc-uc/usercenter/aflcShipperContacts/v1/update',this.form).then((res)=>{
                if(res.status === 200){
                  this.$message.success("修改成功");
                  this.window = false;
                  this.getList();
                } else {
                  this.$message.warning(res.errorInfo)
                }
              });
            }else {
              postApi('/aflc-uc/usercenter/aflcShipperContacts/v1/add',this.form).then((res)=>{
                if(res.status === 200){
                  this.$message.success("新增成功");
                  this.window = false;
                  this.p.page = 1;
                  this.getList();
                }else {
                  this.$message.warning(res.errorInfo)
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      requestClick(id){
        this.type = id;
        this.$refs.address.$refs['addressRules'].resetFields();
        this.$refs.address.changeAddress(1)
      },
      handleClose(){
        this.$refs.address.$refs['addressRules'].resetFields();
        this.$refs.address.changeAddress(1)
      },


      openWindow(){
        this.name= "新增";
        this.window = true;
        this.type = '';
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
      search(){
        this.p = {page: 1, size: 10, total: 0 };
        this.getList(this.addressIdSearch)
      },
      reset(){
        this.addressIdSearch = '';
        this.contactsSearch = '';
        this.contactsPhoneSearch = '';
        this.addressSearch = ''
      },
      getList(type = ''){
        //收发货人地址列表
       let parm = {
          currentPage: this.p.page,
          pageSize: this.p.size,
          vo: {
            type, //类型（0：常用发货人，1：常用收货人）
            contacts:this.contactsSearch,
            contactsPhone:this.contactsPhoneSearch,
            address:this.addressSearch,
          }
        };
        postApi('/aflc-uc/usercenter/aflcShipperContacts/v1/list',parm).then((res)=>{
          if(res.status === 200){
            this.tableData = res.data.list;
            this.p.total = res.data.totalCount;
          }else{
            this.$message.warning(res.errorInfo)
          }

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
