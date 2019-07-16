<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置1</p> -->
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="借款设置" name="first">
                <div class="main">
                    <p>操作人:</p>
                    <p>最后更新:</p>
                    <table border="1" cellpadding="30" cellspacing="0" class="tab">
                        <tr>
                            <th>贷款类型</th>
                            <td>
                                <span>{{jiekuanObject.loantype}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>还款期限</th>
                            <td>
                                <span>{{jiekuanObject.lifeofloan}}天</span>
                            </td>
                        </tr>
                        <tr>
                            <th>可借额度</th>
                            <td>
                                <span>{{jiekuanObject.canborrowlines}}元</span>
                            </td>
                        </tr>
                        <tr>
                            <th>日均利息</th>
                            <td>
                                <span>{{jiekuanObject.averagedailyinterest}}%</span>
                            </td>
                        </tr>
                        <tr>
                            <th>平台服务费比率</th>
                            <td>
                                <span>{{jiekuanObject.platformfeeratio}}%</span>
                            </td>
                        </tr>
                    </table>
                    <el-button type="primary" class="edit" @click="openEditLoanDialog()">编辑</el-button>
                </div>
                <el-dialog :title="title" :visible.sync="editLoanDialogVisible" customClass="customWidth" width="30%"
                           center>
                    <table border="1" cellpadding="25" cellspacing="0" class="tables">
                        <tr>
                            <th>贷款类型</th>
                            <td>
                                <el-input placeholder="输入名称" v-model="jiekuanEditObject.loantype"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>还款期限</th>
                            <td>
                                <el-input placeholder="输入3-30的整数" v-model="jiekuanEditObject.lifeofloan"></el-input>
                                <span>天</span>
                            </td>
                        </tr>
                        <tr>
                            <th>可借额度</th>
                            <td>
                                <el-input placeholder="输入整数" v-model="jiekuanEditObject.canborrowlines"></el-input>
                                <span>元</span>
                            </td>
                        </tr>
                        <tr>
                            <th>日均利息</th>
                            <td>
                                <el-input placeholder="保留四位小数"
                                          v-model="jiekuanEditObject.averagedailyinterest"></el-input>
                                <span>%</span>
                            </td>
                        </tr>
                        <tr>
                            <th>平台服务费比率</th>
                            <td>
                                <el-input placeholder="输入1-50的整数"
                                          v-model="jiekuanEditObject.platformfeeratio"></el-input>
                                <span>%</span>
                            </td>
                        </tr>
                    </table>
                    <el-button type="primary" class="edit" @click="loanEdit()">保存</el-button>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="延期设置" name="second">
                <div class="main">
                    <p>操作人:</p>
                    <p>最后更新:</p>
                    <div class="center">
                        <span>是否开启:</span>
                        <template v-if="deferredSettingObject.status==1">
                            开启
                        </template>
                        <template v-else>
                            关闭
                        </template>
                    </div>
                    <table border="1" cellpadding="30" cellspacing="0" class="tab">
                        <tr>
                            <th>最多可延期次数</th>
                            <td>
                                <span>{{deferredSettingObject.maximumcandeferredtime}}次</span>
                            </td>
                        </tr>
                        <tr>
                            <th>单次延期多少天</th>
                            <td>
                                <span>{{deferredSettingObject.oncedeferredday}}天</span>
                            </td>
                        </tr>
                        <tr>
                            <th>单次延期费用</th>
                            <td>
                                <span>{{deferredSettingObject.oncedeferredmoney}}元</span>
                            </td>
                        </tr>
                        <tr>
                            <th>逾期多少天前可延期</th>
                            <td>
                                <span>{{deferredSettingObject.overduehowdaycandeferred}}天</span>
                            </td>
                        </tr>
                    </table>
                    <el-button type="primary" class="edit" @click="open2Dialog()">编辑</el-button>
                </div>
                <el-dialog title="编辑延期设置" :visible.sync="editDeferredVisibles" customClass="customWidth" width="30%"
                           center>
                    <div class="centers">
                        <span>是否开启</span>
                        <el-select v-model="editDeferredSettingObject.status">
                            <el-option label="开" value="1"></el-option>
                            <el-option label="关" value="2"></el-option>
                        </el-select>
                    </div>
                    <table border="1" cellpadding="25" cellspacing="0" class="tables">
                        <tr>
                            <th>最多可延期次数</th>
                            <td>
                                <el-input placeholder="输入整数" v-model="editDeferredSettingObject.maximumcandeferredtime">
                                    次
                                </el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>单次延期多少天</th>
                            <td>
                                <el-input placeholder="输入整数" disabled="disabled"
                                          v-model="editDeferredSettingObject.oncedeferredday">天
                                </el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>单次延期费用</th>
                            <td>
                                <el-input placeholder="输入整数" disabled="disabled"
                                          v-model="editDeferredSettingObject.oncedeferredmoney">元
                                </el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>逾期多少天前可延期</th>
                            <td>
                                <el-input placeholder="整数(默认0=关)"
                                          v-model="editDeferredSettingObject.overduehowdaycandeferred">天
                                </el-input>
                            </td>
                        </tr>
                    </table>
                    <el-button type="primary" class="edit" @click="saveDeferredSetting()">保存</el-button>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="逾期设置" name="third">
                <div class="main">
                    <p>操作人:</p>
                    <p>最后更新:</p>
                    <el-table border :data="tableData3" style="width: 50%;line-height: 60px;">
                        <el-table-column label="逾期第X天前" align="center">
                            <template scope="scope">
                                <span>{{scope.row.overduehowmanydaysage}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="罚息利率" align="center">
                            <template scope="scope">
                                <span>{{scope.row.penaltyinterestrates}}%</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br/>
                    <el-button left type="primary" @click="openPage3EditDialog()">编辑</el-button>
                    <el-dialog title="逾期设置编辑" :visible.sync="page3DialogVisible">
                        <el-table border :data="detailTable3Data">
                            <el-table-column label="逾期第X天前" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.overduehowmanydaysage" placeholder="请输入逾期天数"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="罚息利率" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.penaltyinterestrates" placeholder="请输入罚息利率"></el-input>%
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="saveLine3(scope.$index,scope.row)">保存</el-button>
                                    <el-button type="danger" @click="deleteLine3(scope.$index,scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br/>
                        <center>
                            <el-button center @click="addRow3()">添加逾期设置</el-button>
                        </center>
                    </el-dialog>
                </div>

            </el-tab-pane>
            <el-tab-pane label="续借提额" name="forth">
                <div class="main">
                    <p>操作人:</p>
                    <p>最后更新:</p>
                    <el-table border :data="tableData4" style="width: 50%;line-height: 60px;">
                        <el-table-column label="用户连续还款X次后提额" align="center">
                            <template scope="scope">
                                <span>{{scope.row.userhowmanyconsecutivepayments}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="提高额度" align="center">
                            <template scope="scope">
                                <span>{{scope.row.increasethequota}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br/>
                    <el-button left type="primary" @click="openPage4EditDialog()">编辑</el-button>
                    <el-dialog title="续借提额编辑" :visible.sync="page4DialogVisible">
                        <el-table border :data="detailTable4Data">
                            <el-table-column label="用户连续还款X次后提额" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.userhowmanyconsecutivepayments" placeholder="请输入连续还款次数"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="提高额度" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.increasethequota" placeholder="请输入提高额度"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="saveLine(scope.$index,scope.row)">保存</el-button>
                                    <el-button type="danger" @click="deleteLine(scope.$index,scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br/>
                        <center>
                            <el-button center @click="addRow()">添加逾期等级</el-button>
                        </center>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="再审风控" name="fifth">
                <div class="main">
                    <table border="1" cellpadding="10" cellspacing="0" class="tab">
                        <tr>
                            <th>距离上次认证间隔多少天需再次认证
                                <el-input v-model="howmanydaysapart.howmanydaysapart"></el-input>
                                天
                            </th>
                            <th>
                                <el-button type="primary" @click="saveHowmanydaysapart()">保存</el-button>
                            </th>
                        </tr>
                    </table>
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
                tableData3:[],
                tableData4: [],
                detailTable3Data:[],
                detailTable4Data: [],
                jiekuanObject: {},
                jiekuanEditObject: {},
                deferredSettingObject: {},
                editDeferredSettingObject: {},
                activeName: "first",
                state: "",
                title: "编辑借款设置",
                editLoanDialogVisible: false,
                editDeferredVisibles: false,
                titles: "编辑延期设置",
                editDialogVisibles: false,
                titlel: "编辑逾期设置",
                editsDialogVisible: false,
                page3DialogVisible:false,
                page4DialogVisible: false,
                howmanydaysapart: {},
                focus: false
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/borrowmonmes/queryAll', {
                params: {companyId: 3}
            }).then(res => {
                that.jiekuanObject = res.data[0];
                that.axios.get('/deferredset/queryAll', {
                    params: {companyId: 3}
                }).then(res => {
                    that.deferredSettingObject = res.data[0];
                    that.axios.get('/retrialwincon/queryAll', {
                        params: {companyId: 3}
                    }).then(res => {
                        that.howmanydaysapart = res.data[0];
                        that.axios.get('/liftingamount/queryAll', {
                            params: {companyId: 3}
                        }).then(res => {
                            that.tableData4 = res.data;
                            that.axios.get('/overdueset/queryAll', {
                                params: {companyId: 3}
                            }).then(res => {
                                that.tableData3 = res.data;
                            })
                        })
                    })
                })
            })
        },
        methods: {
            openEditLoanDialog() {
                var that = this;
                that.jiekuanEditObject.id = that.jiekuanObject.id;
                that.jiekuanEditObject.companyid = that.jiekuanObject.companyid;
                that.jiekuanEditObject.loantype = that.jiekuanObject.loantype;
                that.jiekuanEditObject.lifeofloan = that.jiekuanObject.lifeofloan;
                that.jiekuanEditObject.canborrowlines = that.jiekuanObject.canborrowlines;
                that.jiekuanEditObject.averagedailyinterest = that.jiekuanObject.averagedailyinterest;
                that.jiekuanEditObject.platformfeeratio = that.jiekuanObject.platformfeeratio;
                that.editLoanDialogVisible = true;
            },
            open2Dialog() {
                var that = this;
                that.editDeferredVisibles = true;
                that.editDeferredSettingObject.id = that.deferredSettingObject.id;
                that.editDeferredSettingObject.companyid = that.deferredSettingObject.companyid;
                that.editDeferredSettingObject.maximumcandeferredtime = that.deferredSettingObject.maximumcandeferredtime;
                that.editDeferredSettingObject.oncedeferredday = that.deferredSettingObject.oncedeferredday;
                that.editDeferredSettingObject.oncedeferredmoney = that.deferredSettingObject.oncedeferredmoney;
                that.editDeferredSettingObject.overduehowdaycandeferred = that.deferredSettingObject.overduehowdaycandeferred;

            },
            Search() {
                var that = this;
                that.axios.get('/borrowmonmes/queryAll', {
                    params: {companyId: 3}
                }).then(res => {
                    that.jiekuanObject = res.data[0];
                    that.axios.get('/deferredset/queryAll', {
                        params: {companyId: 3}
                    }).then(res => {
                        that.deferredSettingObject = res.data[0];
                        that.axios.get('/retrialwincon/queryAll', {
                            params: {companyId: 3}
                        }).then(res => {
                            that.howmanydaysapart = res.data[0];
                        })
                    })
                })
            },
            loanEdit() {
                var that = this;
                that.axios.get('/borrowmonmes/updateByPrimaryKey', {
                    params: that.jiekuanEditObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    that.Search();
                    that.editLoanDialogVisible = false;
                })
            },
            saveDeferredSetting() {
                var that = this;
                that.axios.get('/deferredset/updateByPrimaryKey', {
                    params: that.editDeferredSettingObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    that.Search();
                    that.editDeferredVisibles = false;
                })
            },
            saveHowmanydaysapart() {
                var that = this;
                that.axios.get('/retrialwincon/updateByPrimaryKey', {
                    params: {
                        id: that.howmanydaysapart.id,
                        productid: that.howmanydaysapart.productid,
                        companyid: 3,
                        howmanydaysapart: that.howmanydaysapart.howmanydaysapart
                    }
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    that.Search();
                })
            },
            openPage3EditDialog(){
                var that = this;
                that.axios.get('/overdueset/queryAll', {
                    params: {companyId: 3}
                }).then(res => {
                    that.detailTable3Data = res.data;
                    that.page3DialogVisible = true;
                })

            },
            addRow3() {
                var that = this;
                that.detailTable3Data.push({});
            },
            saveLine3(index, object) {
                var that = this;
                var url = "";
                var alert = "";
                if (!object.id) {
                    url = "/overdueset/insert";
                    alert = "新增逾期设置成功";
                    object.companyid = 3;
                } else {
                    url = "/overdueset/updateByPrimaryKey"
                    alert = "编辑逾期设置成功";
                }
                that.axios.get(url, {
                    params: object
                }).then(res => {
                    if (!object.id) {
                        object.id = res.data
                    }
                    this.$message({
                        type: 'success',
                        message: alert
                    });
                    var that = this;
                    that.axios.get('/overdueset/queryAll', {
                        params: {companyId: 3}
                    }).then(res => {
                        that.detailTable3Data = res.data;
                        that.tableData3 = res.data;
                    })
                })
            },
            deleteLine3(index, object) {
                var that = this;
                if(!!object.id){
                    that.axios.get('/overdueset/upaFalseDel', {
                        params: {id:object.id}
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除续借提额等级成功'
                        });
                        var that = this;
                        that.axios.get('/overdueset/queryAll', {
                            params: {companyId: 3}
                        }).then(res => {
                            that.detailTable3Data = res.data;
                            that.tableData3 = res.data;
                        })
                    })
                }else{
                    that.detailTable3Data.splice(index, 1);
                }
            },
            openPage4EditDialog() {
                var that = this;
                that.axios.get('/liftingamount/queryAll', {
                    params: {companyId: 3}
                }).then(res => {
                    that.detailTable4Data = res.data;
                    that.page4DialogVisible = true;
                })
            },
            addRow() {
                var that = this;
                that.detailTable4Data.push({});
            },
            saveLine(index, object) {
                var that = this;
                var url = "";
                var alert = "";
                if (!object.id) {
                    url = "/liftingamount/insert";
                    alert = "新增续借提额等级成功";
                    object.companyid = 3;
                } else {
                    url = "/liftingamount/updateByPrimaryKey"
                    alert = "编辑续借提额等级成功";
                }
                that.axios.get(url, {
                    params: object
                }).then(res => {
                    if (!object.id) {
                        object.id = res.data
                    }
                    this.$message({
                        type: 'success',
                        message: alert
                    });
                    var that = this;
                    that.axios.get('/liftingamount/queryAll', {
                        params: {companyId: 3}
                    }).then(res => {
                        that.detailTable4Data = res.data;
                        that.tableData4 = res.data;
                    })
                })
            },
            deleteLine(index, object) {
                var that = this;
                if(!!object.id){
                    that.axios.get('/liftingamount/updateByPrimaryKey', {
                        params: {id:object.id}
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除续借提额等级成功'
                        });
                        var that = this;
                        that.axios.get('/liftingamount/queryAll', {
                            params: {companyId: 3}
                        }).then(res => {
                            that.detailTable4Data = res.data;
                            that.tableData4 = res.data;
                        })
                    })
                }else{
                    that.detailTable4Data.splice(index, 1);
                }
            },
            click() {
                this.focus = true
            }
        },
        computed: {}
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

    .main {
        padding: 20px;
    }

    .tab {
        margin: 20px auto;
        width: 35%;
        border-color: #dfe6ec;
    }

    td {
        text-align: center;
    }

    p {
        margin-bottom: 15px;
    }

    .center {
        margin-left: 40%;
    }

    .edit {
        margin-left: 60%;
    }

    .customWidth {
        width: 30%;
        text-align: center;
    }

    .tables {
        margin: 20px auto;
        border-color: #dfe6ec;
        width: 90%;
    }

    .el-input {
        width: 90%;
    }

    .centers {
        margin-left: 5%;
    }
</style>
