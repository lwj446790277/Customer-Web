<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是已逾期未入催</p> -->
        <div class="back">
            <h2>已逾期未分配</h2>
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
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-select placeholder="分配催收员" v-model="form.person">
                            <el-option v-for="item in person" :key="item.id" :label="item.reallyName" :value="item.id"></el-option>
                        </el-select>
                        <el-button type="success" @click="Onekey" size="small">一键分配</el-button>
                    </el-form-item>
                </el-form>
                <el-table border ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column :resizable='false' type="selection" width="55" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="orderCreateTime" label="实借时间" align="center" width="100"></el-table-column>
                    <el-table-column :resizable='false' prop="name" label="姓名" width="120" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="realityBorrowMoney" label="放款金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="shouldReturnTime" label="应还时间" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="overdueNumberOfDays" label="逾期天数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="interestPenaltySum" label="逾期罚金" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="order_money" label="含逾应还总金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="usernum" label="借款次数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="defeNum" label="延期次数" align="center"></el-table-column>
                    <el-table-column :resizable='false' label="操作" align="center">
                        <template slot-scope="scope">
                            <el-popover :ref="`popover+${scope.$index}`" placement="bottom-end" width="300" trigger="click">
                                <div v-if="show">
                                    <p>请选择催收员，再分配催单</p>
                                </div>
                                <div v-if="hidden">
                                    <p>确定要把催单分配给该催收员吗？</p>
                                    <el-button class="confire" type="success" @click="confire(scope.row.orderId,scope)">是的
                                    </el-button>
                                </div>
                                <span class="content" slot="reference" @click="see(scope.row.orderId)">分配催单</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page="page"
                        :page-size="Pagesize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
                        @size-change="sizeChange"
                        @current-change="currentChange"
                    ></el-pagination>
                </div>
                <!-- <div>
                <p>{{ones}}</p>
                <p>{{two}}</p>
                <p>{{three}}</p>
                </div>-->
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
                // ones: 12,
                // two: 2,
                tableData: [],
                person: [],
                form: {
                    phone: "",
                    name: "",
                    id: "",
                    person: ""
                },
                multipleSelection: [],
                String: [],
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                visible: false,
                show: true,
                hidden: false
            };
        },
        created() {
            this.getData(this.page, this.Pagesize);
            this.getPerson();
        },
        methods: {
            getData(page, Pagesize) {
                this.axios.get("collection/BeoverdueCollection", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.Pagesize = res.data.pageutil.pageSize;
                    this.totalPageCount = res.data.pageutil.totalPageCount;
                    this.totalCount = res.data.pageutil.totalCount;
                    // this.totalPageCount = res.data.pageUtil.totalPageCount
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
            sizeChange() {
                this.getData(this.page, this.Pagesize);
            },
            currentChange(val) {
                this.page = val
                this.Search();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.String = val.map(item => item.orderId);
                console.log(this.multipleSelection, this.String);
            },
            Reset() {
                this.form = {
                    phone: "",
                    name: "",
                    id: "",
                };
            },
            downloadSource() {
                var that = this;
                var param = {
                    companyId: window.localStorage.getItem("companyid"),
                    orderNumber: this.form.id,
                    name: this.form.name,
                    phone: this.form.phone,
                    page: this.page
                }
                that.downloadExcel("/collection/BeoverdueCollectionexport", param, '已逾期未分配');
            },
            Search() {
                this.axios.get("collection/BeoverdueCollection", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.form.id,
                        name: this.form.name,
                        phone: this.form.phone,
                        page: this.page
                    }
                }).then(res => {
                    this.tableData = res.data.Orderdetails;
                    this.Pagesize = res.data.pageutil.pageSize;
                    this.totalPageCount = res.data.pageutil.totalPageCount;
                    this.totalCount = res.data.pageutil.totalCount;
                })
            },
            see(orderId) {
                if (this.form.person != "") {
                    this.show = false;
                    this.hidden = true;
                } else {
                    this.show = true;
                    this.hidden = false;
                }
            },
            confire(orderId, scope) {
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                this.visible = false;
                var order = [];
                order.push(orderId);
                this.axios.get("collection/AddCollection", {
                    params: {
                        orderIds: order.join(","),
                        CollectionMemberId: this.form.person
                    }
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '分配成功'
                    });
                    this.getData(this.page, this.Pagesize);
                });
            },
            Onekey() {
                // console.log(this.form.person)
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
                        this.axios
                            .get("collection/AddCollection", {
                                params: {
                                    orderIds: this.String.join(","),
                                    CollectionMemberId: this.form.person
                                }
                            })
                            .then(res => {
                                this.$confirm(res.data.desc, "提示", {
                                    type: "warning",
                                    center: true
                                }).then(() => {
                                    this.getData(this.page, this.Pagesize);
                                });
                            });
                    }
                }
            }
        },
        computed: {
            // three(){
            //   return this.ones*(this.two/100)
            // }
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

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .input {
        width: 200px;
        margin-right: 30px;
    }

    .right {
        float: right;
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
</style>
