<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <!-- <p class="explain_text">这里是支付记录</p> -->
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.name" placeholder="还款流水号" style="width:150px">
            <el-option label="还款流水号" value="还款流水号"></el-option>
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="单行输入" v-model="form.input"></el-input>
        </el-form-item>
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
          <el-select v-model="form.qudao" placeholder="放款渠道" style="width:150px">
            <el-option label="放款渠道甲" value="放款渠道甲"></el-option>
            <el-option label="放款渠道乙" value="放款渠道乙"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="remittanceTime" label="流水号时间" align="center"></el-table-column>
        <el-table-column prop="loanSource" label="放款渠道" align="center"></el-table-column>
        <el-table-column prop="pipelinenumber" label="放款流水号" align="center"></el-table-column>
        <el-table-column prop="paymentmoney" label="放款金额" align="center"></el-table-column>
        <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="address" label="订单查询" align="center">
          <template slot-scope="scope">
            <span class="blue" @click="jie(scope.row.orderNumber)">借款信息</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="借款信息"
        :visible.sync="centerDialogVisible"
        width="30%"
        customClass="customWidth"
        center>
        <ul class="ul">
          <li>
            <span>订单编号:</span>
            <span>{{id}}</span>
          </li>
          <li>
            <span>姓名:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>手机号:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>注册时间:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>订单时间:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>引流渠道:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>机审时间:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>风控模型/分数:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>人审时间:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>审核人员:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>贷款方式:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>还款期数:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>实借/放款:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>借款时间:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>总利息/总还款:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>延期次数/延期金额:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>每次延期天数:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>延期前还款时间:</span>
            <span>{{name}}</span>
          </li>
          <li>
            <span>延期后还款时间:</span>
            <span>{{name}}</span>
          </li>
        </ul>
      </el-dialog>
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
      tableData: [],
      borrow: '1',
      form: {
        name: "",
        input: "",
        start: "",
        end: "",
        qudao: ""
      },
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20,
      centerDialogVisible: false
    };
  },
  created(){
    this.getData(this.page,this.Pagesize)
  },
  methods: {
    getData( page, Pagesize ){
      this.axios.get('fina/Allpayment_record',{
        params:{
          companyId: "3",
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.PaymentRecord
      })
    },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    Reset(){

    },
    Search(){

    },
    jie(orderNumber){
      this.centerDialogVisible = true
      this.axios.get('fina/PaymentOrder',{
        params:{
          companyId: "3",
          orderNumber
        }
      }).then(res=>{
        this.borrow = res.data.Orderdetails
      })
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
// .explain_text {
//   margin-top: 20px;
//   text-align: center;
//   font-size: 20px;
//   color: #333;
// }
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
.blue{
  color: blue;
  cursor: pointer;
}
.customWidth{
  text-align: center;
  width: 30%;
}
.ul li{
  margin-bottom: 20px;
}
</style>
