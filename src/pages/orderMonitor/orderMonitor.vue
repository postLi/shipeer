<template>
  <div class="topLayer">
    <div id="monitor_map"></div>
    <div style="position: absolute;left: 0;top:0">
      <div class="ctl">
        <button id="displayAll" class="btn" style="margin-right:5px;">显示全部车辆</button>
        <button id="displayMarker" class="btn">移动到中心点</button>
      </div>
    </div>
    <div class="orderSearch">
      <div align="right">
        <div class="title" style="font-size: 16px">在途监控
        </div>
        <div :class="[showOrderSearchResultIcon]" @click="clickOrderSearchResult" style="vertical-align: middle;"></div>
      </div>
      <div class="orderBox" v-show="showOrderSearchResult">
        <el-input class="orderSearchInput" placeholder="请输入内容" v-model="fiterText">
          <el-button slot="append" icon="el-icon-search" class="orderSearchButton">搜索
          </el-button>
        </el-input>
        <div class="orderSearchResult">
          <div class="title" style="float: none">
            全部服务中
          </div>
          <div class="orderStatus">
            <div class="row">
              <div class="cell">
                司机已接单
              </div>
              <div class="cell">
                司机赶往提货地
              </div>
              <div class="cell">
                司机已到提货地
              </div>
            </div>
            <div class="row">
              <div class="cell" style="padding-top: 12px">
                司机已装货
              </div>
              <div class="cell">
                运输中
              </div>
              <div class="cell">
                司机已到目的地
              </div>
            </div>
            <div class="row">
              <div class="cell" style="padding-top: 12px">
                司机已卸货
              </div>
              <div class="cell">
                司机改派
              </div>
            </div>
          </div>
          <div style="position: absolute;bottom: 12px">
            <div>
              <el-pagination
                background
                layout="prev, pager, next"
                :pager-count="4"
                :total="1000">
              </el-pagination>
            </div>
            <div style="padding-left: 4px">
              <el-pagination
                background
                layout="total, sizes, jumper"
                :total="1000">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderMonitor",
    data() {
      return {
        showOrderSearchResult: true,
        showOrderSearchResultIcon: "el-icon-minus",
        mp: null,
        points: null,
        carUrl: require("../../assets/orderMonitor/car.png"),
        redballUrl: require("../../assets/orderMonitor/redball.png"),
        markerPoint: null,
        infoWindow: null,
        geocoder: null,
        polyline: null,
        passedPolyline: null,
        redball: null
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
      document.getElementById("displayAll").onclick = this.displayAllMarkers;
      document.getElementById("displayMarker").onclick = this.centerMark;

      this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -66), size: new AMap.Size(260, 150)});
      this.geocoder = new AMap.Geocoder();
      window.showTrack = this.showTrack;
      window.checkTrack = this.checkTrack;
      this.redball = new AMap.Marker({
        icon: this.redballUrl,
        offset: new AMap.Pixel(-16, -41),
        animation: "AMAP_ANIMATION_DROP",
        autoRotation: false
      });
      this.redball.on('moving', (e) => {
        this.passedPolyline.setPath(e.passedPath);
      });
      this.polyline = new AMap.Polyline({
        map: mp,
        // path: pois,
        strokeColor: "#00FF00",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 7,      //线宽
        // strokeStyle: "solid"  //线样式
        showDir: true
      });
      this.passedPolyline = new AMap.Polyline({
        map: mp,
        // path: lineArr,
        strokeColor: "#F00",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 7,      //线宽
        // strokeStyle: "solid"  //线样式
        showDir: true
      });
    },
    methods: {
      clickOrderSearchResult() {
        if (this.showOrderSearchResultIcon == "el-icon-minus") {
          this.showOrderSearchResult = false;
          this.showOrderSearchResultIcon = "el-icon-plus";
        } else {
          this.showOrderSearchResult = true;
          this.showOrderSearchResultIcon = "el-icon-minus";
        }
      },
      displayAllMarkers() {
        if (this.mp == null || this.points == null)
          return;
        this.mp.setFitView(this.points);
        if (this.redball != null)
          this.redball.setMap(null);
      },
      centerMark() {
        if (this.markerPoint != null)
          this.mp.panTo(this.markerPoint.getPosition());
      },
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
      },
      showTrack(orderId) {
        var mp = this.mp;
        mp.clearInfoWindow();
        var pois = this.genTrack(orderId);
        if (pois == null || pois.length < 2)
          return;
        var polyline = this.polyline;
        polyline.setPath(pois);
        var redball = this.redball;
        redball.setPosition(pois[0]);
        redball.setMap(mp);
        mp.setFitView([polyline, redball]);
        redball.moveAlong(pois, 1000);
        checkTrack();
      },
      genTrack(orderId) {
        var pois = new Array();
        if (orderId == "1") {
          var point = new AMap.LngLat(113.279201, 23.079731);
          pois.push(point);
          point = new AMap.LngLat(113.298245, 23.070488);
          pois.push(point);
          point = new AMap.LngLat(113.314486, 23.074478);
          pois.push(point);
          point = new AMap.LngLat(113.314774, 23.09755);
          pois.push(point);
          point = new AMap.LngLat(113.301694, 23.095688);
          pois.push(point);
          point = new AMap.LngLat(113.28804, 23.086912);
          pois.push(point);
        } else if (orderId == "2") {
          var point = new AMap.LngLat(116.383141, 39.923679);
          pois.push(point);
          point = new AMap.LngLat(116.389105, 39.929378);
          pois.push(point);
          point = new AMap.LngLat(116.389105, 39.929378);
          pois.push(point);
          point = new AMap.LngLat(116.394855, 39.928382);
          pois.push(point);
          point = new AMap.LngLat(116.397154, 39.926224);
          pois.push(point);
          point = new AMap.LngLat(116.395645, 39.924232);
          pois.push(point);
        } else if (orderId == "3") {
          var point = new AMap.LngLat(106.554291, 29.597066);
          pois.push(point);
          point = new AMap.LngLat(106.520299, 29.585509);
          pois.push(point);
          point = new AMap.LngLat(106.51958, 29.579164);
          pois.push(point);
          point = new AMap.LngLat(106.536397, 29.575709);
          pois.push(point);
          point = new AMap.LngLat(106.55156, 29.577531);
          pois.push(point);
          point = new AMap.LngLat(106.546242, 29.585069);
          pois.push(point);
        } else if (orderId == "4") {
          var point = new AMap.LngLat(103.79549, 36.095664);
          pois.push(point);
          point = new AMap.LngLat(103.815396, 36.09718);
          pois.push(point);
          point = new AMap.LngLat(103.821361, 36.092164);
          pois.push(point);
          point = new AMap.LngLat(103.832859, 36.090473);
          pois.push(point);
          point = new AMap.LngLat(103.838465, 36.080264);
          pois.push(point);
          point = new AMap.LngLat(103.816546, 36.083181);
          pois.push(point);
        }
        return pois;
      },
      checkTrack() {
        var polyline = this.polyline;
        var redball = this.redball;
        if (polyline != null) {
          var pois = polyline.getPath();
          if (pois == null || pois.length < 2) {
            redball.setMap(null);
            return;
          }
          var pos2 = redball.getPosition();
          if (pos2 == null) {
            redball.setMap(null);
            return;
          }
          var pos = pois[pois.length - 1];
          if (pos2.equals(pos)) {
            redball.setMap(null);
            return;
          }
          setTimeout("checkTrack()", 100);
        } else {
          redball.setMap(null);
        }
      }
    }
  }
</script>

<style>
  .orderSearchInput .el-input-group__append {
    background-color: #67c23a;
    border: 1px solid #67c23a;
  }

  .orderSearchInput .el-input-group__append .orderSearchButton {
    background-color: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
</style>

<style scoped>
  .orderStatus {
    display: table;
    font-size: 12px;
    width: 100%;
    padding: 12px
  }

  .orderStatus .row {
    display: table-row
  }

  .orderStatus .cell {
    display: table-cell
  }

  .orderSearchInput {
    margin-top: 12px;
  }

  .orderSearch .title {
    float: left;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }

  .orderSearchResult {
    margin-top: 12px;
    height: 500px;
  }

  .orderSearch {
    position: absolute;
    right: 12px;
    top: 20px;
    width: 396px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(153, 153, 153, 0.5);
    padding: 15px;
  }

  .topLayer {
    position: relative;
    width: 100%;
    min-width: 900px;
    height: 100%;
    min-height: 900px;
  }

  #monitor_map {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .ctl {
    position: relative;
    display: block;
    padding: 10px;
    left: 100px;
    top: 10px;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    background-image: none;
    color: rgb(37, 165, 247);
    line-height: 1.5;
    -webkit-appearance: button;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-color: rgb(37, 165, 247);
    padding: 0.25rem 0.5rem;
  }
</style>
