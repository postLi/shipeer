<template>
  <div id="main">
    <header-nav></header-nav>
    <div>
      <div style="width: 268px">
        <left-nav></left-nav>
      </div>
      <div >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import LeftNav from './leftNav.vue'
  import HeaderNav from './header.vue'
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

</style>

