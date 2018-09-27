<template>
  <div id="main">
    <header-nav></header-nav>
    <div class="flex_r h">
      <left-nav></left-nav>
      <div class="flex_1 b-c">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import LeftNav from './leftNav.vue'
  import HeaderNav from './headerNav.vue'
  export default {
    name: 'Main',
    data() {
      return {
        ListHeight: 0,
      }
    },
    computed: {

    },
    components: {
      LeftNav,
      HeaderNav
    },
    methods: {

    },
    created() {

    },
    mounted() {


    },
    updated() {

    }
  }
</script>


<style scoped >
 #main{
   height: 100%;
 }
  .h{
    height: calc(100% - 54px);
  }
  .b-c{
    position: relative;
    background-color: rgb(250, 250, 250);
  }
</style>

