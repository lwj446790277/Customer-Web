<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置1</p> -->
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="借款设置" name="first">
				<div class="main">
					<p>操作人:</p>
					<p>最后更新:</p>
					<table border="1" cellpadding="30" cellspacing="0" class="tab">
						<tr>
							<th>贷款类型</th>  
							<td>
								<span>极速贷</span>
							</td>
						</tr>
						<tr>
							<th>还款期限</th>
							<td>
								<span>7天</span>
							</td>
						</tr>
						<tr>
							<th>可借额度</th>
							<td>
								<span>1000元</span>
							</td>
						</tr>
						<tr>
							<th>日均利息</th>
							<td>
								<span>0.01%</span>
							</td>
						</tr> 
						<tr>
							<th>平台服务费比率</th>
							<td>
								<span>20%</span>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="edit" @click="editDialogVisible = true">编辑</el-button>
				</div>
				<el-dialog :title="title" :visible.sync="editDialogVisible" customClass="customWidth" width="30%" center>
					<table border="1" cellpadding="25" cellspacing="0" class="tables">
						<tr>
							<th>贷款类型</th>  
							<td>
								<el-input placeholder="输入名称"></el-input>
							</td>
						</tr>
						<tr>
							<th>还款期限</th>
							<td>
								<el-input placeholder="输入3-30的整数"></el-input>
								<span>天</span>
							</td>
						</tr>
						<tr>
							<th>可借额度</th>
							<td>
								<el-input placeholder="输入整数"></el-input>
								<span>元</span>
							</td>
						</tr>
						<tr>
							<th>日均利息</th>
							<td>
								<el-input placeholder="保留四位小数"></el-input>
								<span>%</span>
							</td>
						</tr> 
						<tr>
							<th>平台服务费比率</th>
							<td>
								<el-input placeholder="输入1-50的整数"></el-input>
								<span>%</span>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="edit" @click="editDialogVisible = false">保存</el-button>
				</el-dialog>
			</el-tab-pane>
			<el-tab-pane label="延期设置" name="second">
				<div class="main">
					<p>操作人:</p>
					<p>最后更新:</p>
					<div class="center">
						<span>是否开启</span>
						<el-select v-model="state" placeholder="开">
							<el-option label="开" value="开"></el-option>
							<el-option label="关" value="关"></el-option>
						</el-select>
					</div>
					<table border="1" cellpadding="30" cellspacing="0" class="tab">
						<tr>
							<th>最多可延期次数</th>  
							<td>
								<span>3</span>
							</td>
						</tr>
						<tr>
							<th>单次延期多少天</th>
							<td>
								<span>7天</span>
							</td>
						</tr>
						<tr>
							<th>单次延期费用</th>
							<td>
								<span>1000元</span>
							</td>
						</tr>
						<tr>
							<th>逾期多少天前可延期</th>
							<td>
								<span>2</span>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="edit" @click="editDialogVisibles = true">编辑</el-button>
				</div>
				<el-dialog :title="titles" :visible.sync="editDialogVisibles" customClass="customWidth" width="30%" center>
					<div class="centers">
						<span>是否开启</span>
						<el-select v-model="state" placeholder="开">
							<el-option label="开" value="开"></el-option>
							<el-option label="关" value="关"></el-option>
						</el-select>
					</div>
					<table border="1" cellpadding="25" cellspacing="0" class="tables">
						<tr>
							<th>最多可延期次数</th>  
							<td>
								<el-input placeholder="输入整数"></el-input>
							</td>
						</tr>
						<tr>
							<th>单次延期多少天</th>
							<td>
								<span>7天</span>
							</td>
						</tr>
						<tr>
							<th>单次延期费用</th>
							<td>
								<span>200元</span>
							</td>
						</tr>
						<tr>
							<th>逾期多少天前可延期</th>
							<td>
								<el-input placeholder="整数(默认0=关)"></el-input>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="edit" @click="editDialogVisibles = false">保存</el-button>
				</el-dialog>
			</el-tab-pane>
			<el-tab-pane label="逾期设置" name="third">
				<div class="main">
					<p>操作人:</p>
					<p>最后更新:</p>
					<table border="1" cellpadding="30" cellspacing="0" class="tab">
						<tr>
							<th>逾期第N天前</th>  
							<th>罚息利率(%)</th>
						</tr>
						<tr>
							<td>期限内未逾期</td>
							<td>初始化</td>
						</tr>
						<tr>
							<td>第2天前</td>
							<td>0.06%</td>
						</tr>
						<tr>
							<td>第4天前</td>
							<td>0.06%</td>
						</tr>
						<tr>
							<td>第6天前</td>
							<td>0.06%</td>
						</tr>
					</table>
					<el-button type="primary" class="edit" @click="editsDialogVisible = true">编辑</el-button>
				</div>
				<el-dialog :title="titlel" :visible.sync="editsDialogVisible" customClass="customWidth" width="30%" center>
					<table border="1" cellpadding="25" cellspacing="0" class="tables">
						<tr>
							<th>逾期第N天前</th>  
							<td>
								<el-input placeholder="输入整数"></el-input>
								<span>天</span>
							</td>
						</tr>
						<tr>
							<th>罚息利率</th>
							<td>
								<el-input placeholder="保留两位小数"></el-input>
								<span>%</span>
							</td>
						</tr>
					</table>
					<el-button type="primary" class="edit" @click="editsDialogVisible = false">保存</el-button>
				</el-dialog>
			</el-tab-pane>
			<el-tab-pane label="续借提额" name="forth">
				<div class="main">
					<p>操作人:</p>
					<p>最后更新:</p>
					<table border="1" cellpadding="30" cellspacing="0" class="tab">
						<tr>
							<th>用户已连续还款多少次以后</th>  
							<th>提高额度(元)</th>
						</tr>
						<tr>
							<td>初始化</td>
							<td>初始化可借额度:1000</td>
						</tr>
						<tr>
							<td>连续2次后</td>
							<td>提高500元</td>
						</tr>
						<tr>
							<td>连续4次后</td>
							<td>提高1000元</td>
						</tr>
						<tr>
							<td>连续6次后</td>
							<td>提高1500元</td>
						</tr>
					</table>
					<el-button type="primary" class="edit" @click="editsDialogVisible = true">编辑</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="再审风控" name="fifth">
				<div class="main">
					<el-input :autofocus="focus" @focus="focus"></el-input>
					<el-button @click="click">5555</el-button>
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
				tableData: [],
				activeName: "first",
				state: "",
				title: "编辑借款设置",
				editDialogVisible: false,
				titles: "编辑延期设置",
				editDialogVisibles: false,
				titlel: "编辑逾期设置",
				editsDialogVisible: false,
				focus: false
			}
		},
		methods:{
			click(){
				this.focus = true
			}
		},
		computed:{
			
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
	.tab{
		margin: 20px auto;
		width: 35%;
		border-color: #dfe6ec;
	}
	td{
		text-align: center;
	}
	p{
		margin-bottom: 15px;
	}
	.center{
		margin-left: 40%;
	}
	.edit{
		margin-left: 60%;
	}
	.customWidth{
		width: 30%;
		text-align: center;
	}
	.tables{
		margin: 20px auto;
		border-color: #dfe6ec;
		width: 90%;
	}
	.el-input{
		width: 90%;
	}
	.centers{
		margin-left: 5%;
	}
</style>
