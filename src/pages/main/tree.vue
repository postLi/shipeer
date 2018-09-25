
<template>

  <div>
    <div v-for='(item,index) in data' style="line-height: 50px;">
      <div v-if="count === 0 " class=" flex_a border0" style="height: 50px;position: relative">

        <!--<i  class="iconfont icon-yingyong margin_r_10" v-if="item.id === 228" :style="{'color':(item.selected)? '#ffffff' : '#323232'}"></i>-->
        <!--<i  class="iconfont icon-qiaquan margin_r_10" v-if="item.id === 315" :style="{'color':(item.selected)? '#ffffff' : '#323232'}"></i>-->
        <div class="tree-node0 flex_a" style="white-space: nowrap;height: 40px">
          <span @click="test(item)" class="pointer el-tree-node__label" >
           <span :style="{'color':(item.selected && item.children.length === 0)? '#ffffff' : 'rgba(255, 255, 255,0.65)'}">{{item.name}}</span>
        </span>
        </div>
        <span @click.stop.self='item.show=!item.show' v-if='item.children && item.children.length !== 0'
              :style="{transform:(item.show)?'rotate(270deg)':'rotate(90deg)','color':(item.selected && item.children.length === 0)? '#ffffff' : 'rgb(255, 255, 255,0.65)'}"
              class="el-tree-node__expand-icon el-icon-arrow-left triangle0"></span>
      </div>

      <div v-if="count !== 0" class=" flex_a border1" style="height: 50px">
        <div class="tree_item flex_a" style="height: 40px" :style="{'padding-left':  count *  30  + 'px','background-color':(item.selected )? '#2fb301' : ''}">
          <span @click="test(item)" class="pointer el-tree-node__label" >
            <span :style="{'color':(item.selected )? '#ffffff' : 'rgba(255, 255, 255,0.65)'}">{{item.name}}</span>
        </span>
        </div>

      </div>

      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
      >
        <trees :data='item.children' :dataOrg="dataOrg" v-if="item.show" :count='count +1' class="heightTran" ></trees>
      </transition>

    </div>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex';

  export default {
    name: 'trees',
    props: ['data', 'count','dataOrg'],
    watch: {},
    computed: {

    },
    data() {
      return {
        item: {},
      }
    },
    methods: {
      ...mapActions(['setTreeArr']),

      test(item) {
        if(item.router !== ''){
          this.recurFirst(this.dataOrg);
          this.$router.push(item.router);
        }
        item.show = !item.show;
        this.data.forEach((child_item)=>{
          //let path = `/${this.$route.path.split("/")[1]}`;
          //let router = `/${child_item.router.split("/")[1]}`;
          if(this.$route.path === child_item.router){
            this.$set(child_item, "selected", true);
          }
        });
      },
      beforeEnter: function (el) {
        el.style.height = '0';
      },
      enter: function (el) {
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + 'px';
        } else {
          el.style.height = '';
        }
      },
      afterEnter: function (el) {
        el.style.height = '';
      },
      enterCancelled: function (el) {

      },
      beforeLeave: function (el) {
        el.style.height = el.scrollHeight + 'px';
      },

      leave: function (el) {
        if (el.scrollHeight !== 0) {
          el.style.height = 0;
        }
      },
      afterLeave: function (el) {
        el.style.height = '';
      },

      leaveCancelled: function (el) {

      },
      recurFirst(data) {
        data.forEach((map) => {
          if (map.children) {
            this.$set(map, "selected", false);
            this.recurFirst(map.children)
          }
        })
      },

    },
    created() {
    },
    mounted() {
    },
    beforeUpdate(){
    },
    updated(){
    },
    destroyed(){
    }
  }
</script>

<style scoped>

  .heightTran {
    overflow: hidden;
    transition: all .3s;
    background-color: #1d1d1d;
    color: white;
  }
  .tree-node0 {
    padding: 0 20px;
    /*position: relative;*/
  }
  .tree_item{
    width: 100%;
    /*margin-right: 40px;*/
    white-space: nowrap;
  }
  .border0:hover{
    background-color: black;

  }
  /*.border1:hover{*/
    /*background-color: #2fb301;*/
  /*}*/

  .triangle0{
    font-size: 14px;
    position: absolute;
    left: 165px;
    top: calc(22px - 3px);
  }

</style>
