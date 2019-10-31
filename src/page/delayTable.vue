<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是机审订单</p> -->
        <div class="back">
            <h2>续借表</h2>
            <div class="main">
                <el-form :model="form" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-select placeholder="请选择渠道" v-model="form.channel"></el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-col>
                            <el-date-picker type="date" placeholder="放款起始时间" value-format="yyyy-MM-dd" @change="dateChangeStart" v-model="form.timeStart"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col>
                            <el-date-picker type="date" placeholder="放款结束时间" value-format="yyyy-MM-dd" @change="dateChangeEnd" v-model="form.timeEnd"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <!--  <el-button type="danger" @click="downloadSource">下载</el-button>-->
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                    <el-table-column :resizable='false' prop="applynumber" label="续借时间" align="center" width="130"></el-table-column>
                    <el-table-column :resizable='false' prop="applytime" label="续借手续费" align="center" width='180'></el-table-column>
                    <el-table-column :resizable='false' prop="name" label="续借笔数" align="center" width="80"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="老客续借手续费" align="center" width="120"></el-table-column>
                    <el-table-column :resizable='false' prop="stateName" label="老客续借笔数" align="center" width="70"></el-table-column>
                    <el-table-column :resizable='false' prop="sourcename" label="新客续借手续费" align="center" width='90'></el-table-column>
                    <el-table-column :resizable='false' prop="registeclient" label="新客续借笔数" align="center" width='90'></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount"
                                   :total="totalCount" @current-change="currentChange"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from "../components/headTop";
    import qs from 'qs'

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
                    applytimeend: "",
                }
            };
        },
        beforeCreate() {
            var that = this;
            that.axios.get("/", {
                params: {companyId: window.localStorage.getItem("companyid"), page: 1, state: 0}
            }).then(res => {
                that.tableData = res.data.listuser;
                that.page = res.data.pageutil.page;
                that.totalPageCount = res.data.pageutil.totalPageCount;
                that.pageSize = res.data.pageutil.pageSize;
                that.totalCount = res.data.pageutil.totalCount;
                for (var i = 0; i < that.tableData.length; i++) {
                    if (that.tableData[i].state == 0) {
                        that.tableData[i].stateName = '有效'
                    } else if (that.tableData[i].state == 1) {
                        that.tableData[i].stateName = '无效'
                    }

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
            createOrder(scope) {
                var that = this;
                var object = scope.row;
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                that.axios.get('/order/updateShareOfState', {
                    params: {
                        userid: object.id,
                        sysuserid: window.localStorage.getItem('userid'),
                        companyId: window.localStorage.getItem('companyid'),
                    }
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '人工审核通过成功'
                    });
                    that.Search();
                })
            },
            downloadSource() {
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
                that.downloadExcel("/order/export.do", param, '机审订单报表');
            },
            Reset() {
                this.form = {
                    applynumber: "",
                    name: "",
                    phone: "",
                    applytimestart: "",
                    applytimeend: ""
                };
            },
            refuseOrder(scope) {
                var that = this;
                var object = scope.row;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                that.axios.get('/order/updateShareOfStateNo', {
                    params: {
                        userid: object.id,
                        companyId: object.companyid,
                        sysuserid: window.localStorage.getItem('userid')
                    }
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '人工审核拒绝成功'
                    });
                    that.Search();
                })
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
                        if (that.tableData[i].state == 0) {
                            that.tableData[i].stateName = '有效'
                        } else if (that.tableData[i].state == 1) {
                            that.tableData[i].stateName = '无效'
                        }
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
