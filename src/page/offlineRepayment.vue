<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是线下还款</p> -->
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="新增线下调账" name="first">
				<div class="main">
					<table border="1" cellpadding="30" cellspacing="0" class="tabe">
						<tr>
							<th>项目名</th>  
							<td>
								<el-input v-model="program"></el-input>
							</td>
						</tr>
						<tr>
							<th>收入还是支出</th>
							<td>
								<el-select v-model="receive" placeholder="收入" style="width:100%">
									<el-option label="收入" value="收入"></el-option>
									<el-option label="支出" value="支出"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th>还款渠道</th>
							<td>
								<el-select v-model="qudao" placeholder="选择还款渠道" style="width:100%">
									<el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.repaymentSource" :value="item.id"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th>还款流水号</th>
							<td>
								<el-input v-model="huan"></el-input>
							</td>
						</tr>
						<tr>
							<th>输入金额</th>
							<td>
								<el-input v-model="money"></el-input>
							</td>
						</tr>
						<tr>
							<th>备注</th>
							<td>
								<el-input v-model="remarks"></el-input>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="add" @click="add">添加并保存</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="线下调账记录表" name="second">
				<div class="main">
					<el-form :model="form" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="form.type" placeholder="放款流水号" style="width:150px">
								<el-option label="放款流水号" value="放款流水号"></el-option>
								<el-option label="还款流水号" value="还款流水号"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-input placeholder="单行输入" v-model="form.id"></el-input>
						</el-form-item>
						<!-- <el-form-item>
							<el-select v-model="form.time" placeholder="操作日期" style="width:150px">
								<el-option label="订单时间" value="订单时间"></el-option>
								<el-option label="延借时间" value="延借时间"></el-option>
								<el-option label="延期后应还" value="延期后应还"></el-option>
							</el-select>
						</el-form-item> -->
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
							<el-button type="warning" @click="Reset">重置</el-button>
							<el-button type="primary" @click="Search">搜索</el-button>
						</el-form-item>
					</el-form>
					<!-- <div class="statistics">
						<ul>
							<li>线下调账总收入</li>
							<li class="num">10</li>
							<li>线下调账总支出</li>
							<li class="num">10</li>
						</ul>
					</div> -->
					<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
						<el-table-column prop="underthe_time" label="日期" align="center"></el-table-column>
						<el-table-column prop="account" label="财务操作人" align="center"></el-table-column>
						<el-table-column prop="project_name" label="项目名" align="center"></el-table-column>
						<el-table-column prop="repayment" label="放款/还款渠道" align="center"></el-table-column>
						<el-table-column prop="repaymentnumber" label="放款/还款流水号" align="center"></el-table-column>
						<el-table-column prop="income" label="收入" align="center"></el-table-column>
						<el-table-column prop="expenditure" label="支出" align="center"></el-table-column>
						<el-table-column prop="remarks" label="备注" align="center"></el-table-column>
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
			</el-tab-pane>
			<el-tab-pane label="新增线下减免调账" name="third">
				<div class="main">
					<el-form :model="formList" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-input placeholder="订单编号" v-model="formList.id"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="Searchs">搜索</el-button>
						</el-form-item>
					</el-form>
					<table border="1" cellpadding="20" cellspacing="0" class="tab">
						<tr>
							<th>订单编号</th>  
							<td>{{orderNumber}}</td>
						</tr>
						<tr>
							<th>姓名</th>
							<td>{{name}}</td>
						</tr>
						<tr>
							<th>手机号</th>
							<td>{{phone}}</td>
						</tr>
						<tr>
							<th>贷款方式</th>
							<td>{{borrowMoneyWay}}</td>
						</tr> 
						<tr>
							<th>还款期数</th>
							<td>{{borrowTimeLimit}}</td>
						</tr>
						<tr>
							<th>实借时间</th>
							<td>{{orderCreateTime}}</td>
						</tr>
						<tr>
							<th>借款总金额/放款总金额</th>
							<td class="red">{{realityBorrowMoney}}/{{makeLoans}}</td>
						</tr>
						<tr>
							<th>延期后应还时间</th>
							<td>{{deferAfterReturntime}}</td>
						</tr>
						<tr>
							<th>逾期天数</th>
							<td>{{overdueNumberOfDays}}</td>
						</tr>
						<tr>
							<th>含逾总利息/扣款后应还总金额</th>
							<td class="red">{{interestPenaltySum}}/{{realityBorrowMoney}}</td>
						</tr>
						<tr>
							<th>放款流水号</th>
							<td>{{pipelinenumber}}</td>
						</tr>
					</table>
					<table border="1" cellpadding="20" cellspacing="0" class="tabs">
						<tr>
							<th>线下减免调账说明</th>
							<td>
								<p>1.线上减免调账，线下手工记账，线下减免调账，三者是有区别的</p>
								<p>2.线上减免调账：是用户承诺但未还的减免调账，订单会有三个状态（期限内，已还清，逾期）</p>
								<p>3.线下手工记账：可以记账收入，也可以记账支出，记账的包含的范围更宽泛</p>
								<p>4.线下减免调账：用户已经从其他方式还款给我们的工作人员，还款输入在“线下用户已还金额”，点击“保存”后用户APP端的应还总金额将直接结清，请确保已经收到款，否则人财两空</p>
							</td>
						</tr>
						<tr>
							<th>线下用户已还金额</th>
							<td>
								<el-input class="inpu" v-model="amountmoney"></el-input>
							</td>
						</tr>
						<tr>
							<th>还款备注</th>
							<td>
								<el-input class="inpu" v-model="remarks"></el-input>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="save" @click="save">添加并保存</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="线下减免调账记录" name="forth">
				<div class="main">
					<el-form :model="formForth" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="formForth.type" placeholder="用户订单" style="width:150px">
								<el-option label="用户订单" value="用户订单"></el-option>
								<el-option label="用户姓名" value="用户姓名"></el-option>
								<el-option label="手机号" value="手机号"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-input placeholder="单行输入" v-model="formForth.id"></el-input>
						</el-form-item>
						<!-- <el-form-item>
							<el-select v-model="form.time" placeholder="操作日期" style="width:150px">
								<el-option label="订单时间" value="订单时间"></el-option>
								<el-option label="延借时间" value="延借时间"></el-option>
								<el-option label="延期后应还" value="延期后应还"></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item>
							<el-col :span="11">
								<el-date-picker type="date" placeholder="起始时间" v-model="formForth.start"></el-date-picker>
							</el-col>
						</el-form-item>
							<el-form-item class="single">
							<el-col :span="11">
								<el-date-picker type="date" placeholder="结束时间" v-model="formForth.end"></el-date-picker>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-button type="warning" @click="ResetForth">重置</el-button>
							<el-button type="primary" @click="SearchForth">搜索</el-button>
						</el-form-item>
					</el-form>
					<!-- <div class="statistics">
						<ul>
							<li>线下调账总收入</li>
							<li class="num">10</li>
							<li>线下调账总支出</li>
							<li class="num">10</li>
						</ul>
					</div> -->
					<el-table border :data="tableDataForth" tooltip-effect="dark" style="width: 100%;line-height: 60px">
						<el-table-column prop="underthe_time" label="操作时间" align="center"></el-table-column>
						<el-table-column prop="account" label="操作人" align="center"></el-table-column>
						<el-table-column prop="orderNumber" label="用户订单" align="center"></el-table-column>
						<el-table-column prop="name" label="用户姓名" align="center"></el-table-column>
						<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
						<el-table-column prop="makeLoans" label="减免前应还金额" align="center"></el-table-column>
						<el-table-column prop="income" label="线下用户已还金额" align="center"></el-table-column>
						<el-table-column prop="remarks" label="还款备注" align="center"></el-table-column>
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
			</el-tab-pane>
		</el-tabs>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
		},
		data(){
			return{
				tableData: [],
				tableDataForth: [],
				Thirdparty_interface: [],
				activeName: "first",
				program: "",
				receive: "",
				qudao: "",
				huan: "",
				money: "",
				remarks: "",
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20,
				form: {
					type: "",
					id: "",
					start: "",
					end: ""
				},
				formList: {
					id: ""
				},
				formForth: {
					type: "",
					id: "",
					start: "",
					end: ""
				},
				orderId: "",
				orderNumber: "",
				name: "",
				phone: "",
				borrowMoneyWay: "",
				borrowTimeLimit: "",
				orderCreateTime: "",
				realityBorrowMoney: "",
				makeLoans: "",
				deferAfterReturntime: "",
				overdueNumberOfDays: "",
				interestPenaltySum: "",
				realityBorrowMoney: "",
				pipelinenumber: "",
				amountmoney: "",
				remarks: ""
			}
		},
		created(){
			this.get()
		},
		methods:{
			sizeChange() {
			//   this.getData(this.page, this.pageSize);
			},
			currentChange() {
			//   this.getData(this.page, this.pageSize);
			},
			handleClick(tab, event) {
				if(this.activeName == "second"){
					this.getData(this.page,this.Pagesize)
				}else{
					if(this.activeName == "forth"){
						this.getForth(this.page,this.Pagesize)
					}
				}
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
			getData( page, Pagesize ){
				this.axios.get('fina/Orderoffline',{
					params:{
						companyId: "3",
						// page,
						// Pagesize
					}
				}).then(res=>{
					this.tableData = res.data.Undertheline
				})
			},
			getForth( page, Pagesize ){
				this.axios.get('fina/AllXiaOrder',{
					params:{
						companyId: "3",
						// page,
						// Pagesize
					}
				}).then(res=>{
					this.tableDataForth = res.data.Undertheline
				})
			},
			add(){
				if(this.receive=="收入"){
					this.axios.get('fina/AddUndert',{
						params:{
							finance_id: "3",
							project_name: this.program,
							repayment: this.qudao,
							income: this.money,
							repaymentnumber: this.huan,
							remarks: this.remarks
						}
					}).then(res=>{
						this.$confirm(res.data.desc, '提示', {
                            type: 'warning',
                            center: true
                    	})
					})
				}else{
					this.axios.get('fina/AddUndert',{
						params:{
							finance_id: "3",
							project_name: this.program,
							repayment: this.qudao,
							expenditure: this.money,
							repaymentnumber: this.huan,
							remarks: this.remarks
						}
					}).then(res=>{
						this.$confirm(res.data.desc, '提示', {
                            type: 'warning',
                            center: true
                    	})
					})
				}
			},
			Reset(){
				this.form = {
					type: "",
					id: "", 
					start: "",
					end: ""
				}
			},
			ResetForth(){
				this.formForth = {
					type: "",
					id: "",
					start: "",
					end: ""
				}
			},
			SearchForth(){
				if(this.formForth.type=="手机号"){
					this.axios.get('fina/AllXiaOrder',{
						params:{
							companyId: "3",
							phone: this.formForth.id,
							start_time: this.formForth.start,
							end_time: this.formForth.end
						}
					}).then(res=>{
						this.tableDataForth = res.data.Undertheline
					})
				}else{
					if(this.formForth.type=="用户姓名"){
						this.axios.get('fina/AllXiaOrder',{
							params:{
								companyId: "3",
								name: this.formForth.id,
								start_time: this.formForth.start,
								end_time: this.formForth.end
							}
						}).then(res=>{
							this.tableDataForth = res.data.Undertheline
						})
					}else{
						this.axios.get('fina/AllXiaOrder',{
							params:{
								companyId: "3",
								orderNumber: this.formForth.id,
								start_time: this.formForth.start,
								end_time: this.formForth.end
							}
						}).then(res=>{
							this.tableDataForth = res.data.Undertheline
						})
					}
				}
				
			},
			Search(){    
				this.axios.get('fina/Orderoffline',{
					params:{
						companyId: "3",
						repaymentnumber: this.form.id,
						start_time: this.form.start,
						end_time: this.form.end
					}
				}).then(res=>{
					this.tableData = res.data.PaymentRecord
				})
			},
			Searchs(){
				this.axios.get('fina/OrderAcount',{
					params:{
						orderNumber:this.formList.id,
						companyId: "3"
					}
				}).then(res=>{
					this.orderId = res.data.Orderdetails.orderId
					this.orderNumber = res.data.Orderdetails.orderNumber
					this.name = res.data.Orderdetails.name
					this.phone = res.data.Orderdetails.phone
					this.borrowMoneyWay = res.data.Orderdetails.borrowMoneyWay
					this.borrowTimeLimit = res.data.Orderdetails.borrowTimeLimit
					this.orderCreateTime = res.data.Orderdetails.orderCreateTime
					this.realityBorrowMoney = res.data.Orderdetails.realityBorrowMoney
					this.makeLoans = res.data.Orderdetails.makeLoans
					this.deferAfterReturntime = res.data.Orderdetails.deferAfterReturntime
					this.overdueNumberOfDays = res.data.Orderdetails.overdueNumberOfDays
					this.interestPenaltySum = res.data.Orderdetails.interestPenaltySum
					this.realityBorrowMoney = res.data.Orderdetails.realityBorrowMoney
					this.pipelinenumber = res.data.Orderdetails.pipelinenumber
				})
			},
			save(){
				this.axios.get('fina/Addoff',{
					params:{
						orderId: this.orderId,
						offusermoney: this.amountmoney,
						remarks: this.remarks,
						fina_id: "1"
					}
				}).then(res=>{
					if(res.data.code==200){
						this.$confirm(res.data.desc, '提示', {
                            type: 'warning',
                            center: true
                    	})
					}
				})
			}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
	.main{
		padding: 20px;
	}
	.single {
		margin-left: -15px;
	}
	.tabe{
		margin: 20px auto;
		width: 35%;
		border-color: #dfe6ec;
	}
	.add{
		margin-left: 60%;
	}
	.statistics{
		width: 100%
	}
	.statistics ul{
		width: 100%;
	}
	.statistics ul li{
		width: 24.92%;
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
	.block {
		padding-top: 20px;
		text-align: center;
	}
	.tab{
		width: 50%;
		border-color: #dfe6ec;
		float: left;
		margin-right: -2px;
	}
	.tabs{
		width: 50%;
		border-color: #dfe6ec;
	}
	.tab th{
		width: 50%;
	}
	.tabs th{
		width: 50%;
	}
	td{
		text-align: center;
	}
	.inpu{
		width: 70%;
		margin-top: -10px;
		margin-bottom: -10px;
	}
	.red{
		color: red;
	}
	.save{
		margin-top: 20px;
		float: right;
	}
</style>
