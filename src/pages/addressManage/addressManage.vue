<template>
    <div class="height_100 flex_r">
      <div class="address-margin flex_1 b_c_w o_f" >
        <div class="padding_20">
          <header class="flex_a f_f">
            <div class="flex_a m-r">
              <span class="window-title-left">地址类型：</span>
              <el-select v-model="addressId" placeholder="请选择" size="small" class="address-width" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="flex_a m-r">
              <span class="window-title-left">地址：</span>
              <el-input v-model="address" placeholder="请输入地址" size="small" class="address-width "></el-input>
            </div>
            <div class="flex_a m-r">
              <span class="window-title-left">联系人：</span>
              <el-input v-model="name" placeholder="请输入联系人" size="small" class="address-width "></el-input>
            </div>
            <div class="flex_a m-r">
              <span class="window-title-left">联系电话：</span>
              <el-input v-model="tel" placeholder="请输入联系电话" size="small" class="address-width "></el-input>
            </div>

            <div class="flex_a">
              <el-button size="small" type="success" icon="el-icon-search" @click="search()" style="background-color: #2fb301;">查询</el-button>
              <el-button size="small"  plain icon="el-icon-refresh" style="	background-color: #dcdcdc;border: solid 1px #dcdfe6;color: white" @click="reset(index)">重置</el-button>
            </div>
          </header>

          <el-button class="m-15" size="small" type="success" icon="el-icon-search" @click="search()" style="background-color: #2fb301;">新增目的地</el-button>
        </div>

        <el-table class="myTable"
          :data="tableData"
          height="250"
          border
          style="width: calc(100% - 10px)">
          <el-table-column prop="date" label="序号" label-class-name="table_head" header-align="center" align="center" width="100">
            <template slot-scope="scope">
              {{scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="地址类型" label-class-name="table_head" header-align="center" align="center"  min-width="100"></el-table-column>
          <el-table-column prop="address" label="城市" label-class-name="table_head" header-align="center" align="center"  width="200"></el-table-column>
          <el-table-column prop="address" label="地址" label-class-name="table_head" header-align="center" align="center"  width="200"></el-table-column>

          <el-table-column prop="address" label="详细地址" label-class-name="table_head" header-align="center" align="center"  width="200"></el-table-column>

          <el-table-column prop="address" label="门牌号" label-class-name="table_head" header-align="center" align="center"  width="200"></el-table-column>

          <el-table-column prop="address" label="联系人" label-class-name="table_head" header-align="center" align="center"  width="200"></el-table-column>

          <el-table-column prop="address" label="联系电话" label-class-name="table_head" header-align="center" align="center"  width="200"></el-table-column>
          <el-table-column prop="address" label="操作" label-class-name="table_head" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text"  @click="" style="text-decoration: underline;color: #1890ff;">编辑</el-button>
              <el-button type="text"  @click="" style="text-decoration: underline;color: #1890ff;">删除</el-button>
            </template>
          </el-table-column>

        </el-table>




      </div>

    </div>
</template>

<script>
    export default {
        name: "addressManage",
      data(){
          return{
            tableData: [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-06',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-07',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],
            tel:'',
            name:'',
            address:'',
            addressId:'',
            options: [{
              value: 1,
              label: '提货地址'
            }, {
              value: 2,
              label: '收货地址'
            }],
          }
      },
      methods:{
        search(){

        },
        reset(){

        }
      }
    }
</script>

<style scoped>
  .address-margin{
    margin: 10px 0 10px 10px;
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
