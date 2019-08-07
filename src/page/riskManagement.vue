<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是银行卡自动扣款</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户基础信息" name="first">
                <div class="back">
                    <h2>用户基础信息</h2>
                    <div class="main">
                        <table cellpadding="20" cellspacing="0" class="account_news">
                            <tr>
                                <th>抓取时间</th>
                                <td>
                                    <div>{{time}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>用户姓名</th>
                                <td>
                                    <div>{{name}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>身份证号</th>
                                <td>
                                    <div>{{idcard}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>电话号码</th>
                                <td>
                                    <div>{{phone}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>号码类型（地区+三大运营商）</th>
                                <td>
                                    <div>{{borrowMoneyWay}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>号码注册地址</th>
                                <td>
                                    <div>{{borrowTimeLimit}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>入网时间</th>
                                <td>
                                    <div>{{orderCreateTime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>当前账户余额</th>
                                <td>
                                    <div>{{realityBorrowMoney}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>套餐名称</th>
                                <td>
                                    <div>{{deferAfterReturntime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>用户积分</th>
                                <td>
                                    <div>{{overdueNumberOfDays}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>用户星级</th>
                                <td>
                                    <div>{{interestPenaltySum}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>用户实名状态</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>客户状态</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>其他联系人号码</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通话记录信息" name="second">
                <div class="back">
                    <h2>通话记录信息</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="type" label="通话时间" align="center"></el-table-column>
                            <el-table-column prop="name" label="对方号码" align="center"></el-table-column>
                            <el-table-column prop="phone" label="通讯类型" align="center"></el-table-column>
                            <el-table-column prop="name" label="通话地点" align="center"></el-table-column>
                            <el-table-column prop="phone" label="呼叫类型" align="center"></el-table-column>
                            <el-table-column prop="name" label="业务类型" align="center"></el-table-column>
                            <el-table-column prop="phone" label="通话时长(秒)" align="center"></el-table-column>
                            <el-table-column prop="name" label="优惠套餐" align="center"></el-table-column>
                            <el-table-column prop="phone" label="费用" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="短信记录" name="third">
                <div class="back">
                    <h2>短信记录</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="type" label="发送时间" align="center"></el-table-column>
                            <el-table-column prop="name" label="对方号码" align="center"></el-table-column>
                            <el-table-column prop="phone" label="短信地址" align="center"></el-table-column>
                            <el-table-column prop="name" label="短信状态" align="center"></el-table-column>
                            <el-table-column prop="phone" label="业务类型" align="center"></el-table-column>
                            <el-table-column prop="name" label="信息类型" align="center"></el-table-column>
                            <el-table-column prop="name" label="优惠套餐" align="center"></el-table-column>
                            <el-table-column prop="phone" label="短信费用" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="月账单记录" name="forth">
                <div class="back">
                    <h2>月账单记录</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="type" label="月份" align="center"></el-table-column>
                            <el-table-column prop="name" label="当月话费" align="center"></el-table-column>
                            <el-table-column prop="phone" label="实际缴纳费用" align="center"></el-table-column>
                            <el-table-column prop="name" label="套餐固定费用" align="center"></el-table-column>
                            <el-table-column prop="phone" label="额外套餐费-短信" align="center"></el-table-column>
                            <el-table-column prop="name" label="额外套餐费-通话" align="center"></el-table-column>
                            <el-table-column prop="name" label="额外套餐费-流量" align="center"></el-table-column>
                            <el-table-column prop="phone" label="增值业务费" align="center"></el-table-column>
                            <el-table-column prop="phone" label="优惠费" align="center"></el-table-column>
                            <el-table-column prop="phone" label="本人替他人代付费" align="center"></el-table-column>
                            <el-table-column prop="phone" label="他人替本人代付费" align="center"></el-table-column>
                            <el-table-column prop="phone" label="其他费用" align="center"></el-table-column>
                            <el-table-column prop="phone" label="当月积分" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="流量记录" name="fifth">
                <div class="back">
                    <h2>流量记录</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="type" label="起始时间" align="center"></el-table-column>
                            <el-table-column prop="name" label="通信地点" align="center"></el-table-column>
                            <el-table-column prop="phone" label="优惠套餐" align="center"></el-table-column>
                            <el-table-column prop="name" label="业务名称" align="center"></el-table-column>
                            <el-table-column prop="phone" label="总时长(秒)" align="center"></el-table-column>
                            <el-table-column prop="name" label="总流量(KB)" align="center"></el-table-column>
                            <el-table-column prop="name" label="网络类型" align="center"></el-table-column>
                            <el-table-column prop="phone" label="上网方式" align="center"></el-table-column>
                            <el-table-column prop="phone" label="通信费用" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="充值记录" name="sixth">
                <div class="back">
                    <h2>充值记录</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="type" label="充值时间" align="center"></el-table-column>
                            <el-table-column prop="name" label="充值方式" align="center"></el-table-column>
                            <el-table-column prop="phone" label="充值金额" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="上网记录" name="seventh">
                <div class="back">
                    <h2>上网记录</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="type" label="开始时间" width="93" align="center"></el-table-column>
                            <el-table-column prop="name" label="业务类型" width="93" align="center"></el-table-column>
                            <el-table-column prop="phone" label="流量类型" width="93" align="center"></el-table-column>
                            <el-table-column prop="name" label="业务名称" width="93" align="center"></el-table-column>
                            <el-table-column prop="phone" label="流量名称" width="93" align="center"></el-table-column>
                            <el-table-column prop="name" label="时长(秒)" width="93" align="center"></el-table-column>
                            <el-table-column prop="name" label="通信类型" width="93" align="center"></el-table-column>
                            <el-table-column prop="name" label="流量类型" width="93" align="center"></el-table-column>
                            <el-table-column prop="phone" label="上传流量(KB)" width="125" align="center"></el-table-column>
                            <el-table-column prop="phone" label="下载流量(KB)" width="125" align="center"></el-table-column>
                            <el-table-column prop="phone" label="总流量(KB)" width="110" align="center"></el-table-column>
                            <el-table-column prop="phone" label="本地ip" width="93" align="center"></el-table-column>
                            <el-table-column prop="phone" label="访问ip" width="93" align="center"></el-table-column>
                            <el-table-column prop="phone" label="浏览器提示" width="110" align="center"></el-table-column>
                            <el-table-column prop="phone" label="访问网址" width="93" align="center"></el-table-column>
                            <el-table-column prop="phone" label="域名" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="亲情网信息" name="eighth">
                <div class="back">
                    <h2>亲情网信息</h2>
                    <div class="main">
                        <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="type" label="编号" align="center"></el-table-column>
                            <el-table-column prop="name" label="亲情网手机号码" align="center"></el-table-column>
                            <el-table-column prop="phone" label="短号" align="center"></el-table-column>
                            <el-table-column prop="name" label="归属地" align="center"></el-table-column>
                            <el-table-column prop="phone" label="成员类型" align="center"></el-table-column>
                            <el-table-column prop="name" label="加入日期" align="center"></el-table-column>
                            <el-table-column prop="name" label="结束日期" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="月份总信息" name="ninth">
                <div class="back">
                    <h2>月份总信息</h2>
                    <div class="main">
                        <table cellpadding="20" cellspacing="0" class="account_news">
                            <tr>
                                <th>账单可抓取月份数</th>
                                <td>
                                    <div>{{time}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>账单抓取失败月份数</th>
                                <td>
                                    <div>{{name}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>账单未空月份数</th>
                                <td>
                                    <div>{{idcard}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>具体每月抓取状态</th>
                                <td>
                                    <div>{{phone}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>通话可抓取月份数</th>
                                <td>
                                    <div>{{borrowMoneyWay}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>通话抓取失败月份数</th>
                                <td>
                                    <div>{{borrowTimeLimit}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>通话未空月份数</th>
                                <td>
                                    <div>{{orderCreateTime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>具体每月抓取状态</th>
                                <td>
                                    <div>{{realityBorrowMoney}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>短信可抓取月份数</th>
                                <td>
                                    <div>{{deferAfterReturntime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>短信抓取失败月份数</th>
                                <td>
                                    <div>{{overdueNumberOfDays}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>短信未空月份数</th>
                                <td>
                                    <div>{{interestPenaltySum}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>具体每月抓取状态</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>流量可抓取月份数</th>
                                <td>
                                    <div>{{deferAfterReturntime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>流量抓取失败月份数</th>
                                <td>
                                    <div>{{overdueNumberOfDays}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>流量未空月份数</th>
                                <td>
                                    <div>{{interestPenaltySum}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>具体每月抓取状态</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="调用次数记录" name="tenth">
                <div class="back">
                    <h2>调用次数记录</h2>
                    <div class="main">
                        <table cellpadding="20" cellspacing="0" class="account_news">
                            <tr>
                                <th>相同手机号过去1小时内调用次数</th>
                                <td>
                                    <div>{{time}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去3小时内调用次数</th>
                                <td>
                                    <div>{{name}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去12小时内调用次数</th>
                                <td>
                                    <div>{{idcard}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去1天内调用次数</th>
                                <td>
                                    <div>{{phone}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去3天内调用次数</th>
                                <td>
                                    <div>{{borrowMoneyWay}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去7天内调用次数</th>
                                <td>
                                    <div>{{borrowTimeLimit}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去14天内调用次数</th>
                                <td>
                                    <div>{{orderCreateTime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去30天内调用次数</th>
                                <td>
                                    <div>{{realityBorrowMoney}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同手机号过去60天内调用次数</th>
                                <td>
                                    <div>{{deferAfterReturntime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去1小时内调用次数</th>
                                <td>
                                    <div>{{overdueNumberOfDays}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去3小时内调用次数</th>
                                <td>
                                    <div>{{interestPenaltySum}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去12小时内调用次数</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去1天内调用次数</th>
                                <td>
                                    <div>{{deferAfterReturntime}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去3天内调用次数</th>
                                <td>
                                    <div>{{overdueNumberOfDays}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去7天内调用次数</th>
                                <td>
                                    <div>{{interestPenaltySum}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去14天内调用次数</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去30天内调用次数</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>相同身份证过去60天内调用次数</th>
                                <td>
                                    <div>{{pipelinenumber}}</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
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
                activeName: "first",
                tableData: []
            }
        },
        created(){
            // this.getData(this.page,this.Pagesize)
            // this.get()
        },
        methods:{
            handleClick(){

            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .el-tabs__header {
        margin: 0;
    }
    .main{
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }
    .account_news{
        width: 50%;
        margin: 0 auto;
    }
    .account_news th{
        width: 50%;
        text-align: left;
    }
    .account_news td{
        text-align: center;
    }
    .account_news td div{
        margin-top: -10px;
        margin-bottom: -10px;
        width: 90%;
        height: 40px;
        line-height: 40px;
        background-color: #f3f6fb;
    }
</style>
