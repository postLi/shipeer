<template>
  <div class="left-body height_100">
    <tree :data='leftData' :dataOrg='leftData' :count=0 ref="getTreeItem"></tree>
  </div>
</template>

<script>
  import tree from './tree'
    export default {
        name: "leftNav",
      watch: {
        '$route': 'routeChange'},
      data() {
        return {
          leftData:[
            {name: "在途监控", id: 0,  router: "/orderMonitor",children: [],selected:false,show:false},
            {name: "在线下单", id: 1,  router: "/order",children: [],selected:false,show:false},
            {name: "订单管理", id: 2,  router: "/orderManage/allOrder",children: [
                {name: "全部", id: 2.1, pid:2, router: "/OrderManage/allOrder",children: [],selected:false,show:false},
                {name: "服务中", id: 2.1, pid:2, router: "/OrderManage/server",children: [],selected:false,show:false},
                {name: "已完成", id: 2.1, pid:2, router: "/OrderManage/already",children: [],selected:false,show:false},
                {name: "已取消", id: 2.1, pid:2, router: "/OrderManage/alcencel",children: [],selected:false,show:false},
              ],selected:false,show:false},
            {name: "地址管理", id: 3,  router: "",children: [
                {name: "常用地址", id: 4, pid:3, router: "/addressManage",children: [],selected:false,show:false},
                {name: "常用路线", id: 5, pid:3, router: "/routeManage",children: [],selected:false,show:false},
              ],selected:false,show:false},
            // {name: "我的司机", id: 6,  router: "/orderRouter/inSingle",children: [],selected:false,show:false},
            // {name: "我的司机", id: 6,  router: "/orderRouter/payFoy",children: [],selected:false,show:false},
            {name: "我的司机", id: 6,  router: "/MyDriver",children: [],selected:false,show:false},
            {name: "收费标准", id: 7,  router: "/chargeStandard",children: [],selected:false,show:false},
            {name: "管理中心", id: 8,  router: "/manageCenter",children: [
                {name: "企业钱包", id: 9, pid:8, router: "/main",children: [],selected:false,show:false},
              ],selected:false,show:false},
          ],

        }
        },
      components: {
        tree,
      },
      methods:{
        routeChange(){
          this.recur(this.leftData,"clear");
          this.recur(this.leftData,"clearOk")
        },

        recur(data,arg) {
          data.forEach((map) => {

            // let path = `/${this.$route.path.split("/")[1]}`;
            // let router = `/${map.router.split("/")[1]}`;

            if(this.$route.path === map.router && arg === "clearOk"){
              this.$set(map, "selected", true);
            }
            if (map.children) {
              if(arg === "clear"){
                this.$set(map, "selected", false);
              }
              this.recur(map.children,arg)
            }
          })
        },

        recurPid(data,pid){
          data.forEach((map) => {
            if(map.id === pid){
              this.$set(map, "show", true);
              this.$set(map, "selected", true);
            }
            if (map.children) {
              this.recurPid(map.children)
            }
          })
        },
        recurFirst(data) {
          data.forEach((map) => {
            let path = `/${this.$route.path.split("/")[1]}`;
            if(path === map.router){
              this.$set(map, "show", true);
              this.$set(map, "selected", true);

              this.recurPid(this.leftData,map.pid);
            }
            if (map.children) {
              this.recurFirst(map.children)
            }
          })
        },
      },
      mounted(){
        this.recurFirst(this.leftData);
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
