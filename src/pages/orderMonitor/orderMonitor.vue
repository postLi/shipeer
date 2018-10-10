<template>
  <div class="topLayer">
    <div id="monitor_map"></div>
    <div style="position: absolute;left: 0;top:0">
      <div class="ctl">
        <button class="btn" @click="displaySatellite">卫星图</button>
        <button class="btn btn2" @click="displayTraffic">实时路况</button>
        <button class="btn btn2" @click="displayAllMarkers">显示全部车辆</button>
        <button class="btn btn2" @click="centerMark">移动到中心点</button>
      </div>
    </div>
    <div class="orderSearch">
      <el-input class="orderSearchInput" placeholder="请输入内容" v-model="filterText">
        <el-button slot="append" icon="el-icon-search" class="orderSearchButton" @click="clickOrder(null,true)">搜索
        </el-button>
      </el-input>
      <div class="showOrderSearchResult" @click="clickOrderSearchResult" :style="showOrderSearchResultStyle">
        {{showOrderSearchResultIcon}}
      </div>
      <div class="orderSearchResult" v-show="showOrderSearchResult">
        <el-badge :value="orderNumAll">
          <div ref="ttt" class="title allOrder"
               :style="{color:('全部服务中' === orderStatus)?'red':'black', 'text-decoration':('全部服务中' === orderStatus)?'underline':'none'}"
               @click="clickOrder('全部服务中',true)">
            全部服务中
          </div>
        </el-badge>
        <div class="table">
          <div class="row">
            <div class="cell3" @click="clickOrder('司机已接单',true)">
              <el-badge :value="orderNumJiedan" :max="maxNum"
                        :style="{color:('司机已接单' === orderStatus)?'red':'black', 'text-decoration':('司机已接单' === orderStatus)?'underline':'none'}">
                司机已接单
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机赶往提货地',true)">
              <el-badge :value="orderNumGanwangtwd" :max="maxNum"
                        :style="{color:('司机赶往提货地' === orderStatus)?'red':'black', 'text-decoration':('司机赶往提货地' === orderStatus)?'underline':'none'}">
                司机赶往提货地
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机已到提货地',true)">
              <el-badge :value="orderNumYidaotwd" :max="maxNum"
                        :style="{color:('司机已到提货地' === orderStatus)?'red':'black', 'text-decoration':('司机已到提货地' === orderStatus)?'underline':'none'}">
                司机已到提货地
              </el-badge>
            </div>
          </div>
          <div class="row">
            <div class="cell3" @click="clickOrder('司机已装货',true)">
              <el-badge :value="orderNumYizhuanghuo" :max="maxNum"
                        :style="{color:('司机已装货' === orderStatus)?'red':'black', 'text-decoration':('司机已装货' === orderStatus)?'underline':'none'}">
                司机已装货
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('运输中',true)">
              <el-badge :value="orderNumYunshuzhong" :max="maxNum"
                        :style="{color:('运输中' === orderStatus)?'red':'black', 'text-decoration':('运输中' === orderStatus)?'underline':'none'}">
                运输中
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机已到目的地',true)">
              <el-badge :value="orderNumYidaomdd" :max="maxNum"
                        :style="{color:('司机已到目的地' === orderStatus)?'red':'black', 'text-decoration':('司机已到目的地' === orderStatus)?'underline':'none'}">
                司机已到目的地
              </el-badge>
            </div>
          </div>
          <div class="row">
            <div class="cell" @click="clickOrder('司机已卸货',true)">
              <el-badge
                :style="{color:('司机已卸货' === orderStatus)?'red':'black', 'text-decoration':('司机已卸货' === orderStatus)?'underline':'none'}"
                :value="orderNumYixiehuo" :max="maxNum">
                司机已卸货
              </el-badge>
            </div>
            <div class="cell" @click="clickOrder('司机改派',true)">
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
            <div class="row rowclick" v-for="(item,index) in carList" :key="item.orderSerial"
                 @click="clickOrder2(index)">
              <div class="cell4">
                {{item.orderSerial}}
              </div>
              <div class="cell2">
                {{item.carNumber}}
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
              <div class="cell" id="infoWindowCarNo">
              </div>
              <div class="cellHeader">
                司机
              </div>
              <div class="cell" id="infoWindowDriverName">
              </div>
            </div>
            <div class="row">
              <div class="cellHeader">
                车型
              </div>
              <div class="cell" id="infoWindowCarType">
              </div>
              <div class="cellHeader">
                联系电话
              </div>
              <div class="cell" id="infoWindowMobile">
              </div>
            </div>
          </div>
          <p class="bar" style="margin-top: 20px">订单信息</p>
          <table class="table2">
            <tr>
              <td class="label">用车时间</td>
              <td colspan="3" id="infoWindowOrderTime"></td>
            </tr>
            <tr>
              <td class="label">需求车型</td>
              <td id="infoWindowOrderCarType"></td>
              <td class="label">货物名称</td>
              <td id="infoWindowOrderCargo"></td>
            </tr>
            <tr>
              <td class="label">额外服务</td>
              <td colspan="3" id="infoWindowOrderExtraServ"></td>
            </tr>
            <tr>
              <td class="label">备注</td>
              <td colspan="3" id="infoWindowOrderMemo"></td>
            </tr>
            <tr>
              <td class="label">预估价格</td>
              <td id="infoWindowOrderPrice"></td>
              <td class="label">付款状态</td>
              <td id="infoWindowOrderPayState"></td>
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
              <td colspan="3" id="infoWindowOrderStartAddr"></td>
            </tr>
            <tr>
              <td class="label">途经地</td>
              <td colspan="3" id="infoWindowOrderPassAddr"></td>
            </tr>
            <tr>
              <td class="label">目的地</td>
              <td colspan="3" id="infoWindowOrderTargetAddr"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {postApi, getApi} from '@/api/api.js';
  import localStorage from '@/utils/localStorage';
  import VueJsCookie from 'vue-js-cookie';

  export default {
    name: "orderMonitor",
    data() {
      return {
        showOrderSearchResult: true,
        showOrderSearchResultIcon: "收起",
        showOrderSearchResultStyle: "right: 396px",
        filterText: null,
        mp: null,
        points: null,
        markerOffset: new AMap.Pixel(-28, -68),
        satelliteVisible: false,
        satelliteLayer: null,
        trafficVisible: false,
        trafficLayer: null,
        carUrl: require("../../assets/orderMonitor/car.png"),
        redballUrl: require("../../assets/orderMonitor/redball.png"),
        markerPoint: null,
        infoWindow2: null,
        orderdetail: null,
        geocoder: null,
        polyline: null,
        passedPolyline: null,
        redball: null,
        track: null,
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

      this.geocoder = new AMap.Geocoder();
      window.showTrack = this.showTrack;
      window.checkTrack = this.checkTrack;
      window.closeInfoWindow = this.closeInfoWindow;
      window.translateAddr = this.translateAddr;
      window.translateCode = this.translateCode;
      window.getOrderDetail2 = this.getOrderDetail2;
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
      var tempEle = document.getElementById("infoWindow");
      this.infoWindow2.setContent(tempEle.innerHTML);
      tempEle.innerHTML = "";

      if (!(this.checkLogin()))
        ;
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
      checkLogin() {
        var v = this.$route.query.access;
        if (v != null && v != "")
          VueJsCookie.set('28kytoken', v);

        v = this.$route.query.user;
        if (v != null && v != "")
          localStorage.set("28ky-userdata", {userToken: v});

        v = localStorage.get("28ky-userdata");
        if (v == null || v.userToken == null) {
          this.notLogin();
          return false;
        }

        v = VueJsCookie.get('28kytoken');
        if (v == null) {
          this.notLogin();
          return false;
        }

        return true;
      },
      notLogin() {
        this.$confirm('尚未登录或者登录信息已失效，请重新登录. ', '', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        });
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.clear();
        this.getOrder(this.orderStatusCode, true, true);
      },
      currentPageChange(val) {
        this.currentPage = val;
        this.clear();
        this.getOrder(this.orderStatusCode, true, true);
      },
      clear() {
        this.orderdetail = null;
        if (this.redball != null)
          this.redball.setMap(null);
        if (this.polyline != null)
          this.polyline.setPath(null);
        if (this.passedPolyline != null)
          this.passedPolyline.setPath(null);

        if (!this.mp)
          return;
        this.mp.clearInfoWindow();
        var points = this.points;
        this.points = [];
        if (points != null)
          this.mp.remove(points);
      },
      getOrder(orderStatus, updateFlag, searchFlag) {
        var s = "";
        if (orderStatus != null)
          s = "&status=" + orderStatus;
        if (searchFlag) {
          var t = this.filterText;
          if (t != null) {
            s = s + "&searchText=" + t;
          }
        }
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

          if (updateFlag) {
            this.totalCount = c;
            var l = res.data.list;
            if (l == null)
              l = [];
            this.carList = l;
            this.displayMarkers();
          }
        });
      },
      getOrderDetail2() {
        var marker = this.markerPoint;
        if (marker == null)
          return;
        var idx = marker.getExtData();
        if (idx == null)
          return;
        if (this.carList == null)
          return;
        var carInfo = this.carList[idx];
        if (carInfo == null)
          return;

        var ele = document.getElementById("infoWindowTitle");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowCarNo");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowDriverName");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowMobile");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderTime");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowCarType");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderCarType");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderCargo");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderExtraServ");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderMemo");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderPrice");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderPayState");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderStartAddr");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderPassAddr");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }

        ele = document.getElementById("infoWindowOrderTargetAddr");
        if (!ele) {
          setTimeout("getOrderDetail2()", 100);
          return;
        }
        var res = this.orderdetail;
        if (res == null || res.data == null)
          res = {data: {}};
        var v = res.data.carNumber;
        if (v == null)
          v = "";
        carInfo.carNumber = v;
        document.getElementById("infoWindowCarNo").innerText = v;

        v = res.data.driverName;
        if (v == null)
          v = "";
        carInfo.driverName = v;
        document.getElementById("infoWindowDriverName").innerText = v;

        v = res.data.driverMobile;
        if (v == null)
          v = "";
        carInfo.mobile = v;
        document.getElementById("infoWindowMobile").innerText = v;

        v = res.data.useCarTime;
        if (v)
          v = this.formatDate(v);
        if (v == null)
          v = "";
        document.getElementById("infoWindowOrderTime").innerText = v;

        v = res.data.carTypeName;
        if (v == null)
          v = "";
        document.getElementById("infoWindowCarType").innerText = v;
        document.getElementById("infoWindowOrderCarType").innerText = v;

        v = res.data.goodsName;
        if (v == null)
          v = "";
        document.getElementById("infoWindowOrderCargo").innerText = v;

        v = res.data.extraName;
        if (v == null)
          v = "";
        document.getElementById("infoWindowOrderExtraServ").innerText = v;

        v = res.data.sendWord;
        if (v == null)
          v = "";
        document.getElementById("infoWindowOrderMemo").innerText = v;

        v = res.data.orderPrice;
        if (v == null)
          v = "";
        document.getElementById("infoWindowOrderPrice").innerText = v;

        v = res.data.payStatus;
        if (v != null)
          v = this.statusCode2Text(v);
        if (v == null)
          v = res.data.payStatus;
        if (v == null)
          v = "";
        document.getElementById("infoWindowOrderPayState").innerText = v;

        document.getElementById("infoWindowOrderStartAddr").innerText = "";
        document.getElementById("infoWindowOrderPassAddr").innerText = "";
        document.getElementById("infoWindowOrderTargetAddr").innerText = "";
        v = res.data.addresses;
        if (v == null || v.length < 1) {
        } else {
          var addr = v[0];
          if (addr != null)
            addr = addr.viaAddressName;
          if (addr == null)
            addr = "";
          document.getElementById("infoWindowOrderStartAddr").innerText = addr;

          if (v.length > 2) {
            var i = 1;
            var str = null;
            for (; i < v.length; ++i) {
              addr = v[i];
              if (addr == null)
                continue;
              addr = addr.viaAddressName;
              if (addr == null)
                continue;
              if (str == null)
                str = addr;
              else
                str = str + "<br><br>" + addr;
            }
            if (str != null)
              document.getElementById("infoWindowOrderPassAddr").innerHTML = str;
          }

          if (v.length > 1) {
            addr = v[v.length - 1];
            if (addr != null)
              addr = addr.viaAddressName;
            if (addr == null)
              addr = "";
            document.getElementById("infoWindowOrderTargetAddr").innerText = addr;
          }
        }
        var status = res.data.orderStatus;
        if (status != null) {
          if (status != carInfo.status) {
            carInfo.status = status;
            carInfo.statusText = null;
            var text = this.statusCode2Text(status);
            if (text != null) {
              carInfo.statusText = text;
            } else
              text = this.orderStatus;
            text = this.subString(text, 16);
            document.getElementById("infoWindowTitle").innerText = text;
          }
        }

        var l = this.carList;
        this.carList = [];
        this.carList = l;
      },
      noPosition() {
        this.$confirm('未获取到该订单的位置数据，请稍后再试. ', '', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        });
      },
      getOrderDetail(orderId, marker) {
        try {
          if (orderId == null || !marker)
            return;
          var idx = marker.getExtData();
          if (idx == null)
            return;
          var carInfo = this.carList[idx];
          if (carInfo == null)
            return;
          postApi("/aflc-order/aflcMyOrderApi/myOrderDetail?orderSerial=" + orderId).then((res) => {
            if (res.data == null) {
              this.noPosition();
              return;
            }
            var trails = res.data.aflcOrderCarTrails;
            var lnglat = marker.getPosition();
            if (!lnglat && (!trails || trails.length < 1)) {
              this.noPosition();
              return;
            }
            var lastTrail = trails[trails.length - 1];
            if (!lnglat && (!lastTrail || lastTrail.longitude == null || lastTrail.latitude == null)) {
              this.noPosition();
              return;
            }
            var pos = null;
            if (lastTrail.longitude != null && lastTrail.latitude != null)
              pos = [lastTrail.longitude, lastTrail.latitude];
            if (pos == null)
              pos = lnglat;
            if (pos == null) {
              this.noPosition();
              return;
            }

            marker.setPosition(pos);
            marker.setMap(this.mp);
            this.markerPoint = marker;
            this.centerMark();
            this.infoWindow2.open(this.mp, pos);
            this.translateAddr();

            this.orderdetail = res;
            this.getOrderDetail2();
            this.translateCode();

            if (trails != null && (trails.length) > 0) {
              var i = 0;
              var pois = [];
              var point = null;
              for (; i < trails.length; ++i) {
                if (trails[i] == null || trails[i].longitude == null || trails[i].latitude == null)
                  continue;
                point = new AMap.LngLat(trails[i].longitude, trails[i].latitude);
                pois.push(point);
              }
              this.track = pois;
            }
          });
        } catch (e) {
        }
      },
      formatDate(milsec) {
        try {
          if (milsec == null)
            return null;
          var d = new Date();
          d.setTime(milsec);
          var m = d.getMonth() + 1;
          if (m < 10)
            m = "0" + m;
          return (d.getFullYear() + "-" + m + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        } catch (e) {
        }
        return null;
      },
      diffPosition(lngLat, pos) {
        try {
          if (lngLat && pos && pos.length === 2) {
            if ((lngLat.getLng()) != pos[0])
              return true;
            if ((lngLat.getLat()) != pos[1])
              return true;

            return false;
          }
          if (!lngLat && !pos)
            return false;
        } catch (e) {
        }
        return true;
      },
      logError() {
        this.$message.error("无法获取服务端数据. ");
      },
      clickOrder2(idx) {
        try {
          var marker = this.points[idx];
          if (!marker)
            return;
          var evt = {"target": marker};
          this.markerClick(evt);
          this.markerPoint = marker;
          this.centerMark();
        } catch (e) {
        }
      },
      clickOrder(ordStatus, searchFlag) {
        if (ordStatus != null)
          this.orderStatus = ordStatus;
        this.currentPage = 1;
        this.clear();
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
        this.getOrder(this.orderStatusCode, true, searchFlag);
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
        if (this.redball != null)
          this.redball.setMap(null);
        if (this.polyline != null)
          this.polyline.setPath(null);
        if (this.passedPolyline != null)
          this.passedPolyline.setPath(null);
        if (this.mp == null)
          return;
        if (this.points) {
          var points = this.points;
          var showPoints = [];
          var i = 0;
          for (; i < points.length; ++i) {
            if (points[i] == null || (points[i].getPosition()) == null || (points[i].getMap()) == null)
              continue;
            showPoints.push(points[i]);
          }
          if (showPoints.length > 0)
            this.mp.setFitView(showPoints);
        }
      },
      displaySatellite() {
        if (this.mp == null)
          return;
        if (this.satelliteLayer == null)
          this.satelliteLayer = new AMap.TileLayer.Satellite({map: this.mp});
        if (this.satelliteVisible)
          this.satelliteLayer.hide();
        else
          this.satelliteLayer.show();
        this.satelliteVisible = !(this.satelliteVisible);
      },
      displayTraffic() {
        if (this.mp == null)
          return;
        if (this.trafficLayer == null)
          this.trafficLayer = new AMap.TileLayer.Traffic({map: this.mp, autoRefresh: true});
        if (this.trafficVisible)
          this.trafficLayer.hide();
        else
          this.trafficLayer.show();
        this.trafficVisible = !(this.trafficVisible);
      },
      displayMarkers() {
        var l = this.carList;
        if (l == null)
          return;
        var i = 0;
        var pos = null;
        var marker = null;
        this.points = [];
        var showPoints = [];
        for (; i < l.length; ++i) {
          pos = l[i].pos;
          if (pos == null) {
            marker = new AMap.Marker({
              icon: this.carUrl,
              offset: this.markerOffset,
              extData: i
            });
          } else {
            marker = new AMap.Marker({
              icon: this.carUrl,
              position: pos,
              offset: this.markerOffset,
              extData: i,
              map: this.mp
            });
            showPoints.push(marker);
          }
          marker.on("click", this.markerClick);
          this.points.push(marker);
        }
        if (this.mp == null)
          return;
        if (showPoints.length > 0)
          this.mp.setFitView(showPoints);
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
        if (code === "AF00801")
          return "待付款";
        if (code === "AF00802")
          return "已付款";
        if (code === "AF00803")
          return "已退款";
        if (code === "AF00804")
          return "派单中";
        if (code === "AF00805")
          return "待指派";
        if (code === "AF00807")
          return "已完成";
        if (code === "AF00808")
          return "已取消";

        return null;
      },
      markerClick(e) {
        this.track = null;
        this.orderdetail = null;
        this.mp.clearInfoWindow();
        var markerPoint = this.markerPoint = e.target;
        var idx = markerPoint.getExtData();
        if (idx == null)
          return;
        var carInfo = null;
        if (idx >= 0 && idx < this.carList.length)
          carInfo = this.carList[idx];
        if (carInfo == null)
          return;

        var ele = document.getElementById("infoWindowTitle");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowCarNo");
        var v = null;
        if (ele) {
          v = carInfo.carNumber;
          if (v == null)
            v = "";
          ele.innerText = v;
        }

        ele = document.getElementById("infoWindowDriverName");
        if (ele) {
          v = carInfo.driverName;
          if (v == null)
            v = "";
          ele.innerText = v;
        }

        ele = document.getElementById("infoWindowCarType");
        if (ele) {
          v = carInfo.carType;
          if (v == null)
            v = "";
          ele.innerText = v;
        }

        ele = document.getElementById("infoWindowMobile");
        if (ele) {
          v = carInfo.mobile;
          if (v == null)
            v = "";
          ele.innerText = v;
        }

        ele = document.getElementById("infoWindowOrderTime");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderCarType");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderCargo");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderExtraServ");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderMemo");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderPrice");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderPayState");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("mapAddr");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderStartAddr");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderPassAddr");
        if (ele) {
          ele.innerText = "";
        }

        ele = document.getElementById("infoWindowOrderTargetAddr");
        if (ele) {
          ele.innerText = "";
        }

        var pos = markerPoint.getPosition();
        if (pos) {
          this.infoWindow2.open(this.mp, pos);
        }

        this.getOrderDetail(carInfo.orderSerial, markerPoint);
      },
      translateCode() {
        if (this.orderdetail == null || this.orderdetail.data == null)
          return;
        if (this.orderdetail.code_translate == null) {
          try {
            var q = null;
            if (this.orderdetail.data.orderStatus != null)
              q = this.orderdetail.data.orderStatus;
            if (this.orderdetail.data.payStatus != null) {
              if (q == null)
                q = this.orderdetail.data.payStatus;
              else
                q = q + "," + this.orderdetail.data.payStatus;
            }
            if (q == null)
              return;
            getApi("/aflc-common/aflcCommonSysDistApi/findAflcCommonSysDictByCodes/" + q).then((res) => {
              if (res == null || res.data == null)
                return;
              this.orderdetail.code_translate = res.data;
            });
          } catch (e) {
          }
        }

        if (this.orderdetail.code_translate == null) {
          setTimeout("translateCode()", 1000);
          return;
        }

        var ele = document.getElementById("infoWindowTitle");
        if (ele == null) {
          setTimeout("translateCode()", 1000);
          return;
        }

        ele = document.getElementById("infoWindowOrderPayState");
        if (ele == null) {
          setTimeout("translateCode()", 1000);
          return;
        }

        var s = this.orderdetail.data.orderStatus;
        if (s != null) {
          s = this.orderdetail.code_translate[s];
          if (s == null)
            s = "";
          else
            s = s.name;
          if (s == null)
            s = "";
          document.getElementById("infoWindowTitle").innerText = s;
        }

        s = this.orderdetail.data.payStatus;
        if (s != null) {
          s = this.orderdetail.code_translate[s];
          if (s == null)
            s = "";
          else
            s = s.name;
          if (s == null)
            s = "";
          document.getElementById("infoWindowOrderPayState").innerText = s;
        }
      },
      translateAddr() {
        var mapAddr = document.getElementById("mapAddr");
        if (mapAddr != null)
          mapAddr.innerText = "";
        else {
          setTimeout("translateAddr()", 1000);
          return;
        }
        var markerPoint = this.markerPoint;
        if (markerPoint == null)
          return;
        var pos = markerPoint.getPosition();
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
        var pois = this.track;
        if (pois == null || pois.length < 2) {
          this.$confirm('未获取到轨迹数据，请稍后再试. ', '', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          });
          return;
        }
        var d = AMap.GeometryUtil.distanceOfLine(pois);
        var s = (d * 3.6) / 5;
        var mp = this.mp;
        mp.clearInfoWindow();
        var polyline = this.polyline;
        polyline.setPath(pois);
        var redball = this.redball;
        redball.setPosition(pois[0]);
        redball.setMap(mp);
        mp.setFitView([polyline, redball]);
        redball.moveAlong(pois, s);
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
    word-break: break-all;
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
    word-break: break-all;
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
    word-break: break-all;
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
    display: none;
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
    left: 60px;
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
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-color: rgb(37, 165, 247);
    padding: 0.25rem 0.5rem;
  }

  .btn2 {
    margin-left: 5px;
  }
</style>
