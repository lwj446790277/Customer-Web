<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是银行卡自动扣款</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <template v-if="isInArray(39)">
                <el-tab-pane label="一键扣款" name="first">
                    <div class="back">
                        <h2>一键扣款</h2>
                        <div class="main">
                            <el-form :model="form" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-input placeholder="订单编号" v-model="form.id"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="姓名" v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="手机号" v-model="form.phone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="银行卡号" v-model="form.bankcardName"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-select v-model="form.level" placeholder="逾期等级" style="width:200px">
                                        <el-option v-for="item in level" :key="item.value" :label="item.grade" :value="item.grade"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="实借起始时间" v-model="form.start" value-format="yyyy-MM-dd"
                                                        @change="starts"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="实借结束时间" v-model="form.end" value-format="yyyy-MM-dd"
                                                        @change="ends"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="最后应还起始时间" v-model="form.starts" value-format="yyyy-MM-dd"
                                                        @change="started"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="最后应还结束时间" v-model="form.ends" value-format="yyyy-MM-dd"
                                                        @change="ended"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                    <el-button type="primary" @click="Search">搜索</el-button>
                                    <el-button type="success" @click="dialogTables=true">一键扣款</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%;line-height: 60px;">
                                <el-table-column :resizable='false' type="selection" width="55" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="orderNumber" label="编号" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="trueName" label="姓名" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="bankcardName" label="银行卡号" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="orderCreateTime" label="实借时间" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="address" label="实借/放款总金额" width="145" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="deferAfterReturntime" label="最后应还时间" width="140" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="overdueGrade" label="逾期等级" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="overdueNumberOfDays" label="逾期天数" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="逾期罚金/含逾应还总金额" width="200" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.interestPenaltySum}}/{{scope.row.order_money}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="realityAccount" label="实还金额" width="160" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="查看详情" width="150" align="center">
                                    <template slot-scope="scope">
                                        <span class="blue" @click="watch(scope.row.trueName,scope.row.orderId)">查看详情</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' label="操作" align="center">
                                    <template slot-scope="scope">
                                        <span class="blue" @click="kou(scope.row.orderId,scope.row.orderNumber,scope.row.userId,scope.row.trueName,scope.row.surplus_money,scope.row.realityAccount)">扣款</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-dialog :title="title" :visible.sync="Table" customClass="cuse">
                                <el-table border :data="gridData">
                                    <el-table-column :resizable='false' property="deduction_time" label="扣款时间" align="center"></el-table-column>
                                    <el-table-column :resizable='false' property="deductionproportion" label="扣款比例（%）" align="center"></el-table-column>
                                    <el-table-column :resizable='false' property="deduction_money" label="扣款金额" align="center"></el-table-column>
                                </el-table>
                            </el-dialog>
                            <el-dialog title="一键扣款" :visible.sync="dialogTable" customClass="cus" center>
                                <table cellspacing="0" cellpadding="15" class="tab_on">
                                    <tr>
                                        <th>扣款比例设置</th>
                                        <td>
                                            <el-select v-model="bili" placeholder="100%" style="width:200px">
                                                <el-option label="100%" value="100%"></el-option>
                                                <el-option label="50%" value="50%"></el-option>
                                                <el-option label="25%" value="25%"></el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>已选总人数</th>
                                        <td>1</td>
                                    </tr>
                                </table>
                                <el-button type="primary" @click="koukuan" class="kou">扣款</el-button>
                            </el-dialog>
                            <el-dialog title="一键扣款" :visible.sync="dialogTables" customClass="cus" center>
                                <table cellspacing="0" cellpadding="15" class="tab_on">
                                    <tr>
                                        <th>扣款比例设置</th>
                                        <td>
                                            <el-select v-model="bilis" placeholder="100%" style="width:200px">
                                                <el-option label="100%" value="100"></el-option>
                                                <el-option label="50%" value="50"></el-option>
                                                <el-option label="25%" value="25"></el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>已选总人数</th>
                                        <td>{{total}}</td>
                                    </tr>
                                </table>
                                <el-button type="primary" @click="koukuans" class="kou">扣款</el-button>
                            </el-dialog>
                            <div class="block">
                                <el-pagination
                                    :current-page="page"
                                    :page-size="Pagesize"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCount"
                                    :total="totalCount">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(40)">
                <el-tab-pane label="扣款记录表" name="second">
                    <div class="back">
                        <h2>扣款记录表</h2>
                        <div class="main">
                            <el-form :model="formList" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="起始时间" v-model="formList.start" value-format="yyyy-MM-dd" @change="start"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="结束时间" v-model="formList.end" value-format="yyyy-MM-dd" @change="end"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Searchs">搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableDatas" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                                <el-table-column :resizable='false' prop="deduction_time" label="操作时间" width="175" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="account" label="操作人" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="deductionproportion" label="扣款比例(%)" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="userNum" label="已选扣款用户总数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="shiNum" label="扣款失败用户数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="chengNum" label="成功扣款用户数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="cdata" label="成功扣款用户比率(%)" width="175" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="deduction_money" label="成功扣款总金额" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="查看扣款清单" align="center">
                                    <template slot-scope="scope">
                                        <span class="blue" @click="watchs(scope.row.deduction_time)">扣款清单</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-dialog title="扣款总详情" :visible.sync="Tables" customClass="cuses">
                                <el-table border :data="gridDatas">
                                    <el-table-column :resizable='false' property="deduction_time" label="扣款时间" align="center"></el-table-column>
                                    <el-table-column :resizable='false' property="name" label="姓名" align="center"></el-table-column>
                                    <el-table-column :resizable='false' property="collection_money" label="(扣款前)含逾应还金额" width="190" align="center"></el-table-column>
                                    <el-table-column :resizable='false' property="deductionproportion" label="扣款比例" align="center"></el-table-column>
                                    <el-table-column :resizable='false' property="deduction_money" label="扣款金额" align="center"></el-table-column>
                                </el-table>
                            </el-dialog>
                            <div class="block">
                                <el-pagination :current-page="pages" :page-size="Pagesizes" layout="total, prev, pager, next, jumper" :page-count="totalPageCounts"
                                               :total="totalCounts"></el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(68)">
                <el-tab-pane label="自动扣款设置" name="third">
                    <div class="back">
                        <h2>自动扣款设置</h2>
                        <div class="main">
                            <el-table border :data="autoList" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                                <el-table-column :resizable='false' prop="overdueday" label="逾期天数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="timing" label="时间点" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="rate" label="比率" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="info" size="mini" slot="reference" @click="openEditDialog(scope.row.id)">编辑</el-button>
                                        <el-popover :ref="`popover-${scope.$index}`" placement="bottom-end" width="200" trigger="click">
                                            <span class="content">确认删除定时器？</span>
                                            <el-button class="confire" size="mini" type="danger" @click="deleteAuto(scope)">确认</el-button>
                                            <el-button type="danger" size="mini" slot="reference">删除</el-button>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="open" @click="openAddDialog()">
                                <i class="el-icon-plus"></i>
                                <span>添加定时任务</span>
                            </div>
                            <div class="block">
                                <el-pagination :current-page="page3" :page-size="pageSize3" layout="total, prev, pager, next, jumper" :page-count="totalPageCount3" :total="totalCount3"
                                               @current-change="currentChange"></el-pagination>
                            </div>
                        </div>
                    </div>
                    <el-dialog title="添加定时任务" :visible.sync="addDialogVisible" customClass="customWidthe">
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
                                <th>扣款比率%</th>
                                <td>
                                    <el-input type='number' placeholder="请输入比率" v-model="addObject.rate"></el-input>
                                </td>
                            </tr>
                        </table>
                        <el-button type="primary" class="confire" @click="saveAdd()">保存</el-button>
                        <el-button class="confire" @click="addDialogVisible=false">关闭</el-button>
                        <br/>
                    </el-dialog>
                    <el-dialog title="编辑定时任务" :visible.sync="editDialogVisible" customClass="customWidthe">
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
                                <th>扣款比率%</th>
                                <td>
                                    <el-input type='number' placeholder="请输入比率" v-model="editObject.rate"></el-input>
                                </td>
                            </tr>
                        </table>
                        <el-button type="primary" class="confire" @click="saveEdit()">保存</el-button>
                        <el-button class="confire" @click="editDialogVisible=false">关闭</el-button>
                        <br/>
                    </el-dialog>
                </el-tab-pane>
            </template>
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
                gridDatas: [],
                autoList: [],
                level: [],
                activeName: "first",
                form: {
                    name: "",
                    id: "",
                    phone: "",
                    start: "",
                    end: "",
                    starts: "",
                    ends: "",
                    bankcardName: "",
                    level: ""
                },
                formList: {
                    start: "",
                    end: ""
                },
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                pages: 1,
                Pagesizes: 10,
                totalPageCounts: 0,
                totalCounts: 0,
                title: "",
                Table: false,
                Tables: false,
                dialogTable: false,
                dialogTables: false,
                bili: "",
                bilis: "",
                orderId: "",
                orderNumber: "",
                userId: "",
                companyId: "",
                trueName: "",
                surplus_money: "",
                realityAccount: "",
                Phone: "",
                total: "",
                page3: 1,
                pageSize3: 10,
                totalCount3: 0,
                totalPageCount3: 0,
                addDialogVisible: false,
                editDialogVisible: false,
                addObject: {},
                editObject: {},
            }
        },
        created() {
            if (this.isInArray(39)) {
                this.getData(this.page, this.Pagesize)
            }
            if (this.isInArray(40)) {
                this.get()
            }
            if (this.isInArray(68)) {
                this.queryAutoList();
            }
        },
        methods: {
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            saveEdit() {
                var that = this;
                this.editObject.companyid = window.localStorage.getItem("companyid");
                this.axios.get('/bankauto/updateByPrimaryKey', {
                    params: this.editObject
                }).then(res => {
                    that.$message({
                        type: "success",
                        message: "编辑成功"
                    });
                    that.queryAutoList();
                    that.editDialogVisible = false;
                })
            },
            openEditDialog(id) {
                var that = this;
                that.axios.get('/bankauto/selectByPrimaryKey', {
                    params: {id: id}
                }).then(res => {
                    that.editObject = res.data;
                    that.editDialogVisible = true;
                });
            },
            deleteAuto(scope) {
                var that = this;
                var id = scope.row.id;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                that.axios.get('/bankauto/upaFaldel', {
                    params: {id: id}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    that.queryAutoList();
                });
            },
            currentChange(page) {
                var that = this;
                that.page3 = page;
                that.queryAutoList();
            },
            saveAdd() {
                var that = this;
                this.addObject.companyid = window.localStorage.getItem("companyid");
                this.axios.get('/bankauto/insert', {
                    params: this.addObject
                }).then(res => {
                    that.$message({
                        type: "success",
                        message: "添加成功"
                    });
                    that.queryAutoList();
                    that.addDialogVisible = false;
                })
            },
            openAddDialog() {
                var that = this;
                that.addObject = {};
                that.addDialogVisible = true;
            },
            queryAutoList() {
                var that = this;
                this.axios.get('/bankauto/queryAll', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page: that.page3,
                    }
                }).then(res => {
                    this.autoList = res.data.bankautolist
                    this.page3 = res.data.pageutil.page
                    this.pageSize3 = res.data.pageutil.pageSize
                    this.totalPageCount3 = res.data.pageutil.totalPageCount
                    this.totalCount3 = res.data.pageutil.totalCount
                })
            },
            starts(val) {
                this.form.start = val
            },
            ends(val) {
                this.form.end = val
            },
            started(val) {
                this.form.starts = val
            },
            ended(val) {
                this.form.ends = val
            },
            start(val) {
                this.formList.start = val
            },
            end(val) {
                this.formList.end = val
            },
            get() {
                this.axios
                    .get("operation/YuqiM", {
                        params: {
                            companyId: window.localStorage.getItem("companyid")
                        }
                    })
                    .then(res => {
                        this.level = res.data.OverdueClass;
                    });
            },
            getData(page, Pagesize) {
                this.axios.get('Chanpay/SelectBankName', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails
                    this.page = res.data.Orderdetails.page
                    this.Pagesize = res.data.Orderdetails.Pagesize
                    this.totalCount = res.data.Orderdetails.length
                })
            },
            gets(pages, Pagesizes) {
                this.axios.get('Chanpay/BankdeduDta', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page: this.pages,
                        Pagesize: this.Pagesizes
                    }
                }).then(res => {
                    this.tableDatas = res.data.Bankdeduction
                    this.pages = res.data.Bankdeduction.page
                    this.Pagesizes = res.data.Bankdeduction.Pagesize
                    this.totalCounts = res.data.Bankdeduction.length
                    for (var i = 0; i < res.data.Bankdeduction.length; i++) {
                        res.data.Bankdeduction[i].cdata = ((res.data.Bankdeduction[i].chengNum / res.data.Bankdeduction[i].userNum) * 100)
                        if (res.data.Bankdeduction[i].cdata != 0) {
                            res.data.Bankdeduction[i].cdata = (res.data.Bankdeduction[i].cdata).toFixed(2)
                        }
                    }
                })
            },
            handleClick(tab, event) {
                if (this.activeName == "second") {
                    this.gets(this.pages, this.Pagesizes)
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.total = val.length;
                this.orderId = (val.map(item => item.orderId)).join();
                this.orderNumber = (val.map(item => item.orderNumber));
                this.userId = (val.map(item => item.userId)).join();
                this.trueName = (val.map(item => item.trueName));
                this.surplus_money = (val.map(item => item.surplus_money));
                this.Phone = (val.map(item => item.Phone));
                console.log(this.orderId, this.total)
            },
            kou(orderId, orderNumber, userId, trueName, surplus_money, realityAccount) {
                this.dialogTable = true
                this.orderId = orderId
                this.orderNumber = orderNumber
                this.userId = userId
                this.trueName = trueName
                this.surplus_money = surplus_money
                this.realityAccount = realityAccount
            },
            koukuan() {
                this.axios.get('Chanpay/SendBank', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderIds: this.orderId,
                        deductionproportion: this.bili,
                        sys_userId: window.localStorage.getItem("userid")
                    }
                }).then(res => {
                    this.$confirm(res.data.desc, "提示", {
                        type: "warning",
                        center: true
                    }).then(() => {

                    })
                })
            },
            koukuans() {
                if (this.total == 0) {
                    this.$confirm("请先选择订单", "提示", {
                        type: "warning",
                        center: true
                    })
                } else {
                    this.axios.get('Chanpay/SendBank', {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            orderIds: this.orderId,
                            deductionproportion: this.bilis,
                            sys_userId: window.localStorage.getItem("userid")
                        }
                    }).then(res => {
                        if (res.data.code == 200) {
                            this.$confirm(res.data.desc, "提示", {
                                type: "warning",
                                center: true
                            }).then(() => {

                            })
                        } else {
                            this.$confirm("扣款失败", "提示", {
                                type: "warning",
                                center: true
                            }).then(() => {

                            })
                        }

                    })
                }
            },
            Reset() {
                this.form = {
                    name: "",
                    id: "",
                    phone: "",
                    start: "",
                    end: "",
                    starts: "",
                    ends: "",
                    bankcardName: "",
                    level: ""
                }
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                if (this.form.starts != "") {
                    var starts = this.form.starts + " " + "00:00:00"
                }
                if (this.form.ends != "") {
                    var ends = this.form.ends + " " + "23:59:59"
                }
                this.axios.get('Chanpay/SelectBankName', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.form.id,
                        trueName: this.form.name,
                        phone: this.form.phone,
                        bankcardName: this.form.bankcardName,
                        orderCreateTimeStatu_time: start,
                        orderCreateTimeEnd_time: end,
                        deferAfterReturntimeStatu_time: starts,
                        deferAfterReturntimeEnd_time: ends,
                        overdueGrade: this.form.level,
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails
                    this.totalCount = res.data.Orderdetails.length
                })
            },
            watch(trueName, orderId) {
                this.Table = true
                this.title = trueName
                this.axios.get('Chanpay/AllBankDetails', {
                    params: {
                        orderId
                    }
                }).then(res => {
                    this.gridData = res.data.Bankdeduction
                })
            },
            watchs(deduction_time) {
                this.Tables = true
                this.axios.get('Chanpay/AllDetails', {
                    params: {
                        sys_userId: window.localStorage.getItem("userid"),
                        deduction_time
                    }
                }).then(res => {
                    this.gridDatas = res.data.Bankdeduction
                })
            },
            Searchs() {
                if (this.formList.start != "") {
                    var start = this.formList.start + " " + "00:00:00"
                }
                if (this.formList.end != "") {
                    var end = this.formList.end + " " + "23:59:59"
                }
                this.axios.get('Chanpay/BankdeduDta', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        statu_time: start,
                        end_time: end
                    }
                }).then(res => {
                    this.tableDatas = res.data.Bankdeduction
                    this.totalCounts = res.data.Bankdeduction.length
                    for (var i = 0; i < res.data.Bankdeduction.length; i++) {
                        res.data.Bankdeduction[i].cdata = ((res.data.Bankdeduction[i].chengNum / res.data.Bankdeduction[i].userNum) * 100)
                        if (res.data.Bankdeduction[i].cdata != 0) {
                            res.data.Bankdeduction[i].cdata = (res.data.Bankdeduction[i].cdata).toFixed(2)
                        }
                    }
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

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .single {
        margin-left: -15px;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .cus {
        width: 25%;
        text-align: center;
    }

    .cuse {
        width: 35%;
        text-align: center;
    }

    .cuses {
        width: 50%;
        text-align: center;
    }

    .tab_on {
        margin: 0 auto;
    }

    .blue {
        color: blue;
        cursor: pointer;
    }

    .kou {
        margin-top: 20px;
    }

    .customWidthe {
        width: 300px;
    }
</style>
