<template>
  <div class="customer-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/OrderManage/allOrder" class="tab-label">全部(100)</router-link>
      <router-link to="/OrderManage/server" class="tab-label">服务中(20)</router-link>
      <router-link to="/OrderManage/already" class="tab-label">已完成(60)</router-link>
      <router-link to="/OrderManage/alcencel" class="tab-label">已取消(20)</router-link>
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
  a, a:focus, a:hover {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
  .tab-wrapper {
    height: 100%;
    /*padding-top: 8px;*/
     .eltab {
      width: 100%;
      height: 32px;
      line-height: 30px;
      /*border-bottom: 1px solid #91cbf7;*/

    }

    .tab-label {
      float: left;
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 3px 3px 0 0;
      border: 1px solid #d2d2d2;
      font-size: 14px;
      border-left-width: 0;
      border-bottom : 1px solid #3e9ff1;;
      position: relative;
      top: 0;
      cursor: pointer;
    }
    .tab-label:hover{
      background: #ffe;
    }
    .tab-label:first-child {
      margin-left: 1px;
      border-left-width: 1px;
    }


  }
  .tab-wrapper .active-tab, .tab-wrapper .router-link-active {
    color: #3e9ff1;
    /*border-color: #3e9ff1;*/
    border-bottom-color: #fff;
    z-index: 2;
    left: -1px;
    top: -1px;
    border-left-color: #3e9ff1;
    border-top-color:  #3e9ff1;
    border-right-color: #3e9ff1;
    border-top-width: 2px;
  }
</style>
