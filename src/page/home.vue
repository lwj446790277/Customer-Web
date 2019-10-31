<template>
    <div>
        <head-top></head-top>
        <el-tabs v-model="activeName" type="card" class="firstcon" @tab-click="handleClick">
            <template v-if="isInArray(1)">
                <el-tab-pane label="总视窗" name="first">
                    <div class="back">
                        <el-button size="small" @click="reSearch()"><strong>刷新</strong>
                        </el-button>

                        <div class="mains">
                            <div class="background">
                                <div class="lefts"></div>
                                <span class="today">当日数据统计</span>
                                <table class="all">
                                    <tr>
                                        <td>当日放款总额</td>
                                        <td>当日放款人数</td>
                                        <td>当日注册人数</td>
                                        <td>当日申请人数</td>
                                        <td>当日订单回款率</td>
                                        <td>今日放款新客</td>
                                        <td>今日放款复贷</td>
                                    </tr>
                                    <tr>
                                        <th>{{one}}</th>
                                        <th>{{two}}</th>
                                        <th>{{three}}</th>
                                        <th>{{four}}</th>
                                        <th>{{orderrepaytodaycvr}}</th>
                                        <th>{{todayloannew}}</th>
                                        <th>{{todayloanold}}</th>
                                    </tr>
                                </table>
                                <table class="all fif">
                                    <tr>
                                        <td>当日回款总额</td>
                                        <td>当日回款笔数</td>
                                        <td>当日延期笔数</td>
                                        <td>当日逾后已还笔数</td>
                                        <td>当日逾后已还金额</td>
                                    </tr>
                                    <tr>
                                        <th>{{five}}</th>
                                        <th>{{six}}</th>
                                        <th>{{seven}}</th>
                                        <th>{{eight}}</th>
                                        <th>{{nine}}</th>
                                    </tr>
                                </table>
                                <div class="leftl"></div>
                                <span class="today">累计数据统计</span>
                                <table class="all fif">
                                    <tr>
                                        <td>累计放款总金额</td>
                                        <td>累计回款总金额</td>
                                        <td>累计减免总金额</td>
                                        <td>累计应收总金额</td>
                                        <td>累计实际收益</td>
                                        <td>订单回款率</td>


                                    </tr>
                                    <tr>
                                        <th>{{first}}</th>
                                        <th>{{second}}</th>
                                        <th>{{annulmoney}}</th>
                                        <th>{{sixth}}</th>
                                        <th>{{seventh}}</th>
                                        <th>{{tenth}}</th>
                                    </tr>
                                </table>
                                <table class="all fif">
                                    <tr>
                                        <td>用户申请笔数</td>
                                        <td>已注册用户总数</td>
                                        <td>放款总笔数</td>
                                        <td>放款通过率</td>
                                        <td>回款总笔数</td>
                                    </tr>
                                    <tr>
                                        <th>{{forth}}</th>
                                        <th>{{third}}</th>
                                        <th>{{fifth}}</th>
                                        <th>{{ninth}}</th>
                                        <th>{{eighth}}</th>
                                    </tr>
                                </table>
                                <div class="lef">
                                    <div class="lefts"></div>
                                    <span class="today">逾前数据</span>
                                    <table class="all alls">
                                        <tr>
                                            <td>未还笔数</td>
                                            <td>未还总金额</td>
                                        </tr>
                                        <tr>
                                            <th>{{one_two}}</th>
                                            <th>{{one_three}}</th>
                                        </tr>
                                    </table>
                                </div>
                                <div class="righ">
                                    <div class="leftl"></div>
                                    <span class="today">逾后数据</span>
                                    <table class="all alls">
                                        <tr>
                                            <td>未还笔数</td>
                                            <td>逾期率</td>
                                            <td>未还总金额</td>
                                        </tr>
                                        <tr>
                                            <th>{{one_four}}</th>
                                            <th>{{one_five}}</th>
                                            <th>{{one_six}}</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(2)">
                <el-tab-pane label="回收视窗" name="second">
                    <div class="back">
                        <h2>回收视窗</h2>
                        <div class="main">
                            <el-date-picker type="date" placeholder="起始时间" v-model="start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                            <el-date-picker type="date" placeholder="结束时间" v-model="end" class="picker" value-format="yyyy-MM-dd"
                                            @change="endChange"></el-date-picker>
                            <el-button type="primary" @click="Search">搜索</el-button>
                            <el-button type="danger" @click="downloadSource">下载</el-button>
                            <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                                <el-table-column :resizable='false' prop="shouldtime" label="应还日期" width="120" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.shouldtime}}
                                    </span>
                                        <span v-else>{{scope.row.shouldtime}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="shouldorder" label="应还订单" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.shouldorder}}
                                    </span>
                                        <span v-else>{{scope.row.shouldorder}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="overduenotrepay" label="逾前未还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.overduenotrepay}}
                                    </span>
                                        <span v-else>{{scope.row.overduenotrepay}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="overduerepay" label="逾前已还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.overduerepay}}
                                    </span>
                                        <span v-else>{{scope.row.overduerepay}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="overdueafternotrepay" label="逾后未还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.overdueafternotrepay}}
                                    </span>
                                        <span v-else>{{scope.row.overdueafternotrepay}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="overdueafterrepay" label="逾后已还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.overdueafterrepay}}
                                    </span>
                                        <span v-else>{{scope.row.overdueafterrepay}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="baddebt" label="已坏账" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.baddebt}}
                                    </span>
                                        <span v-else>{{scope.row.baddebt}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="originalshouldmoney" label="原始应还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.originalshouldmoney}}
                                    </span>
                                        <span v-else>{{scope.row.originalshouldmoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="shouldmoney" label="实际应还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.shouldmoney}}
                                    </span>
                                        <span v-else>{{scope.row.shouldmoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="realymoney" label="线上实还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.realymoney}}
                                    </span>
                                        <span v-else>{{scope.row.realymoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="offrealymoney" label="线下实还" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.offrealymoney}}
                                    </span>
                                        <span v-else>{{scope.row.offrealymoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="deferredmoney" label="延期费" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.deferredmoney}}
                                    </span>
                                        <span v-else>{{scope.row.deferredmoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="overduemoney" label="逾期费" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.overduemoney}}
                                    </span>
                                        <span v-else>{{scope.row.overduemoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="deratemoney" label="线上减免" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.deratemoney}}
                                    </span>
                                        <span v-else>{{scope.row.deratemoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="offderatemoney" label="线下减免" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.offderatemoney}}
                                    </span>
                                        <span v-else>{{scope.row.offderatemoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="bankdeduction" label="银行扣款" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.bankdeduction}}
                                    </span>
                                        <span v-else>{{scope.row.bankdeduction}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="tobepaid" label="待还金额" width="100" align="center">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.tobepaid}}
                                    </span>
                                        <span v-else>{{scope.row.tobepaid}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="overduecvr" label="逾期率" align="center" width="100">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.overduecvr}}
                                    </span>
                                        <span v-else>{{scope.row.overduecvr}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="recovery" label="回收率" align="center" width="100">
                                    <template scope="scope">
                                    <span v-if="scope.row.shouldtime==todayString" style="color: red">
                                        {{scope.row.recovery}}
                                    </span>
                                        <span v-else>{{scope.row.recovery}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    :current-page="page"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCount"
                                    :total="totalCount"
                                    @size-change="sizeChange"
                                    @current-change="currentChange"
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
    import headTop from "../components/headTop";
    import {
        userCount,
        orderCount,
        getUserCount,
        getOrderCount,
        adminDayCount,
        adminCount
    } from "@/api/getData";

    export default {
        data() {
            return {
                tableData: [],
                activeName: "first",
                start: "",
                end: "",
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
                six: "",
                seven: "",
                eight: "",
                nine: "",
                first: "",
                second: "",
                third: "",
                forth: "",
                fifth: "",
                sixth: "",
                seventh: "",
                eighth: "",
                ninth: "",
                tenth: "",
                one_two: "",
                one_three: "",
                one_four: "",
                one_five: "",
                one_six: "",
                orderrepaytodaycvr: "",
                todayString: '',
                annulmoney: '',
                todayloanold:'',
                todayloannew:''
            };
        },
        components: {
            headTop
        },
        created() {
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
            var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            this.todayString = year + "-" + month + "-" + day;
            if (this.isInArray(1)) {
                this.getData()
            }
            if (this.isInArray(2)) {
                this.Search()
            }
        },
        methods: {
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            reSearch() {
                var that = this;
                that.getData(function () {
                    that.$message({
                        type: "success",
                        message: "刷新成功"
                    });
                })
            },
            timeChange(val) {
                // console.log(val)
                this.start = val
            },
            endChange(val) {
                this.end = val
            },
            get(page, pageSize) {
                this.axios.get('homepagetongji/recoveryStatement', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        pageSize
                    }
                }).then(res => {
                    this.tableData = res.data.listtongjito
                    this.page = res.data.pageutil.page
                    this.pageSize = res.data.pageutil.pageSize
                    this.totalCount = res.data.pageutil.totalCount
                    this.totalPageCount = res.data.pageutil.totalPageCount
                })
            },
            getData(func) {
                this.axios.get('homepagetongji/queryAll', {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    if (!res.data.todayloantotalmoney) {
                        res.data.todayloantotalmoney = 0
                    }
                    this.one = res.data.todayloantotalmoney
                    this.two = res.data.todayloan
                    this.three = res.data.todayregiste
                    this.four = res.data.todayapply
                    this.five = res.data.todayreturtoalmoney
                    this.six = res.data.todayrepayment
                    this.seven = res.data.todaydeferred
                    this.eight = res.data.todayoverdue
                    this.nine = res.data.todayoveruetotalmoney
                    this.first = res.data.payrecmoney
                    this.second = res.data.repaymoney
                    this.third = res.data.sumregiste
                    this.forth = res.data.sumapply
                    this.fifth = res.data.sumloan
                    this.sixth = res.data.shouldMoney
                    this.seventh = res.data.realymoney
                    this.eighth = res.data.sumrepayment
                    this.ninth = res.data.paymentpasscvr
                    this.tenth = res.data.orderrepaycvr
                    this.one_two = res.data.overdue
                    this.one_three = res.data.overduemoney
                    this.one_four = res.data.overdue1
                    this.one_five = res.data.overduecvr
                    this.one_six = res.data.overshouldMoney
                    this.annulmoney = res.data.annulmoney
                    this.orderrepaytodaycvr = res.data.orderrepaytodaycvr;
                    this.todayloannew = res.data.todayloannew;
                    this.todayloanold = res.data.todayloanold;
                    if (!!func) {
                        func();
                    }
                })
            },
            handleClick() {
                if (this.activeName == "second") {
                    this.get(this.page, this.pageSize)
                }
            },
            sizeChange() {
                //   this.getData(this.page, this.pageSize);
            },
            currentChange(val) {
                this.page = val;
                this.Search();
            },
            downloadSource() {
                var that = this;
                that.downloadExcel("/homepagetongji/exportRecoveryStatement.do", {
                    companyId: window.localStorage.getItem("companyid"),
                    shouldrepayStartTime: this.start,
                    shouldrepayEndTime: this.end,
                }, '回收数据报表');
            },
            Search() {
                this.axios.get('homepagetongji/recoveryStatement', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        shouldrepayStartTime: this.start,
                        shouldrepayEndTime: this.end,
                        page: this.page
                    }
                }).then(res => {
                    this.tableData = res.data.listtongjito
                    this.page = res.data.pageutil.page
                    this.pageSize = res.data.pageutil.pageSize
                    this.totalCount = res.data.pageutil.totalCount
                    this.totalPageCount = res.data.pageutil.totalPageCount
                })
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .el-tabs__header {
        margin: 0;
    }

    .mains {
        padding: 20px;
        margin-top: -20px;
        min-height: 70vh;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .background {
        // background-color: #eff2f7;
    }

    .lefts {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-top: 10px;
        background-color: #3278f9;
        margin-right: 10px;
        float: left;
    }

    .leftl {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #fb8b39;
        margin-top: 10px;
        margin-right: 10px;
        float: left;
    }

    .today {
        font-size: 1.1rem;
        line-height: 30px;
    }

    .all {
        width: 100%;
        margin: 10px auto;
        box-shadow: #ccc 0px 0px 5px;
        padding-top: 15px;
        padding-bottom: 15px;
        margin-top: 15px;
        margin-bottom: 20px;
        background-color: #fff;
    }

    .alls {
        width: 80%;
        margin: 10px 0;
    }

    .all tr th {
        line-height: 40px;
        font-size: 1.4rem;
        color: #3278f9;
    }

    .all tr td {
        line-height: 40px;
        color: #999;
        text-align: center;
    }

    .fif tr th {
        width: 20%;
    }

    .lef {
        width: 48%;
        float: left;
    }

    .righ {
        width: 48%;
        float: left;
    }

    // .el-tabs__content:nth-child(2){
    // 	margin-top: -15px;
    // 	background-color: #eff2f7;
    // }
    .firstcon .el-tabs__content:nth-last-child(2):first-child {
        margin-top: -15px;
        background-color: #eff2f7;
    }

    .picker {
        margin-left: -5px;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }
</style>
