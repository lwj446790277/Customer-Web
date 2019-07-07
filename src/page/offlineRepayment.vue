<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是线下还款</p> -->
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="新增线下调账" name="first">
				<div class="main">
					<table border="1" cellpadding="30" cellspacing="0" class="tabe">
						<tr>
							<th>项目名</th>  
							<td>
								<el-input></el-input>
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
									<el-option label="还款渠道甲" value="还款渠道甲"></el-option>
									<el-option label="还款渠道乙" value="还款渠道乙"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th>还款流水号</th>
							<td>
								<el-input></el-input>
							</td>
						</tr>
						<tr>
							<th>输入金额</th>
							<td>
								<el-input></el-input>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="add">添加并保存</el-button>
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
						<el-form-item>
							<el-select v-model="form.time" placeholder="操作日期" style="width:150px">
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
							<el-button type="warning" @click="Reset">重置</el-button>
							<el-button type="primary" @click="Search">搜索</el-button>
						</el-form-item>
					</el-form>
					<div class="statistics">
						<ul>
							<li>线下调账总收入</li>
							<li class="num">10</li>
							<li>线下调账总支出</li>
							<li class="num">10</li>
						</ul>
					</div>
					<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
						<el-table-column prop="name" label="日期" align="center"></el-table-column>
						<el-table-column prop="name" label="财务操作人" align="center"></el-table-column>
						<el-table-column prop="address" label="项目名" align="center"></el-table-column>
						<el-table-column prop="address" label="放款/还款渠道" align="center"></el-table-column>
						<el-table-column prop="address" label="放款/还款流水号" align="center"></el-table-column>
						<el-table-column prop="address" label="收入" align="center"></el-table-column>
						<el-table-column prop="address" label="支出" align="center"></el-table-column>
						<el-table-column prop="address" label="备注" align="center"></el-table-column>
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
				activeName: "first",
				receive: "",
				qudao: "",
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20,
				form: {
					type: "",
					id: "",
					time: "",
					start: "",
					end: ""
				}
			}
		},
		methods:{
			Reset(){

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
</style>
