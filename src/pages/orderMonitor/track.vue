<template>
  <div style="padding: 30px">
    <input type="button" value="测试一下" @click="test"/>
    <input type="button" value="重置" @click="result=''" style="margin-left: 20px"/>
    <div style="margin-top:20px">测试结果：{{result}}</div>
  </div>
</template>

<script>
  import "../../assets/orderMonitor/js/jmessage-sdk-web.2.6.0.min.js";

  const md5 = require("js-md5");

  export default {
    name: "track",
    data() {
      return {
        result: "",
        jim: null,
        appkey: "02c4b4f0341b60405b3c99e7",
        key: "ce2f5588bd87f228b514e847",
        random_str: "022cd9fd995849b",
      }
    },
    methods: {
      test() {
        var now = (new Date()).getTime();
        this.jim.init({
          "appkey": this.appkey,
          "random_str": this.random_str,
          "signature": md5("appkey=" + this.appkey + "&timestamp=" + now + "&random_str=" + this.random_str + "&key=" + this.key),
          "timestamp": now,
          "flag": 1
        }).onSuccess((data) => {
          this.result = 'success:' + JSON.stringify(data);
        }).onFail((data) => {
          this.result = 'error:' + JSON.stringify(data);
        });
      }
    },
    mounted() {
      this.jim = new JMessage();
    }
  }
</script>

<style scoped>

</style>
