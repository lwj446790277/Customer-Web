<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置7</p> -->
        <el-dialog :title="title" :visible.sync="centerDialogVisible" customClass="customWidth" center>
            <div class="top">
                <el-button type="warning" @click="centerDialogVisible = false">取消</el-button>
                <el-input placeholder="输入角色名称" class="inp"></el-input>
                <el-button type="primary" @click="centerDialogVisible = false">保存</el-button>
            </div>
            <table border="1" cellspacing="0" cellpadding="15" class="tables">
                <tr>
                    <th colspan="3">功能操作权限</th>
                </tr>
                <tr>
                    <th>可操作一级菜单功能</th>
                    <th>可操作二级菜单功能</th>
                    <th>可操作三级菜单功能</th>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>平台首页</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>综合统计</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>回收率报表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="4">
                        <span>订单管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>机审订单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>人工复审</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>机审拒绝未人审</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>已机审已人审</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>订单查询</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="8">
                        <span>贷后订单管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td rowspan="5">
                        <span>订单查询</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>未逾期未分配</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>未逾期已分配</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>逾前催收率报表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>逾前催收员报表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>我的逾期催收订单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>已还订单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>已逾期订单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>已坏账订单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="6">
                        <span>催收预警及管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td rowspan="2">
                        <span>催单分配员工</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>已逾期未分配</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>已逾期已分配</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>催单订单报表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>催收率报表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>催收员工作报表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>我的催收订单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>已分配未催收</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>已分配已催收</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td rowspan="4">
                        <span>用户管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>用户认证信息</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>黑名单用户</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>机审判定黑名单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>人工添加黑名单</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>白名单用户</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="10">
                        <span>财务管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>支付记录</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>还款计划</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>还款记录</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>线上手工调账</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>新增线上调账</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>线上调账记录表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>线下手工调账</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>新增线下调账</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>线下调账记录表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>银行卡自动扣款</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>一键扣款</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>扣款记录表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>财务总览</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>渠道管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>渠道数据查询</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>渠道设置管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="4">
                        <span>运营数据</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>平台总数据</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>还款数据</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>逾期数据</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>收支数据</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="3">
                        <span>APP管理设置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>轮播图设置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <!-- <tr>
                    <td>
                        <span>虚拟宣传页</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr> -->
                <tr>
                    <td>
                        <span>编辑协议</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>联系客服和关于我们</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="8">
                        <span>后台设置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>贷款类型配置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>申请条件配置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>认证信息配置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>第三方接口设置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>分控设置管理</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>逾期等级设置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>/</span>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <span>角色权限设置</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td>
                        <span>新增编辑账号</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>账号列表</span>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
            </table>
        </el-dialog>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="角色权限" name="first">
                <div class="back">
                    <h2>角色权限</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
                            <el-table-column prop="name" label="角色描述" align="center"></el-table-column>
                            <el-table-column prop="address" label="角色开关" align="center"></el-table-column>
                            <el-table-column prop="address" label="编辑" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="删除" align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom-end" width="300" trigger="click">
                                        <span class="content">确认删除该轮播图吗？</span>
                                        <el-button class="confire" type="success" @click="confire(scope.row)">是的</el-button>
                                        <el-button type="danger" slot="reference" @click="delet(scope.row)">删除</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="open" @click="centerDialogVisible = true">
                            <!-- <i class="el-icon-circle-plus-outline"></i> -->
                            <i class="el-icon-plus"></i>
                            <span>新增角色</span>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-dialog :title="titles" :visible.sync="centerDialogVisibles" customClass="customWidths" center>
                <table border="0" cellspacing="0" cellpadding="20" class="table" center>
                    <tr>
                        <th>用户名</th>
                        <td>
                            <el-input v-model="addUserObject.account" placeholder="请输入用户名"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <th>密码</th>
                        <td>
                            <el-input v-model="addUserObject.pwd" placeholder="请输入密码"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <th>手机号</th>
                        <td>
                            <el-input v-model="addUserObject.phone" placeholder="请输入手机号"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <th>角色名称</th>
                        <td>
                            <el-select v-model="addUserObject.listRoleIdString" placeholder="选择角色" style="width: 100%;">
                                <el-option v-for="role in roleList" :label="role.rolename"
                                           :value="role.roleid"></el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>
                <div style="float: right;margin-bottom: 5px">
                    <el-button type="warning" @click="centerDialogVisibles = false">取消</el-button>
                    <el-button type="primary" @click="addUser()">保存</el-button>
                </div>
            </el-dialog>
            <el-dialog title="编辑用户" :visible.sync="editUserDialogVisibles" customClass="customWidths" center>
                <table border="0" cellspacing="0" cellpadding="20" class="table" center>
                    <tr>
                        <th>用户名</th>
                        <td>
                            <el-input v-model="editUserObject.account" placeholder="请输入用户名"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <th>密码</th>
                        <td>
                            <el-input v-model="editUserObject.pwd" placeholder="请输入密码"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <th>手机号</th>
                        <td>
                            <el-input v-model="editUserObject.phone" placeholder="请输入手机号"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <th>角色名称</th>
                        <td>
                            <el-select v-model="editUserObject.listRoleIdString" placeholder="选择角色"
                                       style="width: 100%;">
                                <el-option v-for="role in roleList" :label="role.rolename"
                                           :value="role.roleid"></el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>
                <div style="float: right;margin-bottom: 5px">
                    <el-button type="warning" @click="editUserDialogVisibles = false">取消</el-button>
                    <el-button type="primary" @click="editUser">保存</el-button>
                </div>
            </el-dialog>
            <el-tab-pane label="账号列表" name="second">
                <div class="back">
                    <h2>账号列表</h2>
                    <div class="main">
                        <el-form :model="form" :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-input placeholder="用户名称" v-model="form.account"
                                        class="input-with-select"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="form.status" placeholder="用户状态" style="width:150px">
                                    <el-option label="开启" value="1"></el-option>
                                    <el-option label="关闭" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="warning" @click="Reset">重置</el-button>
                                <el-button type="primary" @click="Search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table border :data="tableDatas" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="rolestr" label="角色名称" align="center"></el-table-column>
                            <el-table-column prop="account" label="用户名称" align="center"></el-table-column>
                            <el-table-column prop="loginstate" label="登录状态" align="center"></el-table-column>
                            <el-table-column prop="logintime" label="登录时间" align="center"></el-table-column>
                            <el-table-column prop="status" label="账号状态" align="center"></el-table-column>
                            <el-table-column prop="address" label="编辑" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="openEditUserDialog(scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="修改状态" align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom-end" width="300" trigger="click"
                                                :ref="`popover-${scope.$index}`">
                                        <span class="content">确认修改用户当前状态吗？</span>
                                        <el-button class="confire" type="success"
                                                @click="deleteUser(scope,scope.row.status)">是的
                                        </el-button>
                                        <el-button type="danger" slot="reference" @click="">修改状态</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="open" @click="openAddUserDialog()">
                            <!-- <i class="el-icon-circle-plus-outline"></i> -->
                            <i class="el-icon-plus"></i>
                            <span>新增用户</span>
                        </div>
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
        </el-tabs>
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
                addUserObject: {},
                editUserObject: {},
                roleList: [],
                title: "新增/编辑权限",
                centerDialogVisible: false,
                titles: "新增用户",
                centerDialogVisibles: false,
                editUserDialogVisibles: false,
                checked: true,
                name: "",
                pass: "",
                person: "",
                state: "",
                tableData: [],
                tableDatas: [],
                form: {
                    account: "",
                    status: ""
                },
                page: 1,
                pageSize:10,
                totalPageCount:0,
                totalCount:0,
                activeName: 'first',
                active: 1,
                prev: false,
                nexts: true,
                completes: false,
                table: true,
                one: "",
                two: "",
                name: "",
                account: "",
                password: ""
            }
        },
        methods: {
            pre() {
                this.active = 1;
                this.prev = false;
                this.nexts = true;
                this.completes = false;
                this.table = true;
            },
            next() {
                this.active = 2;
                this.prev = true;
                this.nexts = false;
                this.completes = true;
                this.table = false;
            },
            complete() {
                this.activeName = "second";
            },
            Reset() {
                var that = this;
                that.form = {
                    account: "",
                    status: ""
                }
            },
            currentChange(){

            },
            Search() {
                var that = this;
                var url = '';
                var param = {page: that.page, companyId: window.localStorage.getItem("companyid")};
                if (!that. form.account && !that. form.status) {
                    url = '/sysuser/queryAll';
                } else {
                    url = 'sysuser/queryAllByLike';
                    param = {
                        page: that.page,
                        status: that. form.status,
                        account: that. form.account,
                        companyId: window.localStorage.getItem("companyid")
                    }
                }
                that.axios.get(url, {
                    params: param
                }).then(res => {
                    that.tableDatas = res.data.sysuserlist;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    if(!that.tableDatas.length){
                        return ;
                    }
                    for (var i = 0; i < that.tableDatas.length; i++) {
                        that.tableDatas[i].loginstate = that.tableDatas[i].loginstate == 1 ? '登陆' : '未登陆';
                        that.tableDatas[i].logintime = that.tableDatas[i].logintime == 0 ? '暂无登录记录' : that.tableDatas[i].logintime;
                        that.tableDatas[i].status = that.tableDatas[i].status == 1 ? '开启' : '关闭';
                    }
                })
            },
            addUser() {
                var that = this;
                var param = that.addUserObject;
                param.companyid = window.localStorage.getItem("companyid")
                that.axios.get('/sysuser/insert', {
                    params: param
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.Search();
                    that.centerDialogVisibles = false;
                })
            },
            editUser() {
                var that = this;
                var param = that.editUserObject;
                param.companyid = window.localStorage.getItem("companyid")
                that.axios.get('/sysuser/updateByPrimaryKey', {
                    params: param
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    this.Search();
                    that.editUserDialogVisibles = false;
                })
            },
            deleteUser(scope, currentState) {
                var that = this;
                var id = scope.row.userid;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                var status = currentState == '开启' ? 2 : 1;
                that.axios.get('/sysuser/updateStatus', {
                    params: {id: id, status: status}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '修改用户状态成功成功'
                    });
                    this.Search();
                })
            },
            openAddUserDialog() {
                var that = this;
                that.centerDialogVisibles = true;
                that.axios.get('/sysuser/queryAllCompany', {
                    params: null
                }).then(res => {
                    that.roleList = res.data.listrole;
                })
            },
            openEditUserDialog(object) {
                var that = this;
                if (!that.roleList || that.roleList.length == 0) {
                    that.axios.get('/sysuser/queryAllCompany', {
                        params: null
                    }).then(res => {
                        that.roleList = res.data.listrole;
                        that.editUserObject = object;
                        that.editUserDialogVisibles = true;
                    })
                } else {
                    that.editUserObject = object;
                    that.editUserDialogVisibles = true;
                }
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

    .el-tabs__header {
        margin: 0;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
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

    .content {
        color: blue;
        cursor: pointer;
    }

    .block {
        padding-top: 20px;
        text-align: center;
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

    .single {
        margin-left: -15px;
    }

    .top {
        // width: 100%;
        // margin: 0 auto;
    }

    .customWidth {
        width: 50%;
        text-align: center;
    }

    .customWidths {
        width: 20%;
        text-align: center;
    }

    .inp {
        width: 40%;
        margin-left: 10%;
        margin-right: 10%;
    }

    .tables {
        width: 98%;
        margin: 20px auto;
        border-color: #dfe6ec;
    }

    .btn {
        display: flex;
        justify-content: space-around;
    }
</style>
