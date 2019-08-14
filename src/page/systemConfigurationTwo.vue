<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置2</p> -->
        <div class="back">
            <h2>第三方接口設置</h2>
            <div class="main">
                <table border="0" cellpadding="30" cellspacing="0" class="tableTwo">
                    <tr>
                        <th>身份证及人脸认证</th>
                        <td>
                            <el-radio-group v-model="editObject.idcardfaceauthentication">
                                <el-radio
                                    v-for="(face, index) in facelist"
                                    :label="face.name"
                                    :value="face.name"
                                ></el-radio>
                            </el-radio-group>
                            <!--<el-select v-model="editObject.idcardfaceauthentication">
                                <el-option v-for="face in facelist" :label="face.name" :value="face.name"></el-option>
                            </el-select>-->
                        </td>
                    </tr>
                    <tr>
                        <th>运营商认证</th>
                        <td>
                            <el-radio-group v-model="editObject.operatorsauthentication">
                                <el-radio
                                    v-for="(opera, index) in operalist"
                                    :label="opera.name"
                                    :value="opera.name"
                                ></el-radio>
                            </el-radio-group>
                           <!-- <el-select v-model="editObject.operatorsauthentication">
                                <el-option v-for="opera in operalist" :label="opera.name"
                                           :value="opera.name"></el-option>
                            </el-select>-->
                        </td>
                    </tr>
                    <tr>
                        <th>放款渠道</th>
                        <td>
                            <el-radio-group v-model="editObject.loansource">
                                <el-radio
                                    v-for="(loan, index) in loanlist"
                                    :label="loan.name"
                                    :value="loan.name"
                                ></el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <th>回款渠道</th>
                        <td>
                            <el-radio-group v-model="editObject.repaymentsource">
                                <el-radio
                                    v-for="(repay, index) in repaylist"
                                    :label="repay.name"
                                    :value="repay.name"
                                ></el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <center>
                                <el-button type="primary" @click="save()">保存</el-button>
                            </center>
                        </td>
                    </tr>
                </table>
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
                editObject: {loansource: [], repaymentsource: []},
                facelist: [],
                operalist: [],
                loanlist: [],
                repaylist: []
            };
        },
        beforeCreate() {
            var that = this;
            that.axios
                .get("/thirdpartyint/queryAllCompany", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                })
                .then(res => {
                    that.facelist = res.data.facelist;
                    that.operalist = res.data.operalist;
                    that.loanlist = res.data.loanlist;
                    that.repaylist = res.data.repaylist;
                    that.axios
                        .get("/thirdpartyint/queryAll", {
                            params: {companyId: window.localStorage.getItem("companyid")}
                        })
                        .then(res => {
                            that.editObject = res.data[0];
                        });
                });
        },
        methods: {
            Search() {
                var that = this;
                that.axios
                    .get("/thirdpartyint/queryAllCompany", {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    })
                    .then(res => {
                        that.facelist = res.data.facelist;
                        that.operalist = res.data.operalist;
                        that.loanlist = res.data.loanlist;
                        that.repaylist = res.data.repaylist;
                        that.axios
                            .get("/thirdpartyint/queryAll", {
                                params: {companyId: window.localStorage.getItem("companyid")}
                            })
                            .then(res => {
                                that.editObject = res.data[0];
                            });
                    });
            },
            save() {
                var that = this;
                var param = {};
                param.id = that.editObject.id;
                param.companyid = that.editObject.companyid;
                param.idcardfaceauthentication = that.editObject.idcardfaceauthentication;
                param.operatorsauthentication = that.editObject.operatorsauthentication;
                param.loansource = that.editObject.loansource;
                param.repaymentsource = that.editObject.repaymentsource;
                that.axios
                    .get("/thirdpartyint/updateByPrimaryKey", {
                        params: param
                    })
                    .then(res => {
                        this.$message({
                            type: "success",
                            message: "编辑成功"
                        });
                        that.Search();
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
        background-color: #fff;
        min-height: 70vh;
    }

    .tableTwo {
        margin: 20px 10%;
        width: 65%;
        border-color: #dfe6ec;
    }

    .tableTwo th {
        width: 40%;
    }

    .tableTwo td {
        padding-left: 10%;
        text-align: left;
    }

    .el-select .el-input__inner {
        background-color: #f3f6fb;
    }
</style>
