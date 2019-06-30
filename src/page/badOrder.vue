<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <el-form :model="formList" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formList.name" placeholder="订单编号" style="width:150px">
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="请输入数字" v-model="formList.single" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formList.time" placeholder="订单时间" style="width:150px">
            <el-option label="实借时间" value="实借时间"></el-option>
            <el-option label="延期前应还时间" value="延期前应还时间"></el-option>
            <el-option label="延期后应还时间" value="延期后应还时间"></el-option>
            <el-option label="应还时间" value="应还时间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始时间" v-model="formList.date"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="逾期等级" v-model="formList.level">
            <el-option label="M1" value="M1"></el-option>
            <el-option label="M2" value="M2"></el-option>
            <el-option label="M3" value="M3"></el-option>
            <el-option label="M4" value="M4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formList.type" placeholder="财务减免方式" style="width:150px">
            <el-option label="无减免全额还款" value="无减免全额还款"></el-option>
            <el-option label="财务线上减免还款" value="财务线上减免还款"></el-option>
            <el-option label="财务线下减免还款" value="财务线下减免还款"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="用户类型" v-model="formList.person">
            <el-option label="正常用户" value="正常用户"></el-option>
            <el-option label="黑名单用户" value="黑名单用户"></el-option>
            <el-option label="白名单用户" value="白名单用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="订单编号" width="93" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="address" label="手机号" align="center"></el-table-column>
        <el-table-column prop="address" label="贷款方式" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="还款期数" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="实借时间" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="实借总金额/放贷总金额" width="125" align="center"></el-table-column>
        <el-table-column prop="address" label="应还时间" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="本期应还利息/本期应还金额" width="130" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期天数" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期罚金/应还总金额" width="110" align="center"></el-table-column>
        <el-table-column prop="address" label="催收员" align="center"></el-table-column>
        <el-table-column prop="address" label="还款状态" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="实还时间" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="剩余未还金额/实还总金额" width="130" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="page"
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
      formList: {
        name: "",
        single: "",
        type: "",
        level: "",
        time: "",
        person: ""
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    clear() {
      this.formList = {
        name: "",
        single: "",
        type: "",
        level: "",
        time: "",
        person: ""
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
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
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
