<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置7</p> -->
        <el-dialog title="新增角色" :visible.sync="addActorDialogVisible" customClass="customWidth" center>
            <div>
                <el-button type="warning" @click="centerDialogVisible = false">取消</el-button>
                <el-input placeholder="输入角色名称" style="width: 200px" v-model="addActorObject.rolename"
                          class="inp"></el-input>
                <el-input placeholder="输入角色描述" style="width: 200px" v-model="addActorObject.roledescribe"
                          class="inp"></el-input>
                <el-button type="primary" @click="addActor">保存</el-button>
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
                <template v-for="(actor, index1) in actorList">
                    <tr>
                        <template v-if="!!actor.cros">
                            <td :rowspan="actor.cros">
                                {{actor.firstlevelmenu}}
                            </td>
                        </template>
                        <template v-if="!!actor.cros2">
                            <td :rowspan="actor.cros2">
                                <template v-if="actor.thirdlevelmenu =='/'">
                                    <el-checkbox @change="checked=>changeSelected(checked,actor.id)">
                                        {{actor.secondlevelmenu}}
                                    </el-checkbox>
                                </template>
                                <template v-else>
                                    {{actor.secondlevelmenu}}
                                </template>
                            </td>
                        </template>
                        <template v-if="actor.thirdlevelmenu != '/'">
                            <td>
                                <el-checkbox @change="checked=>changeSelected(checked,actor.id)">
                                    {{actor.thirdlevelmenu}}
                                </el-checkbox>
                            </td>
                        </template>
                        <template v-else>
                            <td>
                                {{actor.thirdlevelmenu}}
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </el-dialog>
        <el-dialog title="编辑角色" :visible.sync="editActorDialogVisible" customClass="customWidth" center>
            <div>
                <el-button type="warning" @click="centerDialogVisible = false">取消</el-button>
                <el-input placeholder="输入角色名称" style="width: 200px" v-model="editActorObject.rolename"
                          class="inp"></el-input>
                <el-input placeholder="输入角色描述" style="width: 200px" v-model="editActorObject.roledescribe"
                          class="inp"></el-input>
                <el-button type="primary" @click="SaveEditActor">保存</el-button>
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
                <template v-for="(actor, index) in editActorList">
                    <tr>
                        <template v-if="!!actor.cros">
                            <td :rowspan="actor.cros">
                                {{actor.firstlevelmenu}}
                            </td>
                        </template>
                        <template v-if="!!actor.cros2">
                            <td :rowspan="actor.cros2">
                                <template v-if="actor.thirdlevelmenu =='/'">
                                    <el-checkbox v-model="actor.selected"
                                                 @change="checked=>changeEditSelected(checked,actor.id)">
                                        {{actor.secondlevelmenu}}
                                    </el-checkbox>
                                </template>
                                <template v-else>
                                    {{actor.secondlevelmenu}}
                                </template>
                            </td>
                        </template>
                        <template v-if="actor.thirdlevelmenu != '/'">
                            <td>
                                <el-checkbox v-model="actor.selected"
                                             @change="checked=>changeEditSelected(checked,actor.id)">
                                    {{actor.thirdlevelmenu}}
                                </el-checkbox>
                            </td>
                        </template>
                        <template v-else>
                            <td>
                                {{actor.thirdlevelmenu}}
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </el-dialog>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="角色权限" name="first">
                <div class="back">
                    <h2>角色权限</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
                            <el-table-column prop="roledescribe" label="角色描述" align="center"></el-table-column>
                            <el-table-column prop="stateName" label="角色状态" align="center"></el-table-column>
                            <el-table-column label="编辑" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="openEditActorDialog(scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="修改状态" align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom-end" width="300" trigger="click"
                                                :ref="`popover-${scope.$index}`">
                                        <span class="content">确认修改该角色状态吗？</span>
                                        <el-button class="confire" type="success" @click="changeActorState(scope)">是的
                                        </el-button>
                                        <el-button type="danger" slot="reference">修改
                                        </el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="删除角色" align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom-end" width="300" trigger="click"
                                                :ref="`popover+${scope.$index}`">
                                        <span class="content">确认删除角色吗？</span>
                                        <el-button class="confire" type="success" @click="deleteActor(scope)">是的
                                        </el-button>
                                        <el-button type="danger" slot="reference">删除
                                        </el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="open" @click="openAddActorDialog()">
                            <!-- <i class="el-icon-circle-plus-outline"></i> -->
                            <i class="el-icon-plus"></i>
                            <span>新增角色</span>
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
            <el-dialog title="新增用户" :visible.sync="centerDialogVisibles" customClass="customWidths" center>
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
                            <el-select multiple v-model="addUserObject.listRoleIdString" placeholder="选择角色"
                                       style="width: 100%;">
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
                            <el-select multiple v-model="editUserObject.listRoleIdString" placeholder="选择角色"
                                       style="width: 100%;">
                                <el-option v-for="role in roleList" :label="role.rolename"
                                           :value="role.roleid">
                                </el-option>
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
                                                   @click="updateUserState(scope,scope.row.status)">是的
                                        </el-button>
                                        <el-button type="danger" slot="reference" @click="">修改状态</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="删除用户" align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom-end" width="300" trigger="click"
                                                :ref="`popover+${scope.$index}`">
                                        <span class="content">确认删除当前用户吗？</span>
                                        <el-button class="confire" type="success"
                                                   @click="deleteUser(scope)">是的
                                        </el-button>
                                        <el-button type="danger" slot="reference" @click="">删除用户</el-button>
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
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/role/queryAll', {
                params: {companyId: window.localStorage.getItem("companyid"), page: 1}
            }).then(res => {
                that.tableData = res.data.rolelist;
                that.page = res.data.pageutil.page;
                that.totalPageCount = res.data.pageutil.totalPageCount;
                that.totalCount = res.data.pageutil.totalCount;
                that.pageSize = res.data.pageutil.pageSize;
                for (var i = 0; i < that.tableData.length; i++) {
                    that.tableData[i].stateName = that.tableData[i].status == 1 ? '开启' : '关闭';
                }
            });
        },
        data() {
            return {
                addActorObject: {},
                editActorObject: {},
                addUserObject: {},
                editUserObject: {},
                roleList: [],
                actorList: [],
                editActorList: [],
                addDialogSelectedList: [],
                editDialogSelectedList: [],
                editActorDialogVisible: false,
                addActorDialogVisible: false,
                centerDialogVisibles: false,
                editUserDialogVisibles: false,
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
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                page2: 1,
                pageSize2: 10,
                totalPageCount2: 0,
                totalCount2: 0,
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
            SaveEditActor() {
                var that = this;
                var param = that.editActorObject;
                param.listfunctionIdString = that.editDialogSelectedList.join(',');
                param.companyid = window.localStorage.getItem("companyid")
                that.axios.get('/role/updateByPrimaryKey', {
                    params: param
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    this.Search1();
                    that.editActorDialogVisible = false;
                })
            },
            Search1() {
                var that = this;
                that.axios.get('/role/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid"), page: that.page}
                }).then(res => {
                    that.tableData = res.data.rolelist;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    for (var i = 0; i < that.tableData.length; i++) {
                        that.tableData[i].stateName = that.tableData[i].status == 1 ? '开启' : '关闭';
                    }
                });
            },
            addActor() {
                var that = this;
                var param = that.addActorObject;
                param.listfunctionIdString = that.addDialogSelectedList.join(',');
                param.companyid = window.localStorage.getItem("companyid")
                that.axios.get('/role/insert', {
                    params: param
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.Search1();
                    that.addActorDialogVisible = false;
                })
            },
            changeEditSelected(e, id) {
                var that = this;
                if (e.target.checked) {
                    that.editDialogSelectedList.push(id);
                } else {
                    var index = that.editDialogSelectedList.indexOf(id);
                    if (index > -1) {
                        that.editDialogSelectedList.splice(index, 1);
                    }
                }
            },
            changeSelected(e, id) {
                var that = this;
                if (e.target.checked) {
                    that.addDialogSelectedList.push(id);
                } else {
                    var index = that.addDialogSelectedList.indexOf(id);
                    if (index > -1) {
                        that.addDialogSelectedList.splice(index, 1);
                    }
                }
            },
            openAddActorDialog() {
                var that = this;
                that.addActorDialogVisible = true;
                that.addActorObject = {};
                that.axios.get('/role/queryAllFunctions').then(res => {
                    that.actorList = [];
                    var tempList = res.data;
                    var first = '';
                    var firstCros = 0;
                    var firstIndex = 0;
                    var second = '';
                    var secondCros = 0;
                    var secondIndex = 0;
                    for (var i = 0; i < tempList.length; i++) {
                        if (first == tempList[i].firstlevelmenu) {
                            tempList[i].firstlevelmenu = undefined;
                            firstCros++;

                            if (second == tempList[i].secondlevelmenu) {
                                tempList[i].secondlevelmenu = undefined;
                                secondCros++;
                            } else {
                                second = tempList[i].secondlevelmenu;
                                tempList[secondIndex].cros2 = secondCros;
                                secondCros = 1;
                                secondIndex = i;
                            }
                        } else {
                            first = tempList[i].firstlevelmenu;
                            tempList[firstIndex].cros = firstCros;
                            firstCros = 1;
                            firstIndex = i;
                            second = tempList[i].secondlevelmenu;
                            tempList[secondIndex].cros2 = secondCros;
                            secondCros = 1;
                            secondIndex = i;
                        }
                        if (!tempList[i].thirdlevelmenu) {
                            tempList[i].thirdlevelmenu = '/'
                        }
                        if (i == tempList.length - 1) {
                            first = tempList[i].firstlevelmenu;
                            tempList[firstIndex].cros = firstCros;
                            second = tempList[i].secondlevelmenu;
                            tempList[secondIndex].cros2 = secondCros;
                        }
                    }
                    that.actorList = tempList;
                });
            },
            openEditActorDialog(row) {
                var that = this;
                that.editActorDialogVisible = true;
                that.axios.get('/role/editByRoleid', {
                    params: {roleid: row.roleid}
                }).then(res => {
                    that.editActorList = [];
                    that.editActorObject = res.data.role;
                    var tempList = res.data.listall;
                    var selectedList = res.data.listByRoleid;
                    var first = '';
                    var firstCros = 0;
                    var firstIndex = 0;
                    var second = '';
                    var secondCros = 0;
                    var secondIndex = 0;
                    for (var i = 0; i < tempList.length; i++) {
                        for (var j = 0; j < selectedList.length; j++) {
                            if (selectedList[j].id == tempList[i].id) {
                                tempList[i].selected = true;
                            }
                        }
                        if (first == tempList[i].firstlevelmenu) {
                            tempList[i].firstlevelmenu = undefined;
                            firstCros++;

                            if (second == tempList[i].secondlevelmenu) {
                                tempList[i].secondlevelmenu = undefined;
                                secondCros++;
                            } else {
                                second = tempList[i].secondlevelmenu;
                                tempList[secondIndex].cros2 = secondCros;
                                secondCros = 1;
                                secondIndex = i;
                            }
                        } else {
                            first = tempList[i].firstlevelmenu;
                            tempList[firstIndex].cros = firstCros;
                            firstCros = 1;
                            firstIndex = i;
                            second = tempList[i].secondlevelmenu;
                            tempList[secondIndex].cros2 = secondCros;
                            secondCros = 1;
                            secondIndex = i;
                        }
                        if (!tempList[i].thirdlevelmenu) {
                            tempList[i].thirdlevelmenu = '/'
                        }
                        if (i == tempList.length - 1) {
                            first = tempList[i].firstlevelmenu;
                            tempList[firstIndex].cros = firstCros;
                            second = tempList[i].secondlevelmenu;
                            tempList[secondIndex].cros2 = secondCros;
                        }
                    }
                    that.editDialogSelectedList = [];
                    for (var i = 0; i < selectedList.length; i++) {
                        that.editDialogSelectedList.push(selectedList[i].id);
                    }
                    that.editActorList = tempList;
                });
            },
            changeActorState(scope) {
                var that = this;
                var id = scope.row.roleid;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                var state = scope.row.status == 1 ? 2 : 1;
                that.axios.get('/role/updateStatus', {
                    params: {id: id, status: state}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '状态修改成功'
                    });
                    that.Search1();
                });
            },
            deleteActor(scope) {
                var that = this;
                var id = scope.row.roleid;
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                var state = scope.row.status == 1 ? 2 : 1;
                that.axios.get('/role/upaFalseDel', {
                    params: {roleid: id}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    that.Search1();
                });
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
            currentChange(page) {
                var that = this;
                that.page = page;
                that.Search1();
            },
            currentChange2(page) {
                var that = this;
                that.page2 = page;
                that.Search();
            },
            Search() {
                var that = this;
                var url = '';
                var param = {page: that.page2, companyId: window.localStorage.getItem("companyid")};
                if (!that.form.account && !that.form.status) {
                    url = '/sysuser/queryAll';
                } else {
                    url = 'sysuser/queryAllByLike';
                    param = {
                        page: that.page2,
                        status: that.form.status,
                        account: that.form.account,
                        companyId: window.localStorage.getItem("companyid")
                    }
                }
                that.axios.get(url, {
                    params: param
                }).then(res => {
                    that.tableDatas = res.data.sysuserlist;
                    that.page2 = res.data.pageutil.page;
                    that.totalPageCount2 = res.data.pageutil.totalPageCount;
                    that.totalCount2 = res.data.pageutil.totalCount;
                    that.pageSize2 = res.data.pageutil.pageSize;
                    if (!that.tableDatas.length) {
                        return;
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
                param.listRoleIdString = param.listRoleIdString.join(',');
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
                param.listRoleIdString = param.listRoleIdString.join(',');
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
            updateUserState(scope, currentState) {
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
                that.addUserObject = {};
                that.centerDialogVisibles = true;
                that.axios.get('/sysuser/queryAllCompany', {
                    params: null
                }).then(res => {
                    that.roleList = res.data.listrole;
                })
            },
            openEditUserDialog(object) {
                var that = this;
                that.axios.get('/sysuser/queryAllCompany', {
                    params: null
                }).then(res => {
                    that.roleList = res.data.listrole;
                    that.axios.get('/sysuser/selectByPrimaryKey', {
                        params: {userid: object.userid}
                    }).then(res => {
                        that.editUserObject = res.data.sysuser;
                        if (!that.editUserObject.listRoleIdString) {
                            that.editUserObject.listRoleIdString = [];
                        }else{
                            that.editUserObject.listRoleIdString = that.editUserObject.listRoleIdString.split(',');
                        }
                        if (that.editUserObject.listRoleIdString.constructor == String) {
                            Number(that.editUserObject.listRoleIdString);
                        } else if (that.editUserObject.listRoleIdString.constructor == Array) {
                            for (var i = 0; i < that.editUserObject.listRoleIdString.length; i++) {
                                that.editUserObject.listRoleIdString[i] = Number(that.editUserObject.listRoleIdString[i]);
                            }
                        }
                    })
                })
                that.editUserDialogVisibles = true;
            },
            deleteUser(scope) {
                var that = this;
                var id = scope.row.userid;
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                that.axios.get('/sysuser/upaFalseDel', {
                    params: {id: id}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.Search();
                })
            }
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
