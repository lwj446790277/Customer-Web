<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是财务总览</p> -->
		<div class="main">
			<el-form :model="form" :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select v-model="form.time" placeholder="操作时间" style="width:150px">
						<el-option label="操作时间" value="操作时间"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="single">
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
			<table border="1" cellspacing="0" cellpadding="15" class="tabone">
				<tr>
					<th>项目</th>
					<th>笔数</th>
					<th>支出</th>
					<th>收入</th>
				</tr>
				<tr>
					<th>实借金额</th>
					<td>{{one}}</td>
					<td>{{two}}</td>
					<td>{{three}}</td>
				</tr>
				<tr>
					<th>实还金额</th>
					<td>{{first}}</td>
					<td>{{second}}</td>
					<td>{{third}}</td>
				</tr>
				<tr>
					<th>逾期费</th>
					<td>{{four}}</td>
					<td>{{five}}</td>
					<td>{{six}}</td>
				</tr>
				<tr>
					<th>延期费</th>
					<td>{{forth}}</td>
					<td>{{fifth}}</td>
					<td>{{sixth}}</td>
				</tr>
			</table>
			<!-- <el-table border :data="tableData" style="width: 100%">
				<el-table-column prop="program" label="项目" align="center" class="red">
					<template slot-scope="scope">
							
					</template>
				</el-table-column>
				<el-table-column prop="realborrowing" label="笔数" align="center"></el-table-column>
				<el-table-column prop="pipelinenumber" label="支出" align="center"></el-table-column>
				<el-table-column prop="paymentmoney" label="收入" align="center"></el-table-column>
			</el-table> -->
		</div>
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
				one: "",
				two: "",
				three: "",
				first: "",
				second: "",
				third: "",
				four: "",
				five: "",
				six: "",
				forth: "",
				fifth: "",
				sixth: "",
				form: {
					time: "",
					start: "",
					end: ""
				}
			}
		},
		created(){
			this.getData(this.page,this.Pagesize)
		},
		methods:{
			show(){
				var bankcardName = res.data.Bankdeduction.bankcardName.split(",")
				var deductionstatus = res.data.Bankdeduction.deductionstatus.split(",")
				var orderNumber = res.data.Bankdeduction.orderNumber.split(",")
				var name = res.data.Bankdeduction.name.split(",")
				console.log(bankcardName)
				this.one=bankcardName[0]
				this.two=bankcardName[1]
				this.three=bankcardName[2]
				this.first=deductionstatus[0]
				this.second=deductionstatus[1]
				this.third=deductionstatus[2]
				this.four=orderNumber[0]
				this.five=orderNumber[1]
				this.six=orderNumber[2]
				this.forth=name[0]
				this.fifth=name[1]
				this.sixth=name[2]
			},
			getData( page, Pagesize ){
				this.axios.get('fina/financialoverview',{
					params:{
					companyId: "3",
					// page,
					// Pagesize
					}
				}).then(res=>{
					this.show()
				})
			},
			Search(){
				console.log(this.tableData)
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
	.red{
		color: red;
	}
	.tabone{
		width: 98%;
        margin: 20px auto;
        border-color: #dfe6ec;
	}
	.tabone th{
		width: 25%;
	}
	.tabone td{
		text-align: center;
	}
</style>
