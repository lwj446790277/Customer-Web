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
                    <tr>
                        <th>手机运营商</th>
                        <td>
                            <el-radio-group v-model="tableList[2].ifauthentication">
                                <el-radio label="1">需认证</el-radio>
                                <el-radio label="2">免认证</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <th>芝麻授信</th>
                        <td>
                            <el-radio-group v-model="tableList[3].ifauthentication">
                                <el-radio label="1">需认证</el-radio>
                                <el-radio label="2">免认证</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <el-button type="primary" @click="save()" class="btn">保存</el-button>
                        </td>
                    </tr>
                </table>
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
		data(){
			return{
                tableList:[{ifauthentication:''},{ifauthentication:''},{ifauthentication:''},{ifauthentication:''}],
			}
		},
        beforeCreate(){
            var that = this;
            that.axios.get('/autheninfor/queryAll', {
                params: {companyId: window.localStorage.getItem("companyid")}
            }).then(res => {
                that.tableList = res.data;
            })
        },
        methods:{
    	    Search(){
                var that = this;
                that.axios.get('/autheninfor/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.tableList = res.data;
                })
            },
            save(){
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
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
    }
    .back{
        background-color: #eff2f7;
        height: 100vh;
        padding: 50px;
    }
    h2{
        margin-bottom: 15px;
        margin-top: -25px;
    }
	.main{
        // margin: 20px;
        padding: 50px;
        background-color: #fff;
	}
	.tableFive{
		margin: 50px 20%;
		width: 60%;
        border-color: #dfe6ec;
        background-color: #fff;
    }
    .tableFive th{
        text-align: left;
    }
	.tableFive td{
        padding-left: 10%;
        width: 70%;
    }
    .el-radio{
        margin-right: 90px;
    }
    .el-radio:visited{
        color: #fff;
    }
    .btn{
        width: 80px;
        margin-left: 20%;
        background-color:#396fff;
    }
</style>
