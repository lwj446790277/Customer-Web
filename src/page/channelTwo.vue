<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道2</p> -->
        <div class="back">
            <h2>渠道设置管理</h2>
            <div class="main">
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column prop="sourcename" label="渠道名称" align="center"></el-table-column>
                    <el-table-column prop="account" label="账户" align="center"></el-table-column>
                    <el-table-column prop="link" label="链接" align="center"></el-table-column>
                    <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
                    <el-table-column prop="discount" label="折扣率" align="center"></el-table-column>
                    <el-table-column prop="rmmodlename" label="风控" align="center"></el-table-column>
                    <el-table-column prop="name" label="模板" align="center"></el-table-column>
                    <el-table-column prop="address" label="编辑" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openEditChannelDialog(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="删除" align="center">
                        <template slot-scope="scope">
                            <el-popover placement="bottom-end" width="300" trigger="click">
                                <span class="content">确认删除该渠道吗？</span>
                                <el-button class="confire" type="success" @click="deleteChannel(scope.row)">确认</el-button>
                                <el-button type="danger" slot="reference" @click="openDeleteBox()">删除</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="open" @click="openAddChannelDialog()">
                    <!-- <i class="el-icon-circle-plus-outline"></i> -->
                    <i class="el-icon-plus"></i>
                    <span>新增渠道</span>
                </div>
                <el-dialog title="新增渠道" :visible.sync="addChannelDialogVisible" customClass="customWidths" center>
                    <table border="0" cellspacing="0" cellpadding="20" class="table" center>
                        <tr>
                            <th>渠道名称</th>
                            <td>
                                <el-input v-model="addChannelObject.sourcename" placeholder="请输入渠道名"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>折扣率%</th>
                            <td>
                                <el-input type="number" v-model="addChannelObject.discount" placeholder="请输入折扣率"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>用户名</th>
                            <td>
                                <el-input v-model="addChannelObject.account" placeholder="请输入用户名"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>密码</th>
                            <td>
                                <el-input v-model="addChannelObject.pwd" placeholder="请输入密码"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>风控模型</th>
                            <td>
                                <el-select v-model="addChannelObject.managecontrolid" placeholder="选择风控"
                                        style="width: 100%;">
                                    <el-option v-for="model in modelList" :label="model.rmmodlename"
                                            :value="model.id"></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>模板</th>
                            <td>
                                <el-select v-model="addChannelObject.name" placeholder="选择模板" style="width: 100%;">
                                    <el-option v-for="template in templateList" :label="template.name"
                                            :value="template.name"></el-option>
                                </el-select>
                            </td>
                        </tr>
                    </table>
                    <div style="float: right;margin-bottom: 5px">
                        <el-button type="warning" @click="addChannelDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="addChannel()">保存</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="编辑渠道" :visible.sync="editChannelDialogVisible" customClass="customWidths" center>
                    <table border="0" cellspacing="0" cellpadding="20" class="table" center>
                        <tr>
                            <th>渠道名称</th>
                            <td>
                                <el-input v-model="editChannelObject.sourcename" placeholder="请输入渠道名"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>折扣率%</th>
                            <td>
                                <el-input v-model="editChannelObject.discount" placeholder="请输入折扣率"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>用户名</th>
                            <td>
                                <el-input v-model="editChannelObject.account" placeholder="请输入用户名"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>密码</th>
                            <td>
                                <el-input v-model="editChannelObject.pwd" placeholder="请输入密码"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>风控模型</th>
                            <td>
                                <el-select v-model="editChannelObject.managecontrolid" placeholder="选择风控"
                                        style="width: 100%;">
                                    <el-option v-for="model in modelList" :label="model.rmmodlename"
                                            :value="model.id"></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>模板</th>
                            <td>
                                <el-select v-model="editChannelObject.name" placeholder="选择模板" style="width: 100%;">
                                    <el-option v-for="template in templateList" :label="template.name"
                                            :value="template.name"></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>状态</th>
                            <td>
                                <el-select v-model="editChannelObject.status" placeholder="选择模板" style="width: 100%;">
                                    <el-option label="开启" value="1">开启</el-option>
                                    <el-option label="关闭" value="2">关闭</el-option>
                                </el-select>
                            </td>
                        </tr>
                    </table>
                    <div style="float: right;margin-bottom: 5px">
                        <el-button type="warning" @click="editChannelDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="editChannel()">保存</el-button>
                    </div>
                </el-dialog>
                <div class="block">
                    <el-pagination
                        :current-page="page"
                        :page-size.sync="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
                        @current-change="currentChange()"
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
                templateList: [],
                modelList: [],
                addChannelObject: {},
                editChannelObject: {},
                tableData: [],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                addChannelDialogVisible: false,
                editChannelDialogVisible: false
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/source/queryAll', {
                params: {companyId: window.localStorage.getItem("companyid"), page: 1}
            }).then(res => {
                that.tableData = res.data.sourcelist;
                that.page = res.data.pageutil.page;
                that.totalPageCount = res.data.pageutil.totalPageCount;
                that.totalCount = res.data.pageutil.totalCount;
                if(!!that.tableData){
                    for(var i =0;i<that.tableData.length;i++){
                        that.tableData[i].statusName = that.tableData[i].status ==1?"开启":"关闭"
                    }
                }
            })
        },
        methods: {
            deleteChannel(object) {
                var that = this;
                that.axios.get('/source/updateFalDel', {
                    params: {id: object.id}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.Search();
                })
            },
            currentChange() {

            },
            Search(page) {
                var that = this;
                if (!page) {
                    page = 1;
                }
                that.axios.get('/source/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid"), page: page}
                }).then(res => {
                    that.tableData = res.data.sourcelist;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    if(!!that.tableData){
                        for(var i =0;i<that.tableData.length;i++){
                            that.tableData[i].statusName = that.tableData[i].status ==1?"开启":"关闭"
                        }
                    }
                })
            },
            addChannel() {
                var that = this;
                that.addChannelObject.companyid = window.localStorage.getItem("companyid");
                that.addChannelObject.discount = that.addChannelObject.discount + '%';
                that.axios.get('/source/insert', {
                    params: that.addChannelObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.Search();
                    that.addChannelDialogVisible = false;
                })
            },
            editChannel() {
                var that = this;
                that.editChannelObject.companyid = window.localStorage.getItem("companyid");
                that.axios.get('/source/updateByPrimaryKey', {
                    params: that.editChannelObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.Search();
                    that.editChannelDialogVisible = false;
                })
            },
            openAddChannelDialog() {
                var that = this;
                that.axios.get('/source/queryAllCompany', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.templateList = res.data.listtemp;
                    that.modelList = res.data.listmanage;
                    that.centerDialogVisibles = false;
                })
                that.addChannelDialogVisible = true;
            },
            openEditChannelDialog(object) {
                var that = this;
                that.axios.get('/source/queryAllCompany', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.templateList = res.data.listtemp;
                    that.modelList = res.data.listmanage;
                    that.centerDialogVisibles = false;
                })
                that.editChannelObject = object;
                that.editChannelDialogVisible = true;
            },
            openDeleteBox(){}
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .customWidths {
        width: 400px
    }

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
        border: 1px solid #eee;
        margin-top: -1px;
        cursor: pointer;
        font-size: 1.2rem;
        text-align: center;
    }
</style>
