<template>
  <div id="monitor_map"></div>
</template>

<script>
  export default {
    name: "orderMonitor",
    data() {
      return {
        mp: null,
      }
    },
    mounted() {
      this.mp = new AMap.Map("monitor_map", {
        resizeEnable: true
      });
    }
  }
</script>

<style scoped>
  #monitor_map {
    width: 100%;
    height: 100%;
  }
</style>
