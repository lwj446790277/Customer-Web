<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="main">
            <el-form :model="form" :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="起始时间" v-model="form.start"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item class="single">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="结束时间" v-model="form.end"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table border :data="_tableData" show-summary tooltip-effect="dark" style="width: 100%">
                <!-- <el-table-column type="index" align="center"></el-table-column> -->
                <el-table-column :resizable='false' prop="date" label="日期" align="center"></el-table-column>
                <el-table-column :resizable='false' prop="income" label="收入金额" align="center"></el-table-column>
                <el-table-column :resizable='false' prop="expenditure" label="支出金额" align="center"></el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    :current-page="page"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-count="totalPageCount"
                    :total="totalCount"
                    @size-change="sizeChange"
                    @current-change="currentChange"
                ></el-pagination>
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
                tableData: [
                    {id: 1, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 2, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 3, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 4, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 5, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 6, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 7, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 8, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 9, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 10, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 11, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 12, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 13, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 14, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 15, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 16, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 17, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 18, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 19, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 20, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 21, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 22, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 23, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 24, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 25, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 26, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 27, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 28, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 29, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 30, date: "2019-02-05", income: 20, expenditure: 30},
                    {id: 31, date: "2019-02-05", income: 20, expenditure: 30},
                ],
                form: {
                    start: "",
                    end: ""
                },
                page: 1,
                pageSize: 10,
                //   totalPageCount: 0,
                //   totalCount: 0,
            };
        },
        methods: {
            sizeChange(val) {
                //   this.getData(this.page, this.pageSize);
                console.log(val)
                this.pageSize = val
            },
            currentChange(val) {
                console.log(val)
                //   this.getData(this.page, this.pageSize);
            },
            Search() {
            }
        },
        computed: {
            totalCount() {
                return this.tableData.length;
            },
            totalPageCount() {
                return Math.ceil(this.totalCount / this.pageSize);
            },
            _tableData() {
                let start = (this.page - 1) * this.pageSize;
                let end = start + this.pageSize;
                return this.tableData.slice(start, end);
            },
            value() {
                return this.tableData.length;
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .main {
        padding: 20px;
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

    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
</style>
