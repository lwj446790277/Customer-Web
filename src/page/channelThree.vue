<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="逾前发送筛选" name="first">
                <div class="back">
                    <h2>逾前发送筛选</h2>
                    <div class="main">
                        <el-form :model="form" :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-select v-model="form.name" placeholder="离最后逾前还款日" style="width:200px">
                                    <el-option label="当天" value="0"></el-option>
                                    <el-option label="往后1天" value="1"></el-option>
                                    <el-option label="往后2天" value="2"></el-option>
                                    <el-option label="往后3天" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="Search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                            <el-table-column :resizable='false' prop="collection_time" label="逾前还款日期" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phonenum" label="已选用户条数" align="center"></el-table-column>
                            <el-table-column :resizable='false' label="发送历史批次" align="center">
                                <template slot-scope="scope">
                                    <span class="blue" @click="open(scope.row.collection_time)">查看历史批次</span>
                                </template>
                            </el-table-column>
                            <el-table-column :resizable='false' label="操作" align="center">
                                <template slot-scope="scope">
                                    <span @click="next(scope.row.phonesa,scope.row.phonenum,scope.row.collection_time)" class="blue">下一步</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog title="发送历史批次" :visible.sync="dialogTableVisible" center>
                            <el-table border :data="gridData">
                                <el-table-column :resizable='false' property="send_time" label="操作时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' property="phonenum" label="已选用户条数" align="center"></el-table-column>
                            </el-table>
                        </el-dialog>
                        <el-dialog title="选择短信模板" :visible.sync="dialogVisible" customClass="dia" center>
                            <table cellspacing="0" cellpadding="15" class="son">
                                <tr>
                                    <th>短信模板</th>
                                    <td>
                                        <el-select v-model="type" style="width:90%" @change="change">
                                            <el-option v-for="(template, index) in templateList" :label="template.name" :value="index"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>模板内容</th>
                                    <td>
                                        <el-input type="textarea" v-model="desc" style="width:90%" disabled></el-input>
                                    </td>
                                </tr>
                            </table>
                            <el-button type="warning" @click="dialogVisible=false" class="close">取消</el-button>
                            <el-button type="primary" @click="send" class="send">发送短信</el-button>
                        </el-dialog>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="自动定时发送" name="third">
                <div class="back">
                    <h2>自动定时发送</h2>
                    <div class="main">
                        <el-table border :data="batchData" tooltip-effect="dark" style="width: 100%">
                            <el-table-column :resizable='false' prop="overdueday" label="逾期天数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="timing" label="时间点" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="name" label="模板名" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="content" label="模板内容" align="center"></el-table-column>
                            <el-table-column :resizable='false' label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="info" size="mini" slot="reference" @click="openEditDialog(scope.row.id)">编辑</el-button>
                                    <el-popover :ref="`popover-${scope.$index}`" placement="bottom-end" width="200" trigger="click">
                                        <span class="content">确认删除批量操作？</span>
                                        <el-button class="confire" size="mini" type="danger" @click="deleteBatch(scope)">确认</el-button>
                                        <el-button type="danger" size="mini" slot="reference">删除</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="open" @click="openAddDialog()">
                            <i class="el-icon-plus"></i>
                            <span>添加批量发送</span>
                        </div>
                        <div class="block">
                            <el-pagination :current-page="page3" :page-size="pageSize3" layout="total, prev, pager, next, jumper" :page-count="totalPageCount3" :total="totalCount3"
                                           @current-change="currentChange"></el-pagination>
                        </div>
                    </div>
                </div>
                <el-dialog title="添加批量发送" :visible.sync="addDialogVisible" customClass="customWidthe">
                    <table cellspacing="0" cellpadding="15" class="bode">
                        <tr>
                            <th>逾期天数</th>
                            <td>
                                <el-input type="number" placeholder="请输入逾期天数" v-model="addObject.overdueday"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>时间点(例如 03:09 13:59)</th>
                            <td>
                                <el-input placeholder="请输入时间点" v-model="addObject.timing"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>选择模板</th>
                            <td>
                                <el-select v-model="addTemplateId">
                                    <el-option v-for="(template, index) in templateList" :label="template.name" :value="template.id"></el-option>
                                </el-select>
                            </td>
                        </tr>
                    </table>
                    <el-button type="primary" class="confire" @click="saveAdd()">保存</el-button>
                    <el-button class="confire" @click="addDialogVisible=false">关闭</el-button>
                    <br/>
                </el-dialog>
                <el-dialog title="编辑批量发送" :visible.sync="editDialogVisible" customClass="customWidthe">
                    <table cellspacing="0" cellpadding="15" class="bode">
                        <tr>
                            <th>逾期天数</th>
                            <td>
                                <el-input type="number" placeholder="请输入逾期天数" v-model="editObject.overdueday"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>时间点(例如 03:09 13:59)</th>
                            <td>
                                <el-input placeholder="请输入时间点" v-model="editObject.timing"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>选择模板</th>
                            <td>
                                <el-select v-model="editTemplateId">
                                    <el-option v-for="(template, index) in templateList" :label="template.name" :value="template.id" :key="template.id"></el-option>
                                </el-select>
                            </td>
                        </tr>
                    </table>
                    <el-button type="primary" class="confire" @click="saveEdit()">保存</el-button>
                    <el-button class="confire" @click="editDialogVisible=false">关闭</el-button>
                    <br/>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="短信发送历史" name="second">
                <div class="back">
                    <h2>短信发送历史</h2>
                    <div class="main">
                        <el-table border :data="tableDatas" tooltip-effect="dark" style="width: 100%">
                            <el-table-column :resizable='false' prop="send_time" label="最后操作时间" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="collection_time" label="逾前还款日期" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phonenum" label="已选用户条数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="paymentmoney" label="发送历史批次" align="center">
                                <template slot-scope="scope">
                                    <span class="blue" @click="opens(scope.row.collection_time)">查看历史批次</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                                :current-page="page"
                                :page-size="Pagesize"
                                layout="total,  prev, pager, next, jumper"
                                :page-count="totalPageCount"
                                :total="totalCount">
                            </el-pagination>
                        </div>
                        <el-dialog title="发送历史批次" :visible.sync="dialogTable" center>
                            <el-table border :data="sendData">
                                <el-table-column :resizable='false' property="send_time" label="操作时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' property="phonenum" label="已选用户条数" align="center"></el-table-column>
                            </el-table>
                        </el-dialog>
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
                tableData: [],
                tableDatas: [],
                gridData: [],
                sendData: [],
                batchData: [],
                templateList: [],
                dialogTableVisible: false,
                dialogVisible: false,
                dialogTable: false,
                activeName: "first",
                form: {
                    name: 0
                },
                type: undefined,
                desc: undefined,
                phonesa: "",
                phonenum: "",
                collection_time: "",
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                page3: 1,
                pageSize3: 10,
                totalCount3: 0,
                totalPageCount3: 0,
                addObject: {},
                editObject: {},
                addDialogVisible: false,
                editDialogVisible: false,
                addTemplateId: undefined,
                editTemplateId: undefined,
            }
        },
        created() {
            this.axios.get('/overtextsetting/querytexttemp', {
                params: {}
            }).then(res => {
                this.templateList = res.data;
            })
        },
        methods: {
            deleteBatch(scope) {
                var that = this;
                var id = scope.row.id;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                that.axios.get('/overtextsetting/upaFalDel', {
                    params: {id: id}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    that.SearchBatchList();
                });
            },
            saveEdit() {
                var that = this;
                this.editObject.companyid = window.localStorage.getItem("companyid");
                this.editObject.templateid = this.editTemplateId;
                this.axios.get('/overtextsetting/updateByPrimaryKey', {
                    params: this.editObject
                }).then(res => {
                    that.$message({
                        type: "success",
                        message: "编辑成功"
                    });
                    that.SearchBatchList();
                    that.editDialogVisible = false;
                })
            },
            openEditDialog(id) {
                var that = this;
                that.axios.get('/overtextsetting/selectByPrimaryKey', {
                    params: {id: id}
                }).then(res => {
                    that.editObject = res.data;
                    that.editDialogVisible = true;
                    that.editTemplateId = res.data.templateid;
                });
            },
            currentChange(val) {
                this.page3 = val;
                this.SearchBatchList();
            },
            saveAdd() {
                var that = this;
                this.addObject.companyid = window.localStorage.getItem("companyid");
                this.addObject.templateid = this.addTemplateId;
                this.axios.get('/overtextsetting/insert', {
                    params: this.addObject
                }).then(res => {
                    that.axios.get('/SendDateSms/SmsDatesend', {
                        params: {companyid: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.$message({
                            type: "success",
                            message: "添加成功"
                        });
                        that.SearchBatchList();
                        that.addDialogVisible = false;
                    })
                })
            },
            openAddDialog() {
                var that = this;
                that.addObject = {};
                that.addDialogVisible = true;
            },
            open(collection_time) {
                this.dialogTableVisible = true
                this.axios.get('sms/AllCollection', {
                    params: {
                        collection_time
                    }
                }).then(res => {
                    this.gridData = res.data.Shortmessage
                })
            },
            next(phonesa, phonenum, collection_time) {
                this.dialogVisible = true
                this.phonesa = phonesa
                this.phonenum = phonenum
                this.collection_time = collection_time
            },
            opens(collection_time) {
                this.dialogTable = true
                this.axios.get('sms/AllCollection', {
                    params: {
                        collection_time
                    }
                }).then(res => {
                    this.sendData = res.data.Shortmessage
                })
            },
            franchundercheckenuser() {
                this.nonthcanlanbaby();
                this.silybodykitckenzou = this.getData();

            },
            change() {
                this.desc = this.templateList[this.type].content;
            },
            getData(page, Pagesize) {
                this.axios.get("sms/AllShortMessage", {
                    params: {
                        companyid: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableDatas = res.data.Shortmessage;
                    this.page = res.data.Shortmessage.page;
                    this.Pagesize = res.data.Shortmessage.Pagesize;
                    this.totalCount = res.data.Shortmessage.length;
                });
            },
            handleClick() {
                if (this.activeName == "second") {
                    this.getData(this.page, this.Pagesize)
                }
                if (this.activeName == "third") {
                    this.SearchBatchList()
                }
            },
            SearchBatchList() {
                this.axios.get('/overtextsetting/queryAll', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page: this.page3
                    }
                }).then(res => {
                    this.batchData = res.data.overtextlist;
                    this.page3 = res.data.pageutil.page
                    this.pageSize3 = res.data.pageutil.pageSize
                    this.totalPageCount3 = res.data.pageutil.totalPageCount
                    this.totalCount3 = res.data.pageutil.totalCount
                })
            },
            Search() {
                this.axios.get('sms/DateAllPhone', {
                    params: {
                        companyid: window.localStorage.getItem("companyid"),
                        biaoshi: this.form.name
                    }
                }).then(res => {
                    this.tableData = res.data.Shortmessage
                })
            },
            send() {
                this.axios.get('sms/SendSms', {
                    params: {
                        companyid: window.localStorage.getItem("companyid"),
                        msg: this.desc,
                        phone: this.phonesa.join(),
                    }
                }).then(res => {
                    this.$confirm(res.data.desc, '提示', {
                        type: 'warning',
                        center: true
                    })
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .open {
        width: 99.9%;
        line-height: 60px;
        border: 1px solid #dfe6ec;
        margin-top: -1px;
        cursor: pointer;
        font-size: 1.2rem;
        text-align: center;
    }

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .el-tabs__header {
        margin: 0;
    }

    .customWidthe {
        width: 500px;
        text-align: center;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .blue {
        color: blue;
        cursor: pointer;
    }

    .dia {
        width: 30%;
    }

    .son {
        width: 95%;
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .son td {
        text-align: center;
    }

    .close {
        float: left;
        margin-left: 20px;
        margin-bottom: 20px;
    }

    .send {
        float: right;
        margin-right: 20px;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }
</style>
