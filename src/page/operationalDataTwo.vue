<template>
  <div class="fillcontain">
    <head-top></head-top>
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
            <el-option v-for="item in platform" :key="item.value" :label="item.drainageOfPlatformName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="orderCreateTime" label="日期" align="center"></el-table-column>
        <el-table-column prop="repayment_Count" label="还款笔数" align="center"></el-table-column>
        <el-table-column prop="collection_count" label="逾期还款笔数" align="center"></el-table-column>
        <el-table-column prop="repaymeny_collectiondata" label="逾期还款占比(%)" align="center"></el-table-column>
        <el-table-column prop="realityAccount" label="总还款金额" align="center"></el-table-column>
        <el-table-column prop="couNum" label="总放款笔数" align="center"></el-table-column>
        <el-table-column prop="collection_money" label="逾期金额" align="center"></el-table-column>
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
      platform: [],
      form: {
        start: "",
        end: "",
        platform: ""
      },
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created(){
    this.getData(this.page, this.Pagesize)
    this.get()
  },
  methods: {
    getData(page,Pagesize){
      this.axios.get('operation/HuanKuandata',{
        params:{
          companyId: window.localStorage.getItem("companyid"),
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Repayment
      })
    },
    get(){
      this.axios.get('operation/AllDrainage',{
        params:{
          companyId: window.localStorage.getItem("companyid"),
        }
      }).then(res=>{
        this.platform = res.data.Drainage_of_platform
      })
    },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    Search() {
      this.axios.get('operation/HuanKuandata',{
        params:{
          companyId: window.localStorage.getItem("companyid"),
          start_time: this.form.start,
          end_time: this.form.end,
          drainageOfPlatformId: this.form.platform
        }
      }).then(res=>{
        this.tableData = res.data.Repayment
      })
    }
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
