<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>已分配未催收</h2>
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
                        <el-button type="warning" @click="Reset"
                                   style="background-color:#e3e4e7;border:transparent;color:#000">重置
                        </el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column :resizable='false' prop="orderNumber" label="订单编号" width="93" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="name" label="真实姓名" width="93" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="手机号" width="130" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="orderCreateTime" label="实借时间" width="175" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="realityBorrowMoney" label="实借总金额" width="120" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="deferAfterReturntime" label="延期后应还时间" width="175" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="overdueNumberOfDays" label="逾期天数" width="93" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="overdueGrade" label="逾期等级" width="93" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="shouldReapyMoney" label="逾期罚金/含逾应还总金额" width="140" align="center">
                        <template slot-scope="scope"><span>{{scope.row.interestPenaltySum}}/{{scope.row.order_money}}</span></template>
                    </el-table-column>
                    <el-table-column :resizable='false' prop="collectionTime" label="分配时间" width="175" align="center"></el-table-column>
                    <el-table-column :resizable='false' label="用户状态" width="150" align="center">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.ismg">
                                <el-option v-for="item in tableDatas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' label="承诺还清部分金额" width="175" align="center">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.promise_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' label="操作" width="93" align="center">
                        <template slot-scope="scope">
                            <el-popover placement="bottom-end" width="300" trigger="click">
                                <div v-if="show"><p>请先选择用户状态，再操作</p></div>
                                <div v-if="hidden">
                                    <p>该用户的状态可在"已分配已催收"中查看</p>
                                    <el-button class="confire" type="success" @click="confire(scope.row.ismg,scope.row.promise_money,scope.row.collectionId)">好的
                                    </el-button>
                                </div>
                                <span class="blue" slot="reference" @click="see(scope.row.ismg,scope.row.promise_money,scope.row.collectionId)">完成联系</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="page" :page-size="Pagesize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount"
                                   :total="totalCount"></el-pagination>
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
                tableDatas: [
                    {id: 1, label: "承诺还款", value: "承诺还款"},
                    {id: 2, label: "承诺还清一部分", value: "承诺还清一部分"},
                    {id: 3, label: "电话无人接听", value: "电话无人接听"},
                    {id: 4, label: "态度恶劣", value: "态度恶劣"}
                ],
                form: {
                    id: "",
                    name: "",
                    phone: ""
                },
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                show: true,
                hidden: false
            };
        },
        created() {
            this.getData(this.page, this.Pagesize);
        },
        methods: {
            getData(page, Pagesize) {
                this.axios
                    .get("collection/FenpeiWeiCollection", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            // collectionMemberId: window.localStorage.getItem("userid"),
                            collectionMemberId: window.localStorage.getItem("userid"),
                            page,
                            Pagesize
                        }
                    })
                    .then(res => {
                        this.tableData = res.data.Orderdetails;
                        this.page = res.data.Orderdetails.page;
                        this.Pagesize = res.data.Orderdetails.Pagesize;
                        this.totalCount = res.data.Orderdetails.length;
                    });
            },
            Reset() {
                this.form = {
                    id: "",
                    name: "",
                    phone: ""
                };
            },
            Search() {
                this.axios
                    .get("collection/FenpeiWeiCollection", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            orderNumber: this.form.id,
                            name: this.form.name,
                            phone: this.form.phone
                        }
                    })
                    .then(res => {
                        this.tableData = res.data.Orderdetails;
                        this.totalCount = res.data.Orderdetails.length;
                    })
            },
            see(ismg) {
                console.log(ismg);
                if (ismg != undefined) {
                    this.show = false;
                    this.hidden = true;
                } else {
                    this.show = true;
                    this.hidden = false;
                }
            },
            confire(ismg, promise_money, collectionId) {
                this.axios
                    .get("collection/AddCollectiondertilas", {
                        params: {
                            usertype: ismg,
                            promise_money: promise_money,
                            collectionId,
                            collectionStatus: "已接通"
                        }
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$confirm(res.data.desc, '提示', {
                                type: 'warning',
                                center: true
                            })
                            this.tableData = res.data.Orderdetails;
                        }
                    });
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

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

    .blue {
        color: blue;
        cursor: pointer;
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
</style>
