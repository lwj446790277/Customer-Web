<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道3</p> -->
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="逾前发送筛选" name="first">
				<div class="main">
					<el-form :model="form" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="form.name" placeholder="离最后逾前还款日" style="width:200px">
								<el-option label="当天" value="当天"></el-option>
								<el-option label="提前1天" value="提前1天"></el-option>
								<el-option label="提前2天" value="提前2天"></el-option>
								<el-option label="提前3天" value="提前3天"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="Search">搜索</el-button>  
						</el-form-item>
					</el-form>
					<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="remittanceTime" label="逾前还款日期" align="center"></el-table-column>
						<el-table-column prop="loanSource" label="已选用户条数" align="center"></el-table-column>
						<el-table-column prop="pipelinenumber" label="发送历史批次" align="center">
							<template slot-scope="scope">
								<span class="blue" @click="open">{{scope.row.interestPenaltySum}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="paymentmoney" label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="primary" @click="next">下一步</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-dialog title="发送历史批次" :visible.sync="dialogTableVisible" center>
						<el-table border :data="gridData">
							<el-table-column property="collectionTime" label="第几批次" align="center"></el-table-column>
							<el-table-column property="collectionStatus" label="操作时间" align="center"></el-table-column>
							<el-table-column property="promise_money" label="已选用户条数" align="center"></el-table-column>
							<el-table-column property="orderStatus" label="成功发送条数" align="center"></el-table-column>
						</el-table>
					</el-dialog>
					<el-dialog title="选择短信模板" :visible.sync="dialogVisible" customClass="dia" center>
						<table border="1" cellspacing="0" cellpadding="15" class="son">
							<tr>
								<th>短信模板</th>
								<td>
									<el-select v-model="type" placeholder="短信模板" style="width:90%">
										<el-option label="还款流水号" value="还款流水号"></el-option>
										<el-option label="订单编号" value="订单编号"></el-option>
										<el-option label="姓名" value="姓名"></el-option>
										<el-option label="手机号" value="手机号"></el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<th>模板内容</th>
								<td>
									<el-input type="textarea" v-model="desc" style="width:90%"></el-input>
								</td>
							</tr>
						</table>
						<el-button type="warning" @click="dialogVisible=false" class="close">取消</el-button>
						<el-button type="primary" @click="send" class="send">发送短信</el-button>
					</el-dialog>
				</div>
			</el-tab-pane>
			<el-tab-pane label="短信发送历史" name="second">
				<div class="main">
					<el-table border :data="tableDatas" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="remittanceTime" label="最后操作时间" align="center"></el-table-column>
						<el-table-column prop="loanSource" label="逾前还款日期" align="center"></el-table-column>
						<el-table-column prop="pipelinenumber" label="已选用户条数" align="center"></el-table-column>
						<el-table-column prop="pipelinenumber" label="成功发送条数" align="center"></el-table-column>
						<el-table-column prop="paymentmoney" label="发送历史批次" align="center">
							<template slot-scope="scope">
								<span class="blue" @click="opens">{{scope.row.paymentmoney}}</span>
							</template>
						</el-table-column>
					</el-table>
					<el-dialog title="发送历史批次" :visible.sync="dialogTable" center>
						<el-table border :data="sendData">
							<el-table-column property="collectionTime" label="第几批次" align="center"></el-table-column>
							<el-table-column property="collectionStatus" label="操作时间" align="center"></el-table-column>
							<el-table-column property="promise_money" label="已选用户条数" align="center"></el-table-column>
							<el-table-column property="orderStatus" label="成功发送条数" align="center"></el-table-column>
						</el-table>
					</el-dialog>
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
				tableData: [{interestPenaltySum:"共2次"}],
				tableDatas: [{paymentmoney:"共2次"}],
				gridData: [],
				sendData: [],
				dialogTableVisible: false,
				dialogVisible: false,
				dialogTable: false,
				activeName: "first",
				form:{
					name: ""
				},
				type: "",
				desc: ""
			}
		},
		created(){
			this.get()
			this.getData()
		},
		methods:{
			open(){
				this.dialogTableVisible = true
			},
			next(){
				this.dialogVisible = true
			},
			opens(){
				this.dialogTable = true
			},
			get(){

			},
			getData(){

			},
			handleClick(){

			},
			Search(){

			},
			send(){

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
	.blue{
		color: blue;
		cursor: pointer;
	}
	.dia{
		width: 30%;
	}
	.son{
		width: 95%;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.son td{
		text-align: center;
	}
	.close{
		float: left;
		margin-left: 20px;
		margin-bottom: 20px;
	}
	.send{
		float: right;
		margin-right: 20px;
	}
</style>
