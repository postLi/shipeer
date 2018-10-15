<template>
  <div class="search-form-al">
    <el-form ref="form" :model="searchForm" label-width="100px">
      <el-form-item label="充值日期：" v-if="pfrecord === true">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            type="daterange"
            align="right"
            :picker-options="pickerOptions2"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            unlink-panels
          >
          </el-date-picker>
        </div>
        <!--<el-input v-model="searchForm.name"></el-input>-->
      </el-form-item>
      <el-form-item label="减免日期：" v-else>
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            type="daterange"
            align="right"
            :picker-options="pickerOptions2"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            unlink-panels
          >
          </el-date-picker>
        </div>
        <!--<el-input v-model="searchForm.name"></el-input>-->
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
  import {parseTime, pickerOptions2} from '@/utils/'

  export default {
    data() {
      return {
        searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
        searchForm: {
          "endRechargeTime": "",
          "startRechargeTime": ""

        },
        pickerOptions2: {
          shortcuts: pickerOptions2
        }
      }
    },
    props:{
      pfrecord:Boolean
    },
    watch:{
      pfrecord(newVal,ordVal){

      }
    },
    methods: {
      onSubmit() {
        this.searchForm.startRechargeTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
        this.searchForm.endRechargeTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
        this.$emit('change', this.searchForm)
      },
      clearForm() {
        this.searchForm = {
          startRechargeTime: '',
          endRechargeTime: '',
        }
        this.searchCreatTime = [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()]
      }
    }
  }
</script>

<style lang="scss">
  .search-form-al {
    margin: 0 0 0 30px;
    display: flex;
    .el-form {
      display: flex;
      .el-form-item {
        .el-form-item__label {
          color: #333;
        }
      }

    }
    .search-btn {
      display: flex;
      padding-left: 100px;
      .el-button {
        height: 40px;
      }
      .el-button:first-of-type{
        margin-right: 20px;
      }
    }
  }
</style>
