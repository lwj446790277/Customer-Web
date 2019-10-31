<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置1</p> -->
        <el-tabs v-model="activeName" type="card">
            <template v-if="isInArray(51)">
                <el-tab-pane label="借款设置" name="first">
                    <div class="back">
                        <h2>借款设置</h2>
                        <div class="main">
                            <table border="0" cellpadding="30" cellspacing="0" class="tab">
                                <tr>
                                    <th>方案类型</th>
                                    <td>
                                        <span class="bk">{{jiekuanObject.functionName}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>贷款类型</th>
                                    <td>
                                        <span class="bk">{{jiekuanObject.loantype}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>还款期限</th>
                                    <td>
                                        <span class="bk">{{jiekuanObject.lifeofloan}}天</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>可借额度</th>
                                    <td>
                                        <span class="bk">{{jiekuanObject.canborrowlines}}元</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>日均利息</th>
                                    <td>
                                        <span class="bk">{{jiekuanObject.averagedailyinterest}}%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>平台服务费比率</th>
                                    <td>
                                        <span class="bk">{{jiekuanObject.platformfeeratio}}%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>数据是否脱敏</th>
                                    <td>
                                        <span class="bk">{{phoneConfig}}</span>
                                    </td>
                                </tr>
                            </table>
                            <el-button type="primary" class="edit" @click="openEditLoanDialog()">编辑</el-button>
                        </div>
                    </div>
                    <el-dialog :title="title" :visible.sync="editLoanDialogVisible" customClass="customWidth" width="30%" center>
                        <table border="0" cellpadding="25" cellspacing="0" class="tables">
                            <tr>
                                <th>方案选择</th>
                                <td>

                                    <el-radio-group v-model="jiekuanEditObject.borrowingscheme">
                                        <el-radio label="1">优先结算服务费</el-radio>
                                        <el-radio label="2">最后结算服务费</el-radio>
                                    </el-radio-group>

                                </td>
                            </tr>
                            <tr>
                                <th>手机号是否脱敏</th>
                                <td>

                                    <el-radio-group v-model="editPhoneConfig">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="2">否</el-radio>
                                    </el-radio-group>

                                </td>
                            </tr>
                            <tr>
                                <th>贷款类型</th>
                                <td>
                                    <el-input placeholder="输入名称" v-model="jiekuanEditObject.loantype"></el-input>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
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
            </template>
            <template v-if="isInArray(52)">
                <el-tab-pane label="延期设置" name="second">
                    <div class="back">
                        <h2>延期设置</h2>
                        <div class="main">
                            <div class="center">
                                <span style="margin-left:-35%">是否开启:</span>
                                <template v-if="deferredSettingObject.status==1">
                                    <font color="#3c982d">
                                        <strong>开启</strong>
                                    </font>
                                </template>
                                <template v-else>
                                    <font color="red">
                                        <strong>关闭</strong>
                                    </font>
                                </template>
                            </div>
                            <table border="0" cellpadding="30" cellspacing="0" class="tab">
                                <tr>
                                    <th>最多可延期次数</th>
                                    <td>
                                        <span class="bk">{{deferredSettingObject.maximumcandeferredtime}}次</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>单次延期多少天</th>
                                    <td>
                                        <span class="bk">{{deferredSettingObject.oncedeferredday}}天</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>单次延期费用</th>
                                    <td>
                                        <span class="bk">{{deferredSettingObject.oncedeferredmoney}}元</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>逾期多少天前可延期</th>
                                    <td>
                                        <span class="bk">{{deferredSettingObject.overduehowdaycandeferred}}天</span>
                                    </td>
                                </tr>
                            </table>
                            <el-button type="primary" class="edit" @click="open2Dialog()">编辑</el-button>
                        </div>
                    </div>
                    <el-dialog title="编辑延期设置" :visible.sync="editDeferredVisibles" customClass="customWidth" width="30%" center>
                        <div class="centers">
                            <span>是否开启</span>
                            <el-select v-model="editDeferredSettingObject.status">
                                <el-option label="开" value="1"></el-option>
                                <el-option label="关" value="2"></el-option>
                            </el-select>
                        </div>
                        <table border="0" cellpadding="25" cellspacing="0" class="tables">
                            <tr>
                                <th>最多可延期次数</th>
                                <td>
                                    <el-input
                                        placeholder="输入整数"
                                        v-model="editDeferredSettingObject.maximumcandeferredtime"
                                    >次
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <th>单次延期多少天</th>
                                <td>
                                    <el-input
                                        placeholder="输入整数"
                                        disabled="disabled"
                                        v-model="editDeferredSettingObject.oncedeferredday"
                                    >天
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <th>单次延期费用</th>
                                <td>
                                    <el-input
                                        placeholder="输入整数"
                                        disabled="disabled"
                                        v-model="editDeferredSettingObject.oncedeferredmoney"
                                    >元
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <th>逾期多少天前可延期</th>
                                <td>
                                    <el-input
                                        placeholder="整数(默认0=关)"
                                        v-model="editDeferredSettingObject.overduehowdaycandeferred"
                                    >天
                                    </el-input>
                                </td>
                            </tr>
                        </table>
                        <el-button type="primary" class="edit-btn" @click="saveDeferredSetting()">保存</el-button>
                    </el-dialog>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(54)">
                <el-tab-pane label="逾期设置" name="third">
                    <div class="back">
                        <h2>逾期设置</h2>
                        <div class="main">
                            <el-table border :data="tableData3" style="width: 50%;line-height: 60px;">
                                <el-table-column :resizable='false' label="逾期第X天前" align="center">
                                    <template scope="scope">
                                        <span>{{scope.row.overduehowmanydaysage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' label="罚息利率" align="center">
                                    <template scope="scope">
                                        <span>{{scope.row.penaltyinterestrates}}%</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <br/>
                            <el-button left type="primary" @click="openPage3EditDialog()">编辑</el-button>
                            <el-dialog title="逾期设置编辑" :visible.sync="page3DialogVisible">
                                <el-table border :data="detailTable3Data">
                                    <el-table-column :resizable='false' label="逾期第X天前" align="center">
                                        <template scope="scope">
                                            <el-input type="number" v-model="scope.row.overduehowmanydaysage" placeholder="请输入逾期天数"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :resizable='false' label="罚息利率" align="center">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.penaltyinterestrates" placeholder="请输入罚息利率"></el-input>
                                            %
                                        </template>
                                    </el-table-column>
                                    <el-table-column :resizable='false' prop="address" label="操作" align="center">
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
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(55)">
                <el-tab-pane label="续借提额" name="forth">
                    <div class="back">
                        <h2>续借提额</h2>
                        <div class="main">
                            <el-table border :data="tableData4" style="width: 50%;line-height: 60px;">
                                <el-table-column :resizable='false' label="用户连续还款X次后提额" align="center">
                                    <template scope="scope">
                                        <span>{{scope.row.userhowmanyconsecutivepayments}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' label="提高额度" align="center">
                                    <template scope="scope">
                                        <span>{{scope.row.increasethequota}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <br/>
                            <el-button left type="primary" @click="openPage4EditDialog()">编辑</el-button>
                            <el-dialog title="续借提额编辑" :visible.sync="page4DialogVisible">
                                <el-table border :data="detailTable4Data">
                                    <el-table-column :resizable='false'  label="用户连续还款X次后提额" align="center">
                                        <template scope="scope">
                                            <el-input
                                                v-model="scope.row.userhowmanyconsecutivepayments"
                                                placeholder="请输入连续还款次数"
                                            ></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :resizable='false' label="提高额度" align="center">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.increasethequota" placeholder="请输入提高额度"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :resizable='false' prop="address" label="操作" align="center">
                                        <template slot-scope="scope">
                                            <el-button type="primary" @click="saveLine(scope.$index,scope.row)">保存
                                            </el-button>
                                            <el-button type="danger" @click="deleteLine(scope.$index,scope.row)">删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <br/>
                                <center>
                                    <el-button center @click="addRow()">添加等级</el-button>
                                </center>
                            </el-dialog>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(56)">
                <el-tab-pane label="再审风控" name="fifth">
                    <div class="back">
                        <h2>再审风控</h2>
                        <div class="main">
                            <table border="0" cellpadding="10" cellspacing="0" class="tab">
                                <tr>
                                    <th>距离上次订单完成间隔多少天需再次认证</th>
                                    <td>间隔
                                        <div class="el-input" style="width: 150px;">
                                            <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner nmsl"
                                                   v-model="howmanydaysapart.howmanydaysapart"/>
                                        </div>
                                        天
                                    </td>
                                    <th>
                                        <el-button type="primary" @click="saveHowmanydaysapart()">保存</el-button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>是否让用户的额度还原成初始额度</th>
                                    <th>
                                        <el-radio-group v-model="ifrestore">
                                            <el-radio label="1" value="1">是</el-radio>
                                            <el-radio label="0" value="0">否</el-radio>
                                        </el-radio-group>
                                    </th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
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
                tableData: [],
                tableData3: [],
                tableData4: [],
                detailTable3Data: [],
                detailTable4Data: [],
                jiekuanObject: {},
                jiekuanEditObject: {borrowingscheme: 3},
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
                page3DialogVisible: false,
                page4DialogVisible: false,
                howmanydaysapart: {},
                focus: false,
                ifrestore: 0,
                phoneConfig: '',
                editPhoneConfig: '',
                editPhoneConfigId: ''
            };
        },
        created() {
            if (this.isInArray(51)) {
                this.Search();
            }
            if (this.isInArray(52)) {
                this.Search2();
            }
            if (this.isInArray(54)) {
                this.Search3();
            }
            if (this.isInArray(55)) {
                this.Search4();
            }
            if (this.isInArray(56)) {
                this.Search5();
            }
        },
        methods: {
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            openEditLoanDialog() {
                var that = this;
                that.jiekuanEditObject.productid = that.jiekuanObject.productid;
                that.jiekuanEditObject.borrowingscheme = that.jiekuanObject.borrowingscheme;
                that.jiekuanEditObject.id = that.jiekuanObject.id;
                that.jiekuanEditObject.companyid = that.jiekuanObject.companyid;
                that.jiekuanEditObject.loantype = that.jiekuanObject.loantype;
                that.jiekuanEditObject.lifeofloan = that.jiekuanObject.lifeofloan;
                that.jiekuanEditObject.canborrowlines = that.jiekuanObject.canborrowlines;
                that.jiekuanEditObject.averagedailyinterest = that.jiekuanObject.averagedailyinterest;
                that.jiekuanEditObject.platformfeeratio = that.jiekuanObject.platformfeeratio;
                that.axios.get("/iftuoming/queryAll", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.editPhoneConfig = res.data.iftuoming;
                    that.editPhoneConfigId = res.data.id;
                    that.editLoanDialogVisible = true;
                });
            },
            open2Dialog() {
                var that = this;
                that.editDeferredVisibles = true;
                that.editDeferredSettingObject.id = that.deferredSettingObject.id;
                that.editDeferredSettingObject.companyid =
                    that.deferredSettingObject.companyid;
                that.editDeferredSettingObject.maximumcandeferredtime =
                    that.deferredSettingObject.maximumcandeferredtime;
                that.editDeferredSettingObject.oncedeferredday =
                    that.deferredSettingObject.oncedeferredday;
                that.editDeferredSettingObject.oncedeferredmoney =
                    that.deferredSettingObject.oncedeferredmoney;
                that.editDeferredSettingObject.overduehowdaycandeferred =
                    that.deferredSettingObject.overduehowdaycandeferred;
            },
            Search() {
                var that = this;
                that.axios.get("/borrowmonmes/queryAll", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.jiekuanObject = res.data[0];
                    that.jiekuanObject.functionName = that.jiekuanObject.borrowingscheme == 1 ? '优先结算服务费' : '最后结算服务费';
                    that.axios.get("/iftuoming/queryAll", {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.phoneConfig = res.data.iftuoming == '1' ? '是' : '否';
                    });
                });
            },
            Search2() {
                var that = this;
                that.axios.get("/deferredset/queryAll", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.deferredSettingObject = res.data[0];
                });
            },
            Search3() {
                var that = this;
                that.axios.get("/overdueset/queryAll", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    that.tableData3 = res.data;
                });
            },
            Search4() {
                var that = this;
                that.axios.get("/liftingamount/queryAll", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    that.tableData4 = res.data;
                });
            },
            Search5() {
                var that = this;
                that.axios.get("/retrialwincon/queryAll", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    that.howmanydaysapart = res.data[0];
                    that.ifrestore = res.data[0].ifrestore
                });
            },
            loanEdit() {
                var that = this;
                that.axios.get("/borrowmonmes/updateByPrimaryKey", {
                    params: that.jiekuanEditObject
                }).then(res => {
                    that.axios.get("/iftuoming/updateByPrimaryKey", {
                        params: {Iftuoming: that.editPhoneConfig, id: that.editPhoneConfigId}
                    }).then(res => {
                        this.$message({
                            type: "success",
                            message: "编辑成功"
                        });
                        that.Search();
                        that.editLoanDialogVisible = false;
                    });
                });
            },
            saveDeferredSetting() {
                var that = this;
                that.axios.get("/deferredset/updateByPrimaryKey", {
                    params: that.editDeferredSettingObject
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "编辑成功"
                    });
                    that.Search2();
                    that.editDeferredVisibles = false;
                });
            },
            saveHowmanydaysapart() {
                var that = this;
                that.axios.get("/retrialwincon/updateByPrimaryKey", {
                    params: {
                        id: that.howmanydaysapart.id,
                        productid: that.howmanydaysapart.productid,
                        companyid: window.localStorage.getItem("companyid"),
                        howmanydaysapart: that.howmanydaysapart.howmanydaysapart,
                        ifrestore: that.ifrestore
                    }
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "编辑成功"
                    });
                    that.Search5();
                });
            },
            openPage3EditDialog() {
                var that = this;
                that.axios.get("/overdueset/queryAll", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.detailTable3Data = res.data;
                    that.page3DialogVisible = true;
                });
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
                    object.companyid = window.localStorage.getItem("companyid");
                } else {
                    url = "/overdueset/updateByPrimaryKey";
                    alert = "编辑逾期设置成功";
                }
                that.axios.get(url, {
                    params: object
                }).then(res => {
                    if (!object.id) {
                        object.id = res.data;
                    }
                    this.$message({
                        type: "success",
                        message: alert
                    });
                    var that = this;
                    that.axios.get("/overdueset/queryAll", {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.detailTable3Data = res.data;
                        that.tableData3 = res.data;
                    });
                });
            },
            deleteLine3(index, object) {
                var that = this;
                if (!!object.id) {
                    that.axios.get("/overdueset/upaFalseDel", {
                        params: {id: object.id}
                    }).then(res => {
                        this.$message({
                            type: "success",
                            message: "删除续借提额等级成功"
                        });
                        var that = this;
                        that.axios.get("/overdueset/queryAll", {
                            params: {companyId: window.localStorage.getItem("companyid")}
                        }).then(res => {
                            that.detailTable3Data = res.data;
                            that.tableData3 = res.data;
                        });
                    });
                } else {
                    that.detailTable3Data.splice(index, 1);
                }
            },
            openPage4EditDialog() {
                var that = this;
                that.axios.get("/liftingamount/queryAll", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.detailTable4Data = res.data;
                    that.page4DialogVisible = true;
                });
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
                    object.companyid = window.localStorage.getItem("companyid");
                } else {
                    url = "/liftingamount/updateByPrimaryKey";
                    alert = "编辑续借提额等级成功";
                }
                that.axios.get(url, {
                    params: object
                }).then(res => {
                    if (!object.id) {
                        object.id = res.data;
                    }
                    this.$message({
                        type: "success",
                        message: alert
                    });
                    var that = this;
                    that.axios.get("/liftingamount/queryAll", {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.detailTable4Data = res.data;
                        that.tableData4 = res.data;
                    });
                });
            },
            deleteLine(index, object) {
                var that = this;
                if (!!object.id) {
                    that.axios.get("/liftingamount/updateByPrimaryKey", {
                        params: {id: object.id}
                    }).then(res => {
                        this.$message({
                            type: "success",
                            message: "删除续借提额等级成功"
                        });
                        var that = this;
                        that.axios.get("/liftingamount/queryAll", {
                            params: {companyId: window.localStorage.getItem("companyid")}
                        }).then(res => {
                            that.detailTable4Data = res.data;
                            that.tableData4 = res.data;
                        });
                    });
                } else {
                    that.detailTable4Data.splice(index, 1);
                }
            },
            click() {
                this.focus = true;
            }
        },
        computed: {}
    };
</script>

<style lang="less">
    @import "../style/mixin";

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

    .back {
        background-color: #eff2f7;
        height: 100vh;
        padding: 50px;
    }

    h2 {
        margin-bottom: 15px;
        margin-top: -25px;
    }

    .main {
        padding: 50px;
        padding-top: 20px;
        background-color: #fff;
        min-height: 60vh;
    }

    .tab {
        margin: 20px;
        width: 60%;
        border-color: #dfe6ec;
        background-color: #fff;
    }

    .nmsl {
        background-color: #f3f6fb;
        border: transparent;
        border-radius: 0;
        text-align: center;
    }

    .tab td {
        padding-left: 20px;
    }

    .bk {
        background-color: #f3f6fb;
        width: 251px;
        padding: 10px;
        display: block;
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

    .edit-btn {
        width: 80px;
        margin-left: 20%;
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
