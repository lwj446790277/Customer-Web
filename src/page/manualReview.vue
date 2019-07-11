<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是机审订单</p> -->
		<div class="main">
			<el-form :model="form" :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select v-model="form.name" placeholder="订单编号" style="width:150px">
						<el-option label="订单编号" value="订单编号"></el-option>
						<el-option label="姓名" value="姓名"></el-option>
						<el-option label="手机号" value="手机号"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="single">
					<el-input placeholder="单行输入" v-model="form.id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="form.time" placeholder="订单时间" style="width:150px">
						<el-option label="订单时间" value="订单时间"></el-option>
						<el-option label="延借时间" value="延借时间"></el-option>
						<el-option label="延期后应还" value="延期后应还"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="single">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="起始时间" v-model="form.start"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item class="single">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="结束时间" v-model="form.end"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-select placeholder="借款结果" v-model="form.per">
						<el-option label="已借款" value="待审"></el-option>
						<el-option label="未借款" value="未借款"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select placeholder="所有审核员" v-model="form.all">
						<el-option label="已借款" value="待审"></el-option>
						<el-option label="未借款" value="未借款"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="Reset">重置</el-button>
					<el-button type="primary" @click="Search">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
				<el-table-column prop="orderNumber" label="编号" align="center"></el-table-column>
				<el-table-column prop="user.name" label="姓名" align="center"></el-table-column>
				<el-table-column prop="user.phone" label="手机号" align="center"></el-table-column>
				<el-table-column prop="address" label="人审时间" align="center"></el-table-column>
				<el-table-column prop="riskcontrolname" label="风控" align="center"></el-table-column>
                <el-table-column prop="riskmanagementFraction" label="分数" align="center"></el-table-column>
				<el-table-column prop="borrowMoneyWay" label="贷款方式" align="center"></el-table-column>
				<el-table-column prop="address" label="借款结果" align="center"></el-table-column>
				<el-table-column prop="assessor" label="审核员" align="center"></el-table-column>
				<el-table-column  label="认证信息详情" align="center">
                    <el-button type="primary" @click="orderDetailShow()">查看</el-button>
                </el-table-column>
				<el-table-column  label="借款信息详情" align="center">
                    <el-button type="primary" @click="orderDetailShow()">查看</el-button>
                </el-table-column>
			</el-table>
			<div class="block">
				<el-pagination
				:current-page.sync="page"
				:page-size.sync="pageSize"
				layout="total, prev, pager, next, jumper"
				:page-count="totalPageCount"
				:total="totalCount"
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
				totalCount: 20,
				form: {
					name: "",
					id: "",
					time: "",
					start: "",
					end: "",
					per: "",
					all: ""
				}
			}
		},
        beforeCreate() {
            var that = this;
            that.axios.get('/order/queryroasOrders', {
                params: {companyid:3,page:1}
            }).then(res => {
                that.tableData = res.data.listorderto;
            })
        },
		methods:{
			Reset(){
				this.form = {
					name: "",
					id: "",
					time: "",
					start: "",
					end: "",
					per: ""
				}
			},
			Search(){

			},
            orderDetailShow(){},
            currentChange(){}
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
	.block {
		padding-top: 20px;
		text-align: center;
	}
	.single{
		margin-left: -15px;
	}
</style>
