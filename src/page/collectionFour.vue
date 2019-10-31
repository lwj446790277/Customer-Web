<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>催收员工作报表</h2>
            <div class="main">
                <el-form :model="form" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="起始时间" v-model="form.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="single">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="结束时间" v-model="form.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="催收员姓名" v-model="form.name" @change="change">
                            <el-option v-for="item in person" :key="item.value" :label="item.reallyName" :value="item.collectionMemberId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search">搜索</el-button>
                        <el-button type="danger" @click="downloadSource">下载</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
                    <el-table-column :resizable='false' prop="reallyName" label="催收员姓名" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="collection_count" label="分配订单数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="sameday" label="承诺还款订单数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="paymentmade" label="未还清订单数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="connected" label="坏账订单数" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="collNumdata" label="催回率(%)" align="center"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page="page"
                        :page-size="Pagesize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
                    ></el-pagination>
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
                form: {
                    time: "",
                    start: "",
                    end: "",
                    name: ""
                },
                person: [],
                id: "",
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0
            };
        },
        created() {
            this.getData(this.page, this.Pagesize);
        },
        methods: {
            timeChange(val) {
                this.form.start = val
            },
            endChange(val) {
                this.form.end = val
            },
            getData(page, Pagesize) {
                this.axios
                    .get("collection/CollectionUserLv", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            page,
                            Pagesize
                        }
                    })
                    .then(res => {
                        this.tableData = res.data.collection_member;
                        /*   this.page = res.data.collection_member.page;
                             this.Pagesize = res.data.collection_member.Pagesize;
                             this.totalCount = res.data.collection_member.length;*/
                    });

                this.axios
                    .get("collection/collectionmember", {
                        params: {
                            companyId: window.localStorage.getItem("companyid")
                        }
                    })
                    .then(res => {
                        this.person = res.data.collection_member;
                    });
            },
            Reset() {
                this.form = {
                    time: "",
                    start: "",
                    end: "",
                    name: ""
                };
            },
            change(id) {
                console.log(id);
                this.id = id;
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
                    start_time: start,
                    end_time: end,
                    collectionMemberId: this.id
                }
                that.downloadExcel("/collection/CollectionUserLvexport", param, '催收员工作报表');
            },
            Search() {
                if (this.form.start != "") {
                    var start = this.form.start + " " + "00:00:00"
                }
                if (this.form.end != "") {
                    var end = this.form.end + " " + "23:59:59"
                }
                this.axios.get("collection/CollectionUserLv", {
                    params: {
                        companyId: window.localStorage.getItem("companyid"),
                        start_time: start,
                        end_time: end,
                        collectionMemberId: this.id
                    }
                }).then(res => {
                    this.tableData = res.data.Collections;
                    this.totalCount = res.data.Collections.length;
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
</style>
