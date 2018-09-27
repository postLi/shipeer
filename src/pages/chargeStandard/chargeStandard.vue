<template>
  <div class="height_100 width_100">
    <div class="flex">
      <el-cascader placeholder="请选择城市" size="small"
                   :props="defaultProps"
                   :options="cityList"
                   v-model="form.code"
                   :show-all-levels="false"
                   filterable
                   @change="getPriceByArea">
      </el-cascader>
    </div>
    <iframe frameborder="0" height="100%" width="100%" :src="src"></iframe>
  </div>

</template>

<script>
  import { getApi ,postApi} from "@/api/api.js";
    export default {
        name: "chargeStandard",
      data(){
          return {
            src:"",
            defaultProps: {
              value:'code',
              children: 'cities',
              label: 'name'
            },
            cityList:[],//城市列表
            form:{
              code:[]
            }
          }
      },
      methods:{
        getPriceByArea(data){
          this.src = `http://h5.2856pt.com/areaprice/?areaCode=${data[1]}&serivceCode=AF01701`
        },
        createMap(){
          var citysearch = new AMap.CitySearch();
          citysearch.getLocalCity((status, result) =>{
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.city && result.bounds) {
                let adcode =  result.adcode * 1;
                let city = result.city;
                //城市列表
                getApi('/aflc-common/aflcCommonAddressApi/cityList').then((res)=>{
                  res.forEach((item)=>{
                    item.code = item.pinyin;
                    item.name = item.pinyin;
                  });
                  res.unshift({code: "当前定位城市", name: "当前定位城市", pinyin: "当前定位城市",cities:[{
                      code: adcode,
                      name: city,
                      parentCode: 1,
                      pinyin: "当前定位城市",
                    }]});
                  this.form.code = ["当前定位城市",adcode];
                  this.cityList = res;
                  this.src = `http://h5.2856pt.com/areaprice/?areaCode=${adcode}&serivceCode=AF01701`
                });
              }
            }
          });
        },
      },
      created(){
        this.createMap()
      }
    }
</script>

<style scoped>

</style>
