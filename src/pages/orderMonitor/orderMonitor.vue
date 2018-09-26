<template>
  <div id="monitor_map"></div>
</template>

<script>
  export default {
    name: "orderMonitor",
    data() {
      return {
        mp: null,
        points: null,
        carUrl: require("../../assets/orderMonitor/car.png"),
        redballUrl: require("../../assets/orderMonitor/redball.png"),
        markerPoint: null,
        infoWindow: null,
        geocoder: null
      }
    },
    mounted() {
      var mp = this.mp = new AMap.Map("monitor_map", {
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
      var points = this.points = new Array();
      var carUrl = this.carUrl;
      var marker = new AMap.Marker({
        icon: carUrl,
        position: [113.28804, 23.086912],
        offset: new AMap.Pixel(-28, -68),
        map: mp
      });
      marker.content = "1";
      var markerClick = this.markerClick;
      marker.on("click", markerClick);
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

      marker = new AMap.Marker({
        icon: carUrl,
        position: [103.816546, 36.083181],
        offset: new AMap.Pixel(-28, -68),
        map: mp
      });
      marker.content = "4";
      marker.on("click", markerClick);
      points.push(marker);

      mp.setFitView(points);

      this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -66), size: new AMap.Size(260, 150)});
      this.geocoder = new AMap.Geocoder();
    },
    methods: {
      markerClick(e) {
        var markerPoint = this.markerPoint = e.target;
        var infoWindow = this.infoWindow;
        infoWindow.setContent("<div>详细信息</div><div style=\"font-size: 12px\"><br>地址：<span id=\"mapAddr\"></span><br><br><a href=\"javascript:showTrack('" + markerPoint.content +
          "')\">查看轨迹</a></div>");
        var pos = markerPoint.getPosition();
        infoWindow.open(this.mp, pos);
        this.geocoder.getAddress(pos, function (status, result) {
          if (status === "complete" && result.regeocode) {
            var address = result.regeocode.formattedAddress;
            document.getElementById("mapAddr").innerText = address;
          }
        });
      }
    }
  }
</script>

<style scoped>
  #monitor_map {
    width: 100%;
    height: 100%;
    min-width: 900px;
  }
</style>
