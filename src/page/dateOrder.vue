<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <template v-if="isInArray(7)">
                <el-tab-pane label="未逾期未分配" name="first">
                    <div class="back">
                        <h2>未逾期未分配</h2>
                        <div class="main">
                            <span class="tet">(注意:所有用户的数据只在今天的"延期后应还时间"出现，之后用户的数据将出现在"催收预警及管理")</span>
                            <div class="right">
                                <el-select placeholder="分配催收员" v-model="person">
                                    <el-option v-for="item in per" :key="item.id" :label="item.reallyName" :value="item.id"></el-option>
                                </el-select>
                                <el-button type="success" @click="oneKey" class="oneKey" size="small">一键分配</el-button>
                            </div>
                            <el-table border ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column :resizable='false' type="selection" width="40" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="orderNumber" label="订单编号" align="center" width="140"></el-table-column>
                                <el-table-column :resizable='false' prop="name" label="姓名" align="center" width="80"></el-table-column>
                                <el-table-column :resizable='false' prop="phone" label="手机号" align="center" width="120"></el-table-column>
                                <el-table-column :resizable='false' prop="borrowMoneyWay" label="贷款方式" align="center" width="100"></el-table-column>
                                <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期数" align="center" width="100"></el-table-column>
                                <el-table-column :resizable='false' prop="orderCreateTime" label="实借时间" align="center" width="180"></el-table-column>
                                <el-table-column :resizable='false' prop="realityAccount/makeLoans" label="实借金额/放款金额" width="160" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.realityAccount}}/{{scope.row.makeLoans}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="interestOnArrears" label="应还利息/应还金额" width="160" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.interestInAll}}/{{scope.row.realityBorrowMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="usernum" label="借款次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="defeNum" label="延期次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="操作" align="center" width="100">
                                    <template slot-scope="scope">
                                        <el-popover :ref="`popover+${scope.$index}`" placement="bottom-end" width="300" trigger="click">
                                            <div v-if="show">
                                                <p>请选择催收员，再分配催单</p>
                                            </div>
                                            <div v-if="hidden">
                                                <p>确定要把催单分配给该催收员吗？</p>
                                                <el-button class="confire" type="success" @click="confire(scope.row.id,scope)">是的</el-button>
                                            </div>
                                            <span class="content" slot="reference" @click="see(scope.row.orderId)">分配催单</span>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination :current-page="page" :page-size="Pagesize" layout="total,  prev, pager, next, jumper"
                                               :page-count="totalPageCount" :total="totalCount" @current-change="currentChange">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(8)">
                <el-tab-pane label="未逾期已分配" name="second">
                    <div class="back">
                        <h2>未逾期已分配</h2>
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
                                    <el-button type="primary" @click="Search">搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableDataTwo" style="width: 100%">
                                <el-table-column :resizable='false' prop="name" label="姓名" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="orderCreateTime" label="实借时间" width="93" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="realityBorrowMoney/makeLoans" label="实借总金额/放款总金额" width="120" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="interestInAll" label="应还利息" width="100" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="interestSum" label="应还金额" width="100" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="onceDeferredDay" label="每次延期天数" width="90" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="shouldReturnTime" label="应还时间" width="100" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="address" label="延期次数/延期金额" width="110" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.defeNum}}/{{scope.row.defeMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="usernum" label="借款次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="状态" width="90" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStatus==0?'期限中':scope.row.orderStatus==1?'已逾期':scope.row.orderStatus==2?'已延期':scope.row.orderStatus==3?'已还款':scope.row.orderStatus==4?'已坏账':scope.row.orderStatus==5?'放款中':'未知'}}
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="reallyName" label="催收人" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="collectiondate" label="分配催收时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="查看" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click="showPhoneNumberList(scope.row.userId)">紧急联系人</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-popover :ref="`popover+${scope.$index}`" placement="bottom-end" width="300" trigger="click">
                                            <div>
                                                <p>确定要取消催收该订单已催收状态吗？</p>
                                                <el-button class="confire" type="success" @click="cancelOrder(scope.row.overdue_id,scope)">是的</el-button>
                                            </div>
                                            <span class="content" slot="reference">取消催收</span>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination :current-page="pageOne" :page-size="PagesizeOne" layout="total,  prev, pager, next, jumper"
                                               :page-count="totalPageCountOne" :total="totalCountOne">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(9)">
                <el-tab-pane label="逾前催收率报表" name="third">
                    <div class="back">
                        <h2>逾前催收率报表</h2>
                        <div class="main">
                            <el-form :model="formThree" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="起始时间" v-model="formThree.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="结束时间" v-model="formThree.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="SearchThird">搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableDataThree" style="width: 100%">
                                <el-table-column :resizable='false' prop="collectiondate" label="日期" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="shouldReapyMoney" label="应还金额" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="collection_count" label="未分配总数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="notconnected" label="电话未接通数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="connected" label="电话已接通数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sameday" label="当天未还款数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="paymentmade" label="当天已还款数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="paymentmadeData" label="当天还款率(%)" align="center"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    :current-page="pageTwo"
                                    :page-size="PagesizeTwo"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCountTwo"
                                    :total="totalCountTwo"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(10)">
                <el-tab-pane label="逾前催收员报表" name="fourth">
                    <div class="back">
                        <h2>逾前催收员报表</h2>
                        <div class="main">
                            <el-form :model="formFour" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="起始时间" v-model="formFour.start" value-format="yyyy-MM-dd" @change="start"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="结束时间" v-model="formFour.end" value-format="yyyy-MM-dd" @change="end"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="SearchForth">搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableDataFour" style="width: 100%">
                                <el-table-column :resizable='false' prop="reallyName" label="催收员" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="collection_count" label="已分配总数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="notconnected" label="电话未接通数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="connected" label="电话已接通数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="paymentmade" label="当天未还款数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sameday" label="当天已还款数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="paymentmadeData" label="当天还款率(%)" align="center"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    :current-page="pageThree"
                                    :page-size="PagesizeThree"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCountThree"
                                    :total="totalCountThree"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(11)">
                <el-tab-pane label="我的逾前催收订单" name="fifth">
                    <div class="back">
                        <h2>我的逾前催收订单</h2>
                        <div class="main">
                            <el-table border :data="tableDataFive" style="width: 100%">
                                <el-table-column :resizable='false' prop="name" label="姓名" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="orderCreateTime" width="120" label="实借时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="realityBorrowMoney/makeLoans" label="实借总金额/放款总金额" width="118" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="address" label="应还利息/应还金额" width="120" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.interestInAll}}/{{scope.row.shouldReapyMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="deferAfterReturntime" label="应还时间" width="120" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="address" label="延期次数/延期金额" width="120" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.defeNum}}/{{scope.row.defeMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' label="状态" width="90" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStatus==0?'期限中':scope.row.orderStatus==1?'已逾期':scope.row.orderStatus==2?'已延期':scope.row.orderStatus==3?'已还款':scope.row.orderStatus==4?'已坏账':scope.row.orderStatus==5?'放款中':'未知'}}
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="collectionTime" label="分配催收时间" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="address" label="电话状态" width="120" align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.type" placeholder="请选择" @change="change">
                                            <el-option label="电话已接通" value="电话已接通"></el-option>
                                            <el-option label="电话未接通" value="电话未接通"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' label="查看" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click="showPhoneNumberList(scope.row.userId)">紧急联系人</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' prop="address" label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-popover :ref="`popover+${scope.$index}`" placement="bottom-end" width="300" trigger="click">
                                            <div v-if="shows">
                                                <p>请先选择电话状态，再操作</p>
                                            </div>
                                            <div v-if="hide">
                                                <p>确认完成该联系吗？</p>
                                                <el-button class="confire" type="success" @click="confi(scope.row.type,scope.row.orderId,scope)">好的</el-button>
                                            </div>
                                            <span class="blue" slot="reference" @click="watch(scope.row.type)">完成联系</span>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    :current-page="pageFour"
                                    :page-size="PagesizeFour"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCountFour"
                                    :total="totalCountFour"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
        </el-tabs>
        <el-dialog title="紧急联系人" :visible.sync="dialogVisible" customClass="custom" center>
            <el-table border :data="phoneNumberList" tooltip-effect="dark" style="width: 100%">
                <el-table-column :resizable='false' prop="linkmanonerelation" label="关系类型" align="center"></el-table-column>
                <el-table-column :resizable='false' prop="linkmanonename" label="姓名" align="center"></el-table-column>
                <el-table-column :resizable='false' prop="linkmanonephone" label="手机号" align="center"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
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
                per: [],
                String: [],
                tableDataTwo: [],
                tableDataThree: [],
                tableDataFour: [],
                tableDataFive: [],
                activeName: "first",
                dialogVisible: false,
                person: "",
                form: {
                    id: "",
                    name: "",
                    phone: ""
                },
                formThree: {
                    time: "",
                    start: "",
                    end: ""
                },
                formFour: {
                    time: "",
                    start: "",
                    end: ""
                },
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                pageOne: 1,
                PagesizeOne: 10,
                totalPageCountOne: 0,
                totalCountOne: 0,
                pageTwo: 1,
                PagesizeTwo: 10,
                totalPageCountTwo: 0,
                totalCountTwo: 0,
                pageThree: 1,
                PagesizeThree: 10,
                totalPageCountThree: 0,
                totalCountThree: 0,
                pageFour: 1,
                PagesizeFour: 10,
                totalPageCountFour: 0,
                totalCountFour: 0,
                show: true,
                hidden: false,
                shows: true,
                hide: false,
                one: 12,
                two: 12,
                three: 12,
                four: 12,
                five: 12,
                six: 12,
                phoneNumberList: [],
            };
        },
        created() {
            if (this.isInArray(7)) {
                this.getData(this.page, this.Pagesize);
            }
            if (this.isInArray(8)) {
                this.getTwo(this.pageOne, this.PagesizeOne);
            }
            if (this.isInArray(9)) {
                this.getThree(this.pageTwo, this.PagesizeTwo);
            }
            if (this.isInArray(10)) {
                this.getFour(this.pageThree, this.PagesizeThree);
            }
            if (this.isInArray(11)) {
                this.getFive(this.pageFour, this.PagesizeFour);
            }
        },
        methods: {
            cancelOrder(orderId, scope) {
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                this.axios.get("postloanor/deleteoverdue", {
                    params: {
                        overdue_id: orderId,
                    }
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '取消成功'
                    });
                    this.Search();
                });
            },
            currentChange(val) {
                this.page = val;
                this.getData(this.page, this.Pagesize)
            },
            showPhoneNumberList(id) {
                var that = this;
                that.phoneNumberList = [];
                that.axios.get("user/queryUserAttesta", {
                    params: {
                        userid: id,
                    }
                }).then(res => {
                    var result = {};
                    result.linkmanonename = res.data.userAttestation.linkmanonename;
                    result.linkmanonephone = res.data.userAttestation.linkmanonephone;
                    result.linkmanonerelation = res.data.userAttestation.linkmanonerelation;
                    that.phoneNumberList.push(result);
                    var result2 = {};
                    result2.linkmanonename = res.data.userAttestation.linkmantwoname;
                    result2.linkmanonephone = res.data.userAttestation.linkmantwophone;
                    result2.linkmanonerelation = res.data.userAttestation.linkmantworelation;
                    that.phoneNumberList.push(result2);
                    that.dialogVisible = true;
                });
            },
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            getData(page, Pagesize) {
                this.axios.get("postloanor/CollectionNoOrder", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.page = res.data.pageutil.page;
                    this.Pagesize = res.data.pageutil.pageSize;
                    this.totalCount = res.data.pageutil.totalCount;
                    this.totalPageCount = res.data.pageutil.totalPageCount;
                    // this.totalPageCount = res.data.pageUtil.totalPage
                });
                this.axios.get("collection/collectionmember", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    this.per = res.data.collection_member;
                });
            },
            getTwo(pageOne, PagesizeOne) {
                this.axios.get("postloanor/NoCollection", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page: this.pageOne,
                        Pagesize: this.PagesizeOne
                    }
                }).then(res => {
                    this.tableDataTwo = res.data.Orderdetails;
                    this.pageOne = res.data.Orderdetails.page;
                    this.PagesizeOne = res.data.Orderdetails.Pagesize;
                    this.totalCountOne = res.data.Orderdetails.length;
                    // this.totalPageCount = res.data.pageUtil.totalPage
                });
            },
            getThree(pageTwo, PagesizeTwo) {
                this.axios.get("postloanor/CollectionRecoveryrate", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page: this.pageTwo,
                        Pagesize: this.PagesizeTwo
                    }
                }).then(res => {
                    this.tableDataThree = res.data.Collection;
                    this.pageTwo = res.data.Collection.page;
                    this.PagesizeTwo = res.data.Collection.Pagesize;
                    this.totalCountTwo = res.data.Collection.length;
                    // this.totalPageCount = res.data.pageUtil.totalPage
                });
            },
            getFour(pageThree, PagesizeThree) {
                this.axios.get("postloanor/OverdueUser", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page: this.pageThree,
                        Pagesize: this.PagesizeThree
                    }
                }).then(res => {
                    this.tableDataFour = res.data.Collection;
                    this.pageThree = res.data.Collection.page;
                    this.PagesizeThree = res.data.Collection.Pagesize;
                    this.totalCountThree = res.data.Collection.length;
                    // this.totalPageCount = res.data.pageUtil.totalPage
                    //   for (var i=0;i<res.data.Collection.length;i++){
                    //       res.data.Collection[i].paymentmadeData=((res.data.Collection[i].paymentmade/(res.data.Collection[i].sameday+res.data.Collection[i].paymentmade))*100)
                    //       if(res.data.Collection[i].paymentmadeData!=0){
                    //           res.data.Collection[i].paymentmadeData = (res.data.Collection[i].paymentmadeData).toFixed(2)
                    //       }
                    //   }
                })
            },
            getFive(pageFour, PagesizeFour) {
                this.axios.get("postloanor/MyOverdue", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        collectionMemberId: window.localStorage.getItem("userid"),
                        page: this.pageFour,
                        Pagesize: this.PagesizeFour
                    }
                }).then(res => {
                    this.tableDataFive = res.data.Orderdetails;
                    this.pageFour = res.data.Orderdetails.page;
                    this.PagesizeFour = res.data.Orderdetails.Pagesize;
                    this.totalCountFour = res.data.Orderdetails.length;
                });
            },
            handleClick(tab, event) {
                if (this.activeName == "second") {
                    this.getTwo(this.pageOne, this.PagesizeOne);
                }
                if (this.activeName == "third") {
                    this.getThree(this.pageTwo, this.PagesizeTwo);
                }
                if (this.activeName == "fourth") {
                    this.getFour(this.pageThree, this.PagesizeThree);
                }
                if (this.activeName == "fifth") {
                    this.getFive(this.pageFour, this.PagesizeFour);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.String = val.map(item => item.id);
            },
            timeChange(val) {
                // console.log(val)
                this.formThree.start = val
            },
            endChange(val) {
                this.formThree.end = val
            },
            start(val) {
                // console.log(val)
                this.formFour.start = val
            },
            end(val) {
                this.formFour.end = val
            },
            Search() {
                this.axios.get("postloanor/NoCollection", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.form.id,
                        name: this.form.name,
                        phone: this.form.phone
                    }
                }).then(res => {
                    this.tableDataTwo = res.data.Orderdetails
                    this.totalCountOne = res.data.Orderdetails.length;
                })
            },
            SearchThird() {
                if (this.formThree.start != "") {
                    var start = this.formThree.start + " " + "00:00:00"
                }
                if (this.formThree.end != "") {
                    var end = this.formThree.end + " " + "23:59:59"
                }
                this.axios.get("postloanor/CollectionRecoveryrate", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        start_time: start,
                        end_time: end
                    }
                }).then(res => {
                    this.tableDataThree = res.data.Collection;
                    this.totalCountTwo = res.data.Collection.length;
                });
            },
            SearchForth() {
                if (this.formFour.start != "") {
                    var start = this.formFour.start + " " + "00:00:00"
                }
                if (this.formFour.end != "") {
                    var end = this.formFour.end + " " + "23:59:59"
                }
                this.axios.get("postloanor/OverdueUser", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        start_time: start,
                        end_time: end
                    }
                }).then(res => {
                    this.tableDataFour = res.data.Collection;
                    this.totalCountThree = res.data.Collection.length;
                });
            },
            see(id) {
                if (this.person != "") {
                    this.show = false;
                    this.hidden = true;
                } else {
                    this.show = true;
                    this.hidden = false;
                }
            },
            watch(type) {
                console.log(type);
                if (type != undefined) {
                    this.shows = false;
                    this.hide = true;
                } else {
                    this.shows = true;
                    this.hide = false;
                }
            },
            change(id) {
                console.log(id);
                this.id = id;
            },
            confire(orderId, scope) {
                // console.log(orderId)
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                var order = [];
                order.push(orderId);
                this.axios.get("postloanor/UpdateOver", {
                    params: {
                        orderIds: order.join(","),
                        collectionMemberId: this.person
                    }
                }).then(res => {
                    this.$confirm(res.data.desc, "提示", {
                        type: "warning",
                        center: true
                    });
                    this.getData();
                });
            },
            confi(type, orderId, scope) {
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                this.axios.get("postloanor/Wancheng", {
                    params: {
                        overdue_phonestaus: type,
                        collectionMemberId: window.localStorage.getItem("userid"),
                        orderId
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$confirm(res.data.desc, "提示", {
                            type: "warning",
                            center: true
                        });
                        this.getFive(this.pageFour, this.PagesizeFour);
                    } else {
                        this.$confirm(res.data.desc, "提示", {
                            type: "warning",
                            center: true
                        });
                    }
                });
            },
            oneKey() {
                if (this.String == "") {
                    this.$confirm("请选择订单", "提示", {
                        type: "warning",
                        center: true
                    });
                } else {
                    if (this.form.person == "") {
                        this.$confirm("请选择催收员", "提示", {
                            type: "warning",
                            center: true
                        });
                    } else {
                        this.axios.get("postloanor/UpdateOver", {
                            params: {
                                orderIds: this.String.join(","),
                                collectionMemberId: this.person
                            }
                        }).then(res => {
                            this.$confirm(res.data.desc, "提示", {
                                type: "warning",
                                center: true
                            });
                            this.getData(this.page, this.Pagesize);
                        });
                    }
                }
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

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

    .tet {
        text-align: center;
        // color: red;
    }

    .input {
        width: 200px;
        margin-right: 30px;
    }

    .right {
        float: right;
        margin-bottom: 20px;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .single {
        margin-left: -15px;
    }

    p {
        font-size: 1rem;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .confire {
        float: right;
    }

    .content {
        color: blue;
        cursor: pointer;
    }

    .blue {
        color: blue;
        cursor: pointer;
    }

    .more {
        width: 100%;
    }

    .more li {
        width: 14.15%;
        line-height: 40px;
        text-align: center;
        border: 1px solid #ccc;
        float: left;
        color: red;
    }

    .oneKey {
        text-align: center;
    }
</style>
