<template>
  <div class="customer-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/OrderManage/allOrder" class="tab-label"><span>全部&nbsp;&nbsp;(100)</span></router-link>
      <router-link to="/OrderManage/server" class="tab-label"><span>服务中&nbsp;&nbsp;(20)</span></router-link>
      <router-link to="/OrderManage/already" class="tab-label"><span>已完成&nbsp;&nbsp;(60)</span></router-link>
      <router-link to="/OrderManage/alcencel" class="tab-label"><span class="last">已取消&nbsp;&nbsp;(20)</span></router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="scss">
  .tab-wrapper {
    padding: 10px;
    height: 100%;
    width: calc(100% - 20px);

    .eltab {
      width: calc(100% - 20px);
      display: flex;
      background: #fff;
    }

    .tab-label {
      float: left;
      padding: 15px 60px 20px 60px;
      padding-left: 60px;
      padding-right: 60px;
      border-radius: 3px 3px 0 0;
      /*border-right: 1px solid #d2d2d2;*/
      font-size: 16px;
      border-left-width: 0;
      background: #fff;
      /*border-bottom : 1px solid #3e9ff1;;*/
      position: relative;
      top: 0;
      color: #999;
      cursor: pointer;

      span {
        /*padding: 10px 0 10px 0;*/
        /*text-align: center;*/
        /*border-right: 1px solid #d2d2d2;*/
        position: relative;

      }
      span:after{
        content: '';
        display: block;
        width: 2px;
        height: 30px;
        background: #d2d2d2;
        position: absolute;
        top: -5px;
        left: 135px;
      }
      span.last:after{
        background: #fff;
      }
    }
    .tab-label:last-of-type {
      border-right: none;
    }
    .tab-label:first-of-type {
      border-left: none;
    }
    .tab-label:hover {
      /*background: #ffe;*/
    }
    .tab-label:first-child {
      margin-left: 1px;
      border-left-width: 1px;
    }

  }

  .tab-wrapper .active-tab, .tab-wrapper .router-link-active {
    color: #333;
    font-weight: 600;
    font-size: 16px;
    /*border-color: #3e9ff1;*/
    border-bottom: 2px solid #2fb301;
    /*border-left: 1px solid #d2d2d2;*/
    z-index: 2;
    left: -1px;
    top: -1px;
    /*border-left-color: #3e9ff1;*/
    /*border-top-color:  #3e9ff1;*/
    /*border-right-color: #3e9ff1;*/
    border-top-width: 2px;
  }
</style>
