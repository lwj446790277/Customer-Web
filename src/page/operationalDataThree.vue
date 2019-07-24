<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="back">
      <h2>逾期数据</h2>
      <div class="main">
        <el-form :model="form" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="起始时间" v-model="form.start"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item class="single">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="结束时间" v-model="form.end"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="引流渠道" v-model="form.platform">
              <el-option
                v-for="item in platform"
                :key="item.value"
                :label="item.drainageOfPlatformName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="orderCreateTime" label="日期" align="center"></el-table-column>
          <el-table-column prop="collection_count" label="逾期笔数" align="center"></el-table-column>
          <el-table-column prop="makeLoans" label="逾期金额" align="center"></el-table-column>
          <el-table-column prop="interestPenaltySum" label="逾期罚息" align="center"></el-table-column>
          <el-table-column prop="beoverdue" label="催收笔数" align="center"></el-table-column>
          <el-table-column prop="passrate" label="催收次数" align="center"></el-table-column>
          <el-table-column prop="chenggNum" label="催收成功数" align="center"></el-table-column>
          <el-table-column prop="chenggData" label="催收成功率(%)" align="center"></el-table-column>
          <el-table-column prop="baddebt" label="坏账数" align="center"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="page"
            :page-size.sync="pageSize"
            layout="total, prev, pager, next, jumper"
            :page-count="totalPageCount"
            :total="totalCount"
            @size-change="sizeChange"
            @current-change="currentChange"
          ></el-pagination>
        </div>
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
      platform: [],
      form: {
        start: "",
        end: "",
        platform: ""
      },
      page: 0,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created() {
    this.getData(this.page, this.Pagesize);
    this.get();
  },
  methods: {
    getData(page, Pagesize) {
      this.axios
        .get("operation/CollectionData", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            page,
            Pagesize
          }
        })
        .then(res => {
          this.tableData = res.data.Orderdetails;
          this.page = res.data.Orderdetails.page;
          this.Pagesize = res.data.Orderdetails.Pagesize;
          this.totalCount = res.data.Orderdetails.length;
          // this.totalPageCount = res.data.pageUtil.totalPage
        });
    },
    get() {
      this.axios
        .get("operation/AllDrainage", {
          params: {
            companyId: window.localStorage.getItem("companyid")
          }
        })
        .then(res => {
          this.platform = res.data.Drainage_of_platform;
        });
    },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    Search() {
      this.axios
        .get("operation/CollectionData", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            start_time: this.form.start,
            end_time: this.form.end,
            drainageOfPlatformId: this.form.platform
          }
        })
        .then(res => {
          this.tableData = res.data.Orderdetails;
        });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.main {
  padding: 20px;
  background-color: #fff;
  min-height: 70vh;
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
