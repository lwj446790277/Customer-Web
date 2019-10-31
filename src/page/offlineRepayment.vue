<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是线下还款</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <!--  <el-tab-pane label="新增线下调账" name="first">
                  <div class="back">
                      <h2>新增线下调账</h2>
                      <div class="main">
                          <table cellpadding="30" cellspacing="0" class="tabe">
                              <tr>
                                  <th>项目名</th>
                                  <td>
                                      <el-input v-model="program" placeholder="请输入项目名"></el-input>
                                  </td>
                              </tr>
                              <tr>
                                  <th>收入还是支出</th>
                                  <td>
                                      <el-select v-model="receive" placeholder="收入" style="width:100%" @change="change">
                                          <el-option label="收入" value="收入"></el-option>
                                          <el-option label="支出" value="支出"></el-option>
                                      </el-select>
                                  </td>
                              </tr>
                              <tr>
                                  <th>{{title}}</th>
                                  <td>
                                      <el-select v-model="qudao" :placeholder="placeholder" style="width:100%">
                                          <el-option v-for="item in Thirdparty_interface" :key="item.value"
                                                     :label="item.name" :value="item.id"></el-option>
                                      </el-select>
                                  </td>
                              </tr>
                              <tr>
                                  <th>{{liushui}}</th>
                                  <td>
                                      <el-input v-model="huan" placeholder="请输入银行卡交易流水号"></el-input>
                                  </td>
                              </tr>
                              <tr>
                                  <th>输入金额</th>
                                  <td>
                                      <el-input v-model="money" placeholder="保留两位小数"></el-input>
                                  </td>
                              </tr>
                              <tr>
                                  <th>备注</th>
                                  <td>
                                      <el-input v-model="remarks" placeholder="请输入备注"></el-input>
                                  </td>
                              </tr>
                          </table>
                          <el-popover
                              placement="bottom"
                              width="300"
                              v-model="visible">
                              <p>保存后将不可删除修改，请确保操作无误</p>
                              <div style="text-align: right; margin: 0">
                                  <el-button @click="visible = false" class="left">返回</el-button>
                                  <el-button type="success" @click="add">是的</el-button>
                              </div>
                              <el-button type="primary" slot="reference" class="add">添加并保存</el-button>
                          </el-popover>
                      </div>
                  </div>
              </el-tab-pane>
              <el-tab-pane label="线下调账记录表" name="second">
                  <div class="back">
                      <h2>线下调账记录表</h2>
                      <div class="main">
                          <el-form :model="form" :inline="true" class="demo-form-inline">
                              <el-form-item>
                                  <el-input placeholder="放款/还款流水号" v-model="form.fang"></el-input>
                              </el-form-item>
                              &lt;!&ndash;							<el-form-item>&ndash;&gt;
                              &lt;!&ndash;								<el-input placeholder="还款流水号" v-model="form.huan"></el-input>&ndash;&gt;
                              &lt;!&ndash;							</el-form-item>&ndash;&gt;
                              <el-form-item>
                                  <el-col :span="11">
                                      <el-date-picker type="date" placeholder="起始时间" v-model="form.start"
                                                      value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                                  </el-col>
                              </el-form-item>
                              <el-form-item class="single">
                                  <el-col :span="11">
                                      <el-date-picker type="date" placeholder="结束时间" v-model="form.end"
                                                      value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                                  </el-col>
                              </el-form-item>
                              <el-form-item>
                                  <el-button type="warning" @click="Reset"
                                             style="background-color:#e3e4e7;border:transparent;color:#000">重置
                                  </el-button>
                                  <el-button type="primary" @click="Search">搜索</el-button>
                              </el-form-item>
                          </el-form>
                          &lt;!&ndash; <div class="statistics">
                              <ul>
                                  <li>线下调账总收入</li>
                                  <li class="num">10</li>
                                  <li>线下调账总支出</li>
                                  <li class="num">10</li>
                              </ul>
                          </div> &ndash;&gt;
                          <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
                              <el-table-column prop="offinetransfertime" label="日期" align="center"></el-table-column>
                              <el-table-column prop="account" label="财务操作人" align="center"></el-table-column>
                              <el-table-column prop="projectname" label="项目名" align="center"></el-table-column>
                              <el-table-column prop="thname" label="放款/还款渠道" align="center"></el-table-column>
                              <el-table-column prop="number" label="放款/还款流水号" align="center"></el-table-column>
                              <el-table-column prop="income" label="收入" align="center"></el-table-column>
                              <el-table-column prop="expenditure" label="支出" align="center"></el-table-column>
                              <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
                          </el-table>
                          <div class="block">
                              <el-pagination
                                  :current-page.sync="page"
                                  :page-size.sync="Pagesize"
                                  layout="total, prev, pager, next, jumper"
                                  :page-count="totalPageCount"
                                  :total="totalCount"
                              ></el-pagination>
                          </div>
                      </div>
                  </div>
              </el-tab-pane>-->
            <template v-if="isInArray(37)">
                <el-tab-pane label="新增线下减免调账" name="third">
                    <div class="back">
                        <h2>新增线下减免调账</h2>
                        <div class="main">
                            <el-form :model="formList" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-input placeholder="手机号" v-model="formList.phone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="身份证号" v-model="formList.idcard"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Searchs">搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <table cellpadding="20" cellspacing="0" class="tab">
                                <tr>
                                    <th>订单编号</th>
                                    <td>
                                        <div>{{orderNumber}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>姓名</th>
                                    <td>
                                        <div>{{name}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>手机号</th>
                                    <td>
                                        <div>{{phone}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>身份证号</th>
                                    <td>
                                        <div>{{idcard}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>贷款方式</th>
                                    <td>
                                        <div>{{borrowMoneyWay}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>还款期数</th>
                                    <td>
                                        <div>{{borrowTimeLimit}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>实借时间</th>
                                    <td>
                                        <div>{{orderCreateTime}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>借款总金额/放款总金额</th>
                                    <td class="red">
                                        <div>{{realityAccount}}/{{makeLoans}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>应还时间</th>
                                    <td>
                                        <div>{{shouldReturnTime}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>逾期天数</th>
                                    <td>
                                        <div>{{overdueNumberOfDays}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>含逾总利息/应还总金额</th>
                                    <td class="red">
                                        <div>{{interestPenaltySum}}/{{realityBorrowMoney}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>放款流水号</th>
                                    <td>
                                        <div>{{pipelinenumber}}</div>
                                    </td>
                                </tr>
                            </table>
                            <table cellpadding="20" cellspacing="0" class="tabs">
                                <tr>
                                    <th>线下减免调账说明</th>
                                    <td>
                                        <div>
                                            <p>1.线上减免调账，线下手工记账，线下减免调账，三者是有区别的</p>
                                            <p>2.线上减免调账：是用户承诺但未还的减免调账，订单会有三个状态（期限内，已还清，逾期）</p>
                                            <p>3.线下手工记账：可以记账收入，也可以记账支出，记账的包含的范围更宽泛</p>
                                            <p>
                                                4.线下减免调账：用户已经从其他方式还款给我们的工作人员，还款输入在“线下用户已还金额”，点击“保存”后用户APP端的应还总金额将直接结清，请确保已经收到款，否则人财两空</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>线下用户已还金额</th>
                                    <td class="table-high-light2">
                                        <el-input-number class="inpu" :max="realityBorrowMoney-0" :min="0.01" v-model="amountmoney" style="line-height: 50px"></el-input-number>
                                    </td>
                                </tr>
                                <tr>
                                    <th>还款备注</th>
                                    <td class="table-high-light2">
                                        <el-input class="inpu" v-model="remarks"></el-input>
                                    </td>
                                </tr>
                            </table>
                            <el-button type="warning" class="save" @click="resetText">重置</el-button>
                            <el-popover placement="bottom" width="300" v-model="visibles">
                                <p>保存后，用户APP端的应还总金额将结清，请确保线下已收到款，否则人才两空</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button @click="visibles = false" class="left">返回</el-button>
                                    <el-button type="success" @click="save">是的</el-button>
                                </div>
                                <el-button type="primary" slot="reference" class="save">添加并保存</el-button>
                            </el-popover>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(38)">
                <el-tab-pane label="线下减免调账记录" name="forth">
                    <div class="back">
                        <h2>线下减免调账记录</h2>
                        <div class="main">
                            <el-form :model="formForth" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-input placeholder="用户订单" v-model="formForth.id"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="用户姓名" v-model="formForth.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="手机号" v-model="formForth.phone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="起始时间" v-model="formForth.start" value-format="yyyy-MM-dd" @change="start"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="结束时间" v-model="formForth.end" value-format="yyyy-MM-dd" @change="end"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="warning" @click="ResetForth" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                    <el-button type="primary" @click="SearchForth">搜索</el-button>
                                    <el-button type="danger" @click="downloadSource">下载</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableDataForth" tooltip-effect="dark" style="width: 100%;line-height: 60px">
                                <el-table-column :resizable='false' prop="sedn_time" label="操作时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="account" label="操作人" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="orderNumber" label="用户订单" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="name" label="用户姓名" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="makeLoans" label="减免前应还金额" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="offusermoney" label="线下用户已还金额" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="remarks" label="还款备注" align="center"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    :current-page="pages"
                                    :page-size="pageSizes"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCounts"
                                    :total="totalCounts"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
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
                title: "还款渠道",
                liushui: "还款流水号",
                placeholder: "选择还款渠道",
                visible: false,
                visibles: false,
                tableData: [],
                tableDataForth: [],
                Thirdparty_interface: [],
                activeName: "third",
                program: "",
                receive: "",
                qudao: "",
                huan: "",
                money: "",
                remarks: "",
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                pages: 1,
                pageSizes: 10,
                totalPageCounts: 0,
                totalCounts: 0,
                form: {
                    fang: "",
                    huan: "",
                    start: "",
                    end: ""
                },
                formList: {
                    phone: "",
                    idcard: ""
                },
                formForth: {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: ""
                },
                orderId: "",
                orderNumber: "",
                name: "",
                phone: "",
                idcard: "",
                borrowMoneyWay: "",
                borrowTimeLimit: "",
                orderCreateTime: "",
                realityBorrowMoney: 0,
                makeLoans: "",
                deferAfterReturntime: "",
                overdueNumberOfDays: "",
                interestPenaltySum: "",
                realityBorrowMoney: "",
                pipelinenumber: "",
                amountmoney: 0,
                realityAccount: '',
                shouldReturnTime: '',
                remarks: ""
            }
        },
        created() {
            if (this.isInArray(38)) {
                this.get()
            }
        },
        methods: {
            resetText() {
                this.orderId = '';
                this.orderNumber = '';
                this.shouldReturnTime = '';
                this.name = '';
                this.phone = '';
                this.idcard = '';
                this.realityAccount = '';
                this.borrowMoneyWay = '';
                this.borrowTimeLimit = '';
                this.orderCreateTime = '';
                this.realityBorrowMoney = '';
                this.makeLoans = '';
                this.deferAfterReturntime = '';
                this.overdueNumberOfDays = '';
                this.interestPenaltySum = '';
                this.realityBorrowMoney = '';
                this.pipelinenumber = '';

                this.amountmoney = '';
                this.remarks = '';
            },
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            timeChange(val) {
                // console.log(val)
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            start(val) {
                // console.log(val)
                this.formForth.start = val
            },
            end(val) {
                this.formForth.end = val
            },
            handleClick(tab, event) {
                if (this.activeName == "second") {
                    this.getData(this.page, this.Pagesize)
                } else {
                    if (this.activeName == "forth") {
                        this.getForth(this.pages, this.Pagesizes)
                    }
                }
            },
            get() {
                this.axios.get('fina/RepaymentAll', {
                    params: {
                        compayId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    this.Thirdparty_interface = res.data.Repayment_setting
                })
            },
            getData(page, Pagesize) {
                this.axios.get('fina/Orderoffline', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Undertheline
                    this.page = res.data.Undertheline.page
                    this.Pagesize = res.data.Undertheline.Pagesize
                    this.totalCount = res.data.Undertheline.length
                    var line = res.data.Undertheline
                    for (var i = 0; i < line.length; i++) {
                        if (line[i].state == "支出") {
                            this.tableData[i].income = 0
                            this.tableData[i].expenditure = line[i].money
                        } else {
                            this.tableData[i].income = line[i].money
                            this.tableData[i].expenditure = 0
                        }
                    }
                })
            },
            getForth(pages, pageSizes) {
                this.axios.get('fina/AllXiaOrder', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page: this.pages,
                        Pagesize: this.pageSizes
                    }
                }).then(res => {
                    this.tableDataForth = res.data.Undertheline
                    this.pages = res.data.Undertheline.page
                    this.pageSizes = res.data.Undertheline.Pagesize
                    this.totalCounts = res.data.Undertheline.length
                })
            },
            change(val) {
                console.log(val)
                if (val == "支出") {
                    this.title = "放款渠道"
                    this.liushui = "放款流水号"
                    this.placeholder = "选择放款渠道"
                    this.axios.get('fina/ThirdpatyAll ', {
                        params: {
                            compayId: window.localStorage.getItem("companyid")
                        }
                    }).then(res => {
                        this.Thirdparty_interface = res.data.Loan_setting
                    })
                } else {
                    this.title = "还款渠道"
                    this.liushui = "还款流水号"
                    this.placeholder = "选择还款渠道"
                    this.axios.get('fina/RepaymentAll ', {
                        params: {
                            compayId: window.localStorage.getItem("companyid")
                        }
                    }).then(res => {
                        this.Thirdparty_interface = res.data.Repayment_setting
                    })
                }
            },
            add() {
                this.axios.get('fina/AddUndert', {
                    params: {
                        finance_id: window.localStorage.getItem("userid"),
                        projectname: this.program,
                        channel: this.qudao,
                        state: this.receive,
                        money: this.money,
                        number: this.huan,
                        remarks: this.remarks,
                        sys_userId: window.localStorage.getItem("userid")
                    }
                }).then(res => {
                    this.$confirm(res.data.desc, '提示', {
                        type: 'warning',
                        center: true
                    })
                    this.program = undefined
                    this.qudao = undefined
                    this.receive = undefined
                    this.money = undefined
                    this.huan = undefined
                    this.remarks = undefined
                    this.visible = false
                })
            },
            clear() {
                this.program = ""
                this.receive = ""
                this.qudao = ""
                this.huan = ""
                this.money = ""
                this.remarks = ""
            },
            Reset() {
                this.form = {
                    fang: "",
                    huan: "",
                    start: "",
                    end: ""
                }
            },
            ResetForth() {
                this.formForth = {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: ""
                }
            },
            downloadSource() {
                var that = this;
                if (this.formForth.start != "") {
                    var starts = this.formForth.start + " " + "00:00:00"
                }
                if (this.formForth.end != "") {
                    var ends = this.formForth.end + " " + "23:59:59"
                }
                var param = {
                    companyId: window.localStorage.getItem("companyid"),
                    orderNumber: this.formForth.id,
                    name: this.formForth.name,
                    phone: this.formForth.phone,
                    start_time: starts,
                    end_time: ends
                }
                that.downloadExcel("/fina/AllXiaOrderexport", param, '线下减免调账记录');
            },
            SearchForth() {
                if (this.formForth.start != "") {
                    var starts = this.formForth.start + " " + "00:00:00"
                }
                if (this.formForth.end != "") {
                    var ends = this.formForth.end + " " + "23:59:59"
                }
                this.axios.get('fina/AllXiaOrder', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.formForth.id,
                        name: this.formForth.name,
                        phone: this.formForth.phone,
                        start_time: starts,
                        end_time: ends
                    }
                }).then(res => {
                    this.tableDataForth = res.data.Undertheline
                    this.totalCounts = res.data.Undertheline.length
                })
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                this.axios.get('fina/Orderoffline', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        repaymentnumber: this.form.fang,
                        // repaymentnumber: this.form.huan,
                        start_time: start,
                        end_time: end
                    }
                }).then(res => {
                    this.tableData = res.data.Undertheline
                    this.totalCount = res.data.Undertheline.length
                    var line = res.data.Undertheline
                    for (var i = 0; i < line.length; i++) {
                        if (line[i].state == "支出") {
                            this.tableData[i].income = 0
                            this.tableData[i].expenditure = line[i].money
                        } else {
                            this.tableData[i].income = line[i].money
                            this.tableData[i].expenditure = 0
                        }
                    }
                })
            },
            Searchs() {
                this.axios.get('fina/OrderAcount', {
                    params: {
                        phone: this.formList.phone,
                        idcard_number: this.formList.idcard,
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    if (res.data.Orderdetails == '无数据') {
                        this.$message({
                            type: "error",
                            message: "无数据"
                        });
                        return false;
                    }
                    this.orderId = res.data.Orderdetails.orderId
                    this.orderNumber = res.data.Orderdetails.orderNumber
                    this.name = res.data.Orderdetails.name
                    this.phone = res.data.Orderdetails.phone
                    this.idcard = res.data.Orderdetails.idcard_number
                    this.borrowMoneyWay = res.data.Orderdetails.borrowMoneyWay
                    this.borrowTimeLimit = res.data.Orderdetails.borrowTimeLimit
                    this.orderCreateTime = res.data.Orderdetails.orderCreateTime
                    this.realityBorrowMoney = res.data.Orderdetails.realityBorrowMoney
                    this.makeLoans = res.data.Orderdetails.makeLoans
                    this.deferAfterReturntime = res.data.Orderdetails.deferAfterReturntime
                    this.overdueNumberOfDays = res.data.Orderdetails.overdueNumberOfDays
                    this.interestPenaltySum = res.data.Orderdetails.interestPenaltySum
                    this.realityBorrowMoney = res.data.Orderdetails.realityBorrowMoney
                    this.pipelinenumber = res.data.Orderdetails.pipelinenumber
                    this.realityAccount = res.data.Orderdetails.realityAccount
                    this.shouldReturnTime = res.data.Orderdetails.shouldReturnTime
                })
            },
            save() {
                this.axios.get('fina/Addoff', {
                    params: {
                        orderId: this.orderId,
                        offusermoney: this.amountmoney,
                        remarks: this.remarks,
                        fina_id: window.localStorage.getItem("userid"),
                        orderMoney: this.realityBorrowMoney
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$confirm(res.data.desc, '提示', {
                            type: 'warning',
                            center: true
                        })
                    }
                    this.orderId = undefined
                    this.orderNumber = undefined
                    this.name = undefined
                    this.phone = undefined
                    this.idcard = undefined
                    this.borrowMoneyWay = undefined
                    this.borrowTimeLimit = undefined
                    this.orderCreateTime = undefined
                    this.realityBorrowMoney = undefined
                    this.makeLoans = undefined
                    this.deferAfterReturntime = undefined
                    this.overdueNumberOfDays = undefined
                    this.interestPenaltySum = undefined
                    this.realityBorrowMoney = undefined
                    this.pipelinenumber = undefined
                    this.realityAccount = undefined
                    this.shouldReturnTime = undefined
                    this.amountmoney = undefined
                    this.remarks = undefined
                    this.visibles = false
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
        min-height: 90vh;
    }

    .single {
        margin-left: -15px;
    }

    .tabe {
        margin: 20px auto;
        width: 35%;
        border-color: #dfe6ec;
    }

    .add {
        width: 100px;
        margin-left: 50%;
    }

    .statistics {
        width: 100%
    }

    .statistics ul {
        width: 100%;
    }

    .statistics ul li {
        width: 24.92%;
        line-height: 60px;
        margin-bottom: -1px;
        float: left;
        text-align: center;
        border: 1px solid #dfe6ec;
    }

    .statistics ul li.num {
        margin-left: -1px;
        margin-right: -1px;
        color: red;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .tab {
        width: 50%;
        border-color: #dfe6ec;
        float: left;
        margin-right: -2px;
    }

    .tab td div {
        margin-top: -10px;
        margin-bottom: -10px;
        width: 90%;
        height: 40px;
        line-height: 40px;
        background-color: #f3f6fb;
    }

    .tabs td div {
        margin-top: -10px;
        margin-bottom: -10px;
        width: 100%;
        text-align: left;
        background-color: #f3f6fb;
    }

    .tabs td .el-input .el-input__inner {
        background-color: #f3f6fb;
        border: transparent;
    }

    .tabs {
        width: 50%;
        border-color: #dfe6ec;
    }

    .tab th {
        width: 50%;
        text-align: left;
    }

    .tabs th {
        width: 50%;
        text-align: left;
    }

    td {
        text-align: center;
    }

    .inpu {
        width: 70%;
        margin-top: -10px;
        margin-bottom: -10px;
    }

    .red {
        color: red;
    }

    .save {
        margin-top: 20px;
        float: right;
        width: 100px;
        margin-right: 20%;
    }

    .el-popover {
        padding: 20px;
    }

    .el-popover p {
        font-size: 16px;
        margin-bottom: 15px;
    }

    .table-high-light2 .el-input {
        border: 1px solid red;
    }

    h2 {
        margin-bottom: 15px
    }
</style>
