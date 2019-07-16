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
          <el-select placeholder="引流平台" v-model="form.platform">
            <!-- <el-option label="小米应用" value="小米应用"></el-option>
            <el-option label="华为应用" value="华为应用"></el-option>
            <el-option label="360手机助手" value="360手机助手"></el-option>
            <el-option label="第三方平台甲" value="第三方平台甲"></el-option>
            <el-option label="第三方平台乙" value="第三方平台乙"></el-option> -->
            <el-option v-for="item in platform" :key="item.value" :label="item.drainageOfPlatformName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%" fit>
        <el-table-column prop="orderCreateTime" label="日期" align="center"></el-table-column>
        <el-table-column prop="gesamtbetragderDarlehen" label="总放款金额" align="center"></el-table-column>
        <el-table-column prop="zahlderGesamtdarlehen" label="总放款笔数" align="center"></el-table-column>
        <el-table-column prop="gesamtbetragderRvckzahlung" label="总还款金额" align="center"></el-table-column>
        <el-table-column prop="gesamtbetragderNum" label="总还款笔数" align="center"></el-table-column>
        <el-table-column prop="gesamtbetraguberfalligerBetrag" label="总逾期金额" align="center"></el-table-column>
        <el-table-column prop="gesamtbetraguberfallNum" label="总逾期笔数" align="center"></el-table-column>
        <el-table-column prop="gesamtbetragderVerbindlichkeiten" label="总坏账金额" align="center"></el-table-column>
        <el-table-column prop="gesamtbetragdererNum" label="总坏账笔数" align="center"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page.sync="page"
          :page-sizes="[10, 15, 20, 25]"
          :page-size.sync="Pagesize"
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
      tableData: [
		  { id: 1 }
      ],
      platform: [],
      form: {
        start: "",
        end: "",
        platform: ""
      },
      page: 1,
      Pagesize: 10,
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
      this.axios.get('operation/platformsNum',{
        params:{
          companyId: window.localStorage.getItem("companyid"),
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Orders
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
    clear() {
      this.form = {
        start: "",
        end: "",
        platform: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {
      this.axios.get('operation/platformsNum',{
        params:{
          companyId: window.localStorage.getItem("companyid"),
          start_time: this.form.start,
          end_time: this.form.end
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Orders
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
.el-table{
  overflow: scroll;
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
