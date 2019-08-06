<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>注册用户信息</h2>
            <div class="table_container">
                <el-form :model="form" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入姓名" v-model="form.name" class="input"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入手机号" v-model="form.phone" class="input"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="注册客户端" v-model="form.registeClient">
                            <el-option label="安卓Android端" value="android"></el-option>
                            <el-option label="苹果IOS端" value="ios"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="注册起始时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeStart"
                                            v-model="form.registeTimeStart"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="注册结束时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeEnd"
                                            v-model="form.registeTimeEnd"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="个人信息认证" v-model="form.userattestationstatus">
                            <el-option label="个人信息认证 未认证" value="0"></el-option>
                            <el-option label="个人信息认证 已认证" value="1"></el-option>
                            <el-option label="个人信息认证 认证中" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="手机运营商认证" v-model="form.operaattestationstatus">
                            <el-option label="手机运营商认证 未认证" value="0"></el-option>
                            <el-option label="手机运营商认证 已认证" value="1"></el-option>
                            <el-option label="手机运营商认证 认证中" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="收款银行卡" v-model="form.bankattestationstatus">
                            <el-option label="收款银行卡 未认证" value="0"></el-option>
                            <el-option label="收款银行卡 已认证" value="1"></el-option>
                            <el-option label="收款银行卡 认证中" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset"
                                   style="background-color:#e3e4e7;border:transparent;color:#000">重置
                        </el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="registetime" label="注册时间" align="center"></el-table-column>
                    <el-table-column prop="registeclient" label="客户端" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="userattestationstatus" label="个人信用" width="130"
                                     align="center"></el-table-column>
                    <el-table-column prop="operaattestationstatus" label="运营商" width="140"
                                     align="center"></el-table-column>
                    <el-table-column prop="bankattestationstatus" label="银行卡" align="center"></el-table-column>
                    <!--      <el-table-column prop="address" label="芝麻授信" width="130" align="center"></el-table-column>-->
                    <el-table-column prop="address" label="认证信息" align="center">
                        <template slot-scope="scope">
                            <span class="blue" @click="refu(scope)">认证信息</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="借款信息" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{path:'/queryOrder',query:{key:scope.row.name,value:scope.row.phone}}">
                                <span class="blue">借款信息</span>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <el-popover placement="bottom-end" width="300" :ref="`popover-${scope.$index}`">
                                <span class="content">确认将该用户添加到黑名单吗？</span>
                                <el-button class="confire" type="danger" @click="confire(scope)">确定</el-button>
                                <span class="blue" slot="reference">添加黑名单</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page="page"
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
    import {getUserList, getUserCount} from "@/api/getData";

    export default {
        data() {
            return {
                form: {
                    name: "",
                    phone: "",
                    registeTimeStart: "",
                    registeTimeEnd: "",
                    userattestationstatus: "",
                    bankattestationstatus: "",
                    operaattestationstatus: "",
                    registeClient: ""
                },
                tableData: [{id: 1}],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                visible: false,
                value: ""
            };
        },
        components: {
            headTop
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/user/queryUserList', {
                params: {companyId: window.localStorage.getItem("companyid"), page: 1}
            }).then(res => {
                that.tableData = res.data.userlist;
                that.page = res.data.pageutil.page;
                that.totalPageCount = res.data.pageutil.totalPageCount;
                that.totalCount = res.data.pageutil.totalCount;
                that.pageSize = res.data.pageutil.pageSize;
                for (var i = 0; i < that.tableData.length; i++) {
                    that.tableData[i].userattestationstatus = that.tableData[i].userattestationstatus == 1 ? '已认证' : '未认证';
                    that.tableData[i].operaattestationstatus = that.tableData[i].operaattestationstatus == 1 ? '已认证' : '未认证';
                    that.tableData[i].bankattestationstatus = that.tableData[i].bankattestationstatus == 1 ? '已认证' : '未认证';
                }
            });
        },
        created() {
            // this.initData();
        },
        methods: {
            dateChangeStart(val) {
                var that = this;
                that.form.registeTimeStart = val;
            },
            dateChangeEnd(val) {
                var that = this;
                that.form.registeTimeEnd = val;
            },
            currentChange(val) {
                var that = this;
                that.page = val;
                that.Search();
            },
            Reset() {
                this.form = {
                    name: "",
                    phone: "",
                    registeTimeStart: "",
                    registeTimeEnd: "",
                    userattestationstatus: "",
                    bankattestationstatus: "",
                    operaattestationstatus: "",
                    registeClient: ""
                }
            },
            Search() {
                var that = this;
                if (!!that.form.phone && that.form.phone.length != 11) {
                    this.$message({
                        type: "error",
                        message: '请输入11位手机号'
                    });
                    return false;
                }
                var param = that.form;
                param.companyId = window.localStorage.getItem("companyid");
                param.page = that.page;
                that.axios.get('/user/queryUserList', {
                    params: param
                }).then(res => {
                    that.tableData = res.data.userlist;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    for (var i = 0; i < that.tableData.length; i++) {
                        that.tableData[i].userattestationstatus = that.tableData[i].userattestationstatus == 0 ? '未认证' : that.tableData[i].userattestationstatus == 1 ? '已认证' : '认证中';
                        that.tableData[i].operaattestationstatus = that.tableData[i].operaattestationstatus == 0 ? '未认证' : that.tableData[i].operaattestationstatus == 1 ? '已认证' : '认证中';
                        that.tableData[i].bankattestationstatus = that.tableData[i].bankattestationstatus == 0 ? '未认证' : that.tableData[i].bankattestationstatus == 1 ? '已认证' : '认证中';
                    }
                });
            },
            confire(scope) {
                var that = this;
                var id = scope.row.id;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                that.axios.get('/user/insertBlacklist', {
                    params: {
                        userId: id,
                        companyId: window.localStorage.getItem("companyid"),
                        operator: window.localStorage.getItem("userid")
                    }
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '拉黑成功'
                    });
                    that.Search();
                })
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .table_container {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .single {
        margin-left: -15px;
    }

    .select {
        display: block;
        margin-bottom: 20px;
    }

    .confire {
        float: right;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .blue {
        color: blue;
        cursor: pointer;
    }
</style>
