<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>平台总数据</h2>
            <div class="main">
                <el-form :model="form" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="起始时间" v-model="form.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="结束时间" v-model="form.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="引流平台" v-model="form.platform">
                            <el-option v-for="item in platform" :key="item.value" :label="item.drainageOfPlatformName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%" fit>
                    <el-table-column :resizable='false' prop="remittanceTime" label="日期" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="gesamtbetragderDarlehen" label="总放款金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="zahlderGesamtdarlehen" label="总放款笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="gesamtbetragderRvckzahlung" label="总还款金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="gesamtbetragderNum" label="总还款笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="gesamtbetraguberfalligerBetrag" label="总逾期金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="gesamtbetraguberfallNum" label="总逾期笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="amountofbaddebts" label="总坏账金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="baddebt" label="总坏账笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="xianscount" label="线下减免条数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="paymentNum" label="今日放款新科" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="paymentNumId" label="今日放款复贷" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="repaymentNum" label="今日还款新客" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="repaymentNumId" label="今日还款复客" align="center"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page="page"
                        :page-size="Pagesize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
                        @size-change="sizeChange"
                        @current-change="currentChange"
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
                platform: [],
                form: {
                    start: "",
                    end: "",
                    platform: ""
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
            downloadSource() {
                var that = this;
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                var param = {
                    companyId: window.localStorage.getItem("companyid"),
                    start_time: start,
                    end_time: end,
                    drainageOfPlatformId: this.form.platform
                }
                that.downloadExcel("/operation/PlatformsNumexport", param, '平台总数据');
            },
            timeChange(val) {
                // console.log(val)
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            getData(page, Pagesize) {
                this.axios.get("operation/platformsNum", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Orders;
                    this.page = res.data.Orders.page;
                    this.Pagesize = res.data.Orders.Pagesize;
                    this.totalCount = res.data.Orders.length;
                    // this.totalPageCount = res.data.pageUtil.totalPage
                });
            },
            get() {
                this.axios.get("operation/AllDrainage", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    this.platform = res.data.Drainage_of_platform;
                });
            },
            sizeChange() {
                //   this.getData(this.page, this.pageSize);
            },
            currentChange() {
                //   this.getData(this.page, this.pageSize);
            },
            clear() {
                this.form = {
                    start: "",
                    end: "",
                    platform: ""
                };
            },
            Reset() {
                this.clear();
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                this.axios.get("operation/platformsNum", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        start_time: start,
                        end_time: end,
                        drainageOfPlatformId: this.form.platform
                    }
                }).then(res => {
                    this.tableData = res.data.Orders;
                    this.totalCount = res.data.Orders.length;
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
