<template>
  <div class="topLayer">
    <div id="monitor_map"></div>
    <div style="position: absolute;left: 0;top:0">
      <div class="ctl">
        <button class="btn" @click="displayAllMarkers">显示全部车辆</button>
        <button class="btn" style="margin-left:5px;" @click="centerMark">移动到中心点</button>
      </div>
    </div>
    <div class="orderSearch">
      <el-input class="orderSearchInput" placeholder="请输入内容" v-model="fiterText">
        <el-button slot="append" icon="el-icon-search" class="orderSearchButton">搜索
        </el-button>
      </el-input>
      <div class="orderSearchResult">
        <el-badge :value="9999999" class="item">
          <div class="title" style="float: none;margin-bottom: 12px">
            全部服务中
          </div>
        </el-badge>
        <div class="table">
          <div class="row">
            <div class="cell3">
              <el-badge :value="9999" class="item">
                司机已接单
              </el-badge>
            </div>
            <div class="cell">
              <el-badge :value="9999" class="item">
                司机赶往提货地
              </el-badge>
            </div>
            <div class="cell">
              <el-badge :value="9999" class="item">
                司机已到提货地
              </el-badge>
            </div>
          </div>
          <div class="row">
            <div class="cell3">
              <el-badge :value="9999" class="item">
                司机已装货
              </el-badge>
            </div>
            <div class="cell">
              <el-badge :value="9999" class="item">
                运输中
              </el-badge>
            </div>
            <div class="cell">
              <el-badge :value="9999" class="item">
                司机已到目的地
              </el-badge>
            </div>
          </div>
          <div class="row">
            <div class="cell">
              <el-badge :value="9999" class="item">
                司机已卸货
              </el-badge>
            </div>
            <div class="cell">
              <el-badge :value="9999" class="item">
                司机改派
              </el-badge>
            </div>
          </div>
        </div>
        <div style="max-height: 280px;overflow: auto;margin-top: 12px">
          <div class="table" style="width: 350px">
            <div class="row">
              <div class="cellHeader">
                序号
              </div>
              <div class="cellHeader">
                车牌号
              </div>
              <div class="cellHeader">
                司机
              </div>
              <div class="cellHeader">
                联系电话
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                1
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                2
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                3
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                4
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                5
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                6
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                7
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                8
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                9
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                10
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                11
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                12
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                13
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                14
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                15
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                16
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
            </div>
            <div class="row">
              <div class="cell2">
                17
              </div>
              <div class="cell2">
                粤A123456
              </div>
              <div class="cell2">
                李世杰
              </div>
              <div class="cell2">
                18028693660
              </div>
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
    <div id="infoWindow">
      <div class="customInfoWindow">
        <div class="title">
          <div id="infoWindowTitle"></div>
          <div class="el-icon-close" onclick="closeInfoWindow()"></div>
        </div>
        <div class="body">
          <p class="bar">车辆信息</p>
          <div class="table">
            <div class="row">
              <div class="cellHeader">
                车牌号
              </div>
              <div class="cell">
                粤A12345
              </div>
              <div class="cellHeader">
                司机
              </div>
              <div class="cell">
                李世杰
              </div>
            </div>
            <div class="row">
              <div class="cellHeader">
                车型
              </div>
              <div class="cell">
                小面包
              </div>
              <div class="cellHeader">
                联系电话
              </div>
              <div class="cell">
                18028693660
              </div>
            </div>
          </div>
          <p class="bar" style="margin-top: 20px">订单信息</p>
          <table class="table2">
            <tr>
              <td class="label">用车时间</td>
              <td colspan="3">2018-09-28 10:00:00</td>
            </tr>
            <tr>
              <td class="label">需求车型</td>
              <td>小面包</td>
              <td class="label">货物名称</td>
              <td>香油/3吨/3方</td>
            </tr>
            <tr>
              <td class="label">额外服务</td>
              <td colspan="3">需要回单，需要回款5000元</td>
            </tr>
            <tr>
              <td class="label">备注</td>
              <td colspan="3">需要坐2人</td>
            </tr>
            <tr>
              <td class="label">预估价格</td>
              <td>120元</td>
              <td class="label">付款状态</td>
              <td>待付款</td>
            </tr>
            <tr>
              <td class="label">当前位置</td>
              <td colspan="3">
                <div id="mapAddr"></div>
                <div class="track">
                  <div style="position: absolute;right: 5px">
                    <a href="javascript:showTrack()">显示轨迹</a>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="label">提货地</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="label">途径地</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="label">目的地</td>
              <td colspan="3"></td>
            </tr>
          </table>
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
        infoWindow2: null,
        infoWindow2Init: false,
        geocoder: null,
        polyline: null,
        passedPolyline: null,
        redball: null,
        orderStatus: ""
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
      var points = this.points = [];
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

      this.geocoder = new AMap.Geocoder();
      window.showTrack = this.showTrack;
      window.checkTrack = this.checkTrack;
      window.closeInfoWindow = this.closeInfoWindow;
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
      this.infoWindow2 = new AMap.InfoWindow({
        offset: new AMap.Pixel(190, 400),
        isCustom: true,
        autoMove: true
      });
    },
    methods: {
      subString(str, maxLength) {
        if (str == null)
          return str;
        if (str.length <= maxLength)
          return str;
        return (str.substr(0, maxLength) + "...");
      },
      closeInfoWindow() {
        this.infoWindow2.close();
      },
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
        var infoWindow = this.infoWindow2;
        if (!this.infoWindow2Init) {
          document.getElementById("infoWindowTitle").innerText = "司机已到提货地";
          var tempEle = document.getElementById("infoWindow");
          infoWindow.setContent(tempEle.innerHTML);
          tempEle.innerHTML = "";
          this.infoWindow2Init = true;
        } else
          document.getElementById("infoWindowTitle").innerText = this.subString("运输中", 16);

        var pos = markerPoint.getPosition();
        infoWindow.open(this.mp, pos);
        var mapAddr = document.getElementById("mapAddr");
        if (mapAddr != null)
          mapAddr.innerText = "";
        this.geocoder.getAddress(pos, function (status, result) {
          if (status === "complete" && result.regeocode) {
            var address = result.regeocode.formattedAddress;
            if (mapAddr == null)
              mapAddr = document.getElementById("mapAddr");
            if (mapAddr != null)
              mapAddr.innerText = address;
          }
        });
      },
      showTrack(orderId) {
        if (orderId == null) {
          var markerPoint = this.markerPoint;
          if (markerPoint == null)
            return;
          this.showTrack(markerPoint.content);
          return;
        }
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
        var pois = [];
        var point = null;
        if (orderId == "1") {
          point = new AMap.LngLat(113.279201, 23.079731);
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
          point = new AMap.LngLat(116.383141, 39.923679);
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
          point = new AMap.LngLat(106.554291, 29.597066);
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
          point = new AMap.LngLat(103.79549, 36.095664);
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

  .orderSearchResult .el-badge__content {
    top: -3px
  }
</style>

<style scoped>
  .customInfoWindow {
    width: 328px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.5);
  }

  .customInfoWindow .title {
    width: 329px;
    height: 38px;
    line-height: 38px;
    vertical-align: middle;
    text-align: center;
    background-color: #2fb301;
    color: white;
  }

  .customInfoWindow .el-icon-close {
    position: absolute;
    right: 7px;
    top: 11px;
    cursor: pointer;
  }

  .customInfoWindow .body {
    width: 100%;
    max-height: 500px;
    overflow: auto;
    padding: 12px 12px 16px 12px;
  }

  .customInfoWindow .body .bar {
    font-size: 14px;
    width: 100%;
    background-color: white;
    color: black;
    text-align: left;
  }

  .customInfoWindow .table {
    display: table;
    font-size: 12px;
    width: 100%;
    border-collapse: collapse;
  }

  .customInfoWindow .table2 {
    font-size: 12px;
    width: 100%;
    border-collapse: collapse;
  }

  .customInfoWindow .table2 td {
    border: 1px solid gray;
    padding-left: 4px;
    vertical-align: middle;
    width: 88px;
  }

  .customInfoWindow .table2 td.label {
    background-color: #f2f2f2;
    color: gray;
    text-align: right;
    padding-right: 4px;
    width: 64px;
    height: 32px;
  }

  .customInfoWindow .table .row {
    display: table-row
  }

  .customInfoWindow .table .cell {
    display: table-cell;
    width: 88px;
    border: 1px solid gray;
    text-align: left;
    padding-left: 4px;
    vertical-align: middle;
  }

  .customInfoWindow .table .cellHeader {
    display: table-cell;
    border: 1px solid gray;
    text-align: right;
    background-color: #f2f2f2;
    color: gray;
    width: 64px;
    height: 32px;
    padding-right: 4px;
    vertical-align: middle;
  }

  .customInfoWindow #mapAddr {
    height: 35px;
    margin: 5px;
    overflow: auto;
  }

  .customInfoWindow .track {
    position: relative;
    margin: 5px;
    height: 17px
  }

  #infoWindow {
    display: none
  }

  .orderSearchResult .table {
    display: table;
    font-size: 12px;
    width: 100%;
    padding: 12px;
    vertical-align: middle;
    border-collapse: collapse;
  }

  .orderSearchResult .table .row {
    display: table-row
  }

  .orderSearchResult .table .cell {
    display: table-cell;
    text-align: center;
  }

  .orderSearchResult .table .cellHeader {
    display: table-cell;
    border: 1px solid gray;
    text-align: center;
  }

  .orderSearchResult .table .cell2 {
    display: table-cell;
    border: 1px solid gray;
    text-align: center;
    color: gray;
  }

  .orderSearchResult .table .cell3 {
    display: table-cell;
    padding-bottom: 12px;
    text-align: center;
  }

  .orderSearchInput {
    margin-top: 12px;
  }

  .orderSearch .title {
    float: left;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0;
    color: #333333;
  }

  .orderSearchResult {
    margin-top: 12px;
    padding: 12px;
    height: 500px;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.5);
  }

  .orderSearch {
    position: absolute;
    right: 12px;
    top: 20px;
    width: 396px;
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
