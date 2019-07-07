<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置2</p> -->
		<div class="main">
			<table border="1" cellpadding="30" cellspacing="0">
				<tr>
					<th>身份证及人脸认证</th>
					<td>
						<el-select v-model="one" placeholder="极速贷">
							<el-option label="极速贷" value="极速贷"></el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<th>运营商认证</th>
					<td>
						<el-select v-model="two" placeholder="极速贷">
							<el-option label="极速贷" value="极速贷"></el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<th>机审风控</th>
					<td>
						<el-select v-model="three" placeholder="极速贷">
							<el-option label="极速贷" value="极速贷"></el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<th>第三方支付</th>
					<td>
						<el-radio v-model="radio" label="1">需认证</el-radio>
  						<el-radio v-model="radio" label="2">免认证</el-radio>
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
				one: "",
				two: "",
				three: "",
				radio: "1"
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
		width: 35%;
	}
	td{
		padding-left: 10%;
	}
</style>
