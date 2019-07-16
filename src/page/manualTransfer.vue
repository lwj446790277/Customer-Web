<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是手动调账</p> -->
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="新增线上调账" name="first">
				<div class="main">
					<el-form :model="form" :inline="true" class="demo-form-inline">
						<!-- <el-form-item>
							<el-select v-model="form.time" placeholder="订单编号" style="width:150px">
								<el-option label="订单编号" value="订单编号"></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item>
							<el-input placeholder="订单编号" v-model="form.id"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="Search">搜索</el-button>
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
							<th>还款渠道</th>
							<td>
								<el-select v-model="qudao" placeholder="还款渠道" class="inpu">
									<el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.repaymentSource" :value="item.id"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th>输入减免金额</th>
							<td>
								<el-input class="inpu" v-model="amountmoney" @blur="blur"></el-input>
							</td>
						</tr>
						<tr>
							<th>减免后应还总金额</th>
							<td class="red">{{totalMoney}}</td>
						</tr>
						<tr>
							<th>还款备注</th>
							<td>
								<el-input class="inpu" v-model="remarks"></el-input>
							</td>
						</tr>
						<tr>
							<th>减免后最迟应还时间</th>
							<td>
								<!-- <el-input class="inpu" v-model="accounttime"></el-input> -->
								<el-date-picker class="inpu" v-model="accounttime" type="date" placeholder="选择日期"></el-date-picker>
							</td>
						</tr>
						<!-- <tr>
							<th>减免后应还延期天数</th>
							<td>
								<el-input class="inpu" v-model="beoverdue"></el-input>
							</td>
						</tr> -->
					</table>
					<el-button type="primary" class="save" @click="save">添加并保存</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="线上期限内订单" name="second">
				<div class="main">
					<el-form :model="formOne" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="formOne.type" placeholder="订单编号" style="width:150px">
								<el-option label="订单编号" value="订单编号"></el-option>
								<el-option label="姓名" value="姓名"></el-option>
								<el-option label="手机号" value="手机号"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-input placeholder="订单编号/姓名/手机号" v-model="formOne.id"></el-input>
						</el-form-item>
						<el-form-item>
							<el-select v-model="formOne.time" placeholder="订单时间" style="width:150px">
								<el-option label="订单时间" value="订单时间"></el-option>
								<el-option label="调账时间" value="调账时间"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-col :span="11">
								<el-date-picker type="date" placeholder="起始时间" v-model="formOne.start"></el-date-picker>
							</el-col>
						</el-form-item>
							<el-form-item class="single">
							<el-col :span="11">
								<el-date-picker type="date" placeholder="结束时间" v-model="formOne.end"></el-date-picker>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-select v-model="formOne.qudao" placeholder="选择还款渠道" style="width:150px">
								<el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.repaymentSource" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="warning" @click="Reset">重置</el-button>
							<el-button type="primary" @click="Search">搜索</el-button>
						</el-form-item>
					</el-form>
					<!-- <div class="statistics">
						<ul>
							<li>累计调账总笔数</li>
							<li class="num">10</li>
							<li>累计调账总减免金额</li>
							<li class="num">10</li>
							<li>累计延期内未还金额</li>
							<li class="num">10</li>
						</ul>
					</div> -->
					<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
						<el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
						<el-table-column prop="name" label="姓名" align="center"></el-table-column>
						<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
						<el-table-column prop="amou_time" label="调账时间" align="center"></el-table-column>
						<el-table-column prop="repaymentSource" label="还款渠道" align="center"></el-table-column>
						<el-table-column prop="amountmoney" label="调账减免金额" align="center"></el-table-column>
						<el-table-column prop="totalamount" label="减免后应还总金额" align="center"></el-table-column>
						<el-table-column prop="remarks" label="还款备注" align="center"></el-table-column>
						<el-table-column prop="accounttime" label="减免后应还时间" align="center"></el-table-column>
						<el-table-column prop="beoverdue" label="减免后应还延期天数" align="center"></el-table-column>
						<!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
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
			<el-tab-pane label="线上已还清订单" name="third">
				<div class="main">
					<el-form :model="formTwo" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="formTwo.type" placeholder="订单编号" style="width:150px">
								<el-option label="订单编号" value="订单编号"></el-option>
								<el-option label="姓名" value="姓名"></el-option>
								<el-option label="手机号" value="手机号"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-input placeholder="订单编号/姓名/手机号" v-model="formTwo.id"></el-input>
						</el-form-item>
						<el-form-item>
							<el-select v-model="formTwo.time" placeholder="订单时间" style="width:150px">
								<el-option label="订单时间" value="订单时间"></el-option>
								<el-option label="调账时间" value="调账时间"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-col :span="11">
								<el-date-picker type="date" placeholder="起始时间" v-model="formTwo.start"></el-date-picker>
							</el-col>
						</el-form-item>
							<el-form-item class="single">
							<el-col :span="11">
								<el-date-picker type="date" placeholder="结束时间" v-model="formTwo.end"></el-date-picker>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-button type="warning" @click="Reset">重置</el-button>
							<el-button type="primary" @click="Search">搜索</el-button>
						</el-form-item>
					</el-form>
					<!-- <div class="statistic">
						<ul>
							<li>累计实还总笔数</li>
							<li class="num">10</li>
							<li>累计减免后实还总金额</li>
							<li class="num">10</li>
						</ul>
					</div> -->
					<el-table border :data="tableOne" tooltip-effect="dark" style="width: 100%;line-height: 60px">
						<el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
						<el-table-column prop="name" label="姓名" align="center"></el-table-column>
						<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
						<el-table-column prop="amou_time" label="调账时间" align="center"></el-table-column>
						<el-table-column prop="repaymentSource" label="还款渠道" align="center"></el-table-column>
						<el-table-column prop="address" label="还款流水号" align="center"></el-table-column>
						<el-table-column prop="amountmoney" label="调账减免金额" align="center"></el-table-column>
						<el-table-column prop="totalamount" label="减免后应还总金额" align="center"></el-table-column>
						<el-table-column prop="remarks" label="还款备注" align="center"></el-table-column>
						<el-table-column prop="accounttime" label="减免后应还时间" align="center"></el-table-column>
						<!-- <el-table-column prop="address" label="减免后应还延期天数" align="center"></el-table-column> -->
						<el-table-column prop="address" label="减免后实还时间" align="center"></el-table-column>
						<el-table-column prop="address" label="减免后实还金额" align="center"></el-table-column>
						<!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
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
			<el-tab-pane label="线上逾期未还订单" name="fourth">
				<div class="main">
					<el-form :model="formThree" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="formThree.type" placeholder="订单编号" style="width:150px">
								<el-option label="订单编号" value="订单编号"></el-option>
								<el-option label="姓名" value="姓名"></el-option>
								<el-option label="手机号" value="手机号"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-input placeholder="订单编号/姓名/手机号" v-model="formThree.id"></el-input>
						</el-form-item>
						<el-form-item>
							<el-select v-model="formThree.time" placeholder="订单时间" style="width:150px">
								<el-option label="订单时间" value="订单时间"></el-option>
								<el-option label="调账时间" value="调账时间"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-col :span="11">
								<el-date-picker type="date" placeholder="起始时间" v-model="formThree.start"></el-date-picker>
							</el-col>
						</el-form-item>
							<el-form-item class="single">
							<el-col :span="11">
								<el-date-picker type="date" placeholder="结束时间" v-model="formThree.end"></el-date-picker>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-button type="warning" @click="Reset">重置</el-button>
							<el-button type="primary" @click="Search">搜索</el-button>
						</el-form-item>
					</el-form>
					<!-- <div class="statistic">
						<ul>
							<li>累计逾期未还总笔数</li>
							<li class="num">10</li>
							<li>累计逾期未还金额</li>
							<li class="num">10</li>
						</ul>
					</div> -->
					<el-table border :data="tableTwo" tooltip-effect="dark" style="width: 100%;line-height: 60px">
						<el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
						<el-table-column prop="name" label="姓名" align="center"></el-table-column>
						<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
						<el-table-column prop="amou_time" label="调账时间" align="center"></el-table-column>
						<el-table-column prop="repaymentSource" label="还款渠道" align="center"></el-table-column>
						<el-table-column prop="amountmoney" label="调账减免金额" align="center"></el-table-column>
						<el-table-column prop="totalamount" label="减免后应还总金额" align="center"></el-table-column>
						<el-table-column prop="remarks" label="还款备注" align="center"></el-table-column>
						<el-table-column prop="accounttime" label="减免后应还时间" align="center"></el-table-column>
						<!-- <el-table-column prop="beoverdue" label="减免后应还延期天数" align="center"></el-table-column> -->
						<el-table-column prop="overdueNumberOfDays" label="逾期天数" align="center"></el-table-column>
						<!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
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
				tableOne: [],
				tableTwo: [],
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20,
				activeName: "first",
				form: {
					time: "",
					id: ""
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
				totalMoney: "系统自动算出",
				Thirdparty_interface: [],
				qudao: "",
				formOne: {
					type: "",
					id: "",
					time: "",
					start: "",
					end: "",
					qudao: ""
				},
				formTwo: {
					type: "",
					id: "",
					time: "",
					start: "",
					end: ""
				},
				formThree: {
					type: "",
					id: "",
					time: "",
					start: "",
					end: ""
				},
				amountmoney: "",
				remarks: "",
				accounttime: "",
				beoverdue: "",
				page: 1,
				Pagesize: 10,
				totalPageCount: 0,
				totalCount: 20,
			}
		},
		created(){
			this.get()
		},
		methods:{
			get(){
				this.axios.get('fina/ThirdpatyAll',{
					params:{
						compayId: window.localStorage.getItem("companyid")
					}
				}).then(res=>{
					this.Thirdparty_interface = res.data.Thirdparty_interface
				})
			},
			getData( page, Pagesize ){
				this.axios.get('fina/SelectOrderAccount',{
					params:{
					companyId: window.localStorage.getItem("companyid"),
					// page,
					// Pagesize
					}
				}).then(res=>{
					this.tableData = res.data.Accountadjustment
				})
			},
			getOne( page, Pagesize ){
				this.axios.get('fina/SelectNoMoney',{
					params:{
					companyId: window.localStorage.getItem("companyid"),
					// page,
					// Pagesize
					}
				}).then(res=>{
					this.tableOne = res.data.Accountadjustment
				})
			},
			getTwo( page, Pagesize ){
				this.axios.get('fina/SelectOkMoney',{
					params:{
					companyId: window.localStorage.getItem("companyid"),
					// page,
					// Pagesize
					}
				}).then(res=>{
					this.tableTwo = res.data.Accountadjustment
				})
			},
			handleClick(tab, event) {
				if(this.activeName == "second"){
					this.getData(this.page,this.Pagesize)
				}else{
					if(this.activeName == "third") this.getOne(this.page,this.Pagesize);
					if(this.activeName == "fourth") this.getTwo(this.page,this.Pagesize);
				}
			},
			sizeChange() {
				//   this.getData(this.page, this.pageSize);
			},
			currentChange() {
				//   this.getData(this.page, this.pageSize);
			},
			Search(){
				this.axios.get('fina/OrderAcount',{
					params:{
						orderNumber:this.form.id,
						companyId: window.localStorage.getItem("companyid")
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
			Reset(){
				this.formOne = {
					type: "",
					id: "",
					time: "",
					start: "",
					end: "",
					qudao: ""
				}
			},
			save(){
				this.axios.get('fina/AddAcount',{
					params:{
						orderId: this.orderId,
						repaymentSource: this.qudao,
						totalamount: this.totalamount,
						amountmoney: this.amountmoney,
						remarks: this.remarks,
						accounttime: this.accounttime,
						beoverdue: this.beoverdue
					}
				}).then(res=>{
					if(res.data.code==200){
						this.$confirm(res.data.desc, '提示', {
                            type: 'warning',
                            center: true
                    	})
					}
				})
			},
			blur(){
				this.totalMoney = this.realityBorrowMoney - this.amountmoney
			}
		},
		computed:{
			
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
	td{
		text-align: center;
	}
	.inpu{
		width: 70%;
		margin-top: -10px;
		margin-bottom: -10px;
	}
	.save{
		margin-top: 20px;
		float: right;
	}
	.statistics{
		width: 100%
	}
	.statistics ul{
		width: 100%;
	}
	.statistics ul li{
		width: 16.59%;
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
	.statistic{
		width: 100%;
	}
	.statistic ul li{
		width: 24.92%;
		line-height: 60px;
		margin-bottom: -1px;
		float: left;
		text-align: center;
		border: 1px solid #dfe6ec;
	}
	.statistic ul li.num{
		margin-left: -1px;
		margin-right: -1px;
		color: red;
	}
	.block {
		padding-top: 20px;
		text-align: center;
	}
	.red{
		color: red;
	}
</style>
