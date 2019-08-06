<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>已逾期订单</h2>
            <div class="main">
                <el-form :model="formList" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="订单编号" v-model="formList.id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="姓名" v-model="formList.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="手机号" v-model="formList.phone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实借起始时间" v-model="formList.start"
                                            value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实借结束时间" v-model="formList.end"
                                            value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="延期前应还起始时间"
                                v-model="formList.deferBeforeReturntimeStatu_time"
                                value-format="yyyy-MM-dd" @change="start"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="延期前应还结束时间"
                                v-model="formList.deferBeforeReturntimeEnd_time"
                                value-format="yyyy-MM-dd" @change="end"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="延期后应还起始时间"
                                v-model="formList.deferAfterReturntimeStatu_time"
                                value-format="yyyy-MM-dd" @change="starts"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="延期后应还结束时间"
                                v-model="formList.deferAfterReturntimeEnd_time"
                                value-format="yyyy-MM-dd" @change="ends"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="实还起始时间"
                                v-model="formList.realtimeStatu_time"
                                value-format="yyyy-MM-dd" @change="started"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实还结束时间" v-model="formList.realtimeEnd_time"
                                            value-format="yyyy-MM-dd" @change="ended"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="逾期等级" v-model="formList.level">
                            <el-option
                                v-for="item in level"
                                :key="item.value"
                                :label="item.grade"
                                :value="item.grade"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="注册客户端" v-model="formList.registeClient">
                            <el-option label="安卓Android端" value="android"></el-option>
                            <el-option label="苹果IOS端" value="ios"></el-option>
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
                    <el-table-column prop="orderNumber" label="订单编号" width="93" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="registeClient" label="客户端类型" align="center"></el-table-column>
                    <el-table-column prop="drainageOfPlatformName" label="引流渠道" width="93"
                                     align="center"></el-table-column>
                    <el-table-column prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
                    <el-table-column prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
                    <el-table-column prop="orderCreateTime" label="实借时间" width="93" align="center"></el-table-column>
                    <el-table-column
                        prop="realityBorrowMoney/makeLoans"
                        label="实借总金额/放贷总金额"
                        width="120"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="deferAfterReturntime" label="延期后应还时间" width="93"
                                     align="center"></el-table-column>
                    <el-table-column prop="address" label="本期应还利息/本期应还金额" width="140" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.interestOnArrears}}/{{scope.row.makeLoans}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="overdueGrade" label="逾期等级" width="93" align="center"></el-table-column>
                    <el-table-column prop="overdueNumberOfDays" label="逾期天数" width="93"
                                     align="center"></el-table-column>
                    <el-table-column prop="address" label="逾期罚金/应还总金额" width="110" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.interestPenaltySum}}/{{scope.row.order_money}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="collectionStatus" label="还款状态" width="93" align="center"></el-table-column>
                    <el-table-column prop="realtime" label="实还时间" width="93" align="center"></el-table-column>
                    <el-table-column prop="address" label="剩余未还金额/实还总金额" width="130" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.surplus_money}}/{{scope.row.realityAccount}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page="page"
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
                level: [],
                formList: {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: "",
                    deferBeforeReturntimeStatu_time: "",
                    deferBeforeReturntimeEnd_time: "",
                    deferAfterReturntimeStatu_time: "",
                    deferAfterReturntimeEnd_time: "",
                    realtimeStatu_time: "",
                    realtimeEnd_time: "",
                    level: "",
                    registeClient: ""
                },
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0
            };
        },
        created() {
            this.getData(this.page, this.Pagesize);
            this.get();
        },
        methods: {
            timeChange(val) {
                this.formList.start = val
            },
            endChange(val) {
                this.formList.end = val
            },
            start(val) {
                this.formList.deferBeforeReturntimeStatu_time = val
            },
            end(val) {
                this.formList.deferBeforeReturntimeEnd_time = val
            },
            starts(val) {
                this.formList.deferAfterReturntimeStatu_time = val
            },
            ends(val) {
                this.formList.deferAfterReturntimeEnd_time = val
            },
            started(val) {
                this.formList.realtimeStatu_time = val
            },
            ended(val) {
                this.formList.realtimeEnd_time = val
            },
            getData(page, Pagesize) {
                this.axios
                    .get("postloanor/CollectionOrderSum", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            page,
                            Pagesize
                        }
                    })
                    .then(res => {
                        this.tableData = res.data.Orderdetails;
                        this.page = res.data.Orderdetails.page;
                        this.Pagesize = res.data.Orderdetails.Pagesize;
                        this.totalCount = res.data.Orderdetails.length;
                    });
            },
            get() {
                this.axios
                    .get("operation/YuqiM", {
                        params: {
                            companyId: window.localStorage.getItem("companyid")
                        }
                    })
                    .then(res => {
                        this.level = res.data.OverdueClass;
                    });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            Reset() {
                this.formList = {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: "",
                    deferBeforeReturntimeStatu_time: "",
                    deferBeforeReturntimeEnd_time: "",
                    deferAfterReturntimeStatu_time: "",
                    deferAfterReturntimeEnd_time: "",
                    realtimeStatu_time: "",
                    realtimeEnd_time: "",
                    level: "",
                    registeClient: ""
                };
            },
            Search() {
                if (this.formList.start != "") {
                    var start = this.formList.start + " " + "00:00:00"
                }
                if (this.formList.end != "") {
                    var end = this.formList.end + " " + "23:59:59"
                }
                if (this.formList.deferBeforeReturntimeStatu_time != "") {
                    var deferBeforeReturntimeStatu_time = this.formList.deferBeforeReturntimeStatu_time + " " + "00:00:00"
                }
                if (this.formList.deferBeforeReturntimeEnd_time != "") {
                    var deferBeforeReturntimeEnd_time = this.formList.deferBeforeReturntimeEnd_time + " " + "23:59:59"
                }
                if (this.formList.deferAfterReturntimeStatu_time != "") {
                    var deferAfterReturntimeStatu_time = this.formList.deferAfterReturntimeStatu_time + " " + "00:00:00"
                }
                if (this.formList.deferAfterReturntimeEnd_time != "") {
                    var deferAfterReturntimeEnd_time = this.formList.deferAfterReturntimeEnd_time + " " + "23:59:59"
                }
                if (this.formList.realtimeStatu_time != "") {
                    var realtimeStatu_time = this.formList.realtimeStatu_time + " " + "00:00:00"
                }
                if (this.formList.realtimeEnd_time != "") {
                    var realtimeEnd_time = this.formList.realtimeEnd_time + " " + "23:59:59"
                }
                this.axios
                    .get("postloanor/CollectionOrderSum", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            orderNumber: this.formList.id,
                            name: this.formList.name,
                            phone: this.formList.phone,
                            overdueGrade: this.formList.level,
                            start_time: start,
                            end_time: end,
                            deferBeforeReturntimeStatu_time: deferBeforeReturntimeStatu_time,
                            deferBeforeReturntimeEnd_time: deferBeforeReturntimeEnd_time,
                            deferAfterReturntimeStatu_time: deferAfterReturntimeStatu_time,
                            deferAfterReturntimeEnd_time: deferAfterReturntimeEnd_time,
                            realtimeStatu_time: realtimeStatu_time,
                            realtimeEnd_time: realtimeEnd_time,
                            registeClient: this.formList.registeClient
                        }
                    })
                    .then(res => {
                        this.tableData = res.data.Orderdetails;
                        this.totalCount = res.data.Orderdetails.length;
                    });
            }
        }
    }
</script>

<style lang="less">
    @import "../style/mixin";

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
</style>
