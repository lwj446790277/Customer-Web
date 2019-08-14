<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是订单查询</p> -->
        <div class="back">
            <h2>订单查询</h2>
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
                    <el-form-item>
                        <el-select placeholder="注册客户端" v-model="form.registeClient">
                            <el-option label="安卓Android端" value="android"></el-option>
                            <el-option label="苹果IOS端" value="ios"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="注册起始时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeStart"
                                            v-model="form.registestarttime"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="注册结束时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeEnd"
                                            v-model="form.registeendtime"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="引流平台" v-model="form.sourcename">
                            <el-option v-for="source in sourceList" :label="'引流平台 '+source.sourcename"
                                       :value="source.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset"
                                   style="background-color:#e3e4e7;border:transparent;color:#000">重置
                        </el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
                    <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
                    <el-table-column prop="user.name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="user.phone" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="user.registeclient" label="客户端类型" align="center"></el-table-column>
                    <el-table-column prop="user.registetime" label="注册时间" width="93" align="center"></el-table-column>
                    <el-table-column prop="orderCreateTime" label="订单时间" width="93" align="center"></el-table-column>
                    <el-table-column prop="user.sourcename" label="引流渠道" width="93" align="center"></el-table-column>
                    <el-table-column prop="riskcontrolname" label="风控模型" align="center"></el-table-column>
                    <el-table-column prop="riskmanagementFraction" label="风控分数" align="center"></el-table-column>
                    <el-table-column prop="user.account" label="审核人员" width="93" align="center"></el-table-column>
                    <el-table-column prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
                    <el-table-column prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
                    <el-table-column prop="howManyTimesBorMoney" label="第几次借款" align="center"></el-table-column>
                    <el-table-column prop="orderdetails.makeLoans" label="放款" align="center"></el-table-column>
                    <el-table-column prop="deferrTime" label="延期次数" align="center"></el-table-column>
                    <el-table-column prop="deferrMoney" label="延期金额" align="center"></el-table-column>
                    <el-table-column prop="orderdetails.interestInAll" label="总利息" align="center"></el-table-column>
                    <el-table-column prop="repaymentMoney" label="总还款" align="center"></el-table-column>
                    <el-table-column label="认证信息详情" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{path:'/personalInformation',query:{id:scope.row.user.id}}">
                                <el-button type="primary">查看</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="借款信息详情" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="orderDetailShow(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-dialog
                    title="借款信息"
                    :visible.sync="orderDetailDialogVisible"
                    width="30%"
                    customClass="custom"
                    center>
                    <ul class="ul">
                        <li>
                            <span>订单编号:</span>
                            <span> {{order.orderNumber}}</span>
                        </li>
                        <li>
                            <span>姓名:</span>
                            <span> {{order.user.name}}</span>
                        </li>
                        <li>
                            <span>手机号:</span>
                            <span> {{order.user.phone}}</span>
                        </li>
                        <li>
                            <span>注册时间:</span>
                            <span> {{order.user.registetime}}</span>
                        </li>
                        <li>
                            <span>订单时间:</span>
                            <span> {{order.orderCreateTime}}</span>
                        </li>
                        <li>
                            <span>引流渠道:</span>
                            <span> {{order.user.sourcename}}</span>
                        </li>
                        <!-- <li>
                        <span>机审时间:</span>
                        <span>{{audit}}</span>
                        </li> -->
                        <li>
                            <span>风控模型/分数:</span>
                            <span> {{order.riskcontrolname}}/{{order.riskmanagementFraction}}</span>
                        </li>
                        <li>
                            <span>人审时间:</span>
                            <span> {{order.user.operationTime}}</span>
                        </li>
                        <li>
                            <span>审核人员:</span>
                            <span>{{order.user.account}}</span>
                        </li>
                        <li>
                            <span>贷款方式:</span>
                            <span> {{order.borrowMoneyWay}}</span>
                        </li>
                        <li>
                            <span>还款期数:</span>
                            <span> {{order.borrowTimeLimit}}</span>
                        </li>
                        <li>
                            <span>实借/放款:</span>
                            <span> {{order.orderdetails.makeLoans}}/{{order.orderdetails.realityAccount}} </span>
                        </li>
                        <li>
                            <span>总利息/总还款:</span>
                            <span> {{order.orderdetails.interestInAll}}/{{order.repaymentMoney}} </span>
                        </li>
                        <li>
                            <span>延期次数/延期金额:</span>
                            <span> {{order.deferrTime}}/ {{order.deferrMoney}}</span>
                        </li>
                        <li>
                            <span>每次延期天数:</span>
                            <span>{{order.postponeDate}} </span>
                        </li>
                        <li>
                            <span>延期前还款时间:</span>
                            <span>{{order.shouldReturnTime}} </span>
                        </li>
                        <li>
                            <span>延期后还款时间:</span>
                            <span> {{order.deferAfterReturntime}}</span>
                        </li>
                    </ul>
                </el-dialog>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                tableData: [],
                sourceList: [],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                orderDetailDialogVisible: false,
                order: {user: {}, orderdetails: {}},
                form: {
                    ordernumber: "",
                    name: "",
                    phone: "",
                    registestarttime: '',
                    registeendtime: ''
                }
            }
        },
        beforeCreate() {
            var that = this;
            if (!!that.$route.query.value && !!that.$route.query.key) {
                var param = {};
                param.companyid = window.localStorage.getItem("companyid");
                param.page = 1;
                param.name = that.$route.query.key;
                param.phone = that.$route.query.value;
                that.axios.get('/order/queryAllordersByLike', {
                    params: param
                }).then(res => {
                    that.tableData = res.data.listorders;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    that.form.name = that.$route.query.key;
                    that.form.phone = that.$route.query.value;
                })
            } else {
                that.axios.get('/order/queryAllordersByLike', {
                    params: {companyid: window.localStorage.getItem("companyid"), page: 1}
                }).then(res => {
                    that.sourceList = res.data.listsource;
                    that.tableData = res.data.listorders;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                })
            }

        },
        methods: {
            Reset() {
                this.form = {
                    ordernumber: "",
                    name: "",
                    phone: "",
                    registestarttime: '',
                    registeendtime: ''
                }
            },
            dateChangeStart(val) {
                var that = this;
                that.form.registestarttime = val;
            },
            dateChangeEnd(val) {
                var that = this;
                that.form.registeendtime = val;
            },
            jumpCustomerInfo() {
                var that = this;
                that.$router.push('/personalInformation')
            },
            Search() {
                var that = this;
                if (!!that.form.phone && that.form.phone.length != 11) {
                    this.$message({
                        type: "error",
                        message: '请输入11位手机号'
                    });
                    return false;
                }
                var param = that.form;
                param.companyid = window.localStorage.getItem("companyid");
                param.page = that.page;
                that.axios.get('/order/queryAllordersByLike', {
                    params: param
                }).then(res => {
                    that.tableData = res.data.listorders;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                })
            },
            currentChange(page) {
                var that = this;
                that.page = page;
                that.Search();
            },
            orderDetailShow(object) {
                var that = this;
                that.order = object;
                that.orderDetailDialogVisible = true;
            }

        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .custom {
        text-align: center;
        line-height: 40px;
        width: 20%;
    }

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .single {
        margin-left: -15px;
    }
</style>
