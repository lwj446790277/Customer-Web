<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置5</p> -->
		<div class="main">
			<table border="1" cellpadding="35" cellspacing="0">
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
                        <center><el-button type="primary" @click="save()">保存</el-button></center>
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
	.main{
		padding: 20px;
	}
	table{
		margin: 20px auto;
		width: 30%;
	}
	td{
		padding-left: 15%;
	}
</style>
