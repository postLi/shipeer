<template>
	<div class="search-form">
    <el-form ref="form" :model="searchForm" label-width="80px">
      <el-form-item label="用车日期">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="提货地">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="目的地">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="司机">
        <el-input  placeholder="司机姓名/联系电话/车牌号"></el-input>
      </el-form-item>
    </el-form>
    <div class="search-btn">
      <!--<el-row>-->
        <el-button type="success" size="mini" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button type="info" size="mini" @click="clearForm" icon="el-icon-refresh">重置</el-button>
      <!--</el-row>-->
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        searchForm:{
          name:'123'
        }
      }
    },
    methods:{
      onSubmit(){
        this.$emit('change', this.searchForm)
      },
      clearForm(){

      }
    }
  }
</script>

<style lang="scss">
.search-form{

  display: flex;
  .el-form{
    display: flex;
    .el-form-item{
      .el-form-item__label{
        color: #333;
      }
    }

  }
  .search-btn{
    display: flex;
    padding-left: 50px;
    .el-button{
      height: 40px;
    }

  }
}
</style>
