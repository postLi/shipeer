<template>
  <div class="search-form-al">
    <el-form ref="form" :model="searchForm" label-width="80px">
      <el-form-item label="交易日期">
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
      <el-form-item label="收支类型">
        <el-select v-model="searchForm.incomeExpendType">
          <el-option label="支出" :value="0"></el-option>
          <el-option label="收入" :value="1"></el-option>
        </el-select>
        <!--<el-input v-model="searchForm.incomeExpendType"></el-input>-->
      </el-form-item>
      <el-form-item label="车辆">
        <el-input placeholder="司机姓名/联系电话/车牌号" v-model="searchForm.carInfo"></el-input>
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
        pickerOptions2: {
        shortcuts: pickerOptions2
      },
        searchForm: {
          carInfo: '',
          incomeExpendType: '',
          tradeEndTime: '',
          tradeStartTime: '',
        }
      }
    },
    methods: {
      onSubmit() {
        this.searchForm.tradeStartTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
        this.searchForm.tradeEndTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
        this.$emit('change', this.searchForm)
      },
      clearForm() {
        this.searchForm = {
          carInfo: '',
          incomeExpendType: '',
          tradeEndTime: '',
          tradeStartTime: '',
        }
        this.searchCreatTime = [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()]
      }
    }
  }
</script>

<style lang="scss">
  .search-form-al {
    margin: 0 0 25px 30px;
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
    }
  }
</style>
