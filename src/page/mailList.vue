<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是银行卡自动扣款</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="紧急联系人" name="first">
                <div class="back">
                    <h2>紧急联系人</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="linkmanonerelation" label="关系类型" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="linkmanonename" label="姓名" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="linkmanonephone" label="手机号" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通讯录" name="second">
                <div class="back">
                    <h2>通讯录</h2>
                    <div class="main">
                        <el-form :model="form" :inline="true" class="demo-form-inline">
                        </el-form>
                        <el-table border :data="tableDatas" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phone" label="手机号" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
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
                activeName: "first",
                id: -1,
                form: {
                    name: "",
                    pohone: ""
                }
            }
        },
        watch: {   //监听值变化：map值
            "$route": {
                handler(route) {
                    var that = this;
                    if (route.path == '/mailList') {
                        that.id = route.query.id;
                        that.Search();
                    }
                }
            }
        },
        created() {
            var that = this;
            var url = window.location.href;
            that.id = url.substr(url.indexOf('=') + 1);
            this.Search();
        },
        methods: {
            handleClick() {
                this.Search()
            },
            Search() {
                var that = this;
                that.tableData = [];
                that.axios.get('/user/queryUserAttesta', {
                    params: {userid: that.id}
                }).then(res => {
                    that.tableData = [];
                    var result = {};
                    result.linkmanonename = res.data.userAttestation.linkmanonename;
                    result.linkmanonephone = res.data.userAttestation.linkmanonephone;
                    result.linkmanonerelation = res.data.userAttestation.linkmanonerelation;
                    that.tableData.push(result);
                    var result2 = {};
                    result2.linkmanonename = res.data.userAttestation.linkmantwoname;
                    result2.linkmanonephone = res.data.userAttestation.linkmantwophone;
                    result2.linkmanonerelation = res.data.userAttestation.linkmantworelation;
                    that.tableData.push(result2);
                    that.tableDatas = res.data.listmaill
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .el-tabs__header {
        margin: 0;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }
</style>
