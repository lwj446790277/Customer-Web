<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">个人信息</p> -->
        <div class="back">
            <h2>身份证及人脸查询</h2>
            <div class="main">
                <table cellpadding="30" cellspacing="0" class="table" style="width: 100%;margin-left: 0px;">
                    <tr>
                        <td>
                            <div style="width: 200px; height:200px;">
                                <img :src="user.headurl" width="100%" height="100%"/>
                                <div type="primary"
                                     style="margin-top:-5px;background-color:#0e85e0;width: 200px;height: 25px;text-align: center">
                                    <font color="white">正面照</font></div>
                            </div>
                        </td>
                        <td>
                            <div style="width: 200px; height:200px;">
                                <img :src="user.nationalemblemurl" width="100%" height="100%"/>
                                <div type="primary"
                                     style="margin-top:-5px;background-color:#0e85e0;width: 200px;height: 25px;text-align: center">
                                    <font color="white">背面照</font></div>
                            </div>
                        </td>
                        <td>
                            <div style="width: 200px; height:200px;">
                                <img :src="user.headurl" width="100%" height="100%"/>
                                <div type="primary"
                                     style="margin-top:-5px;background-color:#0e85e0;width: 200px;height: 25px;text-align: center">
                                    <font color="white">人脸照</font></div>
                            </div>
                        </td>
                    </tr>
                </table>
                <ul class="bottom">
                    <li>
                        <span class="tit">身份证信息</span>
                        <table border="1" cellspacing="0" cellpadding="20" class="news">
                            <tr>
                                <th>真实姓名</th>
                                <td>{{user.truename}}</td>
                            </tr>
                            <tr>
                                <th>身份证号</th>
                                <td>{{user.idcardNumber}}</td>
                            </tr>
                            <tr>
                                <th>年龄</th>
                                <td>{{user.age}}</td>
                            </tr>
                            <tr>
                                <th>省份</th>
                                <td>{{user.province}}</td>
                            </tr>
                        </table>
                    </li>
                    <li class="cen">
                        <span class="tit">定位信息</span>
                        <table border="1" cellspacing="0" cellpadding="20" class="news">
                            <tr>
                                <th>注册登录手机号</th>
                                <td>{{user.phone}}</td>
                            </tr>
                            <tr>
                                <th>家庭地址</th>
                                <td>{{user.address}}</td>
                            </tr>
                            <tr>
                                <th>详细地址</th>
                                <td>{{user.detailaddress}}</td>
                            </tr>
                        </table>
                    </li>
                    <li>
                        <span class="tit">收款银行卡</span>
                        <table border="1" cellspacing="0" cellpadding="20" class="news">
                            <tr>
                                <th>开户行</th>
                                <td>{{card.bankcardTypeName}}</td>
                            </tr>
                            <tr>
                                <th>银行卡号</th>
                                <td>{{card.bankcardName}}</td>
                            </tr>
                            <tr>
                                <th>绑定手机号</th>
                                <td>{{card.tiedCardPhone}}</td>
                            </tr>
                        </table>
                    </li>
                </ul>
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
        watch: {   //监听值变化：map值
            "$route": {
                handler(route) {
                    var that = this;
                    if (route.path == '/personalInformation') {
                        that.searchById();
                    }
                }
            }
        },
        data() {
            return {
                user: {},
                card: {},
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/user/queryUserAttesta', {
                params: {userid: that.$route.query.id}
            }).then(res => {
                that.user = res.data.userAttestation;
                that.card = res.data.bankcard;
            })
        },
        methods: {
            searchById() {
                var that = this;
                if(!that.$route.query.id){
                    return false;
                }
                that.axios.get('/user/queryUserAttesta', {
                    params: {userid: that.$route.query.id}
                }).then(res => {
                    that.user = res.data.userAttestation;
                    that.card = res.data.bankcard;
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

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

    .idcard {
        width: 100%;
        height: 430px;
        border: 1px solid #999;
    }

    .tit {
        display: block;
        text-align: center;
        line-height: 40px;
        border-bottom: 1px solid #999;
    }

    .pic {
        width: 100%;
    }

    .pic li {
        width: 33.3%;
        float: left;
        text-align: center;
        padding-top: 20px;
    }

    .pic li img {
        width: 80%;
        margin-bottom: 15px;
    }

    .bottom {
        width: 100%;
        margin-top: 20px;
    }

    .bottom li {
        width: 30%;
        float: left;
        border: 1px solid #999;
    }

    .cen {
        margin-left: 4.62%;
        margin-right: 4.99%;
    }

    .news {
        border-color: #dfe6ec;
        width: 94%;
        margin: 15px auto;
    }

    .news th {
        width: 40%;
        text-align: center;
    }

    .news td {
        text-align: center;
    }
</style>
