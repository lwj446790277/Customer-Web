<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <!-- <p class="explain_text">这里是支付记录</p> -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="收款人姓名" align="center"></el-table-column>
        <el-table-column prop="name" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="address" label="还款金额" align="center"></el-table-column>
        <el-table-column prop="address" label="还款银行卡" align="center"></el-table-column>
        <el-table-column prop="address" label="借款时间" align="center"></el-table-column>
        <el-table-column prop="address" label="打款时间" align="center"></el-table-column>
        <el-table-column prop="address" label="业务" align="center"></el-table-column>
        <el-table-column prop="address" label="收款渠道" align="center"></el-table-column>
        <el-table-column prop="address" label="状态" align="center"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page.sync="page"
          :page-sizes="[10, 15, 20, 25]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-count="totalPageCount"
          :total="totalCount"
          @size-change="sizeChange"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
  components: {
    headTop
  },
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  methods: {
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
// .explain_text {
//   margin-top: 20px;
//   text-align: center;
//   font-size: 20px;
//   color: #333;
// }
.main {
  padding: 20px;
}
.input {
  width: 200px;
  margin-right: 30px;
}
.right {
  float: right;
}
.block {
  padding-top: 20px;
  text-align: center;
}
.single {
  margin-left: -15px;
}
</style>
