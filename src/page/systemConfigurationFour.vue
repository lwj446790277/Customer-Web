<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置4</p> -->
		<div class="main">
			<table border="1" cellpadding="30" cellspacing="0">
				<tr>
					<th>身份证判定可申请最小年龄段</th>
					<td>
						<el-input v-model="editObject.minimumage" placeholder="请输入整数"></el-input>
					</td>
				</tr>
				<tr>
					<th>身份证判定可申请最大年龄段</th>
					<td>
						<el-input v-model="editObject.maximumage" placeholder="请输入整数"></el-input>
					</td>
				</tr>
				<tr>
					<th>拒绝申请的省份
						<p>(用"/"符号隔开,例如'浙江省/四川省')</p>
					</th>
					<td>
						<el-input type="textarea" v-model="editObject.refuseapplyprovince" placeholder="台湾/香港/澳门"></el-input>
					</td>
				</tr>
				<tr>
					<th>允许签约的银行类型
						<p>(用"/"符号隔开)</p>
					</th>
					<td>
						<el-input type="textarea" v-model="editObject.allowsigningidcard" placeholder="中国银行/中国农业银行"></el-input>
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
                editObject:{}
			}
		},
        beforeCreate(){
    	    var that = this;
            that.axios.get('/applycondition/queryAll', {
                params: {companyId: window.localStorage.getItem("companyid")}
            }).then(res => {
                that.editObject = res.data[0];
            })
        },
        methods:{
    	    Search(){
                var that = this;
                that.axios.get('/applycondition/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.editObject = res.data[0];
                })
            },
            save(){
    	        var that = this;
                that.axios.get('/applycondition/updateByPrimaryKey', {
                    params: that.editObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                that.Search();
                })
            },
        }
    }
</script>

<style lang="less">
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
		width: 35%;
	}
</style>
