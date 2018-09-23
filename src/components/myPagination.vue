<template>
  <div class="block flex_ce">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=pageData.page
      :page-sizes="[10, 20, 40]"
      :page-size=pageData.size
      layout="total, sizes, prev, pager, next, jumper"
      :total=pageData.total>
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name:"myPagination",
    props: ["pageData"],
    methods: {
      handleSizeChange(val) {
        this.$emit("pageSize", val);
      },
      handleCurrentChange(val) {
        this.$emit("page", val);
      }
    },
    data() {
      return {
      };
    }
  }
</script>

<style scoped>

</style>
