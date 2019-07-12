<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="form" :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="form.name" placeholder="姓名" style="width:150px">
                        <el-option label="姓名" value="姓名"></el-option>
                        <el-option label="手机号" value="手机号"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="single">
                    <el-input placeholder="单行输入" v-model="form.phone" class="input"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.time" placeholder="时间查询" style="width:150px">
                        <el-option label="注册时间" value="注册时间"></el-option>
                        <!-- <el-option label="应还时间" value="应还时间"></el-option>
                        <el-option label="实还时间" value="实还时间"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item class="single">
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
                    <el-select placeholder="个人信息认证" v-model="form.news">
                        <el-option label="未认证" value="未认证"></el-option>
                        <el-option label="认证中" value="认证中"></el-option>
                        <el-option label="需要重新认证" value="需要重新认证"></el-option>
                        <el-option label="已认证" value="已认证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="手机运营商认证" v-model="form.mobile">
                        <el-option label="未认证" value="未认证"></el-option>
                        <el-option label="认证中" value="认证中"></el-option>
                        <el-option label="需要重新认证" value="需要重新认证"></el-option>
                        <el-option label="已认证" value="已认证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="芝麻信用认证" v-model="form.credit">
                        <el-option label="未认证" value="未认证"></el-option>
                        <el-option label="认证中" value="认证中"></el-option>
                        <el-option label="需要重新认证" value="需要重新认证"></el-option>
                        <el-option label="已认证" value="已认证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="收款银行卡" v-model="form.alipay">
                        <el-option label="免认证" value="免认证"></el-option>
                        <el-option label="未认证" value="未认证"></el-option>
                        <el-option label="认证中" value="认证中"></el-option>
                        <el-option label="需要重新认证" value="需要重新认证"></el-option>
                        <el-option label="已认证" value="已认证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="Reset">重置</el-button>
                    <el-button type="primary" @click="Search">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table border :data="tableData" style="wisrc/page/userList.vue:70dth: 100%">
                <el-table-column prop="registetime" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="userattestationstatus" label="个人信用" width="130" align="center"></el-table-column>
                <el-table-column prop="operaattestationstatus" label="手机运营商" width="140"
                                 align="center"></el-table-column>
                <el-table-column prop="bankattestationstatus" label="收款银行卡" align="center"></el-table-column>
                <!--      <el-table-column prop="address" label="芝麻授信" width="130" align="center"></el-table-column>-->
                <el-table-column prop="address" label="查看认证信息" align="center">
                    <template slot-scope="scope">
                        <span class="blue" @click="refu(scope)">认证信息</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="查看借款信息" align="center">
                    <template slot-scope="scope">
                        <span class="blue" @click="see(scope)">借款信息</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-popover placement="bottom-end" width="300">
                            <span class="content">确认将该用户添加到黑名单吗？</span>
                            <el-button class="confire" type="success" @click="confire(scope.row.id)">确定</el-button>
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
</template>

<script>
    import headTop from "../components/headTop";
    import {getUserList, getUserCount} from "@/api/getData";

    export default {
        data() {
            return {
                form: {
                    name: "", phone: "", time: "", start: "", end: "", news: "", mobile: "", credit: "", alipay: "",
                },
                tableData: [{id: 1}],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 20,
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
                params: {companyId: 3, page: 1}
            }).then(res => {
                that.tableData = res.data.userlist;
                for (var i = 0; i < that.tableData.length; i++) {
                    that.tableData[i].userattestationstatus = that.tableData[i].userattestationstatus == 0 ? '未认证' : that.tableData[i].userattestationstatus == 1 ? '已认证' : '认证中';
                    that.tableData[i].operaattestationstatus = that.tableData[i].operaattestationstatus == 0 ? '未认证' : that.tableData[i].operaattestationstatus == 1 ? '已认证' : '认证中';
                    that.tableData[i].bankattestationstatus = that.tableData[i].bankattestationstatus == 0 ? '未认证' : that.tableData[i].bankattestationstatus == 1 ? '已认证' : '认证中';
                }
            });
        },
        created() {
            // this.initData();
        },
        methods: {
            currentChange() {
                //   this.getData(this.page, this.pageSize);
            },
            Reset() {
                this.form = {
                    name: "",
                    phone: "",
                    time: "",
                    start: "",
                    end: "",
                    news: "",
                    mobile: "",
                    credit: "",
                    alipay: "",
                }
            },
            Search() {
                var that = this;
                that.axios.get('/user/queryUserList', {
                    params: {companyId: 3, page: 1}
                }).then(res => {
                    that.tableData = res.data.userlist;
                    for (var i = 0; i < that.tableData.length; i++) {
                        that.tableData[i].userattestationstatus = that.tableData[i].userattestationstatus == 0 ? '未认证' : that.tableData[i].userattestationstatus == 1 ? '已认证' : '认证中';
                        that.tableData[i].operaattestationstatus = that.tableData[i].operaattestationstatus == 0 ? '未认证' : that.tableData[i].operaattestationstatus == 1 ? '已认证' : '认证中';
                        that.tableData[i].bankattestationstatus = that.tableData[i].bankattestationstatus == 0 ? '未认证' : that.tableData[i].bankattestationstatus == 1 ? '已认证' : '认证中';
                    }
                });
            },
            confire(id) {
                var that = this;

                that.axios.get('/user/insertBlacklist', {
                    params: {userId:id,companyId:3,operator:'张三1'}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '拉黑成功'
                    });
                    that.Search();
                })
            },
            see() {
                this.$router.push('/queryOrder')
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .table_container {
        padding: 20px;
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
