<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">机审拒绝未人审订单</p> -->
		<div class="main">
			<el-form :model="form" :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="订单编号" v-model="form.ordernumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="手机号" v-model="form.phone"></el-input>
                </el-form-item>
				<el-form-item >
					<el-col :span="11">
						<el-date-picker type="date" placeholder="订单起始时间" v-model="form.orderstarttime"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item class="single">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="订单结束时间" v-model="form.orderendtime"></el-date-picker>
					</el-col>   
				</el-form-item>
                <el-form-item >
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="机审起始时间" v-model="form.jishenstart"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item class="single">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="机审结束时间" v-model="form.jishenend"></el-date-picker>
                    </el-col>
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
				<el-table-column prop="address" label="机审时间" align="center"></el-table-column>
                <el-table-column prop="riskcontrolname" label="风控" align="center"></el-table-column>
                <el-table-column prop="riskmanagementFraction" label="分数" align="center"></el-table-column>
				<el-table-column prop="borrowMoneyWay" label="贷款方式" align="center"></el-table-column>
				<el-table-column prop="borrowTimeLimit" label="还款期数" align="center"></el-table-column>
				<el-table-column prop="address" label="第几次借款" align="center"></el-table-column>
				<el-table-column prop="orderdetails.makeLoans" label="放款金额" align="center"></el-table-column>
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
				layout="total,  prev, pager, next, jumper"
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
                    ordernumber: "",
                    name: "",
                    phone: "",
                    orderstarttime: "",
                    orderendtime: "",
                    jishenstart:'',
                    jishenend:''
				}
			}
		},
        beforeCreate() {
            var that = this;
            that.axios.get('/order/queryroaOrders', {
                params: {companyid:3,page:1}
            }).then(res => {
                that.tableData = res.data.listorderto;
                that.page = res.data.pageutil.page;
                that.totalPageCount = res.data.pageutil.totalPageCount;
                that.totalCount = res.data.pageutil.totalCount;
            })
        },
		methods:{
			Reset(){
				this.form = {
                    ordernumber: "",
                    name: "",
                    phone: "",
                    orderstarttime: "",
                    orderendtime: "",
                    fengkong:'',
                    jishenstart:'',
                    jishenend:''
				}
			},
			Search(){
                var that = this;
                var param =that.form;
                param.companyid = 3;
                param.page = that.page;
                that.axios.get('/order/queryroaOrders', {
                    params: param
                }).then(res => {
                    that.tableData = res.data.listorderto;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                })
			},
            orderDetailShow(){},
            currentChange() {
            },
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
