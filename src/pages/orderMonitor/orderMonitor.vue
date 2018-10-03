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
      <div class="showOrderSearchResult" @click="clickOrderSearchResult" :style="showOrderSearchResultStyle">
        {{showOrderSearchResultIcon}}
      </div>
      <div class="orderSearchResult" v-show="showOrderSearchResult">
        <el-badge :value="orderNumAll">
          <div ref="ttt" class="title allOrder"
               :style="{color:('全部服务中' === orderStatus)?'red':'black', 'text-decoration':('全部服务中' === orderStatus)?'underline':'none'}"
               @click="clickOrder('全部服务中')">
            全部服务中
          </div>
        </el-badge>
        <div class="table">
          <div class="row">
            <div class="cell3" @click="clickOrder('司机已接单')">
              <el-badge :value="orderNumJiedan" :max="maxNum"
                        :style="{color:('司机已接单' === orderStatus)?'red':'black', 'text-decoration':('司机已接单' === orderStatus)?'underline':'none'}">
                司机已接单
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机赶往提货地')">
              <el-badge :value="orderNumGanwangtwd" :max="maxNum"
                        :style="{color:('司机赶往提货地' === orderStatus)?'red':'black', 'text-decoration':('司机赶往提货地' === orderStatus)?'underline':'none'}">
                司机赶往提货地
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机已到提货地')">
              <el-badge :value="orderNumYidaotwd" :max="maxNum"
                        :style="{color:('司机已到提货地' === orderStatus)?'red':'black', 'text-decoration':('司机已到提货地' === orderStatus)?'underline':'none'}">
                司机已到提货地
              </el-badge>
            </div>
          </div>
          <div class="row">
            <div class="cell3" @click="clickOrder('司机已装货')">
              <el-badge :value="orderNumYizhuanghuo" :max="maxNum"
                        :style="{color:('司机已装货' === orderStatus)?'red':'black', 'text-decoration':('司机已装货' === orderStatus)?'underline':'none'}">
                司机已装货
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('运输中')">
              <el-badge :value="orderNumYunshuzhong" :max="maxNum"
                        :style="{color:('运输中' === orderStatus)?'red':'black', 'text-decoration':('运输中' === orderStatus)?'underline':'none'}">
                运输中
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机已到目的地')">
              <el-badge :value="orderNumYidaomdd" :max="maxNum"
                        :style="{color:('司机已到目的地' === orderStatus)?'red':'black', 'text-decoration':('司机已到目的地' === orderStatus)?'underline':'none'}">
                司机已到目的地
              </el-badge>
            </div>
          </div>
          <div class="row">
            <div class="cell" @click="clickOrder('司机已卸货')">
              <el-badge
                :style="{color:('司机已卸货' === orderStatus)?'red':'black', 'text-decoration':('司机已卸货' === orderStatus)?'underline':'none'}"
                :value="orderNumYixiehuo" :max="maxNum">
                司机已卸货
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机改派')">
              <el-badge :value="orderNumGaipai" :max="maxNum"
                        :style="{color:('司机改派' === orderStatus)?'red':'black', 'text-decoration':('司机改派' === orderStatus)?'underline':'none'}">
                司机改派
              </el-badge>
            </div>
          </div>
        </div>
        <div style="max-height: 280px;overflow: auto;margin-top: 12px">
          <div class="table" style="width: 360px">
            <div class="row">
              <div class="cellHeader">
                订单号
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
            <div class="row rowclick" v-for="(item) in carList" :key="item.orderSerial">
              <div class="cell4">
                {{item.orderSerial}}
              </div>
              <div class="cell2">

              </div>
              <div class="cell2">
                {{item.driverName}}
              </div>
              <div class="cell2">
                {{item.mobile}}
              </div>
            </div>
          </div>
        </div>
        <div class="carPager">
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :pager-count="4" @current-change="currentPageChange" :current-page.sync="currentPage"
              :total="totalCount" :page-size="pageSize" @size-change="pageSizeChange">
            </el-pagination>
          </div>
          <div class="carPager2">
            <el-pagination
              background
              layout="total, sizes, jumper" @current-change="currentPageChange" :current-page.sync="currentPage"
              :total="totalCount" :page-size="pageSize" @size-change="pageSizeChange">
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
              <td colspan="3" style="padding: 4px">
                <div id="mapAddr"></div>
                <div class="track">
                  <div style="position: absolute;right: 0">
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
  import {postApi} from '@/api/api.js';

  export default {
    name: "orderMonitor",
    data() {
      return {
        showOrderSearchResult: true,
        showOrderSearchResultIcon: "收起",
        showOrderSearchResultStyle: "right: 396px",
        mp: null,
        points: null,
        markerOffset: new AMap.Pixel(-28, -68),
        carUrl: require("../../assets/orderMonitor/car.png"),
        redballUrl: require("../../assets/orderMonitor/redball.png"),
        markerPoint: null,
        infoWindow2: null,
        infoWindow2Init: false,
        geocoder: null,
        polyline: null,
        passedPolyline: null,
        redball: null,
        orderStatus: "全部服务中",
        orderStatusCode: "",
        orderNumAll: "",
        orderNumJiedan: "",
        orderNumGanwangtwd: "",
        orderNumYidaotwd: "",
        orderNumYizhuanghuo: "",
        orderNumYunshuzhong: "",
        orderNumYidaomdd: "",
        orderNumYixiehuo: "",
        orderNumGaipai: "",
        totalCount: 0,
        pageSize: 10,
        currentPage: 1,
        maxNum: 999,
        carList: []
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

      // var points = this.points = [];
      // var carUrl = this.carUrl;
      // var marker = new AMap.Marker({
      //   icon: carUrl,
      //   position: [113.28804, 23.086912],
      //   offset: new AMap.Pixel(-28, -68),
      //   map: mp
      // });
      // marker.content = "1";
      // var markerClick = this.markerClick;
      // marker.on("click", markerClick);
      // points.push(marker);
      //
      // marker = new AMap.Marker({
      //   icon: carUrl,
      //   position: [116.395645, 39.924232],
      //   offset: new AMap.Pixel(-28, -68),
      //   map: mp
      // });
      // marker.content = "2";
      // marker.on("click", markerClick);
      // points.push(marker);
      //
      // marker = new AMap.Marker({
      //   icon: carUrl,
      //   position: [106.546242, 29.585069],
      //   offset: new AMap.Pixel(-28, -68),
      //   map: mp
      // });
      // marker.content = "3";
      // marker.on("click", markerClick);
      // points.push(marker);
      //
      // marker = new AMap.Marker({
      //   icon: carUrl,
      //   position: [103.816546, 36.083181],
      //   offset: new AMap.Pixel(-28, -68),
      //   map: mp
      // });
      // marker.content = "4";
      // marker.on("click", markerClick);
      // points.push(marker);
      //
      // mp.setFitView(points);

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
      this.getOrder("", true);
      this.getOrder("AF0080601HZ", false);
      this.getOrder("AF0080602HZ", false);
      this.getOrder("AF0080603HZ", false);
      this.getOrder("AF0080604HZ", false);
      this.getOrder("AF0080605HZ", false);
      this.getOrder("AF0080606HZ", false);
      this.getOrder("AF0080607HZ", false);
      this.getOrder("AF0080608HZ", false);
    },
    methods: {
      pageSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getOrder(this.orderStatusCode, true);
      },
      currentPageChange(val) {
        this.currentPage = val;
        this.getOrder(this.orderStatusCode, true);
      },
      getOrder(orderStatus, flag) {
        var s = "";
        if (orderStatus != null)
          s = "&status=" + orderStatus;
        postApi("/aflc-order/aflcMyOrderApi/myOrderList?currentPage=" + this.currentPage + "&pageSize=" + this.pageSize + s).then((res) => {
          var c = "";
          try {
            c = res.data.totalCount;
          } catch (e) {
            this.logError();
          }

          if (c === "" || c == null || isNaN(c))
            return;
          if (orderStatus === "")
            this.orderNumAll = c;
          else if (orderStatus === "AF0080601HZ")
            this.orderNumJiedan = c;
          else if (orderStatus === "AF0080602HZ")
            this.orderNumGanwangtwd = c;
          else if (orderStatus === "AF0080603HZ")
            this.orderNumYidaotwd = c;
          else if (orderStatus === "AF0080604HZ")
            this.orderNumYizhuanghuo = c;
          else if (orderStatus === "AF0080605HZ")
            this.orderNumYunshuzhong = c;
          else if (orderStatus === "AF0080606HZ")
            this.orderNumYidaomdd = c;
          else if (orderStatus === "AF0080607HZ")
            this.orderNumYixiehuo = c;
          else if (orderStatus === "AF0080608HZ")
            this.orderNumGaipai = c;

          if (flag) {
            this.totalCount = c;
            var l = res.data.list;
            if (l == null)
              l = [];
            this.carList = l;
            this.displayMarkers();
          }
        });
      },
      logError() {
        this.$message.error("无法获取服务端数据. ");
      },
      clickOrder(ordStatus) {
        this.orderStatus = ordStatus;
        this.currentPage = 1;
        var points = this.points;
        this.points = [];
        if (points != null)
          this.mp.remove(points);
        if (ordStatus === "全部服务中")
          this.orderStatusCode = "";
        else if (ordStatus === "司机已接单")
          this.orderStatusCode = "AF0080601HZ";
        else if (ordStatus === "司机赶往提货地")
          this.orderStatusCode = "AF0080602HZ";
        else if (ordStatus === "司机已到提货地")
          this.orderStatusCode = "AF0080603HZ";
        else if (ordStatus === "司机已装货")
          this.orderStatusCode = "AF0080604HZ";
        else if (ordStatus === "运输中")
          this.orderStatusCode = "AF0080605HZ";
        else if (ordStatus === "司机已到目的地")
          this.orderStatusCode = "AF0080606HZ";
        else if (ordStatus === "司机已卸货")
          this.orderStatusCode = "AF0080607HZ";
        else if (ordStatus === "司机改派")
          this.orderStatusCode = "AF0080608HZ";
        this.getOrder(this.orderStatusCode, true);
      },
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
        if (this.showOrderSearchResultIcon === "收起") {
          this.showOrderSearchResult = false;
          this.showOrderSearchResultIcon = "展开";
          this.showOrderSearchResultStyle = "right:-12px";
        } else {
          this.showOrderSearchResult = true;
          this.showOrderSearchResultIcon = "收起";
          this.showOrderSearchResultStyle = "right:396px";
        }
      },
      displayAllMarkers() {
        if (this.mp == null || this.points == null)
          return;
        this.mp.setFitView(this.points);
        if (this.redball != null)
          this.redball.setMap(null);
      },
      displayMarkers() {
        var l = this.carList;
        if (l == null)
          return;
        var i = 0;
        var pos = null;
        var marker = null;
        this.points = [];
        for (; i < l.length; ++i) {
          pos = l[i].pos;
          if (pos == null)
            continue;
          marker = new AMap.Marker({
            icon: this.carUrl,
            position: pos,
            offset: this.markerOffset,
            extData: i,
            map: this.mp
          });
          marker.on("click", this.markerClick);
          this.points.push(marker);
        }
        if (this.redball != null)
          this.redball.setMap(null);
        if (this.mp == null || this.points == null)
          return;
        this.mp.setFitView(this.points);
      },
      centerMark() {
        if (this.markerPoint != null)
          this.mp.panTo(this.markerPoint.getPosition());
      },
      statusCode2Text(code) {
        if (code === "AF0080601HZ")
          return "司机已接单";
        if (code === "AF0080602HZ")
          return "司机赶往提货地";
        if (code === "AF0080603HZ")
          return "司机已到提货地";
        if (code === "AF0080604HZ")
          return "司机已装货";
        if (code === "AF0080605HZ")
          return "运输中";
        if (code === "AF0080606HZ")
          return "司机已到目的地";
        if (code === "AF0080607HZ")
          return "司机已卸货";
        if (code === "AF0080608HZ")
          return "司机改派";
      },
      markerClick(e) {
        this.mp.clearInfoWindow();
        var markerPoint = this.markerPoint = e.target;
        var idx = markerPoint.extData;
        if (idx == null)
          return;
        var infoWindow = this.infoWindow2;
        var status=this.orderStatus;
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
        if ("1" === orderId) {
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
        } else if (orderId === "2") {
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
        } else if (orderId === "3") {
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
        } else if (orderId === "4") {
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

  .carPager .el-pager li,
  .carPager .el-pagination button, .el-pagination span:not([class*=suffix]),
  .carPager .el-input__inner,
  .carPager .el-pagination__sizes .el-input .el-input__inner {
    font-size: 12px
  }

  .carPager .el-pagination__jump {
    margin-left: unset;
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
    overflow: auto;
  }

  .customInfoWindow .track {
    position: relative;
    height: 17px
  }

  #infoWindow {
    display: none
  }

  .carPager {
    position: absolute;
    bottom: 12px;
    font-size: 12px;
  }

  .carPager2 {
    padding-left: 4px;
  }

  .allOrder {
    float: none;
    margin-bottom: 12px;
  }

  .el-badge {
    cursor: pointer;
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

  .rowclick {
    cursor: pointer;
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
    width: 89px;
    max-width: 89px;
    word-wrap: break-word;
  }

  .orderSearchResult .table .cell3 {
    display: table-cell;
    padding-bottom: 12px;
    text-align: center;
  }

  .orderSearchResult .table .cell4 {
    display: table-cell;
    border: 1px solid gray;
    text-align: center;
    color: gray;
    width: 93px;
    max-width: 93px;
    word-wrap: break-word;
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

  .orderSearch .showOrderSearchResult {
    position: absolute;
    right: 396px;
    top: 200px;
    background-color: white;
    padding: 60px 2px;
    font-size: 14px;
    cursor: pointer;
    width: 20px;
    text-align: center;
  }

  .topLayer {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
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
