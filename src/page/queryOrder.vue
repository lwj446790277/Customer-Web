<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是机审订单</p> -->
		<div class="main">
			<el-form :model="form" :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select v-model="form.name" placeholder="订单编号" style="width:150px">
						<el-option label="订单编号" value="订单编号"></el-option>
						<el-option label="姓名" value="姓名"></el-option>
						<el-option label="手机号" value="手机号"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="single">
					<el-input placeholder="单行输入" v-model="form.id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="form.time" placeholder="注册时间" style="width:150px">
						<el-option label="订单时间" value="订单时间"></el-option>
						<el-option label="延借时间" value="延借时间"></el-option>
						<el-option label="延期后应还" value="延期后应还"></el-option>
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
					<el-select placeholder="引流平台" v-model="form.per">
						<el-option label="小米应用" value="小米应用"></el-option>
						<el-option label="华为应用" value="华为应用"></el-option>
						<el-option label="360手机助手" value="360手机助手"></el-option>
						<el-option label="第三方平台甲" value="第三方平台甲"></el-option>
						<el-option label="第三方平台乙" value="第三方平台乙"></el-option>
						<el-option label="APPstore" value="APPstore"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select placeholder="用户类型" v-model="form.all">
						<el-option label="机审待审核" value="机审待审核"></el-option>
						<el-option label="机审通过已借款" value="机审通过已借款"></el-option>
						<el-option label="机审通过未借款" value="机审通过未借款"></el-option>
						<el-option label="机审拒绝未人审" value="机审拒绝未人审"></el-option>
						<el-option label="已人审未借款" value="已人审未借款"></el-option>
						<el-option label="已人审已借款" value="已人审已借款"></el-option>
						<el-option label="白名单用户" value="白名单用户"></el-option> 
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="Reset">重置</el-button>
					<el-button type="primary" @click="Search">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
				<el-table-column prop="name" label="编号" align="center"></el-table-column>
				<el-table-column prop="name" label="用户类型" width="93" align="center"></el-table-column>
				<el-table-column prop="name" label="姓名" align="center"></el-table-column>
				<el-table-column prop="address" label="手机号" align="center"></el-table-column>
				<el-table-column prop="address" label="注册时间" width="93" align="center"></el-table-column>
				<el-table-column prop="address" label="订单时间" width="93" align="center"></el-table-column>
				<el-table-column prop="name" label="引流平台" width="93" align="center"></el-table-column>
				<el-table-column prop="name" label="风控模型/分数" align="center"></el-table-column>
				<el-table-column prop="name" label="审核人员" width="93" align="center"></el-table-column>
				<el-table-column prop="address" label="贷款方式" width="93" align="center"></el-table-column>
				<el-table-column prop="address" label="还款期数" width="93" align="center"></el-table-column>
				<el-table-column prop="address" label="第几次借款" align="center"></el-table-column>
				<el-table-column prop="name" label="实借/放款" align="center"></el-table-column>
				<el-table-column prop="name" label="延期:次数/金额" align="center"></el-table-column>
				<el-table-column prop="name" label="总利息/总还款" align="center"></el-table-column>
				<el-table-column prop="address" label="认证信息详情" align="center"></el-table-column>
				<el-table-column prop="address" label="借款信息详情" align="center"></el-table-column>
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
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20,
				form: {
					name: "",
					id: "",
					time: "",
					start: "",
					end: "",
					per: "",
					all: ""
				}
			}
		},
		methods:{
			Reset(){
				this.form = {
					name: "",
					id: "",
					time: "",
					start: "",
					end: "",
					per: "",
					all: ""
				}
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
	.block {
		padding-top: 20px;
		text-align: center;
	}
	.single{
		margin-left: -15px;
	}
</style>
