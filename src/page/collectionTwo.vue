<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="formList" :inline="true" class="demo-form-inline">
        <el-form-item class="time">
          <el-select v-model="formList.name" placeholder="订单编号" style="width:150px">
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="单行输入" v-model="formList.single" class="input-with-select"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input placeholder="编号/姓名/手机号" v-model="formList.id" class="input-with-select"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-select v-model="formList.type" placeholder="催收状态" style="width:150px">
            <el-option label="催收成功" value="催收成功"></el-option>
            <el-option label="催收中" value="催收中"></el-option>
            <el-option label="承诺还款" value="承诺还款"></el-option>
            <el-option label="未还清" value="未还清"></el-option>
            <el-option label="无人催收已还清" value="无人催收已还清"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item class="time">
          <el-select v-model="formList.time" placeholder="订单时间" style="width:150px">
            <el-option label="实借时间" value="实借时间"></el-option>
            <el-option label="延期后应还时间" value="延期后应还时间"></el-option>
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
        </el-form-item> -->
        <el-form-item>
          <el-select placeholder="逾期等级" v-model="formList.level">
            <el-option v-for="item in level" :key="item.value" :label="item.grade" :value="item.grade"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="催收员" v-model="formList.person">
            <el-option v-for="item in person" :key="item.value" :label="item.reallyName" :value="item.collectionMemberId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="statistics">
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
      </div> -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="orderNumber" label="订单编号" width="95" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="65" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="80" align="center"></el-table-column>
        <el-table-column prop="borrowMoneyWay" label="贷款方式" width="95" align="center"></el-table-column>
        <el-table-column prop="borrowTimeLimit" label="还款期数" width="95" align="center"></el-table-column>
        <el-table-column prop="orderCreateTime" label="实借时间" width="95" align="center"></el-table-column>
        <el-table-column prop="realityBorrowMoney" label="实借总金额" align="center"></el-table-column>
        <el-table-column prop="shouldReturnTime" label="应还时间" width="95" align="center"></el-table-column>
        <el-table-column prop="overdueNumberOfDays" label="逾期天数" width="95" align="center"></el-table-column>
        <el-table-column prop="overdueGrade" label="逾期等级" width="95" align="center"></el-table-column>
        <el-table-column prop="interestPenaltySum" label="逾期罚金/含逾应还总金额" width="125" align="center"></el-table-column>
        <el-table-column prop="reallyName" label="催收人" width="80" align="center"></el-table-column>
        <el-table-column prop="collectionTime" label="催收时间" width="95" align="center"></el-table-column>
        <el-table-column prop="collectionStatus" label="催收状态" width="95" align="center"></el-table-column>
        <el-table-column prop="realityAccount" label="剩余未还金额/实还金额" width="125" align="center">
          <template scope="scope">
            <span>{{scope.row.surplus_money}}/{{scope.row.realityAccount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收记录" width="120" align="center">
          <template scope="scope">
            <span class="cont" @click="open(scope.row.id)">查看催收</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="title" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="collection_time" label="催收时间" align="center"></el-table-column>
          <el-table-column property="user_type" label="用户状态" align="center"></el-table-column>
          <el-table-column property="collectionmoney" label="承诺还款金额" align="center"></el-table-column>
          <el-table-column property="user_neir" label="订单状态" align="center"></el-table-column>
        </el-table>
      </el-dialog>
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
      person: [],
      gridData: [],
      level: [],
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20,
      formList: {
        name: "",
        single: "",
        type: "",
        time: "",
        level: "",
        person: ""
      },
      title: "",
      dialogTableVisible: false
    };
  },
  created(){
    this.getData()
    this.getPerson()
    this.get()
  },
  methods: {
    getData(){
      this.axios.get('collection/BeoverdueYifenp',{
        params:{
          companyId: window.localStorage.getItem("companyid"),
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Orderdetails
      })
    },
    get(){
      this.axios.get('operation/YuqiM',{
        params:{
          companyId: window.localStorage.getItem("companyid")
        }
      }).then(res=>{
        this.level = res.data.OverdueClass
      })
    },
    getPerson(){
      this.axios.get('collection/collectionmember',{
        params:{
          companyId: window.localStorage.getItem("companyid")
        }
      }).then(res=>{
        this.person = res.data.collection_member
      })
    },
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
        level: "",
        person: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {
      if(this.formList.name=="姓名"){
        this.axios.get('collection/BeoverdueYifenp',{
          params:{
            companyId: window.localStorage.getItem("companyid"),
            name: this.formList.single,
            overdueGrade: this.formList.level,
            collectionStatus: this.formList.type,
            collectionMemberId: this.formList.person
          }
        }).then(res=>{
          this.tableData = res.data.Orderdetails
        })
      }else{
        if(this.formList.name=="手机号"){
          this.axios.get('collection/BeoverdueYifenp',{
            params:{
              companyId: window.localStorage.getItem("companyid"),
              phone: this.formList.single,
              overdueGrade: this.formList.level,
              collectionStatus: this.formList.type,
              collectionMemberId: this.formList.person
            }
          }).then(res=>{
            this.tableData = res.data.Orderdetails
          })
        }else{
          this.axios.get('collection/BeoverdueYifenp',{
            params:{
              companyId: window.localStorage.getItem("companyid"),
              orderNumber: this.formList.single,
              overdueGrade: this.formList.level,
              collectionStatus: this.formList.type,
              collectionMemberId: this.formList.person
            }
          }).then(res=>{
            this.tableData = res.data.Orderdetails
          })
        }
      }
    },
    open(id){
      this.dialogTableVisible = true
      this.axios.get('collection/Collectiondetails',{
        params:{
          orderId: id
        }
      }).then(res=>{
        this.gridData = res.data.Orderdetails
      })
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
.single {
  margin-left: -15px;
}
.el-popover p {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.confire {
  float: right;
}
.content {
  color: blue;
  cursor: pointer;
}
.block {
  padding-top: 20px;
  text-align: center;
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
.cont{
  color: blue;
  cursor: pointer;
}
</style>
