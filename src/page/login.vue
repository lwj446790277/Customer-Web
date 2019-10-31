<template>
    <div class="login_page fillcontain">
        <div class="form-fade">
            <p class="manage_tip">用户登录</p>
            <p class="manage_but">USER LOGIN</p>
            <el-form :model="loginForm" ref="loginForm" class="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="手机号" class="username"><span></span></el-input>
                </el-form-item>
                <el-form-item prop="picture">
                    <el-input v-model="loginForm.imageCode" placeholder="图形验证码" class="user-image-code"><span></span>
                    </el-input>
                    <img v-bind:src="imgUrl" class="imgReset" @click="getImgCode">
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" @keyup.enter.native="submitForm" placeholder="短信验证码" v-model="loginForm.password" class="password"
                              @keyup.enter="submitForm('loginForm')"></el-input>
                    <input type="button" class="send-short-message" @click="sendShortMessage" v-bind:value="sendText" :disabled="disableButton"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login, getAdminInfo} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import qs from 'qs'

    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                    imageCode: '',
                    shortMessageCode: '',
                },
                imgUrl: '',
                sessionId: '',
                showLogin: false,
                sendText: '发送',
                disableButton: false
            }
        },
        created() {
            var that = this;
            this.axios.get("/login/initializationH5", {params: {}}).then(res => {
                that.imgUrl = res.data.photoUrl;
                that.sessionId = res.data.sessionId;
            }).catch(res => {
                console.log(res)
            })
        },
        mounted() {
            this.showLogin = true;
            if (!this.adminInfo.id) {
                this.getAdminData()
            }
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            ...mapActions(['getAdminData']),
            async submitForm() {
                if (!this.loginForm.username) {
                    this.$message({
                        type: "error",
                        message: "请输入11位手机号"
                    });
                    return false;
                }
                if (this.loginForm.username.length != 11) {
                    this.$message({
                        type: "error",
                        message: "请输入11位手机号"
                    });
                    return false;
                }
                this.axios.get('login/loginpc', {
                    params: {phone: this.loginForm.username, code: this.loginForm.password}
                }).then(res => {
                    if (!res.data.loginStatus) {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    } else {
                        this.$message({
                            type: 'success',
                            message: '登陆成功'
                        });
                        window.localStorage.setItem("companyid", res.data.companyid)
                        window.localStorage.setItem("account", res.data.account)
                        window.localStorage.setItem("userid", res.data.userid)
                        window.localStorage.setItem("role", res.data.functionIdList)
                        this.$router.push('manage')
                    }
                })
            },
            sendShortMessage() {
                var that = this;
                var data = {
                    sessionId: that.sessionId,
                    phone: that.loginForm.username,
                    code: that.loginForm.imageCode
                }
                var time = 31;
                that.axios.get("/login/sendH5ShortMessage", {params: data}).then(res => {
                    if (res.data.msg != '提交成功') {
                        this.$message({
                            type: "error",
                            message: res.data.msg
                        });
                    } else {
                        var num = setInterval(function () {
                            time--;
                            that.sendText = time + "秒"
                            that.disableButton = true;
                            if (time == 0) {
                                that.sendText = "再次发送"
                                that.disableButton = false;
                                clearInterval(num);
                                time = 31
                            }
                        }, 1000)
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            getImgCode: function () {
                var that = this;
                var data = {
                    sessionId: that.sessionId
                }
                that.axios.get("/login/getH5Code", {params: data}).then(res => {
                    that.imgUrl = res.data;
                }).catch(res => {
                    console.log(res)
                })
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .login_page {
        // background-color: #324057;
        background-image: url(../assets/img/login.png);
    }

    .form-fade {
        position: absolute;
        top: 26%;
        right: 20%;
    }

    .manage_tip {
        font-size: 1.6rem;
        color: #396fff;
        text-align: left;
    }

    .manage_but {
        font-size: 1rem;
        color: #b3bbd3;
        text-align: left;
    }

    .loginForm {
        margin-top: 10%;
    }

    .username {
        background: #fff url(../assets/img/name.png) 4px 4px no-repeat;
        background-size: 30px;
        width: 300px;
        line-height: 40px;
        padding-left: 40px;
        margin-bottom: 20px;
    }

    .user-image-code {
        background: #fff url(../assets/img/shortMessage.png) 4px 4px no-repeat;
        background-size: 25px;
        width: 200px;
        padding-left: 40px;
        margin-bottom: 20px;
    }

    .user-image-code input.el-input__inner {
        border: 0 none;
    }

    .username input.el-input__inner {
        border: 0 none;
    }

    .password {
        background: #fff url(../assets/img/password.png) 4px 4px no-repeat;
        background-size: 30px;
        width: 200px;
        line-height: 40px;
        padding-left: 40px;
        margin-bottom: 20px;
    }

    .send-short-message {
        width: 100px;
        line-height: 40px;
        height: 40px;
        vertical-align: middle;
        text-align: center;
    }

    .password input.el-input__inner {
        border: 0 none;
    }

    .submit_btn {
        width: 340px;
        background-color: #396fff;
        font-size: 1.2rem;
    }

    .imgReset {
        height: 40px;
        width: 100px;
        vertical-align: middle
    }
</style>
