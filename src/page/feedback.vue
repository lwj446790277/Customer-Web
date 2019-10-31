<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>查看反馈</h2>
            <div class="main">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="primary" @click="getData">刷新</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column :resizable='false' prop="name" label="姓名" align="center" width="90"></el-table-column>
                    <el-table-column :resizable='false' prop="phone" label="手机号" align="center" width="130"></el-table-column>
                    <el-table-column :resizable='false' prop="time" label="反馈时间" align="center" width="180"></el-table-column>
                    <el-table-column :resizable='false' prop="advice" label="内容" align="center" width="500"></el-table-column>
                    <el-table-column :resizable='false' prop="solvestatus" label="解决状态" align="center" width="90">
                        <template scope="scope">
                            {{scope.row.solvestatus==1?'已解决':scope.row.solvestatus==2?'未解决':'未知'}}
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' prop="replycontent" label="回复内容" align="center" width="200">
                        <template scope="scope">
                            <div v-if="!scope.row.replycontent">
                                暂无<br/>
                                <el-button type="primary" size="small" @click="openAddAnswerDialog(scope.row.id)">回复</el-button>
                            </div>
                            <div v-else>
                                {{scope.row.replycontent}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' prop="borrowMoneyWay" label="图片1" align="center">
                        <template slot-scope="scope" v-if="!!scope.row.url1">
                            <img :src="scope.row.url1" width="200px" height="200px">
                            <el-button type="primary" size="small" @click="openDialog(scope.row.url1)">查看详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' prop="borrowMoneyWay" label="图片2" align="center">
                        <template slot-scope="scope" v-if="!!scope.row.url2">
                            <img :src="scope.row.url2" width="200px" height="200px">
                            <el-button type="primary" size="small" @click="openDialog(scope.row.url2)">查看详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :resizable='false' prop="borrowMoneyWay" label="图片3" align="center">
                        <template slot-scope="scope" v-if="!!scope.row.url3">
                            <img :src="scope.row.url3" width="200px" height="200px">
                            <el-button type="primary" size="small" @click="openDialog(scope.row.url3)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :page-count="totalPageCount" :total="totalCount"
                                   @current-change="currentChange"></el-pagination>
                </div>
                <el-dialog title="查看图片" :visible.sync="dialogShow" custom-class="" center>
                    <img :src="currentShowUrl" width="100%" height="100%">
                </el-dialog>
                <el-dialog title="回复用户反馈" :visible.sync="dialogShow2" custom-class="" center>
                    <el-input placeholder="回复内容" v-model="feedback.replycontent"></el-input>
                    <div style="margin-top:20px;text-align: right">
                        <el-button @click="dialogShow2 = false" size="small">关闭</el-button>
                        <el-button type="primary" @click="addAnswer" size="small">提交</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from "../components/headTop";

    export default {
        components: {headTop},
        data() {
            return {
                tableData: [],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                dialogShow: false,
                dialogShow2: false,
                currentShowUrl: '',
                feedback: {},
            };
        },
        created() {
            this.getData();
        },
        methods: {
            addAnswer() {
                this.axios.get("/feedback/upastatus", {
                    params: this.feedback
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "编辑成功"
                    });
                    this.getData();
                    this.dialogShow2 = false;
                });
            },
            openAddAnswerDialog(id) {
                this.feedback = {};
                this.feedback.id = id;
                this.dialogShow2 = true;
            },
            openDialog(url) {
                var that = this;
                that.currentShowUrl = '';
                that.dialogShow = true;
                that.currentShowUrl = url;
            },
            currentChange(val) {
                this.page = val;
                this.getData();
            },
            getData() {
                this.axios.get("/feedback/queryAll", {
                    params: {page: this.page}
                }).then(res => {
                    this.tableData = res.data.feedbacklist;
                    this.totalCount = res.data.pageutil.totalCount;
                    this.totalPageCount = res.data.pageutil.totalPageCount;
                });
            },
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
</style>
