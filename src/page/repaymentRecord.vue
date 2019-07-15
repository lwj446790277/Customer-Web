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
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="deferAfterReturntime" label="时间" align="center"></el-table-column>
        <el-table-column prop="orderNum" label="延期笔数" align="center"></el-table-column>
        <el-table-column prop="interestOnArrearsSum" label="延期费" align="center"></el-table-column>
        <el-table-column prop="address" label="银行扣款笔数" align="center"></el-table-column>
        <el-table-column prop="address" label="银行扣款金额" align="center"></el-table-column>
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
      <!-- <p>{{this.tableData.id}}</p> -->
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
      visible: false,
      visibles: false,
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created(){
    this.getData()
  },
  methods: {
    getData( page, Pagesize ){
      this.axios.get('fina/DelayStatistics',{
        params:{
          companyId: "3",
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Bankdeduction
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
        id: "",
        name: "",
        phone: "",
        type: "",
        account: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {
      this.axios.get('fina/DelayStatistics',{
        params:{
          startu_time: this.form.start,
          end_time: this.form.end
        }
      }).then(res=>{
        this.tableData = res.data.Bankdeduction 
      })
    },
    confire() {
      this.visible = false;
    },
    Return() {
      this.visibles = false;
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
.input {
  margin-left: 35px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.confire {
  float: right;
}
.content {
  color: blue;
  cursor: pointer;
}
</style>
