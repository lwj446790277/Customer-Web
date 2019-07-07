<template>
    <div>
        <head-top></head-top>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="综合统计" name="first">
				<div class="main">
					<div class="lefts"></div>
					<span class="today">今日数据</span>
					<table border="1" cellpadding="25" cellspacing="0" class="bor">
						<tr>
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
					<table border="1" cellpadding="25" cellspacing="0" class="bor">
						<tr>
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
					<table border="1" cellpadding="25" cellspacing="0" class="bor">
						<tr>
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
					<table border="1" cellpadding="25" cellspacing="0" class="bor">
						<tr>
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
					<table border="1" cellpadding="25" cellspacing="0" class="bor">
						<tr>
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
					<table border="1" cellpadding="25" cellspacing="0" class="bor">
						<tr>
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
				
				</div>
			</el-tab-pane>
		</el-tabs>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency' 
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
				activeName: "first"
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		
    	},
        computed: {

        },
    	methods: {
    		
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.main{
		padding: 20px;
	}
	.lefts{
		width: 10px;
		height: 30px;
		background-color: blue;
		margin-right: 10px;
		float: left;
	}
	.leftl{
		width: 10px;
		height: 30px;
		background-color: red;
		margin-right: 10px;
		float: left;
	}
	.today{
		font-size: 1.2rem;
		line-height: 30px;
	}
	.bor{
		width: 90%;
		margin: 20px auto;
	}
	th{
		background-color: aquamarine;
	}
	td{
		text-align: center;
	}
</style>
