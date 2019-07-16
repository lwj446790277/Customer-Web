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
          <el-col :span="11">
            <el-date-picker type="date" placeholder="实借起始时间" v-model="formList.start"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="实借结束时间" v-model="formList.end"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="延期前应还起始时间" v-model="formList.deferBeforeReturntimeStatu_time"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="延期前应还结束时间" v-model="formList.deferBeforeReturntimeEnd_time"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="延期后应还起始时间" v-model="formList.deferAfterReturntimeStatu_time"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="延期后应还结束时间" v-model="formList.deferAfterReturntimeEnd_time"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="实还起始时间" v-model="formList.realtimeStatu_time"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="实还结束时间" v-model="formList.realtimeEnd_time"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="orderNumber" label="订单编号" width="93" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
        <el-table-column prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
        <el-table-column prop="orderCreateTime" label="实借时间" width="93" align="center"></el-table-column>
        <el-table-column label="实借总金额/放贷总金额" width="125" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deferBeforeReturntime" label="应还时间" width="93" align="center"></el-table-column>
        <el-table-column label="本期应还利息/本期应还金额" width="130" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.interestOnArrears}}/{{scope.row.makeLoans}}</span>
          </template>
        </el-table-column>
		    <el-table-column prop="overdueNumberOfDays" label="逾期天数" width="93" align="center"></el-table-column>
		    <el-table-column label="逾期罚金/应还总金额" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.interestPenaltySum}}/{{scope.row.order_money}}</span>
          </template>
        </el-table-column>
		    <el-table-column prop="reallyName" label="催收员" align="center"></el-table-column>
        <el-table-column prop="collectionStatus" label="还款状态" width="93" align="center"></el-table-column>
        <el-table-column prop="realtime" label="实还时间" width="93" align="center"></el-table-column>
        <el-table-column label="剩余未还金额/实还总金额" width="130" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.surplus_money}}/{{scope.row.realityAccount}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="page"
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
      tableData: [],
      formList: {
        name: "",
        single: "",
        type: "",
        start: "",
        end: "",
        deferBeforeReturntimeStatu_time: "",
        deferBeforeReturntimeEnd_time: "",
        deferAfterReturntimeStatu_time: "",
        deferAfterReturntimeEnd_time: "",
        realtimeStatu_time: "",
        realtimeEnd_time: ""
      },
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created(){
    this.getData(this.page, this.Pagesize)
  },
  methods: {
    getData(page,Pagesize){
      this.axios.get('postloanor/YihuanOrders',{
        params:{
          companyId: "3",
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Orderdetails
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
          start: "",
          end: "",
          deferBeforeReturntimeStatu_time: "",
          deferBeforeReturntimeEnd_time: "",
          deferAfterReturntimeStatu_time: "",
          deferAfterReturntimeEnd_time: "",
          realtimeStatu_time: "",
          realtimeEnd_time: ""
        };
    },
    Reset() {
      this.clear();
    },
    Search(){
      if(this.formList.name=="姓名"){
        this.axios.get('postloanor/YihuanOrders',{
          params:{
            companyId: "3",
            name: this.formList.single,
            start_time: this.formList.start,
            end_time: this.formList.end,
            deferBeforeReturntimeStatu_time: this.formList.deferBeforeReturntimeStatu_time,
            deferBeforeReturntimeEnd_time: this.formList.deferBeforeReturntimeEnd_time,
            deferAfterReturntimeStatu_time: this.formList.deferAfterReturntimeStatu_time,
            deferAfterReturntimeEnd_time: this.formList.deferAfterReturntimeEnd_time,
            realtimeStatu_time: this.formList.realtimeStatu_time,
            realtimeEnd_time: this.formList.realtimeEnd_time
          }
        }).then(res=>{
          this.tableData = res.data.Orderdetails
        })
      }else{
        if(this.formList.name=="手机号"){
          this.axios.get('postloanor/YihuanOrders',{
            params:{
              companyId: "3",
              phone: this.formList.single,
              start_time: this.formList.start,
              end_time: this.formList.end,
              deferBeforeReturntimeStatu_time: this.formList.deferBeforeReturntimeStatu_time,
              deferBeforeReturntimeEnd_time: this.formList.deferBeforeReturntimeEnd_time,
              deferAfterReturntimeStatu_time: this.formList.deferAfterReturntimeStatu_time,
              deferAfterReturntimeEnd_time: this.formList.deferAfterReturntimeEnd_time,
              realtimeStatu_time: this.formList.realtimeStatu_time,
              realtimeEnd_time: this.formList.realtimeEnd_time
            }
          }).then(res=>{
            this.tableData = res.data.Orderdetails
          })
        }else{
          this.axios.get('postloanor/YihuanOrders',{
            params:{
              companyId: "3",
              orderNumber: this.formList.single,
              start_time: this.formList.start,
              end_time: this.formList.end,
              deferBeforeReturntimeStatu_time: this.formList.deferBeforeReturntimeStatu_time,
              deferBeforeReturntimeEnd_time: this.formList.deferBeforeReturntimeEnd_time,
              deferAfterReturntimeStatu_time: this.formList.deferAfterReturntimeStatu_time,
              deferAfterReturntimeEnd_time: this.formList.deferAfterReturntimeEnd_time,
              realtimeStatu_time: this.formList.realtimeStatu_time,
              realtimeEnd_time: this.formList.realtimeEnd_time
            }
          }).then(res=>{
            this.tableData = res.data.Orderdetails
          })
        }
      }
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
