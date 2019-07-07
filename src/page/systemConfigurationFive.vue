<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置5</p> -->
		<div class="main">
			<table border="1" cellpadding="35" cellspacing="0">
				<tr>
					<th>个人信息</th>
					<td>
						<el-radio v-model="radio1" label="1">需认证</el-radio>
  						<el-radio v-model="radio1" label="2">免认证</el-radio>
					</td>
				</tr>
				<tr>
					<th>收款银行卡</th>
					<td>
						<el-radio v-model="radio2" label="1">需认证</el-radio>
  						<el-radio v-model="radio2" label="2">免认证</el-radio>
					</td>
				</tr>
				<tr>
					<th>手机运营商</th>
					<td>
						<el-radio v-model="radio3" label="1">需认证</el-radio>
  						<el-radio v-model="radio3" label="2">免认证</el-radio>
					</td>
				</tr>
				<tr>
					<th>芝麻授信</th>
					<td>
						<el-radio v-model="radio4" label="1">需认证</el-radio>
  						<el-radio v-model="radio4" label="2">免认证</el-radio>
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
				radio1: '1',
				radio2: '1',
				radio3: '1',
				radio4: '1'
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
	table{
		margin: 20px auto;
		width: 30%;
	}
	td{
		padding-left: 15%;
	}
</style>
