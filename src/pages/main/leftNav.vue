<template>
  <div class="left-body height_100">
    <!--<el-menu-->
      <!--default-active="2"-->
      <!--class="height_100"-->
      <!--background-color="#2a2a2a"-->
      <!--text-color="#fff"-->
      <!--active-text-color="#ffd04b">-->

      <!--<el-menu-item index="1">-->
        <!--<i class="el-icon-menu"></i>-->
        <!--<span slot="title">在线下单</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="2">-->
        <!--<i class="el-icon-setting"></i>-->
        <!--<span slot="title">订单管理</span>-->
      <!--</el-menu-item>-->
      <!--<el-submenu index="3">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span>地址管理</span>-->
        <!--</template>-->
        <!--<el-menu-item-group>-->
          <!--&lt;!&ndash;<div>常用地址</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div>常用路线</div>&ndash;&gt;-->
          <!--<el-menu-item index="1-1">选项2</el-menu-item>-->
          <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->
      <!--<el-menu-item index="4">-->
        <!--<i class="el-icon-setting"></i>-->
        <!--<span slot="title">我的司机</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="5">-->
        <!--<i class="el-icon-setting"></i>-->
        <!--<span slot="title">收费标准</span>-->
      <!--</el-menu-item>-->
      <!--<el-submenu index="6">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span>管理中心</span>-->
        <!--</template>-->
        <!--<el-menu-item-group>-->
          <!--<div>企业钱包</div>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->
    <!--</el-menu>-->

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
            {name: "订单管理", id: 2,  router: "/",children: [],selected:false,show:false},
            {name: "地址管理", id: 3,  router: "",children: [
                {name: "常用地址", id: 4,  router: "/main",children: [],selected:false,show:false},
                {name: "常用路线", id: 5,  router: "/main",children: [],selected:false,show:false},
              ],selected:false,show:false},
            {name: "我的司机", id: 6,  router: "/main",children: [],selected:false,show:false},
            {name: "收费标准", id: 7,  router: "/main",children: [],selected:false,show:false},
            {name: "管理中心", id: 3,  router: "",children: [
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
