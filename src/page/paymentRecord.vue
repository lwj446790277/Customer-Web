<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <!-- <p class="explain_text">这里是支付记录</p> -->
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.name" placeholder="订单编号" style="width:150px">
            <!-- <el-option label="还款流水号" value="还款流水号"></el-option> -->
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
          <el-select v-model="form.qudao" placeholder="放款渠道" style="width:150px" @change="change">
            <el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.repaymentSource" :value="item.id"></el-option>
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
        customClass="custom"
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
            <span>{{phone}}</span>
          </li>
          <li>
            <span>注册时间:</span>
            <span>{{register}}</span>
          </li>
          <li>
            <span>订单时间:</span>
            <span>{{order}}</span>
          </li>
          <li>
            <span>引流渠道:</span>
            <span>{{drainage}}</span>
          </li>
          <!-- <li>
            <span>机审时间:</span>
            <span>{{audit}}</span>
          </li> -->
          <li>
            <span>风控模型/分数:</span>
            <span>{{risk}}/{{grade}}</span>
          </li>
          <!-- <li>
            <span>人审时间:</span>
            <span>{{trial}}</span>
          </li> -->
          <!-- <li>
            <span>审核人员:</span>
            <span>{{examine}}</span>
          </li> -->
          <li>
            <span>贷款方式:</span>
            <span>{{loan}}</span>
          </li>
          <li>
            <span>还款期数:</span>
            <span>{{repayment}}</span>
          </li>
          <li>
            <span>实借/放款:</span>
            <span>{{real}}/{{discharge}}</span>
          </li>
          <li>
            <span>借款时间:</span>
            <span>{{borr}}</span>
          </li>
          <li>
            <span>总利息/总还款:</span>
            <span>{{interest}}/{{still}}</span>
          </li>
          <li>
            <span>延期次数/延期金额:</span>
            <span>{{num}}/{{money}}</span>
          </li>
          <li>
            <span>每次延期天数:</span>
            <span>{{date}}</span>
          </li>
          <li>
            <span>延期前还款时间:</span>
            <span>{{betime}}</span>
          </li>
          <li>
            <span>延期后还款时间:</span>
            <span>{{aftime}}</span>
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
      borrow: [],
      Thirdparty_interface: [],
      thirdparty_id: "",
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
      centerDialogVisible: false,
      id: "",
      name: "",
      phone: "",
      register: "",
      order:"",
      drainage: "",
      audit: "",
      risk: "",
      grade: "",
      trial: "",
      examine: "",
      loan: "",   
      repayment: "",
      real: "",
      discharge: "",
      borr: "",
      interest: "",
      still: "",
      num: "",
      money: "",
      date: "",
      betime: "",
      aftime: ""
    };
  },
  created(){
    this.getData(this.page,this.Pagesize)
    this.get()
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
    get(){
				this.axios.get('fina/ThirdpatyAll',{
					params:{
						compayId: "3"
					}
				}).then(res=>{
					this.Thirdparty_interface = res.data.Thirdparty_interface
				})
			},
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    change(id){
      this.thirdparty_id = id
    },
    Reset(){
      this.form = {
        name: "",
        input: "",
        start: "",
        end: "",
        qudao: ""
      }
    },
    Search(){
      if(this.form.name == "姓名"){
					this.axios.get('fina/Allpayment_record',{
            params:{
              companyId: "3",
              name: this.form.input,
              thirdparty_id: this.thirdparty_id,
              start_time: this.form.start,
              end_time: this.form.end
            }
					}).then(res=>{
					  this.tableData = res.data.PaymentRecord
					})
			}else{
					if(this.form.name == "手机号"){
            this.axios.get('fina/Allpayment_record',{
              params:{
                companyId: "3",
                ph: this.form.input,
                thirdparty_id: this.thirdparty_id,
                start_time: this.form.start,
						    end_time: this.form.end
              }
            }).then(res=>{
              this.tableData = res.data.PaymentRecord
            })
					}else{
            if(this.form.name == "订单编号"){
              this.axios.get('fina/Allpayment_record',{
                params:{
                  companyId: "3",
                  orderNumber: this.form.input,
                  thirdparty_id: this.thirdparty_id,
                  start_time: this.form.start,
                  end_time: this.form.end
                }
              }).then(res=>{
                this.tableData = res.data.PaymentRecord
              })
            }else{
              this.axios.get('fina/Allpayment_record',{
                params:{
                  companyId: "3",
                  pipelinenumber: this.form.input,
                  thirdparty_id: this.thirdparty_id,
                  start_time: this.form.start,
                  end_time: this.form.end
                }
              }).then(res=>{
                this.tableData = res.data.PaymentRecord
              })
            }
					}
				}
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
        this.id = res.data.Orderdetails.orderNumber                          //订单编号
        this.name = res.data.Orderdetails.name                               //姓名
        this.phone = res.data.Orderdetails.phone                             //手机号
        this.register = res.data.Orderdetails.registeTime                    //注册时间
        this.order = res.data.Orderdetails.orderCreateTime                   //订单时间
        this.drainage = res.data.Orderdetails.drainageOfPlatformName         //引流渠道
        // this.audit = res.data.Orderdetails.phone                          //机审时间
        this.risk = res.data.Orderdetails.riskcontrolname                    //风控模型
        this.grade = res.data.Orderdetails.riskmanagementFraction            //分数
        // this.trial = res.data.Orderdetails.phone                          //人审时间
        // this.examine = res.data.Orderdetails.phone                        //审核人员
        this.loan = res.data.Orderdetails.borrowMoneyWay                     //贷款方式
        this.repayment = res.data.Orderdetails.borrowTimeLimit               //还款期数
        this.real = res.data.Orderdetails.realityBorrowMoney                 //实借
        this.discharge = res.data.Orderdetails.makeLoans                     //放款
        this.borr = res.data.Orderdetails.orderCreateTime                    //借款时间
        this.interest = res.data.Orderdetails.interestSum                    //总利息
        this.still = res.data.Orderdetails.Order_money                       //总还款
        this.num = res.data.Orderdetails.defeNum                             //延期次数   
        this.money = res.data.Orderdetails.interestOnArrears                 //延期金额
        this.date = res.data.Orderdetails.onceDeferredDay                    //每次延期天数
        this.betime = res.data.Orderdetails.deferBeforeReturntime            //延期前还款时间
        this.aftime = res.data.Orderdetails.deferAfterReturntime             //延期后还款时间
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
// .el-table {
//   overflow: auto !important;
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
.custom{
  text-align: center;
  width: 30%;
}
.ul{
  width: 100%;
}
.ul li{
  width: 100%;
  margin-bottom: 20px;
}
.ul li span{
  width: 50%;
}
.ul li span:first-child{
  margin-right: 5px;
}
.ul li span:last-child{
  margin-left: 5px;
}
</style>
