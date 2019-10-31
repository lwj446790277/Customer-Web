<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="2" style="min-height: 100%; background-color: #324057;">
                <el-menu v-if="showLeft" id="main" :default-active="defaultActive" style="min-height: 100%;" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <template v-if="isInArray(1)||isInArray(2)">
                        <el-menu-item index="manage"><img src="../assets/img/首页.png">首页</el-menu-item>
                    </template>

                    <template v-if="isInArray(3)||isInArray(4)||isInArray(5)||isInArray(6)">
                        <el-submenu index="2">
                            <template slot="title"><img src="../assets/img/订单管理.png">订单管理</template>
                            <template v-if="isInArray(3)">
                                <el-menu-item index="MachineOrder">机审订单</el-menu-item>
                            </template>
                            <template v-if="isInArray(4)">
                                <el-menu-item index="electricOrder">待人审订单</el-menu-item>
                            </template>
                            <template v-if="isInArray(5)">
                                <el-menu-item index="manualReview">已人审订单</el-menu-item>
                            </template>
                            <template v-if="isInArray(6)">
                                <el-menu-item index="queryOrder">订单查询</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>

                    <el-submenu index="11">
                        <template slot="title"><img src="../assets/img/订单管理.png">报表查看</template>
                        <el-menu-item index="loanTable">放款表</el-menu-item>
                        <el-menu-item index="payTable">还款表</el-menu-item>
                        <el-menu-item index="delayTable">续借表</el-menu-item>
                        <el-menu-item index="overdueTable">逾期表</el-menu-item>
                        <el-menu-item index="countTable">实时统计</el-menu-item>
                    </el-submenu>

                    <template v-if="isInArray(7)||isInArray(8)||isInArray(9)||isInArray(10)||isInArray(11)||isInArray(12)||isInArray(13)||isInArray(14)||isInArray(15)">
                        <el-submenu index="5">
                            <template slot="title"><img src="../assets/img/贷后订单.png">贷后管理</template>
                            <template v-if="isInArray(7)||isInArray(8)||isInArray(9)||isInArray(10)||isInArray(11)">
                                <el-menu-item index="dateOrder">期限内订单</el-menu-item>
                            </template>
                            <template v-if="isInArray(12)">
                                <el-menu-item index="returnOrder">已还订单</el-menu-item>
                            </template>

                            <template v-if="isInArray(13)">
                                <el-menu-item index="overdueOrder">已逾期订单</el-menu-item>
                            </template>
                            <template v-if="isInArray(14)">
                                <el-menu-item index="badOrder">已坏账订单</el-menu-item>
                            </template>
                            <template v-if="isInArray(15)">
                                <el-menu-item index="channelThree">逾前短信提醒</el-menu-item>
                            </template>
                            <!-- <el-menu-item index="personalInformation">个人信息</el-menu-item> -->
                        </el-submenu>
                    </template>

                    <template
                        v-if="isInArray(16)||isInArray(17)||isInArray(18)||isInArray(19)||isInArray(20)||isInArray(21)">
                        <el-submenu index="6">
                            <template slot="title"><img src="../assets/img/催收.png">催收管理</template>
                            <template v-if="isInArray(16)">
                                <el-menu-item index="collectionOne">已逾期未分配</el-menu-item>
                            </template>
                            <template v-if="isInArray(17)">
                                <el-menu-item index="collectionTwo">已逾期已分配</el-menu-item>
                            </template>
                            <template v-if="isInArray(18)">
                                <el-menu-item index="collectionThree">催收率报表</el-menu-item>
                            </template>
                            <template v-if="isInArray(19)">
                                <el-menu-item index="collectionFour">催收员工作报表</el-menu-item>
                            </template>
                            <template v-if="isInArray(20)">
                                <el-menu-item index="collectionFive">已分配未催收</el-menu-item>
                            </template>
                            <template v-if="isInArray(21)">
                                <el-menu-item index="collectionSix">已分配已催收</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>

                    <template
                        v-if="isInArray(22)||isInArray(23)||isInArray(24)||isInArray(25)||isInArray(66)">
                        <el-submenu index="3">
                            <template slot="title"><img src="../assets/img/用户管理.png">用户管理</template>
                            <template v-if="isInArray(22)">
                                <el-menu-item index="userList">注册用户信息</el-menu-item>
                            </template>
                            <template v-if="isInArray(23)||isInArray(24)">
                                <el-menu-item index="blackList">黑名单用户</el-menu-item>
                            </template>
                            <template v-if="isInArray(25)">
                                <el-menu-item index="userInteraction">白名单用户</el-menu-item>
                            </template>
                            <template v-if="isInArray(66)">
                                <el-menu-item index="shortMessageSending">注册用户短信发送</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>

                    <template
                        v-if="isInArray(26)||isInArray(27)||isInArray(28)||isInArray(29)||isInArray(30)||isInArray(31)
                            ||isInArray(32)||isInArray(33)||isInArray(34)||isInArray(35)||isInArray(36)||isInArray(37)
                            ||isInArray(38)||isInArray(39)||isInArray(40)||isInArray(41)||isInArray(42)">
                        <el-submenu index="4">
                            <template slot="title"><img src="../assets/img/财务管理.png">财务管理</template>
                            <template v-if="isInArray(26)">
                                <el-menu-item index="paymentRecord">放款实时流水</el-menu-item>
                            </template>
                            <template v-if="isInArray(27)">
                                <el-menu-item index="repaymentPlan">还款实时流水</el-menu-item>
                            </template>
                            <template v-if="isInArray(28)">
                                <el-menu-item index="repaymentRecord">延期和扣款查询</el-menu-item>
                            </template>
                            <template v-if="isInArray(29)||isInArray(30)||isInArray(31)||isInArray(32)">
                                <el-menu-item index="manualTransfer">线上减免调账</el-menu-item>
                            </template>
                            <template v-if="isInArray(33)||isInArray(34)">
                                <el-menu-item index="artificialDelay">人工延期设置</el-menu-item>
                            </template>
                            <template v-if="isInArray(35)||isInArray(36)||isInArray(37)||isInArray(38)">
                                <el-menu-item index="offlineRepayment">线下减免结单</el-menu-item>
                            </template>
                            <template v-if="isInArray(39)||isInArray(40)||isInArray(68)">
                                <el-menu-item index="newMember">银行卡自动扣款</el-menu-item>
                            </template>
                            <template v-if="isInArray(41)||isInArray(42)">
                                <el-menu-item index="financialOverview">财务总览</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>

                    <template v-if="isInArray(43)||isInArray(44)">
                        <el-submenu index="9">
                            <template slot="title"><img src="../assets/img/渠道.png">渠道管理</template>
                            <template v-if="isInArray(43)">
                                <el-menu-item index="channelOne">渠道数据查询</el-menu-item>
                            </template>
                            <template v-if="isInArray(44)">
                                <el-menu-item index="channelTwo">渠道设置管理</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>

                    <template v-if="isInArray(45)||isInArray(46)||isInArray(47)">
                        <el-submenu index="7">
                            <template slot="title"><img src="../assets/img/运营数据.png">运营数据</template>
                            <template v-if="isInArray(45)">
                                <el-menu-item index="operationalDataOne">平台总数据</el-menu-item>
                            </template>
                            <template v-if="isInArray(46)">
                                <el-menu-item index="operationalDataTwo">还款数据</el-menu-item>
                            </template>
                            <template v-if="isInArray(47)">
                                <el-menu-item index="operationalDataThree">逾期数据</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>

                    <template v-if="isInArray(48)||isInArray(49)||isInArray(50)">
                        <el-submenu index="8">
                            <template slot="title"><img src="../assets/img/app.png">APP设置</template>
                            <template v-if="isInArray(48)">
                                <el-menu-item index="windControlOne">轮播图设置</el-menu-item>
                            </template>
                            <template v-if="isInArray(49)">
                                <el-menu-item index="systemConfigurationTextEdit">协议编辑</el-menu-item>
                            </template>
                            <template v-if="isInArray(50)">
                                <el-menu-item index="windControlThree">联系客服和关于我们</el-menu-item>
                            </template>
                            <template v-if="isInArray(69)">
                                <el-menu-item index="feedback">查看反馈</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>

                    <template v-if="isInArray(51)||isInArray(52)||isInArray(54)||isInArray(55)||isInArray(56)
                                  ||isInArray(57)||isInArray(58)||isInArray(59)||isInArray(60)||isInArray(61)
                                  ||isInArray(62)||isInArray(63)||isInArray(64)||isInArray(65)">
                        <el-submenu index="10">
                            <template slot="title"><img src="../assets/img/设置.png">系统配置</template>
                            <template v-if="isInArray(51)||isInArray(52)||isInArray(54)||isInArray(55)||isInArray(56)">
                                <el-menu-item index="systemConfigurationOne">贷款类型配置</el-menu-item>
                            </template>
                            <template v-if="isInArray(57)">
                                <el-menu-item index="systemConfigurationFour">申请条件配置</el-menu-item>
                            </template>
                            <template v-if="isInArray(58)">
                                <el-menu-item index="systemConfigurationFive">认证信息配置</el-menu-item>
                            </template>
                            <template v-if="isInArray(59)">
                                <el-menu-item index="systemConfigurationTwo">第三方接口设置</el-menu-item>
                            </template>
                            <template v-if="isInArray(60)">
                                <el-menu-item index="systemConfigurationThree">风控设置管理</el-menu-item>
                            </template>
                            <template v-if="isInArray(61)">
                                <el-menu-item index="systemConfigurationSix">逾期等级设置</el-menu-item>
                            </template>
                            <template v-if="isInArray(62)||isInArray(63)">
                                <el-menu-item index="systemConfigurationSeven">角色权限管理</el-menu-item>
                            </template>
                            <template v-if="isInArray(64)||isInArray(65)">
                                <el-menu-item index="systemConfigurationEight">渠道预设和紧急设置</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                </el-menu>
                <el-menu v-if="showRight" id="customer_info" :default-active="defaultActive" style="min-height: 100%;"
                         router>
                    <el-submenu index="2">
                        <template slot="title"><img src="../assets/img/订单管理.png">认证信息查看</template>
                        <el-menu-item :index="personalInformation">个人信息</el-menu-item>
                        <el-menu-item :index="mailList">通讯录列表</el-menu-item>
                        <el-menu-item :index="riskManagement">风控报告</el-menu-item>
                        <el-menu-item :index="checkInfo">反欺诈报告</el-menu-item>
                        <el-menu-item :index="lastPage">返回</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="22" style="height: 100%;overflow: auto;">
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
                customer_info: false,
                lastPage: 'manage',
                mailList: 'mailList',
                riskManagement: 'riskManagement',
                personalInformation: 'personalInformation',
                checkInfo: 'checkInfo',
                role: undefined,
                showLeft: true,
                showRight: false
            }
        },
        created() {
            var that = this;
            that.role = window.localStorage.getItem("role");
        },
        beforeRouteUpdate(to, from, next) {
            var that = this;
            if (to.path == '/personalInformation' && from.path != '/mailList' && from.path != '/riskManagement' && from.path != '/checkInfo') {
                that.lastPage = from.path;
            }
            if (to.path == '/personalInformation' && !!to.query.id) {
                that.mailList = 'mailList' + '?id=' + to.query.id;
                that.riskManagement = 'riskManagement' + '?id=' + to.query.id;
                that.personalInformation = 'personalInformation' + '?id=' + to.query.id;
                that.checkInfo = 'checkInfo' + '?id=' + to.query.id;
            }
            next(vm => {
                // console.log(from)  上一页面的路由信息
            })
        },
        watch: {   //监听值变化：map值
            "$route": {
                handler(route) {
                    var that = this;
                    if (route.path == '/personalInformation' || route.path == '/mailList' || route.path == '/riskManagement' || route.path == '/checkInfo') {
                        that.changeLeftList();
                    } else {
                        that.initLeftList();
                    }
                }
            }
        },
        methods: {
            changeLeftList() {
                /*  var main = document.getElementById('main');
                  main.style.display = 'none';
                  var customer_info = document.getElementById('customer_info');
                  customer_info.style.display = ' ';*/
                var that = this;
                that.showLeft = false;
                that.showRight = true;
            },
            initLeftList() {
                /* var main = document.getElementById('main');
                 main.style.display = '';
                 var customer_info = document.getElementById('customer_info');
                 customer_info.style.display = 'none';*/
                var that = this;
                that.showLeft = true;
                that.showRight = false;
            },
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + that.role + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
        }
    }
</script>


<style lang="less">
    @import '../style/mixin';

    #main {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 8.4%;
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: block;
        }
    }

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
