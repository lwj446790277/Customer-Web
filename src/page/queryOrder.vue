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
                        <el-select placeholder="订单状态" v-model="form.orderstatus">
                            <el-option label="已还" value="0"></el-option>
                            <el-option label="未还" value="1"></el-option>
                            <el-option label="失败" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="详细订单状态" v-model="form.orderstatusdetail">
                            <el-option label="期限中" value="0"></el-option>
                            <el-option label="已逾期" value="1"></el-option>
                            <el-option label="已还款" value="3"></el-option>
                            <el-option label="已坏账" value="4"></el-option>
                            <el-option label="放款中" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="客户状态" v-model="form.clientstatus">
                            <el-option label="老客户" value="0"></el-option>
                            <el-option label="新客户" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="订单起始时间" value-format="yyyy-MM-dd" @change="dateChangeStart" v-model="form.orderstarttime"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="订单结束时间" value-format="yyyy-MM-dd" @change="dateChangeEnd" v-model="form.orderendtime"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="应还起始时间" value-format="yyyy-MM-dd" @change="dateChangeStart2" v-model="form.shouldstarttime"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="应还结束时间" value-format="yyyy-MM-dd" @change="dateChangeEnd2" v-model="form.shouldendtime"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="引流平台" v-model="form.sourcename">
                            <el-option v-for="source in sourceList" :label="'引流平台 '+source.sourcename" :value="source.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
                    <el-table-column :resizable='false' prop="orderNumber" label="订单编号" align="center" width="140"></el-table-column>
                    <el-table-column :resizable='false' prop="user.name" label="姓名" align="center" width="80"></el-table-column>
                    <el-table-column :resizable='false' prop="user.phone" label="手机号" align="center" width="130"></el-table-column>
                    <el-table-column :resizable='false' prop="user.registeclient" label="客户端" align="center" width="90"></el-table-column>
                    <el-table-column :resizable='false' prop="user.registetime" label="注册时间" align="center" width="120"></el-table-column>
                    <el-table-column :resizable='false' prop="orderCreateTime" label="订单时间" align="center" width="120"></el-table-column>
                    <el-table-column :resizable='false' prop="orderStatusName" label="订单状态" align="center" width="80"></el-table-column>
                    <el-table-column :resizable='false' prop="user.sourcename" label="渠道" align="center" width="90"></el-table-column>
                    <!--  <el-table-column :resizable='false' prop="riskcontrolname" label="风控" align="center" width="80"></el-table-column>
                      <el-table-column :resizable='false' prop="riskmanageme延期和扣款查询ntFraction" label="风控分" align="center"></el-table-column>
                      <el-table-column :resizable='false' prop="user.account" label="审核员" align="center" width="80"></el-table-column>
                      <el-table-column :resizable='false' prop="borrowMoneyWay" label="贷款方式" align="center" width="100"></el-table-column>-->
                    <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期限" align="center" width="55"></el-table-column>
                    <el-table-column :resizable='false' prop="howManyTimesBorMoney" label="借款次数" align="center" width="55"></el-table-column>
                    <el-table-column :resizable='false' prop="orderdetails.makeLoans" label="放款金额" align="center" width="80"></el-table-column>
                    <el-table-column :resizable='false' prop="deferrTime" label="延期次数" align="center" width="55"></el-table-column>
                    <el-table-column :resizable='false' prop="deferrMoney" label="延期金额" align="center" width="70"></el-table-column>
                    <el-table-column :resizable='false' prop="orderdetails.interestInAll" label="总利息" align="center" width="100"></el-table-column>
                    <el-table-column :resizable='false' prop="shourldmoney" label="初始应还" align="center" width="100"></el-table-column>
                    <el-table-column :resizable='false' prop="realshourldmoney" label="实际应还" align="center" width="100"></el-table-column>
                    <el-table-column :resizable='false' prop="accmoney" label="减免金额" align="center" width="70"></el-table-column>
                    <el-table-column :resizable='false' prop="repaymentMoney" label="实际还款" align="center" width="100"></el-table-column>
                    <el-table-column :resizable='false' prop="shouldReturnTime" label="应还时间" align="center" width="120"></el-table-column>
                    <el-table-column :resizable='false' prop="realtime" label="实还时间" align="center" width="120"></el-table-column>
                    <el-table-column :resizable='false' label="认证信息" align="center" width="100">
                        <template slot-scope="scope">
                            <router-link :to="{path:'/personalInformation',query:{id:scope.row.userId}}">
                                <el-button type="primary" size="mini" style="width: 60px;">查看</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' label="借款详情" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" style="width: 60px;" @click="orderDetailShow(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="借款信息" :visible="orderDetailDialogVisible" customClass="custom">
                    <ul class="ul" style="text-align: left">
                        <li>
                            <div class="span-div">
                                <span>订单编号:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.orderNumber}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>姓名:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.user.name}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>手机号:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.user.phone}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>注册时间:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.user.registetime}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>订单时间:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.orderCreateTime}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>引流渠道:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.user.sourcename}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>风控模型/分数:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.riskcontrolname}}/{{order.riskmanagementFraction}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>人审时间:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.user.operationTime}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>审核人员:</span>
                            </div>
                            <div class="span-div">
                                <span>{{order.user.account}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>贷款方式:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.borrowMoneyWay}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>还款期数:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.borrowTimeLimit}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>实借/放款:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.orderdetails.realityAccount}}/{{order.orderdetails.makeLoans}} </span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>总利息/总还款:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.orderdetails.interestInAll}}/{{order.repaymentMoney}} </span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>延期次数/延期金额:</span>
                            </div>
                            <div class="span-div">
                                <span> {{order.deferrTime}}/ {{order.deferrMoney}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>每次延期天数:</span>
                            </div>
                            <div class="span-div">
                                <span>{{order.postponeDate}} </span>
                            </div>
                        </li>
                        <li>
                            <div class="span-div">
                                <span>应还时间:</span>
                            </div>
                            <div class="span-div">
                                <span>{{order.shouldReturnTime}} </span>
                            </div>
                        </li>
                        <li style="float: right;margin-bottom: 10px">
                            <el-button @click="orderDetailDialogVisible = false">关闭</el-button>
                        </li>
                    </ul>
                </el-dialog>
                <div class="block">
                    <el-pagination v-if="pageShow" :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount" :total="totalCount"
                                   @current-change="currentChange"></el-pagination>
                    <div v-if="!pageShow">查询中...</div>
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
                pageShow: true,
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
                    orderstarttime: '',
                    orderendtime: '',
                    shouldstarttime: '',
                    shouldendtime: '',
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
                    for (var i = 0; i < that.tableData.length; i++) {
                        switch (that.tableData[i].orderStatus) {
                            case '1':
                                that.tableData[i].orderStatusName = "已逾期";
                                break;
                            case '2':
                                that.tableData[i].orderStatusName = "已延期";
                                break;
                            case '3':
                                that.tableData[i].orderStatusName = "已还款";
                                break;
                            case '4':
                                that.tableData[i].orderStatusName = "已坏账";
                                break;
                            case '0':
                                that.tableData[i].orderStatusName = "期限中";
                                break;
                            case '5':
                                that.tableData[i].orderStatusName = "放款中";
                                break;
                            default:
                                that.tableData[i].orderStatusName = that.tableData[i].orderStatus;
                                break;
                        }

                        if (!that.tableData[i].user.account) {
                            that.tableData[i].user.account = "机审";
                        }
                        if (!that.tableData[i].deferrTime) {
                            that.tableData[i].deferrTime = 0;
                        }
                        if (!that.tableData[i].deferrMoney) {
                            that.tableData[i].deferrMoney = 0;
                        }
                        if (!that.tableData[i].repaymentMoney) {
                            that.tableData[i].repaymentMoney = 0;
                        }
                        if (!that.tableData[i].user.operationTime || that.tableData[i].user.operationTime == 0) {
                            that.tableData[i].user.operationTime = '暂无';
                        }
                        if (!that.tableData[i].user.account) {
                            that.tableData[i].user.account = '暂无';
                        }

                        if (!that.tableData[i].repaymentMoney) {
                            that.tableData[i].repaymentMoney = 0;
                        }
                        if (!that.tableData[i].deferrTime) {
                            that.tableData[i].deferrTime = 0;
                        }
                        if (!that.tableData[i].deferrMoney) {
                            that.tableData[i].deferrMoney = 0;
                        }
                        if (!that.tableData[i].postponeDate) {
                            that.tableData[i].postponeDate = 0;
                        }
                        if (!that.tableData[i].deferAfterReturntime || that.tableData[i].deferAfterReturntime == 0) {
                            that.tableData[i].deferAfterReturntime = '暂无';
                        }
                        if (!that.tableData[i].deferBeforeReturntime || that.tableData[i].deferBeforeReturntime == 0) {
                            that.tableData[i].deferBeforeReturntime = '暂无';
                        }
                        if (!that.tableData[i].realtime || that.tableData[i].realtime == 0) {
                            that.tableData[i].realtime = '暂无';
                        }
                    }
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
                    for (var i = 0; i < that.tableData.length; i++) {
                        switch (that.tableData[i].orderStatus) {
                            case '1':
                                that.tableData[i].orderStatusName = "已逾期";
                                break;
                            case '2':
                                that.tableData[i].orderStatusName = "已延期";
                                break;
                            case '3':
                                that.tableData[i].orderStatusName = "已还款";
                                break;
                            case '4':
                                that.tableData[i].orderStatusName = "已坏账";
                                break;
                            case '0':
                                that.tableData[i].orderStatusName = "期限中";
                                break;
                            case '5':
                                that.tableData[i].orderStatusName = "放款中";
                                break;
                            default:
                                that.tableData[i].orderStatusName = that.tableData[i].orderStatus;
                                break;
                        }

                        if (!that.tableData[i].user.account) {
                            that.tableData[i].user.account = "机审";
                        }
                        if (!that.tableData[i].deferrTime) {
                            that.tableData[i].deferrTime = 0;
                        }
                        if (!that.tableData[i].deferrMoney) {
                            that.tableData[i].deferrMoney = 0;
                        }
                        if (!that.tableData[i].repaymentMoney) {
                            that.tableData[i].repaymentMoney = 0;
                        }

                        if (!that.tableData[i].user.operationTime || that.tableData[i].user.operationTime == 0) {
                            that.tableData[i].user.operationTime = '暂无';
                        }
                        if (!that.tableData[i].user.account) {
                            that.tableData[i].user.account = '暂无';
                        }

                        if (!that.tableData[i].repaymentMoney) {
                            that.tableData[i].repaymentMoney = 0;
                        }
                        if (!that.tableData[i].deferrTime) {
                            that.tableData[i].deferrTime = 0;
                        }
                        if (!that.tableData[i].deferrMoney) {
                            that.tableData[i].deferrMoney = 0;
                        }
                        if (!that.tableData[i].postponeDate) {
                            that.tableData[i].postponeDate = 0;
                        }
                        if (!that.tableData[i].deferAfterReturntime || that.tableData[i].deferAfterReturntime == 0) {
                            that.tableData[i].deferAfterReturntime = '暂无';
                        }
                        if (!that.tableData[i].deferBeforeReturntime || that.tableData[i].deferBeforeReturntime == 0) {
                            that.tableData[i].deferBeforeReturntime = '暂无';
                        }
                        if (!that.tableData[i].realtime || that.tableData[i].realtime == 0) {
                            that.tableData[i].realtime = '暂无';
                        }
                    }
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
                }
            },
            dateChangeStart(val) {
                var that = this;
                that.form.orderstarttime = val;
            },
            dateChangeEnd(val) {
                var that = this;
                that.form.orderendtime = val;
            },
            dateChangeStart2(val) {
                var that = this;
                that.form.shouldstarttime = val;
            },
            dateChangeEnd2(val) {
                var that = this;
                that.form.shouldendtime = val;
            },
            jumpCustomerInfo() {
                var that = this;
                that.$router.push('/personalInformation')
            },
            downloadSource() {
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
                that.downloadExcel("/order/exportorder.do", param, '订单查询报表');
            },
            Search() {
                var that = this;
                if (!!that.form.phone && that.form.phone.length != 11) {
                    this.$message({
                        type: "error",
                        message: '请输入11位手机号'
                    });
                    that.pageShow = true;
                    return false;
                }
                var param = that.form;
                param.companyid = window.localStorage.getItem("companyid");
                param.page = that.page;
                that.axios.get('/order/queryAllordersByLike', {
                    params: param
                }).then(res => {
                    that.tableData = res.data.listorders;
                    for (var i = 0; i < that.tableData.length; i++) {
                        switch (that.tableData[i].orderStatus) {
                            case '1':
                                that.tableData[i].orderStatusName = "已逾期";
                                break;
                            case '2':
                                that.tableData[i].orderStatusName = "已延期";
                                break;
                            case '3':
                                that.tableData[i].orderStatusName = "已还款";
                                break;
                            case '4':
                                that.tableData[i].orderStatusName = "已坏账";
                                break;
                            case '0':
                                that.tableData[i].orderStatusName = "期限中";
                                break;
                            case '5':
                                that.tableData[i].orderStatusName = "放款中";
                                break;
                            default:
                                that.tableData[i].orderStatusName = that.tableData[i].orderStatus;
                                break;
                        }
                        if (!that.tableData[i].user.account) {
                            that.tableData[i].user.account = "机审";
                        }
                        if (!that.tableData[i].deferrTime) {
                            that.tableData[i].deferrTime = 0;
                        }
                        if (!that.tableData[i].deferrMoney) {
                            that.tableData[i].deferrMoney = 0;
                        }
                        if (!that.tableData[i].repaymentMoney) {
                            that.tableData[i].repaymentMoney = 0;
                        }

                        if (!that.tableData[i].user.operationTime || that.tableData[i].user.operationTime == 0) {
                            that.tableData[i].user.operationTime = '暂无';
                        }
                        if (!that.tableData[i].user.account) {
                            that.tableData[i].user.account = '暂无';
                        }

                        if (!that.tableData[i].repaymentMoney) {
                            that.tableData[i].repaymentMoney = 0;
                        }
                        if (!that.tableData[i].deferrTime) {
                            that.tableData[i].deferrTime = 0;
                        }
                        if (!that.tableData[i].deferrMoney) {
                            that.tableData[i].deferrMoney = 0;
                        }
                        if (!that.tableData[i].postponeDate) {
                            that.tableData[i].postponeDate = 0;
                        }
                        if (!that.tableData[i].deferAfterReturntime || that.tableData[i].deferAfterReturntime == 0) {
                            that.tableData[i].deferAfterReturntime = '暂无';
                        }
                        if (!that.tableData[i].deferBeforeReturntime || that.tableData[i].deferBeforeReturntime == 0) {
                            that.tableData[i].deferBeforeReturntime = '暂无';
                        }
                        if (!that.tableData[i].realtime || that.tableData[i].realtime == 0) {
                            that.tableData[i].realtime = '暂无';
                        }
                    }
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    that.pageShow = true;
                })
            },
            currentChange(page) {
                var that = this;
                that.page = page;
                that.pageShow = false;
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

    .span-div {
        width: 50%;
        float: left;
    }

    .custom {
        text-align: center;
        line-height: 25px;
        width: 20%;
        height: 100%;
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
