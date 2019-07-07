<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="订单号" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="还款状态" v-model="form.type">
            <!-- <el-option label="立即贷+分期贷" value="立即贷+分期贷"></el-option> -->
            <el-option label="已还款" value="已还款"></el-option>
            <el-option label="未还款" value="未还款"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.date" placeholder="应还款日期" style="width:150px">
            <el-option label="应还款日期" value="应还款日期"></el-option>
            <!-- <el-option label="应还时间" value="应还时间"></el-option>
            <el-option label="实还时间" value="实还时间"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始时间" v-model="form.time"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="name" label="订单号" align="center"></el-table-column>
        <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
        <el-table-column prop="address" label="手机号" align="center"></el-table-column>
        <el-table-column prop="address" label="借款金额" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期天数" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期金额" align="center"></el-table-column>
        <el-table-column prop="address" label="应还款金额" align="center"></el-table-column>
        <el-table-column prop="address" label="应还款日期" align="center"></el-table-column>
        <el-table-column prop="address" label="还款状态" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center"></el-table-column>
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
      form: {
        id: "",
        name: "",
        phone: "",
        type: "",
        date: "",
        time: ""
      },
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
    },
    clear() {
      this.form = {
        id: "",
        name: "",
        phone: "",
        type: "",
        date: "",
        time: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {}
  }
};
</script>

<style lang="less">
@import "../style/mixin";
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
