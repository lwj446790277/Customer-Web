<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置4</p> -->
		<div class="main">
			<table border="1" cellpadding="30" cellspacing="0">
				<tr>
					<th>身份证判定可申请最小年龄段</th>
					<td>
						<el-input v-model="small" placeholder="请输入整数"></el-input>
					</td>
				</tr>
				<tr>
					<th>身份证判定可申请最大年龄段</th>
					<td>
						<el-input v-model="big" placeholder="请输入整数"></el-input>
					</td>
				</tr>
				<tr>
					<th>拒绝申请的省份
						<p>(用"/"符号隔开)</p>
					</th>
					<td>
						<el-input type="textarea" v-model="refuse" placeholder="台湾/香港/澳门"></el-input>
					</td>
				</tr>
				<tr>
					<th>允许签约的银行类型
						<p>(用"/"符号隔开)</p>
					</th>
					<td>
						<el-input type="textarea" v-model="allow" placeholder="中国银行/中国农业银行"></el-input>
					</td>
				</tr>
			</table>
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
				small: "",
				big: "",
				refuse: "",
				allow: ""
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
	table{
		margin: 20px auto;
		width: 35%;
	}
</style>
