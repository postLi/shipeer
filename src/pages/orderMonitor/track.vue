<template>

</template>

<script>
  import "../../assets/orderMonitor/js/jmessage-sdk-web.2.6.0.min.js"

  export default {
    name: "track",
    mounted() {
      // alert("deng");
      window.JIM = new JMessage();
      JIM.init({
        "appkey": "4f7aef34fb361292c566a1cd",
        "random_str": "404",
        "signature": '7db047a67a9d7293850ac69d14cc82bf',
        "timestamp": 1507882399401,
        "flag": 1
      }).onSuccess(function (data) {
        console.log('success:' + JSON.stringify(data));
      }).onFail(function (data) {
        console.log('error:' + JSON.stringify(data));
      });
    }
  }
</script>

<style scoped>

</style>
