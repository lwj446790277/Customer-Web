<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>放款实时流水</h2>
            <div class="main">
                <!-- <p class="explain_text">这里是支付记录</p> -->
                <el-form :model="form" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="订单编号" v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="姓名" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="手机号" v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="起始时间" v-model="form.start"
                                            value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="结束时间" v-model="form.end" value-format="yyyy-MM-dd"
                                            @change="endChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.qudao" placeholder="放款渠道" style="width:150px">
                            <el-option
                                v-for="item in Thirdparty_interface"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset"
                                   style="background-color:#e3e4e7;border:transparent;color:#000">重置
                        </el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column prop="remittanceTime" label="流水号时间" align="center"></el-table-column>
                    <el-table-column prop="sourceName" label="放款渠道" align="center"></el-table-column>
                    <el-table-column prop="pipelinenumber" label="放款流水号" align="center"></el-table-column>
                    <el-table-column prop="paymentmoney" label="放款金额" align="center"></el-table-column>
                    <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="address" label="订单查询" align="center">
                        <template slot-scope="scope">
                            <span class="blue" @click="jie(scope.row.orderId)">借款信息</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    title="借款信息"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    customClass="custom"
                    center
                >
                    <table cellpadding="10" cellspacing="0" class="bow">
                        <tr>
                            <th>订单编号:</th>
                            <td>
                                <div>{{id}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>姓名:</th>
                            <td>
                                <div>{{name}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>手机号:</th>
                            <td>
                                <div>{{phone}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>注册时间:</th>
                            <td>
                                <div>{{register}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>订单时间:</th>
                            <td>
                                <div>{{order}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>引流渠道:</th>
                            <td>
                                <div>{{drainage}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>风控模型/分数:</th>
                            <td>
                                <div>{{risk}}/{{grade}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>贷款方式:</th>
                            <td>
                                <div>{{loan}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>还款期数:</th>
                            <td>
                                <div>{{repayment}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>实借/放款:</th>
                            <td>
                                <div>{{real}}/{{discharge}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>借款时间:</th>
                            <td>
                                <div>{{borr}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>总利息/总还款:</th>
                            <td>
                                <div>{{interest}}/{{still}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>延期次数/延期金额:</th>
                            <td>
                                <div>{{num}}/{{money}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>每次延期天数:</th>
                            <td>
                                <div>{{date}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>延期前还款时间:</th>
                            <td>
                                <div>{{betime}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>延期后还款时间:</th>
                            <td>
                                <div>{{aftime}}</div>
                            </td>
                        </tr>
                    </table>
                </el-dialog>
                <div class="block">
                    <el-pagination
                        :current-page.sync="page"
                        :page-size.sync="Pagesize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from "../components/headTop";

    export default {
        components: {
            headTop
        },
        data() {
            return {
                tableData: [],
                borrow: [],
                Thirdparty_interface: [],
                thirdparty_id: "",
                form: {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: "",
                    qudao: ""
                },
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                centerDialogVisible: false,
                id: "",
                name: "",
                phone: "",
                register: "",
                order: "",
                drainage: "",
                audit: "",
                risk: "",
                grade: "",
                trial: "",
                examine: "",
                loan: "",
                repayment: "",
                real: "",
                discharge: "",
                borr: "",
                interest: "",
                still: "",
                num: "",
                money: "",
                date: "",
                betime: "",
                aftime: ""
            };
        },
        created() {
            this.getData(this.page, this.Pagesize);
            this.get();
        },
        methods: {
            timeChange(val) {
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            getData(page, Pagesize) {
                this.axios
                    .get("fina/Allpayment_record", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            page,
                            Pagesize
                        }
                    })
                    .then(res => {
                        this.tableData = res.data.PaymentRecord;
                        this.page = res.data.PaymentRecord.page;
                        this.Pagesize = res.data.PaymentRecord.Pagesize;
                        this.totalCount = res.data.PaymentRecord.length;
                    });
            },
            get() {
                this.axios
                    .get("fina/ThirdpatyAll", {
                        params: {
                            compayId: window.localStorage.getItem("companyid")
                        }
                    })
                    .then(res => {
                        this.Thirdparty_interface = res.data.Loan_setting;
                    });
            },
            Reset() {
                this.form = {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: "",
                    qudao: ""
                };
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                this.axios.get("fina/Allpayment_record", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.form.id,
                        phone: this.form.phone,
                        name: this.form.name,
                        thirdparty_id: this.form.qudao,
                        start_time: start,
                        end_time: end
                    }
                })
                    .then(res => {
                        this.tableData = res.data.PaymentRecord;
                        this.totalCount = res.data.PaymentRecord.length;
                    })
            },
            jie(orderId) {
                this.centerDialogVisible = true;
                this.axios
                    .get("fina/PaymentOrder", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            orderId
                        }
                    })
                    .then(res => {
                        this.borrow = res.data.Orderdetails;
                        this.id = res.data.Orderdetails.orderNumber; //订单编号
                        this.name = res.data.Orderdetails.name; //姓名
                        this.phone = res.data.Orderdetails.phone; //手机号
                        this.register = res.data.Orderdetails.registeTime; //注册时间
                        this.order = res.data.Orderdetails.orderCreateTime; //订单时间
                        this.drainage = res.data.Orderdetails.drainageOfPlatformName; //引流渠道
                        // this.audit = res.data.Orderdetails.phone                          //机审时间
                        this.risk = res.data.Orderdetails.riskcontrolname; //风控模型
                        this.grade = res.data.Orderdetails.riskControlPoints; //分数
                        // this.trial = res.data.Orderdetails.phone                          //人审时间
                        // this.examine = res.data.Orderdetails.phone                        //审核人员
                        this.loan = res.data.Orderdetails.borrowMoneyWay; //贷款方式
                        this.repayment = res.data.Orderdetails.borrowTimeLimit; //还款期数
                        this.real = res.data.Orderdetails.realityBorrowMoney; //实借
                        this.discharge = res.data.Orderdetails.makeLoans; //放款
                        this.borr = res.data.Orderdetails.orderCreateTime; //借款时间
                        this.interest = res.data.Orderdetails.interestSum; //总利息
                        this.still = res.data.Orderdetails.order_money; //总还款
                        this.num = res.data.Orderdetails.delayTimes; //延期次数
                        this.money = res.data.Orderdetails.interestOnArrears; //延期金额
                        this.date = res.data.Orderdetails.onceDeferredDay; //每次延期天数
                        this.betime = res.data.Orderdetails.deferBeforeReturntime; //延期前还款时间
                        this.aftime = res.data.Orderdetails.deferAfterReturntime; //延期后还款时间
                    });
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";
    // .explain_text {
    //   margin-top: 20px;
    //   text-align: center;
    //   font-size: 20px;
    //   color: #333;
    // }
    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .input {
        width: 200px;
        margin-right: 30px;
    }

    .right {
        float: right;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .single {
        margin-left: -15px;
    }

    .blue {
        color: blue;
        cursor: pointer;
    }

    .custom {
        text-align: center;
        width: 30%;
    }

    .custom .el-dialog__header {
        background-color: #1c8de0;
        padding-top: 10px;
        padding-bottom: 10px;
        color: #fff;
    }

    .custom .el-dialog__headerbtn .el-dialog__close {
        color: #fff;
    }

    .custom .el-dialog__headerbtn .el-dialog__close:hover {
        color: #ccc;
    }

    .custom .el-dialog__title {
        color: #fff;
        font-weight: normal;
    }

    .bow {
        width: 90%;
        margin: 0 auto;
    }

    .bow tr th {
        text-align: left;
        width: 50%;
    }

    .bow tr td div {
        width: 90%;
        height: 30px;
        line-height: 30px;
        background-color: #f3f6fb;
    }
</style>
