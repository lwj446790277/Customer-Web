<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">个人信息</p> -->
		<div class="main">
            <div class="idcard">
                <span class="tit">身份证与人脸图</span>
                <ul class="pic">
                    <li>
                        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                        <el-button type="primary">放大身份照</el-button>
                    </li>
                    <li>
                        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                        <el-button type="primary">放大国徽照</el-button>
                    </li>
                    <li>
                        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                        <el-button type="primary">放大人脸照</el-button>
                    </li>
                </ul>
            </div>
            <ul class="bottom">
                <li>
                    <span class="tit">身份证信息</span>
                    <table border="1" cellspacing="0" cellpadding="20" class="news">
                        <tr>
                            <th>真实姓名</th>
                            <td>{{name}}</td>
                        </tr>
                        <tr>
                            <th>身份证号</th>
                            <td>{{card}}</td>
                        </tr>
                        <tr>
                            <th>年龄</th>
                            <td>{{age}}</td>
                        </tr>
                        <tr>
                            <th>省份</th>
                            <td>{{province}}</td>
                        </tr>
                    </table>
                </li>
                <li class="cen">
                    <span class="tit">定位信息</span>
                    <table border="1" cellspacing="0" cellpadding="20" class="news">
                        <tr>
                            <th>注册登录手机号</th>
                            <td>{{phone}}</td>
                        </tr>
                        <tr>
                            <th>家庭地址</th>
                            <td>{{Familyaddress}}</td>
                        </tr>
                        <tr>
                            <th>详细地址</th>
                            <td>{{Detailedaddress}}</td>
                        </tr>
                    </table>
                </li>
                <li>
                    <span class="tit">收款银行卡</span>
                    <table border="1" cellspacing="0" cellpadding="20" class="news">
                        <tr>
                            <th>开户行</th>
                            <td>{{OpeningBank}}</td>
                        </tr>
                        <tr>
                            <th>银行卡号</th>
                            <td>{{BankCard}}</td>
                        </tr>
                        <tr>
                            <th>绑定手机号</th>
                            <td>{{Binding}}</td>
                        </tr>
                    </table>
                </li>
            </ul>
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
				name: "",
                card: "",
                age: "",
                province: "",
                phone: "",
                Familyaddress: "",
                Detailedaddress: "",
                OpeningBank: "",
                BankCard: "",
                Binding: ""
			}
		},
		created(){
			
		},
		methods:{
			
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
    .idcard{
        width: 100%;
        height: 430px;
        border: 1px solid #999;
    }
    .tit{
        display: block;
        text-align: center;
        line-height: 40px;
        border-bottom: 1px solid #999;
    }
    .pic{
        width: 100%;
    }
    .pic li{
        width: 33.3%;
        float: left;
        text-align: center;
        padding-top: 20px;
    }
    .pic li img{
        width: 80%;
        margin-bottom: 15px;
    }
    .bottom{
        width: 100%;
        margin-top: 20px;
    }
    .bottom li{
        width: 30%;
        float: left;
        border: 1px solid #999;
    }
    .cen{
        margin-left: 4.62%;
        margin-right: 4.99%;
    }
    .news{
        border-color: #dfe6ec;
        width: 94%;
        margin: 15px auto;
    }
    .news th{
        width: 40%;
        text-align: center;
    }
    .news td{
        text-align: center;
    }
</style>
