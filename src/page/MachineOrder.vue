<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是机审订单</p> -->
        <div class="back">
            <h2>机审订单</h2>
            <div class="main">
                <el-form :model="form" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="申请编号" v-model="form.applynumber"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="姓名" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="手机号" v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-col>
                            <el-date-picker
                                type="date"
                                placeholder="申请起始时间"
                                value-format="yyyy-MM-dd"
                                @change="dateChangeStart"
                                v-model="form.applytimestart"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col>
                            <el-date-picker
                                type="date"
                                placeholder="申请结束时间"
                                value-format="yyyy-MM-dd"
                                @change="dateChangeEnd"
                                v-model="form.applytimeend"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset"
                                   style="background-color:#e3e4e7;border:transparent;color:#000">重置
                        </el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;line-height: 60px"
                >
                    <el-table-column prop="applynumber" label="申请编号" align="center"></el-table-column>
                    <el-table-column prop="applytime" label="申请时间" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="sourcename" label="渠道" align="center"></el-table-column>
                    <el-table-column prop="registeclient" label="客户端" align="center"></el-table-column>
                    <el-table-column prop="rmModleName" label="风控" align="center"></el-table-column>
                    <el-table-column prop="riskControlPoints" label="风控分数" align="center"></el-table-column>
                    <el-table-column prop="shareOfStateName" label="机审结果" align="center"></el-table-column>
                    <el-table-column label="认证信息详情" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{path:'/personalInformation',query:{id:scope.row.id}}">
                                <el-button type="primary">查看</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page.sync="page"
                        :page-size.sync="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
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
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                form: {
                    applynumber: "",
                    name: "",
                    phone: "",
                    applytimestart: "",
                    applytimeend: ""
                }
            };
        },
        beforeCreate() {
            var that = this;
            that.axios
                .get("/order/queryAllUser", {
                    params: {companyId: window.localStorage.getItem("companyid"), page: 1}
                })
                .then(res => {
                    that.tableData = res.data.listuser;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    that.totalCount = res.data.pageutil.totalCount;
                    for (var i = 0; i < that.tableData.length; i++) {
                        if (that.tableData[i].shareOfState == 0) {
                            that.tableData[i].shareOfStateName = "机审未通过";
                        } else if (that.tableData[i].shareOfState == 1) {
                            that.tableData[i].shareOfStateName = "需要人工审核";
                        } else if (that.tableData[i].shareOfState == 2) {
                            that.tableData[i].shareOfStateName = "机审通过";
                        } else if (that.tableData[i].shareOfState == 3) {
                            that.tableData[i].shareOfStateName = "人审未通过";
                        } else if (that.tableData[i].shareOfState == 4) {
                            that.tableData[i].shareOfStateName = "人审通过";
                        }
                    }
                });
        },
        methods: {
            Reset() {
                this.form = {
                    applynumber: "",
                    name: "",
                    phone: "",
                    applytimestart: "",
                    applytimeend: ""
                };
            },
            dateChangeStart(val) {
                var that = this;
                that.form.applytimestart = val;
            },
            dateChangeEnd(val) {
                var that = this;
                that.form.applytimeend = val;
            },
            Search() {
                var that = this;
                var param = that.form;
                if (!!param.phone && param.phone.length != 11) {
                    this.$message({
                        type: "error",
                        message: '请输入11位手机号'
                    });
                    return false;
                }
                param.companyId = window.localStorage.getItem("companyid");
                param.page = that.page;
                that.axios.get("/order/queryAllUser", {
                    params: param
                }).then(res => {
                    that.tableData = res.data.listuser;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    that.totalCount = res.data.pageutil.totalCount;
                    for (var i = 0; i < that.tableData.length; i++) {
                        if (that.tableData[i].shareOfState == 0) {
                            that.tableData[i].shareOfStateName = "机审未通过";
                        } else if (that.tableData[i].shareOfState == 1) {
                            that.tableData[i].shareOfStateName = "需要人工审核";
                        } else if (that.tableData[i].shareOfState == 2) {
                            that.tableData[i].shareOfStateName = "机审通过";
                        } else if (that.tableData[i].shareOfState == 3) {
                            that.tableData[i].shareOfStateName = "人审未通过";
                        } else if (that.tableData[i].shareOfState == 4) {
                            that.tableData[i].shareOfStateName = "人审通过";
                        }
                    }
                });
            },
            currentChange(page) {
                var that = this;
                that.page = page;
                that.Search();
            },
            registerShow() {
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

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
