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
                            <el-date-picker type="date" placeholder="实借起始时间" v-model="formList.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实借结束时间" v-model="formList.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="应还起始时间" v-model="formList.deferBeforeReturntimeStatu_time" value-format="yyyy-MM-dd" @change="start"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="应还结束时间" v-model="formList.deferBeforeReturntimeEnd_time" value-format="yyyy-MM-dd" @change="end"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实还起始时间" v-model="formList.realtimeStatu_time" value-format="yyyy-MM-dd" @change="started"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实还结束时间" v-model="formList.realtimeEnd_time" value-format="yyyy-MM-dd" @change="ended"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="逾期等级" v-model="formList.level">
                            <el-option v-for="item in level" :key="item.value" :label="item.grade" :value="item.grade"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="注册客户端" v-model="formList.registeClient">
                            <el-option label="安卓Android端" value="android"></el-option>
                            <el-option label="苹果IOS端" value="ios"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column :resizable='false' prop="orderNumber" label="订单编号" width="140" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="name" label="姓名" align="center" width="80"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="手机号" align="center" width="120"></el-table-column>
                    <el-table-column :resizable='false' prop="registeClient" label="客户端" align="center" width="90"></el-table-column>
                    <el-table-column :resizable='false' prop="sourceName" label="渠道" align="center" width="90"></el-table-column>
                    <el-table-column :resizable='false' prop="borrowMoneyWay" label="贷款方式" align="center" width="100"></el-table-column>
                    <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期数" align="center" width="55"></el-table-column>
                    <el-table-column :resizable='false' prop="orderCreateTime" label="实借时间" align="center" width="180"></el-table-column>
                    <el-table-column :resizable='false' prop="realityAccount" label="实借金额" width="100" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="makeLoans" label="放款金额" width="100" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="shouldReturnTime" label="应还时间" align="center" width="180"></el-table-column>
                    <el-table-column :resizable='false' prop="overdueGrade" label="逾期等级" align="center" width="70"></el-table-column>
                    <el-table-column :resizable='false' prop="overdueNumberOfDays" label="逾期天数" align="center" width="60"></el-table-column>
                    <el-table-column :resizable='false' prop="interestPenaltySum" label="逾期罚金" width="100" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="order_money" label="应还金额" width="100" align="center"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="page" :page-size="Pagesize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount" :total="totalCount" @current-change="currentChange"></el-pagination>
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
            currentChange(val){
                this.page = val;
              this.getData(this.page, this.Pagesize)
            },
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
                this.axios.get("postloanor/CollectionOrderSum", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.page = res.data.pageutil.page;
                    this.Pagesize = res.data.pageutil.pageSize;
                    this.totalCount = res.data.pageutil.totalCount;
                    this.totalPageCount = res.data.pageutil.totalPageCount;
                });
            },
            get() {
                this.axios.get("operation/YuqiM", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
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
                this.axios.get("postloanor/CollectionOrderSum", {
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
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.page = res.data.pageutil.page;
                    this.Pagesize = res.data.pageutil.pageSize;
                    this.totalCount = res.data.pageutil.totalCount;
                    this.totalPageCount = res.data.pageutil.totalPageCount;
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
