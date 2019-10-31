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
                                <img :src="user.facePhoto" width="100%" height="100%"/>
                                <div type="primary"
                                     style="margin-top:-5px;background-color:#0e85e0;width: 200px;height: 25px;text-align: center">
                                    <font color="white">人脸照</font></div>
                            </div>
                        </td>
                    </tr>
                </table>
                <el-card class="box-card" style="margin-left:30px;width: 30%;margin-top:50px;float:left">
                    <div slot="header" class="clearfix">
                        <span><font color="white">身份证信息</font></span>
                    </div>
                    <div class="text item">
                        <div class='my-label'>真实姓名</div>
                        <div class="my-text">{{user.truename}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'>身份证</div>
                        <div class="my-text">{{user.idcardNumber}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'>年龄</div>
                        <div class="my-text">{{user.age}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'>省份</div>
                        <div class="my-text">{{user.province}}</div>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-left:30px;width: 30%;margin-top:50px;float:left">
                    <div slot="header" class="clearfix">
                        <span><font color="white">定位信息</font></span>
                    </div>
                    <div class="text item">
                        <div class='my-label'>注册登录手机号</div>
                        <div class="my-text">{{user.phone}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'>家庭地址</div>
                        <div class="my-text">{{user.address}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'>详细地址</div>
                        <div class="my-text">{{user.detailaddress}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'></div>
                        <div class="my-text"></div>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-left:30px;width: 30%;margin-top:50px;float:left">
                    <div slot="header" class="clearfix">
                        <span><font color="white">收款银行卡</font></span>
                    </div>
                    <div class="text item">
                        <div class='my-label'>开户行</div>
                        <div class="my-text">{{card.bankcardTypeName}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'>银行卡号</div>
                        <div class="my-text">{{card.bankcardName}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'>绑定手机号</div>
                        <div class="my-text">{{card.tiedCardPhone}}</div>
                    </div>
                    <div class="text item">
                        <div class='my-label'></div>
                        <div class="my-text"></div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import defaultAddPicture from '../assets/img/default_add.png'

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
            that.user = {};
            that.card = {};
            that.axios.get('/user/queryUserAttesta', {
                params: {userid: that.$route.query.id}
            }).then(res => {
                that.user = !res.data.userAttestation ? {
                    truename: '暂无',
                    idcardNumber: '暂无',
                    age: '暂无',
                    province: '暂无',
                    phone: '暂无',
                    address: '暂无',
                    detailaddress: '暂无',
                    headurl: defaultAddPicture,
                    nationalemblemurl: defaultAddPicture,
                    facePhoto: defaultAddPicture,
                } : res.data.userAttestation;
                that.card = !res.data.bankcard ? {
                    bankcardTypeName: '暂无',
                    bankcardName: '暂无',
                    tiedCardPhone: '暂无'
                } : res.data.bankcard;
            })
        },
        methods: {
            searchById() {
                var that = this;
                that.user = {};
                that.card = {};
                if (!that.$route.query.id) {
                    return false;
                }
                that.axios.get('/user/queryUserAttesta', {
                    params: {userid: that.$route.query.id}
                }).then(res => {
                    that.user = !res.data.userAttestation ? {
                        truename: '暂无',
                        idcardNumber: '暂无',
                        age: '暂无',
                        province: '暂无',
                        phone: '暂无',
                        address: '暂无',
                        detailaddress: '暂无',
                        headurl: defaultAddPicture,
                        nationalemblemurl: defaultAddPicture,
                        facePhoto: defaultAddPicture,
                    } : res.data.userAttestation;
                    that.card = !res.data.bankcard ? {
                        bankcardTypeName: '暂无',
                        bankcardName: '暂无',
                        tiedCardPhone: '暂无'
                    } : res.data.bankcard;
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .el-card__header {
        background-color: #0e85e0;
    }

    .my-label {
        width: 50%;
        margin-top: 5px;
        float: left;
        text-align: left;
    }

    .my-text {
        width: 50%;
        margin-top: 5px;
        float: left;
        text-align: left;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

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
