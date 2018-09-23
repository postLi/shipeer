<template>
  <div class="left-body height_100">
    <tree :data='leftData' :dataOrg='leftData' :count=0></tree>
  </div>
</template>

<script>
  import tree from './tree'
    export default {
        name: "leftNav",
      data() {
        return {
          leftData:[
            {name: "在线下单", id: 1,  router: "/order",children: [],selected:false,show:false},
            {name: "订单管理", id: 2,  router: "/orderManage/allOrder",children: [
                {name: "全部", id: 2.1,  router: "/OrderManage/allOrder",children: [],selected:false,show:false},
                {name: "服务中", id: 2.1,  router: "/OrderManage/server",children: [],selected:false,show:false},
                {name: "已完成", id: 2.1,  router: "/OrderManage/already",children: [],selected:false,show:false},
                {name: "已取消", id: 2.1,  router: "/OrderManage/alcencel",children: [],selected:false,show:false},
              ],selected:false,show:false},
            {name: "地址管理", id: 3,  router: "",children: [
                {name: "常用地址", id: 4,  router: "/addressManage",children: [],selected:false,show:false},
                {name: "常用路线", id: 5,  router: "/routeManage",children: [],selected:false,show:false},
              ],selected:false,show:false},
            // {name: "我的司机", id: 6,  router: "/orderRouter/inSingle",children: [],selected:false,show:false},
            // {name: "我的司机", id: 6,  router: "/orderRouter/payFoy",children: [],selected:false,show:false},
            {name: "我的司机", id: 6,  router: "/MyDriver",children: [],selected:false,show:false},
            {name: "收费标准", id: 7,  router: "/main",children: [],selected:false,show:false},
            {name: "管理中心", id: 3,  router: "/manageCenter",children: [
                {name: "企业钱包", id: 4,  router: "/main",children: [],selected:false,show:false},
              ],selected:false,show:false},
          ],

        }
        },
      components: {
        tree,
      },
    //
    }
</script>

<style scoped lang="scss">
  .left-body{
    min-width: 190px;
    background-color: #2a2a2a;
  }
</style>
