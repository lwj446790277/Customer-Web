<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">风控2</p> -->
		<div class="main">
			<div class="first">
				<h3>封面选项卡</h3>
				<ul>
					<li>
						<span>可借额度</span>
						<div class="cont">
							<el-input v-model="borrow"></el-input>
							<span>元</span>
						</div>
					</li>
					<li>
						<span>借款期限</span>
						<div class="cont">
							<el-input v-model="time"></el-input>
							<span>天</span>
						</div>
					</li>
					<li>
						<span>到账速度</span>
						<div class="cont">
							<el-input v-model="speed"></el-input>
							<span>分钟</span>
						</div>
					</li>
					<li>
						<span>审核速度</span>
						<div class="cont con">
							<span>极快</span>
						</div>
					</li>
				</ul>
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
				borrow: "3000",
				time: "7",
				speed: "10"
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
	.first{
		width: 45%;
		border: 1px solid #ccc;
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
</style>
