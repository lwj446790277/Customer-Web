<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置3</p> -->
        <div class="back">
            <h2>风控设置管理</h2>
            <div class="main">
                <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                    <el-table-column :resizable='false' prop="rmmodlename" label="风控模型名" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="totalscore" label="总分段" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="atrntlfractionalsegment" label="机审拒绝不放款分数段" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="roatnptfractionalsegment" label="机审拒绝需人审分数段" align="center"></el-table-column>
                    <el-table-column :resizable='false' prop="airappfractionalsegment" label="机审通过分数段" align="center"></el-table-column>
                    <el-table-column :resizable='false' label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="编辑风控配置" :visible.sync="editDialogVisible" customClass="custom" center>
                    <table cellspacing="0" cellpadding="20" class="tableda" center>
                        <tr>
                            <th>风控模型名称</th>
                            <td>
                                <el-input v-model="editObject.rmmodlename" disabled="disabled"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>总分段</th>
                            <td>
                                <el-input v-model="editObject.totalscore" disabled="disabled"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>机审拒绝不放款分数段</th>
                            <td>
                                <el-input v-model="editObject.atrntlfractionalsegment" disabled="disabled"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>机审拒绝需人审分数段</th>
                            <td>
                                <el-input v-model="editObject.roatnptfractionalsegment"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th>机审通过分数段</th>
                            <td>
                                <el-input v-model="editObject.airappfractionalsegment" disabled="disabled"></el-input>
                            </td>
                        </tr>
                    </table>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="edit()">确 定</el-button>
          </span>
                </el-dialog>
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
                editDialogVisible: false,
                editObject: {}
            };
        },
        beforeCreate() {
            var that = this;
            that.axios
                .get("/manconsettings/queryAll", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                })
                .then(res => {
                    that.tableData = res.data;
                });
        },
        methods: {
            Search() {
                var that = this;
                that.axios
                    .get("/manconsettings/queryAll", {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    })
                    .then(res => {
                        that.tableData = res.data;
                    });
            },
            openEditDialog(object) {
                var that = this;
                that.editObject = object;
                that.editDialogVisible = true;
            },
            edit() {
                var that = this;
                that.axios
                    .get("/manconsettings/updateByPrimaryKey", {
                        params: that.editObject
                    })
                    .then(res => {
                        this.$message({
                            type: "success",
                            message: "编辑成功"
                        });
                        that.Search();
                        that.editDialogVisible = false;
                    });
            }
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
        background-color: white;
        min-height: 70vh;
    }

    .tableda {
        margin: 20px auto;
        width: 80%;
        border-color: #dfe6ec;
    }

    .custom {
        width: 30%;
    }

</style>
