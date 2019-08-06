<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <el-menu id="main" :default-active="defaultActive" style="min-height: 100%;"
                         theme="dark" router>
                    <el-menu-item index="manage"><img src="../assets/img/首页.png">首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><img src="../assets/img/订单管理.png">订单管理</template>
                        <el-menu-item index="MachineOrder">机审订单</el-menu-item>
                        <el-menu-item index="electricOrder">待人审订单</el-menu-item>
                        <el-menu-item index="manualReview">已人审订单</el-menu-item>
                        <el-menu-item index="queryOrder">订单查询</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><img src="../assets/img/用户管理.png">用户管理</template>
                        <el-menu-item index="userList">注册用户信息</el-menu-item>
                        <el-menu-item index="userInteraction">白名单用户</el-menu-item>
                        <el-menu-item index="blackList">黑名单用户</el-menu-item>
                        <el-menu-item index="shortMessageSending">注册用户短信发送</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><img src="../assets/img/财务管理.png">财务管理</template>
                        <el-menu-item index="paymentRecord">放款实时流水</el-menu-item>
                        <el-menu-item index="repaymentPlan">还款实时流水</el-menu-item>
                        <el-menu-item index="repaymentRecord">延期和扣款查询</el-menu-item>
                        <el-menu-item index="manualTransfer">线上减免调账</el-menu-item>
                        <el-menu-item index="artificialDelay">人工延期设置</el-menu-item>
                        <el-menu-item index="offlineRepayment">线下调账</el-menu-item>
                        <el-menu-item index="newMember">银行卡自动扣款</el-menu-item>
                        <el-menu-item index="financialOverview">财务总览</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><img src="../assets/img/贷后订单.png">贷后订单管理</template>
                        <el-menu-item index="dateOrder">期限内订单</el-menu-item>
                        <el-menu-item index="returnOrder">已还订单</el-menu-item>
                        <el-menu-item index="overdueOrder">已逾期订单</el-menu-item>
                        <el-menu-item index="badOrder">已坏账订单</el-menu-item>
                        <el-menu-item index="channelThree">逾前短信提醒</el-menu-item>
                        <!-- <el-menu-item index="personalInformation">个人信息</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><img src="../assets/img/催收.png">催收预警及管理</template>
                        <el-menu-item index="collectionOne">已逾期未分配</el-menu-item>
                        <el-menu-item index="collectionTwo">已逾期已分配</el-menu-item>
                        <el-menu-item index="collectionThree">催收率报表</el-menu-item>
                        <el-menu-item index="collectionFour">催收员工作报表</el-menu-item>
                        <el-menu-item index="collectionFive">已分配未催收</el-menu-item>
                        <el-menu-item index="collectionSix">已分配已催收</el-menu-item>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title"><img src="../assets/img/运营数据.png">运营数据</template>
                        <el-menu-item index="operationalDataOne">平台总数据</el-menu-item>
                        <el-menu-item index="operationalDataTwo">还款数据</el-menu-item>
                        <el-menu-item index="operationalDataThree">逾期数据</el-menu-item>
<!--                         <el-menu-item index="operationalDataFour">收支数据</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title"><img src="../assets/img/app.png">APP管理设置</template>
                        <el-menu-item index="windControlOne">轮播图设置</el-menu-item>
                        <el-menu-item index="systemConfigurationTextEdit">协议编辑</el-menu-item>
                        <el-menu-item index="windControlThree">联系客服和关于我们</el-menu-item>
                    </el-submenu>
                    <el-submenu index="9">
                        <template slot="title"><img src="../assets/img/渠道.png">渠道管理</template>
                        <el-menu-item index="channelOne">渠道数据查询</el-menu-item>
                        <el-menu-item index="channelTwo">渠道设置管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="10">
                        <template slot="title"><img src="../assets/img/设置.png">系统配置</template>
                        <el-menu-item index="systemConfigurationOne">贷款类型配置</el-menu-item>
                        <el-menu-item index="systemConfigurationTwo">第三方接口设置</el-menu-item>
                        <el-menu-item index="systemConfigurationThree">风控设置管理</el-menu-item>
                        <el-menu-item index="systemConfigurationFour">申请条件配置</el-menu-item>
                        <el-menu-item index="systemConfigurationFive">认证信息配置</el-menu-item>
                        <el-menu-item index="systemConfigurationSix">逾期等级设置</el-menu-item>
                        <el-menu-item index="systemConfigurationSeven">角色权限管理</el-menu-item>
                        <el-menu-item index="systemConfigurationEight">渠道预设和紧急设置</el-menu-item>
                    </el-submenu>
                </el-menu>
                <el-menu id="customer_info" :default-active="defaultActive" style="min-height: 100%;display:none" theme="dark"
                         router>
                    <el-submenu index="2">
                        <template slot="title"><img src="../assets/img/订单管理.png">认证信息查看</template>
                        <el-menu-item index="personalInformation">个人信息</el-menu-item>
                        <el-menu-item index="electricOrder">通讯录列表</el-menu-item>
                        <el-menu-item index="manualReview">风控报告</el-menu-item>
                        <el-menu-item index="queryOrder">返回</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
        data() {
            return {
                main: false,
                customer_info: false
            }
        },
        watch: {   //监听值变化：map值
            "$route": {
                handler(route) {
                    var that = this;
                    if (route.path == '/personalInformation') {
                        that.changeLeftList();
                    }else{
                        that.initLeftList();
                    }
                }
            }
        },
        methods: {
            changeLeftList() {
                var main = document.getElementById('main');
                main.style.display='none';
                var customer_info = document.getElementById('customer_info');
                customer_info.style.display='';
            },
            initLeftList(){
                var main = document.getElementById('main');
                main.style.display='';
                var customer_info = document.getElementById('customer_info');
                customer_info.style.display='none';
            }
        }
    }
</script>


<style lang="less">
    @import '../style/mixin';

    .manage_page {

    }

    .el-menu-item img {
        width: 25px;
        margin-right: 5px;
    }

    .el-submenu img {
        width: 25px;
        margin-right: 5px;
    }
</style>
