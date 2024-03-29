import Vue from 'vue'
import Router from 'vue-router'
// import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

Vue.prototype.axios = axios;

Vue.use(Router)

const personalInformation = r => require.ensure([], () => r(require('@/page/personalInformation')), 'personalInformation');
const mailList = r => require.ensure([], () => r(require('@/page/mailList')), 'mailList');
const riskManagement = r => require.ensure([], () => r(require('@/page/riskManagement')), 'riskManagement');
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const payManager = r => require.ensure([], () => r(require('@/page/payManager')), 'payManager');
// 这里是订单管理
const MachineOrder = r => require.ensure([], () => r(require('@/page/MachineOrder')), 'MachineOrder');
const electricOrder = r => require.ensure([], () => r(require('@/page/electricOrder')), 'electricOrder');
const manualReview = r => require.ensure([], () => r(require('@/page/manualReview')), 'manualReview');
const queryOrder = r => require.ensure([], () => r(require('@/page/queryOrder')), 'queryOrder');
// 这里是用户管理
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const userInteraction = r => require.ensure([], () => r(require('@/page/userInteraction')), 'userInteraction');
const blackList = r => require.ensure([], () => r(require('@/page/blackList')), 'blackList');
const shortMessageSending = r => require.ensure([], () => r(require('@/page/shortMessageSending')), 'shortMessageSending');
// 这里是财务管理
const paymentRecord = r => require.ensure([], () => r(require('@/page/paymentRecord')), 'paymentRecord');
const repaymentPlan = r => require.ensure([], () => r(require('@/page/repaymentPlan')), 'repaymentPlan');
const repaymentRecord = r => require.ensure([], () => r(require('@/page/repaymentRecord')), 'repaymentRecord');
const manualTransfer = r => require.ensure([], () => r(require('@/page/manualTransfer')), 'manualTransfer');
const offlineRepayment = r => require.ensure([], () => r(require('@/page/offlineRepayment')), 'offlineRepayment');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const financialOverview = r => require.ensure([], () => r(require('@/page/financialOverview')), 'financialOverview');
const artificialDelay = r => require.ensure([], () => r(require('@/page/artificialDelay')), 'artificialDelay');
// 这里是货后订单管理
const dateOrder = r => require.ensure([], () => r(require('@/page/dateOrder')), 'dateOrder');
const returnOrder = r => require.ensure([], () => r(require('@/page/returnOrder')), 'returnOrder');
const overdueOrder = r => require.ensure([], () => r(require('@/page/overdueOrder')), 'overdueOrder');
const badOrder = r => require.ensure([], () => r(require('@/page/badOrder')), 'badOrder');
// 这里是催收预警及管理
const collectionOne = r => require.ensure([], () => r(require('@/page/collectionOne')), 'collectionOne');
const collectionTwo = r => require.ensure([], () => r(require('@/page/collectionTwo')), 'collectionTwo');
const collectionThree = r => require.ensure([], () => r(require('@/page/collectionThree')), 'collectionThree');
const collectionFour = r => require.ensure([], () => r(require('@/page/collectionFour')), 'collectionFour');
const collectionFive = r => require.ensure([], () => r(require('@/page/collectionFive')), 'collectionFive');
const collectionSix = r => require.ensure([], () => r(require('@/page/collectionSix')), 'collectionSix');
// 这里是运营数据
const operationalDataOne = r => require.ensure([], () => r(require('@/page/operationalDataOne')), 'operationalDataOne');
const operationalDataTwo = r => require.ensure([], () => r(require('@/page/operationalDataTwo')), 'operationalDataTwo');
const operationalDataThree = r => require.ensure([], () => r(require('@/page/operationalDataThree')), 'operationalDataThree');
const operationalDataFour = r => require.ensure([], () => r(require('@/page/operationalDataFour')), 'operationalDataFour');
// 这里是风控数据
const windControlOne = r => require.ensure([], () => r(require('@/page/windControlOne')), 'windControlOne');
const windControlTwo = r => require.ensure([], () => r(require('@/page/windControlTwo')), 'windControlTwo');
const windControlThree = r => require.ensure([], () => r(require('@/page/windControlThree')), 'windControlThree');
// 这里是渠道管理
const channelOne = r => require.ensure([], () => r(require('@/page/channelOne')), 'channelOne');
const channelTwo = r => require.ensure([], () => r(require('@/page/channelTwo')), 'channelTwo');
const channelThree = r => require.ensure([], () => r(require('@/page/channelThree')), 'channelThree');
// 这里是系统配置
const systemConfigurationOne = r => require.ensure([], () => r(require('@/page/systemConfigurationOne')), 'systemConfigurationOne');
const systemConfigurationTwo = r => require.ensure([], () => r(require('@/page/systemConfigurationTwo')), 'systemConfigurationTwo');
const systemConfigurationThree = r => require.ensure([], () => r(require('@/page/systemConfigurationThree')), 'systemConfigurationThree');
const systemConfigurationFour = r => require.ensure([], () => r(require('@/page/systemConfigurationFour')), 'systemConfigurationFour');
const systemConfigurationFive = r => require.ensure([], () => r(require('@/page/systemConfigurationFive')), 'systemConfigurationFive');
const systemConfigurationSix = r => require.ensure([], () => r(require('@/page/systemConfigurationSix')), 'systemConfigurationSix');
const systemConfigurationSeven = r => require.ensure([], () => r(require('@/page/systemConfigurationSeven')), 'systemConfigurationSeven');
const systemConfigurationEight = r => require.ensure([], () => r(require('@/page/systemConfigurationEight')), 'systemConfigurationEight');
const systemConfigurationTextEdit = r => require.ensure([], () => r(require('@/page/systemConfigurationTextEdit')), 'systemConfigurationTextEdit');
// 这里是报表查看
const loanTable = r => require.ensure([], () => r(require('@/page/loanTable')), 'loanTable');
const payTable = r => require.ensure([], () => r(require('@/page/payTable')), 'payTable');
const delayTable = r => require.ensure([], () => r(require('@/page/delayTable')), 'delayTable');
const overdueTable = r => require.ensure([], () => r(require('@/page/overdueTable')), 'overdueTable');
const countTable = r => require.ensure([], () => r(require('@/page/countTable')), 'countTable');

const feedback = r => require.ensure([], () => r(require('@/page/feedback')), 'feedback');
const checkInfo = r => require.ensure([], () => r(require('@/page/checkInfo')), 'checkInfo');
const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/MachineOrder',
            component: MachineOrder,
            meta: ['订单管理', '机审定单'],
        }, {
            path: '/electricOrder',
            component: electricOrder,
            meta: ['订单管理', '机审拒绝未人审'],
        }, {
            path: '/manualReview',
            component: manualReview,
            meta: ['订单管理', '已机审已人审'],
        }, {
            path: '/queryOrder',
            component: queryOrder,
            meta: ['订单管理', '订单查询'],
        }
            , {
                path: '/userList',
                component: userList,
                meta: ['用户管理', '注册用户信息'],
            }, {
                path: '/userInteraction',
                component: userInteraction,
                meta: ['用户管理', '用户互动信息'],
            }, {
                path: '/blackList',
                component: blackList,
                meta: ['用户管理', '黑名单用户'],
            }, {
                path: '/shortMessageSending',
                component: shortMessageSending,
                meta: ['用户管理', '注册用户短信发送'],
            }, {
                path: '/paymentRecord',
                component: paymentRecord,
                meta: ['财务管理', '放款实时流水'],
            }, {
                path: '/repaymentPlan',
                component: repaymentPlan,
                meta: ['财务管理', '还款实时流水'],
            }, {
                path: '/repaymentRecord',
                component: repaymentRecord,
                meta: ['财务管理', '延期和扣款查询'],
            }, {
                path: '/manualTransfer',
                component: manualTransfer,
                meta: ['财务管理', '线上减免调账'],
            }, {
                path: '/artificialDelay',
                component: artificialDelay,
                meta: ['财务管理', '人工延期设置'],
            }, {
                path: '/offlineRepayment',
                component: offlineRepayment,
                meta: ['财务管理', '线下调账'],
            }, {
                path: '/newMember',
                component: newMember,
                meta: ['财务管理', '银行卡自动扣款'],
            }, {
                path: '/financialOverview',
                component: financialOverview,
                meta: ['财务管理', '财务总览'],
            }, {
                path: '/dateOrder',
                component: dateOrder,
                meta: ['贷后订单管理', '期限内订单'],
            }, {
                path: '/returnOrder',
                component: returnOrder,
                meta: ['贷后订单管理', '已还订单'],
            }, {
                path: '/overdueOrder',
                component: overdueOrder,
                meta: ['贷后订单管理', '已逾期订单'],
            }, {
                path: '/badOrder',
                component: badOrder,
                meta: ['贷后订单管理', '已坏账订单'],
            }, {
                path: '/channelThree',
                component: channelThree,
                meta: ['贷后订单管理', '逾前短信提醒'],
            }, {
                path: '/personalInformation',
                component: personalInformation,
                meta: ['认证信息查看', '个人信息'],
            }, {
                path: '/mailList',
                component: mailList,
                meta: ['认证信息查看', '通讯录列表'],
            }, {
                path: '/riskManagement',
                component: riskManagement,
                meta: ['认证信息查看', '风控报告'],
            }, {
                path: '/checkInfo',
                component: checkInfo,
                meta: ['认证信息查看', '反欺诈报告'],
            }, {
                path: '/collectionOne',
                component: collectionOne,
                meta: ['催收预警及管理', '已逾期未分配'],
            }
            , {
                path: '/collectionTwo',
                component: collectionTwo,
                meta: ['催收预警及管理', '已逾期已分配'],
            }
            , {
                path: '/collectionThree',
                component: collectionThree,
                meta: ['催收预警及管理', '催收率报表'],
            }
            , {
                path: '/collectionFour',
                component: collectionFour,
                meta: ['催收预警及管理', '催收员工作报表'],
            }
            , {
                path: '/collectionFive',
                component: collectionFive,
                meta: ['催收预警及管理', '已分配未催收'],
            }, {
                path: '/collectionSix',
                component: collectionSix,
                meta: ['催收预警及管理', '已分配已催收'],
            }, {
                path: '/operationalDataOne',
                component: operationalDataOne,
                meta: ['运营数据', '平台总数据'],
            }, {
                path: '/operationalDataTwo',
                component: operationalDataTwo,
                meta: ['运营数据', '还款数据'],
            }, {
                path: '/operationalDataThree',
                component: operationalDataThree,
                meta: ['运营数据', '逾期数据'],
            }, {
                path: '/operationalDataFour',
                component: operationalDataFour,
                meta: ['运营数据', '收支数据'],
            }, {
                path: '/windControlOne',
                component: windControlOne,
                meta: ['APP管理设置', '轮播图设置'],
            }, {
                path: '/windControlTwo',
                component: windControlTwo,
                meta: ['APP管理设置', '虚拟宣传页'],
            }, {
                path: '/windControlThree',
                component: windControlThree,
                meta: ['APP管理设置', '联系客服和关于我们'],
            }, {
                path: '/feedback',
                component: feedback,
                meta: ['APP管理设置', '反馈查看'],
            }, {
                path: '/channelOne',
                component: channelOne,
                meta: ['渠道管理', '渠道数据查询'],
            }, {
                path: '/channelTwo',
                component: channelTwo,
                meta: ['渠道管理', '渠道设置管理'],
            }, {
                path: '/channelThree',
                component: channelThree,
                meta: ['渠道管理', '渠道注册数据'],
            }, {
                path: '/systemConfigurationOne',
                component: systemConfigurationOne,
                meta: ['系统配置', '贷款类型配置'],
            }, {
                path: '/systemConfigurationTwo',
                component: systemConfigurationTwo,
                meta: ['系统配置', '第三方接口设置'],
            }, {
                path: '/systemConfigurationThree',
                component: systemConfigurationThree,
                meta: ['系统配置', '风控设置管理'],
            }, {
                path: '/systemConfigurationFour',
                component: systemConfigurationFour,
                meta: ['系统配置', '申请条件配置'],
            }, {
                path: '/systemConfigurationFive',
                component: systemConfigurationFive,
                meta: ['系统配置', '认证信息配置'],
            }, {
                path: '/systemConfigurationSix',
                component: systemConfigurationSix,
                meta: ['系统配置', '逾期等级设置'],
            }, {
                path: '/systemConfigurationSeven',
                component: systemConfigurationSeven,
                meta: ['系统配置', '角色权限管理'],
            }, {
                path: '/systemConfigurationEight',
                component: systemConfigurationEight,
                meta: ['系统配置', '渠道预设和紧急设置'],
            }, {
                path: '/systemConfigurationTextEdit',
                component: systemConfigurationTextEdit,
                meta: ['系统配置', '协议编辑'],
            }, {
                path: '/loanTable',
                component: loanTable,
                meta: ['报表查看', '放款表'],
            }, {
                path: '/payTable',
                component: payTable,
                meta: ['报表查看', '还款表'],
            }, {
                path: '/delayTable',
                component: delayTable,
                meta: ['报表查看', '续借表'],
            }, {
                path: '/overdueTable',
                component: overdueTable,
                meta: ['报表查看', '逾期表'],
            }, {
                path: '/countTable',
                component: countTable,
                meta: ['报表查看', '实时统计表'],
            }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})
