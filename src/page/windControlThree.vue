<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">风控3</p> -->
		<div class="main">
			<div class="first">
				<h3>联系客服设置</h3>
				<ul>
					<li>
						<span>宣传图</span>
						<div class="cont">
							
						</div>
					</li>
					<li>
						<span>联系方式</span> 
						<div class="cont">
							<el-input v-model="time"></el-input>
						</div>
					</li>
					<li>
						<span>二维码</span>
						<div class="cont">
							<el-input v-model="speed"></el-input>
						</div>
					</li>
					<li>
						<span>备注</span>
						<div class="cont">
							<el-input v-model="speed"></el-input>
						</div>
					</li>
				</ul>
				<el-button type="primary" class="save">保存</el-button>
			</div>
			<div class="first">
				<h3>关于我们</h3>
				<ul>
					<li>
						<span>APP的Logo</span>
						<div class="cont">
							<el-input v-model="borrow"></el-input>
						</div>
					</li>
					<li>
						<span>公司或产品全名</span>
						<div class="cont">
							<el-input v-model="time"></el-input>
						</div>
					</li>
					<li>
						<span>当前App的版本</span>
						<div class="cont">
							<el-input v-model="speed"></el-input>
						</div>
					</li>
				</ul>
				<el-button type="primary" class="save">保存</el-button>
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
	.first{
		width: 45%;
		border: 1px solid #ccc;
		float: left;
		margin-right: 50px;
		padding-bottom: 20px;
	}
	h3{
		width: 100%;
		line-height: 40px;
		text-align: center;
		border-bottom: 1px solid #ccc;
		margin-bottom: 10px;
	}
	ul{
		display: flex;
		flex-direction: column;
		margin-left: 8%;
		margin-bottom: 4%;
	}
	ul>li>span{
		float: left;
		border: 1px solid #ccc;
		width: 45%;
		line-height: 61px;
		text-align: center;
	}
	.cont{
		float: left;
		border: 1px solid #ccc;
		width: 45%;
		line-height: 60px;
	}
	.con{
		line-height: 61px;
		text-align: center;
	}
	.el-input{
		width: 150px;
		margin-left: 20%;
	}
	.save{
		float: right;
		margin-right: 80px;
	}
</style>
