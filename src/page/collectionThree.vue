<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="back">
      <h2>催收率报表</h2>
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
            <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
            <el-button type="primary" @click="Search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;line-height: 60px"
        >
          <el-table-column prop="orderCreateTime" label="日期" align="center" class="red"></el-table-column>
          <el-table-column prop="orderNum" label="累计订单总数" align="center"></el-table-column>
          <el-table-column prop="collection_count" label="累计分配订单数" align="center"></el-table-column>
          <el-table-column prop="sameday" label="累计承诺还款订单数" align="center"></el-table-column>
          <el-table-column prop="paymentmade" label="累计未还清订单数" align="center"></el-table-column>
          <el-table-column prop="connected" label="累计坏账订单数" align="center"></el-table-column>
          <el-table-column prop="collNumdata" label="累计催回率(%)" align="center">
            <!-- <template slot-scope="scope">
            <span>{{scope.row.collNumdata}}%</span>
            </template>-->
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="page"
            :page-size.sync="Pagesize"
            layout="total, prev, pager, next, jumper"
            :page-count="totalPageCount"
            :total="totalCount"
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
      form: {
        start: "",
        end: ""
      },
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created() {
    this.getData(this.page, this.Pagesize);
  },
  methods: {
    getData(page, Pagesize) {
      this.axios.get("collection/CollectionLv", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            page,
            Pagesize
          }
        })
        .then(res => {
          this.tableData = res.data.Collection;
          this.page = res.data.Collection.page;
          this.Pagesize = res.data.Collection.Pagesize;
          this.totalCount = res.data.Collection.length;
          // this.totalPageCount = res.data.Collection.totalPageCount
        });
    },
    clear() {
      this.form = {
        start: "",
        end: ""
      };
    },
    Reset() {
      this.clear();
      this.getData(this.page, this.Pagesize);
    },
    Search() {
      this.axios
        .get("collection/CollectionLv", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            startu_time: this.form.start,
            end_time: this.form.end
          }
        })
        .then(res => {
          this.tableData = res.data.Collection;
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
.red {
  // background-color: red !important;
}
.el-table th {
  // background-color: red !important;
  // background-color:transparent;
}
// .cell{
//   background-color: red;
// }
</style>
