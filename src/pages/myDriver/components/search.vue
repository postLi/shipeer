<template>
	<div class="search-form">
    <el-form ref="form" :model="searchForm" label-width="80px">
      <el-form-item label="车牌号">
        <el-input v-model="searchForm.carNumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="司机">
        <el-input v-model="searchForm.driverName" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="searchForm.driverPhone" clearable></el-input>
      </el-form-item>
    </el-form>
    <div class="search-btn">
      <!--<el-row>-->
        <el-button type="success" size="mini" @click="onSubmit">查询</el-button>
        <el-button type="info" size="mini" @click="clearForm">重置</el-button>
      <!--</el-row>-->
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        searchForm:{
          carNumber:'',
          driverPhone:'',
          driverName:''
        }
      }
    },
    methods:{
      onSubmit(){
        this.$emit('change', this.searchForm)
      },
      clearForm(){
        this.searchForm={
            carNumber:'',
            driverPhone:'',
            driverName:''
        }
      }
    }
  }
</script>

<style lang="scss">
.search-form{

  display: flex;
  padding-top: 20px;
  .el-form{
    display: flex;

  }
  .search-btn{
    display: flex;
    padding-left: 20px;
    .el-button{
      height: 40px;
    }
  }
}
</style>
