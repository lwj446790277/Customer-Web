<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>延期和扣款查询</h2>
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
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column :resizable='false' prop="deferredTime" label="时间" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="orderNum" label="延期笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="deferredamount" label="延期费" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="userNum" label="银行扣款笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="deduction_money" label="银行扣款金额" align="center"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @current-change="currentChange" :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount"
                                   :total="totalCount"></el-pagination>
                </div>
                <!-- <p>{{this.tableData.id}}</p> -->
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
                form: {
                    start: "",
                    end: ""
                },
                visible: false,
                visibles: false,
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                resize: false
            };
        },
        created() {
            this.getData(this.page, this.pageSize);
        },
        methods: {
            currentChange(val) {
                this.page = val;
                this.Search();
            },
            timeChange(val) {
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            getData(page, pageSize) {
                this.axios.get("fina/DelayStatistics", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        pageSize
                    }
                }).then(res => {
                    this.tableData = res.data.Bankdeduction;
                    this.page = res.data.PageUtil.page;
                    this.pageSize = res.data.PageUtil.pageSize;
                    this.totalCount = res.data.PageUtil.totalCount;
                    this.totalPageCount = res.data.PageUtil.totalPageCount;
                });
            },
            Reset() {
                this.form = {
                    id: "",
                    name: "",
                    phone: "",
                    type: "",
                    account: ""
                };
            },
            downloadSource() {
                var that = this;
                if (this.form.start != "") {
                    var start = this.form.start
                }
                if (this.form.end != "") {
                    var end = this.form.end
                }
                var param = {
                    companyId: window.localStorage.getItem("companyid"),
                    startu_time: start,
                    end_time: end
                }
                that.downloadExcel("/fina/DelayStatisticsexport", param, '延期和扣款查询');
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start
                }
                if (this.form.end != "") {
                    var end = this.form.end
                }
                this.axios.get("fina/DelayStatistics", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        startu_time: start,
                        end_time: end,
                        page: this.page
                    }
                }).then(res => {
                    this.tableData = res.data.Bankdeduction;
                    this.page = res.data.PageUtil.page;
                    this.pageSize = res.data.PageUtil.pageSize;
                    this.totalCount = res.data.PageUtil.totalCount;
                    this.totalPageCount = res.data.PageUtil.totalPageCount;
                });
            },
            confire() {
                this.visible = false;
            },
            Return() {
                this.visibles = false;
            }
        }
    };
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

    .input {
        margin-left: 35px;
        margin-top: 15px;
        margin-bottom: 20px;
    }

    .confire {
        float: right;
    }

    .content {
        color: blue;
        cursor: pointer;
    }
</style>
