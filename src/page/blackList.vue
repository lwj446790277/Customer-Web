<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="机审判定黑名单" name="first">
                <div class="back">
                    <h2>机审判定黑名单</h2>
                    <div class="table_container">
                        <el-form :model="form" :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-input placeholder="姓名" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="手机号" v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="身份证号" v-model="form.idcard"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="注册起始时间"
                                                    value-format="yyyy-MM-dd"
                                                    @change="dateChangeStart"
                                                    v-model="form.registestarttime"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="single">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="注册结束时间"
                                                    value-format="yyyy-MM-dd"
                                                    @change="dateChangeEnd"
                                                    v-model="form.registeendtime"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-select placeholder="引流平台" v-model="form.sourcename">
                                    <el-option v-for="source in sourceList" :label="source.sourcename"
                                            :value="source.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                <el-button type="primary" @click="Search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table border :data="blackList" style="width: 100%">
                            <el-table-column prop="user.registetime" label="注册时间" align="center"></el-table-column>
                            <el-table-column prop="user.name" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="user.phone" label="手机号" align="center"></el-table-column>
                            <el-table-column prop="user.idcard" label="身份证号" width="93" align="center"></el-table-column>
                            <el-table-column prop="user.sourcename" label="引流平台" width="93"
                                            align="center"></el-table-column>
                            <el-table-column prop="user.registeclient" label="客户端类型" align="center"></el-table-column>
                            <el-table-column prop="howManyTimesBorMoney" label="借款次数" width="93" align="center"></el-table-column>
                           <!-- <el-table-column prop="orderCreateTime" label="最后借款时间" align="center"></el-table-column>
                            <el-table-column prop="realityBorrowMoney" label="最后借款金额" align="center"></el-table-column>
                            <el-table-column prop="deferrTime" label="延期次数" align="center"></el-table-column>
                            <el-table-column prop="deferrMoney" label="延期金额" align="center"></el-table-column>
                            <el-table-column prop="deferAfterReturntime" label="最后应还时间" align="center"></el-table-column>
                            <el-table-column prop="orderdetails.overdueNumberOfDays" label="逾期天数" width="93"
                                            align="center"></el-table-column>
                            <el-table-column prop="overdueGrade" label="逾期等级" width="93" align="center"></el-table-column>
                            <el-table-column prop="orderdetails.interestInAll" label="含逾总利息" width="120" align="center"></el-table-column>
                            <el-table-column prop="repaymentMoney" label="应还总金额" width="120" align="center"></el-table-column>-->
                            <el-table-column label="认证信息" align="center">
                                <template slot-scope="scope">
                                    <span class="blue" @click="getMessage(scope)">查看</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="140" align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom-end" width="300" :ref="`popover+${scope.$index}`">
                                        <p>确定解冻该用户黑名单吗？</p>
                                        <el-button class="confire" type="success" @click="deleteBlackState(scope)">
                                            确定
                                        </el-button>
                                        <el-button type="primary" slot="reference">解冻</el-button>
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
            </el-tab-pane>
            <el-tab-pane label="人工添加黑名单" name="second">
                <div class="back">
                    <h2>人工添加黑名单</h2>
                    <div class="table_container">
                        <el-form :model="form2" :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-input placeholder="姓名" v-model="form2.name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="手机号" v-model="form2.phone"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="身份证号" v-model="form2.idcard"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="warning" @click="Reset2" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                <el-button type="primary" @click="Search2()">搜索</el-button>
                            </el-form-item>
                            <el-button type="success" @click="batch" class="confire" style="background-color:#19b293">批量导入</el-button>
                        </el-form>
                        <el-table border :data="blackList2" style="width: 100%">
                            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                            <el-table-column prop="idcard" label="身份证号" align="center"></el-table-column>
                            <el-table-column prop="operationtime" label="最后编辑时间" align="center"></el-table-column>
                            <el-table-column prop="account" label="操作成员" align="center"></el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <span @click="editDialogShow(scope.row)" class="blue">编辑</span>
                                    <span class="zhong">|</span>
                                    <el-popover placement="bottom-end" width="300" trigger="click"
                                                :ref="`popover-${scope.$index}`">
                                        <span class="content">确认将该用户从黑名单删除吗？</span>
                                        <el-button class="confire" type="success" @click="deleteBlackUser(scope)">是的
                                        </el-button>
                                        <span slot="reference" class="red">删除</span>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="address" label="编辑" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="editDialogShow(scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="删除" align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom-end" width="300" trigger="click"
                                                :ref="`popover-${scope.$index}`">
                                        <span class="content">确认将该用户从黑名单删除吗？</span>
                                        <el-button class="confire" type="success" @click="deleteBlackUser(scope)">是的
                                        </el-button>
                                        <el-button type="danger" slot="reference">删除</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column> -->
                        </el-table>
                        <div class="open" @click="dialogTableVisible2 = true">
                            <i class="el-icon-plus"></i>
                            <span>添加黑名单用户</span>
                        </div>
                        <el-dialog title="新增黑名单" :visible.sync="dialogTableVisible2" customClass="customWidthe">
                            <table cellspacing="0" cellpadding="15" class="bode">
                                <tr>
                                    <th>姓名</th>
                                    <td>
                                        <el-input placeholder="请输入姓名" v-model="addObject.name"></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>手机号</th>
                                    <td>
                                        <el-input placeholder="请输入手机号" v-model="addObject.phone"></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>身份证号</th>
                                    <td>
                                        <el-input placeholder="请输入身份证号" v-model="addObject.idcard"></el-input>
                                    </td>
                                </tr>
                            </table>
                            <el-button type="primary" class="confire" @click="save">保存</el-button>
                        </el-dialog>
                        <el-dialog title="编辑黑名单" :visible.sync="editDialogTableVisible" customClass="customWidthe">
                            <table cellspacing="0" cellpadding="15" class="bode">
                                <tr>
                                    <th>姓名</th>
                                    <td>
                                        <el-input placeholder="请输入姓名" v-model="editObject.name"></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>手机号</th>
                                    <td>
                                        <el-input placeholder="请输入手机号" v-model="editObject.phone"></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>身份证号</th>
                                    <td>
                                        <el-input placeholder="请输入身份证号" v-model="editObject.idcard"></el-input>
                                    </td>
                                </tr>
                            </table>
                            <el-button type="primary" class="confire" @click="editBlackUser">保存</el-button>
                        </el-dialog>
                        <div class="block">
                            <el-pagination
                                :current-page="page2"
                                :page-size.sync="pageSize2"
                                layout="total, prev, pager, next, jumper"
                                :page-count="totalPageCount2"
                                :total="totalCount2"
                                @current-change="currentChange2"
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
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
                activeName: "first",
                form: {
                    name: "",
                    input: "",
                    time: "",
                    date: "",
                    platform: ""
                },
                form2: {
                    name: '',
                    phone: '',
                    idcard: '',
                },
                blackList: [{id: 1}],
                blackList2: [{id: 1}],
                sourceList: [],
                addObject: {name: undefined},
                editObject: {name: undefined},
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                page2: 1,
                pageSize2: 10,
                totalPageCount2: 0,
                totalCount2: 0,
                visible: false,
                dialogTableVisible: false,
                dialogTableVisible2: false,
                editDialogTableVisible: false,
                name: "",
                phone: "",
                cardId: ""
            };
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/user/queryAllOrdersByUserid1', {
                params: {companyid: window.localStorage.getItem("companyid"), page: 1}
            }).then(res => {
                that.blackList = res.data.listorders;
                that.page = res.data.pageutil.page;
                that.totalPageCount = res.data.pageutil.totalPageCount;
                that.totalCount = res.data.pageutil.totalCount;
                that.pageSize = res.data.pageutil.pageSize;
                that.sourceList = res.data.listsource;
                that.axios.get('/blacklistuser/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid"), page: 1}
                }).then(res => {
                    that.blackList2 = res.data.blackuserlist;
                    that.page2 = res.data.pageutil.page;
                    that.totalPageCount2 = res.data.pageutil.totalPageCount;
                    that.totalCount2 = res.data.pageutil.totalCount;
                    that.pageSize2 = res.data.pageutil.pageSize;
                });
            });
        },
        methods: {
            dateChangeStart(val) {
                var that = this;
                that.form.registestarttime = val;
            },
            dateChangeEnd(val) {
                var that = this;
                that.form.registeendtime = val;
            },
            getMessage(){},
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
                param.companyid = window.localStorage.getItem("companyid");
                param.page = that.page;
                that.axios.get('/user/queryAllOrdersByUserid1', {
                    params: param
                }).then(res => {
                    that.blackList = res.data.listorders;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                });
            },
            Search2() {
                var that = this;
                var param = that.form2;
                param.companyId = window.localStorage.getItem("companyid");
                param.page = that.page2;
                that.axios.get('/blacklistuser/queryAll', {
                    params: param
                }).then(res => {
                    that.blackList2 = res.data.blackuserlist;
                    that.page2 = res.data.pageutil.page;
                    that.totalPageCount2 = res.data.pageutil.totalPageCount;
                    that.totalCount2 = res.data.pageutil.totalCount;
                    that.pageSize2 = res.data.pageutil.pageSize;
                });
            },
            deleteBlackState(scope) {
                var that = this;
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                var id = scope.row.id;
                that.axios.get('/user/removeBlacklist', {
                    params: {userId: id, companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除黑名单成功'
                    });
                    that.Search();
                })
            },
            deleteBlackUser(scope) {
                var that = this;
                var id = scope.row.id;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                that.axios.get('/blacklistuser/upaFalseDel', {
                    params: {id: id}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    that.Search2();
                });
            },
            editDialogShow(object) {
                var that = this;
                that.editObject = {};
                that.editObject.id = object.id;
                that.editObject.name = object.name;
                that.editObject.phone = object.phone;
                that.editObject.idcard = object.idcard;
                that.editDialogTableVisible = true;
            },
            editBlackUser() {
                var that = this;
                that.editObject.companyid = window.localStorage.getItem("companyid");
                that.editObject.operator = window.localStorage.getItem("userid");
                that.axios.get('/blacklistuser/updateByPrimaryKey', {
                    params: that.editObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑黑名单信息成功'
                    });
                    this.Search2();
                    that.editDialogTableVisible = false;
                });
            },
            currentChange(val) {
                var that = this;
                that.page = val;
                that.Search();
            },
            currentChange2(val) {
                var that = this;
                that.page2 = val;
                that.Search2();
            },
            Reset() {
                this.form = {
                    name: '',
                    phone: '',
                    idcard: '',
                };
            },
            Reset2() {
                this.form2 = {
                    name: '',
                    phone: '',
                    idcard: '',
                };
            },
            batch() {

            },
            confire() {
                this.visible = false;
            },
            save() {
                var that = this;
                that.addObject.companyid = window.localStorage.getItem("companyid");
                that.addObject.operator = window.localStorage.getItem("userid");
                that.axios.get('/blacklistuser/insert', {
                    params: that.addObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '新增黑名单成功'
                    });
                    that.dialogTableVisible2 = false;
                    that.Search2();
                })
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .el-tabs__header {
        margin: 0;
    }

    .table_container {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .single {
        margin-left: -15px;
    }

    .el-popover p {
        text-align: center;
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .confire {
        float: right;
    }

    .blue {
        color: #396fff;
        cursor: pointer;
    }

    .red {
        color: #ff050b;
        cursor: pointer;
    }

    .zhong{
        margin-left: 5px;
        margin-right: 5px;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .content {
        font-size: 1rem;
        text-align: center;
        display: block;
        margin-bottom: 15px;
        margin-top: 15px;
    }

    .confire {
        float: right;
    }

    .open {
        width: 99.9%;
        line-height: 60px;
        border: 1px solid #dfe6ec;
        margin-top: -1px;
        cursor: pointer;
        font-size: 1.2rem;
        text-align: center;
    }

    .customWidthe {
        width: 25%;
        text-align: center;
        padding-bottom: 20px;
    }

    .bode {
        width: 98%;
        margin: 20px auto;
        border-color: #dfe6ec;
    }
</style>
