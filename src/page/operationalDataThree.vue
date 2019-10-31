<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>逾期数据</h2>
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
                        <el-select placeholder="引流渠道" v-model="form.platform">
                            <el-option v-for="item in platform" :key="item.value" :label="item.drainageOfPlatformName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column :resizable='false' prop="orderCreateTime" label="日期" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="collection_count" label="逾期笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="makeLoans" label="逾期本金" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="interestPenaltySum" label="逾期罚息" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="beoverdue" label="催收笔数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="passrate" label="催收次数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="chenggNum" label="催收成功数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="chenggData" label="催收成功率(%)" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="baddebt" label="坏账数" align="center"></el-table-column>
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
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0
            };
        },
        created() {
            this.getData(this.page, this.Pagesize);
            this.get();
        },
        methods: {
            Reset() {
                var that = this;
                that.form = {}
            },
            timeChange(val) {
                // console.log(val)
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            getData(page, Pagesize) {
                this.axios.get("operation/CollectionData", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.page = res.data.PageUtil.page;
                    this.pageSize = res.data.PageUtil.pageSize;
                    this.totalCount = res.data.PageUtil.totalCount;
                    this.totalPageCount = res.data.PageUtil.totalPageCount
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
            currentChange(val) {
              this.page = val;
              this.Search();
            },
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
                that.downloadExcel("/operation/CollectionDataexport", param, '逾期数据');
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                this.axios.get("operation/CollectionData", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page:this.page,
                        start_time: start,
                        end_time: end,
                        drainageOfPlatformId: this.form.platform
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.page = res.data.PageUtil.page;
                    this.pageSize = res.data.PageUtil.pageSize;
                    this.totalCount = res.data.PageUtil.totalCount;
                    this.totalPageCount = res.data.PageUtil.totalPageCount
                });
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
</style>
