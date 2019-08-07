<template>
    <div class="login_page fillcontain">
        <div class="form-fade">
            <p class="manage_tip">用户登录</p>
            <p class="manage_but">USER LOGIN</p>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名" class="username"><span>dsfsf</span></el-input>
                    <!-- <input v-model="loginForm.username" placeholder="用户名" class="username" /> -->
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password" class="password" @keyup.enter="submitForm('loginForm')"></el-input>
                    <!-- <input v-model="loginForm.password" placeholder="密码" class="password" /> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>后台管理系统</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition> -->
    </div>
</template>

<script>
    import {login, getAdminInfo} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                showLogin: false,
            }
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
        created(){
            var that = this;
            document.onkeydown = function(e) {
                var key = window.event.keyCode;
                if (key == 13) {
                    that.submitForm();
                }
            }
        },
        methods: {
            ...mapActions(['getAdminData']),
            async submitForm() {
                this.axios.get('login/loginap', {
                    params: {account: this.loginForm.username, pwd: this.loginForm.password}
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
                        this.$router.push('manage')
                    }
                })
                /*this.$refs[formName].validate(async (valid) => {
                    if (valid) {

                        res.status =1;
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '登录成功'
                            });
                            this.$router.push('manage')
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                            offset: 100
                        });
                        return false;
                    }
                });*/
            },
        },
        /*watch: {
            adminInfo: function (newValue){
                if (newValue.id) {
                    this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
                    this.$router.push('manage')
                }
            }
        }*/
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .login_page {
        // background-color: #324057;
        background-image: url(../assets/img/login.png);
    }

    .form-fade{
        position: absolute;
        top: 26%;
        right: 20%;
    }

    .manage_tip{
        font-size: 1.6rem;
        color: #396fff;
        text-align: left;
    }

    .manage_but{
        font-size: 1rem;
        color: #b3bbd3;
        text-align: left;
    }

    .loginForm{
        margin-top: 10%;
    }

    .username{
        background: #fff url(../assets/img/name.png) 4px 4px no-repeat;
        background-size: 30px;
        width: 300px;
        line-height: 40px;
        padding-left: 40px;
        margin-bottom: 20px;
    }

    .username input.el-input__inner {
        border: 0 none;
    }

    .password{
        background: #fff url(../assets/img/password.png) 4px 4px no-repeat;
        background-size: 30px;
        width: 300px;
        line-height: 40px;
        padding-left: 40px;
        margin-bottom: 20px;
    }

    .password input.el-input__inner {
        border: 0 none;
    }

    .submit_btn{
        width: 340px;
        background-color: #396fff;
        font-size: 1.2rem;
    }

    // .manage_tip {
    //     position: absolute;
    //     width: 100%;
    //     top: -100px;
    //     left: 0;

    //     p {
    //         font-size: 34px;
    //         color: #fff;
    //     }
    // }

    // .form_contianer {
    //     .wh(320px, 210px);
    //     .ctp(320px, 210px);
    //     padding: 25px;
    //     border-radius: 5px;
    //     text-align: center;
    //     background-color: #fff;

    //     .submit_btn {
    //         width: 100%;
    //         font-size: 16px;
    //     }
    // }

    // .tip {
    //     font-size: 12px;
    //     color: red;
    // }

    // .form-fade-enter-active, .form-fade-leave-active {
    //     transition: all 1s;
    // }

    // .form-fade-enter, .form-fade-leave-active {
    //     transform: translate3d(0, -50px, 0);
    //     opacity: 0;
    // }
</style>
