<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是银行卡自动扣款</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="紧急联系人" name="first">
                <div class="back">
                    <h2>紧急联系人</h2>
                    <div class="main">
                        <el-table border :data="user" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="linkmanonerelation" label="关系类型" align="center"></el-table-column>
                            <el-table-column prop="linkmanonename" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="linkmanonephone" label="手机号" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通讯录" name="second">
                <div class="back">
                    <h2>通讯录</h2>
                    <div class="main">
                        <el-form :model="form" :inline="true" class="demo-form-inline">
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
                        <el-table border :data="tableDatas" tooltip-effect="dark"
                                  style="width: 100%;line-height: 60px;">
                            <el-table-column type="index" width="400" align="center"></el-table-column>
                            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
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
                user:{},
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
            // this.getData(this.page,this.Pagesize)
            // this.get()
        },
        methods: {
            handleClick() {

            },
            Search() {
                var that = this;
                that.axios.get('/user/queryUserAttesta', {
                    params: {userid: that.id}
                }).then(res => {
                    that.user = res.data.userAttestation;
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
