<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道1</p> -->
		<div class="main">
			<el-form :model="formList" :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select v-model="formList.time" placeholder="范围日期" style="width:150px">
						<el-option label="实借时间" value="实借时间"></el-option>
						<el-option label="延期前应还时间" value="延期前应还时间"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="single">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="起始时间" v-model="formList.date"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-select v-model="formList.type" placeholder="引流平台渠道" style="width:150px">
						<el-option label="引流平台渠道" value="引流平台渠道"></el-option>
						<el-option label="APPstore" value="APPstore"></el-option>
						<el-option label="华为应用" value="华为应用"></el-option>
						<el-option label="小米商城" value="小米商城"></el-option>
						<el-option label="借吧平台" value="借吧平台"></el-option>
						<el-option label="短信推广A" value="短信推广A"></el-option>
						<el-option label="电销推广A" value="电销推广A"></el-option>
						<el-option label="网站链接平台A" value="网站链接平台A"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="Search">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table border :data="tableData" style="width: 100%;line-height: 60px;">
				<el-table-column prop="name" label="序号" align="center"></el-table-column>
				<el-table-column prop="name" label="引流平台渠道" align="center"></el-table-column>
				<el-table-column prop="address" label="UV人数" align="center"></el-table-column>
				<el-table-column prop="address" label="注册人数" align="center"></el-table-column>
				<el-table-column prop="address" label="UV到注册转化率(%)" width="170" align="center"></el-table-column>
				<el-table-column prop="address" label="申请人数" align="center"></el-table-column>
				<el-table-column prop="address" label="注册到申请转化率(%)" width="175" align="center"></el-table-column>
				<el-table-column prop="address" label="机审通过人数" align="center"></el-table-column>
				<el-table-column prop="address" label="注册到借款转化率(%)" width="175" align="center"></el-table-column>
				<el-table-column prop="address" label="操作" align="center"></el-table-column>
			</el-table>
			<div class="block">
				<el-pagination
				:current-page="page"
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
				formList: {
					time: "",
					date: "",
					type: ""
				},
				tableData: [],
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20
			}
		}
    }
</script>

<style lang="less" scoped>
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
	.right {
		float: right;
	}
	.block {
		padding-top: 20px;
		text-align: center;
	}
	.single {
		margin-left: -15px;
	}
</style>
