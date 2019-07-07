<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置3</p> -->
		<div class="main">
			<el-table border :data="tableData" style="width: 100%;line-height: 60px;">
				<el-table-column prop="name" label="风控模型名/总分段" align="center"></el-table-column>
				<el-table-column prop="name" label="机审拒绝不放款分数段" align="center"></el-table-column>
				<el-table-column prop="address" label="机审拒绝需人审分数段" align="center"></el-table-column>
				<el-table-column prop="address" label="机审通过分数段" align="center"></el-table-column>
				<el-table-column prop="address" label="参考文档" align="center"></el-table-column>
				<el-table-column label="操作" align="center"></el-table-column>
			</el-table>
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
				tableData: []
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
