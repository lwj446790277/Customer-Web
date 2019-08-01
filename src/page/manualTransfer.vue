<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是手动调账</p> -->
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="新增线上调账" name="first">
				<div class="back">
					<h2>新增线上调账</h2>
					<div class="mains">
						<el-form :model="form" :inline="true" class="demo-form-inline">
							<el-form-item>
								<el-input placeholder="手机号" v-model="form.phone"></el-input>
							</el-form-item>
                            <el-form-item>
                                <el-input placeholder="身份证号" v-model="form.idcard"></el-input>
                            </el-form-item>
							<el-form-item>
								<el-button type="primary" @click="Search">搜索</el-button>
							</el-form-item>
						</el-form>
						<table cellpadding="20" cellspacing="0" class="tab">
							<tr>
								<th>订单编号</th>  
								<td>
									<div>{{orderNumber}}</div>
								</td>
							</tr>
							<tr>
								<th>姓名</th>
								<td>
									<div>{{name}}</div>
								</td>
							</tr>
							<tr>
								<th>手机号</th>
								<td>
									<div>{{phone}}</div>
								</td>
							</tr>
                            <tr>
                                <th>身份证号</th>
                                <td>
                                    <div>{{idcard}}</div>
                                </td>
                            </tr>
							<tr>
								<th>贷款方式</th>
								<td>
									<div>{{borrowMoneyWay}}</div>
								</td>
							</tr> 
							<tr>
								<th>还款期数</th>
								<td>
									<div>{{borrowTimeLimit}}</div>
								</td>
							</tr>
							<tr>
								<th>实借时间</th>
								<td>
									<div>{{orderCreateTime}}</div>
								</td>
							</tr>
							<tr>
								<th>借款总金额/放款总金额</th>
								<td>
									<div class="red">{{realityBorrowMoney}}/{{makeLoans}}</div>
								</td>
							</tr>
							<tr>
								<th>延期后应还时间</th>
								<td>
									<div>{{deferAfterReturntime}}</div>
								</td>
							</tr>
							<tr>
								<th>逾期天数</th>
								<td>
									<div>{{overdueNumberOfDays}}</div>
								</td>
							</tr>
							<tr>
								<th>含逾总利息/扣款后应还总金额</th>
								<td>
									<div class="red">{{interestPenaltySum}}/{{realityBorrowMoney}}</div>
								</td>
							</tr>
							<tr>
								<th>放款流水号</th>
								<td>
									<div>{{pipelinenumber}}</div>
								</td>
							</tr>
						</table>
						<table cellpadding="20" cellspacing="0" class="tabs">
							<tr>
								<th>还款渠道</th>
								<td>
									<el-select v-model="qudao" placeholder="还款渠道" class="inpu">
										<el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.name" :value="item.id"></el-option>
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
								<td class="red">
									<div>{{totalMoney}}</div>
								</td>
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
									<el-date-picker style="width:70%" v-model="accounttime" type="date" placeholder="选择日期"></el-date-picker>
								</td>
							</tr>
							<!-- <tr>
								<th>减免后应还延期天数</th>
								<td>
									<el-input class="inpu" v-model="beoverdue"></el-input>
								</td>
							</tr> -->
						</table>
						<el-popover
							placement="bottom"
							width="300"
							v-model="visible">
							<p>保存后，用户APP端的应还总金额将改变</p>
							<div style="text-align: right; margin: 0">
								<el-button @click="visible = false" class="left">返回</el-button>
								<el-button type="success" @click="save">是的</el-button>
							</div>
							<el-button type="primary" slot="reference" class="save">添加并保存</el-button>
						</el-popover>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="线上期限内订单" name="second">
				<div class="back">
					<h2>线上期限内订单</h2>
					<div class="main">
						<el-form :model="formOne" :inline="true" class="demo-form-inline">
							<el-form-item>
								<el-input placeholder="订单编号" v-model="formOne.id"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input placeholder="姓名" v-model="formOne.name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input placeholder="手机号" v-model="formOne.phone"></el-input>
							</el-form-item>
							<el-form-item>
								<el-col :span="11">
									<el-date-picker type="date" placeholder="实借起始时间" v-model="formOne.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
								</el-col>
							</el-form-item>
								<el-form-item class="single">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="实借结束时间" v-model="formOne.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-col :span="11">
									<el-date-picker type="date" placeholder="调账起始时间" v-model="formOne.accounttimestart_time" value-format="yyyy-MM-dd" @change="accounttimestart_time"></el-date-picker>
								</el-col>
							</el-form-item>
								<el-form-item class="single">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="调账结束时间" v-model="formOne.accounttimeent_time" value-format="yyyy-MM-dd" @change="accounttimeent_time"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-select v-model="formOne.qudao" placeholder="选择还款渠道" style="width:150px">
									<el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.repaymentSource" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
								<el-button type="primary" @click="SearchTwo">搜索</el-button>
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
							<!-- <el-table-column prop="accounttime" label="减免后应还时间" align="center"></el-table-column> -->
							<el-table-column prop="accounttime" label="减免后最迟应还时间" width="165" align="center"></el-table-column>
							<!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
						</el-table>
						<div class="block">
							<el-pagination
							:current-page.sync="page"
							:page-size.sync="pageSize"
							layout="total, prev, pager, next, jumper"
							:page-count="totalPageCount"
							:total="totalCount"
							@size-change="sizeChange"
							@current-change="currentChange"
							></el-pagination>
						</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="线上已还清订单" name="third">
				<div class="back">
					<h2>线上已还清订单</h2>
					<div class="main">
						<el-form :model="formTwo" :inline="true" class="demo-form-inline">
							<el-form-item>
								<el-input placeholder="订单编号" v-model="formTwo.id"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input placeholder="姓名" v-model="formTwo.name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input placeholder="手机号" v-model="formTwo.phone"></el-input>
							</el-form-item>
							<el-form-item>
								<el-col :span="11">
									<el-date-picker type="date" placeholder="实借起始时间" v-model="formTwo.start" value-format="yyyy-MM-dd" @change="start"></el-date-picker>
								</el-col>
							</el-form-item>
								<el-form-item class="single">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="实借结束时间" v-model="formTwo.end" value-format="yyyy-MM-dd" @change="end"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-col :span="11">
									<el-date-picker type="date" placeholder="调账起始时间" v-model="formTwo.accounttimestart_time" value-format="yyyy-MM-dd" @change="timestart"></el-date-picker>
								</el-col>
							</el-form-item>
								<el-form-item class="single">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="调账结束时间" v-model="formTwo.accounttimeent_time" value-format="yyyy-MM-dd" @change="timeend"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-button type="warning" @click="ResetThree" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
								<el-button type="primary" @click="SearchThree">搜索</el-button>
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
							<el-table-column prop="totalamount" label="减免后应还总金额" width="160" align="center"></el-table-column>
							<el-table-column prop="remarks" label="还款备注" align="center"></el-table-column>
							<el-table-column prop="accounttime" label="减免后最迟应还时间" width="165" align="center"></el-table-column>
							<!-- <el-table-column prop="address" label="减免后应还延期天数" align="center"></el-table-column> -->
							<!-- <el-table-column prop="address" label="减免后实还时间" align="center"></el-table-column>
							<el-table-column prop="address" label="减免后实还金额" align="center"></el-table-column> -->
							<!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
						</el-table>
						<div class="block">
							<el-pagination
							:current-page.sync="pageOne"
							:page-size.sync="PagesizeOne"
							layout="total, prev, pager, next, jumper"
							:page-count="totalPageCountOne"
							:total="totalCountOne"
							@size-change="sizeChange"
							@current-change="currentChange"
							></el-pagination>
						</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="线上逾期未还订单" name="fourth">
				<div class="back">
					<h2>线上逾期未还订单</h2>
					<div class="main">
						<el-form :model="formThree" :inline="true" class="demo-form-inline">
							<el-form-item>
								<el-input placeholder="订单编号" v-model="formThree.id"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input placeholder="姓名" v-model="formThree.name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input placeholder="手机号" v-model="formThree.phone"></el-input>
							</el-form-item>
							<el-form-item>
								<el-col :span="11">
									<el-date-picker type="date" placeholder="实借起始时间" v-model="formThree.start" value-format="yyyy-MM-dd" @change="starts"></el-date-picker>
								</el-col>
							</el-form-item>
								<el-form-item class="single">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="实借结束时间" v-model="formThree.end" value-format="yyyy-MM-dd" @change="ends"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-col :span="11">
									<el-date-picker type="date" placeholder="调账起始时间" v-model="formThree.accounttimestart_time" value-format="yyyy-MM-dd" @change="started"></el-date-picker>
								</el-col>
							</el-form-item>
								<el-form-item class="single">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="调账结束时间" v-model="formThree.accounttimeent_time" value-format="yyyy-MM-dd" @change="ended"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-button type="warning" @click="ResetFour" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
								<el-button type="primary" @click="SearchFour">搜索</el-button>
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
							<el-table-column prop="totalamount" label="减免后应还总金额" width="160" align="center"></el-table-column>
							<el-table-column prop="remarks" label="还款备注" align="center"></el-table-column>
							<el-table-column prop="accounttime" label="减免后最迟应还时间" width="165" align="center"></el-table-column>
							<!-- <el-table-column prop="beoverdue" label="减免后应还延期天数" align="center"></el-table-column> -->
							<el-table-column prop="overdueNumberOfDays" label="逾期天数" align="center"></el-table-column>
							<!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
						</el-table>
						<div class="block">
							<el-pagination
							:current-page.sync="pageTwo"
							:page-size.sync="PagesizeTwo"
							layout="total, prev, pager, next, jumper"
							:page-count="totalPageCountTwo"
							:total="totalCountTwo"
							@size-change="sizeChange"
							@current-change="currentChange"
							></el-pagination>
						</div>
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
				visible: false,
				tableData: [],
				tableOne: [],
				tableTwo: [],
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20,
				activeName: "first",
				form: {
					phone: "",
					idcard: ""
				},
				orderId: "",
				orderNumber: "",
				name: "",
				phone: "",
                idcard: "",
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
					name: "",
					phone: "",
					id: "",
					start: "",
					end: "",
					accounttimestart_time: "",
					accounttimeent_time: ""
				},
				formTwo: {
					name: "",
					phone: "",
					id: "",
					start: "",
					end: "",
					accounttimestart_time: "",
					accounttimeent_time: ""
				},
				formThree: {
					name: "",
					phone: "",
					id: "",
					start: "",
					end: "",
					accounttimestart_time: "",
					accounttimeent_time: ""
				},
				amountmoney: "",
				remarks: "",
				accounttime: "",
				beoverdue: "",
				page: 1,
				Pagesize: 10,
				totalPageCount: 0,
				totalCount: 20,
				pageOne: 1,
				PagesizeOne: 10,
				totalPageCountOne: 0,
				totalCountOne: 20,
				pageTwo: 1,
				PagesizeTwo: 10,
				totalPageCountTwo: 0,
				totalCountTwo: 20,
			}
		},
		created(){
			this.get()
		},
		methods:{
            timeChange(val){
                // console.log(val)
                this.formOne.start = val
            },
            endChange(val){
                this.formOne.end = val
            },
            accounttimestart_time(val){
                // console.log(val)
                this.formOne.accounttimestart_time = val
            },
            accounttimeent_time(val){
                this.formOne.accounttimeent_time = val
            },
            start(val){
                // console.log(val)
                this.formTwo.start = val
            },
            end(val){
                this.formTwo.end = val
            },
            timestart(val){
                // console.log(val)
                this.formTwo.accounttimestart_time = val
            },
            timeend(val){
                this.formTwo.accounttimeent_time = val
            },
            starts(val){
                // console.log(val)
                this.formThree.start = val
            },
            ends(val){
                this.formThree.end = val
            },
            started(val){
                // console.log(val)
                this.formThree.accounttimestart_time = val
            },
            ended(val){
                this.formThree.accounttimeent_time = val
            },
			get(){
				this.axios.get('fina/RepaymentAll',{
					params:{
						compayId: window.localStorage.getItem("companyid")
					}
				}).then(res=>{
					this.Thirdparty_interface = res.data.Repayment_setting
				})
			},
			getData( page, Pagesize ){
				this.axios.get('fina/SelectOrderAccount',{
					params:{
						companyId: window.localStorage.getItem("companyid"),
						page,
						Pagesize
					}
				}).then(res=>{
					this.tableData = res.data.Accountadjustment
					this.page = res.data.Accountadjustment.page
					this.Pagesize = res.data.Accountadjustment.Pagesize
					this.totalCount = res.data.Accountadjustment.length
				})
			},
			getOne( pageOne, PagesizeOne ){
				this.axios.get('fina/SelectNoMoney',{
					params:{
						companyId: window.localStorage.getItem("companyid"),
						page: this.pageOne,
						Pagesize: this.PagesizeOne
					}
				}).then(res=>{
					this.tableOne = res.data.Accountadjustment
					this.pageOne = res.data.Accountadjustment.page
					this.PagesizeOne = res.data.Accountadjustment.Pagesize
					this.totalCountOne = res.data.Accountadjustment.length
				})
			},
			getTwo( pageTwo, PagesizeTwo ){
				this.axios.get('fina/SelectOkMoney',{
					params:{
						companyId: window.localStorage.getItem("companyid"),
						page: this.pageTwo,
						Pagesize: this.PagesizeTwo
					}
				}).then(res=>{
					this.tableTwo = res.data.Accountadjustment
					this.pageTwo = res.data.Accountadjustment.page
					this.PagesizeTwo = res.data.Accountadjustment.Pagesize
					this.totalCountTwo = res.data.Accountadjustment.length
				})
			},
			handleClick(tab, event) {
				if(this.activeName == "second"){
					this.getData(this.page,this.Pagesize)
				}else{
					if(this.activeName == "third") this.getOne(this.pageOne,this.PagesizeOne);
					if(this.activeName == "fourth") this.getTwo(this.pageTwo,this.PagesizeTwo);
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
						phone:this.form.phone,
                        idcard_number:this.form.idcard,
						companyId: window.localStorage.getItem("companyid")
					}
				}).then(res=>{
					this.orderId = res.data.Orderdetails.orderId
					this.orderNumber = res.data.Orderdetails.orderNumber
					this.name = res.data.Orderdetails.name
					this.phone = res.data.Orderdetails.phone
                    this.idcard = res.data.Orderdetails.idcard_number
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
			SearchTwo(){
                if(this.formOne.start!=""){
                    var start = this.formOne.start + " " + "00:00:00"
                }
                if(this.formOne.end!=""){
                    var end = this.formOne.end + " " + "23:59:59"
                }
                if(this.formOne.accounttimestart_time!=""){
                    var accounttimestart_time = this.formOne.accounttimestart_time + " " + "00:00:00"
                }
                if(this.formOne.accounttimeent_time!=""){
                    var accounttimeent_time = this.formOne.accounttimeent_time + " " + "23:59:59"
                }
				this.axios.get('fina/SelectOrderAccount',{
					params:{
						companyId: window.localStorage.getItem("companyid"),
						orderNumber: this.formOne.id,
						phone: this.formOne.phone,
						name: this.formOne.name,
						repaymentSource: this.formOne.qudao,
						start_time: start,
						end_time: end,
						accounttimestart_time: accounttimestart_time,
						accounttimeent_time: accounttimeent_time
					}
				}).then(res=>{
				this.tableData = res.data.Accountadjustment
				})
			},
			SearchThree(){
                if(this.formTwo.start!=""){
                    var start = this.formTwo.start + " " + "00:00:00"
                }
                if(this.formTwo.end!=""){
                    var end = this.formTwo.end + " " + "23:59:59"
                }
                if(this.formTwo.accounttimestart_time!=""){
                    var accounttimestart_time = this.formTwo.accounttimestart_time + " " + "00:00:00"
                }
                if(this.formTwo.accounttimeent_time!=""){
                    var accounttimeent_time = this.formTwo.accounttimeent_time + " " + "23:59:59"
                }
				this.axios.get('fina/SelectNoMoney',{
					params:{
						companyId: window.localStorage.getItem("companyid"),
						orderNumber: this.formTwo.id,
						phone: this.formTwo.phone,
						name: this.formTwo.name,
						start_time: start,
						end_time: end,
						accounttimestart_time: accounttimestart_time,
						accounttimeent_time: accounttimeent_time
					}
				}).then(res=>{
					this.tableOne = res.data.Accountadjustment
				})
			},
			SearchFour(){
                if(this.formThree.start!=""){
                    var start = this.formThree.start + " " + "00:00:00"
                }
                if(this.formThree.end!=""){
                    var end = this.formThree.end + " " + "23:59:59"
                }
                if(this.formThree.accounttimestart_time!=""){
                    var accounttimestart_time = this.formThree.accounttimestart_time + " " + "00:00:00"
                }
                if(this.formThree.accounttimeent_time!=""){
                    var accounttimeent_time = this.formThree.accounttimeent_time + " " + "23:59:59"
                }
				this.axios.get('fina/SelectOkMoney',{
					params:{
						companyId: window.localStorage.getItem("companyid"),
						orderNumber: this.formThree.id,
						phone: this.formThree.phone,
						name: this.formThree.name,
						start_time: start,
						end_time: end,
						accounttimestart_time: accounttimestart_time,
						accounttimeent_time: accounttimeent_time
					}
				}).then(res=>{
					this.tableTwo = res.data.Accountadjustment
				})
			},
			Reset(){
				this.formOne = {
					name: "",
					phone: "",
					id: "",
					start: "",
					end: "",
					accounttimestart_time: "",
					accounttimeent_time: ""
				}
			},
			ResetThree(){
				this.formTwo = {
					type: "",
					id: "",
					start: "",
					end: "",
					accounttimestart_time: "",
					accounttimeent_time: ""
				}
			},
			ResetFour(){
				this.formThree = {
					type: "",
					id: "",
					start: "",
					end: "",
					accounttimestart_time: "",
					accounttimeent_time: ""
				}
			},
			save(){
				this.axios.get('fina/AddAcount',{
					params:{
						orderId: this.orderId,
						repaymentSource: this.qudao,
						// totalamount: this.totalamount,
						amountmoney: this.amountmoney,
						remarks: this.remarks,
						accounttime: this.accounttime,
						totalamount: this.totalMoney,
						sys_uerId: window.localStorage.getItem("userid")
					}
				}).then(res=>{
					this.$confirm(res.data.desc, '提示', {
						type: 'warning',
						center: true
					})
					this.visible = false
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
	.el-tabs__header {
  		margin: 0;
	}
	.mains{
		padding: 20px;
		background-color: #fff;
		min-height: 100vh;
	}
	.main{
		padding: 20px;
		background-color: #fff;
		min-height: 70vh;
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
	.tabs td .el-input .el-input__inner {
		background-color: #f3f6fb;
		border: transparent;
	}
	.tab th{
		width: 50%;
		text-align: left;
	}
	.tabs th{
		text-align: left;
	}
	.tab td{
		text-align: center;
	}
	.tab td div{
		margin-top: -10px;
		margin-bottom: -10px;
		width: 90%;
		height: 40px;
		line-height: 40px;
		background-color: #f3f6fb;
	}
	.red div{
		margin-top: -10px;
		margin-bottom: -10px;
		width: 67%;
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		background-color: #f3f6fb;
	}
	.inpu{
		width: 70%;
		margin-top: -10px;
		margin-bottom: -10px;
	}
	.save{
		margin-top: 20px;
		float: right;
		width: 100px;
		margin-right: 20%;
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
	.el-popover{
		padding: 20px;
	}
	.el-popover p{
		font-size: 16px;
		margin-bottom: 15px;
	}
</style>
