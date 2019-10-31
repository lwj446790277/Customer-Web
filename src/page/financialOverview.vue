<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是财务总览</p> -->
        <el-tabs name="first" type="card" v-model="activeName">
            <template v-if="isInArray(41)">
                <el-tab-pane label="财务总览" name="first">
                    <div class="back">
                        <h2>财务总览</h2>
                        <div class="main">
                            <el-form :model="form" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="起始时间" v-model="form.start" value-format="yyyy-MM-dd"
                                                        @change="startChange"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="结束时间" v-model="form.end" value-format="yyyy-MM-dd"
                                                        @change="endChange"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Search">搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <table border="1" cellspacing="0" cellpadding="15" class="tabone">
                                <tr>
                                    <th colspan="2">项目</th>
                                    <th>笔数</th>
                                    <th>收入</th>
                                    <th>支出</th>
                                    <th>合计</th>
                                </tr>
                                <tr>
                                    <th colspan="2">放款总额</th>
                                    <td>{{total1}}</td>
                                    <td>/</td>
                                    <td>{{total2}}</td>
                                    <td>{{total2}}</td>

                                </tr>
                                <tr>
                                    <th rowspan="3">线上回款</th>
                                    <td>用户自主还款金额</td>
                                    <td>{{row1_1}}</td>
                                    <td>{{row1_2}}</td>
                                    <td>{{row1_3}}</td>
                                    <td rowspan="3">{{sum1}}</td>
                                </tr>
                                <tr>
                                    <th>银行卡扣款金额</th>
                                    <td>{{row2_1}}</td>
                                    <td>{{row2_2}}</td>
                                    <td>{{row2_3}}</td>
                                </tr>
                                <tr>
                                    <th>已收延期费</th>
                                    <td>{{row3_1}}</td>
                                    <td>{{row3_2}}</td>
                                    <td>{{row3_3}}</td>
                                </tr>
                                <tr>
                                    <th rowspan="2">线下回款</th>
                                    <td>线上分期收款</td>
                                    <!--   <td>{{row4_1}}</td>
                                       <td>{{row4_2}}</td>
                                       <td>{{row4_3}}</td>-->
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td rowspan="2">{{sum2}}</td>
                                </tr>
                                <tr>
                                    <th>线下全部收款</th>
                                    <td>{{row5_1}}</td>
                                    <td>{{row5_2}}</td>
                                    <td>{{row5_3}}</td>
                                </tr>
                                <tr>
                                    <th colspan="2">总计</th>
                                    <td>/</td>
                                    <td>{{sum3}}</td>
                                    <td>{{total2}}</td>
                                    <td>/</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(42)">
                <el-tab-pane label="第三方服务费总览" name="second">
                    <div class="back">
                        <h2>第三方服务费总览</h2>
                        <div class="main">
                            <el-form :model="form2" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="起始时间" v-model="form2.start"
                                                        value-format="yyyy-MM-dd" @change="startChange2"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="结束时间" v-model="form2.end"
                                                        value-format="yyyy-MM-dd" @change="endChange2"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Search2">搜索</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="SearchUnit">单价查询</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                                <el-table-column :resizable='false' prop="date" label="日期" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="verificationcode" label="验证码" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="verificationprice" label="费用" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="idcard" label="身份证" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="idcardprice" label="费用" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="faceid" label="人脸" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="faceidprice" label="费用" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="threeelements" label="三要素" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="threeelementsprice" label="费用" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="operator" label="运营商" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="operatorprice" label="费用" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="riskmanagement" label="风控" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="riskmanagementprice" label="费用" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="note" label="短信" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="noteprice" label="费用" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sum" label="总计" align="center"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount"
                                               :total="totalCount" @current-change="currentChange"></el-pagination>
                            </div>
                        </div>
                    </div>
                    <el-dialog title="第三方服务费查询" :visible.sync="dialogVisible" center>
                        <el-table border :data="tableData2" tooltip-effect="dark" style="width: 100%">
                            <el-table-column :resizable='false' prop="thirdpartytype" label="类型" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="thirdpartyname" label="名称" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="price" label="价格" align="center"></el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">关闭</el-button>
                    </span>
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
                tableData2: [],
                dialogVisible: false,
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                activeName: 'first',
                form: {
                    time: "",
                    start: "",
                    end: ""
                },
                form2: {
                    time: "",
                    start: "",
                    end: ""
                },
                tableData: [],
                row1_1: '',
                row1_2: '',
                row1_3: '',
                row2_1: '',
                row2_2: '',
                row2_3: '',
                row3_1: '',
                row3_2: '',
                row3_3: '',
                row4_1: '',
                row4_2: '',
                row4_3: '',
                row5_1: '',
                row5_2: '',
                row5_3: '',
                total1: '',
                total2: '',
                total3: '',
                sum1: '',
                sum2: '',
                sum3: '',
            }
        },
        created() {
            if (this.isInArray(41)) {
                this.getData(this.page, this.Pagesize)
            }
            if (this.isInArray(42)) {
                this.Search2();
            }

        },
        methods: {
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            formatNum(f) {
                var m = Math.pow(10, 1);
                return parseInt(f * m, 10) / m;
            },
            SearchUnit() {
                var that = this;
                that.axios.get('fina/queryall', {
                    params: {
                        companyid: window.localStorage.getItem("companyid"),
                    }
                }).then(res => {
                    that.tableData2 = res.data;
                    that.dialogVisible = true;
                })
            },
            currentChange(page) {
                var that = this;
                that.page = page;
                that.Search2();
            },
            startChange(val) {
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            startChange2(val) {
                this.form2.start = val
            },
            endChange2(val) {
                this.form2.end = val
            },
            getData() {
                this.axios.get('fina/financialoverview', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                    }
                }).then(res => {
                    var total = res.data.Bankdeduction.bankcardName.split(",")
                    var row1 = res.data.Bankdeduction.deductionstatus.split(',');
                    var row2 = res.data.Bankdeduction.bankMoneys.split(',');
                    var row3 = res.data.Bankdeduction.name.split(',');
                    /*        var row4 = res.data.Bankdeduction.xianShangCoune.split(',');*/
                    var row5 = res.data.Bankdeduction.xianJianmianCount.split(',');
                    this.sum1 = res.data.Bankdeduction.xiansMoney;
                    this.sum2 = res.data.Bankdeduction.xianxiaMoney;
                    this.sum3 = res.data.Bankdeduction.shouruMoney;
                    this.total1 = total[0];
                    this.total2 = total[1];
                    this.total3 = total[2];
                    this.row1_1 = row1[0];
                    this.row1_2 = row1[1];
                    this.row1_3 = row1[2];
                    this.row2_1 = row2[0];
                    this.row2_2 = row2[1];
                    this.row2_3 = row2[2];
                    this.row3_1 = row3[0];
                    this.row3_2 = row3[1];
                    this.row3_3 = row3[2];
                    /*this.row4_1 = row4[0];
                    this.row4_2 = row4[1];
                    this.row4_3 = row4[2];*/
                    this.row5_1 = row5[0];
                    this.row5_2 = row5[1];
                    this.row5_3 = row5[2];
                })
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                this.axios.get('fina/financialoverview', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        start_time: start,
                        end_time: end
                    }
                }).then(res => {
                    var total = res.data.Bankdeduction.bankcardName.split(",")
                    var row1 = res.data.Bankdeduction.deductionstatus.split(',');
                    var row2 = res.data.Bankdeduction.bankMoneys.split(',');
                    var row3 = res.data.Bankdeduction.name.split(',');
                    /*        var row4 = res.data.Bankdeduction.xianShangCoune.split(',');*/
                    var row5 = res.data.Bankdeduction.xianJianmianCount.split(',');
                    this.sum1 = res.data.Bankdeduction.xiansMoney;
                    this.sum2 = res.data.Bankdeduction.xianxiaMoney;
                    this.sum3 = res.data.Bankdeduction.shouruMoney;
                    this.total1 = total[0];
                    this.total2 = total[1];
                    this.total3 = total[2];
                    this.row1_1 = row1[0];
                    this.row1_2 = row1[1];
                    this.row1_3 = row1[2];
                    this.row2_1 = row2[0];
                    this.row2_2 = row2[1];
                    this.row2_3 = row2[2];
                    this.row3_1 = row3[0];
                    this.row3_2 = row3[1];
                    this.row3_3 = row3[2];
                    /*this.row4_1 = row4[0];
                    this.row4_2 = row4[1];
                    this.row4_3 = row4[2];*/
                    this.row5_1 = row5[0];
                    this.row5_2 = row5[1];
                    this.row5_3 = row5[2];
                })
            },
            Search2() {
                var that = this;
                that.axios.get('fina/pricetongji', {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        starttime: that.form2.start,
                        endtime: that.form2.end,
                        page: that.page
                    }
                }).then(res => {
                    that.tableData = res.data.listtongjito;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.pageSize = res.data.pageutil.pageSize;
                    that.totalCount = res.data.pageutil.totalCount;
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

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .single {
        margin-left: -15px;
    }

    .red {
        color: red;
    }

    .tabone {
        width: 98%;
        margin: 20px auto;
        border-color: black;
    }

    .tabone th {
        width: 15%;
    }

    .tabone td {
        text-align: center;
    }
</style>
