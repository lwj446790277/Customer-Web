<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="form" :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="form.name" placeholder="姓名" style="width:150px">
                        <el-option label="姓名" value="姓名"></el-option>
                        <el-option label="手机号" value="手机号"></el-option>
                        <el-option label="身份证号" value="身份证号"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="single">
                    <el-input placeholder="单行输入" v-model="form.input"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Search">搜索</el-button>
                </el-form-item>
                <el-button type="success" @click="batch" class="confire">批量导入</el-button>
            </el-form>
            <el-table border :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="idcard" label="身份证号" align="center"></el-table-column>
                <el-table-column prop="operationtime" label="最后编辑时间" align="center"></el-table-column>
                <el-table-column prop="operator" label="操作成员" align="center"></el-table-column>
                <el-table-column label="编辑" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="删除" align="center">
                    <template slot-scope="scope">
                        <el-popover placement="bottom-end" width="300" trigger="click">
                            <span class="content">确认将该用户从白名单移除吗？</span>
                            <el-button class="confire" type="success" @click="deleteUser(scope.row.id)">确认</el-button>
                            <el-button type="danger" slot="reference">删除</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <div class="open" @click="openAddDialog()">
                <!-- <i class="el-icon-circle-plus-outline"></i> -->
                <i class="el-icon-plus"></i>
                <span>添加白名单用户</span>
            </div>
            <el-dialog customClass="dialogClass" title="新增白名单" :visible.sync="addTableVisible">
                <table border="1" cellspacing="0" cellpadding="15" class="bode">
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
                        <th>身份证</th>
                        <td>
                            <el-input placeholder="请输入身份证号" v-model="addObject.idcard"></el-input>
                        </td>
                    </tr>
                </table>
                <br/>
                <el-button type="primary" class="confire" @click="save">保存</el-button>
                <br/>
            </el-dialog>
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

    export default {
        components: {
            headTop
        },
        data() {
            return {
                form: {
                    name: "",
                    input: ""
                },
                addObject:{id:undefined},
                tableData: [{id: 1}],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 20,
                visible: false,
                addTableVisible: false,
                name: "",
                phone: "",
                cardId: ""
            };
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/whitelistuser/queryAll', {
                params: {companyId: 3, page: 1}
            }).then(res => {
                that.tableData = res.data.whituserlist;
            });
        },
        methods: {
            deleteUser(id) {
                var that = this;
                that.axios.get('/whitelistuser/upaFalseDel', {
                    params: {id: id}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    that.Search();
                });
            },
            currentChange() {
                //   this.getData(this.page, this.pageSize);
            },
            Reset() {
                this.form = {
                    name: "",
                    input: ""
                }
            },
            Search() {
                var that = this;
                that.axios.get('/whitelistuser/queryAll', {
                    params: {companyId: 3, page: 1}
                }).then(res => {
                    that.tableData = res.data.whituserlist;
                });
            },
            batch() {

            },
            confire() {
                this.visible = false;
            },
            save() {
                var that = this;
                that.addObject.companyid = 3;
                that.addObject.operator = "张三1";
                that.axios.get('/whitelistuser/insert', {
                    params: that.addObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '新增白名单成功'
                    });
                    that.addTableVisible = false;
                    that.Search();
                })
            },
            openAddDialog(){
                var that = this;
                that.addTableVisible = true;
                that.addObject = {};
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

    .el-popover p {
        text-align: center;
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .dialogClass{
        width:15%;
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
</style>
