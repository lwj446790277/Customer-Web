<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">待人审订单</p> -->
        <div class="back">
            <h2>待人审订单</h2>
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
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="申请起始时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeStart"
                                            v-model="form.applytimestart"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="申请结束时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeEnd"
                                            v-model="form.applytimeend"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset"
                                   style="background-color:#e3e4e7;border:transparent;color:#000">重置
                        </el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 40px">
                    <el-table-column prop="applynumber" label="申请编号" align="center"></el-table-column>
                    <el-table-column prop="applytime" label="申请时间" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="sourcename" label="渠道" align="center"></el-table-column>
                    <el-table-column prop="rmModleName" label="风控" align="center"></el-table-column>
                    <el-table-column prop="riskControlPoints" label="风控分数" align="center"></el-table-column>
                    <el-table-column prop="shareOfStateName" label="机审结果" align="center"></el-table-column>
                    <el-table-column label="认证信息详情" align="center">
                        <el-button type="primary" @click="orderDetailShow()">查看</el-button>
                    </el-table-column>
                    <el-table-column label="审核操作" align="center">
                        <template slot-scope="scope">
                            <el-popover :ref="`popover+${scope.$index}`" placement="bottom-end" width="200"
                                        trigger="click">
                                <span class="content">确认通过该笔订单审核？</span>
                                <el-button class="confire" size="mini" type="success" @click="createOrder(scope)">通过
                                </el-button>
                                <el-button type="warning" size="mini" slot="reference">申请通过
                                </el-button>
                            </el-popover>
                            <el-popover :ref="`popover-${scope.$index}`" placement="bottom-end" width="200"
                                        trigger="click">
                                <span class="content">确认拒绝该笔订单审核？</span>
                                <el-button class="confire" size="mini" type="danger" @click="refuseOrder(scope)">拒绝
                                </el-button>
                                <el-button type="danger" size="mini" slot="reference">申请拒绝
                                </el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page.sync="page"
                        :page-size.sync="pageSize"
                        layout="total,  prev, pager, next, jumper"
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
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                tableData: [{}],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                refuseVisible: false,
                form: {
                    applynumber: "",
                    name: "",
                    phone: "",
                    applytimestart: "",
                    applytimeend: "",
                }
            }
        },
        beforeCreate() {
            // var that = this;
            // that.axios.get('/order/queryAllUserPeople', {
            //     params: {companyId: window.localStorage.getItem("companyid"), page: 1}
            // }).then(res => {
            //     that.tableData = res.data.listuser;
            //     that.page = res.data.pageutil.page;
            //     that.totalPageCount = res.data.pageutil.totalPageCount;
            //     that.totalCount = res.data.pageutil.totalCount;
            //     that.pageSize = res.data.pageutil.pageSize;
            //     for (var i = 0; i < that.tableData.length; i++) {
            //         if (that.tableData[i].shareOfState == 0) {
            //             that.tableData[i].shareOfStateName = "机审未通过";
            //         } else if (that.tableData[i].shareOfState == 1) {
            //             that.tableData[i].shareOfStateName = "需要人工审核";
            //         } else if (that.tableData[i].shareOfState == 2) {
            //             that.tableData[i].shareOfStateName = "机审通过";
            //         } else if (that.tableData[i].shareOfState == 3) {
            //             that.tableData[i].shareOfStateName = "人审未通过";
            //         } else if (that.tableData[i].shareOfState == 4) {
            //             that.tableData[i].shareOfStateName = "人审通过";
            //         }
            //     }
            // })
        },
        methods: {
            Reset() {
                this.form = {
                    applynumber: "",
                    name: "",
                    phone: "",
                    applytimestart: "",
                    applytimeend: "",
                }
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
                param.companyId = window.localStorage.getItem("companyid");
                param.page = that.page;
                that.axios.get('/order/queryAllUserPeople', {
                    params: param
                }).then(res => {
                    that.tableData = res.data.listuser;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
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
                })
            },
            createOrder(scope) {
                var that = this;
                var object = scope.row;
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                that.axios.get('/order/updateShareOfState', {
                    params: {userid: object.id, sysuserid: window.localStorage.getItem('userid')}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '人工审核通过成功'
                    });
                    that.Search();
                })
            },
            refuseOrder(scope) {
                var that = this;
                var object = scope.row;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                that.axios.get('/order/updateShareOfStateNo', {
                    params: {userid: object.id, sysuserid: window.localStorage.getItem('userid')}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '人工审核拒绝成功'
                    });
                    that.Search();
                })
            },
            orderDetailShow() {
            },
            currentChange(page) {
                var that = this;
                that.page = page;
                that.Search();
            },
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
