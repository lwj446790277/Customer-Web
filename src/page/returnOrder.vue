<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <el-form :model="formList" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formList.name" placeholder="订单编号" style="width:150px">
            <!-- <el-option label="金额类型" value="金额类型"></el-option> -->
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="单行输入" v-model="formList.single" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formList.type" placeholder="还款方式" style="width:150px">
            <el-option label="未逾期主动还款" value="未逾期主动还款"></el-option>
            <el-option label="逾期后主动还款" value="逾期后主动还款"></el-option>
            <el-option label="财务线上减免主动还款" value="财务线上减免主动还款"></el-option>
            <el-option label="无减免自动还款" value="无减免自动还款"></el-option>
            <el-option label="财务线上减免自动还款" value="财务线上减免自动还款"></el-option>
            <el-option label="财务线下减免主动还款" value="财务线下减免主动还款"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formList.time" placeholder="订单时间" style="width:150px">
            <el-option label="实借时间" value="实借时间"></el-option>
            <el-option label="延期前应还时间" value="延期前应还时间"></el-option>
            <el-option label="延期后应还时间" value="延期后应还时间"></el-option>
            <el-option label="实还时间" value="实还时间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始时间" v-model="formList.start"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束时间" v-model="formList.end"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="是否全部还清" v-model="formList.person">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
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
        time: "",
        start: "",
        end: ""
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
        time: "",
        start: "",
        end: ""
      };
    },
    Reset() {
		this.clear();
	},
	Search(){

	}
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
