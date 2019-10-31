<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>已逾期已分配</h2>
            <div class="table_container">
                <el-form :model="formList" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="订单编号" v-model="formList.id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="姓名" v-model="formList.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="手机号" v-model="formList.phone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实借起始时间" v-model="formList.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="实借结束时间" v-model="formList.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formList.type" placeholder="催收状态" style="width:150px">
                            <el-option label="催收成功" value="催收成功"></el-option>
                            <el-option label="催收中" value="催收中"></el-option>
                            <el-option label="承诺还款" value="承诺还款"></el-option>
                            <el-option label="未还清" value="未还清"></el-option>
                            <el-option label="无人催收已还清" value="无人催收已还清"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="逾期等级" v-model="formList.level">
                            <el-option v-for="item in level" :key="item.value" :label="item.grade" :value="item.grade"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="催收员" v-model="formList.person">
                            <el-option v-for="item in person" :key="item.value" :label="item.reallyName" :value="item.collectionMemberId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column :resizable='false' prop="orderCreateTime" label="实借时间" width="100" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="name" label="姓名" width="65" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="手机号" width="80" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="makeLoans" label="放款金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="deferAfterReturntime" label="延期后应还时间" width="95" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="overdueNumberOfDays" label="逾期天数" width="60" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="overdueGrade" label="逾期等级" width="95" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="interestPenaltySum" label="逾期罚金" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="realityAccount" label="含逾应还总金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' label="订单状态" width="90" align="center">
                        <template slot-scope="scope">
                            {{scope.row.orderStatus==0?'期限中':scope.row.orderStatus==1?'已逾期':scope.row.orderStatus==2?'已延期':scope.row.orderStatus==3?'已还款':scope.row.orderStatus==4?'已坏账':scope.row.orderStatus==5?'放款中':'未知'}}
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' prop="reallyName" label="催收人" width="80" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="collectionTime" label="催收时间" width="95" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="collectionStatus" label="催收状态" width="95" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="realityAccount" label="实还金额" width="115" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="usernum" label="借款次数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="defeNum" label="延期次数" align="center"></el-table-column>
                    <el-table-column :resizable='false' label="催收记录" width="120" align="center">
                        <template slot-scope="scope">
                            <span class="cont" @click="open(scope.row.orderId)">查看催收</span>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' label="操作" align="center">
                        <template slot-scope="scope">
                            <el-popover :ref="`popover+${scope.$index}`" placement="bottom-end" width="300" trigger="click">
                                <div>
                                    <p>确定要取消催收该订单已催收状态吗？</p>
                                    <el-button class="confire" type="success" @click="cancelOrder(scope.row.colid,scope)">是的</el-button>
                                </div>
                                <span class="content" slot="reference">取消催收</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog :title="title" :visible.sync="dialogTableVisible">
                    <el-table :data="gridData">
                        <el-table-column :resizable='false' property="collection_time" label="催收时间" align="center"></el-table-column>
                        <el-table-column :resizable='false' property="user_type" label="用户状态" align="center"></el-table-column>
                        <el-table-column :resizable='false' property="collectionmoney" label="承诺还款金额" align="center"></el-table-column>
                        <el-table-column :resizable='false' property="orderStatus" label="订单状态" align="center"></el-table-column>
                    </el-table>
                </el-dialog>
                <div class="block">
                    <el-pagination :current-page="page" :page-size="Pagesize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount"
                                   :total="totalCount" @current-change="currentChange">
                    </el-pagination>
                </div>
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
                tableData: [],
                person: [],
                gridData: [],
                level: [],
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                formList: {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: "",
                    deferAfterReturntimeStatu_time: "",
                    deferAfterReturntimeEnd_time: "",
                    level: "",
                    person: ""
                },
                title: "",
                dialogTableVisible: false
            };
        },
        created() {
            this.getData(this.page, this.Pagesize);
            this.getPerson();
            this.get();
        },
        methods: {
            cancelOrder(orderId, scope) {
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                this.axios.get("collection/deleCollection", {
                    params: {
                        colid: orderId,
                    }
                }).then(res => {
                    this.$message({
                        type:'success',
                        message: '取消成功'
                    });
                    this.Search();
                });
            },
            currentChange(val) {
                this.page = val
                this.Search()
            },
            timeChange(val) {
                this.formList.start = val
            },
            endChange(val) {
                this.formList.end = val
            },
            getData(page, Pagesize) {
                this.axios.get("collection/BeoverdueYifenp", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.Pagesize = res.data.pageutil.pageSize;
                    this.totalCount = res.data.pageutil.totalCount;
                    this.totalPageCount = res.data.pageutil.totalPageCount
                });
            },
            get() {
                this.axios.get("operation/YuqiM", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    this.level = res.data.OverdueClass;
                });
            },
            getPerson() {
                this.axios.get("collection/collectionmember", {
                    params: {
                        companyId: window.localStorage.getItem("companyid")
                    }
                }).then(res => {
                    this.person = res.data.collection_member;
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            Reset() {
                this.formList = {
                    id: "",
                    name: "",
                    phone: "",
                    start: "",
                    end: "",
                    deferAfterReturntimeStatu_time: "",
                    deferAfterReturntimeEnd_time: "",
                    level: "",
                    person: ""
                };
            },
            downloadSource() {
                var that = this;
                if (this.formList.start != "") {
                    var start = this.formList.start + " " + "00:00:00"
                }
                if (this.formList.end != "") {
                    var end = this.formList.end + " " + "23:59:59"
                }
                var param = {
                    companyId: window.localStorage.getItem("companyid"),
                    orderNumber: this.formList.id,
                    name: this.formList.name,
                    phone: this.formList.phone,
                    overdueGrade: this.formList.level,
                    collectionStatus: this.formList.type,
                    collectionMemberId: this.formList.person,
                    start_time: start,
                    end_time: end,
                    page: this.page
                }
                that.downloadExcel("/collection/BeoverdueYifenpCollectionexport", param, '已逾期已分配');
            },
            Search() {
                if (this.formList.start != "") {
                    var start = this.formList.start + " " + "00:00:00"
                }
                if (this.formList.end != "") {
                    var end = this.formList.end + " " + "23:59:59"
                }
                this.axios.get("collection/BeoverdueYifenp", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.formList.id,
                        name: this.formList.name,
                        phone: this.formList.phone,
                        overdueGrade: this.formList.level,
                        collectionStatus: this.formList.type,
                        collectionMemberId: this.formList.person,
                        start_time: start,
                        end_time: end,
                        page: this.page
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.Pagesize = res.data.pageutil.pageSize;
                    this.totalCount = res.data.pageutil.totalCount;
                    this.totalPageCount = res.data.pageutil.totalPageCount
                });
            },
            open(id) {
                this.dialogTableVisible = true;
                this.axios.get("collection/Collectiondetails", {
                    params: {
                        orderId: id
                    }
                }).then(res => {
                    this.gridData = res.data.Orderdetails;
                });
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .table_container {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
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

    .statistics {
        width: 100%;
    }

    .statistics ul {
        width: 100%;
    }

    .statistics ul li {
        width: 9.93%;
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

    .cont {
        color: blue;
        cursor: pointer;
    }
</style>
