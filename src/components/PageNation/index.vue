<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="98">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      currentPage: 1
    },
    methods: {
      handleSizeChange() {
        alert("size change");
      },
      handleCurrentChange() {
        alert("current change")
      },

    }
  }

</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 30px;
    padding-bottom: 20px;
    float: right;
  }

</style>
