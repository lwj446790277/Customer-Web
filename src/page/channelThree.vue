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
						<el-table-column prop="pipelinenumber" label="发送历史批次" align="center"></el-table-column>
						<el-table-column prop="paymentmoney" label="操作" align="center"></el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<el-tab-pane label="短信发送历史" name="second">
				<div class="main">
					<el-table border :data="tableDatas" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="remittanceTime" label="最后操作时间" align="center"></el-table-column>
						<el-table-column prop="loanSource" label="逾前还款日期" align="center"></el-table-column>
						<el-table-column prop="pipelinenumber" label="已选用户条数" align="center"></el-table-column>
						<el-table-column prop="paymentmoney" label="成功发送条数" align="center"></el-table-column>
						<el-table-column prop="paymentmoney" label="发送历史批次" align="center"></el-table-column>
					</el-table>
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
				tableDatas: [],
				activeName: "first",
				form:{
					name: ""
				}
			}
		},
		created(){
			this.get()
			this.getData()
		},
		methods:{
			get(){

			},
			getData(){

			},
			Search(){

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
</style>
