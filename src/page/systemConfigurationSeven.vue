<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置7</p> -->
		<el-dialog :title="title" :visible.sync="centerDialogVisible" customClass="customWidth" center>
			<div class="top">
				<el-button type="warning" @click="centerDialogVisible = false">取消</el-button>
				<el-input placeholder="输入角色名称" class="inp"></el-input>
				<el-button type="primary" @click="centerDialogVisible = false">保存</el-button>
			</div>
			<table border="1" cellspacing="0" cellpadding="15" class="tables">
				<tr>
					<th colspan="3">功能操作权限</th>
				</tr>
				<tr>
					<th>可操作一级菜单功能</th>
					<th>可操作二级菜单功能</th>
					<th>可操作三级菜单功能</th>
				</tr>
				<tr>
					<td rowspan="2">
						<span>平台首页</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>综合统计</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>回收率报表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="4">
						<span>订单管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>机审订单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>人工复审</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>机审拒绝未人审</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>已机审已人审</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>订单查询</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="8">
						<span>贷后订单管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td rowspan="5">
						<span>订单查询</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>未逾期未分配</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>未逾期已分配</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>逾前催收率报表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>逾前催收员报表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>我的逾期催收订单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>已还订单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>已逾期订单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>已坏账订单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="6">
						<span>催收预警及管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td rowspan="2">
						<span>催单分配员工</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>已逾期未分配</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>已逾期已分配</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>催单订单报表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>催收率报表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>催收员工作报表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>我的催收订单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>已分配未催收</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>已分配已催收</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td rowspan="4">
						<span>用户管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>用户认证信息</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>黑名单用户</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>机审判定黑名单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>人工添加黑名单</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>白名单用户</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="10">
						<span>财务管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>支付记录</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>还款计划</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>还款记录</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>线上手工调账</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>新增线上调账</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>线上调账记录表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>线下手工调账</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>新增线下调账</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>线下调账记录表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>银行卡自动扣款</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>一键扣款</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>扣款记录表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>财务总览</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>渠道管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>渠道数据查询</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>渠道设置管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="4">
						<span>运营数据</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>平台总数据</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>还款数据</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>逾期数据</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>收支数据</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="3">
						<span>APP管理设置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>轮播图设置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<!-- <tr>
					<td>
						<span>虚拟宣传页</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr> -->
				<tr>
					<td>
						<span>编辑协议</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>联系客服和关于我们</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="8">
						<span>后台设置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>贷款类型配置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>申请条件配置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>认证信息配置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>第三方接口设置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>分控设置管理</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td>
						<span>逾期等级设置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>/</span>
					</td>
				</tr>
				<tr>
					<td rowspan="2">
						<span>角色权限设置</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
					<td>
						<span>新增编辑账号</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
				<tr>
					<td>
						<span>账号列表</span>
						<el-checkbox v-model="checked"></el-checkbox>
					</td>
				</tr>
			</table>
      	</el-dialog>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="角色权限" name="first">
				<div class="main">
					<el-table border :data="tableData" style="width: 100%;line-height: 60px;">
						<el-table-column prop="name" label="角色名称" align="center"></el-table-column>
						<el-table-column prop="name" label="角色描述" align="center"></el-table-column>
						<el-table-column prop="address" label="角色开关" align="center"></el-table-column>
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
						<span>新增角色</span>
					</div>
				</div>
			</el-tab-pane>
			<el-dialog :title="titles" :visible.sync="centerDialogVisibles" customClass="customWidths" center>
				<table border="1" cellspacing="0" cellpadding="20" class="table">
					<tr>
						<th>用户名</th>
						<td>
							<el-input v-model="name" placeholder="请输入用户名"></el-input>
						</td>
					</tr>
					<tr>
						<th>密码</th>
						<td>
							<el-input v-model="pass" placeholder="请输入密码"></el-input>
						</td>
					</tr>
					<tr>
						<th>角色名称</th>
						<td>
							<el-select v-model="person" placeholder="选择角色" style="width: 100%;">
								<el-option label="管理员" value="管理员"></el-option>
								<el-option label="财务" value="财务"></el-option>
								<el-option label="催收员" value="催收员"></el-option>
							</el-select>
						</td>
					</tr>
					<tr>
						<th>账号状态</th>
						<td>
							<el-select v-model="state" placeholder="选择状态" style="width: 100%;">
								<el-option label="开启" value="开启"></el-option>
								<el-option label="禁用" value="禁用"></el-option>
							</el-select>
						</td>
					</tr>
				</table>
				<div class="btn">
					<el-button type="warning" @click="centerDialogVisibles = false">取消</el-button>
					<el-button type="primary" @click="centerDialogVisibles = false">保存</el-button>
				</div>
			</el-dialog>
			<el-tab-pane label="账号列表" name="second">
				<div class="main">
					<el-form :model="formList" :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="formList.name" placeholder="姓名" style="width:150px">
								<el-option label="订单编号" value="订单编号"></el-option>
								<el-option label="姓名" value="姓名"></el-option>
								<el-option label="手机号" value="手机号"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="single">
							<el-input placeholder="请输入数字" v-model="formList.single" class="input-with-select"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="Search">搜索</el-button>
						</el-form-item>
					</el-form>
					<el-table border :data="tableDatas" style="width: 100%;line-height: 60px;">
						<el-table-column prop="name" label="角色名称" align="center"></el-table-column>
						<el-table-column prop="name" label="用户名称" align="center"></el-table-column>
						<el-table-column prop="address" label="登录状态" align="center"></el-table-column>
						<el-table-column prop="address" label="登录时间" align="center"></el-table-column>
						<el-table-column prop="address" label="账号状态" align="center"></el-table-column>
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
					<div class="open" @click="centerDialogVisibles = true">
						<!-- <i class="el-icon-circle-plus-outline"></i> -->
						<i class="el-icon-plus"></i>
						<span>新增用户</span>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
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
				title: "新增/编辑权限",
				centerDialogVisible: false,
				titles: "新增用户",
				centerDialogVisibles: false,
				checked: true,
				name: "",
				pass: "",
				person: "",
				state: "",
				tableData: [],
				tableDatas: [],
				formList: {
					name: "",
					single: ""
				},
				activeName: 'first',
				active: 1,
				prev: false,
				nexts: true,
				completes: false,
				table: true,
				one: "",
				two: "",
				name: "",
				account: "",
				password: ""
			}
		},
		methods: {
			pre(){
				this.active = 1;
				this.prev = false;
				this.nexts = true;
				this.completes = false;
				this.table = true;
			},
			next() {
				this.active = 2;
				this.prev = true;
				this.nexts = false;
				this.completes = true;
				this.table = false;
			},
			complete(){
				this.activeName = "second";
			},
			Search(){

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
		border: 1px solid #dfe6ec;
		margin-top: -1px;
		cursor: pointer;
		font-size: 1.2rem;
		text-align: center;
	}
	.single {
  		margin-left: -15px;
	}
	.top{
		// width: 100%;
		// margin: 0 auto;
	}
	.customWidth{
		width: 50%;
		text-align: center;
	}
	.customWidths{
		width: 25%;
		text-align: center;
	}
	.inp{
		width: 40%;
		margin-left: 10%;
		margin-right: 10%;
	}
	.tables{
		width: 98%;
		margin: 20px auto;
		border-color: #dfe6ec;
	}
	.btn{
		display: flex;
		justify-content: space-around;
	}
</style>
