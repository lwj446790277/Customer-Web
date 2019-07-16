<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置6</p> -->
        <div class="main">
            黑名单分界线: 逾期
            <el-input style="width:100px" width="20px" v-model="blackline"></el-input>
            天后
            <el-button type="primary" @click="saveBlackLine()">保存</el-button>

            <br/><br/><br/>
            <el-table border :data="tableData" style="width: 50%;line-height: 60px;">
                <el-table-column prop="grade" label="逾期等级" align="center"></el-table-column>
                <el-table-column prop="describes" label="逾期时间段" align="center"></el-table-column>
            </el-table>
            <br/>
            <el-button left type="primary" class="edit" @click="openEditLoanDialog()">编辑</el-button>
            <el-dialog title="逾期等级编辑" :visible.sync="editLoanDialogVisible">
                <el-table border :data="detailTableData">
                    <el-table-column prop="grade" label="逾期等级" align="center">
                        <template scope="scope">
                            <el-input v-model="scope.row.grade" placeholder="请输入逾期等级"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="describes" label="逾期时间段" align="center">
                        <template scope="scope">
                            <el-input v-model="scope.row.describes" placeholder="请输入逾期时间段"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="saveLine(scope.$index,scope.row)">保存</el-button>
                            <el-button type="danger" @click="deleteLine(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <br/>
                <center>
                    <el-button center @click="addRow()">添加逾期等级</el-button>
                </center>
            </el-dialog>
        </div>
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
                blackline: null,
                detailTableData: [],
                editLoanDialogVisible: false,
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/overclass/queryAll', {
                params: {companyId: window.localStorage.getItem("companyid")}
            }).then(res => {
                that.blackline = res.data.blackline;
                that.tableData = res.data.overduelist;
            })
        },
        methods: {
            saveBlackLine() {
                var that = this;
                that.axios.get('/overclass/update', {
                    params: {blacklinevalue: that.blackline}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '修改黑名单分界线成功'
                    });
                    that.Search();
                })
            },
            Search() {
                var that = this;
                that.axios.get('/overclass/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.blackline = res.data.blackline;
                    that.tableData = res.data.overduelist;
                })
            },
            openEditLoanDialog() {
                var that = this;
                that.axios.get('/overclass/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.detailTableData = res.data.overduelist;
                })
                that.editLoanDialogVisible = true;
            },
            addRow() {
                var that = this;
                that.detailTableData.push({});
            },
            saveLine(index, object) {
                var that = this;
                var url = "";
                var alert = "";
                if (!object.id) {
                    url = "/overclass/insert";
                    alert = "新增逾期等级成功";
                    object.companyid = window.localStorage.getItem("companyid");
                } else {
                    url = "/overclass/updateByPrimaryKey"
                    alert = "编辑逾期等级成功";
                }
                that.axios.get(url, {
                    params: object
                }).then(res => {
                    if (!object.id) {
                        object.id = res.data
                    }
                    this.$message({
                        type: 'success',
                        message: alert
                    });
                    var that = this;
                    that.axios.get('/overclass/queryAll', {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.detailTableData = res.data.overduelist;
                        that.tableData = res.data.overduelist;
                    })
                })
            },
            deleteLine(index, object) {
                var that = this;
                if(!!object.id){
                    that.axios.get('/overclass/upaFalseDel', {
                        params: {id:object.id}
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除逾期等级成功'
                        });
                        var that = this;
                        that.axios.get('/overclass/queryAll', {
                            params: {companyId: window.localStorage.getItem("companyid")}
                        }).then(res => {
                            that.detailTableData = res.data.overduelist;
                            that.tableData = res.data.overduelist;
                        })
                    })
                }else{
                    that.detailTableData.splice(index, 1);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .main {
        padding: 20px;
    }
</style>
