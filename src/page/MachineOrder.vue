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
                        <el-select placeholder="订单状态" v-model="form.state">
                            <el-option label="有效" value="0"></el-option>
                            <el-option label="无效 " value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="机审结果" v-model="form.shareOfState">
                            <el-option label="未通过" value="0"></el-option>
                            <el-option label="已通过 " value="2"></el-option>
                        </el-select>
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
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                        <!--<a type="button" class="el-button&#45;&#45;danger" href="http://192.168.0.111:8080/zhita_xiaodai_admin/order/export.do">下载</a>-->
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                    <el-table-column :resizable='false' prop="applynumber" label="申请编号" align="center" width="130"></el-table-column>
                    <el-table-column :resizable='false' prop="applytime" label="申请时间" align="center" width='180'></el-table-column>
                    <el-table-column :resizable='false' prop="name" label="姓名" align="center" width="80"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="手机号" align="center" width="120"></el-table-column>
                    <el-table-column :resizable='false' prop="stateName" label="状态" align="center" width="70"></el-table-column>
                    <el-table-column :resizable='false' prop="sourcename" label="渠道" align="center" width='90'></el-table-column>
                    <el-table-column :resizable='false' prop="registeclient" label="客户端" align="center" width='90'></el-table-column>
                    <el-table-column :resizable='false' prop="canBorrowLines" label="可借额度" align="center" width="130"></el-table-column>
                    <el-table-column :resizable='false' prop="rmModleName" label="风控" align="center" width='80'></el-table-column>
                    <el-table-column :resizable='false' prop="riskControlPoints" label="风控分" align="center" width='80'></el-table-column>
                    <el-table-column :resizable='false' prop="shareOfStateName" label="机审结果" align="center" width='110'></el-table-column>
                    <el-table-column :resizable='false' label="认证信息" align="center" width='180'>
                        <template slot-scope="scope">
                            <router-link :to="{path:'/personalInformation',query:{id:scope.row.id}}">
                                <el-button type="primary">查看</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' label="审核操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-popover v-if="scope.row.shareOfState==0" :ref="`popover+${scope.$index}`" placement="bottom-end" width="200" trigger="click">
                                <span class="content">确认通过该笔订单审核？</span>
                                <el-button class="confire" size="mini" type="success" @click="createOrder(scope)">通过</el-button>
                                <el-button type="warning" slot="reference" style="width: 100px;">申请通过</el-button>
                            </el-popover>
                            <el-popover v-if="scope.row.shareOfState==2" :ref="`popover-${scope.$index}`" placement="bottom-end" width="200" trigger="click">
                                <span class="content">确认拒绝该笔订单审核？</span>
                                <el-button class="confire" size="mini" type="danger" @click="refuseOrder(scope)">拒绝</el-button>
                                <el-button type="danger" slot="reference" style="width: 60px;">拒绝</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
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
            that.axios.get("/order/queryAllUser", {
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
