<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置2</p> -->
        <div class="main">
            <table border="1" cellpadding="30" cellspacing="0">
                <tr>
                    <th>身份证及人脸认证</th>
                    <td>
                        <el-select v-model="editObject.idcardfaceauthentication">
                            <el-option v-for="face in facelist" :label="face.name"
                                       :value="face.name"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <th>运营商认证</th>
                    <td>
                        <el-select v-model="editObject.operatorsauthentication">
                            <el-option v-for="opera in operalist" :label="opera.name"
                                       :value="opera.name"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <th>借款渠道</th>
                    <td>
                        <el-checkbox-group v-model="editObject.loansource">
                            <el-checkbox v-for="(loan, index) in loanlist" :label="loan.name" :value="loan.name">
                            </el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>
                <tr>
                    <th>收款渠道</th>
                    <td>
                        <el-checkbox-group v-model="editObject.repaymentsource">
                            <el-checkbox v-for="(repay, index) in repaylist" :label="repay.name" :value="repay.name">
                            </el-checkbox>
                        </el-checkbox-group>
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
</template>

<script>
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                editObject: {loansource: [], repaymentsource: []},
                facelist: [],
                operalist: [],
                loanlist: [],
                repaylist: [],
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/thirdpartyint/queryAllCompany', {
                params: {companyId: 3}
            }).then(res => {
                that.facelist = res.data.facelist;
                that.operalist = res.data.operalist;
                that.loanlist = res.data.loanlist;
                that.repaylist = res.data.repaylist;
                that.axios.get('/thirdpartyint/queryAll', {
                    params: {companyId: 3}
                }).then(res => {
                    that.editObject = res.data[0];
                    that.editObject.loansource = that.editObject.loansource.split(',');
                    that.editObject.repaymentsource = that.editObject.repaymentsource.split(',');
                });
            });
        },
        methods: {
            Search() {
                var that = this;
                that.axios.get('/thirdpartyint/queryAllCompany', {
                    params: {companyId: 3}
                }).then(res => {
                    that.facelist = res.data.facelist;
                    that.operalist = res.data.operalist;
                    that.loanlist = res.data.loanlist;
                    that.repaylist = res.data.repaylist;
                    that.axios.get('/thirdpartyint/queryAll', {
                        params: {companyId: 3}
                    }).then(res => {
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
                param.loansource = that.editObject.loansource.join(',');
                param.repaymentsource = that.editObject.repaymentsource.join(',');
                that.axios.get('/thirdpartyint/updateByPrimaryKey', {
                    params: param
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    that.Search();
                })
            }
        },
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

    table {
        margin: 20px auto;
        width: 35%;
    }

    td {
        padding-left: 10%;
    }
</style>
