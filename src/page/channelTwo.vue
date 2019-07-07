<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道2</p> -->
		<div class="main">
			<el-table border :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="渠道名称" align="center"></el-table-column>
				<el-table-column prop="name" label="账户" align="center"></el-table-column>
				<el-table-column prop="address" label="链接" align="center"></el-table-column>
				<el-table-column prop="address" label="状态" align="center"></el-table-column>
				<el-table-column prop="address" label="折扣率" align="center"></el-table-column>
				<el-table-column prop="address" label="备注" align="center"></el-table-column>
				<el-table-column prop="address" label="编辑" align="center">
				<template slot-scope="scope">
						<el-button type="primary" @click="edit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="删除" align="center">
				<template slot-scope="scope">
						<el-popover placement="bottom-end" width="300" trigger="click">
						<span class="content">确认删除该轮播图吗？</span>
						<el-button class="confire" type="success" @click="confire(scope.row)">是的</el-button>
						<el-button type="danger" slot="reference" @click="delet(scope.row)">删除</el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
			<div class="open" @click="centerDialogVisible = true">
				<!-- <i class="el-icon-circle-plus-outline"></i> -->
				<i class="el-icon-plus"></i>
				<span>新增渠道</span>
			</div>
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
				tableData: [],
				page: 1,
				pageSize: 10,
				totalPageCount: 0,
				totalCount: 20
			}
		},
		methods:{
			edit(){

			},
			confire(){

			},
			delet(){
				
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
	.el-popover p {
		text-align: center;
		font-size: 18px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.confire {
		float: right;
	}
	.content {
		color: blue;
		cursor: pointer;
	}
	.block {
		padding-top: 20px;
		text-align: center;
	}
	.open {
		width: 99.9%;
		line-height: 60px;
		border: 1px solid #eee;
		margin-top: -1px;
		cursor: pointer;
		font-size: 1.2rem;
		text-align: center;
	}
</style>
