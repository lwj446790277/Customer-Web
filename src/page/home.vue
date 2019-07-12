<template>
    <div>
        <head-top></head-top>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="综合统计" name="first">
				<div class="main">
					<div class="lefts"></div>
					<span class="today">今日数据</span>
					<table border="1" cellpadding="25" cellspacing="0" class="bors">
						<tr class="trone">
							<th>放款金额</th>
							<th>注册人数</th>
							<th>申请人数</th>
							<th>放款人数</th>
						</tr>
						<tr>
							<td>222</td>
							<td>333</td>
							<td>444</td>
							<td>555</td>
						</tr>
					</table>
					<table border="1" cellpadding="25" cellspacing="0" class="bors">
						<tr class="trtwo">
							<th>回款金额</th>
							<th>回款笔数</th>
							<th>续期笔数</th>
							<th>逾期还款笔数</th>
						</tr>
						<tr>
							<td>222</td>
							<td>333</td>
							<td>444</td>
							<td>555</td>
						</tr>
					</table>
					<div class="leftl"></div>
					<span class="today">累计数据</span>
					<table border="1" cellpadding="25" cellspacing="0" class="borone">
						<tr class="trone">
							<th>累计放款总金额</th>
							<th>累计还款总金额</th>
							<th>用户总数</th>
							<th>用户申请笔数</th>
							<th>放款总笔数</th>
						</tr>
						<tr>
							<td>222</td>
							<td>333</td>
							<td>444</td>
							<td>555</td>
							<td>555</td>
						</tr>
					</table>
					<table border="1" cellpadding="25" cellspacing="0" class="borone">
						<tr class="trtwo">
							<th>应收总金额</th>
							<th>实际收益</th>
							<th>还款总笔数</th>
							<th>放款通过率</th>
							<th>回款率</th>
						</tr>
						<tr>
							<td>222</td>
							<td>333</td>
							<td>444</td>
							<td>555</td>
							<td>555</td>
						</tr>
					</table>
					<div class="lefts"></div>
					<span class="today">未到期数据</span>
					<table border="1" cellpadding="25" cellspacing="0" class="bortwo">
						<tr class="trone">
							<th>笔数</th>
							<th>应收本金</th>
							<th>应收总金额</th>
						</tr>
						<tr>
							<td>222</td>
							<td>333</td>
							<td>444</td>
						</tr>
					</table>
					<div class="leftl"></div>
					<span class="today">逾期数据</span>
					<table border="1" cellpadding="25" cellspacing="0" class="bortwo">
						<tr class="trtwo">
							<th>笔数</th>
							<th>逾期率</th>
							<th>逾期应收总金额</th>
						</tr>
						<tr>
							<td>222</td>
							<td>333</td>
							<td>444</td>
						</tr>
					</table>
				</div>
			</el-tab-pane>
			<el-tab-pane label="回收率报表" name="second">
				<div class="main">
					<el-date-picker type="date" placeholder="起始时间" v-model="start"></el-date-picker>
					<el-date-picker type="date" placeholder="结束时间" v-model="end" class="picker"></el-date-picker>
					<el-button type="primary" @click="Search">搜索</el-button>
					<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="name" label="应还日期" width="93" align="center"></el-table-column>
						<el-table-column prop="name" label="应还订单" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="逾前未还" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="逾前已还" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="逾后未还" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="逾后已还" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="已坏账" align="center"></el-table-column>
						<el-table-column prop="address" label="应还金额" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="实还金额" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="延期费" align="center"></el-table-column>
						<el-table-column prop="address" label="减免金额" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="银行扣款金额" align="center"></el-table-column>
						<el-table-column prop="address" label="待还金额" width="93" align="center"></el-table-column>
						<el-table-column prop="address" label="逾期率" align="center"></el-table-column>
						<el-table-column prop="address" label="1天回收率" align="center"></el-table-column>
						<el-table-column prop="address" label="3天回收率" align="center"></el-table-column>
						<el-table-column prop="address" label="7天回收率" align="center"></el-table-column>
						<el-table-column prop="address" label="15天回收率" align="center"></el-table-column>
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
	import tendency from '../components/tendency'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
				tableData: [],
				activeName: "first",
				start: "",
				end: "",
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20
    		}
    	},
    	components: {
    		headTop,
    	},
    	methods: {
    		sizeChange() {
			//   this.getData(this.page, this.pageSize);
			},
			currentChange() {
			//   this.getData(this.page, this.pageSize);
			},
			Search(){

			}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.main{
		padding: 20px;
	}
	.lefts{
		width: 100%;
		width: 8px;
		height: 30px;
		background-color: #3278f9;
		margin-right: 10px;
		float: left;
	}
	.leftl{
		width: 100%;
		width: 8px;
		height: 30px;
		background-color: #fb8b39;
		margin-right: 10px;
		float: left;
	}
	.today{
		font-size: 1.2rem;
		line-height: 30px;
	}
	.bors{
		width: 80%;
		margin: 20px auto;
		border: 1px solid #eee;
	}
	.bors th{
		width: 25%;
	}
	.borone{
		width: 80%;
		margin: 20px auto;
		border: 1px solid #eee;
	}
	.borone th{
		width: 20%;
	}
	.bortwo{
		width: 80%;
		margin: 20px auto;
		border: 1px solid #eee;
	}
	.bortwo th{
		width: 34%;
	}
	.bors th,.borone th,.bortwo th{
		line-height: 0px;
		border: 1px solid #eee;
	}
	.bors td,.borone td,.bortwo td{
		text-align: center;
		line-height: 0px;
		border: 1px solid #eee;
	}
	.trone{
		background-color: #e0e8f5;
	}
	.trtwo{
		background-color: #fbe9d0;
	}
	.picker{
		margin-left: -5px;
		margin-right: 20px;
		margin-bottom: 20px;
	}
	.block {
		padding-top: 20px;
		text-align: center;
	}
</style>
