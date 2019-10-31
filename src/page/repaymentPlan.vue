<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>还款实时流水</h2>
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
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="起始时间" v-model="form.start"
                                            value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="结束时间" v-model="form.end" value-format="yyyy-MM-dd"
                                            @change="endChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.qudao" placeholder="还款渠道" style="width:150px" @change="change">
                            <el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column :resizable='false' prop="repaymentDate" label="流水号时间" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="thname" label="还款渠道" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="pipelinenumber" label="还款流水号" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="repaymentMoney" label="还款金额" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="orderNumber" label="订单编号" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="shouldReturnTime" label="应还时间" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="page" @current-change="currentChange" :page-size="pageSize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount" :total="totalCount"></el-pagination>
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
                Thirdparty_interface: [],
                id: "",
                form: {
                    name: "",
                    input: "",
                    start: "",
                    end: "",
                    qudao: ""
                },
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0
            };
        },
        created() {
            this.get();
            this.getData(this.page, this.pageSize);
        },
        methods: {
            currentChange(val) {
                this.page = val;
                this.Search();
            },
            timeChange(val) {
                // console.log(val)
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            get() {
                this.axios
                    .get("fina/RepaymentAll", {
                        params: {
                            compayId: window.localStorage.getItem("companyid")
                        }
                    })
                    .then(res => {
                        this.Thirdparty_interface = res.data.Repayment_setting;
                    });
            },
            getData(page, pageSize) {
                this.axios.get("fina/HuanKuan", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            page,
                            pageSize
                        }
                    }).then(res => {
                        this.tableData = res.data.Repayment;
                        this.page = res.data.pageutil.page;
                        this.pageSize = res.data.pageutil.pageSize;
                        this.totalCount = res.data.pageutil.totalCount;
                        this.totalPageCount = res.data.pageutil.totalPageCount;
                    });
            },
            change(id) {
                console.log(id);
                let selectedWorkName = {};
                this.id = id;
                selectedWorkName = this.Thirdparty_interface.find(item => {
                    //这里的chargingWorkNameList就是上面遍历的数据源
                    return item.id === this.id;
                    //筛选出匹配数据，是对应数据的整个对象
                });
            },
            Reset() {
                this.form = {
                    name: "",
                    input: "",
                    start: "",
                    end: "",
                    qudao: ""
                };
            },
            downloadSource() {
                var that = this;
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                var param = {
                    companyId: window.localStorage.getItem("companyid"),
                    orderNumber: this.form.id,
                    phone: this.form.phone,
                    name: this.form.name,
                    start_time: start,
                    end_time: end,
                    thirdparty_id: this.id
                }
                that.downloadExcel("/fina/HuanKuanexport", param, '还款实时流水');
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                this.axios.get("fina/HuanKuan", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.form.id,
                        phone: this.form.phone,
                        name: this.form.name,
                        start_time: start,
                        end_time: end,
                        thirdparty_id: this.id,
                        page:this.page
                    }
                }).then(res => {
                    this.tableData = res.data.Repayment;
                    this.page = res.data.pageutil.page;
                    this.pageSize = res.data.pageutil.pageSize;
                    this.totalCount = res.data.pageutil.totalCount;
                    this.totalPageCount = res.data.pageutil.totalPageCount;
                })
            }
        }
    }
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
</style>
