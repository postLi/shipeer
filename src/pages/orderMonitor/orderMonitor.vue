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
      var ctl = new AMap.Scale({
        visible: true
      });
      mp.addControl(ctl);
      ctl = new AMap.ToolBar({
        visible: true
      });
      mp.addControl(ctl);
      ctl = new AMap.OverView({
        visible: true
      });
      mp.addControl(ctl);
      points = new Array();
      var marker = new AMap.Marker({
        icon: carUrl,
        position: [113.28804, 23.086912],
        offset: new AMap.Pixel(-28, -68),
        map: mp
      });
      marker.content = "1";
      marker.on("click", markerClick);
      // marker.emit("click", {target: marker});
      points.push(marker);

      marker = new AMap.Marker({
        icon: carUrl,
        position: [116.395645, 39.924232],
        offset: new AMap.Pixel(-28, -68),
        map: mp
      });
      marker.content = "2";
      marker.on("click", markerClick);
      points.push(marker);

      marker = new AMap.Marker({
        icon: carUrl,
        position: [106.546242, 29.585069],
        offset: new AMap.Pixel(-28, -68),
        map: mp
      });
      marker.content = "3";
      marker.on("click", markerClick);
      points.push(marker);
    }
  }
</script>

<style scoped>
  #monitor_map {
    width: 100%;
    height: 100%;
  }
</style>
