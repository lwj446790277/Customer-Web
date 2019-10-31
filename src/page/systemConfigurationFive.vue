<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置5</p> -->
        <div class="back">
            <h2>认证信息配置</h2>
            <div class="main">
                <table border="0" cellpadding="50" cellspacing="0" class="tableFive">
                    <tr>
                        <th>个人信息</th>
                        <td>
                            <el-radio-group v-model="tableList[0].ifauthentication">
                                <el-radio label="1">需认证</el-radio>
                                <el-radio label="2">免认证</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <th>收款银行卡</th>
                        <td>
                            <el-radio-group v-model="tableList[1].ifauthentication">
                                <el-radio label="1">需认证</el-radio>
                                <el-radio label="2">免认证</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <template v-if="tableList[1].ifauthentication==1">
                        <tr style="width:50px;padding:0px;margin:0px">
                            <th style="width:50px;padding:0px;margin-top:0px;text-align: right">请选择银行卡验证规则</th>
                            <td>
                                <el-checkbox-group v-model="cardFour">
                                    <el-checkbox v-for="(second, index) in tableList[1].listsecond"
                                                 :label="second.secondattributes" :checked="second.status==1?true:false"
                                                 @change="(checked)=>changeSelected(checked,second)">
                                    </el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <th>手机运营商</th>
                        <td>
                            <el-radio-group v-model="tableList[2].ifauthentication">
                                <el-radio label="1">需认证</el-radio>
                                <el-radio label="2">免认证</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <template v-if="tableList[2].ifauthentication==1">
                        <tr style="width:50px;padding:0px;margin:0px">
                            <th style="width:50px;padding:0px;margin-top:0px;text-align: right">请选择手机运营商验证规则</th>
                            <td>
                                <el-checkbox-group v-model="phoneThree">
                                    <el-checkbox v-for="(second, index) in tableList[2].listsecond" :label="second.secondattributes" :checked="second.status==1?true:false"  @change="(checked)=>changeSelected(checked,second)">
                                    </el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <th>芝麻授信</th>
                        <td>
                            <el-radio-group v-model="tableList[3].ifauthentication">
                                <el-radio label="1">需认证</el-radio>
                                <el-radio label="2">免认证</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                </table>
                <el-button type="primary" @click="save()" class="btns">保存</el-button>
            </div>
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
                tableList: [{ifauthentication: ''}, {ifauthentication: ''}, {ifauthentication: ''}, {ifauthentication: ''}],
                phoneThree: [],
                cardFour: [],

            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/autheninfor/queryAll', {
                params: {companyId: window.localStorage.getItem("companyid")}
            }).then(res => {
                that.tableList = res.data;
            })
        },
        methods: {
            changeSelected(e, object) {
                if (e) {
                    object.status = 1;
                } else {
                    object.status = 2;
                }
            },
            Search() {
                var that = this;
                that.axios.get('/autheninfor/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.tableList = res.data;
                })
            },
            save() {
                var that = this;
                var param = {};
                param.id1 = that.tableList[0].id;
                param.value1 = that.tableList[0].ifauthentication;
                param.id2 = that.tableList[1].id;
                param.value2 = that.tableList[1].ifauthentication;
                param.id3 = that.tableList[2].id;
                param.value3 = that.tableList[2].ifauthentication;
                param.id4 = that.tableList[3].id;
                param.value4 = that.tableList[3].ifauthentication;


                if(param.value2 ==1){
                    param.id1b = that.tableList[1].listsecond[0].id;
                    param.value1b = that.tableList[1].listsecond[0].status;
                    param.id2b = that.tableList[1].listsecond[1].id;
                    param.value2b = that.tableList[1].listsecond[1].status;
                }
                if(param.value3 ==1){
                    param.id1o = that.tableList[2].listsecond[0].id;
                    param.value1o = that.tableList[2].listsecond[0].status;
                    param.id2o = that.tableList[2].listsecond[1].id;
                    param.value2o = that.tableList[2].listsecond[1].status;
                }
                /*  param.listopeator = that.tableList[1].listsecond;
                  param.listbank = that.tableList[2].listsecond;*/
                that.axios.get('/autheninfor/updateByPrimaryKey', {
                    params: param
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    that.Search();
                })
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

    .back {
        background-color: #eff2f7;
        height: 100vh;
        padding: 50px;
    }

    h2 {
        margin-bottom: 15px;
        margin-top: -25px;
    }

    .main {
        // margin: 20px;
        padding: 50px;
        background-color: #fff;
    }

    .tableFive {
        margin: 20px 10%;
        width: 60%;
        border-color: #dfe6ec;
        background-color: #fff;
    }

    .tableFive th {
        text-align: left;
    }

    .tableFive td {
        padding-left: 5%;
        width: 70%;
    }

    .el-radio {
        margin-right: 90px;
    }

    .el-radio:visited {
        color: #fff;
    }

    .btns {
        margin-left: 30%;
    }
</style>
