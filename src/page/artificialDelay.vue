<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是银行卡自动扣款</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <template v-if="isInArray(33)">
                <el-tab-pane label="新增人工延期" name="first">
                    <div class="back">
                        <h2>新增人工延期</h2>
                        <div class="mains">
                            <el-form :model="form" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-input placeholder="手机号" v-model="form.phone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="身份证号" v-model="form.idcard"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Search">搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <table cellpadding="20" cellspacing="0" class="tab">
                                <tr>
                                    <th>订单编号</th>
                                    <td>
                                        <div>{{orderNumber}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>姓名</th>
                                    <td>
                                        <div>{{name}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>手机号</th>
                                    <td>
                                        <div>{{phone}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>身份证号</th>
                                    <td>
                                        <div>{{idcard_number}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>贷款方式</th>
                                    <td>
                                        <div>{{borrowMoneyWay}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>还款期数</th>
                                    <td>
                                        <div>{{borrowTimeLimit}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>实借时间</th>
                                    <td>
                                        <div>{{orderCreateTime}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>借款总金额/放款总金额</th>
                                    <td>
                                        <div class="red">{{realityAccount}}/{{makeLoans}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>应还时间</th>
                                    <td>
                                        <div>{{shouldReturnTime}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>逾期天数</th>
                                    <td>
                                        <div>{{overdueNumberOfDays}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>含逾总利息/扣款后应还总金额</th>
                                    <td>
                                        <div class="red">{{interestPenaltySum}}/{{realityBorrowMoney}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>逾期利息</th>
                                    <td>
                                        <div class="red">{{yuqimoney}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>放款流水号</th>
                                    <td>
                                        <div>{{pipelinenumber}}</div>
                                    </td>
                                </tr>
                            </table>
                            <table cellpadding="20" cellspacing="0" class="tabs">
                                <tr>
                                    <th>延期开关</th>
                                    <td>
                                        <div>{{status}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>最多可延期次数</th>
                                    <td>
                                        <div>{{maximumCanDeferredTime}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>单次延期天数</th>
                                    <td>
                                        <div>{{onceDeferredDay}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>单次延期费用（元）</th>
                                    <td>
                                        <div>{{onceDeferredMoney}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>逾期多少天前可延期</th>
                                    <td>
                                        <div>{{overdueHowdayCanDeferred}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>该用户已延期次数/金额</th>
                                    <td>
                                        <div>{{defeNum}}/{{defeMoney}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>人工延期设置说明</th>
                                    <td>
                                        <div class="text">
                                            1.因为用户超过"最多可延期次数"或其他原因，会导致"延期"按钮不可点击
                                            2.此功能是人工替代用户延期的设置，将我们工作人员已经从用户线下收到款输入到"线下已缴纳延期费"
                                            3.保存后用户APP端将在"已延期次数"的基础上自动增加1次延期
                                            4.请确保线下已收到款，否则免费为用户延期
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>线下已缴纳延期费</th>
                                    <td>
                                        <el-input-number placeholder="保留两位小数" v-model="num" :min="yuqimoney"></el-input-number>
                                    </td>
                                </tr>
                                <tr>
                                    <th>备注</th>
                                    <td class="table-high-light2">
                                        <el-input v-model="desc"></el-input>
                                    </td>
                                </tr>
                            </table>
                            <el-button type="warning" class="save" @click="resetText">重置</el-button>
                            <el-popover placement="bottom" width="300" v-model="visible">
                                <p>保存后，用户APP端将自动增加一次延期，请确保已经收到款，否则为该用户免费延期</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button @click="visible = false" class="left">返回</el-button>
                                    <el-button type="success" @click="save">是的</el-button>
                                </div>
                                <el-button type="primary" slot="reference" class="save">添加并保存</el-button>
                            </el-popover>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(34)">
                <el-tab-pane label="人工延期记录" name="second">
                    <div class="back">
                        <h2>人工延期记录</h2>
                        <div class="main">
                            <el-form :model="formList" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-input placeholder="用户订单" v-model="formList.id"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="用户姓名" v-model="formList.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="手机号" v-model="formList.phone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="起始时间" v-model="formList.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="结束时间" v-model="formList.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                    <el-button type="primary" @click="Searchs">搜索</el-button>
                                    <el-button type="danger" @click="downloadSource">下载</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                                <el-table-column :resizable='false' prop="operating_time" label="操作时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="account" label="操作人" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="orderId" label="用户订单" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="name" label="用户姓名" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="idcard_number" label="身份证号" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="deferAfterReturntime" label="设置前延期后应还时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="overdueNumberOfDays" label="逾期天数" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="设置前已延期次数/金额" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.defeNum}}/{{scope.row.defeMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="extensionfee" label="线下已缴纳延期费" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="remarks" label="备注" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="delay_time" label="设置后延期应还时间" align="center"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    :current-page="page"
                                    :page-size="Pagesize"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCount"
                                    :total="totalCount"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
        </el-tabs>
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
                activeName: "first",
                form: {
                    idcard: "",
                    phone: ""
                },
                formList: {
                    name: "",
                    id: "",
                    phone: "",
                    start: "",
                    end: ""
                },
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                orderId: "",
                visible: false,
                orderNumber: "",
                name: "",
                phone: "",
                idcard_number: "",
                borrowMoneyWay: "",
                borrowTimeLimit: "",
                orderCreateTime: "",
                realityBorrowMoney: "",
                realityAccount: '',
                makeLoans: "",
                deferAfterReturntime: "",
                overdueNumberOfDays: "",
                interestPenaltySum: "",
                realityBorrowMoney: "",
                yuqimoney: '',
                shouldReturnTime: '',
                pipelinenumber: "",
                status: "",
                maximumCanDeferredTime: "",
                onceDeferredDay: "",
                onceDeferredMoney: "",
                overdueHowdayCanDeferred: "",
                defeNum: "",
                defeMoney: "",
                num: "",
                desc: ""
            }
        },
        created() {
            if (this.isInArray(34)) {
                this.getData()
            }
        },
        methods: {
            resetText() {
                this.orderId = '';
                this.orderNumber = '';
                this.shouldReturnTime = '';
                this.name = '';
                this.phone = '';
                this.idcard_number = '';
                this.realityAccount = '';
                this.borrowMoneyWay = '';
                this.borrowTimeLimit = '';
                this.orderCreateTime = '';
                this.realityBorrowMoney = '';
                this.makeLoans = '';
                this.deferAfterReturntime = '';
                this.overdueNumberOfDays = '';
                this.interestPenaltySum = '';
                this.yuqimoney = '';
                this.realityBorrowMoney = '';
                this.pipelinenumber = '';
                this.num = '';
                this.desc = '';
            },
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            timeChange(val) {
                // console.log(val)
                this.formList.start = val
            },
            endChange(val) {
                this.formList.end = val
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            Reset() {
                this.formList = {
                    name: "",
                    id: "",
                    phone: "",
                    start: "",
                    end: ""
                }
            },
            getData() {
                this.axios.get('fina/CompanyDelay', {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    // this.status = res.data.Deferred_settings.status
                    if (res.data.Deferred_settings.status == 1) {
                        this.status = "开启"
                    } else {
                        this.status = "关闭"
                    }
                    this.maximumCanDeferredTime = res.data.Deferred_settings.maximumCanDeferredTime
                    this.overdueHowdayCanDeferred = res.data.Deferred_settings.overdueHowdayCanDeferred
                })
            },
            get(page, Pagesize) {
                this.axios.get('fina/Delaylabor', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Offlinedelay
                    this.page = res.data.Offlinedelay.page
                    this.Pagesize = res.data.Offlinedelay.Pagesize
                    this.totalCount = res.data.Offlinedelay.length
                })
            },
            handleClick(tab, event) {
                if (this.activeName == "second") {
                    this.get(this.page, this.Pagesize)
                }
            },
            Search() {
                this.axios.get('fina/OrderAcount', {
                    params: {
                        phone: this.form.phone,
                        idcard_number: this.form.idcard,
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    if (res.data.Orderdetails == '无数据') {
                        this.$message({
                            type: "error",
                            message: "无数据"
                        });
                        return false;
                    }
                    this.orderId = res.data.Orderdetails.orderId
                    this.orderNumber = res.data.Orderdetails.orderNumber
                    this.name = res.data.Orderdetails.name
                    this.phone = res.data.Orderdetails.phone
                    this.idcard_number = res.data.Orderdetails.idcard_number
                    this.borrowMoneyWay = res.data.Orderdetails.borrowMoneyWay
                    this.borrowTimeLimit = res.data.Orderdetails.borrowTimeLimit
                    this.orderCreateTime = res.data.Orderdetails.orderCreateTime
                    this.realityBorrowMoney = res.data.Orderdetails.realityBorrowMoney
                    this.makeLoans = res.data.Orderdetails.makeLoans
                    this.deferAfterReturntime = res.data.Orderdetails.deferAfterReturntime
                    this.shouldReturnTime = res.data.Orderdetails.shouldReturnTime
                    this.overdueNumberOfDays = res.data.Orderdetails.overdueNumberOfDays
                    this.interestPenaltySum = res.data.Orderdetails.interestPenaltySum
                    this.yuqimoney = res.data.Orderdetails.yuqimoney
                    this.realityBorrowMoney = res.data.Orderdetails.realityBorrowMoney
                    this.pipelinenumber = res.data.Orderdetails.pipelinenumber
                    this.defeNum = res.data.Orderdetails.defeNum
                    this.defeMoney = res.data.Orderdetails.defeMoney
                    this.realityAccount = res.data.Orderdetails.realityAccount
                    this.onceDeferredDay = res.data.Orderdetails.borrowTimeLimit
                    this.onceDeferredMoney = res.data.Orderdetails.technicalServiceMoney
                })
            },
            save() {
                this.axios.get('fina/AddDelaylabor', {
                    params: {
                        extensionfee: this.num,
                        remarks: this.desc,
                        sys_userId: window.localStorage.getItem("userid"),
                        orderId: this.orderId,
                        onceDeferredDay: this.onceDeferredDay
                    }
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "操作成功"
                    });
                    this.orderId = undefined
                    this.orderNumber = undefined
                    this.name = undefined
                    this.phone = undefined
                    this.idcard_number = undefined
                    this.borrowMoneyWay = undefined
                    this.borrowTimeLimit = undefined
                    this.orderCreateTime = undefined
                    this.realityBorrowMoney = undefined
                    this.makeLoans = undefined
                    this.deferAfterReturntime = undefined
                    this.overdueNumberOfDays = undefined
                    this.interestPenaltySum = undefined
                    this.yuqimoney = undefined
                    this.realityBorrowMoney = undefined
                    this.pipelinenumber = undefined
                    this.defeNum = undefined
                    this.defeMoney = undefined
                    this.realityAccount = undefined
                    this.shouldReturnTime = undefined
                    this.num = undefined
                    this.desc = undefined
                    this.visible = false
                })
            },
            downloadSource() {
                var that = this;
                if (this.formList.start != "") {
                    var start = this.formList.start + " " + "00:00:00"
                }
                if (this.formList.end != "") {
                    var end = this.formList.end + " " + "23:59:59"
                }
                var param = {
                    companyId: window.localStorage.getItem("companyid"),
                    orderId: this.formList.id,
                    phone: this.formList.phone,
                    name: this.formList.name,
                    statu_time: start,
                    end_time: end
                }
                that.downloadExcel("/fina/Delaylaborexport", param, '人工延期记录');
            },
            Searchs() {
                if (this.formList.start != "") {
                    var start = this.formList.start + " " + "00:00:00"
                }
                if (this.formList.end != "") {
                    var end = this.formList.end + " " + "23:59:59"
                }
                this.axios.get('fina/Delaylabor', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderId: this.formList.id,
                        phone: this.formList.phone,
                        name: this.formList.name,
                        statu_time: start,
                        end_time: end
                    }
                }).then(res => {
                    this.tableData = res.data.Offlinedelay
                    this.totalCount = res.data.Offlinedelay.length
                })
            }

        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .el-tabs__header {
        margin: 0;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .mains {
        padding: 20px;
        background-color: #fff;
        min-height: 100vh;
    }

    .single {
        margin-left: -15px;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .tab {
        width: 50%;
        border-color: #dfe6ec;
        float: left;
        margin-right: -2px;
    }

    .tabs {
        width: 50%;
        border-color: #dfe6ec;
    }

    .tabs td .el-input .el-input__inner {
        background-color: #f3f6fb;
        border: transparent;
    }

    .tab th {
        width: 50%;
        text-align: left;
    }

    .tabs th {
        width: 50%;
        text-align: left;
    }

    .tab td {
        text-align: center;
    }

    .tabs td {
        text-align: center;
    }

    .tab td div {
        margin-top: -10px;
        margin-bottom: -10px;
        width: 90%;
        height: 40px;
        line-height: 40px;
        background-color: #f3f6fb;
    }

    .tabs td div {
        margin-bottom: -10px;
        width: 90%;
        min-height: 40px;
        line-height: 40px;
        background-color: #f3f6fb;
    }

    .tabs td div.text {
        line-height: 20px;
    }

    .inpu {
        width: 70%;
        margin-top: -10px;
        margin-bottom: -10px;
    }

    .save {
        margin-top: 20px;
        float: right;
        width: 100px;
        margin-right: 20%;
    }

    .el-popover p {
        font-size: 16px;
        margin-bottom: 15px;
    }

    .table-high-light2 .el-input {
        border: 1px solid red;
    }

    .el-input-number {
        border: 1px solid red;
    }
</style>
