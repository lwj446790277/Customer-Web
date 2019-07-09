<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.name" placeholder="订单编号" style="width:150px">
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="单行输入" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.time" placeholder="订单时间" style="width:150px">
            <el-option label="订单时间" value="订单时间"></el-option>
            <el-option label="延借时间" value="延借时间"></el-option>
            <el-option label="延期后应还" value="延期后应还"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-col :span="11" class="single">
            <el-date-picker type="date" placeholder="起始时间" v-model="form.start"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束时间" v-model="form.end"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="逾期等级" v-model="form.level">
            <el-option label="M1" value="M1"></el-option>
            <el-option label="M2" value="M2"></el-option>
            <el-option label="M3" value="M3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="statistics">
        <ul>
          <li>分配订单总数</li>
          <li class="num">10</li>
          <li>承诺还款订单数</li>
          <li class="num">10</li>
          <li>成功订单数</li>
          <li class="num">10</li>
          <li>未还清订单数</li>
          <li class="num">10</li>
          <li>坏账订单数</li>
          <li class="num">10</li>
        </ul>
      </div>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="Name" label="真实姓名" align="center"></el-table-column>
        <el-table-column prop="Phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="borrowMoneyWay" label="贷款方式" align="center"></el-table-column>
        <el-table-column prop="repaymentPeriods" label="还款期数" align="center"></el-table-column>
        <el-table-column prop="realityBorrowMoney" label="实借总金额" width="90" align="center"></el-table-column>
        <el-table-column prop="overdueNumberOfDays" label="逾期天数" align="center"></el-table-column>
        <el-table-column prop="Grade" label="逾期等级" align="center"></el-table-column>
        <el-table-column prop="shouldReapyMoney" label="逾期罚金/含逾应还总金额" width="125" align="center"></el-table-column>
        <el-table-column prop="collectionTime" label="分配时间" align="center"></el-table-column>
        <el-table-column prop="user_neir" label="用户状态" align="center"></el-table-column>
        <el-table-column prop="promise_money" label="承诺还清部分金额" width="100" align="center"></el-table-column>
        <el-table-column prop="address" label="催收次数" align="center"></el-table-column>
        <el-table-column prop="borrowMoneyState" label="订单状态" align="center"></el-table-column>
        <el-table-column prop="address" label="剩余还款金额/实还金额" width="120" align="center"></el-table-column>
        <el-table-column prop="address" label="新增催收" width="93" align="center">
          <template slot-scope="scope">
            <span class="blue" @click="newAdd(scope.row)">新增催收</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="结束催收" width="93" align="center">
          <template slot-scope="scope">
                <el-popover placement="bottom-end" width="400" trigger="click">
                    <p>确定结束催收该用户吗？</p>
                    <el-button type="success" class="confire" @click="confire(scope.row)">是的</el-button>
                    <span class="blue" slot="reference">结束催收</span>
                </el-popover>
            </template>
        </el-table-column>
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
      tableData: [{}],
      form: {
        time: "",
        start: "",
        end: "",
        id: "",
        dai: "",
        level: ""
      },
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      this.axios.get('collection/YiCollection').then(res=>{
        this.tableData = res.data
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
        time: "",
        start: "",
        end: "",
        id: "",
        dai: "",
        level: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {
      
    },
    confire(){
      this.axios.get('collection/AddCollection',{
        params:{
          ids,
          CollectionMemberId
        }
      }).then(res=>{

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
.statistics{
  width: 100%
}
.statistics ul{
  width: 100%;
}
.statistics ul li{
  width: 9.93%;
  line-height: 60px;
  margin-bottom: -1px;
  float: left;
  text-align: center;
  border: 1px solid #dfe6ec;
}
.statistics ul li.num{
  margin-left: -1px;
  margin-right: -1px;
  color: red;
}
.confire {
  float: right;
}
p {
  font-size: 1rem;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.blue{
  color: blue;
  cursor: pointer;
}
</style>
