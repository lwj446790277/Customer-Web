<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置4</p> -->
        <div class="back">
            <h2>申请条件配置</h2>
		<div class="main">
			<table cellpadding="30" cellspacing="0" class="tableFour" style="width: 100%;margin-left: 0px;">
				<tr>
					<th>身份证判定可申请最小年龄段</th>
					<td>
                        <input
                            autocomplete="off"
                            type="text"
                            rows="2"
                            validateevent="true"
                            class="el-input__inner nmsl"
                            v-model="editObject.minimumage"
                            placeholder="请输入整数"
                        />
					</td>
				</tr>
				<tr>
					<th>身份证判定可申请最大年龄段</th>
					<td>
                        <input
                            autocomplete="off"
                            type="text"
                            rows="2"
                            validateevent="true"
                            class="el-input__inner nmsl"
                            v-model="editObject.maximumage"
                            placeholder="请输入整数"
                        />
					</td>
				</tr>
				<tr>
					<th>拒绝申请的省份 (用"/"符号隔开)
					</th>
					<td>
                        <textarea v-model="editObject.refuseapplyprovince" type="textarea" rows="2"
                                  autocomplete="off" validateevent="true" class="el-textarea__inner nmsl"
                                  style="min-height: 33px; margin-top: 0px; margin-bottom: 0px; height: 58px;"></textarea>
                    </td>
                    <td></td>
				</tr>
				<tr>
					<th>允许签约的银行类型 (用"/"符号隔开)
					</th>
					<td>
                        <textarea v-model="editObject.allowsigningidcard" type="textarea" rows="2"
                                  autocomplete="off" validateevent="true" class="el-textarea__inner nmsl"
                                  style="min-height: 33px; margin-top: 0px; margin-bottom: 0px; height: 58px;"></textarea>
                    </td>
				</tr>
                <tr>
                    <td colspan="2">
                        <center><el-button type="primary" @click="save()" style="background:#396fff">保存</el-button></center>
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
        background-color: white;
	}
	.tableFour{
		margin: 20px 20%;
		width: 35%;
		border-color: #dfe6ec;
	}
    .tableFour th{
        width :  400px;
        text-align: left;
        padding-left: 100px;
    }
    .tableFour td{
        width :  400px;
    }

    .nmsl {
        background-color: #f3f6fb;
        border: transparent;
        border-radius: 0;
        color: #396fff;
        text-align: center;
    }
</style>
