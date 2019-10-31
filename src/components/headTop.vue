<template>
    <div class="header_container" style="background-color:#545c64;text-color:#fff">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/manage' }"><font color="#ffd04b">首页</font></el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index"><font color="#ffd04b">{{item}}</font></el-breadcrumb-item>
        </el-breadcrumb>
        <span style="margin-right: 30px;"><center><font color="white">当前版本 1.0.102818</font></center></span>
        <el-dropdown @command="handleCommand" menu-align='start'>
            <span style="margin-right: 10px;"><font color="white">{{userName}}</font></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="signout" @click="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {signout} from '@/api/getData'
    import {baseImgPath} from '@/config/env'
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                baseImgPath,
                userName:window.localStorage.getItem('account')
            }
        },
        created() {
            if (!this.adminInfo.id) {
                this.getAdminData()
            }
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            ...mapActions(['getAdminData']),
            async handleCommand(command) {
                if (command == 'home') {
                    this.$router.push('/manage');
                } else if (command == 'signout') {
                    this.axios.get('login/logOut', {
                        params: {userId:window.localStorage.getItem("userid")}
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        });
                        window.localStorage.removeItem("companyid")
                        window.localStorage.removeItem("account")
                        window.localStorage.removeItem("userid")
                        this.$router.push('/')
                    })
                }
            },
            loginOut() {
                this.axios.get('/login/logOut', {
                    params: {userId:window.localStorage.getItem("userid")}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '退出成功'
                    });
                    window.localStorage.removeItem("companyid")
                    window.localStorage.removeItem("account")
                    window.localStorage.removeItem("userid")
                    window.localStorage.removeItem('role')
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .header_container {
        background-color: #3486d2;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
    }

    .avator {
        .wh(36px, 36px);
        border-radius: 50%;
        margin-right: 37px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .el-breadcrumb__item__inner{
        color: #fff;
    }

    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner{
        color: #fff;
    }
</style>
